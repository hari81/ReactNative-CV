import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cancel from '../../components/common/img/Cancel.png';

class IncrementSettingBar extends Component {
    constructor() {
        super();
        this.state = {
           showBlock: false,
        };
    }
    showIncrementSettingsBlock = () => {
        if (this.state.showBlock) {
                  return (
                      <View style={{ zIndex: 10, marginTop: -(height * 0.479), marginLeft: -(width * 0.193), height: height * 0.478, width: width * 0.195, backgroundColor: 'rgb(39,49,66)' }}>
                          <TouchableOpacity onPress={() => this.setState({ showBlock: false })}>
                          <Image source={cancel} style={{ margin: 6, height: 20, width: 20 }} />
                          </TouchableOpacity>
                          <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', paddingLeft: width * 0.039 }}>Profitability Matrix</Text>
                          <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-Thin', paddingLeft: width * 0.039 }}>Increment Settings</Text>
                          <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', paddingLeft: width * 0.059, paddingTop: height * 0.02 }}>Yield Increment</Text>
                          {this.blocks(1, 'yield')}
                          {this.blocks(5, 'yield')}
                          {this.blocks(10, 'yield')}
                          <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', paddingLeft: width * 0.059, paddingTop: height * 0.04 }}>Price Increment</Text>
                          {this.blocks(0.05, 'price')}
                          {this.blocks(0.10, 'price')}
                          {this.blocks(0.25, 'price')}
                      </View>
                  );
        }
    }
    blocks =(val, str) => {
        return (
            <TouchableOpacity>
            <View style={{ height: 21, width: 95, borderWidth: 1, borderColor: 'rgb(1,172,168)', marginLeft: width * 0.06, marginTop: height * 0.01 }}>
                <Text style={{ color: 'white', paddingLeft: 10 }}>{str === 'yield' ? val : '$ ' + val.toFixed(2) } {str === 'yield' ? 'bushels' : ''}</Text>
            </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginLeft: width * 0.36, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 18, fontFamily: 'HelveticaNeue' }}>Your Profit Goal:</Text>
                </View>
                <View style={{ marginLeft: width * 0.003, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 28, fontFamily: 'HelveticaNeue' }}>$50</Text>
                </View>
                <View style={{ marginLeft: width * 0.28, height: height * 0.044, width: width * 0.156, backgroundColor: 'rgba(82,97,115,0.37)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showBlock: !this.state.showBlock })}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 14, fontFamily: 'HelveticaNeue' }}>Increment Setting</Text>
                    </TouchableOpacity>
                </View>
                {this.showIncrementSettingsBlock()}

            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        height: height * 0.07,
        backgroundColor: 'rgb(39,49,66)',
        flexDirection: 'row',

    }
}
export default IncrementSettingBar;
