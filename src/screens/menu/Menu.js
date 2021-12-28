import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Image } from 'react-native';
import { AppColors } from '../../colors/AppColors';

import MenuButton from '../../components/menuButton/MenuButton';

export default class Menu extends Component {
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

    logout = async (navigation) => {
        await AsyncStorage.removeItem('@APP:user');
        navigation.navigate('Auth');
    }

    render() {
        const { navigation } = this.props
        const { type, name, registration } = this.state.user
        return (
            <View>
                <View style={styles.topSideMenu}>
                    <View style={styles.imageMenu}>
                        <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/avatar.png')}
                        />
                    </View>
                    <View style={styles.viewTextTopSideMenu}>
                        <Text style={styles.textTopSideMenu}>{name}</Text>
                        <Text style={styles.textTopSideMenu}>{registration}</Text>
                    </View>
                </View>
                <View style={styles.topSideMenu2}></View>
                <View style={styles.topSideMenu3}></View>
                <View style={styles.ViewStyle}>
                    <MenuButton nameIcon='home' nameButton='Início' onPress={() => {
                        navigation.navigate('Home'); navigation.closeDrawer()
                    }} />
                    {type == 'S' &&
                        <MenuButton nameIcon='square-o' nameButton='Responder Questionários' onPress={() => {
                            navigation.navigate('ScreenSelectionDisciplines'); navigation.closeDrawer()
                        }} />
                    }
                    {type == 'S' &&
                        <MenuButton nameIcon='check-square-o' nameButton='Questionários Respondidos' onPress={() => {
                            navigation.navigate('ScreenAnsweredQuestionnaires'); navigation.closeDrawer()
                        }} />
                    }
                    {(type == 'S' || type == 'P') &&
                        <MenuButton nameIcon='search' nameButton='Consultar Disciplinas' onPress={() => {
                            navigation.navigate('ScreenSearchDisciplines'); navigation.closeDrawer()
                        }} />
                    }
                    {type == 'P' &&
                        <MenuButton nameIcon='list-alt' nameButton='Gerar Relatório' onPress={() => {
                            navigation.navigate('ScreenSelectionDisciplineReport'); navigation.closeDrawer()
                        }} />
                    }
                    {type == 'P' &&
                        <MenuButton nameIcon='line-chart' nameButton='Consultar Desempenho' onPress={() => {
                            navigation.navigate('ScreenSelectionDisciplineQuestionnaire'); navigation.closeDrawer()
                        }} />
                    }
                    {(type == 'S' || type == 'P') &&
                        <MenuButton nameIcon='file' nameButton='Sobre o Aplicativo' onPress={() => {
                            navigation.navigate('ScreenAboutApp'); navigation.closeDrawer()
                        }} />
                    }
                    <MenuButton nameIcon='circle-o-notch' nameButton='Sair' onPress={() => {
                        this.logout(navigation)
                    }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topSideMenu: {
        backgroundColor: AppColors.menuColor1,
        height: '27%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    topSideMenu2: {
        backgroundColor: AppColors.menuColor2,
        height: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    topSideMenu3: {
        backgroundColor: AppColors.menuColor3,
        height: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageMenu: {
        backgroundColor: AppColors.menuColor4,
        height: 70,
        width: 70,
        borderRadius: 50,
        marginTop: 25,
        marginLeft: 10
    },
    textTopSideMenu: {
        color: AppColors.menuColor4,
        fontSize: 16
    },
    viewTextTopSideMenu: {
        marginLeft: 10,
        marginTop: 25,
        flexShrink: 1
    },
    imageStyle: {
        height: 70, 
        width: 70, 
        borderRadius: 50
    },
    ViewStyle: {
        marginLeft: 20, 
        marginTop: 40
    }
})