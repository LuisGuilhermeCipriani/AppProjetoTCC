import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#d6d6d6', height: '100%', width: '100%' }}>
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
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:70}}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { 
                        this.props.navigation.goBack() 
                        }}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => { 
                        Alert.alert('Atenção', 'Deseja mesmo salvar?',
                        [
                            { text: 'Sim', onPress: () => this.props.navigation.goBack() },
                            { text: 'Não' },
                        ])
                        }}>
                        <Text style={styles.textButton} >Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        marginLeft: 30,
        marginRight: 30,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    scrollView: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        marginTop: 20,
        height: 400,
        borderColor: '#ffad29',
        backgroundColor: '#ffffff',
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
        backgroundColor: '#c96055',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginRight: 20,
    },
    saveButton: {
        backgroundColor: '#42c246',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginLeft: 20,
    },
    textButton: {
        color: '#ffffff',
        padding: 5,
    },
})