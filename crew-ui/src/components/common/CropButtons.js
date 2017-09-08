/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { myFarmCropValues, myFarmTradeSalesOutSideApp,
    cropButtonPress
} from '../../redux/actions/MyFarm/CropAction';
import { allButtons } from '../../redux/actions/MyFarm/ButtonAction';

class CropButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cflag: props.item.flag
        };
    }

    onButtonPress() {
       //const cropAndYear = `${this.props.item.cropYear}${this.props.item.commodity.code}`;
       const cropNameAndYear = `${this.props.item.commodity.name.toUpperCase()} ${this.props.item.cropYear}`;
       this.setState({ cflag: true });
      // for(this.props.but.allCropButtons.myCrops.length
        this.props.myFarmCropValues(this.props.item.commodity.code, this.props.item.cropYear, cropNameAndYear);
        this.props.myFarmTradeSalesOutSideApp(this.props.item.commodity.code, this.props.item.cropYear);

    }


    render() {
       // console.log(this.props.item);
        const { commodity, cropYear, flag } = this.props.item;
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableHighlight
                    onPress={this.onButtonPress.bind(this)}
                >
                    <View style={this.state.cflag ? styles.afterButtonStyle : styles.beforeButtonStyle}>
                        <Text style={this.state.cflag ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }}>{cropYear}</Text>
                        <Text style={this.state.cflag ? { color: 'white', fontSize: 22 } : { color: 'black', fontSize: 22 }}>{commodity.name.toUpperCase()}</Text>
                        <Text style={this.state.cflag ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }}>Crop</Text>
                    </View>
                </TouchableHighlight>

            </View>

        );
    }

}
const styles = {
    beforeButtonStyle: {
        width: 150,
        height: 80,
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: 'white'
    },
    afterButtonStyle: {
        width: 155,
        height: 80,
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: '#279989'
    },
    cropYearStyle: {
        fontSize: 15,

    },
    beforeTextStyle: {
        fontSize: 15
    }


};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        myFarmCropValues,
        allButtons,
        cropButtonPress,
        myFarmTradeSalesOutSideApp}, dispatch);

};

export default connect(null, matchDispatchToProps)(CropButtons);
