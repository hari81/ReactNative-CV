/* jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableHighlight, DatePickerIOS, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import cancel from '../components/common/img/Cancel.png';
import plus from '../components/common/img/Plus.png';
import minus from '../components/common/img/Minus.png';
import ExternalValues from '../components/ExternalTrades/ExternalValues';
import { externalGetTrans } from '../redux/actions/ExternalTrades/ExternalActions';


class ExternalSales extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            transaction: [{}],
            deletedItems: [{}]
        };
        this.valueUpdate = this.valueUpdate.bind(this);
    }

    addNewTransaction = () => {
        this.setState({ transaction: [...this.state.transaction, {}] });
    };
    valueUpdate(index, val, trans ){

        const newTransaction = this.state.transaction.map((t, i) => {
            if(i===index) {
                return Object.assign({}, t, { [trans]: val });
            }
            return t;
        });
        //this.setState({ transaction: newTransaction }, () => console.log(this.state.transaction));

        this.setState({ transaction: newTransaction });
        console.log(this.state.transaction);

    }
    componentDidMount() {
       // this.props.externalGetTrans();
        console.log(this.props.extra.externalGetData.trades);
       // if (this.props.extra.externalGetData.trades !== 'undefined'){
        this.setState({transaction: this.props.extra.externalGetData.trades || [{}] });
       // }
        console.log(this.state.transaction);
    }

    cancelTransaction(index){
        console.log(index);

        if (this.state.transaction[index].active) {
            this.state.transaction[index].active = false;
          const del = this.state.transaction[index];
            this.state.transaction.splice(index, 1);
            this.setState({deletedItems: this.state.deletedItems.push(del), transaction: [...this.state.transaction] });
        }
        else {
            this.state.transaction.splice(index, 1);
            this.setState({ transaction: [...this.state.transaction] });
        }

        console.log(this.state.deletedItems);
    }
    cancelButtonClick() {
        //fetch call
        this.props.externalGetTrans();
        this.setState({transaction: this.props.extra.externalGetData.trades || [{}]});

    }

    saveTransactions()
    {
        //fetch Save data call
        Alert.alert('Save Data');
    }

    componentWillReceiveProps(nextProps) {
       // if(nextProps.extra.externalGetData > 0) {
       // if (Object.keys(this.props.far.myFarmCropData).length !== 0 && (this.props.far.myFarmCropData).constructor === Object) {
            const transValues = nextProps.extra.externalGetData.trades;
            console.log(transValues);
            this.setState({transaction: transValues || [{}] });
       // }
    }

    render(){
       // console.log('externnal', this.props.extra);
        return(
            <View style={{ width: 1024, height: 768, backgroundColor: 'rgb(29,37,49)' }}>
                <View style={{ height: 52, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: 'white', paddingRight: 20, marginBottom: 5 }}>Close </Text>
                    <TouchableHighlight onPress={() => { Actions.myfarm(); } } >
                    <Image source={cancel} style={{ width: 32, height: 32, marginRight: 23 }} />
                    </TouchableHighlight>
                </View>

                <View style={{ height: 100, justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, color: 'white', paddingBottom: 20 }}>{this.props.far.myFarmCropData.name} Trades / Sales Outside the App</Text>
                    <View style={{flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                        Below you can enter transactions that were completed outside of the application.
                        This information is </Text>
                        <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                            used to calculate your total marketed production, as well as your average marketed price, value of sold </Text>
                    <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                    production and the break even on unsold production.</Text>
                        </View>
                    <View style={{ width: 144, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight onPress={this.addNewTransaction}>
                        <Image source={plus} style={{ width: 32, height: 32 }} />
                    </TouchableHighlight>
                    </View>
                </View>
                </View>
                <ScrollView vertiacl showsVerticalScrollIndicator style={{ height: 550 }}>

                     {this.state.transaction.map((item, index) => <ExternalValues
                                                        key={index} item={index}
                                                        onSelectVal = {this.valueUpdate.bind(this, index)}
                                                     cancelTrans={this.cancelTransaction.bind(this, index)}
                                                        items = {item}
                                                        placeholdervalues = {this.props.extra.externalGetData.tradeTemplate}
                                                        />)}

                </ScrollView>


                <View style={{ flexDirection: 'row', height: 100, justifyContent: 'flex-end', marginRight: 100 }}>
                    <TouchableHighlight
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            height: 40,
                            width: 150
                        }}
                        onPress = { this.cancelButtonClick.bind(this)}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}

                        >
                            <Text style={{ textAlign: 'center' }}>CANCEL</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            marginLeft: 20,
                            backgroundColor: '#279989',
                            borderRadius: 5,
                            height: 40,
                            width: 150
                        }}
                        onPress={this.saveTransactions.bind(this)}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: 'white' }}> SAVE </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {

    return{ far: state.myFar, extra: state.external };
}

export default connect(mapStateToProps, { externalGetTrans })(ExternalSales);

