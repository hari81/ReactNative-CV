import React, { Component } from 'react';
import { View, WebView, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
class TradeReceipt extends Component {
    constructor() {
        super();
        this.state = { fileLocation: '' };
    }

    render() {
        console.log(this.props.path);
    return (
        <View style={styles.container}>
            <Button title="Back to Positions" onPress={() => { Actions.orders({ selectedTab: 'Open Positions', Crop: 'C' }); }} />
            <WebView
             source={{ uri: 'file://' + this.props.path, }}
            />

        </View>);
    }
}

export default TradeReceipt;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        height: 700,
    }
});
