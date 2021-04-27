import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import api from '../../services/Api';

import Api from '../../services/Api';

export default class DisciplineSelection extends Component{
    constructor(props){
        super(props);
        this.state = {
            disciplines: []
        }
    }

    async componentDidMount() {
        this.getDisciplines();
    }

    getDisciplines = async () => {
        try {
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const v = []
            const {disciplineUser} = await (await Api.get('/DisciplineUser/' + _id)).data;
            const disciplines = disciplineUser.map(async object => {
                const discipline = await api.get('/discipline/' + object.idDiscipline).then(t => {return t.data})
                //console.log(discipline)
                v.push(discipline)
                return discipline          
            })
           console.log(v[0])
            this.setState( disciplines );
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        const { disciplines } = this.state;
        console.log(disciplines.length)
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.scrollView}>
                    
                        {disciplines !== null &&
                            disciplines.map(discipline => {
                                const { name, code, _id } = discipline;
                                return <TouchableOpacity key={ _id } style={styles.disciplineButton} 
                                    onPress={()=>{this.props.navigation.navigate('QuizDiscipline')}}>
                                    <Text style={styles.textDiscipline}>
                                        { name } - { code }
                                    </Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
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
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    scrollView: {
        alignItems: 'center',
    }
})