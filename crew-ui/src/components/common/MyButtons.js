/*jshint esversion: 6 */
'use strict';


import React, { Component } from 'react';
import {
    View,
    FlatList, Text
} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import CropButtons from './CropButtons';

class MyButtons extends Component {

    render() {
        const { width } = Dimensions.get('window');
        return (<View
                style={{
                    width,
                    height: 145,
                    backgroundColor: '#3d4c57',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 15,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 20 }}> MY CROPS </Text>
                    <View
                        style={{ height: 1, width: 861, backgroundColor: 'rgb(245,131,51)' }}
                    />
                </View>
                <FlatList
                    horizontal
                    data={this.props.but.allCropButtons.myCrops}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CropButtons key={item.id} item={Object.assign({},item,{flag: false})} values={this.props.values} />}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        but: state.myFar
    };
};

export default connect(mapStateToProps, null)(MyButtons);
