import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CropHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: width * 0.36, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 24, fontFamily: 'HelveticaNeue' }}>2017 Corn Net Profit Per Acre</Text>
                </View>
                <View style={{ marginLeft: width * 0.09, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 13, fontFamily: 'HelveticaNeue-Light' }}>Today's Price:</Text>
                </View>
                <View style={{ marginLeft: width * 0.01, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 26 }}>$ 4.05</Text>
                </View>
                <View style={{ marginLeft: width * 0.006, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 13, paddingTop: 10, paddingLeft: 4 }}>Dec 2017</Text>
                </View>
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        height: height * 0.09,
        backgroundColor: 'rgb(35,43,50)',
        flexDirection: 'row',
    }
}
export default CropHeader;
