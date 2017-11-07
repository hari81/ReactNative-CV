import React, { Component } from 'react';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader, Button } from '../../common/index';
import MyCropButton from '../../common/CropButtons/MyCropButton';
import MyFarmTiles from '../../common/MyFarmTiles';
import { ProductDetails } from './ProductDetails';
import { SuggestedPrice } from './SuggestedPrice';
import checkGreen from '../../common/img/structure/checkGreen.png';
import checkWhite from '../../common/img/structure/checkWhite.png';
import st from '../../../Utils/SafeTraverse';
import bugsnag from '../.././common/BugSnag';

const { width, height } = Dimensions.get('window');

class SuggestedQuote extends Component {
    constructor(props) {
        super(props);
      /*  this.state = {
            cropcode: props.cropcode || st(props, ['Crops', 0, 'code']),
            cropyear: props.cropyear || st(props, ['Crops', 0, 'cropYear']),
            selectedOrder: props.selectedOrder
        };*/
    }

    componentDidMount() {
      //  this.props.quoteSwapUnderlying(this.state.cropyear, this.state.cropcode);
    }

    onQuoteSwapUnderlying(year, code) {
        this.props.quoteSwapUnderlying(year, code);
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
                return (
                    <View>
                        <StatusBar barStyle='light-content' />
                        <View style={{backgroundColor: '#000', width, height: 20}}/>
                        <CommonHeader/>
                        <View style={{backgroundColor: 'rgb(239,244,247)'}}>

                            <View style={{height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)'}}/>

                            <MyFarmTiles/>
                            <View style={{ height: 500}}>
                                <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 15, marginHorizontal: 15, height: 445, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)', backgroundColor: 'rgb(61,76,81)'}}>
                                    <View>
                                        <Text style={{ fontFamily: 'HelveticaNeue-Thin', color: 'white', fontSize: 31, paddingTop: 20, paddingLeft: 20}}>Our suggested quote given the current market</Text>
                                        <SuggestedPrice/>
                                        <Text style={{paddingLeft: 20, marginTop: 50, fontFamily: 'HelveticaNeue-Thin', color: 'white', fontSize: 31}}>Would you like to hedge at these levels?</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            {/*<ImageButton img={checkGreen}>YES - Place Order Now!</ImageButton>
                                            <ImageButton img={checkWhite}>NO - Customize Order</ImageButton>*/}
                                        </View>
                                    </View>
                                    <View>
                                        <ProductDetails/>
                                    </View>
                                </View>
                            </View>

                            <MyCropButton onQuoteSwapUnderlying={this.onQuoteSwapUnderlying.bind(this)} />
                        </View>
                    </View>);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons,
        acc: state.account
    };
};

export default connect(mapStateToProps, null)(SuggestedQuote);
