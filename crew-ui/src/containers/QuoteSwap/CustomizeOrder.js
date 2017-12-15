import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { CommonHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/common/MyFarmTiles';
import CustomizeOrder from '../../components/QuoteSwap/CustomizeOrder/CustomizeOrder';

const { height, width } = Dimensions.get('window');
export default class CustomizingOrder extends Component {
    render() {
        return (
            <View>
                <StatusBar barStyle='light-content' />
                <View style={{ backgroundColor: '#000', width, height: 20 }} />
                <CommonHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <CustomizeOrder
                        quantity={this.props.quantity}
                        fPrice={this.props.strike}
                        bPrice={this.props.bonusPrice}
                        price={this.props.price}
                        from={this.props.fromsug}
                    />
                    <MyCropButton appearance='notclear' />
                </View>
            </View>
        );
    }
}