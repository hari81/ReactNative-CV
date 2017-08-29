/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  TouchableHighlight,
   Slider
} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import {
  LogoHeader,
  FarmInput
} from '../components/common';

import MyButtons from '../components/common/MyButtons';
import { externalGetTrans } from '../redux/actions/ExternalTrades/ExternalActions';
import { myFarmCorn2017, cropDataSave } from '../redux/actions/MyFarm/CropAction';

 class MyFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedButton: '',
      farmInput: '',
      value: '',
      estimate: 0,
      acres: '',
      profit: '',
      cost: '',
      yield: '',
      incbasis: false,
      tradeflag: props.tradeflag || false
    };
  }
cancelMyFarm = () => {
    if(!this.state.tradeflag) {
        const cropData = this.props.far.myFarmCropData.cropYear;
        console.log(cropData);
        this.setState({
            acres: cropData.areaPlanted + ' acres',
            profit: '$' + cropData.unitProfitGoal + ' /per acre',
            cost: '$' + cropData.unitCost.toString() + ' /per acre',
            yield: cropData.expectedYield + ' bushels',
            estimate: cropData.basis,
            incbasis: cropData.includeBasis,
            selectedButton: this.props.far.myFarmCropData.name,

        });
    }

}
cropDataSave = () => {
      console.log(this.state);
      //this.props.cropDataSave(this.state, this.props.far.myFarmCropData.code);
      this.setState({tradeflag: false});
}

     externalsales()
     {
         this.props.externalGetTrans();
         Actions.externalsales();
     }
    onChangeAcres(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.setState({ acres: value });
        }
    }
    onChangeCost(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.setState({ cost: value });
        }
    }
    onChangeProfit(value) {
        const re = /[0-9]+$/;
        if ((re.test(value) || value === '') && value.length <= 7) {
            this.setState({ profit: value });
        }
    }
    onChangeYield(value) {
        //const re = /^\$?\d\.?[0-9]?[0-9]?$/;
        const re = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
        if((re.test(value) || value === '') && value.length <= 7)  {
              this.setState({ yield: value });

        }
    }
    componentDidMount() {
          const cropNameYear = this.props.far.myFarmCropData.name;
          // this.setState({selectedButton: cropNameYear});
        console.log(this.props.far.myFarmCropData.name);
        console.log(this.props.far.myFarmCropData.cropYear);
          if (Object.keys(this.props.far.myFarmCropData).length !== 0) { //&& (this.props.far.myFarmCropData).constructor === Object) {
              const cropData = this.props.far.myFarmCropData.cropYear;
              if(typeof cropData ==='undefined' ) {
                  this.setState({
                      acres: '',
                      profit: '',
                      cost: '',
                      yield: '',
                      estimate: 0,
                      incbasis: false,
                      selectedButton: cropNameYear,
                      tradeflag: true

                  });

              } else {

                  if (cropData !== null) {
                      console.log(cropNameYear);
                      console.log(this.props.far.myFarmCropData);
                      this.setState({
                          acres: cropData.areaPlanted + ' acres',
                          profit: '$' + cropData.unitProfitGoal + ' /per acre',
                          cost: '$' + cropData.unitCost + ' /per acre',
                          yield: cropData.expectedYield + ' bushels',
                          estimate: cropData.basis,
                          incbasis: cropData.includeBasis,
                          selectedButton: cropNameYear,
                          tradeflag: false
                      });
                  }
                  else {
                      this.setState({
                          acres: '',
                          profit: '',
                          cost: '',
                          yield: '',
                          estimate: 0,
                          incbasis: false,
                          selectedButton: cropNameYear,
                          tradeflag: true

                      });
                  }
              }
         }
    }

    componentWillReceiveProps(newProps)
    {
            console.log('newPops', newProps.far.myFarmCropData);

            const cropData = newProps.far.myFarmCropData.cropYear;
        console.log(cropData);
        const cropNameYear = newProps.far.myFarmCropData.name;
        console.log(cropNameYear);
        if (Object.keys(newProps.far.myFarmCropData).length !== 0) { //&& (newProps.myFarmCropData).constructor === Object) {
            if(typeof cropData === 'undefined' ) {
                this.setState({
                    acres: '',
                    profit: '',
                    cost: '',
                    yield: '',
                    estimate: 0,
                    incbasis: false,
                    selectedButton: cropNameYear,
                    tradeflag: true

                });
            } else {
                if (cropData !== null) {
                    console.log(cropData);
                    this.setState({
                        acres: cropData.areaPlanted + ' acres',
                        profit: '$' + cropData.unitProfitGoal + ' /per acre',
                        cost: '$' + cropData.unitCost.toString() + ' /per acre',
                        yield: cropData.expectedYield + ' bushels',
                        estimate: cropData.basis,
                        incbasis: cropData.includeBasis,
                        selectedButton: cropNameYear,
                        tradeflag: false

                    });
                }
                else {
                    this.setState({
                        acres: '',
                        profit: '',
                        cost: '',
                        yield: '',
                        estimate: 0,
                        incbasis: false,
                        selectedButton: cropNameYear,
                        tradeflag: true

                    });
                }
            }

        }
    }

  render() {
      console.log('crops ' ,  this.props.far.myFarmCropData);
    const { width, height } = Dimensions.get('window');

    return (
        <View>
        {/*<View style={{ flex: 1, flexDirection: 'column' }}
        <StatusBar barStyle='light-content' />>*/}
        <View
          style={{
            backgroundColor: 'black',
            width,
            height: 20
          }}
        />
        <LogoHeader phNumber='+1-952-742-7414' subHeaderText='Price Hedging' />

        <View style={{ height: 80, backgroundColor: 'rgb(64,78,89)' }} />
          <View
            style={{

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
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 1

            }}
          >
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                borderRightColor: 'rgb(230,234,238)',
                borderRightWidth: 3,

              }}
            >
              <Text
                style={{
                  color: 'rgb(0,118,129)',
                  fontSize: 25,
                  paddingRight: 30,
                  paddingLeft: 20
                }}
              >
                My Farm Set up
              </Text>
            </View>
            <View
              style={{ justifyContent: 'center', height: 50, marginLeft: 30, width: 470 }}
            >
              <Text style={{ fontSize: 12, color: 'rgb(159,169,186)' }}>
                Please complete the fields below. This information will be
                used to provide you with insights about your farm in the My Farm section of the application.
              </Text>
            </View>
              <View style={{ width: 235, height: 60, justifyContent: 'center', marginLeft: 30 }}>
                  <TouchableHighlight >
                      <View style={{ width: 206, height: 32, borderRadius: 5, backgroundColor: 'rgb(39,153,137)', justifyContent: 'center', alignItems: 'center' }} >
                      <Text style={{ fontSize: 16, color: 'rgb(255,255,255)' }}>PLACE NEW ORDER NOW</Text>
                      </View>
                  </TouchableHighlight>
              </View>
          </View>

        <View style={{ height: height - 290, backgroundColor: 'rgb(239,244,247)' }}>

          <View
            style={{
              height: height - 330,
              backgroundColor: '#3d4c57',
             marginHorizontal: 16,
             marginTop: 20
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
                {`My ${this.state.selectedButton} Crop`}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View
                style={{
                  marginRight: 30,
                  borderRightWidth: 1,
                  borderRightColor: 'rgb(230,234,280)',
                  paddingLeft: 35,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: 430,
                  height: 350
                }}
              >
                <Text
                  style={{ color: 'white', marginBottom: 10, fontSize: 16 }}
                >
                  Acres Planted
                </Text>
                <FarmInput
                    value={this.state.acres.toString()}
                        onblur={() => { if (this.state.acres !== '') { this.setState({ acres: this.state.acres + ' acres' });}
                            if( this.state.acres.slice(-5) === 'acres') { this.setState({acres: this.state.acres});}  }}
                         onfocus = { () => { if(this.state.acres.slice(-5) === 'acres')
                         {this.setState({ acres: this.state.acres.slice(0, (this.state.acres.length - 6))
                          }) } }}
                           onChangeText={this.onChangeAcres.bind(this)}
                           placeholder='Ex: 2500 acres                              ' />
                <Text
                  style={{
                    color: 'white',
                    marginBottom: 10,
                    marginTop: 30,
                    fontSize: 16
                  }}
                >
                  Cost Per Acre
                </Text>
                <FarmInput
                    value= {this.state.cost}
                   onblur = {() => { if(this.state.cost !== '') {this.setState({cost: '$' +this.state.cost + ' /per acre'});}
                       if( this.state.cost.slice(-4) === 'acre') { this.setState({cost: this.state.cost});}}}
                   onfocus = { () => { if(this.state.cost.slice(-4) === 'acre')
                   {this.setState({cost: this.state.cost.slice(1,(this.state.cost.length-10))
                   })}}}
                    onChangeText = {this.onChangeCost.bind(this)}
                    placeholder='Ex: $525 /per acre              ' />
                <Text
                  style={{
                    color: 'white',
                    marginBottom: 10,
                    marginTop: 30,
                    fontSize: 16
                  }}
                >
                  Profit Goal Per Acre (dollars per acre)
                </Text>
                <FarmInput
                    value= {this.state.profit}
                    onblur = {() => { if(this.state.profit !== '') {this.setState({profit: '$' +this.state.profit + ' /per acre'});}
                    if( this.state.profit.slice(-4) === 'acre') { this.setState({profit: this.state.profit});} }}
                    onfocus = { () => { if(this.state.profit.slice(-4) === 'acre')
                   {this.setState({profit: this.state.profit.slice(1,(this.state.profit.length-10))
                   })}}}
                    onChangeText = {this.onChangeProfit.bind(this)}
                    placeholder='Ex: $75 /per acre      ' />
                <Text
                  style={{
                    color: 'white',
                    marginBottom: 10,
                    marginTop: 30,
                    fontSize: 16
                  }}
                >
                  Expected Yield
                </Text>
                <FarmInput
                    value= {this.state.yield}
                   onblur = {() => { if(this.state.yield !== '') {this.setState({ yield: this.state.yield + ' bushels' });}
                       if( this.state.yield.slice(-7) === 'bushels') { this.setState({yield: this.state.yield});}}}
                    onfocus = { () => { if(this.state.yield.slice(-7) === 'bushels')
                   {this.setState({yield: this.state.yield.slice(0,(this.state.yield.length-8))
                   })}}}
                    onChangeText = {this.onChangeYield.bind(this)}
                    placeholder='Ex: 175 bushels      ' />
              </View>
              <View style={{marginRight: 20}}>
                  <View style={{ flexDirection: 'row'}}>
                      <View style={{ width: 370, height: 118, backgroundColor: 'rgb(89,108,121)', marginRight: 5, justifyContent: 'space-around', alignItems: 'center'}}>
                         <Text
                             style={{ color: 'white', fontSize: 16 }}
                         >
                            Basis Estimate for Unsold Production (-/+)
                        </Text>
                      <Text style={[styles.slidenum, this.state.estimate > 0 ? { color: 'rgb(39,153,137)' } : { color: 'rgb(181,182,181)' }]}>
                          ${this.state.estimate.toFixed(2)}
                      </Text>
                          <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={{ fontSize: 16, color: 'white' }}>$-2.00</Text>
                              <Text style={{ fontSize: 16, color: 'white' }}>$2.00</Text>
                          </View>
                        <View style={{flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: 'white' }}>|</Text>
                      <Slider
                          style={{ width: 325 }}
                          step={.01}
                          minimumValue={-2}
                          maximumValue={2}
                          value={this.state.estimate}
                          onValueChange={slideval => this.setState({ estimate: slideval })}
                          maximumTrackTintColor='rgb(181,182,181)'
                          minimumTrackTintColor='rgb(39,153,137)'
                          thumbTintColor='rgb(181,182,181)'
                      />
                            <Text style={{ fontSize: 25, color: 'white' }}>|</Text>
                        </View>
                          </View>
                      </View>
                      <View style={{ width: 130, height: 118, backgroundColor: 'rgb(89,108,121)', justifyContent: 'center' }}>
                          <Text style={{ color: 'rgb(255,255,255)', fontSize: 10, textAlign: 'center' }}> TOGGLE ON/OFF TO
                           INCLUDE BASIS IN
                           CALCULATIONS </Text>
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                          <Text style={{ color: 'rgb(255,255,255)'}}>OFF</Text>
                              <Switch
                                  value={this.state.incbasis}
                                  style={{ marginLeft: 5, marginRight: 5 }}
                                  onTintColor='#01aca8'
                                  onValueChange = {() => this.setState({ incbasis: !this.state.incbasis })}

                              />
                          <Text style={{ color: 'rgb(255,255,255)' }}>ON</Text>
                          </View>
                      </View>
                      </View >
                    <View style={{ width: 505, height: 168, backgroundColor: 'rgb(89,108,121)', marginTop: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: 'white', fontSize: 19 }}>
                  Trades / Sales Outside the App
                </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent:'space-between', alignItems: 'flex-end' }}>
                                <Text
                                    style={{ color: 'white', marginBottom: 10, fontSize: 19 }}
                                 >
                                    Total
                                </Text>
                                <Text style={{ color: 'white', fontSize: 19 }}>
                                    Average Price
                                </Text>

                            </View>
                            <View style={{ justifyContent:'space-between', marginLeft: 20 }}>
                                <Text
                                    style={{ color: 'white', marginBottom: 10, fontSize: 19 }}
                                >
                                    50,000 bushels
                                </Text>
                                <Text style={{ color: 'white', fontSize: 19 }}>
                                    $3.90 per bushel
                                </Text>
                            </View>
                        </View>

                <TouchableHighlight
                  style={ [{

                    borderRadius: 5,
                    height: 40,
                    width: 300,
                    backgroundColor: 'rgb(39,153,137)'
                  }, this.state.tradeflag ? {backgroundColor: 'rgb(139,153,137)'} : {}]}
                  disabled={this.state.tradeflag}
                  onPress = {this.externalsales.bind(this)}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >

                    <Text style={{ color: 'white' }}>
                      ADD / MODIFY TRADES / SALES
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
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
                    onPress={ this.cancelMyFarm}
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
                    onPress = {this.cropDataSave}
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
            </View>
          </View>
        </View>

            <MyButtons values={this.state}/>
        </View>
    );
  }
}
const styles = {
  buttonStyle: {
    width: 150,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10
  },
  yearCrop: {
    fontSize: 15
  },
  cropType: {
    fontSize: 25
  },

    slidenum: {
        fontSize: 20,
        textAlign: 'center',

    },

};

const mapStatetoProps = (state) => {
    console.log(state.myFar);
    return { far: state.myFar, ext: state.external };
}

export default connect(mapStatetoProps, { externalGetTrans, myFarmCorn2017 })(MyFarm);


