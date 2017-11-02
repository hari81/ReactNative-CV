import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader } from '../../../components/common/index';
import MyCropButton from '../../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../../components/common/MyFarmTiles';
import SetOrderDetails from './SetOrderDetails';
import UpdateOrderDetails from './UpdateOrderDetails';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import st from '../../../Utils/SafeTraverse';
import bugsnag from '../../../components/common/BugSnag';

const { width, height } = Dimensions.get('window');

class QuoteSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropcode: props.cropcode || st(props, ['Crops', 0, 'code']),
            cropyear: props.cropyear || st(props, ['Crops', 0, 'cropYear']),
            selectedOrder: props.selectedOrder
        };
    }

    componentDidMount() {
        this.props.quoteSwapUnderlying(this.state.cropyear, this.state.cropcode);
    }

    onQuoteSwapUnderlying(year, code) {
        this.props.quoteSwapUnderlying(year, code);
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            if (this.state.selectedOrder === undefined) {
                return (
                    <View>
                        <View style={{backgroundColor: '#000', width, height: 20}}/>
                        <CommonHeader/>
                        <View style={{backgroundColor: 'rgb(239,244,247)'}}>
                            <View style={{height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)'}}/>
                            <MyFarmTiles/>
                            <SetOrderDetails/>
                            <MyCropButton onQuoteSwapUnderlying={this.onQuoteSwapUnderlying.bind(this)}/>
                        </View>
                    </View>
                );
            }
            return (
                <View>
                    <View style={{backgroundColor: '#000', width, height: height * 0.026}}/>
                    <CommonHeader/>
                    <View style={{backgroundColor: 'rgb(239,244,247)'}}>
                        <View style={{height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)'}}/>
                        <MyFarmTiles/>
                        <UpdateOrderDetails selectedOrder={this.state.selectedOrder}/>
                    </View>
                </View>
            );
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

export default connect(mapStateToProps, { quoteSwapUnderlying })(QuoteSwap);
