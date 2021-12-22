import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class DisciplineQuestionnaireSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.getQuestionnaires();
    }

    getQuestionnaires = async () => {
        try {
            this.setState({ isLoading: true })
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { questionnaires } = (await Api.post('/questionnaire/findByIdProfessor', { idProfessor: _id, active: true })).data;

            if (questionnaires !== null) {
                this.setState({ questionnaires });
            }
            this.setState({ isLoading: false })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { questionnaires } = this.state;

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
                    title='Seleção de Disciplinas'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView style={styles.scroll} >
                    {questionnaires !== null &&
                        questionnaires.map(object => {
                            const obj = object[0]
                            const discipline = obj.idDiscipline;
                            const professor = obj.idProfessor;
                            const objectClass = obj.idClass;
                            return (
                                <TouchableOpacity key={obj._id}
                                    onPress={() => { this.props.navigation.navigate('screenChart', { questionnaires: object, discipline }) }}>
                                    <Card containerStyle={
                                        styles.cardStyle
                                    }>
                                        <View style={styles.cardContainer}>
                                        <View>
                                            <Text style={styles.nameDiscipline}>{discipline.title}</Text>
                                            <Text style={styles.nameDiscipline}>{discipline.code}</Text>
                                            <Text style={styles.nameDiscipline}>Turma: {objectClass.code}</Text>
                                            <Text style={styles.nameDiscipline}>Docente: {professor.name}</Text>
                                        </View>
                                            <Icon name='angle-right' style={styles.rightIcon} />
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        })
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
    cardStyle: {
        borderBottomWidth: 2,
        borderBottomColor: AppColors.cardColor4,
        borderRadius: 10,
    },
    rightIcon: {
        color: AppColors.textColor2,
        fontSize: 30,
        elevation: 5,
    },
    cardContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})