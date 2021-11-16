import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';

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
        this.getDisciplines();
    }

    componentDidUpdate() {
        if (this.props.navigation.getParam('load') === true) {
            this.getDisciplines();
        }
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
                buttonColor='#000000'
                buttonSize={12}
                buttonOuterColor='#000000'
                selectedButtonColor='#000000'
                labelStyle={{ fontSize: 12, color: '#000000' }}
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
                    <ActivityIndicator size="large" color='#d3302f' />
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
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 10 }}>
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
                            const background = questionnaire.status == 'I' ? '#ffcc00' : '#e60000';
                            const border = questionnaire.status == 'I' ? '#ffff66' : '#ff4d4d';
                            const status = questionnaire.status == 'I' ? 'Incompleto' : 'Pendente';
                            const textColor = questionnaire.status == 'I' ? '#000000' : '#ffffff';

                            return (
                                <TouchableOpacity key={questionnaire._id} onPress={() => { this.props.navigation.navigate('QuizDiscipline', { questionnaire }) }}>
                                    <Card containerStyle={{ //borderBottomWidth: 4, borderBottomColor: '#595959', 
                                        padding: 0, borderRadius: 10
                                    }}>
                                        <View style={{ padding: 10 }}>
                                            <Text style={styles.nameDiscipline}>{codeDiscipline} - {title}</Text>
                                            <Text style={styles.nameDiscipline}>{'Professor(a): ' + name}</Text>
                                            <Text style={styles.nameDiscipline}>{'Turma: ' + code}</Text>
                                            <Text style={styles.nameDiscipline}>{'Período: ' + period}</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: background, width: '100%', borderBottomColor: border, justifyContent: 'center',
                                            borderRightColor: border, borderBottomWidth: 3, borderRightWidth: 3, paddingLeft: 10, paddingRight: 10, paddingTop: 10
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
        backgroundColor: '#bfbfbf',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    disciplineButton: {
        backgroundColor: '#969393',
        height: 50,
        width: '70%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#ffad29',
        paddingTop: 15,
        marginTop: 30,
    },
    textDiscipline: {
        color: '#000',
        textAlign: 'center',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    scrollView: {
        alignItems: 'center',
    },
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    viewNullText: {
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20
    },
    nullText: {
        fontSize: 15
    }
})