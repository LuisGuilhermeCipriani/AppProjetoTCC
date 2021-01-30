import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import Index from '../Index';

const screens = {
    HomeScreen: {
        screen: Index,
        navigationOption: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Início' navigation={navigation}/>
            }
        }
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffff00',
    headerStyle: {backgroundColor: '#465674', height: 60}}
}

const homeStack = createStackNavigator(screens,screensconfig)

export default homeStack