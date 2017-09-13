import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { myFarmCropValues, myFarmTradeSalesOutSideApp
} from '../../../redux/actions/MyFarm/CropAction';
import { firstButton, secondButton,
    thirdButton, fourthButton, fifthButton, sixthButton, seventh, eighth
} from '../../../redux/actions/Dashboard/DashBoardButtonsAction';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import { selectId } from '../../../redux/actions/CropButtons/ButtonAction'
class ButtonList extends Component {

    buttonPress(year, code, id, name) {
        this.props.quoteSwapUnderlying(year,code);
        //contractMonthAction
        // this.props.quoteSwapUnderlying(year,code);
        //LIVE DATA FETCH... No need of switch statement.. Only one fetch...
        //this.props.buttonDataFetch(`${this.props.item.cropYear}`, `${this.props.item.commodity.code}`)
        //console.log(id)
        this.props.selectId(id);
        //this.props.buttonDataFetch(`${this.props.item.cropYear}`, `${this.props.item.commodity.code}`);

        //DashboardAction
        const cropAndYear = `${year}${code}`
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
        // const cropNameAndYear = `${name.toUpperCase()} ${year}`;
        this.props.myFarmCropValues(code, year);
        this.props.myFarmTradeSalesOutSideApp(code, year);
    }
    render() {
        const { id, cropYear, code, name } = this.props.item;
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.buttonPress.bind(this, cropYear, code, id, name)} disabled={id === this.props.id}>
                    <View style={[styles.ButtonStyle, id === this.props.id ? { backgroundColor: 'rgb(39,153,137)' } : { backgroundColor: 'rgb(255,255,255)' }]}>
                        <Text
                            style={id === this.props.id ? { color: 'white', fontSize: 16 } : {
                                color: 'rgb(82,97,115)',
                                fontSize: 16
                            }}>{cropYear}</Text>
                        <Text
                            style={id === this.props.id ? { color: 'white', fontSize: 24 } : {
                                color: 'rgb(82,97,115)',
                                fontFamily: 'HelveticaNeue',
                                fontSize: 24
                            }}>{name.toUpperCase()}</Text>
                        <Text style={id === this.props.id ? { color: 'white', fontSize: 14 } : {
                            color: 'rgb(159,169,186)',
                            fontSize: 14
                        }}>Crop</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}
const styles = {
    ButtonStyle: {
        width: 156,
        height: 78,
        borderRadius: 3,
        justifyContent: 'center',
        marginLeft: 4,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    }
}
const mapStateToProps = state => {
    return {
        id: state.cropsButtons.selectedId

    };
}
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ secondButton, firstButton, thirdButton, fourthButton,
        fifthButton, sixthButton, seventh, eighth,selectId,myFarmCropValues,myFarmTradeSalesOutSideApp,quoteSwapUnderlying}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(ButtonList);