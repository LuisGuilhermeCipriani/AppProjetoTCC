import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>UFJF</Text>
                    <Text style={styles.textHeader2}>Sistema de apoio à análise das avaliações discentes dos cursos de graduação da UFJF</Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput style={styles.inputText} placeholder='CPF' underlineColorAndroid='#c3c3c3'/>
                    <TextInput style={styles.inputText} placeholder='Senha' underlineColorAndroid='#c3c3c3'/>
                </View>
                <View style={styles.styleButton}>
                    <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Main')}}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                    <View style={styles.fieldButton2}>
                        <TouchableOpacity style={styles.button2}>
                            <Icon name='help-circle' size={30} color='#ffffff'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    header: {
        flex: 1,
        width: '90%',
        height: 100,
        marginTop: 50,
        backgroundColor: '#d3302f',
        borderRadius: 10

    },
    textHeader: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        marginTop: 20,
        marginBottom: 20,
    },
    textHeader2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {width:-1,height:1},
        textShadowRadius: 20,
    },
    inputText: {
        padding: 10,
        fontSize: 20
    },
    containerInput: {
        flex: 1,
        justifyContent: 'center',
        width: '90%',
        maxHeight: '20%',
        marginTop: 10
    },
    button: {
        padding: 10,
        backgroundColor: '#d3302f',
        marginTop: 15
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#345555'
    },
    styleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    },
    textButton: {
        color: '#ffffff',
        fontSize: 18
    },
    fieldButton2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 30
    }
});
