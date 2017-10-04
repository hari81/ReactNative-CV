import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../../components/common/Spinner';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';
import * as common from '../../Utils/common';

class BushelQuantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            quantityIncrement: '0',
            qPercent: ((this.props.myFarmProd.estimatedTotalProduction - this.props.myFarmProd.unhedgedProduction.totalQuantity) / this.props.myFarmProd.estimatedTotalProduction) * 100
        };
        this.timer = null;
    }

    componentDidMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)));
        this.setState({ quantityIncrement: crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString() });
    }

    onFocusMake() {
        this.setState({ quantity: this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') });
    }

    onBlurMake() {
        this.setState({ quantity: common.formatNumberCommas(this.state.quantity) });
        this.props.onQuantityChange(this.state.quantity);
    }

    onChangeQuantity(text) {
        if (/[0-9]+$/.test(text) || text === '') {
            if (text <= this.props.quantityLimit) {
                this.setState({ quantity: text });
            } else {
                Alert.alert(`Your Available Limit is ${common.formatNumberCommas(this.props.quantityLimit)} ${this.props.defaultAccountData.commodities[0].unitOfMeasure}s`);
                this.setState({ quantity: this.props.quantityLimit.toString() });
            }
            this.calculateHedgePercent(text);
        }
        this.props.onQuantityChange(text);
    }

    minusButtonPress() {
        try {
            let q = this.state.quantity;
            if (q === '' || parseInt(q) < 1) {
                q = 0;
            }
            if (parseInt(q) >= parseInt(this.state.quantityIncrement)) {
                q = (parseInt(q) - parseInt(this.state.quantityIncrement)).toString();
                this.calculateHedgePercent(q);
                this.setState({ quantity: q });
                this.props.onQuantityChange(q);
            }
            this.timer = setTimeout(this.minusButtonPress, 50);
        } catch (error) {
            console.log(error);
        }
    }

    plusButtonPress() {
        try {
            let q = this.state.quantity;
            if (q === '' || parseInt(q) < 1) {
                q = 0;
            }
            if (parseInt(q) <= (this.props.quantityLimit - parseInt(this.state.quantityIncrement)) || q === '') {
                q = ((parseInt(q) || 0) + parseInt(this.state.quantityIncrement)).toString();
            } else {
                Alert.alert(`Your Available Limit is ${common.formatNumberCommas(this.props.quantityLimit)} ${this.props.defaultAccountData.commodities[0].unitOfMeasure}s`);
                q = parseInt(this.props.quantityLimit.toString());
            }
            this.setState({ quantity: q });
            this.calculateHedgePercent(q);
            this.props.onQuantityChange(q);
            this.timer = setTimeout(this.plusButtonPress, 50);
        } catch (error) {
            console.log(error);
        }
    }

    calculateHedgePercent(currQuantity) {
        const qty = currQuantity === '' ? 0 : parseFloat(currQuantity);
        if (this.props.buySell.toLowerCase() === 'b' || this.props.buySell.toLowerCase() === 'buy') {
            this.setState({ qPercent: ((this.props.myFarmProd.estimatedTotalProduction - this.props.myFarmProd.unhedgedProduction.totalQuantity - qty) / this.props.myFarmProd.estimatedTotalProduction) * 100 });        
        } else {
            this.setState({ qPercent: ((this.props.myFarmProd.estimatedTotalProduction - this.props.myFarmProd.unhedgedProduction.totalQuantity + qty) / this.props.myFarmProd.estimatedTotalProduction) * 100 });
        }
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    render() {
        let tBushelLimit = null;
        if (this.props.contractMonth.bushelSpinFlag) {
            tBushelLimit = (<Spinner size="small" />);
        } else {
            tBushelLimit = (<Text style={styles.bushelLimitText}>Your Available Limit is {common.formatNumberCommas(this.props.quantityLimit)} {this.props.defaultAccountData.commodities[0].unitOfMeasure}s</Text>);
        }

        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>BUSHEL QUANTITY</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPressIn={this.minusButtonPress.bind(this)} onPressOut={this.stopTimer.bind(this)} >
                        <Image style={{ width: 32, height: 32, marginRight: 15, marginTop: 5 }} source={Minus} />
                    </TouchableOpacity>
                    <TextInput
                        style={{ height: 42, width: 112, borderRadius: 4, backgroundColor: '#fff', paddingLeft: 10 }}
                        maxLength={9}
                        keyboardType="decimal-pad"
                        returnKeyType="done"
                        placeholder="0"
                        onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss(); } }}
                        onChangeText={this.onChangeQuantity.bind(this)}
                        value={this.state.quantity}
                        onBlur={this.onBlurMake.bind(this)}
                        onFocus={this.onFocusMake.bind(this)}
                        selectTextOnFocus
                    />
                    <TouchableOpacity onPressIn={this.plusButtonPress.bind(this)} onPressOut={this.stopTimer.bind(this)}>
                        <Image style={{ width: 32, height: 32, marginLeft: 15, marginTop: 5 }} source={Plus} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff' }}>{this.state.qPercent.toFixed(0)}% HEDGED</Text>
                        {tBushelLimit}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: { flexDirection: 'column', marginTop: 16 },
    bushelLimitText: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#e7b514' }
};

const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        contractMonth: state.contractData,
        id: state.cropsButtons.selectedId,
        bushelQuantity: state.selectedContractMonth.bushelQuantity,
        quantityLimit: Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable),
        myFarmProd: state.dashBoardData.Data.myFarmProduction
    };
};

export default connect(mapStateToProps, null)(BushelQuantity);