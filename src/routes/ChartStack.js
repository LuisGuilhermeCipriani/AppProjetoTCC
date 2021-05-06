import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import Chart from './BarChart';

const screens = {
    "Gráfico": {
        screen: Chart,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Gráfico de Barras' navigation={navigation} menuIcon={true}/>
            }
        }
    },
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
    headerStyle: {backgroundColor: '#d3302f'}}
}

const chartStack = createStackNavigator(screens,screensconfig)

export default chartStack