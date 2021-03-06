import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import shield from '../common/img/shield.png';
import lineGraph from '../common/img/linegraph.png';
import shieldMoney from '../common/img/shieldMoney.png';
import * as common from '../../Utils/common';

const { height, width } = Dimensions.get('window');
class WhatTodayOptions extends Component {
    nextScreens(id, name) {
        switch (id) {
            case 107:
                const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
                Actions.quoteswap({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
                break;
            default:
                Actions.productBenefits({ riskProductId: id, riskProductName: name });
                break;
        }
    }
    optionsMenu = (id, image, text, riskId, productName) => {
       return (
           <View style={{ marginLeft: id === 1 ? width * 0.081 : width * 0.022, marginTop: height * 0.0377, borderRadius: 5 }}>
               <TouchableOpacity disabled={riskId === null} onPress={this.nextScreens.bind(this, riskId, productName)}>
                      <View style={riskId === null ? [styles.optionsContainer, { backgroundColor: 'grey' }] : styles.optionsContainer}>
                          <Text style={{ color: 'rgb(34,116,148)', fontSize: 25, textAlign: 'center', fontFamily: 'HelveticaNeue-Bold', paddingTop: 5 }}> {productName} </Text>
                          <Image source={image} style={{ marginLeft: id === 3 ? width * 0.035 : width * 0.088, marginTop: 10 }} />
                          <View style={{ justifyContent: 'flex-start', marginLeft: 30 }}><Text style={styles.optionsTextStyle}>{ text } </Text></View>
                      </View>
               </TouchableOpacity>
           </View>
       );
    }
    render() {
        let risk107Id = null;
        let risk110Id = null;
        let risk5Id = null;
        let risk107Name = null;
        let risk110Name = null;
        let risk5Name = null;
        if (common.isValueExists(this.props.products)) {
            const risk107 = this.props.products.find(x => x.id === 107);
            if (common.isValueExists(risk107)) { 
                risk107Id = risk107.id; 
                risk107Name = risk107.name;
            }
            const risk110 = this.props.products.find(x => x.id === 110);
            if (common.isValueExists(risk110)) { 
                risk110Id = risk110.id; 
                risk110Name = risk110.name;
            }
            const risk5 = this.props.products.find(x => x.id === 5);
            if (common.isValueExists(risk5)) { 
                risk5Id = risk5.id; 
                risk5Name = risk5.name;
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>What would you like to do today?</Text></View>
                <View style={{ flexDirection: 'row' }}>
                    {this.optionsMenu(1, lineGraph, 'I want to set a price', risk107Id, risk107Name)}
                    {this.optionsMenu(2, shield, 'I want to protect downside and maintain upside potential for an investment', risk5Id, risk5Name)}
                    {this.optionsMenu(3, shieldMoney, 'I want to price above today\'s market while locking a floor price', risk110Id, risk110Name)}
                </View>
            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)' },
    subViewStyle: { marginLeft: width * 0.078, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    optionsContainer: { width: width * 0.256, height: height * 0.328, backgroundColor: 'rgb(255,255,255)', borderRadius: 4 },
    optionsTextStyle: { fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(72,87,97)', paddingTop: 20, paddingRight: 20, textAlign: 'center' }
}

const mapStateToProps = state => {
    return {
        cropButton: state.cropsButtons,
        products: state.products
    };
};

export default connect(mapStateToProps, null)(WhatTodayOptions);
