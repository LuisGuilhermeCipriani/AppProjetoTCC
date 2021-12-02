import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../colors/AppColors';

import Index from '../Index';
import DisciplineSelection from '../screens/select/DisciplineSelection';
import Quiz from '../screens/quiz/Quiz';

const screenDisciplineSelection = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    ScreenSelectionDisciplines: {
        screen: DisciplineSelection,
        navigationOptions: {
            title: 'Seleção de Disciplina',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="search" color={tintColor} size={15} />
        }
    },
}

const configDisciplineSelection = {
    initialRouteName: 'ScreenSelectionDisciplines',
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

const disciplineSelectionNavigator = createBottomTabNavigator(screenDisciplineSelection, configDisciplineSelection);

const screenQuizDiscipline = {
    Home: {
        screen: Index,
        navigationOptions: {
            title: 'Início',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="home" color={tintColor} size={15} />
        }
    },
    screenQuiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Questionário',
            header: () => false,
            tabBarIcon: ({ tintColor }) =>
                <Icon name="square-o" color={tintColor} size={15} />
        }
    },
}

const configQuizDiscipline = {
    initialRouteName: 'screenQuiz',
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

const quizDisciplineNavigator = createBottomTabNavigator(screenQuizDiscipline, configQuizDiscipline);

const screens = {
    SelectionScreen: {
        screen: disciplineSelectionNavigator,
    },
    QuizDiscipline: {
        screen: quizDisciplineNavigator,
    }
}

const screensconfig = {
    initialRouteName: 'SelectionScreen',
    defaultNavigationOptions: {
        header: () => false,
    }
}

const selectionStack = createStackNavigator(screens,screensconfig)

export default selectionStack