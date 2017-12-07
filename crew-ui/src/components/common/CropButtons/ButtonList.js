import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { myFarmCropValues, myFarmTradeSalesOutSideApp } from '../../../redux/actions/MyFarm/CropAction';
import { selectId, selectedCropName } from '../../../redux/actions/CropButtons/ButtonAction';
import { ViewOrdersData } from '../../../redux/actions/OrdersAction/ViewOrderAction';
import { OpenPositionsData } from '../../../redux/actions/OrdersAction/OpenPositions';
import { ClosedPositionsData } from '../../../redux/actions/OrdersAction/ClosedPositions';
import bugsnag from '../BugSnag';
import { dashBoardDataFetch } from '../../../redux/actions/Dashboard/DashboardAction';

class ButtonList extends Component {
    buttonPress(year, code, id, name) {
        //disable the button press when buttons are not clear
        if (this.props.vision === 'notclear') {
            return;
        }
        //Dashboard data fetch
        this.props.dashBoardDataFetch(year, code);
        this.props.onQuoteSwapUnderlying(year, code);
        //Positions & Orders
        switch (this.props.tab) {
            case 'Open Orders':
                this.props.ViewOrdersData(code, year);
                break;
            case 'Open Positions':
                this.props.OpenPositionsData(code, year);
                break;
            case 'Closed Positions':
                this.props.ClosedPositionsData(code, year);
                break;
            default:
        }
        //myFarmAction
        if (!this.props.far.farmFlag) {
            this.props.myFarmCropValues(code, year);
            this.props.myFarmTradeSalesOutSideApp(code, year);
            // buttonsSelection
            this.props.selectedCropName(name);
            this.props.selectId(id);
        } else {
            const val = this.props.userflag();
            if (!val) {
                this.props.myFarmCropValues(code, year);
                this.props.myFarmTradeSalesOutSideApp(code, year);
                this.props.selectId(id);
                this.props.selectedCropName(name);
            } else {
                Alert.alert(
                    'My Farm Data',
                    'Please CANCEL or SAVE your changes prior to proceeding to the next screen.',
                    [
                        { text: 'GOT IT!', style: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        }
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const { id, cropYear, code, name } = this.props.item;
            return (/*<View style={{ flexDirection: 'row', marginLeft: 10, backgroundColor: 'rgba(120,20,20, .65)'}}>*/
                <TouchableOpacity onPress={this.buttonPress.bind(this, cropYear, code, id, name)} disabled={id === this.props.id}>
                <View style={[styles.ButtonStyle, id === this.props.id ? { backgroundColor: 'rgb(39,153,137)' } : { backgroundColor: 'rgb(255,255,255)' }]}>
                    <Text
                        style={id === this.props.id ? { color: 'white', fontSize: 16 } : {
                            color: 'rgb(82,97,115)',
                            fontSize: 16 }}
                    >
                        {cropYear}</Text>
                    <Text
                        style={[{ color: 'rgb(82,97,115)', fontFamily: 'HelveticaNeue', fontSize: 24 },
                            id === this.props.id ? { color: 'white' } : {}, name.length >= 10 && name.length <= 13 ? { fontSize: 20 } :
                            name.length >= 14 && name.length < 20 ? { fontSize: 14 } : name.length >= 20 ? { fontSize: 12 } : { }]}
                    >{name.toUpperCase()}</Text>
                    <Text
                        style={id === this.props.id ? { color: 'white', fontSize: 14 } : {
                            color: 'rgb(159,169,186)',
                            fontSize: 14
                        }}
                    >Crop</Text>
                </View>
            </TouchableOpacity>
       /* </View> */);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const styles = {
   ButtonStyle: {
        width: 156,
        height: 78,
        borderRadius: 3,
        justifyContent: 'center',
        paddingTop: 3,
        marginLeft: 12,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activeYearTextStyle: { fontSize: 16, color: '#fff' },
    inactiveYearTextStyle: { fontSize: 16, color: '#526173' },
    activeCommodityTextStyle: { color: '#fff', fontSize: 21, maxWidth: 130, textAlign: 'center' },
    inactiveCommodityTextStyle: { color: '#526173', fontFamily: 'HelveticaNeue', fontSize: 21, maxWidth: 130, textAlign: 'center' },
};
const mapStateToProps = state => {
    return {
        id: state.cropsButtons.selectedId,
        far: state.myFar,
        acc: state.account,
        tab: state.vieworder.selectedSegmentTab
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectId,
        selectedCropName,
        myFarmCropValues,
        myFarmTradeSalesOutSideApp,
        dashBoardDataFetch,
        ViewOrdersData,
        OpenPositionsData,
        ClosedPositionsData
    }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ButtonList);
