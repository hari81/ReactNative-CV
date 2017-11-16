import React, { Component } from 'react';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CommonHeader } from '../../common';
import MyCropButton from '../../common/CropButtons/MyCropButton';
import MyFarmTiles from '../../common/MyFarmTiles';
import MarketConditionPlaceOrder from './MarketConditionPlaceOrder';
import ReviewOrder from './ReviewOrder';
import bugsnag from '../.././common/BugSnag';

const { width, height } = Dimensions.get('window');

class StructureOrderReview extends Component {

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
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
                                <View style={{ width: 680 }} >
                                    <View><Text style={styles.suggestedText}>Let's review and complete your order</Text></View>
                                    <ReviewOrder custom={this.props.cust || ''} price={this.props.price}/>
                                </View>
                                <View style={{ marginRight: 20 }}>
                                    <MarketConditionPlaceOrder custom={this.props.cust || ''} price={this.props.price} />
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
        acc: state.account
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
        backgroundColor: 'rgb(61,76,81)',
        justifyContent: 'space-between'
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

export default connect(mapStateToProps, null)(StructureOrderReview);
