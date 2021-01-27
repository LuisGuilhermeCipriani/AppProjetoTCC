import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './screens/authentication/Login';
import Index from './Index';

const menuRouts = {
    Home: {
        screen: Index
    }
}

const homeNavigator = createDrawerNavigator(menuRouts, homeConfig)

const homeConfig = {
    initialRouteName: 'Home'
}

const mainRoutes = {
    Auth: {
        screen: Login
    },
    Main: {
        screen: homeNavigator
    }
}

const mainConfig = {
    initialRouteName: 'Auth'
}

const MainNavigator = createSwitchNavigator(mainRoutes, mainConfig)

export default createAppContainer(MainNavigator);