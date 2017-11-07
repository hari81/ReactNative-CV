import React from 'react';
import { View, Text, Image } from 'react-native';
import { PriceType } from './PriceType';
import lock from '../../common/img/structure/smLock.png';
import coins from '../../common/img/structure/smCoins.png';
import calender from '../../common/img/structure/smCalendar.png';
import card from '../../common/img/structure/smCard.png';
const SuggestedPrice = () => {
    return (
        <View style={{flexDirection: 'row'}}>
            <PriceType img={lock} price='3.83' text='Floor Price'/>
            <PriceType img={coins} price='4.25' text='Bonus Price'/>
            <PriceType img={calender} text='Pricing Period' date={new Date().toLocaleDateString()}/>
            <PriceType img={card} price='0.00' text='Price'/>

        </View>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    ViewStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#01aca8'
    }
};
export { SuggestedPrice };