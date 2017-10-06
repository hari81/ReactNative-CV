import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import cancelimage from '../common/img/Cancel-20.png';
import Info from '../common/img/Info.png';
import { showInfoButtonClick, hideInfoButtonClick } from '../../redux/actions/Dashboard/infobuttonsAction';
import { myFarmCropValues, cropButtonPress, myFarmTradeSalesOutSideApp, farmActionFlag } from '../../redux/actions/MyFarm/CropAction';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';

class MyFarmTiles extends Component {
    //info button condition check
    infoButton(str) {
        switch (str) {
            case 'breakEven':
                this.props.showInfoButtonClick(1);
                break;
            case 'targetPrice':
                this.props.showInfoButtonClick(2);
                break;
            case 'avgPrice':
                this.props.showInfoButtonClick(3);
                break;
            case 'profitPerAcre':
                this.props.showInfoButtonClick(4);
                break;
            case 'unhedged':
                this.props.showInfoButtonClick(5);
                break;
            case 'basisEstimate':
                this.props.showInfoButtonClick(6);
                break;
            default: break;
        }
    }

    //info block display condition
    showMessage(btnNumber) {
        let popup;
        switch (btnNumber) {
            case 1:
                popup = this.buildMessagePopup(width * 0.195, width * 0.087, this.props.breakEvenPriceInfo);
                break;
            case 2:
                popup = this.buildMessagePopup(width * 0.351, width * 0.234, this.props.targetPriceInfo);
                break;
            case 3:
                popup = this.buildMessagePopup(width * 0.488, width * 0.371, this.props.avgPriceSoldInfo);
                break;
            case 4:
                popup = this.buildMessagePopup(width * 0.615, width * 0.498, this.props.profitPerAcreInfo);
                break;
            case 5:
                popup = this.buildMessagePopup(width * 0.752, width * 0.625, this.props.unhedgedProductionInfo);
                break;
            case 6:
                popup = this.buildMessagePopup(width * 0.86, width * 0.683, this.props.basisEstimateInfo);
                break;
            default:
                popup = <View style={{ display: 'none' }} />;
        }
        return popup;
    }

    //info block display method
    buildMessagePopup(arrowPosition, messagePosition, message) {
        return (
            <View style={styles.messageContainer}>
                <View style={[styles.triangle, { marginLeft: arrowPosition }]} />
                <View style={[styles.messageBox, { marginLeft: messagePosition }]}>
                    <TouchableOpacity onPress={this.cancelButton.bind(this)} >
                        <View style={{ marginLeft: width * 0.2324, marginTop: 2 }}>
                            <Image source={cancelimage} style={{ width: width * 0.0156, height: width * 0.0156 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.messageBoxText}>{message}</Text>
                </View>
            </View>
        );
    }

    hideMessage() {
        return (<View style={{ display: 'none' }} />);
    }

    //on Cancel info button press
    cancelButton() {
        this.props.hideInfoButtonClick();
    }

    goToFarm() {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
        this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
        this.props.farmActionFlag(true);
        Actions.myfarm();
    }

    enterCropDetails = () => {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
        this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
        this.props.farmActionFlag(true);
        Actions.myfarm({ tradeflag: true });
    };

    render() {
        //returning Enter Crop Details when my farm tiles data is absent in json
        if (st(this.props, ['myFarmTiles', 'breakEvenPrice']) === null) {
            return (
                <View style={styles.firstRowStyle}>
                    <View style={{ marginLeft: width * 0.0224, marginTop: height * 0.0338 }}>
                        <Text style={{ fontSize: 24, color: 'rgb(61,76,87)', fontFamily: 'HelveticaNeue-Medium' }}>My Farm </Text>
                        <Text>{this.props.underlyingData.underlyingYear} {this.props.cropButton.selectedCropName}</Text>
                    </View>
                    <View style={{ width: 1, marginLeft: width * 0.0146, marginRight: width * 0.00683, marginTop: height * 0.033, height: height * 0.0611, backgroundColor: 'rgb(221,221,221)' }} />
                    <View style={{ width: 1, height: height * 0.0611 }} />
                    <View style={{ justifyContent: 'center', marginLeft: width * 0.0195, width: width * 0.488 }}>
                        <Text>Enter your current {this.props.underlyingData.underlyingYear} {this.props.cropButton.selectedCropName} crop details to receive helpful insights</Text>
                    </View>
                    <View style={styles.enterCropButtonStyle}>
                        <TouchableOpacity onPress={this.enterCropDetails}>
                            <Text style={{ color: 'white' }}>Enter Crop Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        //returning tiles when my farm tiles data is present in json
        return (
            <View style={styles.firstRowStyle}>
                <TouchableOpacity onPress={this.goToFarm.bind(this)}>
                    <View style={{ marginLeft: 23, marginTop: 26 }}>

                        <Text style={{ fontSize: 24, color: 'rgb(61,76,87)', fontFamily: 'HelveticaNeue-Medium' }}>My Farm </Text>
                        <View style={{ flexDirection: 'row', width: 100 }}>
                            <Text style={{ fontSize: 12 }}>{this.props.underlyingData.underlyingYear}</Text><Text style={{ fontSize: 12 }}> {this.props.cropButton.selectedCropName}</Text>
                        </View>
                        <Text style={{ fontSize: 10, color: 'rgb(39,153,137)' }}>Edit My Farm Details</Text>

                    </View>
                </TouchableOpacity>

                <View style={{ width: 1, marginLeft: 15, marginRight: 7, marginTop: 26, height: 47, backgroundColor: 'rgb(221,221,221)' }} />

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>BREAKEVEN PRICE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'breakEven')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>

                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>{this.props.breakEvenPrice}</Text>

                </View>
                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>TARGET PRICE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'targetPrice')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>{this.props.targetPrice}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 4 }}>AVERAGE PRICE SOLD</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'avgPrice')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={styles.priceStyle}>{this.props.avgPriceSold}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>PROFIT PER ACRE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'profitPerAcre')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>{this.props.profitPerAcre}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7 }}>UNHEDGED PRODUCTION</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'unhedged')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={styles.priceStyle}>{this.props.unhedgedProduction}</Text>
                    <Text style={{ paddingLeft: 10, fontSize: 10, color: 'rgb(61,76,87)' }}>{this.props.unitOfMeasure}s</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 80 }}><Text style={{ fontSize: 10, paddingLeft: 7 }}>BASIS ESTIMATE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'basisEstimate')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={[styles.priceStyle, { color: 'rgb(158,42,47)' }]}>{this.props.basisEstimate}</Text>
                    <Text style={{ paddingLeft: 10, fontSize: 8, color: 'rgb(61,76,87)' }}>{this.props.basisEstimateEnabled ? 'Included in Calculations' : 'Not Included in Calculations' }</Text>
                </View>
                {this.props.infoState.infoEnable ? this.showMessage(this.props.infoState.btnNumber) : this.hideMessage()}
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window');

