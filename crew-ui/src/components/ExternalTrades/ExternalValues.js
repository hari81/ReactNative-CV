/* jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Image, Text, DatePickerIOS, Button, TouchableOpacity, Picker, Keyboard, KeyboardAvoidingView} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Sugar from 'sugar';
import Moment from 'moment';
import { ExternalInput } from './ExternalInput';
import { ExternalNumberInput } from './ExternalNumberInput';
import cancel from '../common/img/Cancel-40.png';

import minus from '../common/img/Minus.png';

export default class ExternalValues extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            show: false,
            date: new Date(),
            quan: '',
            basis: '',
            adj: '',
            fuPrice: ''
    }

    }
    onDateChange = (date) =>
    {
        this.setState({date});
       // console.log(this.state.date);
    };
    externalTrans(transtype, value,) {


       switch (transtype) {
            case 'quantity':
                const re = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
                if ((re.test(value) || value === '') && value.length <= 10 && value <= 9000000.99) {
                    this.props.onSelectVal(value, transtype);

                    this.setState({ quan: value });
                   // this.props.onSelectVal(this.state.date, 'tradeDate');
                }
                break;
            case 'futuresPrice':
                const reg = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((reg.test(value) || value === '') && value.length <= 7 && value <= 99.9999) {
                    this.props.onSelectVal(value , transtype);
                    this.setState({ fuPrice: value });

                }
                break;
            case 'basis':
               const regu = /^-?\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((regu.test(value) || value === '' || value === '-') && value.length <= 7 && value <= 9.9999 && value >= -9.9999) {
                    this.props.onSelectVal(value, transtype);
                    this.setState({ basis: value });
                    break;
                }
                else
                {
                    if(/^[\-\$?\d]?$/.test(value)) {
                        this.props.onSelectVal(value, transtype);
                        this.setState({ basis: value });
                    }

                }
                break;
            case 'adjustments':
                const regul = /^-?\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((regul.test(value) || value === '') && value.length <= 7 && value <= 9.9999 && value >= -9.9999) {
                    this.props.onSelectVal(value, transtype);
                   this.setState({ adj: value });
                    break;
                }
                else
                {
                    if(/^[\-\$?\d]?$/.test(value)){
                        this.props.onSelectVal(value, transtype);
                        this.setState({ adj: value });
                    }

                }
                break;
            case 'netContractPrice':
                console.log('I am in netprice');
                    this.props.onSelectVal(value, transtype);
                break;
           case 'tradeDate':
               this.setState({ date: value });
               this.props.onSelectVal(value, transtype);

                break;
            default:
                this.props.onSelectVal(value, transtype);
        }
    }

    dateVisibility () {
        if (this.state.show) {
            //console.log('DataPickerIOS');
           return(<View style={{ top: -15, marginLeft: 165,height: 200, width: 300, position: 'absolute', backgroundColor: 'white', zIndex: 1, }}>
              <DatePickerIOS
                    date={this.state.date || new Date()}
                    mode="date"
                    onDateChange={this.externalTrans.bind(this, 'tradeDate')}


                />
            </View> );
        }
    }
    preVisibility ()
    {
        if (this.state.show) {

            return(<View style={{top: -15,marginLeft: 150,height: 200, width: 15, position: 'absolute', backgroundColor: 'white', zIndex: 1, borderBottomLeftRadius: 10, borderTopLeftRadius: 10}}>

            </View> );
        }
    }
    doneVisibility ()
    {
        if (this.state.show) {

            return(<View style={{top: -15,marginLeft: 465,height: 200, width: 30, position: 'absolute', backgroundColor: 'white', zIndex: 1, borderBottomRightRadius:10, borderTopRightRadius: 10}}>

                <TouchableOpacity  onPress = {() =>  this.setState({ show: false }) }>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Image source={cancel} style={{height: 30, width: 30, }} />
                    </View>
                </TouchableOpacity>


            </View> );
        }
    }

componentWillMount()
{
 if (Object.keys(this.props.items).length !== 0){
    this.setState({ date: new Date(this.props.items.tradeDate),
        quan: this.props.items.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        fuPrice: '$'+this.props.items.futuresPrice.toFixed(4),
        basis: '$'+this.props.items.basis.toFixed(4),
        adj: '$'+this.props.items.adjustments.toFixed(4)
    });
    //console.log('will quan',this.state.quan);
    }
   // console.log('hello');
  //  this.props.onSelectVal(this.state.date, 'tradeDate');
}
    componentDidMount()
    {
        if (Object.keys(this.props.items).length !== 0){
            this.setState({date: new Date(this.props.items.tradeDate),
                fuPrice: '$'+this.props.items.futuresPrice.toFixed(4),
                basis: '$'+this.props.items.basis.toFixed(4),
                adj: '$'+this.props.items.adjustments.toFixed(4),
                quan: this.props.items.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') });
          //  console.log('didmount quan',this.state.quan);
        }
        this.props.onSelectVal(this.state.date, 'tradeDate');
    }

    render() {

    const { cancelTrans, items = {}, placeholdervalues } = this.props;
        const a = Number(items.adjustments || 0);
        const b = Number(items.basis || 0);
        const f = Number(items.futuresPrice || 0);
        return (
            <View style={{ backgroundColor: '#3d4c57' }}>
                <KeyboardAvoidingView  behavior='padding'>
                <View style={{marginBottom: 15, height:5, backgroundColor: 'black'}}/>
                <View style={{ flexDirection: 'row' }}>

                    <ExternalInput
                                focus = {() => {Keyboard.dismiss(); this.setState({ show: true }); }}
                                //onblur = {() => { this.setState({ show: false }); }}
                                placeholder={'MM/DD/YYYY'}
                                label='Trade Date *'
                               // value={typeof items.tradeDate === 'undefined' ? '' : this.state.date.toLocaleDateString()}
                               value={this.state.date.toLocaleDateString()}

                    />
                    {this.preVisibility()}
                    {this.dateVisibility()}
                    {this.doneVisibility()}

                    <View
                        style={{

                            justifyContent: 'flex-end',
                            marginLeft: 10,
                            marginRight: 5,
                            alignItems: 'center'

                        }}
                    >
                        <Text style={{ fontSize: 15, color: 'white', paddingBottom: 10, alignItems: 'center' }}>Contract Month *</Text>
                        <View
                            style={{
                                justifyContent: 'flex-end',
                                // flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 5,
                                backgroundColor: 'white',
                                marginBottom: 10
                            }}
                        >
                        <Picker
                            style={{width:135, height: 45 }}
                            mode = 'dropdown'
                            itemStyle={{height: 45}}
                            selectedValue={'CZ2018'}
                           // onValueChange={this.dropDown.bind(this)}
                        >

                            <Picker.Item label='CZ2018' value='CZ2018' key='CZ2018' />
                            <Picker.Item label='CU2018' value='CU2018' key='CU2018' />
                            <Picker.Item label='SU2018' value='SU2018' key='SU2018' />
                        </Picker>
                        </View>
                    </View>

                    <ExternalNumberInput

                        placeholder='Ex: 22,000'
                        val={typeof items.quantity === 'undefined' ? '' : this.state.quan}
                        onChangeText={this.externalTrans.bind(this, 'quantity')}
                        label='Quantity *'
                        onfocus={() => { this.setState({ quan: this.state.quan.toString().replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') }); }}
                        onblur={() => { this.setState({ quan: this.state.quan.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') });
                            }}

                    />
                    <ExternalNumberInput
                        val = {typeof items.futuresPrice === 'undefined' ? '' : this.state.fuPrice }
                        //val={typeof items.futuresPrice === 'undefined'? '' : items.futuresPrice.toString()}
                        onChangeText={this.externalTrans.bind(this, 'futuresPrice')}
                        placeholder =' $3.9550'
                        label='Futures Price *'
                        onfocus={() => { this.setState({ fuPrice: this.state.fuPrice.slice(1, this.state.fuPrice.length) }); }}
                        onblur={() => { this.setState({ fuPrice: this.state.fuPrice === '' ? '':'$'+this.state.fuPrice }); }}
                    />
                    <ExternalNumberInput

                        val={typeof items.basis === 'undefined' ? '' : this.state.basis}
                       // val = {items.basis.toFixed(4)}
                        onChangeText={this.externalTrans.bind(this, 'basis')}
                        placeholder =' $-0.2500'
                        label='Basis($-/+)'
                        onfocus={() => { this.setState({ basis: this.state.basis.slice(1, this.state.basis.length) }); }}
                        onblur={() => { this.setState({ basis: this.state.basis===''? '':'$'+this.state.basis }); }}
                    />
                    <ExternalNumberInput

                        val={typeof items.adjustments === 'undefined' ? '' : this.state.adj}
                      //  val = { items.adjustments.toFixed(4) }
                        onChangeText={this.externalTrans.bind(this, 'adjustments')}
                        placeholder =' $-0.0500'
                        label='Adjustments($-/+)'
                        onfocus={() => { this.setState({ adj: this.state.adj.slice(1, this.state.adj.length) }); }}
                        onblur={() => { this.setState({ adj: this.state.adj === ''? '' : '$'+this.state.adj }); }}
                    />

                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', zIndex: -1 }}>
                    <View style={{justifyContent: 'space-between', marginRight: 5 }}>
                    <Text style={{ fontSize: 15, color: 'white', paddingLeft: 20, paddingBottom: 10}}> Notes </Text>
                        <View style={[{backgroundColor: 'white', width: 740, height: 50, borderRadius: 5, marginLeft: 20 }]}>
                    <TextInput
                        value = {items.notes}
                        style={{ width: 740, height: 45, paddingLeft: 20, fontSize: 15 }}
                        multiline
                        placeholder = 'Sale to grain elevator in Fort Wayne for October delivery.'
                        onChangeText={this.externalTrans.bind(this, 'notes')} />
                        </View>
                    </View>
                    <ExternalNumberInput
                        val={isNaN((a + b + f).toFixed(4)) ? '' : '$'+(a + b + f).toFixed(4).toString()}
                        onChange={this.externalTrans.bind(this, 'netContractPrice')}
                        label='NET Contract ($)'
                        placeholder =' $3.6550'
                        edit = {false}
                        stylenp={{borderWidth: 2, borderColor: (a + b + f).toFixed(4) < 0 ? 'red': 'green'}}
                    />
                    <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginLeft:20 }}>
                    <TouchableHighlight onPress={cancelTrans}>
                    <Image source={minus} style={{ width: 32, height: 32 }} />
                    </TouchableHighlight>
                        <Text style={{ color: 'white', fontSize: 10 }}>Remove</Text>
                        <Text style={{ color: 'white', fontSize: 10 }}>Transaction</Text>
                    </View>

                </View>
                <View style={{marginTop: 15, height:5, backgroundColor: 'black' }}/>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
