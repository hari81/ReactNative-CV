import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Alert, Keyboard, Dimensions, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CommonHeader } from '../components/common';
import OutSideTradeSales from '../components/MyFarm/OutSideTradeSales';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import { externalGetTrans } from '../redux/actions/ExternalTrades/ExternalActions';
import { cropDataSave, myFarmCropValues, farmActionFlag } from '../redux/actions/MyFarm/CropAction';
import BasisSliderSwitch from '../components/MyFarm/BasisSliderSwitch';
import FarmInputFields from '../components/MyFarm/FarmInputFields';
import { dashBoardDataFetch } from '../redux/actions/Dashboard/DashboardAction';
import bugsnag from '../components/common/BugSnag';

 class MyFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate: 0,
      acres: '',
      profit: '',
      cost: '',
      yield: '',
      incbasis: false,
     // tradeflag: props.tradeflag || false
    };
  }
cancelMyFarm = () => {
      Keyboard.dismiss();
    const cropData = this.props.far.myFarmCropData.cropYear;
    if (/*!this.state.tradeflag*/ cropData !== null) {
     //   const cropData = this.props.far.myFarmCropData.cropYear;
    //    console.log(cropData);
        this.setState({
            acres: `${cropData.areaPlanted.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} acres`,
            profit: `$${cropData.unitProfitGoal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} per acre`,
            cost: `$${cropData.unitCost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} per acre`,
            yield: `${cropData.expectedYield.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} bushels`,
            estimate: cropData.basis,
            incbasis: cropData.includeBasis,
        });
    }
    else {
        this.setState({
            estimate: 0,
            acres: '',
            profit: '',
            cost: '',
            yield: '',
            incbasis: false
        });
    }
};
cropDataSave = () => {
    if (this.state.cost === '' || this.state.profit === '' || this.state.yield === '' || this.state.acres === '') {
        Alert.alert('Please fill all mandatory(*) fields before saving the data.');
        return;
    }
    this.props.cropDataSave(this.state);
   // this.setState({ tradeflag: false });
};

placeNewOrder() {
    const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
    const changes = this.userChangesFarmData();
    if (changes) {
        Alert.alert(
            'My Farm Data',
            'Please CANCEL or SAVE your changes prior to proceeding to the next screen.',
            [
                { text: 'GOT IT!', style: 'OK' }
           ],
            { cancelable: false }
        );
    } else {
        this.props.farmActionFlag(false);
        this.props.dashBoardDataFetch(cropButData[0].cropYear, cropButData[0].code);
        //Actions.quoteswap({ cropcode: cropButData[0].code, cropyear: cropButData[0].year });
        Actions.whatToday();
    }
}

