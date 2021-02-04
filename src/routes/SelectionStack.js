import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import DisciplineSelection from '../screens/select/DisciplineSelection';
import Quiz from '../screens/quiz/Quiz';

const screens = {
    SelectionScreen: {
        screen: DisciplineSelection,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Seleção de Disciplinas' navigation={navigation} menuIcon={true}/>
            }
        }
    },
    QuizDiscipline: {
        screen: Quiz,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Questionário' navigation={navigation} menuIcon={false}/>
            }
        }
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffff00',
    headerStyle: {backgroundColor: '#465674', height: 60}}
}

const selectionStack = createStackNavigator(screens,screensconfig)

export default selectionStack