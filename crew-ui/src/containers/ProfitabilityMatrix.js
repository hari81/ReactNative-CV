import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Matrix from '../components/ProfitabilityMatrix/Matrix';
import FooterBar from '../components/ProfitabilityMatrix/FooterBar';
import { LogoHomeHeader } from '../components/common';
import CropHeader from '../components/ProfitabilityMatrix/CropHeader';
import IncrementSettingBar from '../components/ProfitabilityMatrix/IncrementSettingBar';

export default class ProfitabilityMatrix extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: height * 0.026 }} />
                <LogoHomeHeader />
                <CropHeader />
                <Matrix />
                <IncrementSettingBar />
                <FooterBar />
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        backgroundColor: 'rgb(39,49,66)'
    },
}
