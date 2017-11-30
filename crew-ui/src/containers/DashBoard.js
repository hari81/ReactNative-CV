import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader } from '../components/common';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../components/common/MyFarmTiles';
import ActionBar from '../components/DashBoard/ActionBar';
import MyFarmProduction from '../components/DashBoard/MyFarmProduction';
import bugsnag from '../components/common/BugSnag';

class DashBoard extends Component {
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const { width, height } = Dimensions.get('window');
            return (
                <View>
                    <StatusBar barStyle='light-content' />
                    <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20 }} />
                    <CommonHeader />
                    <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                        <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />
                        <MyFarmTiles />
                        <MyFarmProduction />
                        <ActionBar />
                        <MyCropButton />
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const mapStateToProps = (state) => {
    return { acc: state.account };
};

export default connect(mapStateToProps, null)(DashBoard);
