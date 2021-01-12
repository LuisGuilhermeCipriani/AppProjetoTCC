import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>UFJF</Text>
                    <Text style={styles.textHeader2}>Sistema de apoio à análise das avaliações discentes dos cursos de graduação da UFJF</Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput style={styles.TextInput} placeholder='CPF' underlineColorAndroid='#ccc' />
                    <TextInput style={styles.TextInput} placeholder='Senha' underlineColorAndroid='#ccc' />
                </View>
                <View style={styles.styleButton}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                    <View style={styles.fieldButton2}>
                        <TouchableOpacity style={styles.button2}>
                            <Icon name='help-circle' size={40} color='#ffffff'/>
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
    },
    header: {
        backgroundColor: '#c3c3c3',
        width: '90%',
        height: '35%',
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 6,

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
        fontSize: 30,
        marginBottom: 10,
    },
    containerInput: {
        width: '90%',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#345555',
        padding: 10,
        width: 100,
        height: 50,
        marginTop: 20,
    },
    button2: {
        backgroundColor: '#345555',
        padding: 10,
        width: 60,
        height: 60,
        marginTop: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        width: '90%',
        marginBottom: 10,
    },
    textButton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    fieldButton2: {
        alignItems: 'flex-end',
        width: '100%', 
        marginRight: 10, 
        marginBottom: 10,
    }
});
