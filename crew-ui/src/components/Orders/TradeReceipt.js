import React, { Component } from 'react';
import { View, WebView, StyleSheet, Button, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CommonHeader } from '../../components/common';
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
                    <View
                        style={{
                            backgroundColor: 'black',
                            height: 20
                        }}
                    />
                    <CommonHeader/>
                    <Button color='#01aca8' title="<<Back to Positions" onPress={() => {
                        Actions.pop();
                    }}/>
                    <WebView
                        style = {{backgroundColor: 'rgb(64,78,89)'}}
                        source={{uri: 'file://' + this.props.path,}}
                    />
                </View>);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { width, height } = Dimensions.get('window');
export default TradeReceipt;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(64,78,89)',
        height
    }
});
