import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Header from '../components/header/Header';
import Index from '../Index';
import BarChart from '../routes/BarChart';

import Icon from 'react-native-vector-icons/FontAwesome5';

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Index,
            navigationOptions: {
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
                tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
            },
        },
        "Gráfico": {
            screen: BarChart,
            navigationOptions: {
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
                tabBarIcon: ({ tintColor }) =>
                <Icon name="chart-bar" color={tintColor} size={15} />
            },
        },
    },
    {
        initialRouteName: 'Home'
    },
);

const screens = {
    HomeScreen: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header title='Home' navigation={navigation} menuIcon={true} />
            }
        }
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#d3302f' }
    }
}

const homeStack = createStackNavigator(screens, screensconfig)

export default homeStack