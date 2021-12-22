import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import { AppColors } from '../../colors/AppColors';

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
            commentary: '',
            radioColor: AppColors.radioColor1
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
        const { answers, index } = this.state;
        let { question_answer } = this.state;
        const answer = answers.filter(object => object.option == value)[0];

        question_answer[index] = {
            ...question_answer[index],
            idAnswer: answer
        };

        this.setState({ question_answer, radioColor: AppColors.radioColor1 });
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
            this.props.navigation.navigate('ScreenSelectionDisciplines')
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
                this.setState({ index: allchecked[0].idQuestion.option - 1, radioColor: AppColors.radioColor2 });
            } else {
                const list = {
                    idQuestionnaire,
                    commentary,
                    status: 'S',
                    questionAnswer: question_answer
                }
                const response = await Api.put('/questionnaire/update', list)
                Alert.alert('Questionário enviado com sucesso!')
                this.props.navigation.navigate('ScreenSelectionDisciplines', {load: true})
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

        return <View style={styles.viewRenderScreen2}>
            <View>
                <Text style={styles.question}>{questions[index].title}</Text>
            </View>
        </View>
    }

    boundMinimumLimit = () => {
        let { index } = this.state;
        if (index > 0) {
            index = index - 1;
            this.setState({ index, radioColor: AppColors.radioColor1 });
        }
    }

    boundMaximumLimit = () => {
        let { questions, index } = this.state;
        if (index <= questions.length - 1) {
            index = index + 1;
            this.setState({ index, radioColor: AppColors.radioColor1 });
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
        const { index, question_answer, answers, radioColor } = this.state;
        const option = question_answer[index].idAnswer != undefined ? question_answer[index].idAnswer.option : 0;
        return (
            answers.map(object => {
                return <View key={object._id} style={styles.viewRenderRadio}>
                    <RadioButton
                        value={object.option}
                        status={option === object.option ? 'checked' : 'unchecked'}
                        onPress={() => { this.updateState(object.option) }}
                        uncheckedColor={radioColor}
                        color={AppColors.radioColor3}
                    />
                    <Text style={styles.textRenderRadio}>{object.option} - {object.title}</Text>
                </View>
            })
        )
    }

    renderBody = () => {
        const { index, question_answer } = this.state;

        return (question_answer.length > 0
            ?
            index < question_answer.length ?
                <View style={styles.viewRenderBody1}>
                    {this.renderScreen1()}
                    <View style={styles.viewRenderBody2}>
                        <Text style={styles.question}>{this.renderQuestions()}</Text>
                        <View style={styles.viewRenderBody3}>{this.renderRadio()}</View>
                    </View>
                </View>
                :
                <View style={styles.viewRenderBody4}>
                    <View style={styles.viewRenderBody5}>
                        <Text style={styles.textRenderBody1}>
                            Comentários, sugestões ou críticas?
                        </Text>
                        <Text style={styles.textRenderBody2}>
                            Escreva abaixo:
                        </Text>
                    </View>
                    <View style={styles.viewRenderBody6}>
                        <TextInput
                            width='90%'
                            height='95%'
                            borderRadius={10}
                            fontSize={20}
                            maxLength = {500}
                            multiline={true}
                            textAlignVertical='top'
                            padding={10}
                            value={this.state.commentary}
                            placeholder='Digite aqui...'
                            backgroundColor={AppColors.textColor1}
                            onChangeText={(commentary) => {
                                this.setState({ commentary })
                            }}
                        />
                    </View>
                    <View style={styles.viewRenderBody7}>
                        <TouchableOpacity style={styles.cleanButton} onPress={() => {
                            this.setState({ commentary: '' })
                        }}>
                            <Icon2 name='broom' style={styles.leftIcon} />
                            <Text style={styles.textButton2}>Limpar</Text>
                        </TouchableOpacity>
                        <View style={styles.backButton} />
                        <View style={styles.viewRenderBody8}><Text>{500 - this.state.commentary.length} caracteres restantes</Text></View> 
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
            <View style={styles.viewRenderFooter}>
                {
                    index !== 0 &&
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.boundMinimumLimit() }}>
                        <Icon name='chevron-left' style={styles.leftIcon} />
                        <Text style={styles.textButton}>Anterior</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.saveButton} onPress={() => {
                    Alert.alert('Atenção', 'Deseja salvar progresso atual?',
                    [
                        { text: 'Sim', onPress: () => this.saveState() },
                        { text: 'Não' },
                    ])
                    }}>
                    <Icon name='save' style={styles.leftIcon} />
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
                {
                    question_answer.length + 1 !== index + 1 ?
                        <TouchableOpacity style={styles.forwardButton} onPress={() => { this.boundMaximumLimit() }}>
                            <Text style={styles.textButton}>Próximo</Text>
                            <Icon name='chevron-right' style={styles.rightIcon} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.sendButton} onPress={() => {
                            Alert.alert('Atenção', 'Deseja mesmo enviar o Questionário? Uma vez finalizado não será mais possível altera-lo',
                                [
                                    { text: 'Sim', onPress: () => this.updateQuestionnaire() },
                                    { text: 'Não' },
                                ])
                        }}>
                            <Icon name='send' style={styles.leftIcon} />
                            <Text style={styles.textButton}>Enviar</Text>
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
        backgroundColor: AppColors.backgroundColor6,
        flex: 1,
        flexDirection: 'column'
    },
    forwardButton: {
        backgroundColor: AppColors.buttomColor4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    backButton: {
        backgroundColor: AppColors.buttomColor4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    cleanButton: {
        backgroundColor: AppColors.buttomColor5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    saveButton: {
        backgroundColor: AppColors.buttomColor6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    sendButton: {
        backgroundColor: AppColors.buttomColor7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation: 5,
        width: '30%'
    },
    textButton: {
        color: AppColors.textColor1,
        padding: 10,
        fontSize: 15,
        textShadowColor: AppColors.textShadowColor2,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    textButton2: {
        color: AppColors.textColor1, 
        padding: 5, 
        paddingRight: 10,
        fontSize: 15, 
        fontWeight: 'bold',
        textShadowColor: AppColors.textShadowColor2,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
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
    leftIcon: {
        color: AppColors.iconColor1,
        fontSize: 20,
        paddingLeft: 10,
        elevation: 5
    },
    rightIcon: {
        color: AppColors.iconColor1,
        fontSize: 20,
        paddingRight: 10,
        elevation: 5
    },
    viewRenderScreen2: {
        alignItems: 'center',
    },
    viewRenderRadio: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    textRenderRadio: {
        fontSize: 20,
    },
    viewRenderBody1: {
        flex: 1, 
        width: '100%',
    },
    viewRenderBody2: {
        justifyContent: 'space-between', 
        flex: 1, 
        backgroundColor: AppColors.backgroundColor4, 
        marginLeft: 10,
        marginRight: 10, 
        borderRadius: 10,
    },
    viewRenderBody3: {
        marginBottom: 10, 
        padding: 10,
    },
    viewRenderBody4: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '100%',
    },
    viewRenderBody5: {
        width: '100%',
    },
    textRenderBody1: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 10, 
        textAlign: 'center',
    },
    textRenderBody2: {
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center',
    },
    viewRenderBody6: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        width: '100%',
    },
    viewRenderBody7: {
        width: '90%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        padding: 10,
    },
    viewRenderBody8: {
        height:'100%',
    },
    viewRenderFooter: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        backgroundColor: AppColors.backgroundColor6, 
        padding: 10,
    }
})