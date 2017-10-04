import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IncrementSettingBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: width * 0.35, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 18, fontFamily: 'HelveticaNeue' }}>Your Profit Per Goal:</Text>
                </View>
                <View style={{ marginLeft: width * 0.003, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 28, fontFamily: 'HelveticaNeue' }}>$50</Text>
                </View>
                <View style={{ marginLeft: width * 0.24, height: height * 0.044, width: width * 0.156, backgroundColor: 'rgba(82,97,115,0.37)', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 14, fontFamily: 'HelveticaNeue' }}>Increment Setting</Text>
                </View>

            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        height: height * 0.07,
        backgroundColor: 'rgb(39,49,66)',
        flexDirection: 'row',

    }
}
export default IncrementSettingBar;
