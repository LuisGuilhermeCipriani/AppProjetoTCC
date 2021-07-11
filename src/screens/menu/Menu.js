import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MenuButton from '../../components/menuButton/MenuButton'; 

export default class Menu extends Component{

    render(){
        const {navigation} = this.props
        return(
            <View style={{marginLeft:20, marginTop: 40}}>
                <MenuButton nameIcon='home' nameButton='Início' onPress={()=>{
                    navigation.navigate('Home'); navigation.closeDrawer()}}/>
                <MenuButton  nameIcon='square-o' nameButton='Responder Questionários' onPress={()=>{
                    navigation.navigate('SelectionScreen'); navigation.closeDrawer()}}/>
                <MenuButton nameIcon='check-square-o' nameButton='Questionários Respondidos' onPress={()=>{
                    navigation.navigate('AnsweredScreen'); navigation.closeDrawer()}}/>
                <MenuButton nameIcon='search' nameButton='Consultar Disciplinas' onPress={()=>{
                    navigation.navigate('DisciplineScreen'); navigation.closeDrawer()}}/>
                <MenuButton nameIcon='line-chart' nameButton='Consultar Desempenho' onPress={()=>{
                    navigation.navigate('chartScreen'); navigation.closeDrawer()}}/>
                <MenuButton nameIcon='circle-o-notch' nameButton='Sair' onPress={()=>{
                    navigation.navigate('Auth'); navigation.closeDrawer()}}/>
            </View>
        )
    }
}