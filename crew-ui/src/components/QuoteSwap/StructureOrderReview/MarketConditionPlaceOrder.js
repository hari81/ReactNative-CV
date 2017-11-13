import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { InfoPopup } from '../../common';

import DisclaimerData from '../../../restAPI/disclaimer.json';

class MarketConditionPlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { isPlaceOrderEnabled: false,
            termsConditionsPopup: null,
            priceInfoPopup: null
        };
        this.priceInfo = { top: 205, left: 0, width: 280, arrowPosition: 'top', message: this.props.infoEstimatedNetPrice };
    }
    onAcceptTerms(value) {
        this.setState({ isTermsAccepted: value, isPlaceOrderEnabled: value });
    }
    showTermsConditions() {
        const popup = (<InfoPopup popupInfo={termsInfo} onClose={this.hideTermsConditions.bind(this)} />);
        this.setState({ termsConditionsPopup: popup });
    }
    hideTermsConditions() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ termsConditionsPopup: popup });
    }
    onModifyOrder() {
        Actions.pop();
    }
    render() {
        return (
            <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={styles.ViewStyle}>
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue', fontSize: 12 }}>CURRENT MARKET PRICE</Text>
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Medium', fontSize: 17 }}> $25</Text>
                    <Text style={{ marginTop: 15, color: 'white', fontFamily: 'HelveticaNeue', fontSize: 12  }}>MID-MARKET MARK</Text>
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Medium', fontSize: 17 }}>$25</Text>
                </View>
                <View style={styles.termsContainer}>
                    <Switch style={styles.switchStyle} onTintColor='#01aca8' //tintColor='#3b4a55'
                        onValueChange={this.onAcceptTerms.bind(this)}
                        value={this.state.isTermsAccepted} />
                    <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 14 }}>Agree to </Text>
                    <TouchableOpacity onPress={this.showTermsConditions.bind(this)} >
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
                 <View
                     style={[styles.reviewButtonStyle, this.state.isPlaceOrderEnabled ? styles.reviewButtonStyleEnabled : styles.reviewButtonStyleDisabled]}>
                     <TouchableOpacity //onPress={this.onPlaceOrderNow.bind(this)}
                            disabled={!this.state.isPlaceOrderEnabled} >
                         <Text style={[styles.reviewButtonTextStyle, { color: 'white', fontFamily: 'HelveticaNeue'}]}>PLACE ORDER NOW</Text>
                        </TouchableOpacity>
                    </View>
                <View style={[styles.reviewButtonStyle, styles.backButtonStyle]}>
                    <TouchableOpacity onPress={this.onModifyOrder.bind()}>
                        <Text style={[styles.reviewButtonTextStyle, { color: '#9fa9ba', fontFamily: 'HelveticaNeue' }]}>MODIFY ORDER</Text>
                    </TouchableOpacity>
                </View>
                {this.state.termsConditionsPopup}
            </View>
        );
    }
};

const termsInfo = { top: 210, left: -80, width: 400, arrowPosition: 'side', message: DisclaimerData.disclosure };
const { width, height } = Dimensions.get('window');
const styles = { /* container */
    ViewStyle: {
        marginTop: 40,
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
    backButtonStyle: { backgroundColor: '#fff', borderColor: '#9fa9ba', borderWidth: 1,  },
    reviewButtonStyleEnabled: { backgroundColor: '#279988' },
    reviewButtonStyleDisabled: { backgroundColor: '#27998865' },

};

const mapStateToProps = state => {
   return { acc: state,
       stateinfoEstimatedNetPrice: state.displayProperties.filter(item => item.propKey === 'infoEstimatedNetPrice')[0].propValue
   };
};

export default connect(mapStateToProps, null)(MarketConditionPlaceOrder);
