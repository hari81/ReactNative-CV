import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firstButton, secondButton,
    thirdButton, fourthButton, fifthButton, sixthButton
} from '../../../redux/actions/Dashboard/DashBoardButtonsAction';
//import { selectId } from '../../../redux/actions/Dashboard/SelectCropId';
import { selectId } from '../../../redux/actions/CropButtons/ButtonAction';
import ButtonList from './ButtonList';
import { myFarmCropValues, myFarmTradeSalesOutSideApp
} from '../../../redux/actions/MyFarm/CropAction';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
class MyCropButton extends Component {
    onButtonPress(year, code, id, name) {
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
            case '2016S':
                this.props.secondButton();
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
                this.props.firstButton();
        }
        //myFarmAction
       // const cropNameAndYear = `${name.toUpperCase()} ${year}`;
        this.props.myFarmCropValues(code, year);
        this.props.myFarmTradeSalesOutSideApp(code, year);

    }
    render() {
        return (

            <View style={styles.fourthRowStyle}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft:20 }}>
                        <Text style={{ color: 'rgb(255,255,255)', height:18, alignSelf:'stretch', fontFamily:'HelveticaNeue', fontSize: 16, }}>MY CROPS</Text>
                        <View style={{ height: 1,marginLeft:22,marginTop: 9, width: 868, backgroundColor: 'rgb(245,131,51)' }}/>
                    </View>
                </View>
                <FlatList
                    horizontal
                    data={this.props.Crops}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ButtonList item={item} ButtonPresss={this.onButtonPress.bind(this)} key={item.id}/>}
                />
            </View>



        );
    }
}
const styles = {
    fourthRowStyle: {
        flexDirection: 'column',
        height: 126,
        width:1024,
        backgroundColor:'rgb(61,76,81)'
    },
};
const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons,
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ secondButton, firstButton, thirdButton, fourthButton,
        fifthButton, sixthButton,selectId,myFarmCropValues,myFarmTradeSalesOutSideApp,quoteSwapUnderlying}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MyCropButton);
