import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import * as common from '../../../Utils/common';
import { InfoPopup } from '../../common';
import Info from '../../common/img/Info-white.png';
//import bugsnag from '../common/BugSnag';

import DisclaimerData from '../../../restAPI/disclaimer.json';

class ReviewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPriceDetails: null
        };
    }
    hidePriceInfo() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ showPriceDetails: popup });
    }
    render() {
        const { orderType, expirationDate, underlying, quantity } = this.props.sug.suggestedQuote.metadata;
        const quantityDouble = 2 * Number(common.cleanNumericString(quantity));
        const { strike, price, bonusPrice, accrualStartDate } = this.props.sug.suggestedQuote;
        const cropName = this.props.cropBut.selectedCropName;
        const cropYear = this.props.cropBut.selectedId.slice(-4);
        const uom = this.props.acc.filter(item => item.name === cropName);
        return (
            <View style={styles.quoteFields}>
                <View style={{flex: 1}}>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Crop</Text>
                        <Text
                            style={styles.quoteData}>{cropName} {cropYear}</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Product</Text>
                        <Text style={styles.quoteData}>{this.props.riskProduct.name}</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Trade direction</Text>
                        <Text style={styles.quoteData}>Buy</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Contract Month</Text>
                        <Text
                            style={styles.quoteData}>{common.createUnderlyingObject(underlying).underlyingMonthDesc} {underlying.slice(-4)}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Quantity</Text>
                        <Text
                            style={styles.quoteData}>{common.formatNumberCommas(quantity)} {uom[0].unitOfMeasure}s</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Floor Price
                        </Text>
                        <Text
                            style={styles.quoteData}>${this.props.custom === 'customize' ? this.props.sug.suggestedQuote.metadata.strike : strike}</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Bonus Price</Text>
                        <Text
                            style={styles.quoteData}>${this.props.custom === 'customize' ? this.props.sug.suggestedQuote.metadata.bonusPrice === undefined ? bonusPrice : this.props.sug.suggestedQuote.metadata.bonusPrice : bonusPrice}
                        </Text>
                    </View>
                    <View style={styles.quoteField}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.quoteLabel}>Price</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('this is press event');
                                    this.setState({ showPriceDetails:
                                        (<InfoPopup popupInfo={termsInfo} onClose={this.hidePriceInfo.bind(this)} />)
                                    })}}
                            >
                                <Image style={{ width: 20, height: 20, marginLeft: 20, marginTop: 1 }}
                                       source={Info}/>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={styles.quoteData}>${this.props.level === 'zero' ? '0.00' : price.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Pricing Period</Text>
                        <Text
                            style={styles.quoteData}>{'TODAY'} to
                        </Text>
                        <Text
                            style={styles.quoteData}>{common.formatDate(expirationDate, 5)}
                        </Text>
                    </View>

                </View>
                <View style={{flex: 1}}>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Contingent Offer Quantity</Text>
                        <Text
                            style={styles.quoteData}>{common.formatNumberCommas(quantity)} {uom[0].unitOfMeasure}s</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Contingent Offer Price</Text>
                        <Text
                            style={styles.quoteData}>${this.props.custom === 'customize' ? this.props.sug.suggestedQuote.metadata.bonusPrice === undefined ? bonusPrice : this.props.sug.suggestedQuote.metadata.bonusPrice : bonusPrice}</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>You May Price Up to</Text>
                        <Text
                            style={styles.quoteData}>{common.formatNumberCommas(quantityDouble)} {uom[0].unitOfMeasure}s</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Order Type</Text>
                        <Text
                            style={styles.quoteData}>{common.capitalizeWord(orderType)}</Text>
                    </View>
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Order will be valid until</Text>
                        <Text
                            style={styles.quoteData}>{common.formatDate(expirationDate, 5)}</Text>
                    </View>

                </View>
                {this.state.showPriceDetails}
            </View>);
    }
}

const { width, height } = Dimensions.get('window');
const termsInfo = { top: 180, left: 50, width: 450, arrowPosition: 'side', message: DisclaimerData.disclosures[1].disclosure };
const styles = StyleSheet.create({
    /* container */
    reviewMain: { height: height - 100, backgroundColor: '#eff4f7' },
    reviewContainer: { height: height - 240, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, padding: 15, paddingBottom: 50 },
    reviewTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 32, color: '#fff', marginRight: 100, marginBottom: 15 },

    /* quote fields */
    quoteContainer: { height: height - 360, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, padding: 20, paddingLeft: 120, paddingRight: 120 },
    quoteFields: { flexDirection: 'row', flex: 1, marginTop: 20, marginLeft: 20 },
    quoteField: { marginBottom: 10 },
    quoteLabel: { fontFamily: 'Helveticaneue-Light', color: 'white', fontSize: 16 },
    quoteData: { color: 'white', fontSize: 20 },
    quoteMarketContainer: { backgroundColor: '#ebf9f9', borderRadius: 3, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center' },


    /* small page header */
    backHeader: { backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bed8dd', borderTopColor: '#e7b514', borderTopWidth: 4, marginTop: 20, marginLeft: 15, marginRight: 15 },
    headerTextBox: { marginTop: 10, marginBottom: 10, borderRightColor: '#e6eaee', borderRightWidth: 2 },
    headerText: { fontFamily: 'HelveticaNeue-Medium', color: '#007681', fontSize: 20, paddingLeft: 10, paddingRight: 10 }
});

const mapStateToProps = (state) => {
    return { riskProduct: state.products.find(item => item.id === 110),
        sug: state.optimalQuote,
        acc: state.account.defaultAccount.commodities,
        cropBut: state.cropsButtons
    };
};

export default connect(mapStateToProps, null)(ReviewOrder);