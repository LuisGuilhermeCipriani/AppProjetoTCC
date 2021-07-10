import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class DisciplineSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnairesByPeriod: []
        }
    }

    async componentDidMount() {
        this.getDisciplines();
    }

    getDisciplines = async () => {
        try {
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { questionnairesByPeriod } = (await Api.post('/questionnaire/findAllByPeriod', 
            { idStudent: _id, period: '2021/1', status: 'N' })).data;
            console.log(questionnairesByPeriod)

            if (questionnairesByPeriod !== null) {
                this.setState({ questionnairesByPeriod });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { questionnairesByPeriod } = this.state;
    
        return (
            <View style={styles.container}>
                <Header
                    title='Questionários Pendentes'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView style={styles.scroll} >
                    {questionnairesByPeriod !== null &&
                        questionnairesByPeriod.map(questionnaire => {
                            const { title } = questionnaire.idDiscipline;
                            const codeDiscipline = questionnaire.idDiscipline.code;
                            const { name } = questionnaire.idProfessor;
                            const {code, period} = questionnaire.idClass;
                            return (
                                <TouchableOpacity key={questionnaire._id} onPress={() => 
                                { this.props.navigation.navigate('QuizDiscipline', { questionnaire }) }}>
                                    <Card containerStyle={{
                                        borderBottomWidth: 4, borderBottomColor: '#595959'
                                    }}>
                                        <Text style={styles.nameDiscipline}>{codeDiscipline} - {title}</Text>
                                        <Text style={styles.nameDiscipline}>{'Professor(a): ' + name}</Text>
                                        <Text style={styles.nameDiscipline}>{'Turma: ' + code}</Text>
                                        <Text style={styles.nameDiscipline}>{'Período: ' + period}</Text>
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
    }
})