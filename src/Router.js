import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './screens/authentication/Login';
import Menu from './screens/menu/Menu'
import HomeStack from './routes/HomeStack';
import SelectionStack from './routes/SelectionStack';

const menuRoutes = {
    Home: {
        screen: HomeStack
    },
    Selection: {
        screen: SelectionStack
    }
}

const homeConfig = {
    initialRouteName: 'Home',
    contentComponent: Menu
}

const homeNavigator = createDrawerNavigator(menuRoutes, homeConfig)

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