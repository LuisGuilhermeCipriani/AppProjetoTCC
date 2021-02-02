import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class Quiz extends Component {
    state = {
        list: [
            {
                question: 'O professor apresentou o plano de curso?',
                answer: 'Sim'
            },
            {
                question: 'O professor é pontual?',
                answer: 'Sim'
            },
            {
                question: 'O professor cumpriu com o cronograma da disciplina?',
                answer: 'Não'
            },
            {
                question: 'O professor é assíduo?',
                answer: 'Não'
            },
            {
                question: 'O desempenho na disciplina foi suficiente para o aprendizado?',
                answer: 'Sim'
            }
        ],
        index: 0
    }

    renderScreens = () => {
        const { list, index } = this.state;
        return <View style={{ alignItems: 'center' }}>
            <View>
                <Text style={styles.countQuestion}>Questão {index + 1} de {list.length}</Text>
                <Text style={styles.question}>{index + 1} - {list[index].question}</Text>
                <Text>{list[index].answer}</Text>
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
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
        ];

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                {this.renderScreens()}
                <RadioForm
                    radio_props={options}
                    onPress={(value) => { }}
                    formHorizontal={false}
                    initial={-1}
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