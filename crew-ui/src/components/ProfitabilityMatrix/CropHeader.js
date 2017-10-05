import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';

class CropHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                <View style={{ marginLeft: width * 0.055, marginTop: height * 0.014, justifyContent: 'center', alignItems: 'center', width: 120 }}>
                    <Text style={{ fontSize: 16, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue' }}>MY FARM </Text>
                    <Text style={{ fontSize: 12, color: 'rgb(255,255,255)' }}>{this.props.underlyingData.underlyingYear} {this.props.cropButton.selectedCropName}</Text>
                    <Text style={{ fontSize: 10, color: 'rgb(39,153,137)' }}>Edit My Farm Details</Text>
                </View>
                </TouchableOpacity>
                <View style={{ width: 1, marginLeft: width * 0.0146, marginRight: width * 0.00683, marginTop: height * 0.019, height: height * 0.0611, backgroundColor: 'rgb(221,221,221)' }} />
                <View style={{ marginLeft: width * 0.22, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 24, fontFamily: 'HelveticaNeue' }}>Net Profit Per Acre</Text>
                </View>
                <View style={{ width: 1, marginLeft: width * 0.22, marginRight: width * 0.00683, marginTop: height * 0.019, height: height * 0.0611, backgroundColor: 'rgb(221,221,221)' }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 136 }}>
                    <Text style={{ fontSize: 14, paddingLeft: 7, color: 'rgb(255,255,255)' }}>BASIS ESTIMATE</Text>
                    <Text style={{ fontSize: 20, paddingLeft: 7, color: 'rgb(255,255,255)' }}>{this.props.basisEstimate}</Text>
                    <Text style={{ fontSize: 9, paddingLeft: 7, color: 'rgb(255,255,255)' }}>{this.props.basisEstimateEnabled ? 'Included in Calculations' : 'Not Included in Calculations' }</Text>
                </View>
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        height: height * 0.09,
        backgroundColor: 'rgb(39,49,66)',
        flexDirection: 'row',
    }
}
const mapStateToProps = (state) => {
    return {
        cropButton: state.cropsButtons,
        basisEstimate: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate'])).toFixed(2),
        basisEstimateEnabled: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']) === null ? '   -' : st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']),
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol)
    };
}
export default connect(mapStateToProps, null)(CropHeader);
