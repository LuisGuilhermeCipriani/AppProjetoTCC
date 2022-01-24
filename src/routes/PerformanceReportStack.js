import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../colors/AppColors';

import Index from '../Index';
import PerformanceReport from '../screens/performanceReport/PerformanceReport';
import DisciplineReportSelection from '../screens/performanceReport/DisciplineReportSelection';

const screenReportSelection = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    ScreenSelectionDisciplineReport: {
        screen: DisciplineReportSelection,
        navigationOptions: {
            title: 'Seleção de Disciplina',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="search" color={tintColor} size={15} />
        }
    },
}

const configReportSelection = {
    initialRouteName: 'ScreenSelectionDisciplineReport',
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

const reportSelectionNavigator = createBottomTabNavigator(screenReportSelection, configReportSelection);

const screenReports = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    screenReport: {
        screen: PerformanceReport,
        navigationOptions: {
            title: 'Relatório',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="file" color={tintColor} size={15} />
        }
    },
}

const configReport = {
    initialRouteName: 'screenReport',
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

const reportNavigator = createBottomTabNavigator(screenReports, configReport);

const screens = {
    reportScreen: {
        screen: reportSelectionNavigator,
    },
    performanceReport: {
        screen: reportNavigator,
    }
}

const screensconfig = {
    initialRouteName: 'reportScreen',
    defaultNavigationOptions: {
        header: () => false,
    }
}

const selectionStack = createStackNavigator(screens,screensconfig)

export default selectionStack