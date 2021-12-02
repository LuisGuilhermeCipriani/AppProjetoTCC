import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { AppColors } from '../../colors/AppColors';

export default props = ({ title, navigation, menuIcon, isBack, screenName }) => {

    const openMenu = () => {
        isBack ? navigation.navigate(screenName) : navigation.openDrawer();
    }

    return (
        <Header
            leftComponent={ <Icon
                type="ionicon"
                color={AppColors.iconColor1}
                name={menuIcon}
                onPress={() => openMenu()}
              />}
            centerComponent={{ text: title, style: styles.centerComponentStyle }}
            containerStyle={styles.containerStyle}
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
        color: AppColors.textColor1,
    },
    centerComponentStyle: {
        color: AppColors.backgroundColor4, 
        fontSize: 20,
    },
    containerStyle: {
        backgroundColor: AppColors.backgroundColor1,
    }
});