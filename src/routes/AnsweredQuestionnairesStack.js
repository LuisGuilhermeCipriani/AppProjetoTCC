import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../colors/AppColors';

import Index from '../Index';
import AnsweredQuestionnaires from '../screens/answeredQuestionnaires/AnsweredQuestionnaires';

const screensAnsweredQuestionnaires = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    ScreenAnsweredQuestionnaires: {
        screen: AnsweredQuestionnaires,
        navigationOptions: {
            title: 'Questionários Respondidos',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="check-square-o" color={tintColor} size={15} />
        }
    },
}

const configAnsweredQuestionnaires = {
    initialRouteName: 'ScreenAnsweredQuestionnaires',
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

const answeredQuestionnairesNavigator = createBottomTabNavigator(screensAnsweredQuestionnaires, configAnsweredQuestionnaires);

const screens = {
    AnsweredScreen: {
        screen: answeredQuestionnairesNavigator,
    }
}

const screensconfig = {
    initialRouteName: 'AnsweredScreen',
    defaultNavigationOptions: {
        header: () => false,
    }
}

const answeredQuestionnairesStack = createStackNavigator(screens,screensconfig)

export default answeredQuestionnairesStack