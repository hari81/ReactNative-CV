import React from 'react';
import { View, Text } from 'react-native';

const ProductDetails = () => {
    return (
        <View style={styles.ViewStyle}>
            <Text style={styles.textStyle1}>Product Details</Text>
            <View style={{flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between' }}>
                <View style={{justifyContent: 'space-around'}}>
                    <Text style={styles.textStyle3}>Your crop is</Text>
                    <Text style={styles.textStyle2}>CORN 2017</Text>
                    <Text style={styles.textStyle3}>Your product is</Text>
                    <Text style={styles.textStyle2}>Accrual Trigger</Text>
                    <Text style={styles.textStyle3}>Your trade direction is</Text>
                    <Text style={styles.textStyle2}>Sell</Text>
                    <Text style={styles.textStyle3}>Your contact month is</Text>
                    <Text style={styles.textStyle2}>March 2018</Text>
                </View>

                <View>
                    <Text style={styles.textStyle3}>Current Market Price is</Text>
                    <Text style={styles.textStyle2}>$3.8500</Text>
                    <Text style={styles.textStyle3}>Your Additional Qty Price is</Text>
                    <Text style={styles.textStyle2}>$4.25</Text>
                    <Text style={styles.textStyle3}>Your Aditional Qty is</Text>
                    <Text style={styles.textStyle2}>19,000</Text>
                    <Text style={styles.textStyle3}>You May Price Up To</Text>
                    <Text style={styles.textStyle2}>38,000</Text>
                </View>
            </View>
            <Text style={[styles.textStyle4, {paddingLeft: 15}]}>ESTIMATED PROFIT</Text>
            <Text style={[styles.textStyle2, {paddingLeft: 15}]}>$0.1 to $74.90/acre</Text>
        </View>
    );
};

const styles = {
    textStyle1: {
        //alignSelf: 'center',
        color: 'white',
        fontFamily: 'HelveticaNeue',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 15
    },
    textStyle2: {
        //alignSelf: 'center',
        color: 'white',
        fontFamily: 'HelveticaNeue',
        fontSize: 16,
        //paddingTop: 10,
        paddingBottom: 10
    },
    textStyle3: {
        //alignSelf: 'center',
        color: 'white',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 12,
        //paddingTop: 10,
        //paddingBottom: 10
    },
    textStyle4: {
        //alignSelf: 'center',
        color: 'rgb(230,180,19)',
        fontFamily: 'HelveticaNeue',
        fontSize: 18,
        paddingTop: 10,
        //paddingBottom: 10
    },
    ViewStyle: {
        //flex: 1,
        marginTop: 40,
        width: 332,
        height: 292,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(224,242,243,0.1)',
        borderRadius: 5,
        //borderWidth: 1,
        marginLeft: 20,
        borderColor: '#01aca8'
    }
};
export { ProductDetails };
