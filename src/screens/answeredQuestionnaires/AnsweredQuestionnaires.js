import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Modal, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import RadioForm from 'react-native-simple-radio-button';

import Header from '../../components/header/Header';
import Api from '../../services/Api';
import { AppColors } from '../../colors/AppColors';

moment = require('moment');
moment.locale('pt-BR');

export default class AnsweredQuestionnaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnairesByPeriod: [],
            selectedStartDate: null,
            modalVisible: false,
            startDate: new Date(),
            finalDate: new Date(),
            option: 0,
            allSelected: 0,
            isLoading: false,
            period: '',
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.radioValues = [
            { label: 'Todos', value: 0 },
            { label: 'Período', value: 1 },
        ]
    }

    async componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        this.props.navigation.addListener('didFocus', () => this.getDisciplines())
    }

    getDisciplines = async () => {
        try {
            this.setState({ isLoading: true })
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { questionnairesByPeriod } = (await Api.post('/questionnaire/findAllByPeriodFinished',
                { idStudent: _id })).data;

            if (questionnairesByPeriod !== null) {
                this.setState({ questionnairesByPeriod });
            }
            this.setState({ isLoading: false })
        } catch (err) {
            console.log(err);
        }
    }

    onDateChange(date) {
        const { option } = this.state;
        if (option == 1) {
            this.setState({
                startDate: date,
            });
        }
        if (option == 2) {
            this.setState({
                finalDate: date,
            });
        }
    }

    renderRadio = () => {
        return (
            <RadioForm
                radio_props={this.radioValues}
                initial={0}
                buttonColor={AppColors.radioColor1}
                buttonSize={12}
                buttonOuterColor={AppColors.radioColor1}
                selectedButtonColor={AppColors.radioColor1}
                labelStyle={{ fontSize: 12, color: AppColors.radioColor1 }}
                formHorizontal={true}
                labelHorizontal={false}
                onPress={(allSelected) => { this.setState({ allSelected }) }}
            />
        )
    }

    findByDate = () => {
        const { questionnairesByPeriod, allSelected } = this.state;
        const questionnairesByDate = questionnairesByPeriod.filter(value => (
            moment(this.state.startDate).format('DD/MM/YYYY') <= moment(value.finalDate).format('DD/MM/YYYY') &&
            moment(this.state.finalDate).format('DD/MM/YYYY') >= moment(value.finalDate).format('DD/MM/YYYY')
        ))
        return allSelected == 0 ? questionnairesByPeriod : questionnairesByDate
    }

    findByPeriod = () => {
        const { questionnairesByPeriod, allSelected, period } = this.state;
        const filteredQuestionnaire = questionnairesByPeriod.filter(value => (
            value.idClass.period == period
        ))
        return allSelected == 0 ? questionnairesByPeriod : filteredQuestionnaire
    }

    render() {
        const { selectedStartDate, allSelected, option, startDate, finalDate } = this.state;
        const initialDate = selectedStartDate ? selectedStartDate.toString() : '';
        //const questionnairesByPeriod = this.findByDate();
        const questionnairesByPeriod = this.findByPeriod();

        if (this.state.isLoading) {
            return (
                <View style={styles.Indicator}>
                    <ActivityIndicator size="large" color={AppColors.backgroundColor1} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    title='Questionários Respondidos'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <View style={{ marginTop: 10 }}>
                    {this.renderRadio()}
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    flex={1}
                >
                    <View style={styles.containerCalendar}>
                        <View style={styles.calendar}>
                            <CalendarPicker
                                onDateChange={this.onDateChange}
                                weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
                                months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                                    'Outubro', 'Novembro', 'Dezembro']}
                                previousTitle='Anterior'
                                nextTitle='Próximo'
                                selectedDayColor={AppColors.calendarColor1}
                                selectedDayTextColor={AppColors.calendarColor2}
                                todayBackgroundColor={AppColors.calendarColor3}
                                selectedStartDate={option == 1 ? startDate : finalDate}
                                initialDate={option == 1 ? startDate : finalDate}
                            />
                        </View>
                        <TouchableOpacity style={styles.calendarTouchableOpacity} onPress={() => {
                            this.setState({ modalVisible: false })
                        }}>
                            <Text style={styles.textCalendarTouchableOpacity}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/*allSelected == 1 &&
                    <View style={styles.containerViewDate}>
                        <Text style={styles.textDate}>Selecione abaixo o intervalo de tempo</Text>
                        <View style={styles.viewDate}>
                            <Text style={styles.textDate}>De: </Text>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true, option: 1 })} style={styles.startDateTouchableOpacity} >
                                <Text>
                                    {String(moment(this.state.startDate).format('DD/MM/YYYY'))}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.textDate}>à </Text>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true, option: 2 })} style={styles.finalDateTouchableOpacity} >
                                <Text>
                                    {String(moment(this.state.finalDate).format('DD/MM/YYYY'))}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                */}

                {allSelected == 1 &&
                    <View style={styles.containerViewPeriod}>
                        <Text style={styles.textPeriod}>Informe abaixo o período</Text>
                        <TextInput style={styles.periodTextInput} borderRadius={5} padding={5} width='80%' backgroundColor="#ffffff" onChangeText={(period) => { this.setState({ period }) }} placeholder='Ex: 2021/3' />
                    </View>
                }

                <ScrollView style={styles.scroll} >

                    {questionnairesByPeriod.length > 0
                        ?
                        questionnairesByPeriod.map(questionnaire => {
                            const { title } = questionnaire.idDiscipline;
                            const codeDiscipline = questionnaire.idDiscipline.code;
                            const { name } = questionnaire.idProfessor;
                            const { code, period } = questionnaire.idClass;
                            const background = questionnaire.status == 'S' && AppColors.statusQuestionnaireColor7;
                            const border = questionnaire.status == 'S' && AppColors.statusQuestionnaireColor8;
                            const status = questionnaire.status == 'S' && 'Finalizado';
                            const textColor = questionnaire.status == 'S' && AppColors.statusQuestionnaireColor5;

                            return (
                                <View key={questionnaire._id}>
                                    <Card containerStyle={styles.cardContainerStyle}>
                                        <View style={styles.viewRender2}>
                                            <Text style={styles.nameDiscipline}>{title}</Text>
                                            <Text style={styles.nameDiscipline}>{codeDiscipline}</Text>
                                            <Text style={styles.nameDiscipline}>{'Docente: ' + name}</Text>
                                            <Text style={styles.nameDiscipline}>{'Turma: ' + code}</Text>
                                            <Text style={styles.nameDiscipline}>{'Período: ' + period}</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: background, width: '100%', borderBottomColor: border,
                                            justifyContent: 'center', borderRightColor: border, borderBottomWidth: 3,
                                            borderRightWidth: 3, paddingLeft: 10, paddingRight: 10, paddingTop: 10,
                                        }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10, color: textColor }}>{'Status: ' + status}</Text>
                                        </View>
                                    </Card>
                                </View>
                            );
                        })
                        :
                        <View style={styles.viewNullText}>
                            <Text style={styles.nullText}>Não há questionários encontrados!</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.backgroundColor10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    viewNullText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    nullText: {
        fontSize: 15
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.backgroundColor4,
    },
    containerCalendar: {
        backgroundColor: AppColors.backgroundColor4,
        flex: 1,
        justifyContent: 'center',
    },
    calendar: {
        height: '90%',
        justifyContent: 'center',
    },
    calendarTouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.calendarColor3,
        padding: 15,
        marginTop: 10,
    },
    textCalendarTouchableOpacity: {
        color: AppColors.calendarColor2,
        fontSize: 15,
    },
    containerViewDate: {
        marginBottom: 15,
    },
    textDate: {
        marginBottom: 10,
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },
    viewDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textDate: {
        fontSize: 15,
    },
    cardContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: AppColors.cardColor1,
        padding: 0,
        borderRadius: 10,
    },
    cardView: {
        backgroundColor: AppColors.cardColor2,
        width: '100%',
        borderBottomColor: AppColors.cardColor3,
        justifyContent: 'center',
        borderRightColor: AppColors.cardColor3,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    startDateTouchableOpacity: {
        backgroundColor: AppColors.buttomColor2,
        width: 100,
        alignItems: 'center',
        padding: 10,
        marginRight: 5,
        borderRadius: 10,
    },
    finalDateTouchableOpacity: {
        backgroundColor: AppColors.buttomColor2,
        width: 100,
        alignItems: 'center',
        padding: 10,
        marginLeft: 5,
        borderRadius: 10,
    },
    periodTextInput: {
        backgroundColor: AppColors.inputColor,
    },
    containerViewPeriod: {
        backgroundColor: AppColors.backgroundColor5,
        width: '100%',
        height: 90,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textPeriod: {
        color: AppColors.textColor2,
        marginBottom: 10,
    },
    viewRender2: {
        padding: 10,
    },
})