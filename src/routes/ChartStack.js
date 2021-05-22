import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BarChart from '../screens/chart/BarChart';
import Index from '../Index';
import Icon from 'react-native-vector-icons/FontAwesome';

const screensTab = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    ScreenBarChart: {
        screen: BarChart,
        navigationOptions: {
            title: 'Gráfico de Barras',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="bar-chart" color={tintColor} size={15} />
        }
    },
}

const screenstabconfig = {
    initialRouteName: 'ScreenBarChart',
    defaultNavigationOptions: {
        header: () => false,
        tabBarOptions: {
            activeTintColor: "#ffffff",
            inactiveTintColor: "#000000",
            activeBackgroundColor: "#d3302f",
            inactiveBackgroundColor: "#A9A9A9",
            style: {
                height: 50,
            },
            labelStyle: {
                fontSize: 15,
            },
        },
    }
}

const AppTabNavigator = createBottomTabNavigator(screensTab, screenstabconfig);

const screens = {
    BarChartScreen: {
        screen: AppTabNavigator,
    },
}

const screensconfig = {
    defaultNavigationOptions: {
        header: () => false
    }
}

const chartStack = createStackNavigator(screens, screensconfig)

export default chartStack