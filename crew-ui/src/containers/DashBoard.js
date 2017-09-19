import React, { Component } from 'react';
import { View } from 'react-native';
import Dimensions from 'Dimensions';
import { LogoHomeHeader } from '../components/common';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../components/DashBoard/MyFarmTiles';
import ActionBar from '../components/DashBoard/ActionBar';
import MyFarmProduction from '../components/DashBoard/MyFarmProduction';

class DashBoard extends Component {

    render() {
        const { width } = Dimensions.get('window');
        return (
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: 83, width: 1024, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <MyFarmProduction />
                    <ActionBar />
                    <MyCropButton />
                </View>
            </View>
        );
    }
}

export default DashBoard;
