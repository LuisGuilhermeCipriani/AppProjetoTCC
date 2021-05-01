import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Index extends Component{
    render(){
        const {navigation} = this.props
        return(
            <View style={{width: '100%', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.field1} onPress={()=>{
                    navigation.navigate('Selection')}}>
                        <Icon name='square-o' color='#ffffff' size={40}/>
                        <Text style={styles.text}>Responder {"\n"}Questionário</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.field2} onPress={()=>{
                        navigation.navigate('Discipline')
                    }}>
                        <Icon name='search' color='#ffffff' size={40}/>
                        <Text style={styles.text}>Consultar {"\n"}Disciplinas</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.field3}>
                        <Icon name='line-chart' color='#ffffff' size={40}/>
                        <Text style={styles.text}>Consultar {"\n"}Desempenho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.field4}>
                        <Icon name='check-square-o' color='#ffffff' size={40}/>
                        <Text style={styles.text}>Questionários {"\n"}respondidos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field1: {
        backgroundColor: '#941e1e',
        width: '55%',
        height: 150,
        marginRight: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field2: {
        backgroundColor: '#d84141',
        width: '35%',
        height: 150,
        marginLeft: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field3: {
        backgroundColor: '#d84141',
        width: '35%',
        height: 150,
        marginRight: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field4: {
        backgroundColor: '#941e1e',
        width: '55%',
        height: 150,
        marginLeft: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    }
})

