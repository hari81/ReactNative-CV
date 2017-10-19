import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Image, Text, DatePickerIOS, TouchableOpacity, Picker, Keyboard, Dimensions } from 'react-native';
import { ExternalInput } from './ExternalInput';
import { ExternalNumberInput } from './ExternalNumberInput';
import cancel from '../common/img/Cancel-40.png';
import minus from '../common/img/Minus.png';
import bugsnag from '../common/BugSnag';

export default class ExternalValues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            date: new Date(),
            quan: '',
            basis: '',
            adj: '',
            fuPrice: '',
            contractFlag: false,
            cMonth: ''
        };
    }
    onDateChange = (date) => {
        this.setState({ date });
    };
    externalTrans(transtype, value) {
        switch (transtype) {
            case 'quantity':
                //this.props.scrollup()
                const re = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
                if ((re.test(value) || value === '') && value.length <= 10 && value <= 9000000.99) {
                    this.props.onSelectVal(value, transtype);
                    this.setState({ quan: value });
                }
                break;
            case 'futuresPrice':
                const reg = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((reg.test(value) || value === '') && value.length <= 7 && value <= 99.9999) {
                    this.props.onSelectVal(value, transtype);
                    this.setState({ fuPrice: value });
                }
                break;
            case 'basis':
                const regu = /^-?\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/;
                if ((regu.test(value) || value === '' || value === '-') && value.length <= 7 && value <= 9.9999 && value >= -9.9999) {
                    this.props.onSelectVal(value, transtype);
                    this.setState({ basis: value });
                    break;
                } else {
                    if (/^[\-\$?\d]?$/.test(value)) {
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
                } else {
                    if (/^[\-\$?\d]?$/.test(value)) {
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
            case 'underlyingSymbol':
                this.setState({ cMonth: value });
                this.props.onSelectVal(value, transtype);
                break;
            default:
                this.props.onSelectVal(value, transtype);
        }
    }

    dateVisibility() {
        if (this.state.show) {
            return (<View style={{ top: -15, marginLeft: 165, height: 200, width: 300, position: 'absolute', backgroundColor: 'white', zIndex: 1, }}>
                <DatePickerIOS
                    date={this.state.date || new Date()}
                    mode='date'
                    onDateChange={this.externalTrans.bind(this, 'tradeDate')}
                />
            </View>);
        }
    }

    preVisibility() {
        if (this.state.show) {
            return (<View
                style={{ top: -15,
                    marginLeft: 150,
                    height: 200,
                    width: 15,
                    position: 'absolute',
                    backgroundColor: 'white',
                    zIndex: 1,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10 }}
            />);
        }
    }

    doneVisibility() {
        if (this.state.show) {
            return (<View style={{ top: -15, marginLeft: 465, height: 200, width: 30, position: 'absolute', backgroundColor: 'white', zIndex: 1, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>

                <TouchableOpacity onPress={() =>  this.setState({ show: false })}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Image source={cancel} style={{ height: 30, width: 30 }} />
                    </View>
                </TouchableOpacity>
            </View>);
        }
    }

    contractMonthVisibility() {
        if (this.state.contractFlag) {
            return (<View style={{
                top: -15,
               // marginLeft: 350,
                height: 100,
                width: 100,
                position: 'absolute',
                backgroundColor: 'white',
                zIndex: 1,
            }}>
                <Picker
                    style={{ width: 100, height: 100 }}
                    mode='dropdown'
                    itemStyle={{ height: 100 }}
                    selectedValue={'CU2018'}
                    onValueChange={val => this.setState({ cMonth: val, contractFlag: false })}
                >
                    <Picker.Item label='CZ2018' value='CZ2018' key='CZ2018' />
                    <Picker.Item label='CU2018' value='CU2018' key='CU2018' />
                    <Picker.Item label='SU2018' value='SU2018' key='SU2018' />
                </Picker>
            </View>);
        }
    }


    componentWillMount() {
        if (Object.keys(this.props.items).length !== 0) {
            this.setState({ date: new Date(this.props.items.tradeDate),
                quan: typeof this.props.items.quantity === 'undefined' ? '' : this.props.items.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                fuPrice: `$${parseFloat(this.props.items.futuresPrice || 0).toFixed(4)}`,
                basis: `$${parseFloat(this.props.items.basis || 0).toFixed(4)}`,
                adj: `$${parseFloat(this.props.items.adjustments || 0).toFixed(4)}`,
                cMonth: this.props.items.underlyingSymbol
            });
        }
    }
    componentDidMount() {
        if (Object.keys(this.props.items).length !== 0) {
            this.setState({ date: new Date(this.props.items.tradeDate),
                fuPrice: `$${parseFloat(this.props.items.futuresPrice || 0).toFixed(4)}`,
                basis: `$${parseFloat(this.props.items.basis || 0).toFixed(4)}`,
                adj: `$${parseFloat(this.props.items.adjustments || 0).toFixed(4)}`,
                quan: typeof this.props.items.quantity === 'undefined' ? '' : this.props.items.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                cMonth: this.props.items.underlyingSymbol
            });
        }
        this.props.onSelectVal(this.state.date, 'tradeDate');
    }
    scrollup() {
        this.props.scrollchange();
    }
    adjustmentonFocus() {
        this.setState({ adj: this.state.adj.slice(1, this.state.adj.length) });
        this.props.scrollchange();
    }
    quantityonFocus() {
        this.setState({ quan: this.state.quan.toString().replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') });
        this.props.scrollchange();
    }
    futurePriceonFocus() {
        this.setState({ fuPrice: this.state.fuPrice.slice(1, this.state.fuPrice.length) });
        this.props.scrollchange();
    }
    baisonFocus() {
        this.setState({ basis: this.state.basis.slice(1, this.state.basis.length) });
        this.props.scrollchange();
    }

    render() {
        try {
            const {width} = Dimensions.get('window');
            const {removeTrans, items = {}, fcontract, placeholdervalues} = this.props;
            // console.log(items.underlyingSymbol);
            const a = Number(items.adjustments || 0);
            const b = Number(items.basis || 0);
            const f = Number(items.futuresPrice || 0);
            return (
                <View style={{backgroundColor: '#3d4c57', width}}>
                    <View style={{marginBottom: 15, height: 5, backgroundColor: 'black'}}/>
                    <View style={{flexDirection: 'row'}}>

                        <ExternalInput
                            focus={() => {
                                Keyboard.dismiss();
                                this.setState({show: true});
                            }}
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
                            <Text style={{fontSize: 15, color: 'white', paddingBottom: 10, alignItems: 'center'}}>Contract
                                Month *</Text>
                            <View
                                style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                    marginBottom: 10,
                                    flex: 1
                                }}
                            >
                                {/* <TextInput
                                    value={this.state.cMonth || 'CU2018'}
                                    style={{ width: 135, height: 45, paddingLeft: 10, fontSize: 15 }}
                                    placeholder='ContractMonth'
                                    //onChangeText={}
                                    onFocus={() => { Keyboard.dismiss(); this.setState({ contractFlag: true }); }}
                                />*/}
                                <Picker
                                    style={{width: 135, height: 45}}
                                    mode='dropdown'
                                    itemStyle={{height: 45}}
                                    selectedValue={this.state.cMonth}
                                    onValueChange={this.externalTrans.bind(this, 'underlyingSymbol')}
                                >
                                    {fcontract.map(item =>
                                        <Picker.Item label={item} value={item} key={item}/>)}
                                </Picker>
                                {this.contractMonthVisibility()}
                            </View>
                        </View>


                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}>Quantity *</Text>
                            <TextInput
                                placeholder='Ex: 22,000'
                                style={[styles.inputStyle]}
                                value={typeof items.quantity === 'undefined' ? '' : this.state.quan}
                                onChangeText={this.externalTrans.bind(this, 'quantity')}

                                onFocus={this.quantityonFocus.bind(this)}
                                onBlur={() => {
                                    this.setState({quan: this.state.quan.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')});
                                }}

                                keyboardType='numeric'
                                returnKeyType='done'
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Enter') {
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}> Futures Price *</Text>
                            <TextInput
                                placeholder=' $3.9550'
                                style={[styles.inputStyle]}
                                value={typeof items.futuresPrice === 'undefined' ? '' : this.state.fuPrice}
                                onChangeText={this.externalTrans.bind(this, 'futuresPrice')}
                                onFocus={this.futurePriceonFocus.bind(this)}
                                onBlur={() => {
                                    this.setState({fuPrice: this.state.fuPrice === '' ? '' : `$${parseFloat(this.state.fuPrice).toFixed(4)}`});
                                }}

                                keyboardType='numeric'
                                returnKeyType='done'
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Enter') {
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}>Basis($-/+)</Text>
                            <TextInput
                                placeholder=' $-0.2500'
                                style={[styles.inputStyle]}
                                value={typeof items.basis === 'undefined' ? '' : this.state.basis}
                                onChangeText={this.externalTrans.bind(this, 'basis')}
                                onFocus={this.baisonFocus.bind(this)}
                                onBlur={() => {
                                    this.setState({basis: this.state.basis === '' ? '' : `$${parseFloat(this.state.basis).toFixed(4)}`});
                                }}

                                keyboardType='numeric'
                                returnKeyType='done'
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Enter') {
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.containerStyle}>
                            <Text style={styles.labelStyle}> Adjustments($-/+)</Text>
                            <TextInput
                                placeholder=' $-0.0500'
                                style={[styles.inputStyle]}
                                value={typeof items.adjustments === 'undefined' ? '' : this.state.adj}
                                onChangeText={this.externalTrans.bind(this, 'adjustments')}
                                onFocus={this.adjustmentonFocus.bind(this)}
                                onBlur={() => {
                                    this.setState({adj: this.state.adj === '' ? '' : `$${parseFloat(this.state.adj).toFixed(4)}`});
                                }}

                                keyboardType='numeric'
                                returnKeyType='done'
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Enter') {
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                        </View>

                    </View>
                    <View style={{marginTop: 10, flexDirection: 'row', zIndex: -1, width}}>
                        <View style={{justifyContent: 'space-between', marginRight: 5}}>
                            <Text style={{fontSize: 15, color: 'white', paddingLeft: 20, paddingBottom: 10}}>
                                Notes </Text>
                            <View style={{
                                backgroundColor: 'white',
                                height: 50,
                                borderRadius: 5,
                                marginLeft: 20,
                                flex: 1
                            }}>
                                <TextInput
                                    value={items.notes}
                                    style={{width: 740, height: 45, paddingLeft: 20, fontSize: 15}}
                                    multiline
                                    placeholder='Sale to grain elevator in Fort Wayne for October delivery.'
                                    onChangeText={this.externalTrans.bind(this, 'notes')}
                                    onFocus={this.scrollup.bind(this)}
                                />
                            </View>
                        </View>
                        <ExternalNumberInput
                            val={isNaN((a + b + f).toFixed(4)) ? '' : `$${(a + b + f).toFixed(4).toString()}`}
                            onChange={this.externalTrans.bind(this, 'netContractPrice')}
                            label='NET Contract ($)'
                            placeholder=' $3.6550'
                            edit={false}
                            stylenp={{borderWidth: 2, borderColor: (a + b + f).toFixed(4) < 0 ? 'red' : 'green'}}
                        />
                        <View style={{height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                            <TouchableHighlight onPress={removeTrans}>
                                <Image source={minus} style={{width: 32, height: 32}}/>
                            </TouchableHighlight>
                            <Text style={{color: 'white', fontSize: 10}}>Remove</Text>
                            <Text style={{color: 'white', fontSize: 10}}>Transaction</Text>
                        </View>

                    </View>
                    <View style={{marginTop: 15, height: 5, backgroundColor: 'black'}}/>

                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const styles = {
    containerStyle: {
        height: 70,
        alignItems: 'center',
        width: '14.16%',
        marginLeft: 5,
    },
    inputStyle: {
        width: 132,
        height: 45,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 20,
        backgroundColor: 'white',
        borderRadius: 5
    },
    labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
        color: 'white',
        alignItems: 'center'
    },
    noteStyle: {
        width: '72.2%'
    }
};