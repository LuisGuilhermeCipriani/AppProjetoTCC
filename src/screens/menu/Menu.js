import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Image } from 'react-native';

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
                            style={{height: 70, width: 70, borderRadius: 50}}
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
                <View style={{ marginLeft: 20, marginTop: 40 }}>
                    <MenuButton nameIcon='home' nameButton='Início' onPress={() => {
                        navigation.navigate('Home'); navigation.closeDrawer()
                    }} />
                    {type == 'S' &&
                        <MenuButton nameIcon='square-o' nameButton='Responder Questionários' onPress={() => {
                            navigation.navigate('SelectionScreen'); navigation.closeDrawer()
                        }} />
                    }
                    {type == 'S' &&
                        <MenuButton nameIcon='check-square-o' nameButton='Questionários Respondidos' onPress={() => {
                            navigation.navigate('AnsweredScreen'); navigation.closeDrawer()
                        }} />
                    }
                    {(type == 'S' || type == 'P') &&
                        <MenuButton nameIcon='search' nameButton='Consultar Disciplinas' onPress={() => {
                            navigation.navigate('DisciplineScreen'); navigation.closeDrawer()
                        }} />
                    }
                    {type == 'P' &&
                        <MenuButton nameIcon='line-chart' nameButton='Consultar Desempenho' onPress={() => {
                            navigation.navigate('chartScreen'); navigation.closeDrawer()
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
        backgroundColor: '#d3302f',
        height: '27%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    topSideMenu2: {
        backgroundColor: '#e06c6c',
        height: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    topSideMenu3: {
        backgroundColor: '#f6d5d5',
        height: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageMenu: {
        backgroundColor: '#ffffff',
        height: 70,
        width: 70,
        borderRadius: 50,
        marginTop: 25,
        marginLeft: 10
    },
    textTopSideMenu: {
        color: '#ffffff',
        fontSize: 16
    },
    viewTextTopSideMenu: {
        marginLeft: 10,
        marginTop: 25,
        flexShrink: 1
    }
})