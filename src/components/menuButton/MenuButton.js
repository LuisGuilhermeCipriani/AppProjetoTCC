import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


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

/*export default props = () => {
    return(
        <TouchableOpacity style={styles.container} onPress = {props.onPress}>
            <Icon style={styles.icon} name={props.nameIcon} size={25}/>
            <Text style={styles.text}>{props.nameButton}</Text>
        </TouchableOpacity>
    )
}*/


const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
        color: '#345555',
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 2,
        color: '#000000',
    },
    container: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
    }
})