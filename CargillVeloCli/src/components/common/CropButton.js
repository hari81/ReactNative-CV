import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';

export default class CropButton extends Component {
    constructor(props) {
        super(props);
        this.state = { pressStatus: true };
    }

    render() {
        return (
            <Button
                style={styles.container}
                onPress={this.props.onPress}
                
            />
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

};


