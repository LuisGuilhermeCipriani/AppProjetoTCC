import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import DisciplineSelection from '../screens/select/DisciplineSelection';
import Quiz from '../screens/quiz/Quiz';
import Comment from '../screens/quiz/Comment';

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
    },
    Comments: {
        screen: Comment,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Comentários' navigation={navigation} menuIcon={false}/>
            }
        }
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
    headerStyle: {backgroundColor: '#d3302f'}}
}

const selectionStack = createStackNavigator(screens,screensconfig)

export default selectionStack