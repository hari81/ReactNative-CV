import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { LogoHomeHeader } from '../../components/common/index';
import Dimensions from 'Dimensions';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/DashBoard/MyFarmTiles';
import SetOrderDetails from './SetOrderDetails';
export default class QuoteSwap extends Component {
    render(){
        const { width, height } = Dimensions.get('window');
        return(
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20}}/>
                <LogoHomeHeader />
                <View style={{backgroundColor:'rgb(239,244,247)'}}>
                    <View style={{ height:83, width:1024,backgroundColor:'rgb(64,78,89)'}}/>
                    <MyFarmTiles/>
                    <SetOrderDetails/>
                    <MyCropButton/>
                </View>
            </View>
        )
    }
}
