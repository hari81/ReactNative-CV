///*jshint esversion:6 */
"use strict"
import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { LogoHomeHeader } from '../components/common';
import MyCropButton from '../components/DashBoard/MyCropButton';
import MyFarmTiles from '../components/DashBoard/MyFarmTiles';
import ActionBar from '../components/DashBoard/ActionBar';
import MyFarmProduction from '../components/DashBoard/MyFarmProduction'

class DashBoard extends Component {
    cropButton() {
        return (<FlatList
            horizontal
            data={this.props.Crops.myCrops}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MyCropButton key={item.id} item={item} />}
        />);
    }

    render() {
        const { width } = Dimensions.get('window');
        return (
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20}}/>
                <LogoHomeHeader />
                <View style={{backgroundColor:'rgb(239,244,247)'}}>
                    <View style={{height:83, width: 1024, backgroundColor:'rgb(64,78,89)'}}/>
                    <MyFarmTiles/>
                     <MyFarmProduction />
                   <View style={{height:100, width:1024}}>
                    <ActionBar/>
                   </View>
                    <View style={styles.fourthRowStyle}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft:20 }}>
                                <Text style={{ color: 'rgb(255,255,255)', height:18, alignSelf:'stretch', fontFamily:'HelveticaNeue', fontSize: 16, }}>MY CROPS</Text>
                                <View style={{ height: 1,marginLeft:22,marginTop: 9, width: 868, backgroundColor: 'rgb(245,131,51)' }}/>
                            </View>
                            {this.cropButton()}
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = {
    fourthRowStyle: {
        flexDirection: 'row',
        height: 126,
        width:1024,
        backgroundColor:'rgb(61,76,81)'
    },
};
const mapStateToProps = state => {

    return {
        Crops: state.dashBoardButtons,
        drop: state.vieworder

    };
};

export default connect(mapStateToProps, null)(DashBoard);
