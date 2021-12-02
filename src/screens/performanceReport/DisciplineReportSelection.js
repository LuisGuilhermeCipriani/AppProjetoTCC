import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class DisciplineReportSelection extends Component {
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
                                <TouchableOpacity key={obj._id} onPress={() => { this.props.navigation.navigate('screenReport',
                                { questionnaires: object, discipline, professor, objectClass }) }}>
                                    <Card containerStyle={
                                        styles.cardStyle
                                    }>
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
        backgroundColor: AppColors.backgroundColor4,
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
        marginBottom: 10
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.backgroundColor4
    },
    cardStyle: {
        borderBottomWidth: 4, 
        borderBottomColor: AppColors.cardColor1,
    }
})