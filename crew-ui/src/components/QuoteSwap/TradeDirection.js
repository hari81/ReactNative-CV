import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import normalRadioBTN from '../common/img/Radio-BTN-normal.png';
import selectedRadioBTN from '../common/img/Radio-BTN-selected.png';
import ContractMonth from './ContractMonth/ContractMonth';
import { onChangeName, onChangeId } from '../../redux/actions/QuoteSwap/ProductType/SelectedProduct';
class TradeDirection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioBTNEnableSell: true,
            radioBTNEnableBuy: false,
            btnBuyStatus: true
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({ btnBuyStatus: false, radioBTNEnableSell: true, radioBTNEnableBuy: false });
    }
    render() {
        return (
            <View style={{ zIndex: -1 }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>TRADE DIRECTION</Text>
                    <View>
                         <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.setState({ radioBTNEnableSell: true, radioBTNEnableBuy: false })}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableSell ? selectedRadioBTN: normalRadioBTN} /></TouchableOpacity>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)', paddingRight: 45 }}>Sell</Text>
                            <TouchableOpacity disabled={this.props.selectedProduct.productId === 107 || this.state.btnBuyStatus} onPress={() => this.setState({ radioBTNEnableSell: false, radioBTNEnableBuy: true })}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableBuy ? selectedRadioBTN : normalRadioBTN} /></TouchableOpacity>
                            <Text style={this.props.selectedProduct.productId === 107 || this.state.btnBuyStatus ? { fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'gray' } : { fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)' }}>Buy</Text>
                        </View>
                    </View>
                </View>
                <ContractMonth />
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 10,
        zIndex: -1
    }
};
const mapStateToProps = (state) => {
    return {
        selectedProduct: state.selectedProductQuoteSwap
    };
};
export default connect(mapStateToProps, { onChangeName, onChangeId })(TradeDirection);
