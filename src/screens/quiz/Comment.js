import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../../colors/AppColors';


export default class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Deixe um comentário abaixo</Text>
                    <View style={styles.scrollView}>
                        <TextInput
                            style={styles.text}
                            placeholder='Escreva aqui'
                            onChangeText={(text) => this.setState({ text })}
                            multiline={true}
                            scrollEnabled={true}
                        />
                    </View>
                </View>
                <View style={styles.viewStyle}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { 
                        this.props.navigation.goBack() 
                        }}>
                        <Icon name='remove' style={styles.icon}/>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => { 
                        Alert.alert('Atenção', 'Deseja mesmo salvar?',
                        [
                            { text: 'Sim', onPress: () => this.props.navigation.goBack() },
                            { text: 'Não' },
                        ])
                        }}>
                        <Icon name='check' style={styles.icon}/>
                        <Text style={styles.textButton} >Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: AppColors.backgroundColor5, 
        height: '100%', 
        width: '100%',
    },
    container: {
        paddingTop: 25,
        marginLeft: 30,
        marginRight: 30,
    },
    scrollView: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        marginTop: 20,
        height: 400,
        borderColor: AppColors.backgroundColor1,
        backgroundColor: AppColors.backgroundColor4,
    },
    text: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: AppColors.buttomColor1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    saveButton: {
        backgroundColor: AppColors.buttomColor1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    textButton: {
        color: AppColors.textColor1,
        padding: 0,
        fontSize: 15,
        textShadowColor: AppColors.textShadowColor2,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    icon: {
        color: AppColors.iconColor1,
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
    },
    viewStyle: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        padding:70,
    }
})