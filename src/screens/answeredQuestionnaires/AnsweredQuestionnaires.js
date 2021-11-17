import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import RadioForm from 'react-native-simple-radio-button';

import Header from '../../components/header/Header';
import Api from '../../services/Api';

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
            isLoading: false
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.radioValues = [
            { label: 'Todos', value: 0 },
            { label: 'Período', value: 1 },
        ]
    }

    async componentDidMount() {
        this.getDisciplines();
    }

    getDisciplines = async () => {
        try {
            this.setState({isLoading: true})
            const { _id } = JSON.parse(await AsyncStorage.getItem('@APP:user'));
            const { questionnairesByPeriod } = (await Api.post('/questionnaire/findAllByPeriodFinished',
                { idStudent: _id })).data;

            if (questionnairesByPeriod !== null) {
                this.setState({ questionnairesByPeriod });
            }
            this.setState({isLoading: false})
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
                buttonColor='#000000'
                buttonSize={12}
                buttonOuterColor='#000000'
                selectedButtonColor='#000000'
                labelStyle={{ fontSize: 12, color: '#000000' }}
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

    render() {
        const { selectedStartDate, allSelected, option, startDate, finalDate } = this.state;
        const initialDate = selectedStartDate ? selectedStartDate.toString() : '';
        const questionnairesByPeriod = this.findByDate();

        if (this.state.isLoading) {
            return (
                <View style={styles.Indicator}>
                    <ActivityIndicator size="large" color='#d3302f' />
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
                    backgroundColor='green'
                    flex={1}
                >
                    <View style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'center' }}>
                        <View style={{ height: '90%', justifyContent: 'center' }}>
                            <CalendarPicker
                                onDateChange={this.onDateChange}
                                weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
                                months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                                    'Outubro', 'Novembro', 'Dezembro']}
                                previousTitle='Anterior'
                                nextTitle='Próximo'
                                selectedDayColor='#d3302f'
                                selectedDayTextColor='#ffffff'
                                todayBackgroundColor='#404040'
                                selectedStartDate={option == 1 ? startDate : finalDate}
                                initialDate={option == 1 ? startDate : finalDate}
                            />
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', padding: 15, marginTop: 10 }} onPress={() => {
                            this.setState({ modalVisible: false })
                        }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {allSelected == 1 &&
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ marginBottom: 10, marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>Selecione abaixo o intervalo de tempo</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }}>De: </Text>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true, option: 1 })} style={{ backgroundColor: '#ffffff', width: 100, alignItems: 'center', padding: 10, marginRight: 5, borderRadius: 10 }} >
                                <Text>
                                    {String(moment(this.state.startDate).format('DD/MM/YYYY'))}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15 }}>à </Text>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true, option: 2 })} style={{ backgroundColor: '#ffffff', width: 100, alignItems: 'center', padding: 10, marginLeft: 5, borderRadius: 10 }} >
                                <Text>
                                    {String(moment(this.state.finalDate).format('DD/MM/YYYY'))}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
                            return (
                                <View key={questionnaire._id}>
                                    <Card containerStyle={{
                                        borderBottomWidth: 4, borderBottomColor: '#595959'
                                    }}>
                                        <Text style={styles.nameDiscipline}>{codeDiscipline} - {title}</Text>
                                        <Text style={styles.nameDiscipline}>{'Professor(a): ' + name}</Text>
                                        <Text style={styles.nameDiscipline}>{'Turma: ' + code}</Text>
                                        <Text style={styles.nameDiscipline}>{'Período: ' + period}</Text>
                                        <View style={{
                                            backgroundColor: '#40bf80', width: '100%', borderBottomColor: '#2d8659', justifyContent: 'center',
                                            borderRightColor: '#2d8659', borderBottomWidth: 3, borderRightWidth: 3, paddingLeft: 10, paddingRight: 10, paddingTop: 10
                                        }}>
                                            <Text style={styles.nameDiscipline}>{'Status: ' + (questionnaire.status == 'S') ? 'Respondido' : 'Não Respondido' }</Text>
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    disciplineButton: {
        backgroundColor: '#969393',
        height: 50,
        width: '70%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#ffad29',
        paddingTop: 15,
        marginTop: 30,
    },
    textDiscipline: {
        color: '#000',
        textAlign: 'center',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    scrollView: {
        alignItems: 'center',
    },
    nameDiscipline: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    viewNullText: {
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20
    },
    nullText: {
        fontSize: 15
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }
})