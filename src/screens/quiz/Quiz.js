import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: [],
            question_answer: [],
            index: 0,
            commentary: ''
        };
        this.questionnaire = this.props.navigation.getParam('questionnaire');
    }

    async componentDidMount() {
        this.setState({ question_answer: this.questionnaire.questionAnswer });
        await this.getQuestions();
        await this.getAnswers();
        await this.initial();
    }

    initial = async () => {
        const { question_answer, questions, answers } = this.state;

        const list = question_answer.map(object => {
            const question = questions.filter(obj => obj._id == object.idQuestion)[0];
            const answer = answers.filter(obj => obj._id == object.idAnswer)[0];
            return ({
                ...object,
                idAnswer: answer,
                idQuestion: question
            })
        });

        const listQuestionAnswer = list.map((object, index) => {
            return list.filter(obj => obj.idQuestion.option == index + 1)[0];
        });

        this.setState({ question_answer: listQuestionAnswer, commentary: this.questionnaire.commentary })
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

    updateState = (value) => {
        const { commentary, answers, index } = this.state;
        let { question_answer } = this.state;
        const answer = answers.filter(object => object.option == value)[0];

        question_answer[index] = {
            ...question_answer[index],
            idAnswer: answer
        };

        this.setState({ question_answer });
    }

    saveState = async () => {
        try {
            const { question_answer, commentary } = this.state;
            const { idQuestionnaire } = question_answer[0];
            const list = {
                idQuestionnaire,
                commentary,
                status: 'I',
                questionAnswer: question_answer
            }
            const response = await Api.put('/questionnaire/update', list)
            Alert.alert('Progresso salvo com sucesso!')
        } catch (error) {
            console.log(error)
        }

    }

    updateQuestionnaire = async () => {
        try {
            const { question_answer, commentary } = this.state;
            const { idQuestionnaire } = question_answer[0];
            const allchecked = question_answer.filter(object => object.idAnswer == undefined);

            if (allchecked.length > 0) {
                Alert.alert('Preencha todas as respostas!');
                this.setState({ index: allchecked[0].idQuestion.option - 1 });
            } else {
                const list = {
                    idQuestionnaire,
                    commentary,
                    status: 'S',
                    questionAnswer: question_answer
                }
                const response = await Api.put('/questionnaire/update', list)
                Alert.alert('Questionário enviado com sucesso!')
            }
        } catch (err) {
            console.log(err);
        }
    }

    renderScreen1 = () => {
        const { index, question_answer } = this.state;
        const { idQuestion } = question_answer[index];
        return <View>
            <View>
                <Text style={styles.countQuestion}>Questão {idQuestion.option} de {question_answer.length}</Text>
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
            this.setState({ index });
        }
    }

    boundMaximumLimit = () => {
        let { questions, index } = this.state;
        if (index <= questions.length - 1) {
            index = index + 1;
            this.setState({ index });
        }
    }

    renderQuestions = () => {
        const { index, question_answer } = this.state;
        if (question_answer.length > 0) {

            const question = question_answer[index].idQuestion.title;
            return question;
        }
    }

    renderRadio = () => {
        const { index, question_answer, answers } = this.state;
        const option = question_answer[index].idAnswer != undefined ? question_answer[index].idAnswer.option : 0;
        return (
            answers.map(object => {
                return <View key={object._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value={object.option}
                        status={option === object.option ? 'checked' : 'unchecked'}
                        onPress={() => { this.updateState(object.option) }}
                    />
                    <Text style={{ fontSize: 20 }}>{object.option} - {object.title}</Text>
                </View>
            })
        )
    }

    renderBody = () => {
        const { index, question_answer } = this.state;

        return (question_answer.length > 0
            ?
            index < question_answer.length ?
                <View style={{ flex: 1, width: '100%' }}>
                    {this.renderScreen1()}
                    <View style={{
                        justifyContent: 'space-between', flex: 1, backgroundColor: 'white', marginLeft: 10,
                        marginRight: 10, borderRadius: 10
                    }}>
                        <Text style={styles.question}>{this.renderQuestions()}</Text>
                        <View style={{ marginBottom: 10, padding: 10 }}>{this.renderRadio()}</View>
                    </View>
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                            Comentários, sugestões ou críticas?
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                            Escreva abaixo:
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                        <TextInput
                            width='90%'
                            height='95%'
                            borderRadius={10}
                            fontSize={20}
                            multiline={true}
                            textAlignVertical='top'
                            padding={10}
                            value={this.state.commentary}
                            placeholder='Digite aqui...'
                            backgroundColor='#ffffff'
                            onChangeText={(commentary) => {
                                this.setState({ commentary })
                            }}
                        />
                    </View>
                    <View style={{
                        width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
                        padding: 10
                    }}>
                        <TouchableOpacity style={styles.cleanButton} onPress={() => {
                            this.setState({ commentary: '' })
                        }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Limpar</Text>
                        </TouchableOpacity>
                        <View style={styles.backButton} />
                        <View style={styles.backButton} />
                    </View>
                </View>
            :
            <View />
        )
    }

    renderFooter = () => {
        const { index, question_answer } = this.state;

        return (question_answer.length > 0
            ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: '#bfbfbf', padding: 10 }}>
                {
                    index !== 0 &&
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.boundMinimumLimit() }}>
                        <Icon name='chevron-left' style={styles.icon} />
                        <Text style={styles.textButton}>Anterior</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.saveButton} onPress={() => this.saveState()}>
                    <Icon name='save' style={styles.icon} />
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
                {
                    question_answer.length + 1 !== index + 1 ?
                        <TouchableOpacity style={styles.forwardButton} onPress={() => { this.boundMaximumLimit() }}>
                            <Icon name='chevron-right' style={styles.icon} />
                            <Text style={styles.textButton}>Próximo</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.sendButton} onPress={() => {
                            Alert.alert('Atenção', 'Deseja mesmo enviar o questionário?',
                                [
                                    { text: 'Sim', onPress: () => this.updateQuestionnaire() },
                                    { text: 'Não' },
                                ])
                        }}>
                            <Icon name='send' style={styles.icon2} />
                            <Text style={styles.textButton2}>Enviar</Text>
                        </TouchableOpacity>
                }
            </View>
            :
            <View />
        )
    }

    render() {
        const { navigation } = this.props;
        const { title, code } = this.questionnaire.idDiscipline;

        return (
            <View style={styles.container}>
                <Header
                    title={code + ' - ' + title}
                    menuIcon='arrow-back'
                    navigation={navigation}
                    isBack={true}
                    screenName='SelectionScreen'
                />
                {this.renderBody()}
                {this.renderFooter()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#bfbfbf',
        //height: '100%',
        flex: 1,
        flexDirection: 'column'
    },
    buttonsField: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        //height: '10%',
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
    cleanButton: {
        backgroundColor: 'blue',
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
        //height: '70%',
        width: '90%',
        borderRadius: 10,
        justifyContent: 'space-between'
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