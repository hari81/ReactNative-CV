import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, findNodeHandle, Keyboard } from 'react-native';
import { FarmInput } from '../../components/common';

class FarmInputFields extends Component {
    onChangeAcres(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.props.updateAcrValue(value);
        }
    }
    onChangeCost(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.props.updateCosValue(value);
        }
    }
    onChangeProfit(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.props.updateProValue(value);
        }
    }
    onChangeYield(value) {
        //const re = /^\$?\d\.?[0-9]?[0-9]?$/;
        const re = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.props.updateYieValue(value);
        }
    }

    inputFocused(refName) {
        setTimeout(() => {
            const scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(this.refs[refName]),
                250, //additionalOffset
                true
            );
        }, 50);
        switch (refName) {
            case 'profits':
                if (this.props.pro.slice(-4) === 'acre') {
                    console.log('hello1');
                    if (this.props.pro.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, (this.props.pro.length - 10)).trim().length <= 7) {
                        this.props.updateProValue(
                           this.props.pro.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, (this.props.pro.length - 10)).trim());
                    } else {
                        console.log('hello2');
                        this.props.updateProValue(
                            this.props.pro.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, 8).trim());
                    }
                }
                break;
            case 'exyield':
                if (this.props.yie.slice(-7) === 'bushels') {
                    if (this.props.yie.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, (this.props.yie.length - 8)).trim().length <= 7) {
                        this.props.updateYieValue(this.props.yie.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, (this.props.yie.length - 8)).trim());
                    } else {
                        this.props.updateYieValue(this.props.yie.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, 7).trim());
                    }
                }
                break;
            case 'cost':
                if (this.props.cos.slice(-4) === 'acre') {
                    if (this.props.cos.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, (this.props.cos.length - 10)).trim().length <= 7) {
                        this.props.updateCosValue(this.props.cos.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, (this.props.cos.length - 10)).trim());
                    } else {
                        this.props.updateCosValue(this.props.cos.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(1, 8).trim());
                    }
                }
                break;
            default:
                return;
        }
    }

    render() {
        const { acr, pro, yie, cos, updateAcrValue, updateProValue, updateCosValue, updateYieValue } = this.props;
        return (<ScrollView ref='scrollView' keyboardDismissMode='interactive' keyboardShouldPersistTaps='never'>
            <View
                style={{
                    marginRight: 30,
                    paddingLeft: 15,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: 430,
                    height: 350
                }}
            >

                <Text
                    style={{ color: 'white', marginBottom: 10, fontSize: 16 }}
                >
                    Acres Planted *
                </Text>
                <FarmInput
                    value={acr.toString()}
                    onblur={() => { 
                        if (acr !== '') {
                            updateAcrValue(`${acr.toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} acres`); 
                        }
                        if (acr.slice(-5) === 'acres') {
                            updateAcrValue(acr);
                        }  
                    }}
                    onfocus={() => {
                        if (acr.slice(-5) === 'acres') {
                        if (acr.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, (acr.length - 6)).trim().length <= 7) {
                            updateAcrValue(acr.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, (acr.length - 6)).trim());
                        } else {
                            updateAcrValue(acr.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1').slice(0, 7).trim());
                        }
                        }
                    }}
                    onChangeText={this.onChangeAcres.bind(this)}
                    placeholder='Ex: 2,500 acres'
                />
                <Text
                    style={{
                        color: 'white',
                        marginBottom: 10,
                        marginTop: 30,
                        fontSize: 16
                    }}
                >
                    Cost Per Acre *
                </Text>
                <View style={styles.containerStyle}>
                    <TextInput

                        placeholder='Ex: $75 /per acre'
                        style={styles.inputStyle}
                        value={cos}
                        onChangeText={this.onChangeCost.bind(this)}
                        onBlur={() => {
                            this.refs.scrollView.scrollToEnd();
                            if (cos !== '') {
                            updateCosValue(`$${cos.toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} /per acre`);
                            }
                            if (cos.slice(-4) === 'acre') { updateCosValue(cos); }
                        }}
                        onFocus={this.inputFocused.bind(this, 'cost')}
                        keyboardType='numeric'
                        placeholderTextColor='rgba(61,76,87, .5)'
                        ref='cost'
                        maxLength={100}
                        returnKeyType='done'
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                            Keyboard.dismiss();
                        }
                        }}
                    />
                </View>
                <Text
                    style={{
                        color: 'white',
                        marginBottom: 10,
                        marginTop: 30,
                        fontSize: 16
                    }}
                >
                    Profit Goal Per Acre *
                </Text>
                <View style={styles.containerStyle}>
                    <TextInput

                        placeholder='Ex: $75 /per acre'
                        style={styles.inputStyle}
                        value={pro}
                        onChangeText={this.onChangeProfit.bind(this)}
                        onBlur={() => {
                            this.refs.scrollView.scrollToEnd();
                            if (pro !== '') {
                                updateProValue(`$${pro.toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} /per acre`);
                            }
                            if (pro.slice(-4) === 'acre') { updateProValue(pro); }
                        }}
                        onFocus={this.inputFocused.bind(this, 'profits')}
                        keyboardType='numeric'
                        placeholderTextColor='rgba(61,76,87, .5)'
                        ref='profits'
                        maxLength={100}
                        returnKeyType='done'
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                            Keyboard.dismiss();
                        }
                        }}
                    />
                </View>

                <Text
                    style={{
                        color: 'white',
                        marginBottom: 10,
                        marginTop: 30,
                        fontSize: 16
                    }}
                >
                    Expected Yield *
                </Text>


                <View style={[styles.containerStyle, { marginBottom: 10 }]}>
                    <TextInput

                        placeholder={'Ex: 175 bushels'}
                        style={styles.inputStyle}
                        value={yie}
                        onChangeText={this.onChangeYield.bind(this)}
                        onBlur={() => {
                            this.refs.scrollView.scrollToEnd();
                            if (yie !== '') {
                                updateYieValue(`${yie.toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} bushels`);
                            }
                            if (yie.slice(-7) === 'bushels') { updateYieValue(yie); }
                        }}
                        onFocus={this.inputFocused.bind(this, 'exyield')}
                        keyboardType='numeric'
                        placeholderTextColor='rgba(61,76,87, .5)'
                        ref='exyield'
                        maxLength={100}
                        returnKeyType='done'
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                            Keyboard.dismiss();
                        }
                        }}
                    />
                </View>
            </View>
        </ScrollView>);
    }
}
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 16,
        lineHeight: 25
    },

    containerStyle: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        width: 356,
    }
};

export default FarmInputFields;

