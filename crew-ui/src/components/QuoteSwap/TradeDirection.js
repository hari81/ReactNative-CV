import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as commonStyles from '../../Utils/styles';
import bugsnag from '../../components/common/BugSnag';

class TradeDirection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuy: false
        };
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
        try {
            return (
                <View style={{zIndex: -1}}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff'}}>TRADE DIRECTION</Text>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                {/* sell */}
                                <TouchableOpacity onPress={this.onSellSelection.bind(this)}>
                                    <View style={commonStyles.common.radioButtonContainer}>
                                        {!this.state.isBuy ?
                                            <View style={commonStyles.common.radioButtonSelected}/> : null}
                                    </View>
                                </TouchableOpacity>
                                <Text style={commonStyles.common.radioButtonText}>Sell</Text>
                                {/* buy */}
                                <TouchableOpacity disabled onPress={this.onBuySelection.bind(this)}>
                                    <View style={[commonStyles.common.radioButtonContainerDisabled, {marginLeft: 45}]}>
                                        {this.state.isBuy ?
                                            <View style={commonStyles.common.radioButtonSelected}/> : null}
                                    </View>
                                </TouchableOpacity>
                                <Text style={commonStyles.common.radioButtonTextDisabled}>Buy</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const styles = {
    container: { flexDirection: 'column', marginTop: 10, zIndex: -1 },
};

const mapStateToProps = (state) => {
    return {
        selectedProduct: state.selectedProductQuoteSwap
    };
};

export default connect(mapStateToProps, null)(TradeDirection);
