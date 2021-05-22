import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Index from '../Index';

import SearchDisciplines from '../screens/searchDisciplines/SearchDisciplines';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    ScreenSearchDisciplines: {
        screen: SearchDisciplines,
        navigationOptions: {
            title: 'Consultar Disciplinas',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="search" color={tintColor} size={15} />
        }
    },
}

const screenstabconfig = {
    initialRouteName: 'ScreenSearchDisciplines',
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
    DisciplineScreen: {
        screen: AppTabNavigator,
    },
}

const screensconfig = {
    defaultNavigationOptions: {
        header: () => false
    }
}

const homeStack = createStackNavigator(screens, screensconfig)

export default homeStack