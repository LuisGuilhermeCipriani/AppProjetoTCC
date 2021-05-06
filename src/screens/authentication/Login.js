import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
            const response = await Api.post('/auth/authenticate', {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>
                        <View style={styles.logo}>
                            <Text style={styles.textLogo}>UFJF</Text>
                        </View>
                        <Text style={styles.textHeader}>Sistema de apoio à análise de avaliações</Text>
                    </View>
                </View>
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
                    <TouchableOpacity style={styles.infoButton}>
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
        backgroundColor: '#bfbfbf'
    },
    containerHeader: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25
    },
    inputText: {
        padding: 5,
        fontSize: 20,
        borderWidth: 2
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
        height: '55%',
        padding: 30
    },
    footer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
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
        height: '80%',
        borderWidth: 2,
        justifyContent: 'space-around',
        padding: 20
    },
    contentBody: {
        height: '40%',
        justifyContent: 'space-between'
    }
});
