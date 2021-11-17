import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';

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
            this.setState({isLoading: true})
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { questionnaires } = (await Api.post('/questionnaire/findByIdProfessor', { idProfessor: _id, active: true })).data;

            if (questionnaires !== null) {
                this.setState({ questionnaires });
            }
            this.setState({isLoading: false})
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { questionnaires } = this.state;

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
                                <TouchableOpacity key={obj._id} onPress={() => { this.props.navigation.navigate('screenChart', { questionnaires: object, discipline }) }}>
                                    <Card containerStyle={{
                                        borderBottomWidth: 4, borderBottomColor: '#595959'
                                    }}>
                                        <Text style={styles.nameDiscipline}>{discipline.code} - {discipline.title} - {objectClass.code} - {professor.name}</Text>
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
        backgroundColor: '#ffffff',
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
    }
})