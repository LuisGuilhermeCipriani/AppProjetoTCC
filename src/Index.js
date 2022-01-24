import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from './colors/AppColors';

import Header from './components/header/Header';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    async componentDidMount() {
        const user = JSON.parse(await AsyncStorage.getItem('@APP:user'));
        this.setState({ user })
    }

    render() {
        const { navigation } = this.props;
        const { type } = this.state.user;

        return (
            <View style={styles.viewRender1}>
                <Header
                    title='Início'
                    menuIcon='menu'
                    navigation={navigation}
                />
                <View style={styles.viewRender2}>
                    <View style={styles.viewRender3}>
                        {type == 'S' &&
                            <TouchableOpacity style={styles.field1} onPress={() => {
                                navigation.navigate('ScreenSelectionDisciplines')
                            }}>
                                <Icon name='square-o' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Responder {"\n"}Questionário</Text>
                            </TouchableOpacity>
                        }
                        {type == 'P' &&
                            <TouchableOpacity style={styles.field1} onPress={() => {
                                navigation.navigate('ScreenSelectionDisciplineReport')
                            }}>
                                <Icon name='file' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Gerar Relatório</Text>
                            </TouchableOpacity>
                        }
                        {(type == 'S' || type == 'P') &&
                            <TouchableOpacity style={styles.field2} onPress={() => {
                                navigation.navigate('ScreenSearchDisciplines')
                            }}>
                                <Icon name='search' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Consultar {"\n"}Disciplinas</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.viewRender4}>
                        {(type == 'S' || type == 'P') &&
                            <TouchableOpacity style={styles.field3} onPress={() => {
                                navigation.navigate('ScreenAboutApp')
                            }}>
                                <Icon name='info-circle' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Sobre o {"\n"}Aplicativo</Text>
                            </TouchableOpacity>
                        }
                        {type == 'P' &&
                            <TouchableOpacity style={styles.field4} onPress={() => {
                                navigation.navigate('ScreenSelectionDisciplineQuestionnaire')
                            }}>
                                <Icon name='bar-chart' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Consultar {"\n"}Desempenho</Text>
                            </TouchableOpacity>
                        }
                        {type == 'S' &&
                            <TouchableOpacity style={styles.field4} onPress={() => {
                                navigation.navigate('ScreenAnsweredQuestionnaires')
                            }}>
                                <Icon name='check-square-o' color={AppColors.iconColor1} size={40} />
                                <Text style={styles.text}>Questionários {"\n"}Respondidos</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field1: {
        backgroundColor: AppColors.backgroundColor7,
        width: '55%',
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field2: {
        backgroundColor: AppColors.backgroundColor8,
        width: '35%',
        height: 150,
        borderRadius: 10,
        marginLeft: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field3: {
        backgroundColor: AppColors.backgroundColor8,
        width: '35%',
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    field4: {
        backgroundColor: AppColors.backgroundColor7,
        width: '55%',
        height: 150,
        borderRadius: 10,
        marginLeft: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 10,
        textShadowColor: AppColors.textShadowColor2,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    viewRender1: {
        width: '100%', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    }, 
    viewRender2: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    viewRender3: {
        flexDirection: 'row',
    }, 
    viewRender4: {
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        flexDirection: 'row',
    }
})

