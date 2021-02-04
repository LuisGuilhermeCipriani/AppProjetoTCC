import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Quiz extends Component {
    state = {
        list: [
            {
                question: 'O professor disponibilizou o plano de curso da disciplina na primeira semana de aula?',
                answer: 'Sim'
            },
            {
                question: 'O professor é pontual?',
                answer: 'Sim'
            },
            {
                question: 'O professor é assíduo às aulas?',
                answer: 'Não'
            },
            {
                question: 'O professor usa todo o tempo de aula?',
                answer: 'Não'
            },
            {
                question: 'O professor está disponível no horário de atendimento?',
                answer: 'Sim'
            }
        ],
        index: 0,
        isSelected: false,
    }

    renderScreens = () => {
        const { list, index } = this.state;
        return <View style={{ alignItems: 'center' }}>
            <View>
                <Text style={styles.countQuestion}>Questão {index + 1} de {list.length}</Text>
                <Text style={styles.question}>{index + 1} - {list[index].question}</Text>
            </View>
        </View>
    }

    boundMinimumLimit = () => {
        let { list, index } = this.state;
        if (index > 0) {
            index = index - 1;
            this.setState({ index: index });
        }
    }

    boundMaximumLimit = () => {
        let { list, index } = this.state;
        if (index < list.length - 1) {
            index = index + 1;
            this.setState({ index: index });
        }
    }

    render() {
        const options = [
            { label: 'Excelente', value: 5 },
            { label: 'Bom', value: 4 },
            { label: 'Regular', value: 3 },
            { label: 'Insatisfatório', value: 2 },
            { label: 'Inaceitável', value: 1 },
        ];
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                {this.renderScreens()}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.boundMinimumLimit() }}>
                        <Icon name='chevron-left' size={25} />
                    </TouchableOpacity>
                    <RadioForm
                        radio_props={options}
                        onPress={(value) => { }}
                        formHorizontal={false}
                        initial={false}
                        labelStyle={{ marginRight: 10, marginBottom: 30 }}
                    />
                    <TouchableOpacity style={styles.forwardButton} onPress={() => { this.boundMaximumLimit() }}>
                        <Icon name='chevron-right' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity style={styles.commentButton} onPress={() => {
                        navigation.navigate('Comments')
                    }}>
                        <Text style={styles.textButton}>Comentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => {
                        Alert.alert('', 'Salvo com Sucesso!',
                            [
                                { text: 'Ok', onPress: () => this.props.navigation.goBack() },
                            ])
                    }}>
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendButton} onPress={() => {
                        Alert.alert('Atenção', 'Deseja mesmo enviar o questionário?',
                            [
                                { text: 'Sim', onPress: () => this.props.navigation.goBack() },
                                { text: 'Não' },
                            ])
                    }}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    forwardButton: {
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 40,
    },
    backButton: {
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 40,
    },
    commentButton: {
        backgroundColor: '#dbd546',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginLeft: 20,
    },
    saveButton: {
        backgroundColor: '#42c246',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginLeft: 80,
    },
    sendButton: {
        backgroundColor: '#6975c2',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginRight: 30,
    },
    textButton: {
        color: '#ffffff',
        padding: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    countQuestion: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    question: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 15,
        fontWeight: 'bold',
    }
})