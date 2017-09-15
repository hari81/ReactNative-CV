/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  TouchableHighlight,
   Slider, Alert, Keyboard, ScrollView, findNodeHandle, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import {
  LogoHeader,
  FarmInput
} from '../components/common';

import OutSideTradeSales from '../components/MyFarm/OutSideTradeSales';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import { externalGetTrans } from '../redux/actions/ExternalTrades/ExternalActions';
import { cropDataSave, myFarmCropValues } from '../redux/actions/MyFarm/CropAction';
import BasisSliderSwitch from '../components/MyFarm/BasisSliderSwitch';

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
      tradeflag: props.tradeflag || false,
        flag: false,
        marTop: 0
    };
  }
cancelMyFarm = () => {
      Keyboard.dismiss();
    if(!this.state.tradeflag) {
        const cropData = this.props.far.myFarmCropData.cropYear;
    //    console.log(cropData);
        this.setState({
            acres: cropData.areaPlanted.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' acres',
            profit: '$' + cropData.unitProfitGoal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre',
            cost: '$' + cropData.unitCost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre',
            yield: cropData.expectedYield.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' bushels',
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

}
cropDataSave = () => {
    //  console.log(this.state);
    if (this.state.cost === '' || this.state.profit === '' || this.state.yield === '' || this.state.acres === '' ) {
        Alert.alert('Values are missing, Please make sure fill all TextInputs with Numbers');
      //  console.log('Values are missing, Please fill all TextInputs');
        return;
    }
    //const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
    this.props.cropDataSave(this.state);

      this.setState({ tradeflag: false });
}

     externalsales()
     {
         this.props.externalGetTrans();

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
     _keyboardDidShow () {
         alert('Keyboard Shown');
     }

     _keyboardDidHide () {
         alert('Keyboard Hidden');
         this.refs.scrollView.scrollToEnd();

     }

     componentWillMount() {
      this.setData(this.props);
        /*.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);*/
    }

        setData =(props) => {
         // const cropNameYear = props.far.myFarmCropData.name;
          // this.setState({selectedButton: cropNameYear});
            const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        //console.log('cropName',props.far.myFarmCropData.name);
       // console.log('year',props.far.myFarmCropData.cropYear);
          if (Object.keys(props.far.myFarmCropData).length !== 0) { //&& (props.far.myFarmCropData).constructor === Object) {
              const cropData = props.far.myFarmCropData.cropYear;
              if( !cropData ) {
                  this.setState({
                      acres: '',
                      profit: '',
                      cost: '',
                      yield: '',
                      estimate: 0,
                      incbasis: false,
                    //  selectedButton: cropNameYear,
                      tradeflag: true

                  });

              } else {
                     // console.log(cropNameYear);
                      //console.log(this.props.far.myFarmCropData);
                      this.setState({
                          acres: cropData.areaPlanted.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' acres',
                          profit: '$' + cropData.unitProfitGoal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre',
                          cost: '$' + cropData.unitCost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre',
                          yield: cropData.expectedYield.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' bushels',
                          estimate: cropData.basis,
                          incbasis: cropData.includeBasis,
                         // selectedButton: cropNameYear,
                          tradeflag: false
                      });
                  }

              }

    }

    componentWillReceiveProps(newProps)
    {
        this.setData(newProps);
    }
     inputFocused (refName) {
      console.log('scroll');
         setTimeout(() => {
             let scrollResponder = this.refs.scrollView.getScrollResponder();
             scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                 findNodeHandle(this.refs[refName]),
                 250, //additionalOffset
                 true
             );
         }, 50);
        switch(refName) {
            case 'profits':
                if (this.state.profit.slice(-4) === 'acre') {
                    if (this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, (this.state.profit.length - 10)).trim().length <= 7) {
                        this.setState({
                            profit: this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, (this.state.profit.length - 10)).trim()
                        })
                    } else {
                        this.setState({
                            profit: this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, 8).trim()
                        })
                    }
                }
                break;
            case 'exyield':
                if(this.state.yield.slice(-7) === 'bushels'){
                    if(this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,(this.state.yield.length-8)).trim().length <= 7){
                        this.setState({yield: this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,(this.state.yield.length-8)).trim()})} else {
                        this.setState({yield: this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,7).trim()})
                    }
                }
                break;
        }
     }

  render() {

    const { width, height } = Dimensions.get('window');
      const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);

    return (
        <View
           // style={this.state.flag ? { marginTop: this.state.marTop} : {}}
        >
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

        <View style={{ height: height - 275, backgroundColor: 'rgb(239,244,247)' }}>

          <View
            style={{
              height: height - 315,
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
                {`My ${cropButData[0].name.toUpperCase()} ${cropButData[0].cropYear} Crop`}
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
                  <ScrollView ref='scrollView' keyboardDismissMode='interactive' keyboardShouldPersistTaps='never'>
                <Text
                  style={{ color: 'white', marginBottom: 10, fontSize: 16 }}
                >
                  Acres Planted *
                </Text>
                <FarmInput
                    value={this.state.acres.toString()}
                        onblur={() => { if (this.state.acres !== '') { this.setState({ acres: this.state.acres.toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' acres' });}
                            if( this.state.acres.slice(-5) === 'acres') { this.setState({acres: this.state.acres});}  }}
                         onfocus = { () => { if(this.state.acres.slice(-5) === 'acres') {
                            if( this.state.acres.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0, (this.state.acres.length - 6)).trim().length <=7 ){
                                this.setState({ acres: this.state.acres.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0, (this.state.acres.length - 6)).trim()})
                            }else

                         {this.setState({ acres: this.state.acres.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0, 7).trim()
                          }) } }}}
                           onChangeText={this.onChangeAcres.bind(this)}
                           placeholder='Ex: 2,500 acres                              ' />
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
                <FarmInput
                    value= {this.state.cost.toString()}
                   onblur = {() => { this.setState({flag: false, marTop: 0});if(this.state.cost !== '') {this.setState({cost: '$' +this.state.cost.toString()
                       .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre'});}
                       if( this.state.cost.slice(-4) === 'acre') { this.setState({cost: this.state.cost});}}}
                   onfocus = { () => {this.setState({flag: true, marTop: -100}); if(this.state.cost.slice(-4) === 'acre'){
                       if(this.state.cost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1,(this.state.cost.length-10)).trim().length <=7){
                           this.setState({cost: this.state.cost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, (this.state.cost.length - 10)).trim()})
                       }else {
                           this.setState({cost: this.state.cost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, 8).trim()});
                       }
                   }}}
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
                  Profit Goal Per Acre *
                </Text>
                      <View style={styles.containerStyle}>
                          <TextInput

                              placeholder = 'Ex: $75 /per acre               '
                              style={styles.inputStyle}
                              value={this.state.profit}
                              onChangeText={this.onChangeProfit.bind(this)}
                              onBlur = {() => {this.setState({flag: false, marTop: 0}); if(this.state.profit !== '') {this.setState({profit: '$' +this.state.profit.toString()
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre'});}
                                  if( this.state.profit.slice(-4) === 'acre') { this.setState({profit: this.state.profit});} }}

                              onFocus = { this.inputFocused.bind(this, 'profits')}
                              keyboardType = 'numeric'
                              placeholderTextColor = 'rgba(61,76,87, .5)'
                              ref= 'profits'

                          />
                      </View>


                      {/*<FarmInput
                    value= {this.state.profit}
                    onblur = {() => {this.setState({flag: false, marTop: 0}); if(this.state.profit !== '') {this.setState({profit: '$' +this.state.profit.toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' /per acre'});}
                    if( this.state.profit.slice(-4) === 'acre') { this.setState({profit: this.state.profit});} }}
                    onfocus = { () => {this.setState({flag: true, marTop: -200}); if(this.state.profit.slice(-4) === 'acre'){
                   if(this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1,(this.state.profit.length-10)).trim().length<=7) {
                       this.setState({
                           profit: this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, (this.state.profit.length - 10)).trim()
                       })
                   }else {
                       this.setState({
                           profit: this.state.profit.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(1, 8).trim()
                       })
                   }}}}
                    onChangeText = {this.onChangeProfit.bind(this)}
                    placeholder='Ex: $75 /per acre               ' />*/}
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


                      <View style={styles.containerStyle}>
                      <TextInput

                          placeholder={'Ex: 175 bushels                '}
                          style={styles.inputStyle}
                          value={this.state.yield}
                          onChangeText={this.onChangeYield.bind(this)}
                          onBlur = {() => { this.setState({flag: false, marTop: 0});if(this.state.yield !== '') {this.setState({ yield: this.state.yield.toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' bushels' });}
                              if( this.state.yield.slice(-7) === 'bushels') { this.setState({yield: this.state.yield});}}}
                          onFocus = { this.inputFocused.bind(this, 'exyield')}
                          keyboardType = 'numeric'
                          placeholderTextColor = 'rgba(61,76,87, .5)'
                            ref = 'exyield'
                      />
                    </View>



                      {/* <FarmInput
                    value= {this.state.yield}

                   onblur = {() => { this.setState({flag: false, marTop: 0});if(this.state.yield !== '') {this.setState({ yield: this.state.yield.toString()
                       .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' bushels' });}
                       if( this.state.yield.slice(-7) === 'bushels') { this.setState({yield: this.state.yield});}}}
                    onfocus = { () => {this.setState({flag: true, marTop: -250});  if(this.state.yield.slice(-7) === 'bushels'){
                        if(this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,(this.state.yield.length-8)).trim().length <= 7){
                   this.setState({yield: this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,(this.state.yield.length-8)).trim()})} else {
                                this.setState({yield: this.state.yield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1").slice(0,7).trim()})
                            }
                  }}}
                    onChangeText = {this.onChangeYield.bind(this)}
                    placeholder='Ex: 175 bushels                ' /> */}
                  </ScrollView>
              </View>
              <View style={{marginRight: 20}}>
                  <BasisSliderSwitch estim={this.state.estimate} basis={this.state.incbasis}
                                     sliderVal={val => this.setState({estimate: val})}
                                    switchVal={val => this.setState({incbasis: val})}/>
                  <OutSideTradeSales tradeFlag={this.state.tradeflag} />
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

            <MyCropButton />
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
testStyle: {
    color: 'white',
    marginBottom: 10,
    marginTop: 30,
    fontSize: 16
},
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

const mapStatetoProps = (state) => {
  //  console.log(state.myFar);
    return { far: state.myFar, ext: state.external, cropBut: state.cropsButtons };
};

export default connect(mapStatetoProps, { cropDataSave, externalGetTrans, myFarmCropValues })(MyFarm);


