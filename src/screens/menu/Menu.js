import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

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

    render() {
        const { navigation } = this.props
        const { type } = this.state.user
        return (
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
                    navigation.navigate('Auth'); navigation.closeDrawer()
                }} />
            </View>
        )
    }
}