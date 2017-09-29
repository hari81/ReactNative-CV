import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { myFarmCropValues, myFarmTradeSalesOutSideApp } from '../../../redux/actions/MyFarm/CropAction';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import { selectId, selectedCropName } from '../../../redux/actions/CropButtons/ButtonAction';
import { dashBoardDataFetch } from '../../../redux/actions/Dashboard/DashboardAction';

class ButtonList extends Component {
    buttonPress(year, code, id, name) {
        //Dashboard data fetch
        this.props.dashBoardDataFetch(`${year}`, `${code}`);
        // buttonsSelection
        this.props.selectId(id);
        this.props.selectedCropName(name);
        //myFarmAction
        // place order contract month data
        this.props.quoteSwapUnderlying(year, code);

        this.props.myFarmCropValues(code, year);
        this.props.myFarmTradeSalesOutSideApp(code, year);
    }
    render() {
        const { id, cropYear, code, name } = this.props.item;
        return (<View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <TouchableOpacity onPress={this.buttonPress.bind(this, cropYear, code, id, name)} disabled={id === this.props.id}>

                <View style={[styles.ButtonStyle, id === this.props.id ? { backgroundColor: 'rgb(39,153,137)' } : { backgroundColor: 'rgb(255,255,255)' }]}
                >
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
        </View>);
    }
}
const styles = {
   ButtonStyle: {
        width: 156,
        height: 78,
        borderRadius: 3,
        justifyContent: 'center',
        paddingTop: 3,
        marginLeft: 4,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activeYearTextStyle: { fontSize: 16, color: '#fff' },
    inactiveYearTextStyle: { fontSize: 16, color: '#526173' },
    activeCommodityTextStyle: { color: '#fff', fontSize: 21, maxWidth: 130, textAlign: 'center' },
    inactiveCommodityTextStyle: { color: '#526173', fontFamily: 'HelveticaNeue', fontSize: 21, maxWidth: 130, textAlign: 'center' },
    /* currently not used
    activeCropTextStyle: { color: '#fff', fontSize: 14 },
    inactiveCropTextStyle: { color: '#9fa9ba', fontSize: 14 }
    */
};
const mapStateToProps = state => {
    return {
        id: state.cropsButtons.selectedId,
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectId,
        selectedCropName,
        myFarmCropValues,
        myFarmTradeSalesOutSideApp,
        quoteSwapUnderlying,
        dashBoardDataFetch,
    }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ButtonList);
