import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';


import Api from '../../services/Api';

export default class DisciplineSelection extends Component{
    constructor(props){
        super(props);
        this.state = {
            disciplineUser: []
        }
    }

    async componentDidMount() {
        this.getDisciplines();
    }

    getDisciplines = async () => {
        try {
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const {disciplineUser} = (await Api.post('/DisciplineUser/findByIdUser',{idUser: _id})).data;
            const {quizzes} = (await Api.post('/quiz/findAll', {idUser: _id, status: "S"})).data;

            if(quizzes !== null) {
               this.setState({ disciplineUser });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        const { disciplineUser } = this.state;
        return(
                <View style={styles.container}>
                <ScrollView style={styles.scroll} >
                        {disciplineUser !== null &&
                            disciplineUser.map(disciplineUser => {
                                const idDisciplineUser = disciplineUser._id;
                                const { title, code, _id } = disciplineUser.idDiscipline;
                                return (
                                    <TouchableOpacity key={_id} onPress={()=>{this.props.navigation.navigate('QuizDiscipline', { idDisciplineUser })}}>
                                <Card containerStyle={{borderBottomWidth: 4, borderBottomColor: '#595959'
                            }}>
                            <Text style={styles.nameDiscipline}>{ title } - { code }</Text>
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
        textShadowOffset: {width: -1, height: 1},
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