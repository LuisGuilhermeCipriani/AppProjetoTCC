import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

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

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                {this.renderScreens()}
                <RadioForm
                    radio_props={options}
                    onPress={(value) => { }}
                    formHorizontal={false}
                    initial={false}
                    labelStyle={{ marginRight: 10, marginBottom: 30 }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity style={styles.button2} onPress={() => { this.boundMinimumLimit() }}>
                        <Text style={styles.textButton}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { this.boundMaximumLimit() }}>
                        <Text style={styles.textButton}>Avançar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#836FFF',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginRight: 20,
    },
    button2: {
        backgroundColor: '#836FFF',
        width: 80,
        height: 30,
        alignItems: 'center',
        marginLeft: 20,
    },
    textButton: {
        color: '#ffffff',
        padding: 5,
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