userChangesFarmData() {
    Keyboard.dismiss();
    const presentData = this.state;
    const previousData = this.props.far.myFarmCropData.cropYear;
    if (previousData === null || previousData === undefined) {
        const localState = this.state;
        if (localState.estimate === 0 &&
            localState.acres === '' &&
            localState.profit === '' &&
            localState.cost === '' &&
            localState.yield === '' &&
            localState.incbasis === false) {
            return false;
        } 
        return true;
    }
    return (parseFloat(presentData.acres.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) !== previousData.areaPlanted ||
        parseFloat(presentData.profit.substr(1).replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) !== previousData.unitProfitGoal ||
        parseFloat(presentData.cost.substr(1).replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) !== previousData.unitCost ||
        parseFloat(presentData.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1')) !== previousData.expectedYield ||
        presentData.estimate !== previousData.basis ||
        presentData.incbasis !== previousData.includeBasis);
}
externalsales() {
    const changes = this.userChangesFarmData();
    if (changes) {
        Alert.alert(
            'My Farm Data',
            'Please CANCEL or SAVE your changes prior to proceeding to the next screen?',
            [
                { text: 'GOT IT!', style: 'OK' }
            ],
            { cancelable: false }
        );
    } else {
        this.props.externalGetTrans();
    }
}

componentWillMount() {
this.setData(this.props);
}

setData =(props) => {
   // const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
  if (Object.keys(props.far.myFarmCropData).length !== 0) {
      const cropData = props.far.myFarmCropData.cropYear;
      if (!cropData) {
          this.setState({
              acres: '',
              profit: '',
              cost: '',
              yield: '',
              estimate: 0,
              incbasis: false,
             // tradeflag: true,
          });
      } else {
              this.setState({
                  acres: `${cropData.areaPlanted.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} acres`,
                  profit: `$${cropData.unitProfitGoal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} per acre`,
                  cost: `$${cropData.unitCost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} per acre`,
                  yield: `${cropData.expectedYield.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} bushels`,
                  estimate: cropData.basis,
                  incbasis: cropData.includeBasis,
                //  tradeflag: false
              });
          }
      }
};

componentWillReceiveProps(newProps) {
    this.setData(newProps);
  //  this.props.far.userFarm = this.state;
  //  console.log('user values', this.props.far.userFarm);
}

  render() {
    try {
        const { userId, firstName, email } = this.props.acc.accountDetails;
        bugsnag.setUser(`User Id: ${userId}`, firstName, email);
        const {width, height} = Dimensions.get('window');
        const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);

        return (
            <View>
                <StatusBar barStyle='light-content' />
                <View
                    style={{
                        backgroundColor: 'black',
                        width,
                        height: 20
                    }}
                />
                <CommonHeader uservaluesfalg={this.userChangesFarmData.bind(this)}/>

                <View style={{height: 80, backgroundColor: 'rgb(64,78,89)'}}/>
                <View
                    style={[styles.farmSetUp, {width: width - 30, zIndex: 0}]}
                >
                    <View
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            borderRightColor: 'rgb(230,234,238)',
                            borderRightWidth: 3,

                        }}
                    >
                        <Text style={{ color: 'rgb(0,118,129)', fontSize: 20, paddingRight: 20, paddingLeft: 20, fontFamily: 'HelveticaNeue-Medium' }}>
                            My Farm Setup
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', height: 50, marginLeft: 0, width: 520 }}>
                        <Text style={{ fontSize: 12, color: 'rgb(159,169,186)' }}>Enter your farm information. We’ll use this information to estimate your profitability, breakeven, and risk.</Text>
                    </View>
                    <View style={{ width: '20%', height: 40, justifyContent: 'center', marginHorizontal: 20, alignItems: 'center' }}>
                        <TouchableHighlight style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#279989', justifyContent: 'center', borderRadius: 5, alignItems: 'center', borderColor: '#279989' }} onPress={this.placeNewOrder.bind(this)}>
                            <Text style={{ paddingVertical: 5, paddingHorizontal: 5, fontSize: 16, color: '#fff', fontFamily: 'HelveticaNeue' }}>NEW ORDER</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={{height: height - 270, backgroundColor: 'rgb(239,244,247)', zIndex: -1 }}>

                    <View
                        style={{
                            height: height - 310,
                            backgroundColor: '#3d4c57',
                            marginHorizontal: 16,
                            marginTop: 20,
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                marginTop: 20,
                                fontSize: 20
                            }}
                        >
                            {`My ${cropButData[0].name.toUpperCase()} ${cropButData[0].cropYear} Crop`}
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 20}}>

                            <FarmInputFields acr={this.state.acres} pro={this.state.profit} yie={this.state.yield}
                                             cos={this.state.cost}
                                             updateAcrValue={(val) => this.setState({acres: val})}
                                             updateProValue={(val) => this.setState({profit: val})}
                                             updateCosValue={(val) => this.setState({cost: val})}
                                             updateYieValue={(val) => this.setState({yield: val})}
                            />

                            <View style={{
                                marginRight: 20,
                                borderLeftWidth: 1,
                                paddingLeft: 45,
                                borderLeftColor: 'rgb(230,234,280)'
                            }}
                            >
                                <BasisSliderSwitch estim={this.state.estimate} basis={this.state.incbasis}
                                                   sliderVal={val => this.setState({estimate: val})}
                                                   switchVal={val => this.setState({incbasis: val})}
                                />
                                <OutSideTradeSales //tradeFlag={this.state.tradeflag}
                                                   gotoexternal={this.externalsales.bind(this)}/>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginLeft: 100,
                                        marginTop: 20
                                    }}
                                >
                                    <TouchableHighlight
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 40,
                                            width: 150
                                        }}
                                        onPress={this.cancelMyFarm}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{textAlign: 'center'}}>CANCEL</Text>
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
                                        onPress={this.cropDataSave}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{color: 'white'}}> SAVE </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                        <Text style={{color: 'white', paddingLeft: 16 }}> *Required</Text>
                    </View>
                </View>

                <MyCropButton uservaluesfalg={this.userChangesFarmData.bind(this)} olditem={cropButData} />
            </View>
        );
    } catch (error) {
        bugsnag.notify(error);
    }
  }
}
const styles = {
     farmSetUp: {
         height: 80,
         position: 'absolute',
         borderWidth: 1,
         borderColor: 'rgb(190, 216, 221)',
         borderTopColor: 'rgb(231,181,20)',
         borderTopWidth: 4,
         backgroundColor: 'rgb(255,255,255)',
         marginTop: 90,
         marginLeft: 15,
         marginRight: 15,
         justifyContent: 'space-around',
         flexDirection: 'row',
         alignItems: 'center',
         zIndex: 1
     }

};

const mapStatetoProps = (state) => {
  //  console.log(state.myFar);
    return { far: state.myFar, ext: state.external, cropBut: state.cropsButtons, acc: state.account };
};

export default connect(mapStatetoProps, { cropDataSave, externalGetTrans, myFarmCropValues, farmActionFlag, dashBoardDataFetch })(MyFarm);
