import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Index from '../Index';
import { AppColors } from '../colors/AppColors';

import AboutTheApp from '../screens/aboutTheApp/AboutTheApp';
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
    ScreenAboutApp: {
        screen: AboutTheApp,
        navigationOptions: {
            title: 'Sobre o Aplicativo',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="search" color={tintColor} size={15} />
        }
    },
}

const screenstabconfig = {
    initialRouteName: 'ScreenAboutApp',
    defaultNavigationOptions: {
        header: () => false,
        tabBarOptions: {
            activeTintColor: AppColors.tabBarColor1,
            inactiveTintColor: AppColors.tabBarColor2,
            activeBackgroundColor: AppColors.tabBarColor3,
            inactiveBackgroundColor: AppColors.tabBarColor4,
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
    AboutApp: {
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