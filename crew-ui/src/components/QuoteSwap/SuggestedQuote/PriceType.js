import React from 'react';
import { View, Text, Image } from 'react-native';

const PriceType = ({ text, price, img, date}) => {
    return (
        <View style={styles.ViewStyle}>
            <Image source={img} style={{marginTop: 10}}/>
            <Text style={styles.textStyle}>{text}</Text>
            <Text style={[styles.textStyle, {fontSize: 22, paddingTop: 0, fontFamily: 'HelveticaNeue'}]}>{date === undefined ? '$'+price : date}</Text>

        </View>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'rgb(0,95,134)',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 16,
        paddingTop: 10,
        //paddingBottom: 10
    },
    ViewStyle: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#01aca8',
        marginLeft: 20,
        marginTop: 20
    }
};
export { PriceType };
