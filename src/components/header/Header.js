import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default props = ({ title, navigation, menuIcon}) => {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.container}>
            {menuIcon ? <TouchableOpacity onPress={openMenu}>
                <Icon name='menu' color='#ffffff' size={30}/>
            </TouchableOpacity> : <View/>}
            <View>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View/>
        </View>
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