const styles = {
    firstRowStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgb(255,255,255)',
        height: height * 0.129,
        width: width * 0.97,
        marginHorizontal: width * 0.0156,
        marginTop: height * 0.0182,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1,
        position: 'absolute',
        zIndex: 1
    },
    boxStyle: {
        width: width * 0.1308,
        height: height * 0.0885,
        backgroundColor: 'rgb(239,244,247)',
        marginRight: width * 0.0058,
        marginTop: height * 0.0195
    },
    enterCropButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.039,
        width: width * 0.1562,
        backgroundColor: 'rgb(39,153,137)',
        marginTop: height * 0.039,
        marginLeft: width * 0.039,
        borderRadius: 5
    },
    priceStyle: {
        fontSize: 24,
        color: 'rgb(61,76,87)',
        paddingLeft: width * 0.0097,
        fontFamily: 'HelveticaNeue-Medium',
        opacity: 93
    },
    messageContainer: { position: 'absolute', marginTop: height * 0.0976, left: 0 },
    triangle: { 
        width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#ddd', borderLeftWidth: 8, borderRightWidth: 8, borderBottomWidth: 16, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd'
    },
    messageBox: { width: width * 0.253, borderColor: '#ddd', borderWidth: 2, backgroundColor: '#fff', borderRadius: 3 },
    messageBoxText: { 
        fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 15, paddingTop: 0, paddingRight: 15, paddingBottom: 15 
    }    
};

const mapStateToProps = state => {
    return {

        cropButton: state.cropsButtons,
        myf: state.myFar,
        infoState: state.info,

        myFarmTiles: st(state.dashBoardData, ['Data', 'myFarmTiles']),

        unitOfMeasure: st(state.account, ['defaultAccount', 'commodities', 0, 'unitOfMeasure']),

        breakEvenPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice'])).toFixed(2),
        breakEvenPriceInfo: st(state.displayProperties).filter(item => item.propKey === 'breakEvenPrice')[0].propValue,

        targetPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice'])).toFixed(2),
        targetPriceInfo: st(state.displayProperties).filter(item => item.propKey === 'targetPrice')[0].propValue,

        avgPriceSold: st(state.dashBoardData, ['Data', 'myFarmTiles', 'averagePriceSold']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'averagePriceSold'])).toFixed(2),
        avgPriceSoldInfo: st(state.displayProperties).filter(item => item.propKey === 'averagePriceSold')[0].propValue,

        profitPerAcre: st(state.dashBoardData, ['Data', 'myFarmTiles', 'profitPerAcre']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'profitPerAcre'])).toFixed(2),
        profitPerAcreInfo: st(state.displayProperties).filter(item => item.propKey === 'profitPerAcre')[0].propValue,

        unhedgedProduction: st(state.dashBoardData, ['Data', 'myFarmTiles', 'unhedgedProduction']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'unhedgedProduction'])).toFixed(0)),
        unhedgedProductionInfo: st(state.displayProperties).filter(item => item.propKey === 'unhedgedProduction')[0].propValue,

        basisEstimate: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate']) === null ? '   -' : '$ ' + parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimate'])).toFixed(2),
        basisEstimateInfo: st(state.displayProperties).filter(item => item.propKey === 'basisEstimate')[0].propValue,
        basisEstimateEnabled: st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']) === null ? '   -' : st(state.dashBoardData, ['Data', 'myFarmTiles', 'basisEstimateEnabled']),

        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol)
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            showInfoButtonClick,
            myFarmCropValues,
            cropButtonPress,
            myFarmTradeSalesOutSideApp,
            hideInfoButtonClick,
            farmActionFlag
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFarmTiles);
