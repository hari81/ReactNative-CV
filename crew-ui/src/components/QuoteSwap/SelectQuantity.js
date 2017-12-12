import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ImageButton } from '../common';
import { optimalSuggestedQuote } from '../../redux/actions/QuoteSwap/SuggestedQuote';
import * as common from '../../Utils/common';
import st from '../../Utils/SafeTraverse';

const { height, width } = Dimensions.get('window');
class SelectQuantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.parentState.quantity.toString(),
            qPercent: this.calculateHedgePercent(0),
            price: '',
            cMonth: props.parentState.cMonth,
            cYear: props.parentState.cYear,
            strike: props.parentState.mPrice === null ? '-  ' : parseFloat(props.parentState.mPrice).toFixed(4),
            underlying: props.parentState.underlying,
            expirationDate: props.parentState.lastTradeDate
        };
        this.timer = null;
    }

    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.selectContractMonth();
                break;
            case 2:
                try {
                    if (this.state.quantity === '' || parseFloat(this.state.quantity) < 1) {
                        Alert.alert('Product Details', 'A quantity of 1 or greater must be entered.');
                    } else {
                        const cropYear = this.props.cropButton.selectedCropName + ' ' + this.props.underlyingData.underlyingYear;
                        this.props.optimalSuggestedQuote(1, this.state, cropYear);
                    }
                } catch (error) {
                    Alert.alert(`Unexpected error occurred: ${error}`);
                }
                break;
            default:
        }
    }

    onFocusMake =() => {
        this.setState({ quantity: this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') });
    };
    onBlurMake = () => {
        const sq = common.formatNumberCommas(this.state.quantity);
        this.setState({ quantity: sq });
        this.props.onQuantityChange(sq);
    };

    onChangeQuantity(text) {
        if (/[0-9]+$/.test(text) || text === '') {
            if (text <= (this.props.quantityLimit / 2)) {
                this.setState({ quantity: text });
            } else {
                Alert.alert(' ', 'Your Available Limit is ' + common.formatNumberCommas(this.props.quantityLimit)+ ' '+ this.props.defaultAccountData.commodities[0].unitOfMeasure + 's.' + '\n\nPlease contact CRM @ 1-952-742-7414 \nor\nemail: cargillpricehedge@cargill.com \nto request a limit increase.');
                this.setState({ quantity: (this.props.quantityLimit / 2).toString() });
            }
            const qp = this.calculateHedgePercent(text);
            this.setState({ qPercent: qp });
        }
        this.props.onQuantityChange(text);
    }
    minusButtonPress = () => {
        try {
            let q = common.convertStringToInt(this.state.quantity);
            if (q < 1) {
                q = 0;
            }
            if (q >= parseInt(this.props.quantityIncrement)) {
                q -= parseInt(this.props.quantityIncrement);
                const qp = this.calculateHedgePercent(q);
                this.setState({ qPercent: qp });
                //convert to string before setting state (but bubble non-formatted string up)
                const sq = common.formatNumberCommas(q);
                this.setState({ quantity: sq.toString() });
                this.props.onQuantityChange(sq);
                this.timer = setTimeout(this.minusButtonPress, 100);
            }
        } catch (error) {
            console.log(error);
        }
    }

    plusButtonPress = () => {
        try {
            let q = common.convertStringToInt(this.state.quantity);
            if (q < 1) {
                q = 0;
            }
            if (q <= ((this.props.quantityLimit / 2) - parseInt(this.props.quantityIncrement)) || q === 0) {
                q += parseInt(this.props.quantityIncrement);
                this.timer = setTimeout(this.plusButtonPress, 100);
            } else {
                Alert.alert(' ', 'Your Available Limit is ' + common.formatNumberCommas(this.props.quantityLimit)+ ' '+ this.props.defaultAccountData.commodities[0].unitOfMeasure + 's.' + '\n\nPlease contact CRM @ 1-952-742-7414 \nor\nemail: cargillpricehedge@cargill.com \nto request a limit increase.');
                q = parseInt((this.props.quantityLimit / 2).toString());
            }
            const qp = this.calculateHedgePercent(q);
            this.setState({ qPercent: qp });
            //convert to string before setting state (but bubble non-formatted string up)
            const sq = common.formatNumberCommas(q);
            this.setState({ quantity: sq });
            this.props.onQuantityChange(sq);
        } catch (error) {
            console.log(error);
        }
    }

    calculateHedgePercent(currQuantity) {
        let qp = 0;
        if (this.props.myFarmProd !== null && common.isValueExists(this.props.myFarmProd.estimatedTotalProduction)) {
            const qty = currQuantity === '' ? 0 : parseFloat(currQuantity);
            if (this.props.parentState.buySell.toLowerCase() === 'b' || this.props.parentState.buySell.toLowerCase() === 'buy') {
                qp = ((this.props.myFarmProd.estimatedTotalProduction - this.props.myFarmProd.unhedgedProduction.totalQuantity - qty) / this.props.myFarmProd.estimatedTotalProduction) * 100;
            } else {
                qp = ((this.props.myFarmProd.estimatedTotalProduction - this.props.myFarmProd.unhedgedProduction.totalQuantity + qty) / this.props.myFarmProd.estimatedTotalProduction) * 100;
            }
        }
        return qp;
    }
    stopTimer() {
        clearTimeout(this.timer);
    }
    render() {
        const priceUpTo = common.isValueExists(this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) ? common.formatNumberCommas(2 * parseInt(this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'))) : '    -';
        const addQuant = common.isValueExists(this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) ? common.formatNumberCommas(parseInt(this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'))) : '    -';
        let risk110Name = null;
        if (common.isValueExists(this.props.products)) {
            const risk110 = this.props.products.find(x => x.id === 110);
            if (common.isValueExists(risk110)) {
                risk110Name = risk110.name;
            }
        }
        let tBushelLimit = null;
        tBushelLimit = (<Text style={styles.bushelLimitText}>Your Available Limit
            is {common.formatNumberCommas(this.props.quantityLimit)} {this.props.defaultAccountData.commodities[0].unitOfMeasure}s</Text>);
        return (
            <View style={styles.container}>
                <View style={{ width: width * 0.61 }}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>What quantity do you want to hedge today?</Text></View>
                <View style={{ flexDirection: 'row', marginTop: height * 0.03, marginLeft: width * 0.04 }}>
                    <TouchableOpacity onPressIn={this.minusButtonPress} onPressOut={this.stopTimer.bind(this)}>
                        <Text style={[styles.updownIcon, { marginTop: 3, marginRight: 15 }]}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={{ textAlign: 'center', height: height * 0.064, width: width * 0.16, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', padding: 2 }}
                        maxLength={12}
                        placeholder='0'
                        keyboardType="decimal-pad"
                        value={this.state.quantity}
                        onFocus={this.onFocusMake}
                        onBlur={this.onBlurMake}
                        onChangeText={this.onChangeQuantity.bind(this)}
                        returnKeyType="done"
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                                Keyboard.dismiss();
                            }
                        }}
                    />
                    <TouchableOpacity onPressIn={this.plusButtonPress} onPressOut={this.stopTimer.bind(this)}>
                        <Text style={[styles.updownIcon, { marginTop: 3, marginLeft: 15, paddingLeft: 13 }]}>+</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: '#fff' }}>{this.state.qPercent.toFixed(0)}% </Text>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff' }}>HEDGED</Text>
                        </View>
                        {tBushelLimit}
                    </View>
                </View>
                </View>
                <View style={{ marginLeft: width * 0.01, marginTop: height * 0.05 }}>
                <View style={styles.productDetailsView}>
                    <Text style={styles.pDetails}>Product Details</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 14, marginTop: 6, width: 150 }}>
                            <Text style={styles.pHeader}>Crop</Text>
                            <Text style={styles.pBody}>{this.props.cropButton.selectedCropName} {this.props.cropButton.selectedId.slice(-4)}</Text>
                            <Text style={styles.pHeader}>Product</Text>
                            <Text style={styles.pBody}>{risk110Name}</Text>
                            <Text style={styles.pHeader}>Trade direction</Text>
                            <Text style={styles.pBody}>Buy</Text>
                            <Text style={styles.pHeader}>Contract Month</Text>
                            <Text style={styles.pBody}>
                                {this.state.cMonth} {this.state.cYear}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 6 }}>
                            <Text style={styles.pHeader}>Current Market Price</Text>
                            <Text style={styles.pBody}>$ {this.state.strike}</Text>
                            <Text style={styles.pHeader}>Contingent Offer Quantity</Text>
                            <Text style={styles.pBody}>{addQuant} {this.props.defaultAccountData.commodities[0].unitOfMeasure + 's'}</Text>
                            <Text style={styles.pHeader}>You May Price Up To</Text>
                            <Text style={styles.pBody}>{priceUpTo} {this.props.defaultAccountData.commodities[0].unitOfMeasure + 's'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: height * 0.028 }}>
                    <ImageButton text='BACK' onPress={this.nextScreens.bind(this, 1)} />
                    <ImageButton text='NEXT' onPress={this.nextScreens.bind(this, 2)} id='spin' />
                </View>
                </View>

            </View>
        );
    }
}
const styles = {
    container: { flexDirection: 'row', height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)' },
    subViewStyle: { marginLeft: width * 0.042, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    updownIcon: { fontSize: 36, fontFamily: 'HelveticaNeue-Bold', color: '#fff', width: 48, borderRadius: 24, borderWidth: 2, borderColor: '#fff', paddingLeft: 15 },
    bushelLimitText: { fontSize: 15, fontFamily: 'HelveticaNeue', color: '#e7b514' },
    productDetailsView: { height: height * 0.380, width: width * 0.329, borderRadius: 4, backgroundColor: 'rgba(224,242,243, 0.1)' },
    pDetails: { fontSize: 24, paddingLeft: 14, paddingTop: 6, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' },
    pHeader: { fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 },
    pBody: { fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }
}
const mapStateToProps = state => {
    return {
        cropButton: state.cropsButtons,
        defaultAccountData: state.account.defaultAccount,
        myFarmProd: state.dashBoardData.Data.myFarmProduction,
        products: state.products,
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol)
    };
};

export default connect(mapStateToProps, { optimalSuggestedQuote })(SelectQuantity);
