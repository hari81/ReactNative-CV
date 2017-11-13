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
            bonusPrice: props.bonusPrice,
        };
    }
    onBonusPriceIncrease(price) {
        this.setState({ bonusPrice: price });
    }

    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.pop();
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
        const priceUpTo = common.formatNumberCommas(2 * common.cleanNumericString(this.props.quantity))
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>Use the + and - buttons to customize your levels</Text></View>
                <View style={styles.productDetailsView}>
                    <Text style={{ fontSize: 24, paddingLeft: 14, paddingTop: 6, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Product Details</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 14, marginTop: 6, width: 150 }}>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)' }}>Your Crop is</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{this.props.cropButton.selectedCropName} {this.props.underlyingData.underlyingYear}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>Your Product is a </Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{risk110Name}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>Your trade direction is</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Sell</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>Your product details are</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>
                                {this.props.cMonth} {this.props.cYear}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 6 }}>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)' }}>Current Market Price is</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>${this.props.cPrice}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>Your Additional Qty Price is </Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>${this.state.bonusPrice}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>Your Additional Qty is </Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{addQuant}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'rgb(255,255,255)', paddingTop: 4 }}>You May Price Up To</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{priceUpTo}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, marginLeft: 14 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(230,180,19)' }}>ESTIMATED PROFIT</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>..</Text>
                    </View>
                </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: width * 0.62, marginTop: 20 }}>
                    <ImageButton text='BACK' onPress={this.nextScreens.bind(this, 1)} />
                    <ImageButton text='NEXT' inactive='true' />
                </View>

                <CustomizePrice onBonusPriceIncrease={this.onBonusPriceIncrease.bind(this)} />

            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: 'rgb(61,76,87)', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)' },
    subViewStyle: { marginLeft: width * 0.02, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 30, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    productDetailsView: { height: height * 0.380, width: width * 0.329, borderRadius: 4, backgroundColor: 'rgba(224,242,243, 0.1)', marginLeft: width * 0.01, marginTop: 41 }
}
const mapStateToProps = (state) => {
    return {
        cropButton: state.cropsButtons,
        products: state.products,
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol),
        cPrice: state.optimalQuote.suggestedQuote.underlyingPrice === null ? '  -' : parseFloat(state.optimalQuote.suggestedQuote.underlyingPrice).toFixed(4),
        bonusPrice: state.optimalQuote.suggestedQuote.bonusPrice === null ? '  -' : parseFloat(state.optimalQuote.suggestedQuote.bonusPrice).toFixed(4),
    };
}

export default connect(mapStateToProps, null)(CustomizeOrder);
