import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import Header from '../../components/header/Header';
import { AppColors } from "../../colors/AppColors";

import Api from '../../services/Api';

export default class SearchDisciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            isLoading: false,
            user: {}
        }
    }

    async componentDidMount() {
        this.SearchDisciplines();
    }

    SearchDisciplines = async () => {
        try {
            this.setState({isLoading: true})
            const user = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            
            const idUser = user._id;
            const response = await Api.post('class/findByIdUser', { idUser, active: true });
            const { classes } = response.data;
            this.setState({ classes, user, isLoading: false });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { classes, user } = this.state;
        
        const title = user.type == 'P' ? 'Disciplinas' : 'Disciplinas Matriculadas'

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
                    title={title}
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {classes.length > 0
                        ?
                        classes.map(classObject => {
                            const { idDiscipline, _id, code, idProfessor } = classObject;
                            return (
                                <Card key={_id} containerStyle={styles.cardStyle}>
                                    <Text style={styles.nameDiscipline}>{idDiscipline.title}</Text>
                                    <Text>{idDiscipline.code}</Text>
                                    <Text>{'Turma: ' + code}</Text>
                                    <Text>{'Docente: ' + idProfessor.name}</Text>
                                </Card>
                            );
                        })
                        :
                        <View style={styles.viewNullText}>
                            <Text style={styles.nullText}>Não há disciplinas encontradas!</Text>
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
        flex: 1,
    },
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    viewNullText: {
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20,
    },
    nullText: {
        fontSize: 15,
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
});