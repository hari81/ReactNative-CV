import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { CommonHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/common/MyFarmTiles';
import OrderMenuOptions from '../../components/QuoteSwap/OrderMenuOptions';

const { height, width } = Dimensions.get('window');
export default class WhatToday extends Component {
    render() {
        return (
            <View>
                <StatusBar barStyle='light-content' />
                <View style={{ backgroundColor: '#000', width, height: 20 }} />
                <CommonHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <OrderMenuOptions />
                    <MyCropButton frm='DB'/>
                </View>
            </View>
        );
    }
}
