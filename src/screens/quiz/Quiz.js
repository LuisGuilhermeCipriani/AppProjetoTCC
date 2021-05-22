import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: [],
            quiz: {},
            question_answer: [],
            question: '',
            answer: '',
            index: 0,
            isSelected: false,
        };
        this.id = this.props.navigation.getParam('idDisciplineUser');
    }

    async componentDidMount() {
        this.getQuestions();
        this.getAnswers();
    }

    getQuestions = async () => {
        try {
            const response = await Api.get('/question/findAll');

            const { questions } = response.data;

            this.setState({ questions });
        } catch (err) {
            console.log(err);
        }
    }

    getAnswers = async () => {
        try {
            const response = await Api.get('/answer/findAll');

            const { answers } = response.data;

            this.setState({ answers });
        } catch (err) {
            console.log(err);
        }
    }

    saveState = async () => {
        const { question_answer, questions, answers, answer, index } = this.state;
        question_answer.push({
            idQuestion: questions[index]._id,
            idAnswer: answers[answer]._id
        });
        this.setState({ question_answer });
    }

    registerQuiz = async () => {
        try {
            const { question_answer } = this.state;

            const response = await Api.post('/quiz/register', {
                disciplineUser: this.id,
                status: 'S',
                questionAnswer: question_answer
            }).then(() => {
                console.log('Salvo com sucesso!')
            })
        } catch (err) {
            console.log(err);
        }
    }

    teste = () => {
        this.boundMaximumLimit();
        this.saveState();
    }

    renderScreens = () => {
        const { index, questions } = this.state;

        return <View style={{ alignItems: 'center' }}>
            <View>
                <Text style={styles.countQuestion}>Questão {index + 1} de {questions.length}</Text>
                <Text style={styles.question}>{index + 1} - {questions[index].title}</Text>
            </View>
        </View>
    }

    renderScreen1 = () => {
        const { index, questions } = this.state;

        return <View>
            <View>
                <Text style={styles.countQuestion}>Questão {index + 1} de {questions.length}</Text>
            </View>
        </View>
    }

    renderScreen2 = () => {
        const { index, questions } = this.state;

        return <View style={{ alignItems: 'center' }}>
            <View>
                <Text style={styles.question}>{questions[index].title}</Text>
            </View>
        </View>
    }



    boundMinimumLimit = () => {
        let { index } = this.state;
        if (index > 0) {
            index = index - 1;
            this.setState({ index: index });
        }
    }

    boundMaximumLimit = () => {
        let { questions, index } = this.state;
        if (index < questions.length - 1) {
            index = index + 1;
            this.setState({ index: index });
        }
    }

    render() {
        const { navigation } = this.props;
        const { questions, answers, index } = this.state;
        const options = answers.map((answer, index) => {
            return { label: index + 1 + ' - ' + answer.title, value: index + 1 }
        }
        );

        /*return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                {(questions.length > 0 && answers.length > 0) && this.renderScreens()}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.boundMinimumLimit() }}>
                        <Icon name='chevron-left' size={25} />
                    </TouchableOpacity>
                    <RadioForm
                        radio_props={options}
                        onPress={(answer) => { this.setState({ answer }) }}
                        formHorizontal={false}
                        initial={false}
                        labelStyle={{ marginRight: 10, marginBottom: 30 }}
                        animation={false}
                        buttonColor={'#cc0000'}
                        selectedButtonColor = '#808080'
                    />
                    <TouchableOpacity style={styles.forwardButton} onPress={() => { this.boundMaximumLimit() }}>
                        <Icon name='chevron-right' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity style={styles.commentButton} onPress={() => {
                        navigation.navigate('Comments')
                    }}>
                        <Icon name='comment' style={styles.icon}/>
                        <Text style={styles.textButton}>Comentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.teste()}>
                        <Icon name='save' style={styles.icon}/>
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendButton} onPress={() => {
                        Alert.alert('Atenção', 'Deseja mesmo enviar o questionário?',
                            [
                                { text: 'Sim', onPress: () => this.registerQuiz() },
                                { text: 'Não' },
                            ])
                    }}>
                        <Icon name='send' style={styles.icon}/>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )*/

        return (
            <View style={styles.container}>
                <Header
                    title='Questionário'
                    menuIcon='menu'
                    navigation={navigation}
                />
                <View>
                    {(questions.length > 0 && answers.length > 0) && this.renderScreen1()}
                </View>
                <View style={styles.containerBody}>
                    <View>
                        {(questions.length > 0 && answers.length > 0) && this.renderScreen2()}
                        <RadioForm style={{ paddingLeft: 30 }}
                            radio_props={options}
                            onPress={(answer) => { this.setState({ answer }) }}
                            formHorizontal={false}
                            initial={false}
                            labelStyle={{ marginRight: 10, marginBottom: 10, fontSize: 20, paddingTop: 8 }}
                            animation={false}
                            buttonColor={'#cc0000'}
                            selectedButtonColor='#808080'
                        />
                    </View>

                </View>
                <View style={styles.buttonsField}>
                    {
                        index !== 0 &&
                        <TouchableOpacity style={styles.backButton} onPress={() => { this.boundMinimumLimit() }}>
                            <Icon name='chevron-left' style={styles.icon} />
                            <Text style={styles.textButton}>Anterior</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.teste()}>
                        <Icon name='save' style={styles.icon} />
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                    {
                        questions.length !== index + 1 ?
                        <TouchableOpacity style={styles.forwardButton} onPress={() => { this.boundMaximumLimit() }}>
                            <Icon name='chevron-right' style={styles.icon} />
                            <Text style={styles.textButton}>Próximo</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.sendButton} onPress={() => {
                            Alert.alert('Atenção', 'Deseja mesmo enviar o questionário?',
                                [
                                    { text: 'Sim', onPress: () => this.registerQuiz() },
                                    { text: 'Não' },
                                ])
                        }}>
                            <Icon name='send' style={styles.icon2} />
                            <Text style={styles.textButton2}>Enviar</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#bfbfbf',
        height: '100%',
        flex: 1,
        flexDirection: 'column'
    },
    buttonsField: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        height: '10%',
        alignItems: 'center',
        marginTop: 10
    },
    forwardButton: {
        backgroundColor: '#d3302f',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    backButton: {
        backgroundColor: '#d3302f',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    commentButton: {
        backgroundColor: '#d3302f',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 10
    },
    saveButton: {
        backgroundColor: '#206020',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    sendButton: {
        backgroundColor: '#d2d22d',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    textButton: {
        color: '#ffffff',
        padding: 10,
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    textButton2: {
        color: '#000000',
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    countQuestion: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
        padding: 20,
        paddingBottom: 30
    },
    icon: {
        color: '#ffffff',
        fontSize: 20,
        paddingLeft: 10
    },
    icon2: {
        color: '#000000',
        fontSize: 20,
        paddingLeft: 10
    },
    containerBody: {
        backgroundColor: '#ffffff',
        height: '65%',
        width: '90%',
        borderRadius: 10,
    },
    scrollView: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        marginTop: 20,
        height: 400,
        borderColor: '#d3302f',
        backgroundColor: '#ffffff',
    },
})