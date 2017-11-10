import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import cancel from '../../components/common/img/Cancel.png';
import FooterBar from './FooterBar';
import st from '../../Utils/SafeTraverse';
import { Button } from '../common/Button';
import * as common from '../../Utils/common';
import bugsnag from '../../components/common/BugSnag';

class IncrementSettingBar extends Component {
    constructor() {
        super();
        this.state = {
           showBlock: false,
            yieldIncrement: '',
            priceIncrement: '',
            selectedYieldIncrement: '',
            selectedPriceIncrement: ''
        };
    }
    componentWillMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)));
        this.setState({ selectedPriceIncrement: crop[0].matrixPriceIncrement, selectedYieldIncrement: crop[0].matrixYieldIncrement });
    }

    showIncrementSettingsBlock = () => {
        if (this.state.showBlock) {
            return (
                <View style={{ zIndex: 10, marginTop: -(height * 0.41), marginLeft: -(width * 0.19), height: height * 0.40, width: width * 0.19, alignContent: 'center', alignItems: 'center', backgroundColor: 'rgb(39,49,66)' }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 5, marginRight: 5 }} onPress={() => this.setState({ showBlock: false })}>
                        <Image source={cancel} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', paddingTop: height * 0.02 }}>Yield Increment</Text>
                    {this.yieldBlocks(1)}
                    {this.yieldBlocks(5)}
                    {this.yieldBlocks(10)}
                    <Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', paddingTop: height * 0.04 }}>Price Increment</Text>
                    {this.priceBlocks(0.05)}
                    {this.priceBlocks(0.10)}
                    {this.priceBlocks(0.25)}
                </View>
            );
        }
    }
    selectedYieldIncrement = (val) => {
        this.setState({ selectedYieldIncrement: val });
    }
    selectedPriceIncrement = (val) => {
        this.setState({ selectedPriceIncrement: val });
    }
    yieldBlocks =(val) => {
        return (
            <Button buttonStyle={this.state.selectedYieldIncrement === val ? { height: 21, width: 95, borderWidth: 1, borderColor: 'rgb(1,172,168)', backgroundColor: 'rgb(1,172,168)', marginTop: height * 0.01 } : { height: 21, width: 95, borderWidth: 1, borderColor: 'rgb(1,172,168)', marginTop: height * 0.01 }} textStyle={{ color: 'white', paddingLeft: 10 }} onPress={this.selectedYieldIncrement.bind(this, val)}>
                {val } {val === 1 ? 'bushel' : 'bushels'}
            </Button>
        );
    }
    priceBlocks =(val) => {
        return (
            <Button buttonStyle={this.state.selectedPriceIncrement === val ? { height: 21, width: 95, borderWidth: 1, borderColor: 'rgb(1,172,168)', backgroundColor: 'rgb(1,172,168)', marginTop: height * 0.01 } : { height: 21, width: 95, borderWidth: 1, borderColor: 'rgb(1,172,168)', marginTop: height * 0.01 }} textStyle={{ color: 'white', paddingLeft: 10 }} onPress={this.selectedPriceIncrement.bind(this, val)}>
                {'$ ' + val.toFixed(2)}
            </Button>
        );
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View>
                    <View style={styles.container}>

                        <View style={{marginLeft: width * 0.36, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'rgb(255,255,255)', fontSize: 18, fontFamily: 'HelveticaNeue'}}>Your
                                Profit Goal:</Text>
                        </View>
                        <View style={{marginLeft: width * 0.003, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                fontSize: 28,
                                fontFamily: 'HelveticaNeue'
                            }}>{common.minusBeforeDollarSign(this.props.unitProfitGoal, 0)}</Text>
                        </View>
                        <Button 
                            buttonStyle={{ marginLeft: width * 0.28, height: height * 0.044, width: width * 0.156, backgroundColor: 'rgba(82,97,115,0.37)', justifyContent: 'center', alignItems: 'center' }} 
                            textStyle={{ color: 'rgb(255,255,255)', fontSize: 14, fontFamily: 'HelveticaNeue' }}
                            onPress={() => this.setState({ showBlock: !this.state.showBlock })}
                        >
                            Increments
                        </Button>
                        {this.showIncrementSettingsBlock()}

                    </View>
                    <FooterBar yieldIncrement={this.state.selectedYieldIncrement} priceIncrement={this.state.selectedPriceIncrement} />
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { height, width } = Dimensions.get('window');
const styles = {
    container: {
        height: height * 0.07,
        backgroundColor: 'rgb(39,49,66)',
        flexDirection: 'row',

    }
};
const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        id: state.cropsButtons.selectedId,
        acc: state.account,
        unitProfitGoal: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unitProfitGoal']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unitProfitGoal']))
    };
};
export default connect(mapStateToProps, null)(IncrementSettingBar);
