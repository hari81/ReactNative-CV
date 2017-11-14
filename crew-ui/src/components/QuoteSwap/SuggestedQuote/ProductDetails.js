import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as common from '../../../Utils/common';

const ProductDetails = (props) => {
    const { marketPrice, additionalQtyPrice, contractMonth, quantity } = props;
    const quantityDouble = 2 * Number(common.cleanNumericString(quantity));
    const cropName = props.cropBut.selectedCropName;
    const uom = props.acc.filter(item => item.name === cropName);
    return (
        <View style={styles.ViewStyle}>
            <Text style={styles.productDet}>Product Details</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.textValue}>Crop</Text>
                    <Text style={styles.textHeader}>{cropName} {props.cropBut.selectedId.slice(-4)}</Text>
                    <Text style={styles.textValue}>Product</Text>
                    <Text style={styles.textHeader}>{props.riskProduct.name}</Text>
                    <Text style={styles.textValue}>Trade direction</Text>
                    <Text style={styles.textHeader}>Sell</Text>
                    <Text style={styles.textValue}>Contract month</Text>
                    <Text style={styles.textHeader}>{contractMonth}</Text>
                </View>

                <View>
                    <Text style={styles.textValue}>Current Market Price</Text>
                    <Text style={styles.textHeader}>${marketPrice}</Text>
                    <Text style={styles.textValue}>Contigent Offer Price</Text>
                    <Text style={styles.textHeader}>${additionalQtyPrice}</Text>
                    <Text style={styles.textValue}>Contigent Offer Quantity</Text>
                    <Text style={styles.textHeader}>{quantity} {uom[0].unitOfMeasure}s</Text>
                    <Text style={styles.textValue}>You May Price Up To</Text>
                    <Text style={styles.textHeader}>{common.formatNumberCommas(quantityDouble)} {uom[0].unitOfMeasure}s</Text>
                </View>
            </View>
            <Text style={[styles.estimatedProfit, { paddingLeft: 15 }]}>ESTIMATED PROFIT</Text>
            <Text style={[styles.textHeader, { paddingLeft: 15 }]}>${props.sug.estProfitStart_S} to ${props.sug.estProfitEnd_S}/acre</Text>
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

const mapStateToProps = (state) => {
    return { riskProduct: state.products[0],
        sug: state.eProfit,
        acc: state.account.defaultAccount.commodities,
        cropBut: state.cropsButtons
    };
};

export default connect(mapStateToProps, null)(ProductDetails);
