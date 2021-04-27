import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import Index from '../Index';

const screens = {
    HomeScreen: {
        screen: Index,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Início' navigation={navigation} menuIcon={true}/>
            }
        }
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
    headerStyle: {backgroundColor: '#d3302f'}}
}

const homeStack = createStackNavigator(screens,screensconfig)

export default homeStack