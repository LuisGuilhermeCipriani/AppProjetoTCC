import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

export default class DisciplineSelection extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.scrollView}>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Banco de Dados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Interação Humano-Computador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Cálculo de Probabilidades</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Estrutura de Dados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Empreendimentos em Informática</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Teoria dos Grafos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Empreendimentos em Informática</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.disciplineButton}>
                            <Text style={styles.textDiscipline}>Teoria dos Grafos</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8A2BE2',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    disciplineButton: {
        backgroundColor: '#9370DB',
        height: 50,
        width: '70%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#EE82EE',
        paddingTop: 15,
        marginTop: 30,
    },
    textDiscipline: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    scroll: {
        width: '100%',
        maxHeight: '80%',
    },
    scrollView: {
        alignItems: 'center',
    }
})