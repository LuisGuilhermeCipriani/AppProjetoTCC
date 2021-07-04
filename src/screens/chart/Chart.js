import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text as TextChart } from 'react-native-svg';
import RadioForm from 'react-native-simple-radio-button';
import Header from '../../components/header/Header';
import Api from '../../services/Api';

export default class BarChartHorizontalWithLabels extends Component {

    constructor(props) {
        super(props);
        this.questionnaires = this.props.navigation.getParam('questionnaires');
        this.discipline = this.props.navigation.getParam('discipline');
        this.radioCharts = [
            { label: 'Barras', value: 0 },
            { label: 'BoxPlot', value: 1 },
            { label: 'Dispersão', value: 2 }
        ];
        this.radioOptions = [
            { label: 'Com Outlier', value: 3 },
            { label: 'Sem Outlier', value: 4 }
        ];
        this.state = {
            dataChart: [],
            valueCharts: 0,
            valueOptions: 3,
            modalVisible: false
        }
    }

    async componentDidMount() {
        await this.getChart(this.questionnaires)
    }

    getChart = async (questionnaires) => {
        if (questionnaires != null) {
            const { dataChart } = (await Api.post('chartController/chart', questionnaires)).data

            if (dataChart != null) {
                this.setState({ dataChart })
            }
        }
    }

    render() {
        const { dataChart } = this.state
        const titleScreen = this.discipline.code + ' - ' + this.discipline.title
        const data = dataChart.map(object => { return parseFloat(object.weightedAverage) })

        const data3 = data.map(value => {
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
        })

        const selectStatus = (value) => {
            if (value < 1) {
                return 'Péssimo'
            } else if (value >= 1 && value < 2) {
                return 'Ruim'
            } else if (value >= 2 && value < 3) {
                return 'Regular'
            } else if (value >= 3 && value < 4) {
                return 'Bom'
            } else if (value >= 4) {
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
                    fill={'black'}
                    alignmentBaseline={'middle'}
                >
                    {'Questão ' + (index + 1) + ' - ' + 'Média: ' + value + ' (' + selectStatus(value) + ')'}
                </TextChart>
            ))
        )

        const scaleChart = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, index) => {
            return (
                <Text key={index} style={{ fontWeight: 'bold' }}>{value}</Text>
            )
        })

        const showQuestions = dataChart.reduce((total, value) => {
            return total += ('Questão ' + value.option + ': ' + value.title + '\n\n')
        }, '')

        return (
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <Header
                    title={titleScreen}
                    menuIcon='arrow-back'
                    navigation={this.props.navigation}
                    isBack={true}
                />
                <View style={styles.containerRadio}>
                    <View>
                        <RadioForm
                            radio_props={this.radioCharts}
                            initial={0}
                            buttonColor='#000000'
                            buttonSize={12}
                            buttonOuterColor='#000000'
                            selectedButtonColor='#000000'
                            labelStyle={{ fontSize: 12, color: '#000000' }}
                            formHorizontal={true}
                            labelHorizontal={false}
                            onPress={(valueCharts) => { this.setState({ valueCharts }) }}
                        />
                    </View>
                    <View>
                        <RadioForm
                            radio_props={this.radioOptions}
                            initial={0}
                            buttonColor='#000000'
                            buttonSize={12}
                            buttonOuterColor='#000000'
                            selectedButtonColor='#000000'
                            labelStyle={{ fontSize: 12, color: '#000000' }}
                            formHorizontal={true}
                            labelHorizontal={false}
                            onPress={(valueOptions) => { this.setState({ valueOptions }) }}
                        />
                    </View>
                </View>
                <ScrollView style={styles.scroll}>
                    <View>
                        <BarChart
                            yAccessor={({ item }) => item}
                            style={{ height: 1000 }}
                            data={data}
                            horizontal={true}
                            svg={{ fill: "orange" }}
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
                {data.length > 0 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 }}>
                        {scaleChart}
                    </View>}
                {data.length > 0 &&
                    <TouchableOpacity style={{ backgroundColor: 'gray', padding: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        this.setState({ modalVisible: true })
                    }}>
                        <Text style={{color: 'white', fontSize: 15}}>Clique aqui para ver as questões</Text>
                    </TouchableOpacity>}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <ScrollView style={{ height: '90%' }}>
                            <Text style={{ padding: 10, textAlign: 'justify' }}>{showQuestions}</Text>
                        </ScrollView>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', padding: 15, marginTop: 10 }} onPress={() => {
                            this.setState({ modalVisible: false })
                        }}>
                            <Text style={{color: 'white', fontSize: 15}}>Fechar</Text>
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
    container: {
        flexDirection: 'row',
        height: 1050
    },
    containerRadio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        padding: 5
    },
    barChart: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8
    }
})
