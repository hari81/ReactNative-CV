import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImageButton from '../../common/ImageButton';
import CustomizePrice from './CustomizePrice';
import st from '../../../Utils/SafeTraverse';
import * as common from '../../../Utils/common';

const { height, width } = Dimensions.get('window');
class CustomizeOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusPrice: props.bPrice,
            eProfitStart: props.eProfitStart_S === '' ? '' : props.eProfitStart_S,
            eProfitEnd: props.eProfitEnd_S === '' ? '' : props.eProfitEnd_S
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.eProfitStart !== nextProps.eProfitStart_C || this.state.eProfitEnd !== nextProps.eProfitEnd_C) {
            this.setState({ eProfitStart: nextProps.eProfitStart_C, eProfitEnd: nextProps.eProfitEnd_C });
        }
    }
    onPriceChange(price) {
        this.setState({ bonusPrice: price });
    }

    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.popTo('suggestedQuote');
                break;
            default:
        }
    }
    render() {
        let risk110Name = null;
        if (common.isValueExists(this.props.products)) {
            const risk110 = this.props.products.find(x => x.id === 110);
            if (common.isValueExists(risk110)) {
                risk110Name = risk110.name;
            }
        }
        const addQuant = this.props.quantity;
        const priceUpTo = common.formatNumberCommas(2 * common.cleanNumericString(this.props.quantity));
        const { underlying } = this.props.sug.suggestedQuote.metadata;
        const { cflag } = this.props;
        console.log('flag', this.props);
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>Use the + and - buttons to customize your levels</Text></View>
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
                                {common.createUnderlyingObject(underlying).underlyingMonthDesc} {underlying.slice(-4)}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 6 }}>
                            <Text style={styles.pHeader}>Current Market Price</Text>
                            <Text style={styles.pBody}>${this.props.cPrice}</Text>
                            <Text style={styles.pHeader}>Contingent Offer Price</Text>
                            <Text style={styles.pBody}>${this.state.bonusPrice}</Text>
                            <Text style={styles.pHeader}>Contingent Offer Quantity</Text>
                            <Text style={styles.pBody}>{common.formatNumberCommas(addQuant)} {this.props.defaultAccountData.commodities[0].unitOfMeasure + 's'}</Text>
                            <Text style={styles.pHeader}>You May Price Up To</Text>
                            <Text style={styles.pBody}>{priceUpTo} {this.props.defaultAccountData.commodities[0].unitOfMeasure + 's'}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, marginLeft: 14 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(230,180,19)' }}>ESTIMATED PROFIT</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{ `$${parseFloat(this.state.eProfitStart).toFixed(2)} to $${parseFloat(this.state.eProfitEnd).toFixed(2)}/acre`}</Text>
                    </View>
                </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: width * 0.62, marginTop: 20 }}>
                    <ImageButton text='BACK' onPress={this.nextScreens.bind(this, 1)} />
                    <ImageButton text='NEXT' inactive='true' />
                </View>

                <CustomizePrice
                    onPriceChange={this.onPriceChange.bind(this)}
                    fPrice={this.props.fPrice}
                    bPrice={this.props.bPrice}
                    price={this.props.price}
                />

            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: 'rgb(61,76,87)', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)' },
    subViewStyle: { marginLeft: width * 0.02, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 30, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    productDetailsView: { height: height * 0.380, width: width * 0.329, borderRadius: 4, backgroundColor: 'rgba(224,242,243, 0.1)', marginLeft: width * 0.01, marginTop: 41 },
    pDetails: { fontSize: 24, paddingLeft: 14, paddingTop: 6, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' },
    pHeader: { fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 },
    pBody: { fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }
};
const mapStateToProps = (state) => {
    return {
        sug: state.optimalQuote,
        defaultAccountData: state.account.defaultAccount,
        cropButton: state.cropsButtons,
        products: state.products,
        eProfitStart_S: common.isValueExists(state.eProfit.estProfitStart_S) ? state.eProfit.estProfitStart_S : 0,
        eProfitEnd_S: common.isValueExists(state.eProfit.estProfitEnd_S) ? state.eProfit.estProfitEnd_S : 0,
        eProfitStart_C: common.isValueExists(state.eProfit.estProfitStart_C) ? state.eProfit.estProfitStart_C : 0,
        eProfitEnd_C: common.isValueExists(state.eProfit.estProfitEnd_C) ? state.eProfit.estProfitEnd_C : 0,
        underlyingData: common.isValueExists(state.dashBoardData.Data.actionBar.todayPrice.symbol) ? common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol) : 0,
        cPrice: common.isValueExists(state.optimalQuote.suggestedQuote.underlyingPrice) ? parseFloat(state.optimalQuote.suggestedQuote.underlyingPrice).toFixed(4) : '  -',
    };
};

export default connect(mapStateToProps, null)(CustomizeOrder);
