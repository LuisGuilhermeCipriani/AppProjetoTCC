import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import { AppColors } from '../../colors/AppColors';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class DisciplineSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnairesByPeriod: [],
            valueRadio: 1,
            isLoading: false
        };
        this.radioValues = [
            { label: 'Pendentes', value: 0 },
            { label: 'Todos', value: 1 },
            { label: 'Incompletos', value: 2 }
        ]
    }

    async componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        this.props.navigation.addListener('didFocus', () => this.getDisciplines())
    }

    getDisciplines = async () => {
        try {
            this.setState({ isLoading: true });
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { data } = (await Api.post('/questionnaire/findAllByPeriod',
                { idStudent: _id }));
            const { questionnairesByPeriod } = data
            if (questionnairesByPeriod !== null) {
                this.setState({ questionnairesByPeriod });
            }
            this.props.navigation.setParams({ load: false });
            this.setState({ isLoading: false });
        } catch (err) {
            console.log(err);
        }
    }

    renderRadio = () => {
        return (
            <RadioForm
                radio_props={this.radioValues}
                initial={1}
                buttonColor={AppColors.radioColor1}
                buttonSize={12}
                buttonOuterColor={AppColors.radioColor1}
                selectedButtonColor={AppColors.radioColor1}
                labelStyle={{ fontSize: 12, color: AppColors.radioColor1 }}
                formHorizontal={true}
                labelHorizontal={false}
                onPress={(valueRadio) => { this.setState({ valueRadio }) }}
            />
        )
    }

    filterQuestionnaires = () => {
        const { valueRadio, questionnairesByPeriod } = this.state;
        let questionnaires = questionnairesByPeriod;
        if (valueRadio == 0) {
            questionnaires = this.filterByOption(questionnairesByPeriod, 'N');
        }
        if (valueRadio == 2) {
            questionnaires = this.filterByOption(questionnairesByPeriod, 'I');
        }
        return questionnaires;
    }

    filterByOption = (questionnaires, option) => {
        const pendings = questionnaires.filter(object => object.status == option);
        return pendings;
    }

    render() {
        const questionnaires = this.filterQuestionnaires();

        if (this.state.isLoading) {
            return (
                <View style={styles.Indicator}>
                    <ActivityIndicator size="large" color={AppColors.backgroundColor1} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Header
                    title='Responder Questionário'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <View style={styles.viewRender1}>
                    {this.renderRadio()}
                </View>
                <ScrollView style={styles.scroll} >
                    {questionnaires.length > 0
                        ?
                        questionnaires.map(questionnaire => {
                            const { title } = questionnaire.idDiscipline;
                            const codeDiscipline = questionnaire.idDiscipline.code;
                            const { name } = questionnaire.idProfessor;
                            const { code, period } = questionnaire.idClass;
                            const background = questionnaire.status == 'I' ? AppColors.statusQuestionnaireColor1 : AppColors.statusQuestionnaireColor2;
                            const border = questionnaire.status == 'I' ? AppColors.statusQuestionnaireColor3 : AppColors.statusQuestionnaireColor4;
                            const status = questionnaire.status == 'I' ? 'Incompleto' : 'Pendente';
                            const textColor = questionnaire.status == 'I' ? AppColors.statusQuestionnaireColor5 : AppColors.statusQuestionnaireColor5;

                            return (
                                <TouchableOpacity key={questionnaire._id} onPress={() => { this.props.navigation.navigate('QuizDiscipline', { questionnaire }) }}>
                                    <Card containerStyle={styles.cardStyle}>
                                        <View style={styles.viewRender2}>
                                            <Text style={styles.nameDiscipline}>{title}</Text>
                                            <Text style={styles.nameDiscipline}>{codeDiscipline}</Text>
                                            <Text style={styles.nameDiscipline}>{'Professor(a): ' + name}</Text>
                                            <Text style={styles.nameDiscipline}>{'Turma: ' + code}</Text>
                                            <Text style={styles.nameDiscipline}>{'Período: ' + period}</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: background, width: '100%', borderBottomColor: border,
                                            justifyContent: 'center', borderRightColor: border, borderBottomWidth: 3,
                                            borderRightWidth: 3, paddingLeft: 10, paddingRight: 10, paddingTop: 10,
                                        }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10, color: textColor }}>{'Status: ' + status}</Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        })
                        :
                        <View style={styles.viewNullText}>
                            <Text style={styles.nullText}>Não há questionários encontrados!</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.backgroundColor10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.backgroundColor4,
    },
    viewNullText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    nullText: {
        fontSize: 18,
    },
    viewRender1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    cardStyle: {
        borderBottomWidth: 1,
        borderBottomColor: AppColors.cardColor1,
        padding: 0,
        borderRadius: 10,
    },
    viewRender2: {
        padding: 10,
    }
})