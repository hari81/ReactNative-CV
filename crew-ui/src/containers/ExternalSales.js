import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight, Alert, Dimensions, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import cancel from '../components/common/img/Cancel.png';
import plus from '../components/common/img/Plus.png';
import { myFarmTradeSalesOutSideApp, myFarmCropValues } from '../redux/actions/MyFarm/CropAction';
import ExternalValues from '../components/ExternalTrades/ExternalValues';
import { externalGetTrans, saveExternalTrades } from '../redux/actions/ExternalTrades/ExternalActions';
import { dashBoardDataFetch } from '../redux/actions/Dashboard/DashboardAction';
import bugsnag from '../components/common/BugSnag';

class ExternalSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: [{}]
        };
        this.valueUpdate = this.valueUpdate.bind(this);
    }

    addNewTransaction = () => {
        this.refs.scrollView.scrollTo({ x: 0, y: this.state.transaction.length * 210, animated: true });
        this.setState({ transaction: [...this.state.transaction, {}] });
    };

    scrollUpdate(index) {
        this.refs.scrollView.scrollTo({ x: 0, y: index * 210, animated: true });
    }

    valueUpdate(index, val, trans) {

        const newTransaction = this.state.transaction.map((t, i) => {
            if (i === index) {
                return Object.assign({}, t, { [trans]: val });
            }
            return t;
        });
        //this.setState({ transaction: newTransaction }, () => console.log(this.state.transaction));
        this.setState({ transaction: newTransaction });
    }

    componentWillMount() {
        this.setState({ transaction: JSON.parse(JSON.stringify(this.props.extra.tradeData.trades || [{}])) });
    }

    componentDidMount() {
        this.setState({ transaction: JSON.parse(JSON.stringify(this.props.extra.tradeData.trades || [{}])) });
    }

    removeTransaction(index) {
        let newTransaction = this.state.transaction;
        if (this.state.transaction[index].active) {
            newTransaction = this.state.transaction.filter((t, i) => index !== i);
           // console.log(newTransaction);
            setTimeout(() => {
                this.setState({ transaction: [] });
                this.setState({ transaction: newTransaction });
            }, 0);
        } else {
            newTransaction = this.state.transaction.filter((t, i) => index !== i);
            setTimeout(() => {
                this.setState({ transaction: [] });
                this.setState({ transaction: newTransaction });
            }, 0);
        }
    }

    cancelButtonClick() {
       this.setState({ transaction: [] });
        setTimeout(() => {
            this.setState({ transaction: JSON.parse(JSON.stringify(this.props.extra.tradeData.trades)) });
            this.refs.scrollView.scrollTo({ y: 0, animated: true });
        }, 0);
    }

    saveTransactions() {
        const tradeData = this.state.transaction;
        // console.log(tradeData.length);
        // console.log(this.props.extra.tradeData.trades);
        if (tradeData.length > 0) {
            for (let i = 0; i < tradeData.length; i++) {
                if (tradeData[i].active || tradeData[i].active === undefined) {
                    if (tradeData[i].tradeDate === undefined || tradeData[i].tradeDate === '') {
                        tradeData[i].tradeDate = new Date();
                    }
                    if (tradeData[i].underlyingSymbol === '' || tradeData[i].underlyingSymbol === undefined) {
                        tradeData[i].underlyingSymbol = this.props.underlying[0];
                    }
                    if (tradeData[i].quantity === '' || tradeData[i].futuresPrice === '' ||
                        tradeData[i].quantity === undefined || tradeData[i].futuresPrice === undefined) {
                        Alert.alert('Please fill all mandatory(*) fields before saving the data.');
                        return;
                    }
                }
            }
        } else if (this.state.transaction.length === 0 && this.props.extra.tradeData.trades.length === 0) {
            Alert.alert('No transctions to Save .');
            return;
        }
       // console.log(this.props.extra.tradeData.trades[0]);
       // console.log(Object.keys(this.props.extra.tradeData.trades[0])[0]);
        if (this.state.transaction.length === 0 && this.props.extra.tradeData.trades.length === 1 && Object.keys(this.props.extra.tradeData.trades[0]).length === 0) {
            Alert.alert('Make Sure add one transaction with values');
            return;
        }
       // console.log(this.state.transaction, this.props.extra.tradeData.trades);
        this.props.saveExternalTrades(this.state.transaction);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ transaction: JSON.parse(JSON.stringify(nextProps.extra.tradeData.trades || [{}])) });
    }

    externalCropYearName() {
        const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        return (`${cropData[0].name.toUpperCase()} ${cropData[0].cropYear}`);
    }

    backToDashboardMyfarm = () => {
        if (this.props.extra.exflag) {
            if (this.checkUpdates()) {
                Alert.alert(
                    'Trade Data',
                    'Please CANCEL or SAVE your changes prior to proceeding to the next screen.',
                    [
                        { text: 'GOT IT!', style: 'OK' }
                    ],
                    { cancelable: false }
                );
            } else {
                const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
                this.props.dashBoardDataFetch(cropData[0].cropYear, cropData[0].code);
                Actions.dashboard();
            }
        } else {
            if (this.checkUpdates()) {
                Alert.alert(
                    'Trade Data',
                    'Please CANCEL or SAVE your changes prior to proceeding to the next screen.',
                    [
                        { text: 'GOT IT!', style: 'OK' }
                    ],
                    { cancelable: false }
                );
            } else {

                const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
                this.props.myFarmCropValues(cropData[0].code, cropData[0].cropYear);
                this.props.myFarmTradeSalesOutSideApp(cropData[0].code, cropData[0].cropYear);
                Actions.myfarm();
            }
        }
    };

    checkUpdates() {
        const userAdded = this.state.transaction.filter(t => t.active === undefined);
      //  console.log('userAdded', userAdded);
      //  console.log(this.state.transaction);
        const tradeData = this.state.transaction.filter(item => item.active === true);
      //  console.log(tradeData);

       const resultCheck = tradeData.map(item => {
           const oldTradeData = this.props.extra.tradeData.trades.filter(trade => trade.id === item.id);
           return JSON.stringify(item) === JSON.stringify(oldTradeData[0]);
       });

        const modified = resultCheck.filter(flag => !flag);
      //  console.log(userAdded.length);
        if (userAdded.length === 1 && Object.keys(userAdded[0]).length === 0 && modified.length === 0) {
            return false;
        }
        if (userAdded.length === 1 && Object.keys(userAdded[0]).length === 1 && modified.length === 0 && Object.keys(userAdded[0])[0] === 'tradeDate') {
            return false;
        }

        if (userAdded.length > 0 || modified.length > 0 || tradeData.length !== this.props.extra.tradeData.trades.length) {
            return true;
        }
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const { width, height } = Dimensions.get('window');
            const fc = this.props.underlying;

            return (
                <View style={{ width, height, backgroundColor: 'rgb(29,37,49)' }}>
                    <StatusBar barStyle='light-content' />
                    <View style={{ height: 52, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', marginTop: 15, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, color: 'white', paddingRight: 10, paddingBottom: 5 }}>Close</Text>
                        <TouchableHighlight onPress={this.backToDashboardMyfarm}>
                            <Image source={cancel} style={{ width: 32, height: 32 }} />
                        </TouchableHighlight>
                    </View>

                    <View style={{ height: 100, justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, color: 'white', paddingBottom: 20 }}>{this.externalCropYearName()} Trades Outside the App</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: 'white', paddingTop: 10, paddingLeft: 20, paddingRight: 40 }}>Enter cash contracts and trades with a broker. We’ll use this information to estimate your profitability, breakeven and risk.</Text>
                            </View>
                            <View style={{ marginRight: 25 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableHighlight onPress={this.addNewTransaction}>
                                        <Image source={plus} style={{ width: 32, height: 32 }} />
                                    </TouchableHighlight>
                                    <Text style={{ color: 'white', fontSize: 10 }}>Add</Text>
                                    <Text style={{ color: 'white', fontSize: 10 }}>Transaction</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <ScrollView vertiacl showsVerticalScrollIndicator ref='scrollView' removeClippedSubviews>
                        {this.state.transaction
                        // .filter(item => item.active === undefined || item.active)
                            .map((item, index) => (<ExternalValues
                                    key={index} item={index}
                                    onSelectVal={this.valueUpdate.bind(this, index)}
                                    removeTrans={this.removeTransaction.bind(this, index)}
                                    items={item}
                                    placeholdervalues={this.props.extra.tradeData.tradeTemplate}
                                    ref={`ref${index}`}
                                    scrollchange={this.scrollUpdate.bind(this, index)}
                                    fcontract={fc}
                                />)
                            )}
                    </ScrollView>


                    <View style={{ flexDirection: 'row' }}>
                            
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'white', paddingLeft: 16 }}> *Required</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', height: 100, justifyContent: 'flex-end', marginRight: 100, alignItems: 'center' }}>
                            <TouchableHighlight
                                style={{ backgroundColor: 'white', borderRadius: 5, height: 40, width: 150 }}
                                onPress={this.cancelButtonClick.bind(this)}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{textAlign: 'center'}}>CANCEL</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                style={{ marginLeft: 20, backgroundColor: '#279989', borderRadius: 5, height: 40, width: 150 }}
                                onPress={this.saveTransactions.bind(this)}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{color: 'white'}}>SAVE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const mapStateToProps = (state) => {
    const crop = state.account.defaultAccount.commodities.filter(item => item.commodity === state.cropsButtons.selectedId.slice(0, state.cropsButtons.selectedId.length - 4));
    const fcon = crop[0].crops.filter(item => item.cropYear == state.cropsButtons.selectedId.slice(-4))[0].futuresContracts;
    const featureContract = fcon.map(item => item.symbol);
    return { far: state.myFar,
        extra: state.external,
        cropBut: state.cropsButtons,
        underlying: featureContract,
        id: state.cropsButtons.selectedId,
        acc: state.account
    };
};

export default connect(mapStateToProps, { externalGetTrans, saveExternalTrades, myFarmTradeSalesOutSideApp, myFarmCropValues, dashBoardDataFetch })(ExternalSales);

