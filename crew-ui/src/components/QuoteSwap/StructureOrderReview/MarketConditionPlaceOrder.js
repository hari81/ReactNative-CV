import React, { Component } from 'react';
import { Actions, NavigationActions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { View, Text, Switch, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Spinner } from '../../common/Spinner';
import { optimalSuggestedQuote, customisedFlag } from '../../../redux/actions/QuoteSwap/SuggestedQuote';
import { placeOrder } from '../../../redux/actions/OrdersAction/PlaceOrder';
import { InfoPopup } from '../../common';
import * as common from '../../../Utils/common';
//import st from '../../../Utils/SafeTraverse';

import DisclaimerData from '../../../restAPI/disclaimer.json';

class MarketConditionPlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { isPlaceOrderEnabled: false,
            termsConditionsPopup: null,
            priceInfoPopup: null
        };
        this.priceInfo = { top: 205, left: 0, width: 250, arrowPosition: 'top', message: this.props.infoEstimatedNetPrice };
    }
    onAcceptTerms(value) {
        this.setState({ isTermsAccepted: value, isPlaceOrderEnabled: value });
    }
    showTermsConditions() {
        termsInfo = common.getDisclosure(DisclaimerData, this.props.productId, termsInfo);
        const popup = (<InfoPopup popupInfo={termsInfo} onClose={this.hideTermsConditions.bind(this)} />);
        this.setState({ termsConditionsPopup: popup });
    }
    hideTermsConditions() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ termsConditionsPopup: popup });
    }
    onModifyOrder() {
        if (this.props.custom === 'customize') {
            const { strike, bonusPrice, price } = this.props.sug;
            const quantity = this.props.sug.metadata.quantity;
            this.props.customisedFlag(false);
            Actions.customizeOrder({ quantity, strike, bonusPrice, price, fromsug: 'modify' });
            return;
        }
        const cropYear = this.props.cropButton.selectedCropName + ' ' + this.props.cropButton.selectedId.slice(-4);
        this.props.optimalSuggestedQuote(1, this.props.midMarket.metadata, cropYear);
    }
    onModifySpinner() {
        if (this.props.flag) {
            return <View style={{ height: 25 }}><Spinner /></View>;
        }
        return (<TouchableOpacity onPress={this.onModifyOrder.bind(this)}>
            <Text style={[styles.reviewButtonTextStyle, { color: '#9fa9ba', fontFamily: 'HelveticaNeue' }]}>MODIFY ORDER</Text>
        </TouchableOpacity>);
    }
    onPlaceOrderNow() {
        if (this.state.isTermsAccepted === true) {
            this.setState({ isPlaceOrderEnabled: false });
            this.props.placeOrder();
        } else {
            Alert.alert('You must accept the terms and conditions before placing the order.');
        }
    }
    render() {
        return (
            <View style={{ position: 'absolute', top: 60, left: 675, justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={styles.ViewStyle}>
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue', fontSize: 12 }}>CURRENT MARKET PRICE</Text>
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Medium', fontSize: 17 }}>{common.minusBeforeDollarSign(this.props.midMarket.underlyingPrice, 4)}</Text>
                    <Text style={{ marginTop: 15, color: 'white', fontFamily: 'HelveticaNeue', fontSize: 12 }}>MID-MARKET MARK</Text>
                    <StyledText >{common.minusBeforeDollarSign(this.props.midMarket.midMarketMark, 4)}</StyledText>
                </View>
                <View style={styles.termsContainer}>
                    <Switch style={styles.switchStyle} onTintColor='#01aca8' //tintColor='#3b4a55'
                        onValueChange={this.onAcceptTerms.bind(this)}
                        value={this.state.isTermsAccepted} 
                    />
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 14 }}>Agree to </Text>
                    <TouchableOpacity onPress={this.showTermsConditions.bind(this)} >
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
                 <View
                     style={[styles.reviewButtonStyle, this.state.isPlaceOrderEnabled ? styles.reviewButtonStyleEnabled : styles.reviewButtonStyleDisabled]}>
                     <TouchableOpacity onPress={this.onPlaceOrderNow.bind(this)}
                            disabled={!this.state.isPlaceOrderEnabled} >
                         <Text style={[styles.reviewButtonTextStyle, { color: 'white', fontFamily: 'HelveticaNeue'}]}>PLACE ORDER NOW</Text>
                        </TouchableOpacity>
                    </View>
                <View style={[styles.reviewButtonStyle, styles.backButtonStyle]}>
                    { this.onModifySpinner()}
                </View>
                {this.state.termsConditionsPopup}
            </View>
        );
    }
}

let termsInfo = { top: -5, left: -385, width: 500, arrowPosition: 'right' };
const { width, height } = Dimensions.get('window');
const StyledText = styled.Text`
  color: white; 
  fontFamily: HelveticaNeue-Medium; 
  fontSize: 17 
`;
const styles = { /* container */
    ViewStyle: {
        width: 287,
        height: 121,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(224,242,243,0.1)',
        borderRadius: 5,
        //marginLeft: 20,
        borderColor: '#01aca8',
        alignItems: 'center',
        justifyContent: 'center'
    },

    /* quote fields */
    switchStyle: { backgroundColor: '#ddd', borderRadius: 18, marginRight: 20 },
    termsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 30 },
    termsLink: { color: 'white', textDecorationLine: 'underline', fontFamily: 'HelveticaNeue-Light', fontSize: 14 },

    /* button styles */
    reviewButtonStyle: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 30, borderRadius: 4, paddingTop: 10, paddingBottom: 10, width: 287 },
    reviewButtonTextStyle: { fontFamily: 'HelveticaNeue-Light', color: '#4a4a4a', fontSize: 20 },
    backButtonStyle: { backgroundColor: '#fff', borderColor: '#9fa9ba', borderWidth: 1, },
    reviewButtonStyleEnabled: { backgroundColor: '#279988' },
    reviewButtonStyleDisabled: { backgroundColor: '#27998865' },

};

const mapStateToProps = state => {
    let tProductId = null;
    if (common.isValueExists(state.optimalQuote.suggestedQuote)) {
        if (common.isValueExists(state.optimalQuote.suggestedQuote.metadata)) {
            tProductId = state.optimalQuote.suggestedQuote.metadata.riskProductId;
        }
    }

   return { midMarket: state.optimalQuote.suggestedQuote,
            flag: state.optimalQuote.spinFlag,
            cropButton: state.cropsButtons,
            stateinfoEstimatedNetPrice: state.displayProperties.filter(item => item.propKey === 'infoEstimatedNetPrice')[0].propValue,
            productId: tProductId,
            sug: state.optimalQuote.suggestedQuote
   };
};

export default connect(mapStateToProps, { optimalSuggestedQuote, placeOrder, customisedFlag })(MarketConditionPlaceOrder);
