import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Header from '../../components/header/Header';

import Api from '../../services/Api';

export default class SearchDisciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: []
        }
    }

    async componentDidMount() {
        this.SearchDisciplines();
    }

    SearchDisciplines = async () => {
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('@APP:user'))._id;
            const response = await Api.post('class/findByIdUser', { idUser, active: true });
            const { classes } = response.data;
            this.setState({ classes });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { classes } = this.state;
        return (
            <View>
                <Header
                    title='Disciplinas Matriculadas'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {classes.length > 0
                        ?
                        classes.map(classObject => {
                            const { idDiscipline, _id, code } = classObject;
                            return (
                                <Card key={_id} containerStyle={{
                                    borderBottomWidth: 2, borderBottomColor: '#ccc'
                                }}>
                                    <Text style={styles.nameDiscipline}>{idDiscipline.title}</Text>
                                    <Text>{idDiscipline.code}</Text>
                                    <Text>{'Turma: ' + code}</Text>
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
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
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
});