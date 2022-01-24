import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';

import Header from '../../components/header/Header';

export default class AboutTheApp extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Header
                    title='Sobre o Aplicativo'
                    menuIcon='menu'
                    navigation={this.props.navigation}
                />
                <Card style={styles.cardStyle}>
                    <Card.Title style={styles.title}>SAD-UFJF</Card.Title>
                    <ScrollView style={styles.scrollViewStyle}>
                        <Text style={styles.textStyle}>É um Sistema de Avaliações Discentes da UFJF. Este projeto visa apoiar o
                            processo avaliativo da instituição e está sendo desenvolvido pelo aluno Luís Guilherme da Cunha Cipriani,
                            graduando em Sistemas de Informação pela Universidade Federal de Juiz de Fora, sob orientação do professor
                            André Luiz de Oliveira</Text>
                        <Text style={styles.textStyle}>Como funcionalidades o aplicativo permite ao aluno verificar as disciplinas
                            nas quais está matriculado no período. Bem como questionários pendentes de preenchimento, questionários incompletos
                            e questionários finalizados.
                        </Text>
                        <Text style={styles.textStyle}>O discente é capaz de avaliar uma disciplina por meio de questionários com perguntas
                            relacionadas à conduta do docente e perguntas de auto desempenho.
                        </Text>
                        <Text style={styles.textStyle}>O docente, por sua vez, é capaz de acompanhar as avaliações dos discentes por meio da geração
                            de gráficos e relatórios de desempenho de disciplinas, nas quais este leciona no período.
                        </Text>
                    </ScrollView>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: AppColors.backgroundColor10,
    },
    textStyle: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify',
        padding: 5,
    },
    title: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardStyle: {
        borderBottomWidth: 2,
        borderBottomColor: AppColors.cardColor4,
        borderRadius: 10,
    },
    scrollViewStyle: {
        height: '80%',
    },
})