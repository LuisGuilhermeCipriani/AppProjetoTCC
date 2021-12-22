import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../colors/AppColors';

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
                <LinearGradient colors={[AppColors.backgroundColor12, AppColors.backgroundColor10, AppColors.backgroundColor11]} style={styles.header}>

                    <View style={styles.containerHeader}>
                        <Text style={styles.textUFJF}>UFJF</Text>
                        <Text style={styles.textHeader}>Sistema de apoio à análise de avaliações discentes</Text>
                    </View>
                </LinearGradient>
                <View style={styles.body}>
                    <View style={styles.containerBody}>
                        <View style={styles.contentBody}>
                            <TextInput style={styles.inputText} onChangeText={cpf => this.setState({ cpf })} placeholder='CPF'
                                underlineColorAndroid={AppColors.underlineColor} />
                            <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={password => this.setState({ password })} placeholder='Senha'
                                underlineColorAndroid={AppColors.underlineColor} />
                        </View>
                        <TouchableOpacity style={styles.enterButton} onPress={() => { this.signIn() }}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.infoButton} onPress={() => { this.help() }}>
                        <Icon name='help-circle' size={30} color={AppColors.iconColor1} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColor11,
    },
    containerHeader: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        color: AppColors.textColor1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 20,
        textShadowColor: AppColors.textShadowColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
    textUFJF: {
        fontSize: 50,
        color: AppColors.textColor2,
        //textShadowColor: AppColors.textShadowColor,
        //textShadowOffset: { width: 3, height: 3 },
        //textShadowRadius: 10,
    },
    inputText: {
        padding: 5,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 10
    },
    textButton: {
        color: AppColors.textColor1,
        fontSize: 20,
    },
    enterButton: {
        padding: 10,
        backgroundColor: AppColors.buttomColor1,
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
        backgroundColor: AppColors.buttomColor1,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '35%',
    },
    body: {
        flex: 1
    },
    footer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: AppColors.backgroundColor4,
        paddingRight: 40
    },
    containerBody: {
        backgroundColor: AppColors.backgroundColor4,
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
