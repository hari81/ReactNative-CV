/* jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Image, Text } from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import { ExternalInput } from './ExternalInput';
import { ExternalNumberInput } from './ExternalNumberInput';

import PropType from 'prop-types';

import minus from '../common/img/Minus.png';

export default class ExternalValues extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            show: false,
            //date: ''
    }

    }
    /*onDateChange = (date) =>
    {
        this.setState({date});
    };*/
    externalTrans(transtype, value,) {
       // this.props.onSelectVal(value, transtype);

       switch (transtype) {
            case 'quantity':
                const re = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
                if ((re.test(value) || value === '') && value.length <= 10 && value <= 9000000.99) {
                    this.props.onSelectVal(value, transtype);
                }
                break;
            case 'futuresPrice':
                const reg = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((reg.test(value) || value === '') && value.length <= 7 && value <= 99.9999) {
                    this.props.onSelectVal(value, transtype);
                }
                break;
            case 'basis':
              // const regu = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/   /^'-'?$\d?$+(?:\.\d{1,2})?$/
                //regul = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/ correct
               const regu = /^-?\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
                if ((regu.test(value) || value === '' || value === '-') && value.length <= 5 && value <= 9.99) {
                    this.props.onSelectVal(value, transtype);
                }
                break;
            case 'adjustments':
                const regul = /^-?\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
                if ((regul.test(value) || value === '') && value.length <= 4 && value <= 9.99) {
                    this.props.onSelectVal(value, transtype);
                }
                break;
            case 'netContractPrice':
                if(value > 0) {
                    this.props.onSelectVal(value, transtype);
                }
                break;

            default:
                this.props.onSelectVal(value, transtype);
        }
    }

    calendarVisibility () {
        if (this.state.show) {
            const BLUE = '#2196F3';
            const WHITE = '#FFFFFF';
            const GREY = '#BDBDBD';
            const BLACK = '#424242';
            const LIGHT_GREY = '#F5F5F5';
            return (
                <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1}}>
                    {/*  <View style={{flexGrow: 1}}></View> */}
                    <Calendar
                        onChange={(date) => { this.setState({ date, show: false }); }}
                        selected={this.state.date}
                        //finalStage="month"
                        minDate={Moment().startOf('day')}
                        maxDate={Moment().add(10, 'years').startOf('day')}
                        //General Styling}
                        style={{
                            borderWidth: 1,
                            borderColor: GREY,
                            borderRadius: 5,
                            alignSelf: 'center',
                            marginTop: 20,

                        }}
                        barView={{
                            backgroundColor: BLUE,
                            padding: 10,
                        }}
                        barText={{
                            fontWeight: 'bold',
                            color: WHITE,
                        }}
                        stageView={{
                            padding: 0,
                        }}
                        // Day selector styling
                        dayHeaderView={{
                            backgroundColor: LIGHT_GREY,
                            borderBottomColor: GREY,
                        }}
                        dayHeaderText={{
                            fontWeight: 'bold',
                            color: BLACK,
                        }}
                        dayRowView={{
                            borderColor: LIGHT_GREY,
                            height: 40,
                        }}
                        dayText={{
                            color: BLACK,
                        }}
                        dayDisabledText={{
                            color: GREY,
                        }}
                        dayTodayText={{
                            fontWeight: 'bold',
                            color: BLUE,
                        }}
                        daySelectedText={{
                            fontWeight: 'bold',
                            backgroundColor: BLUE,
                            color: WHITE,
                            borderRadius: 15,
                            borderColor: "transparent",
                            overflow: 'hidden',
                        }}
                        // Styling month selector.
                        monthText={{
                            color: BLACK,
                            borderColor: BLACK,
                        }}
                        monthDisabledText={{
                            color: GREY,
                            borderColor: GREY,
                        }}
                        monthSelectedText={{
                            fontWeight: 'bold',
                            backgroundColor: BLUE,
                            color: WHITE,
                            overflow: 'hidden',
                        }}
                        // Styling year selector.
                        yearMinTintColor={BLUE}
                        yearMaxTintColor={GREY}
                        yearText={{
                            color: BLACK,
                        }}
                    />
                    {/*<View style={{flexGrow: 1}}></View>*/}
                </View>)
        } else {
            return null;
        }
    }

    render() {

    const { cancelTrans, items, placeholdervalues} = this.props;
        return (
            <View style={{ marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    {/*<View>
                    <DatePickerIOS
                            date={this.state.date}
                            mode="date"
                            onDateChange={this.onDateChange}

                        />
                    </View>*/}
                    <ExternalInput
                                onfocus = {() => { this.setState({ show: true }); }}
                                onblur = {() => { this.setState({ show: false }); }}
                                placeholder={'MM/DD/YYYY'}
                                label='Trade Date *'
                                value={typeof items.tradeDate === 'undefined'? '' : new Date(items.tradeDate).toLocaleDateString()}
                    />

                    <ExternalNumberInput
                        // placeholder={typeof placeholdervalues.quantity === 'undefined'? 'null' : placeholdervalues.quantity}
                         val = { typeof items.quantity === 'undefined'? '' :items.quantity.toString()  }
                        onChangeText={this.externalTrans.bind(this, 'quantity')}
                        label='Quantity *' />

                    <ExternalNumberInput

                        val={typeof items.futuresPrice === 'undefined'? '' : items.futuresPrice.toString()}
                        onChangeText={this.externalTrans.bind(this, 'futuresPrice')}
                       // placeholder={placeholdervalues.futuresPrice}
                        label='Future Price *' />
                    <ExternalNumberInput
                       // placeholder={placeholdervalues.basis}
                        val = {typeof items.basis === 'undefined'? '' :items.basis.toString()}
                        onChangeText={this.externalTrans.bind(this, 'basis')}
                        label='Basis($)(-/+)' />
                    <ExternalNumberInput
                       // placeholder={placeholdervalues.adjustments}
                        val = {typeof items.adjustments === 'undefined'? '' :items.adjustments.toString()}
                        onChangeText={this.externalTrans.bind(this, 'adjustments')}
                        label='Adjustments($)(-/+)' />
                    <ExternalNumberInput
                      //  placeholder={placeholdervalues.netContractPrice}
                        val={typeof (parseFloat(items.adjustments) + parseFloat(items.basis)+parseFloat(items.futuresPrice)) === 'undefined'?
                            '' : (parseFloat(items.adjustments) + parseFloat(items.basis)+parseFloat(items.futuresPrice)).toFixed(2).toString()==='NaN' ?
                                '0': (parseFloat(items.adjustments) + parseFloat(items.basis)+parseFloat(items.futuresPrice)).toFixed(2).toString() }
                        onChangeText={this.externalTrans.bind(this, 'netContractPrice')}
                        label='NET Contact Price($)'
                        edit = {false}
                    />
                </View>
                <View style={{ width: 870, height: 50, backgroundColor: 'white', marginTop: 30, borderRadius: 5, marginLeft: 25, flexDirection: 'row' }}>
                    <TextInput
                        value = {items.notes}
                        style={{ width: 870, height: 50 }}
                     //   placeholder= {placeholdervalues.notes}
                        onChangeText={this.externalTrans.bind(this, 'notes')} />
                    <TouchableHighlight onPress={cancelTrans}>
                    <Image source={minus} style={{ width: 32, height: 32, marginLeft: 50 }} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
/*ExternalValues.prototype = {
    qty: PropType.number.isRequired
}*/
/*var a=10;
function log()
{
    this.a = 5;

}
log();
console.log(a)

var c=30;
function log()
{
    console.log("ins",c);
    var c =35;
}
log();
console.log('out', c) */