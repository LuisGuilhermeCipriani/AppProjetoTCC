import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { BarChart, Grid, PieChart } from 'react-native-svg-charts';
import { Text as TextChart } from 'react-native-svg';
import RadioForm from 'react-native-simple-radio-button';
import Header from '../../components/header/Header';
import Api from '../../services/Api';
import { Card } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';

export default class BarChartHorizontalWithLabels extends Component {

    constructor(props) {
        super(props);
        this.questionnaires = this.props.navigation.getParam('questionnaires');
        this.discipline = this.props.navigation.getParam('discipline');
        this.radioCharts = [
            { label: 'Barras', value: 0 },
            //{ label: 'Pizza', value: 1 },
            //{ label: 'Dispersão', value: 2 }
        ];
        this.radioOptions = [
            { label: 'Com Outlier', value: 3 },
            { label: 'Sem Outlier', value: 4 }
        ];
        this.state = {
            dataChart: [],
            valueCharts: 0,
            valueOptions: 3,
            modalVisible: false,
            isLoading: false,
        }
    }

    async componentDidMount() {
        await this.getChart(this.questionnaires)
    }

    getChart = async (questionnaires) => {
        try {
            this.setState({ isLoading: true });
            if (questionnaires != null) {
                const { dataChart } = (await Api.post('chartController/chart', questionnaires)).data

                if (dataChart != null) {
                    this.setState({ dataChart })
                }
                this.setState({ isLoading: false });
            }
        } catch (err) {
            console.log(err);
        }
    }

    getPierChart = (data) => {
        const amount1 = data.filter(value => (value >= 1) && (value < 2)).length;
        const amount2 = data.filter(value => (value >= 2 && value < 3)).length;
        const amount3 = data.filter(value => (value >= 3 && value < 4)).length;
        const amount4 = data.filter(value => (value >= 4 && value < 5)).length;
        const amount5 = data.filter(value => (value == 5)).length;

        return dataPierChart = [
            {
                key: 1,
                amount: parseFloat((amount1 / data.length) * 100).toFixed(0),
                svg: { fill: AppColors.pierChartColor1 },
            },
            {
                key: 2,
                amount: parseFloat((amount2 / data.length) * 100).toFixed(0),
                svg: { fill: AppColors.pierChartColor2 }
            },
            {
                key: 3,
                amount: parseFloat((amount3 / data.length) * 100).toFixed(0),
                svg: { fill: AppColors.pierChartColor3 }
            },
            {
                key: 4,
                amount: parseFloat((amount4 / data.length) * 100).toFixed(0),
                svg: { fill: AppColors.pierChartColor4 }
            },
            {
                key: 5,
                amount: parseFloat((amount5 / data.length) * 100).toFixed(0),
                svg: { fill: AppColors.pierChartColor5 }
            }
        ]
    }

    previewQuestions = (index) => {
        let preview = '';
        switch (index + 1) {
            case 1:
                preview = 'Disponibilidade do Plano';
                break;
            case 2:
                preview = 'Pontualidade do Professor';
                break;
            case 3:
                preview = 'Assiduidade do professor';
                break;
            case 4:
                preview = 'Utilização do tempo';
                break;
            case 5:
                preview = 'Disponibilidade atendimento';
                break;
            case 6:
                preview = 'Esclarecimento de dúvidas';
                break;
            case 7:
                preview = 'Clareza de conteúdos';
                break;
            case 8:
                preview = 'Domínio do conteúdo';
                break;
            case 9:
                preview = 'Atualização de materiais';
                break;
            case 10:
                preview = 'Apresentação exemplos';
                break;
            case 11:
                preview = 'Reflexão de avaliações';
                break;
            case 12:
                preview = 'Publicação de notas';
                break;
            case 13:
                preview = 'Cumprimento conteúdo';
                break;
            case 14:
                preview = 'Adequação da bibliografia';
                break;
            case 15:
                preview = 'Cumprimento de objetivos';
                break;
            case 16:
                preview = 'Adequação da ementa';
                break;
            case 17:
                preview = 'Pontualidade do aluno';
                break;
            case 18:
                preview = 'Assiduidade do aluno';
                break;
            case 19:
                preview = 'Esclarecimento individual';
                break;
            case 20:
                preview = 'Conhecimento prévio';
                break;
            case 21:
                preview = 'Realização de atividades';
                break;
            case 22:
                preview = 'Dedicação do aluno';
                break;
            case 23:
                preview = 'Fidelidade de notas';
                break;
            default:
                preview = 'Questão';
        }
        return preview;
    }

