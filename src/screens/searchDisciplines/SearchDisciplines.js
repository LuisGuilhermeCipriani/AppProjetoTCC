import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Header from '../../components/header/Header';

import Api from '../../services/Api';

export default class SearchDisciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disciplineUser: [],
            users: [
                {
                    name: 'brynn',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                },
                // more users here
            ]
        }
    }

    async componentDidMount() {
        this.SearchDisciplines();
    }

    SearchDisciplines = async () => {
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('@APP:user'))._id;
            const response = await Api.post('DisciplineUser/findByIdUser', { idUser });
            const { disciplineUser } = response.data;
            this.setState({ disciplineUser });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { disciplineUser, users } = this.state;
        return (
            <View>
                <Header
                    title='Seleçãa de Disciplinas'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {
                        disciplineUser !== null && disciplineUser.map(disciplineUserObject => {
                            const { idDiscipline } = disciplineUserObject;
                            const { title, code, _id } = idDiscipline;
                            return (
                                <Card key={_id} containerStyle={{
                                    borderBottomWidth: 2, borderBottomColor: '#ccc'
                                }}>
                                    <Text style={styles.nameDiscipline}>{title}</Text>
                                    <Text>{code}</Text>
                                </Card>
                            );
                        })
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
    }
});