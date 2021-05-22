import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Index from '../Index';

const screens = {
    HomeScreen: {
        screen: Index,
    }
}

const screensconfig = {
    defaultNavigationOptions: {
        header: () => false,
    }
}

const homeStack = createStackNavigator(screens, screensconfig)

export default homeStack