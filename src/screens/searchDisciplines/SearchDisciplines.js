import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Header from '../../components/header/Header';

import Api from '../../services/Api';

export default class SearchDisciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disciplines: []
        }
    }

    async componentDidMount() {
        this.SearchDisciplines();
    }

    SearchDisciplines = async () => {
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('@APP:user'))._id;
            const response = await Api.post('discipline/findByIdUser', { idUser, period: '2021/1' });
            const { disciplines } = response.data;
            this.setState({ disciplines });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { disciplines } = this.state;
        return (
            <View>
                <Header
                    title='Seleçãa de Disciplinas'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {
                        disciplines !== null && disciplines.map(disciplineObject => {
                            const { title, code, _id } = disciplineObject;
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