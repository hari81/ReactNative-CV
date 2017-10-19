import React, { Component } from 'react';
import { View, WebView, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import bugsnag from '../../components/common/BugSnag';

class TradeReceipt extends Component {
    constructor() {
        super();
        this.state = { fileLocation: '' };
    }

    render() {
        try {
            //console.log(this.props.path);
            return (
                <View style={styles.container}>
                    <Button title="Back to Positions" onPress={() => {
                        Actions.pop();
                    }}/>
                    <WebView
                        source={{uri: 'file://' + this.props.path,}}
                    />
                </View>);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

export default TradeReceipt;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        height: 700,
    }
});
