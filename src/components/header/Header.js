import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default props = ({ title, navigation, menuIcon }) => {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <Header
            leftComponent={{ icon: menuIcon, color: '#FFF', onPress: () => openMenu() }}
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