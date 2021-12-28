import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';
import RadioForm from 'react-native-simple-radio-button';


import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class PerformanceReport extends Component {

    constructor(props) {
        super(props);
        this.questionnaires = this.props.navigation.getParam('questionnaires');
        this.discipline = this.props.navigation.getParam('discipline');
        this.professor = this.props.navigation.getParam('professor');
        this.objectClass = this.props.navigation.getParam('objectClass');
        this.radioOptions = [
            { label: 'Com Outlier', value: 3 },
            { label: 'Sem Outlier', value: 4 }
        ];
        this.state = {
            dataChart: [],
            isLoading: false,
            valueOptions: 3,
        }
    }

    async componentDidMount() {
        await this.getChart(this.questionnaires)
    }

    getChart = async (questionnaires) => {
        this.setState({ isLoading: true })
        if (questionnaires != null) {
            const { dataChart } = (await Api.post('chartController/chart', questionnaires)).data

            if (dataChart != null) {
                this.setState({ dataChart })
            }
        }
        this.setState({ isLoading: false })
    }

    selectStatus = (value) => {
        if ((value >= 1) && (value < 2)) {
            return 'Péssimo'
        } else if (value >= 2 && value < 3) {
            return 'Ruim'
        } else if (value >= 3 && value < 4) {
            return 'Regular'
        } else if (value >= 4 && value < 5) {
            return 'Bom'
        } else if (value == 5) { 
            return 'Excelente'
        }
    }

    render() {

        const { dataChart, isLoading, valueOptions } = this.state;
        const titleScreen = this.discipline.code + ' - ' + this.discipline.title;
        const data = dataChart.map(object => {
            const valueWeight = valueOptions == 3 ? object.weightedAverage : object.outlierWeightedAverage;
            return parseFloat(valueWeight)
        })

        if (isLoading) {
            return (
                <View style={styles.Indicator}>
                    <ActivityIndicator size="large" color={AppColors.backgroundColor1} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    title={titleScreen}
                    menuIcon='arrow-back'
                    navigation={this.props.navigation}
                    isBack={true}
                    screenName='ScreenSelectionDisciplineReport'
                />

                <View style={styles.StyleRadioButton}>
                    <RadioForm
                        radio_props={this.radioOptions}
                        initial={0}
                        buttonColor={AppColors.radioColor1}
                        buttonSize={12}
                        buttonOuterColor={AppColors.radioColor1}
                        selectedButtonColor={AppColors.radioColor1}
                        labelStyle={{ fontSize: 12, color: AppColors.radioColor1 }}
                        formHorizontal={true}
                        labelHorizontal={false}
                        onPress={(valueOptions) => { this.setState({ valueOptions }) }}
                    />
                </View>

                <View style={styles.containerBody}>
                    <Card>
                        <Card.Title>Relatório de Desempenho</Card.Title>
                        <Text>{this.discipline.title}</Text>
                        <Text>{this.discipline.code}</Text>
                        <Text>Período: {this.objectClass.period}</Text>
                        <Text>Docente: {this.professor.name}</Text>

                        <View style={styles.viewCardStyle}>
                            <Text style={styles.fieldTable1}>Questão</Text>
                            <Text style={styles.fieldTable2}>Descrição</Text>
                            <Text style={styles.fieldTable3}>Média</Text>
                            <Text style={styles.fieldTable4}>Situação</Text>
                        </View>

                        <ScrollView style={styles.scrollViewStyle}>
                            {dataChart.map((value, index) => {
                                const question = value.option;
                                const description = value.title;
                                const average = data[index];
                                const status = this.selectStatus(average);
                                return (<View style={styles.viewStyle} key={index}>
                                    <Text style={styles.itemTable1}>{question}</Text>
                                    <Text style={styles.itemTable2}>{description}</Text>
                                    <Text style={styles.itemTable3}>{average}</Text>
                                    <Text style={styles.itemTable4}>{status}</Text>
                                </View>)
                            })}
                        </ScrollView>
                    </Card>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCardStyle: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
    },
    scrollViewStyle: {
        width: '100%',
    },
    viewStyle: {
        flexDirection: 'row',
    },
    fieldTable1: {
        width: '20%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor2,
        textAlign: 'center',
        fontWeight: 'bold',
        borderTopLeftRadius: 10,
    },
    fieldTable2: {
        width: '40%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor2,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    fieldTable3: {
        width: '15%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor2,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    fieldTable4: {
        width: '25%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor2,
        textAlign: 'center',
        fontWeight: 'bold',
        borderTopRightRadius: 10,
    },
    itemTable1: {
        width: '20%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemTable2: {
        width: '40%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemTable3: {
        width: '15%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemTable4: {
        width: '25%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.tableColor1,
        backgroundColor: AppColors.tableColor3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.backgroundColor4
    },
    StyleRadioButton: {
        alignItems: 'center',
        marginTop: 20,
    }
})