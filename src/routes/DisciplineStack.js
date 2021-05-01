import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Header from '../components/header/Header';

import SearchDisciplines from '../screens/searchDisciplines/SearchDisciplines';

const screens = {
    SearchDisciplines: {
        screen: SearchDisciplines,
        navigationOptions: ({navigation})=>{
            return {
                headerTitle: ()=> <Header title='Disciplinas Matriculadas' navigation={navigation} menuIcon={true}/>
            }
        }
    },
}

const screensconfig = {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
    headerStyle: {backgroundColor: '#d3302f'}}
}

const homeStack = createStackNavigator(screens,screensconfig)

export default homeStack