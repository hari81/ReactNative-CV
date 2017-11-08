import React from 'react';
import { View, Text } from 'react-native';
//import { connect } from 'react-redux';
import * as common from '../../../Utils/common';

const ProductDetails = ({ marketPrice, additionalQtyPrice, contractMonth, quantity, cropYear }) => {
    const quantityDouble = 2 * Number(common.cleanNumericString(quantity));
    return (
        <View style={styles.ViewStyle}>
            <Text style={styles.productDet}>Product Details</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.textValue}>Your crop is</Text>
                    <Text style={styles.textHeader}>{cropYear}</Text>
                    <Text style={styles.textValue}>Your product is</Text>
                    <Text style={styles.textHeader}>Accrual Trigger</Text>
                    <Text style={styles.textValue}>Your trade direction is</Text>
                    <Text style={styles.textHeader}>Sell</Text>
                    <Text style={styles.textValue}>Your contact month is</Text>
                    <Text style={styles.textHeader}>{contractMonth}</Text>
                </View>

                <View>
                    <Text style={styles.textValue}>Current Market Price is</Text>
                    <Text style={styles.textHeader}>${marketPrice}</Text>
                    <Text style={styles.textValue}>Your Additional Qty Price is</Text>
                    <Text style={styles.textHeader}>${additionalQtyPrice}</Text>
                    <Text style={styles.textValue}>Your Aditional Qty is</Text>
                    <Text style={styles.textHeader}>{quantity}</Text>
                    <Text style={styles.textValue}>You May Price Up To</Text>
                    <Text style={styles.textHeader}>{common.formatNumberCommas(quantityDouble)}</Text>
                </View>
            </View>
            <Text style={[styles.estimatedProfit, { paddingLeft: 15 }]}>ESTIMATED PROFIT</Text>
            <Text style={[styles.textHeader, { paddingLeft: 15 }]}>$0.1 to $74.90/acre</Text>
        </View>
    );
};

const styles = {
    productDet: {
        color: 'white',
        fontFamily: 'HelveticaNeue',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 15
    },
    textHeader: {
        color: 'white',
        fontFamily: 'HelveticaNeue',
        fontSize: 16,
        paddingBottom: 10
    },
    textValue: {
        color: 'white',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 12,
    },
    estimatedProfit: {
        color: 'rgb(230,180,19)',
        fontFamily: 'HelveticaNeue',
        fontSize: 18,
        paddingTop: 10,
    },
    ViewStyle: {
        marginTop: 40,
        width: 332,
        height: 292,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(224,242,243,0.1)',
        borderRadius: 5,
        marginLeft: 20,
        borderColor: '#01aca8'
    }
};

export default ProductDetails;