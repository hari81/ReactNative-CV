import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import normalRadioBTN from '../common/img/Radio-BTN-normal.png';
import selectedRadioBTN from '../common/img/Radio-BTN-selected.png';
import { onChangeName, onChangeId } from '../../redux/actions/QuoteSwap/ProductType/SelectedProduct';

class TradeDirection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuy: false,
            btnBuyStatus: true
        };
    }
    componentWillReceiveProps() {
        this.setState({ btnBuyStatus: false, isBuy: false });
        this.props.onTradeChange('S');
    }

    onSellSelection() {
        this.setState({ isBuy: false });
        this.props.onTradeChange('S');
    }

    onBuySelection() {
        this.setState({ isBuy: true });
        this.props.onTradeChange('B');
    }

    render() {
        return (
            <View style={{ zIndex: -1 }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff' }}>TRADE DIRECTION</Text>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            {/* sell */}
                            <TouchableOpacity onPress={this.onSellSelection.bind(this)}>
                                <View style={styles.radioButtonContainer}>
                                    {!this.state.isBuy ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.radioButtonText}>Sell</Text>
                            {/* buy */}
                            <TouchableOpacity disabled onPress={this.onBuySelection.bind(this)}>
                                <View style={[styles.radioButtonContainerDisabled, { marginLeft: 45 }]}>
                                    {this.state.isBuy ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.radioButtonTextDisabled}>Buy</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = {
    container: { flexDirection: 'column', marginTop: 10, zIndex: -1 },

    radioButtonContainer: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    radioButtonSelected: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#279989' },
    radioButtonText: { color: '#ffffff', fontSize: 16, marginLeft: 5 },
    radioButtonContainerDisabled: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#9ea6b1', backgroundColor: '#ffffff80', alignItems: 'center', justifyContent: 'center' },    
    radioButtonSelectedDisabled: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#376768' },
    radioButtonTextDisabled: { color: '#ffffff60', fontSize: 16, marginLeft: 5 },        
};

const mapStateToProps = (state) => {
    return {
        selectedProduct: state.selectedProductQuoteSwap
    };
};

export default connect(mapStateToProps, { onChangeName, onChangeId })(TradeDirection);
