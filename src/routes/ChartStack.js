import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Index from '../Index';
import DisciplineQuestionnaireSelection from '../screens/chart/DisciplineQuestionnaireSelection';
import Chart from '../screens/chart/Chart';

const screenChartSelection = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    ScreenSelectionDisciplineQuestionnaire: {
        screen: DisciplineQuestionnaireSelection,
        navigationOptions: {
            title: 'Seleção de Disciplina',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="search" color={tintColor} size={15} />
        }
    },
}

const configChartSelection = {
    initialRouteName: 'ScreenSelectionDisciplineQuestionnaire',
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

const chartSelectionNavigator = createBottomTabNavigator(screenChartSelection, configChartSelection);

const screenCharts = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    screenChart: {
        screen: Chart,
        navigationOptions: {
            title: 'Gráfico',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="bar-chart" color={tintColor} size={15} />
        }
    },
}

const configChart = {
    initialRouteName: 'screenChart',
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

const chartNavigator = createBottomTabNavigator(screenCharts, configChart);

const screens = {
    chartScreen: {
        screen: chartSelectionNavigator,
    },
    chart: {
        screen: chartNavigator,
    }
}

const screensconfig = {
    initialRouteName: 'chartScreen',
    defaultNavigationOptions: {
        header: () => false,
    }
}

const selectionStack = createStackNavigator(screens,screensconfig)

export default selectionStack