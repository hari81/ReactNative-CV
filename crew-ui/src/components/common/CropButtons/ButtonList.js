import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { myFarmCropValues, myFarmTradeSalesOutSideApp
} from '../../../redux/actions/MyFarm/CropAction';
import { firstButton, secondButton,
    thirdButton, fourthButton, fifthButton, sixthButton, seventh, eighth
} from '../../../redux/actions/Dashboard/DashBoardButtonsAction';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import { selectId } from '../../../redux/actions/CropButtons/ButtonAction';

class ButtonList extends Component {

    buttonPress(year, code, id) {
        this.props.quoteSwapUnderlying(year, code);
        //contractMonthAction
        // this.props.quoteSwapUnderlying(year,code);
        //LIVE DATA FETCH... No need of switch statement.. Only one fetch...
        //this.props.buttonDataFetch(`${this.props.item.cropYear}`, `${this.props.item.commodity.code}`)
        //console.log(id)
        this.props.selectId(id);
        //this.props.buttonDataFetch(`${this.props.item.cropYear}`, `${this.props.item.commodity.code}`);

        //DashboardAction
        const cropAndYear = `${year}${code}`;
        switch (cropAndYear) {
            case '2019S':
                this.props.eighth();
                break;
            case '2017C':
                this.props.thirdButton();
                break;
            case '2017S':
                this.props.fourthButton();
                break;
            case '2018C':
                this.props.fifthButton();
                break;
            case '2018S':
                this.props.sixthButton();
                break;
            default:
                this.props.seventh();
        }
        //myFarmAction
        this.props.myFarmCropValues(code, year);
        this.props.myFarmTradeSalesOutSideApp(code, year);
    }
    render() {
        const { id, cropYear, code, name } = this.props.item;
        return (<View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <TouchableOpacity onPress={this.buttonPress.bind(this, cropYear, code, id, name)} disabled={id === this.props.id}>
                <View style={[styles.ButtonStyle, id === this.props.id ? { backgroundColor: 'rgb(39,153,137)' } : { backgroundColor: 'rgb(255,255,255)' }]}>
                    <Text style={id === this.props.id ? styles.activeYearTextStyle : styles.inactiveYearTextStyle}>{cropYear}</Text>
                    <Text style={id === this.props.id ? styles.activeCommodityTextStyle : styles.inactiveCommodityTextStyle}>{name.toUpperCase()}</Text>
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
        id: state.cropsButtons.selectedId
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ secondButton,
        firstButton,
        thirdButton,
        fourthButton,
        fifthButton,
        sixthButton,
        seventh,
        eighth,
        selectId,
        myFarmCropValues,
        myFarmTradeSalesOutSideApp,
        quoteSwapUnderlying
    }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ButtonList);
