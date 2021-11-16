import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import Api from '../../services/Api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        state = {
            cpf: '',
            password: ''
        }
    }

    signIn = async () => {
        try {
            const { cpf, password } = this.state;
            const response = await Api.post('/user/authenticate', {
                cpf,
                password
            });

            const { user } = response.data;

            if (user !== null) {
                await AsyncStorage.multiSet([
                    ['@APP:user', JSON.stringify(user)]
                ]);

                this.props.navigation.navigate('Main');
            }

        } catch (res) {
            Alert.alert('Atenção! ', 'Dados incorretos');
            console.log(res)
        }
    }

    help = () => {
        const helpMessage = 'Para acessar o sistema é necessário informar o CPF e Senha cadastrados no Sistema de Apoio Integrado (SIGA).' 
        + '\n\nCaso haja incompatibilidade nos dados, favor entrar em contato com o suporte da Universidade.'
        Alert.alert('Ajuda ', helpMessage);
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#f2c0c0', '#e06c6c', '#d3302f']} style={styles.header}>

                    <View style={styles.containerHeader}>
                        <Text style={styles.textUFJF}>UFJF</Text>
                        <Text style={styles.textHeader}>Sistema de apoio à análise de avaliações discentes</Text>
                    </View>
                </LinearGradient>
                <View style={styles.body}>
                    <View style={styles.containerBody}>
                        <View style={styles.contentBody}>
                            <TextInput style={styles.inputText} onChangeText={cpf => this.setState({ cpf })} placeholder='CPF'
                                underlineColorAndroid='#c3c3c3' />
                            <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={password => this.setState({ password })} placeholder='Senha'
                                underlineColorAndroid='#c3c3c3' />
                        </View>
                        <TouchableOpacity style={styles.enterButton} onPress={() => { this.signIn() }}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.infoButton} onPress={() => { this.help() }}>
                        <Icon name='help-circle' size={30} color='#ffffff' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3302f'
    },
    containerHeader: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 20,
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
    textUFJF: {
        fontSize: 50,
        color: '#ffffff',
        textShadowColor: '#000000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10,
    },
    inputText: {
        padding: 5,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 10
    },
    textButton: {
        color: '#ffffff',
        fontSize: 20,
    },
    enterButton: {
        padding: 10,
        backgroundColor: '#d3302f',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    infoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#d3302f',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '35%',
    },
    body: {
        //height: '55%',
        //padding: 30,
        flex: 1
    },
    footer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        paddingRight: 40
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: '#d3302f',
    },
    textLogo: {
        color: '#ffffff',
        fontSize: 40
    },
    containerBody: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'space-around',
        padding: 20
    },
    contentBody: {
        height: 100,
        justifyContent: 'space-between'
    }
});
