import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader } from '../components/common';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../components/common/MyFarmTiles';
import ActionBar from '../components/DashBoard/ActionBar';
import MyFarmProduction from '../components/DashBoard/MyFarmProduction';
import bugsnag from '../components/common/BugSnag';

class DashBoard extends Component {
    render() {
        try {
            const {width, height} = Dimensions.get('window');
            return (
                <View>
                    <View style={{backgroundColor: 'rgb(0,0,0)', width, height: width * 0.026}}/>
                    <CommonHeader/>
                    <View style={{backgroundColor: 'rgb(239,244,247)'}}>
                        <View style={{height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)'}}/>
                        <MyFarmTiles/>
                        <MyFarmProduction/>
                        <ActionBar/>
                        <MyCropButton/>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
export default connect(null, null)(DashBoard);
