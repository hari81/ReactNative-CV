import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';

export default class CropButton extends Component {
    render() {
        return (
            <TouchableHighlight style={buttonStatus ? styles.afterPress : styles.beforePress} onPress={this.props.onPress}>
                <View>
                    <Text>2017</Text>
                    <Text>CORN</Text>
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        height: 60,
        width: 80,
        
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000066'
    },
    welcomePress: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
    },
    offButtonPressStyle: {
        borderColor: '#000066',
        borderWidth: 1,
        borderRadius: 10,
    },
    onButtonPressStyle: {
        borderColor: '#000066',
        backgroundColor: '#000066',
        borderWidth: 1,
        borderRadius: 10,
    },
    beforePress: {
        backgroundColor: 'white',
        width: 100,
    },
    afterPress: {
        backgroundColor: 'green',
        width: 100,
    }

};


