import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MenuButton from '../../components/menuButton/MenuButton'; 

export default class Menu extends Component{

    render(){
        const {navigation} = this.props
        return(
            <View>
                <MenuButton nameIcon='home' nameButton='Início' onPress={()=>{
                    navigation.navigate('Home'); navigation.closeDrawer()}}/>
                <MenuButton nameIcon='check-square-o' nameButton='Responder Questionário' onPress={()=>{
                    navigation.navigate('Selection'); navigation.closeDrawer()}}/>
            </View>
        )
    }
}