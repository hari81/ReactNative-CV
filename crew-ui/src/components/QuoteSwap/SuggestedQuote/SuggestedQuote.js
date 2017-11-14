import React, { Component } from 'react';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CommonHeader, ImageButton } from '../../common';
import MyCropButton from '../../common/CropButtons/MyCropButton';
import MyFarmTiles from '../../common/MyFarmTiles';
import ProductDetails from './ProductDetails';
import { SuggestedPrice } from './SuggestedPrice';
import { estimateProfit } from '../../../redux/actions/QuoteSwap/EstimatedProfitAction';
import bugsnag from '../.././common/BugSnag';

const { width, height } = Dimensions.get('window');

class SuggestedQuote extends Component {
    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.selectQuantity();
                break;
            case 2:
                Actions.customizeOrder();
                break;
            default:
        }
    }
    backToBushalQty = () => {
        Actions.pop();
    };

    componentDidMount() {
        this.props.estimateProfit(1, 'Start');
        this.props.estimateProfit(1);
    }
    customizeOrder = () => {
        const { cMonth, cYear, quantity } = this.props.previousState;
        const { strike, bonusPrice, price } = this.props.suggestQuote;
        Actions.customizeOrder({ cMonth, cYear, quantity, strike, bonusPrice, price });
    }
    reviewOrder = () => {
        Actions.structureOrderReview();
    };
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            const { strike, bonusPrice, accrualStartDate, price, underlyingPrice } = this.props.suggestQuote;
            const { cMonth, cYear, expirationDate, quantity } = this.props.previousState;
            const contractMonth = `${cMonth} ${cYear}`;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
                return (
                    <View>
                        <StatusBar barStyle='light-content' />
                        <View style={{ backgroundColor: '#000', width, height: 20 }} />
                        <CommonHeader />
                        <View style={{ backgroundColor: 'rgb(239,244,247)' }}>

                            <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />

                            <MyFarmTiles />
                            <View style={{ height: height - 264 }}>
                                <View style={styles.container}>
                                    <View>
                                        <Text style={styles.suggestedText}>Our suggested quote given the current market</Text>
                                        <SuggestedPrice
                                            floorPrice={strike}
                                            bonusPrice={bonusPrice}
                                            aStartDate={accrualStartDate}
                                            endDate={expirationDate}
                                            price={price}
                                        />
                                        <Text style={styles.hedgeText}>Would you like to hedge at these levels?</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                            <ImageButton text='YES - Review Order ' onPress={this.reviewOrder} />
                                            <ImageButton text='NO - Customize Order' onPress={this.customizeOrder}/>
                                        </View>
                                    </View>
                                    <View>
                                        <ProductDetails
                                            marketPrice={underlyingPrice}
                                            additionalQtyPrice={bonusPrice}
                                            contractMonth={contractMonth}
                                            quantity={quantity}
                                            cropYear={this.props.cropYear}
                                        />
                                        <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 20 }}>
                                            <ImageButton text='BACK' onPress={this.backToBushalQty} />
                                            <ImageButton text='NEXT' inactive='true' />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <MyCropButton appearance='notclear' />
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
        acc: state.account,
        sug: state.eProfit
    };
};
const styles = {
    container: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 15,
        marginHorizontal: 15,
        height: 445,
        borderTopWidth: 4,
        borderTopColor: 'rgb(231,181,20)',
        backgroundColor: 'rgb(61,76,81)'
    },
    suggestedText: {
        fontFamily: 'HelveticaNeue-Thin',
        color: 'white',
        fontSize: 31,
        paddingTop: 20,
        paddingLeft: 20
    },
    hedgeText: {
        paddingLeft: 20,
        marginTop: 50,
        fontFamily: 'HelveticaNeue-Thin',
        color: 'white',
        fontSize: 31
    }
};

export default connect(mapStateToProps, { estimateProfit })(SuggestedQuote);
