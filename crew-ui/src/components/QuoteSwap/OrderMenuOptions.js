import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import shield from '../common/img/shield.png';
import lineGraph from '../common/img/linegraph.png';
import shieldMoney from '../common/img/shieldMoney.png';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';

const { height, width } = Dimensions.get('window');
class WhatTodayOptions extends Component {
    nextScreens(id) {
        switch (id) {
            case 1:
                const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
                Actions.quoteswap({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
                break;
            case 2:
                Actions.productBenefits();
                break;
            case 3:
                Actions.productBenefits();
                break;
            default:
        }
    }
    optionsMenu = (id, image, text, riskId, productName) => {
       return (
           <View style={{ marginLeft: id === 1 ? width * 0.081 : width * 0.022, marginTop: height * 0.0377 }}>
               <TouchableOpacity disabled={riskId === null} onPress={this.nextScreens.bind(this, id)}>
                      <View style={riskId === null ? [styles.optionsContainer, { backgroundColor: 'grey' }] : styles.optionsContainer}>
                          <Text style={{ color: '#3d4c57', fontSize: 27, textAlign: 'center', fontFamily: 'HelveticaNeue' }}> {productName} </Text>
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
        if (common.isValueExists(this.props.products)) {
            const risk107 = this.props.products.find(x => x.id === 107);
            if (common.isValueExists(risk107)) { risk107Id = risk107.id; }
            const risk110 = this.props.products.find(x => x.id === 110);
            if (common.isValueExists(risk110)) { risk110Id = risk110.id; }
            const risk5 = this.props.products.find(x => x.id === 5);
            if (common.isValueExists(risk5)) { risk5Id = risk5.id; }
        }
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>What would you like to do today?</Text></View>
                <View style={{ flexDirection: 'row' }}>
                {this.optionsMenu(1, lineGraph, `I want to set a price`, risk107Id, this.props.products.find(x => x.id === 107).name)}
                {this.optionsMenu(2, shield, `I want to protect downside and maintain upside potential for an investment`, risk5Id, this.props.products.find(x => x.id === 5).name)}
                {this.optionsMenu(3, shieldMoney, `I want to price above today's market while locking a floor price`, risk110Id, this.props.products.find(x => x.id === 110).name)}
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
