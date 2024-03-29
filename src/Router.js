import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './screens/authentication/Login';
import Menu from './screens/menu/Menu';
import HomeStack from './routes/HomeStack';
import SelectionStack from './routes/SelectionStack';
import DisciplineStack from './routes/DisciplineStack';
import ChartStack from './routes/ChartStack';
import AnsweredQuestionnairesStack from './routes/AnsweredQuestionnairesStack';
import PerformanceReport from './routes/PerformanceReportStack';
import AboutTheAppStack from './routes/AboutTheAppStack';
import { LogBox } from 'react-native';

const menuRoutes = {
    Home: {
        screen: HomeStack
    },
    Selection: {
        screen: SelectionStack
    },
    Discipline: {
        screen: DisciplineStack
    },
    Chart: {
        screen: ChartStack
    },
    PerformanceReport: {
        screen: PerformanceReport
    },
    Answered: {
        screen: AnsweredQuestionnairesStack
    },
    About: {
        screen: AboutTheAppStack
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
    },
}

const mainConfig = {
    initialRouteName: 'Auth',
}

const MainNavigator = createSwitchNavigator(mainRoutes, mainConfig)

LogBox.ignoreAllLogs();

export default createAppContainer(MainNavigator);