import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import shield from '../components/common/img/shield.png';
import lineGraph from '../components/common/img/linegraph.png';
import shieldMoney from '../components/common/img/shieldMoney.png';

const { height, width } = Dimensions.get('window');
export default class WhatTodayOptions extends Component {
    optionsMenu = (id, image, text) => {
       return (
           <View style={{ marginLeft: id === 1 ? width * 0.081 : width * 0.022, marginTop: height * 0.0377 }}>
               <TouchableOpacity>
                      <View style={styles.optionsContainer}>
                          <Image source={image} style={{ marginLeft: id === 3 ? width * 0.035 : width * 0.088, marginTop: height * 0.056 }} />
                          <View style={{ justifyContent: 'flex-start', marginLeft: 45 }}><Text style={styles.optionsTextStyle}>{ text } </Text></View>
                      </View>
               </TouchableOpacity>
           </View>
       );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>What would you like to do today?</Text></View>
                <View style={{ flexDirection: 'row' }}>
                {this.optionsMenu(1, lineGraph, `I want to set a price`)}
                {this.optionsMenu(2, shield, `I want to protect downside and maintain upside potential for an investment`)}
                {this.optionsMenu(3, shieldMoney, `I want to price above today's market while locking a floor price`)}
                </View>
            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, },
    subViewStyle: { marginLeft: width * 0.078, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    optionsContainer: { width: width * 0.256, height: height * 0.328, backgroundColor: 'rgb(255,255,255)', borderRadius: 4 },
    optionsTextStyle: { fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(72,87,97)', paddingTop: 20, paddingRight: 20, textAlign: 'center' }
}
