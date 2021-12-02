import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../../colors/AppColors';


export default class MenuButton extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container} onPress = {this.props.onPress}>
                <Icon style={styles.icon} name={this.props.nameIcon} size={25}/>
                <Text style={styles.text}>{this.props.nameButton}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
        color: AppColors.iconColor2,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 2,
        color: AppColors.textColor2,
    },
    container: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
    }
})