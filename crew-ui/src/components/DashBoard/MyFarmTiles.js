import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import cancelimage from '../common/img/Cancel-20.png';
import Info from '../common/img/Info.png';
import { showInfoButtonClick, hideInfoButtonClick } from '../../redux/actions/Dashboard/infobuttonsAction';
import { myFarmCropValues, cropButtonPress, myFarmTradeSalesOutSideApp, farmActionFlag } from '../../redux/actions/MyFarm/CropAction';

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
            default: break;
        }
    }

    //info block display condition
    showMessage(btnNumber) {
        let popup;
        switch (btnNumber) {
            case 1:
                popup = this.buildMessagePopup(200, 90, this.props.Crops.myFarmTiles.breakEvenPrice.info);
                break;
            case 2:
                popup = this.buildMessagePopup(360, 240, this.props.Crops.myFarmTiles.targetPrice.info);
                break;
            case 3:
                popup = this.buildMessagePopup(500, 380, this.props.Crops.myFarmTiles.averagePriceSold.info);
                break;
            case 4:
                popup = this.buildMessagePopup(630, 510, this.props.Crops.myFarmTiles.profitPerAcre.info);
                break;
            case 5:
                popup = this.buildMessagePopup(770, 640, this.props.Crops.myFarmTiles.unhedgedProduction.info);
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
                        <View style={{ marginLeft: 238, marginTop: 2 }}>
                            <Image source={cancelimage} style={{ width: 16, height: 16 }} />
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
     const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
       this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
         this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
         this.props.farmActionFlag(true);
        Actions.myfarm();
    }

   enterCropDetails = () => {
        const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
        this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
       this.props.farmActionFlag(true);
        Actions.myfarm({ tradeflag: true });
    };

    render() {
        //returning Enter Crop Details when my farm tiles data is absent in json
        if (!this.props.Crops.myFarmTiles) {
            return (
                <View style={styles.firstRowStyle}>
                    <View style={{ marginLeft: 23, marginTop: 26 }}>
                        <Text style={{ fontSize: 24, color: 'rgb(61,76,87)', fontFamily: 'HelveticaNeue-Medium' }}>My Farm </Text>
                        <Text>{this.props.Crops.activeCropYear} {this.props.Crops.activeCommodity.name}</Text>
                    </View>
                    <View style={{ width: 1, marginLeft: 15, marginRight: 7, marginTop: 26, height: 47, backgroundColor: 'rgb(221,221,221)' }} />
                    <View style={{ width: 1, height: 47 }} />
                    <View style={{ justifyContent: 'center', marginLeft: 20, width: 500 }}>
                        <Text>Enter your current {this.props.Crops.activeCropYear} {this.props.Crops.activeCommodity.name} crop details to receive helpful insights</Text>
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
                        <Text>{this.props.Crops.activeCropYear} {this.props.Crops.activeCommodity.name}</Text>

                        <Text style={{ fontSize: 10, color: 'rgb(39,153,137)' }}>Edit My Farm Details</Text>

                    </View>
                </TouchableOpacity>

                <View style={{ width: 1, marginLeft: 15, marginRight: 7, marginTop: 26, height: 47, backgroundColor: 'rgb(221,221,221)' }} />

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>BREAKEVEN PRICE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'breakEven')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>

                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>${this.props.Crops.myFarmTiles.breakEvenPrice.value.toFixed(2)}</Text>

                </View>
                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>TARGET PRICE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'targetPrice')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>${this.props.Crops.myFarmTiles.targetPrice.value.toFixed(2)}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 4 }}>AVERAGE PRICE SOLD</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'avgPrice')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={styles.priceStyle}>${this.props.Crops.myFarmTiles.averagePriceSold.value.toFixed(2)}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7, paddingTop: 10 }}>PROFIT PER ACRE</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'profitPerAcre')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={[styles.priceStyle, { paddingTop: 6 }]}>${this.props.Crops.myFarmTiles.profitPerAcre.value}</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 100 }}><Text style={{ fontSize: 10, paddingLeft: 7 }}>UNHEDGED PRODUCTION</Text></View>
                        <TouchableOpacity onPress={this.infoButton.bind(this, 'unhedged')}><Image style={{ width: 18, height: 18, marginTop: 4 }} source={Info} /></TouchableOpacity>
                    </View>
                    <Text style={styles.priceStyle}>{this.props.Crops.myFarmTiles.unhedgedProduction.value.toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    <Text style={{ paddingLeft: 10, fontSize: 10, color: 'rgb(61,76,87)' }}>{this.props.Crops.activeCommodity.unit}s</Text>
                </View>

                <View style={styles.boxStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: 80 }}><Text style={{ fontSize: 10, paddingLeft: 7 }}>BASIS ESTIMATE</Text></View>
                        <View style={{ width: 37, marginTop: 4, justifyContent: 'center', alignItems: 'center', height: 18,borderWidth: 0.5,borderColor: 'rgb(39,153,137)' }}><Text style={{ color: 'rgb(39,153,137)' }}>Edit</Text></View>
                    </View>
                    <Text style={[styles.priceStyle, { color: 'rgb(158,42,47)' }]}>${this.props.Crops.myFarmTiles.basisEstimate.value.toFixed(2)}</Text>
                    <Text style={{ paddingLeft: 10, fontSize: 8, color: 'rgb(61,76,87)' }}>Not included in Calculations</Text>
                </View>
                {this.props.infoState.infoEnable ? this.showMessage(this.props.infoState.btnNumber) : this.hideMessage()}
            </View>
        );
    }
}
const styles = {
    firstRowStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgb(255,255,255)',
        height: 98,
        width: 992,
        marginHorizontal: 16,
        marginTop: 14,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1,
        position: 'absolute',
        zIndex: 1
    },
    boxStyle: {
        width: 134,
        height: 68,
        backgroundColor: 'rgb(239,244,247)',
        marginRight: 6,
        marginTop: 15
    },
    enterCropButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 160,
        backgroundColor: 'rgb(39,153,137)',
        marginTop: 30,
        marginLeft: 40,
        borderRadius: 5
    },
    priceStyle: {
        fontSize: 26,
        color: 'rgb(61,76,87)',
        paddingLeft: 10,
        fontFamily: 'HelveticaNeue-Medium',
        opacity: 93
    },
    messageContainer: { position: 'absolute', marginTop: 75, left: 0 },
    triangle: { 
        width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#ddd', borderLeftWidth: 8, borderRightWidth: 8, borderBottomWidth: 16, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd'
    },
    messageBox: { width: 260, borderColor: '#ddd', borderWidth: 2, backgroundColor: '#fff', borderRadius: 3 }, 
    messageBoxText: { 
        fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 15, paddingTop: 0, paddingRight: 15, paddingBottom: 15 
    }    
};

const mapStateToProps = state => {
    return {
        Crops: state.dashBoardButtons,
        cropBut: state.cropsButtons,
        myf: state.myFar,
        infoState: state.info
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
