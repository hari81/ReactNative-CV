/* jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';

import { View, Text, Image, ScrollView, TouchableHighlight, DatePickerIOS, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import cancel from '../components/common/img/Cancel.png';
import plus from '../components/common/img/Plus.png';
import minus from '../components/common/img/Minus.png';
import { myFarmTradeSalesOutSideApp, myFarmCropValues } from '../redux/actions/MyFarm/CropAction';
import ExternalValues from '../components/ExternalTrades/ExternalValues';
import { externalGetTrans, saveExternalTrades } from '../redux/actions/ExternalTrades/ExternalActions';


class ExternalSales extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            transaction: [{}],

        };
        this.valueUpdate = this.valueUpdate.bind(this);
    }

    addNewTransaction = () => {
        this.refs.scrollView.scrollToEnd();
        this.setState({ transaction: [...this.state.transaction, {}] });
        this.refs.scrollView.scrollToEnd();

    };
    valueUpdate(index, val, trans ){
        const newTransaction = this.state.transaction.map((t, i) => {
            if(i === index) {
                return Object.assign({}, t, { [trans]: val });
            }
            return t;
        });
        //this.setState({ transaction: newTransaction }, () => console.log(this.state.transaction));

        this.setState({ transaction: newTransaction });
        console.log(this.state.transaction);

    }
    componentWillMount(){
        // this.props.externalGetTrans();
        console.log('external',this.props.extra.externalGetData.trades);
        // if (this.props.extra.externalGetData.trades !== 'undefined'){
        this.setState({transaction: JSON.parse(JSON.stringify(this.props.extra.externalGetData.trades || [{}])) });
        // }
        console.log(this.state.transaction);
    }
    componentDidMount() {
       // this.props.externalGetTrans();
        console.log('external',this.props.extra.externalGetData.trades);
       // if (this.props.extra.externalGetData.trades !== 'undefined'){
        this.setState({transaction: JSON.parse(JSON.stringify(this.props.extra.externalGetData.trades || [{}])) });
       // }
        console.log(this.state.transaction);
    }

    cancelTransaction(index){
        console.log('index',index);

        if (this.state.transaction[index].active) {

            this.state.transaction[index].active = false;
        }
        else {
            this.state.transaction.splice(index, 1);
        }
        this.setState({ transaction: [...this.state.transaction] });
        console.log(this.state.transaction.length);
        console.log(this.state.transaction);
        //console.log(this.props.extra.externalGetData.trades);

    }
    cancelButtonClick() {
        console.log('length', this.state.transaction.length);
        for (let index = 0; index < this.props.extra.externalGetData.trades.length; index++) {
            if (!this.props.extra.externalGetData.trades[index].active) {
                this.props.extra.externalGetData.trades[index].active = true;
            }
        }
       // this.props.externalGetTrans();


        this.setState({transaction: this.props.extra.externalGetData.trades || [{}]});
        console.log(this.props.extra.externalGetData.trades);

    }

    saveTransactions()
    {
        const tradeData = this.state.transaction;
        console.log(tradeData.length);
        if(tradeData.length>0)
        {
            for(let i=0;i<tradeData.length;i++)
            {
                console.log('length of transactin', tradeData.length);
                if(tradeData[i].tradeDate === undefined || tradeData[i].tradeDate === '' )
                {
                    tradeData[i].tradeDate = new Date();
                }
                if(tradeData[i].tradeDate === '' || tradeData[i].quantity === '' || tradeData[i].futuresPrice === '' ||
                    tradeData[i].tradeDate === undefined || tradeData[i].quantity === undefined || tradeData[i].futuresPrice === undefined ){
                    Alert.alert('Please fill all mandatory(*) fields before saving the data.');
                    return;
                }
            }
        }
        this.props.saveExternalTrades(this.state.transaction);

    }

    componentWillReceiveProps(nextProps){
       // if(nextProps.extra.externalGetData > 0) {
       // if (Object.keys(this.props.far.myFarmCropData).length !== 0 && (this.props.far.myFarmCropData).constructor === Object) {


        this.setState({transaction: JSON.parse(JSON.stringify(nextProps.extra.externalGetData.trades || [{}])) });
       // }
    }
    externalCropYearName()
    {
        const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        return(cropData[0].name.toUpperCase() + ' ' + cropData[0].cropYear);

    }

    backToDashboardMyfarm = () =>
    {
        if(this.props.extra.exflag) {
            Actions.dashboard();
        } else {
            const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
            this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYea);
            this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
            Actions.myfarm();
        }
    }

    render(){
       // console.log('externnal', this.props.extra);
        return(
            <View style={{ width: 1024, height: 768, backgroundColor: 'rgb(29,37,49)' }}>
                <View style={{ height: 52, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: 'white', paddingRight: 20, marginBottom: 5 }}>Close </Text>
                    <TouchableHighlight onPress={ this.backToDashboardMyfarm } >
                    <Image source={cancel} style={{ width: 32, height: 32, marginRight: 23 }} />
                    </TouchableHighlight>
                </View>

                <View style={{ height: 100, justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, color: 'white', paddingBottom: 20 }}>{this.externalCropYearName()}  Trades / Sales Outside the App</Text>
                    <View style={{flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                                Below you can enter transactions that were completed outside of the application.
                                This information is
                            </Text>
                            <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                                used to calculate your total marketed production, as well as your average marketed price, value of sold
                            </Text>
                            <Text style={{ fontSize: 17, color: 'white', paddingLeft: 82 }}>
                                production and the break even on unsold production.
                            </Text>
                        </View>
                        <View style={{ width: 144, justifyContent: 'center', alignItems: 'center', marginLeft: 25 }}>
                            <TouchableHighlight onPress={this.addNewTransaction}>
                                <Image source={plus} style={{ width: 32, height: 32 }} />
                            </TouchableHighlight>
                            <Text style={{color: 'white', fontSize:10}}>Add</Text>
                            <Text style={{color: 'white', fontSize:10}}>Transaction</Text>
                        </View>
                    </View>
                </View>
                <ScrollView vertiacl showsVerticalScrollIndicator style={{ height: 550 }} ref='scrollView'>

                     {this.state.transaction
                         .filter(item => item.active === undefined || item.active)
                         .map((item, index) => <ExternalValues
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

    return{ far: state.myFar, extra: state.external, cropBut: state.cropsButtons };
}

export default connect(mapStateToProps, { externalGetTrans, saveExternalTrades, myFarmTradeSalesOutSideApp, myFarmCropValues })(ExternalSales);

