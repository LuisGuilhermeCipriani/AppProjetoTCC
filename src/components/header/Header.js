import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
export default props = ({ title, navigation, menuIcon, isBack, screenName }) => {

    const openMenu = () => {
        isBack ? navigation.navigate(screenName) : navigation.openDrawer();
    }

    return (
        <Header
            leftComponent={ <Icon
                type="ionicon"
                color='white'
                name={menuIcon}
                onPress={() => openMenu()}
              />}
            centerComponent={{ text: title, style: { color: '#FFF', fontSize: 20 } }}
            containerStyle={{ backgroundColor: '#d3302f' }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        color: '#ffffff'
    }
});