    render() {
        const { dataChart, valueCharts, valueOptions } = this.state
        const titleScreen = this.discipline.code + ' - ' + this.discipline.title
        const data = dataChart.map(object => {
            const valueWeight = valueOptions == 3 ? object.weightedAverage : object.outlierWeightedAverage;
            return parseFloat(valueWeight)
        })

        if (this.state.isLoading) {
            return (
                <View style={styles.Indicator}>
                    <ActivityIndicator size="large" color={AppColors.backgroundColor1} />
                </View>
            )
        }

        /*const data3 = data.map(value => {
            let fill
            if (value < 1) {
                fill = 'black'
            } else if (value >= 1 && value < 2) {
                fill = 'orange'
            } else if (value >= 2 && value < 3) {
                fill = 'green'
            } else if (value >= 3 && value < 4) {
                fill = 'blue'
            } else if (value >= 4) {
                fill = 'yellow'
            }
            let v = []
            v.push({ value, label: value })
            return ({
                data: v,
                svg: {
                    fill: fill,
                }
            })
        })*/

        const selectStatus = (value) => {
            if ((value >= 1) && (value <= 1.8)) {
                return 'Péssimo'
            } else if (value > 1.8 && value <= 2.6) {
                return 'Ruim'
            } else if (value > 2.6 && value <= 3.4) {
                return 'Regular'
            } else if (value > 3.4 && value <= 4.2) {
                return 'Bom'
            } else if (value > 4.2 && value <= 5)  { 
                return 'Excelente'
            }
        }

        const CUT_OFF = 2.7
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <TextChart
                    key={index}
                    x={x(0) + 10}
                    y={y(index) + (bandwidth / 2)}
                    fontSize={14}
                    fill={AppColors.chartColor1}
                    alignmentBaseline={'middle'}
                >
                    {/*'Q' + (index+1)*/}
                    {/*'Q' + (index + 1) + ': "' + this.previewQuestions(index) + '"' + ' - ' + 'Média: ' + 
                    value + ' (' + selectStatus(value) + ')'*/}
                    {'Q' + (index + 1) + ': "' + this.previewQuestions(index) + '"' + ' - ' + 
                    value + ' (' + selectStatus(value) + ')'}
                </TextChart>
            ))
        )

        const scaleChart = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, index) => {
            return (
                <Text key={index} style={styles.textScaleChart}>{value}</Text>
            )
        })

        const showQuestions = dataChart.reduce((total, value) => {
            return total += ('Q' + value.option + ': ' + value.title + '\n\n')
        }, '')

        const LabelsPier = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <TextChart
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={AppColors.chartColor1}
                        strokeWidth={0.5}
                    >
                        {data.amount.length > 1 ? data.amount + '%' : ''}
                    </TextChart>
                )
            })
        }

        const dataPierChart = this.getPierChart(data)

        return (
            <View style={styles.viewContainer}>
                <Header
                    title={titleScreen}
                    menuIcon='arrow-back'
                    navigation={this.props.navigation}
                    isBack={true}
                    screenName='chartScreen'
                />
                <View style={styles.viewContainer}>
                    <View style={styles.containerRadio}>
                        <View>
                            <RadioForm
                                radio_props={this.radioCharts}
                                initial={0}
                                buttonColor={AppColors.radioColor1}
                                buttonSize={12}
                                buttonOuterColor={AppColors.radioColor1}
                                selectedButtonColor={AppColors.radioColor1}
                                labelStyle={{ fontSize: 12, color: AppColors.radioColor1 }}
                                formHorizontal={true}
                                labelHorizontal={false}
                                onPress={(valueCharts) => { this.setState({ valueCharts }) }}
                            />
                        </View>
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
                    </View>
                    {valueCharts == 0 &&
                        <ScrollView style={styles.scroll}>
                            <View>
                                <BarChart
                                    yAccessor={({ item }) => item}
                                    style={{ height: 1000 }}
                                    data={data}
                                    horizontal={true}
                                    svg={{ fill: AppColors.chartColor2 }}
                                    contentInset={{ top: 10, bottom: 10, left: 15, right: 15 }}
                                    spacing={0.8}
                                    gridMin={0}
                                    gridMax={5}
                                >
                                    <Grid direction={Grid.Direction.VERTICAL} />
                                    <Labels />
                                </BarChart>
                            </View>
                        </ScrollView>
                    }
                    {(valueCharts == 0 && data.length > 0) &&
                        <View style={styles.viewScaleChart}>
                            {scaleChart}
                        </View>}
                    {valueCharts == 1 &&
                        <View style={styles.viewContainer}>
                            <PieChart
                                //style={styles.pieChart}
                                //valueAccessor={({ item }) => item.amount}
                                //data={dataPierChart}
                                //spacing={0}
                                //outerRadius={'95%'}
                            >
                                <LabelsPier />
                            </PieChart>
                            <View style={styles.viewContainerPieChart}>
                                <View style={styles.viewPieChart}>
                                    <View style={styles.viewStyle1PierChart} />
                                    <Text>Péssimo</Text>
                                </View>
                                <View style={styles.viewPieChart}>
                                    <View style={styles.viewStyle2PierChart} />
                                    <Text>Ruim</Text>
                                </View>
                                <View style={styles.viewPieChart}>
                                    <View style={styles.viewStyle3PierChart} />
                                    <Text>Regular</Text>
                                </View>
                                <View style={styles.viewPieChart}>
                                    <View style={styles.viewStyle4PierChart} />
                                    <Text>Bom</Text>
                                </View>
                                <View style={styles.viewPieChart}>
                                    <View style={styles.viewStyle5PierChartccv} />
                                    <Text>Ótimo</Text>
                                </View>
                            </View>
                        </View>
                    }
                    {data.length > 0 &&
                        <TouchableOpacity style={styles.showQuestionsTouchableOpacity} onPress={() => {
                            this.setState({ modalVisible: true })
                        }}>
                            <Text style={styles.textShowQuestions}>Clique aqui para ver as questões</Text>
                        </TouchableOpacity>}
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.viewContainer}>
                        <Card style={styles.cardStyle}>
                            <ScrollView style={styles.scrollViewModal}>
                                <Text style={styles.textScrollViewModal}>{showQuestions}</Text>
                            </ScrollView>
                        </Card>
                        <TouchableOpacity style={styles.exitTouchableOpacity} onPress={() => {
                            this.setState({ modalVisible: false })
                        }}>
                            <Text style={styles.textExit}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        height: '60%'
    },
    containerRadio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        padding: 5
    },
    cardStyle: {
        borderBottomWidth: 2,
        borderBottomColor: AppColors.cardColor4,
        borderRadius: 10,
    },
    textScaleChart: {
        fontWeight: 'bold',
    },
    viewContainer: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: AppColors.backgroundColor10,
    },
    viewScaleChart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10,
    },
    pieChart: {
        height: 300,
    },
    viewContainerPieChart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    viewPieChart: {
        alignItems: 'center',
    },
    viewStyle1PierChart: {
        backgroundColor: AppColors.pierChartColor1,
        width: 20,
        height: 20,
        borderWidth: 1,
    },
    viewStyle2PierChart: {
        backgroundColor: AppColors.pierChartColor2,
        width: 20,
        height: 20,
        borderWidth: 1,
    },
    viewStyle3PierChart: {
        backgroundColor: AppColors.pierChartColor3,
        width: 20,
        height: 20,
        borderWidth: 1,
    },
    viewStyle4PierChart: {
        backgroundColor: AppColors.pierChartColor4,
        width: 20,
        height: 20,
        borderWidth: 1,
    },
    viewStyle5PierChartccv: {
        backgroundColor: AppColors.pierChartColor5,
        width: 20,
        height: 20,
        borderWidth: 1,
    },
    showQuestionsTouchableOpacity: {
        backgroundColor: AppColors.buttomColor8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textShowQuestions: {
        color: AppColors.textColor2,
        fontSize: 15,
        shadowColor: AppColors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2
    },
    scrollViewModal: {
        height: '90%',
    },
    textScrollViewModal: {
        padding: 10,
        textAlign: 'justify',
    },
    exitTouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.buttomColor3,
        padding: 15,
        marginTop: 10,
    },
    textExit: {
        color: AppColors.textColor1,
        fontSize: 15,
    },
    Indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.backgroundColor4,
    },
    StyleRadioButton: {
        paddingRight: 10,
    }
})
