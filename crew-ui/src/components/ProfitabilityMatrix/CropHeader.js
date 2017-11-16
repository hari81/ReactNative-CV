import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import { myFarmCropValues, myFarmTradeSalesOutSideApp, farmActionFlag } from '../../redux/actions/MyFarm/CropAction';
import bugsnag from '../../components/common/BugSnag';

class CropHeader extends Component {
    matrixToMyFarm = () => {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        this.props.farmActionFlag(true);
        this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
        this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
        Actions.myfarm();
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.matrixToMyFarm}>
                        <View style={{
                            marginLeft: width * 0.055,
                            marginTop: height * 0.014,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 120
                        }}>
                            <Text style={{fontSize: 16, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue'}}>MY
                                FARM </Text>
                            <Text style={{
                                fontSize: 12,
                                color: 'rgb(255,255,255)'
                            }}>{this.props.underlyingData.underlyingYear} {this.props.cropButton.selectedCropName}</Text>
                            <Text style={{ fontSize: 10, color: 'rgb(39,153,137)' }}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        width: 1,
                        marginLeft: width * 0.0146,
                        marginRight: width * 0.00683,
                        marginTop: height * 0.019,
                        height: height * 0.0611,
                        backgroundColor: 'rgb(221,221,221)'
                    }}/>
                    <View style={{marginLeft: width * 0.2, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'rgb(255,255,255)', fontSize: 24, fontFamily: 'HelveticaNeue'}}>Net Profit
                            Per Acre</Text>
                    </View>
                    <View style={{
                        width: 1,
                        marginLeft: width * 0.24,
                        marginRight: width * 0.00683,
                        marginTop: height * 0.019,
                        height: height * 0.0611,
                        backgroundColor: 'rgb(221,221,221)'
                    }}/>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 136}}>
                        <Text style={{fontSize: 14, paddingLeft: 7, color: 'rgb(255,255,255)'}}>BASIS ESTIMATE</Text>
                        <Text style={{
                            fontSize: 20,
                            paddingLeft: 7,
                            color: 'rgb(255,255,255)'
                        }}>{common.minusBeforeDollarSign(this.props.basisEstimate, 2)}</Text>
                        <Text style={{
                            fontSize: 9,
                            paddingLeft: 7,
                            color: 'rgb(255,255,255)'
                        }}>{this.props.basisEstimateEnabled ? 'Included in Calculations' : 'Not Included in Calculations'}</Text>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        height: height * 0.09,
        backgroundColor: 'rgb(39,49,66)',
        flexDirection: 'row',
    },
    placeOrderButtonStyle: {
        height: height * 0.052,
        width: width * 0.2149,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.026,
        backgroundColor: 'rgb(39,153,137)',
        borderRadius: 4,
        marginLeft: width * 0.13
    }
}
const mapStateToProps = (state) => {
    return {
        cropButton: state.cropsButtons,
        basisEstimate: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate']) === null ? '   -' : st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate']),
        basisEstimateEnabled: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']) === null ? '   -' : st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']),
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol),
        acc: state.account
    };
}
export default connect(mapStateToProps, { myFarmCropValues, myFarmTradeSalesOutSideApp, farmActionFlag })(CropHeader);
