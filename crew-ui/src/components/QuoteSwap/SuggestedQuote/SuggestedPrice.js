import React from 'react';
import { View, Text, Image } from 'react-native';
import * as common from '../../../Utils/common';
import lock from '../../common/img/structure/smLock.png';
import coins from '../../common/img/structure/smCoins.png';
import calender from '../../common/img/structure/smCalendar.png';
import card from '../../common/img/structure/smCard.png';

const SuggestedPrice = ({floorPrice, bonusPrice, aStartDate, price, endDate}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <PriceType img={lock} price={floorPrice} text='Floor Price' />
            <PriceType img={coins} price={bonusPrice} text='Bonus Price' />
            <PriceType img={calender} text='Pricing Period' sdate={aStartDate} edate={endDate}/>
            <PriceType img={card} price={price.toFixed(2)} text='Price' />

        </View>
    );
};

const PriceType = ({ text, price, img, sdate, edate }) => {
    return (
        <View style={styles.PriceViewStyle}>
            <Image source={img} style={{ marginTop: 10 }} />
            <Text style={[styles.PricetextStyle, sdate === undefined ? {} :{ paddingTop: 0, fontSize: 13 }]}>{text}</Text>
            <Text style={[styles.PricetextStyle,
                sdate === undefined ? { fontSize: 22, paddingTop: 0, fontFamily: 'HelveticaNeue' } : { fontSize: 16, paddingTop: 0, fontFamily: 'HelveticaNeue-Bold' }]}
            >
                {sdate === undefined ? '$'+price : common.formatDate(sdate, 5) + ' to '+ common.formatDate(edate, 5) }
                </Text>

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
    },
    PricetextStyle: {
        alignSelf: 'center',
        color: 'rgb(0,95,134)',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 16,
        paddingTop: 10,
    },
    PriceViewStyle: {
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
export { SuggestedPrice };
