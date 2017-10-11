
import React, { Component } from 'react';
import {
  FlatList,
  View,
  SegmentedControlIOS,
  Text,
  TouchableHighlight,
  Picker
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ViewOrders from '../components/Orders/ViewOrders';
import OpenPositions from '../components/Orders/OpenPositions';
import ClosedPositions from '../components/Orders/ClosedPositions';
import { logOut } from '../redux/actions/index';
import { Spinner, LogoPhoneHeader } from '../components/common';
import {
  ViewOrdersData,
  dropDownCrop,
  selectedCrop
} from '../redux/actions/OrdersAction/ViewOrderAction';
import { OpenPositionsData } from '../redux/actions/OrdersAction/OpenPositions';
import { ClosedPositionsData } from '../redux/actions/OrdersAction/ClosedPositions';
import st from '../Utils/SafeTraverse';

//const openpositions = require('../restAPI/openpositions.json');
//const closedpositions = require('../restAPI/closedpositions.json');

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.selectedTab || 'Open Orders',
      Crop: props.Crop || 'C'
    };
  }
  componentDidMount() {
      this.props.dropDownCrop();
    const crop = this.state.Crop;
 //   console.log(crop);
      switch (this.state.selectedTab) {
          case 'Open Orders':
              this.props.ViewOrdersData(crop);
              break;
          case 'Open Positions':
              this.props.OpenPositionsData(crop);
              break;
          case 'Closed Positions':
              this.props.ClosedPositionsData(crop);
              break;
          default:

      }
  }


    refreshData = () => {
        const crop = this.state.Crop;
        switch (this.state.selectedTab) {
            case 'Open Orders':
                this.props.ViewOrdersData(crop);
                break;
            case 'Open Positions':
                this.props.OpenPositionsData(crop);
                break;
            case 'Closed Positions':
                this.props.ClosedPositionsData(crop);
                break;
            default:
                console.log('Something wrong');
        }
    };

  dropDown(cropCode) {
   // console.log(cropCode);

    this.setState({ Crop: cropCode });

    switch (this.state.selectedTab) {
        case 'Open Orders':
        this.props.ViewOrdersData(cropCode);

        break;
        case 'Open Positions':
            this.props.OpenPositionsData(cropCode);
            break;
        case 'Closed Positions':
            this.props.ClosedPositionsData(cropCode);
            break;
        default:
    }
  }

    pickerValues() {
        return (this.props.viewOrders.dropDownData || []).map((item) => (
            <Picker.Item label={item.name} value={item.code} key={item.code} />));
    }

    selectedTabOrder = (val) => {
        this.setState({ selectedTab: val });
        switch (val) {
            case 'Open Orders':
                this.props.ViewOrdersData(this.state.Crop);
                break;
            case 'Open Positions':
                this.props.OpenPositionsData(this.state.Crop);
                break;
            case 'Closed Positions':
                this.props.ClosedPositionsData(this.state.Crop);
                break;
            default:
                console.log('Select Wrong');
        }
    };

  renderFlatList() {
    if (this.props.viewOrders.fetchflag) {
          return (
              <View
                  style={{ justifyContent: 'center', flexDirection: 'column' }}
              >
                  <Text
                      style={{
                          marginTop: 30,
                          color: 'white',
                          textAlign: 'center',
                          fontSize: 25,
                          marginBottom: 30
                      }}
                  >
                      { this.state.selectedTab === 'Open Orders' ? 'Loading orders...' : this.state.selectedTab === 'Open Positions' ?
                      'Loading open positions...' : 'Loading closed positions...' }

                  </Text>
                  <Spinner size='large' />
              </View>);
    }

    if (this.state.selectedTab === 'Open Orders') {
      //console.log('Orders Button Pressed');
      if (!st(this.props, ['viewOrders', 'items', 'value', 'length'])) {
        return (
          <View
            style={{

              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Text
              style={{
                marginTop: 30,
                color: 'white',
                textAlign: 'center',
                fontSize: 25
              }}
            >
               No Orders Available!.
            </Text>
          </View>
        );
      } else {
        return (
          <FlatList
            data={this.props.viewOrders.items.value}
            keyExtractor={item => item.orderId}
            renderItem={({ item }) =>
              <ViewOrders key={item.orderId} item={item} selected={this.state.Crop} />}
          />
        );
      }
    }
    if (this.state.selectedTab === 'Open Positions') {
        //console.log('Open Positions Pressed');
        if (!st(this.props, ['openPositions', 'length'])) {

            return (
                <View
                    style={{

                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Text
                        style={{
                            marginTop: 30,
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 25
                        }}
                    >
                        No Open Positions Available!.
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.openPositions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <OpenPositions key={item.id} item={item} />}
                    //onEndReached
                />
            );
       }
    }
    if (this.state.selectedTab === 'Closed Positions') {
      // console.log('Closed Positions Pressed');

      if (this.props.closedPositions.length === 0) {
        return (
          <Text
            style={{
              marginTop: 50,
              color: 'white',
              textAlign: 'center',
              fontSize: 25
            }}
          >
            No Closed Positions.
          </Text>
        );
      } else {
        return (
          <FlatList
            data={this.props.closedPositions}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <ClosedPositions key={item.id} item={item} />}
          />
        );
      }
    }
  }
    placeNewOrder() {
        const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        Actions.quoteswap({ cropcode: cropButData[0].code, cropyear: cropButData[0].year });
    }


  render() {
    const { width, height } = Dimensions.get('window');
    //console.log(width, height)
    return (
        <View style={{ width, height }}>
        <View
          style={{
            backgroundColor: 'black',
            width,
            height: 20
          }}
        />
        <LogoPhoneHeader refresh={this.refreshData} />

        <View style={{ height: 80, backgroundColor: 'rgb(64,78,89)' }} />

          <View
              style={{
                  width: width - 20,
                  height: 100,
                  borderTopColor: 'rgb(231,181,20)',
                  borderTopWidth: 3,
                  backgroundColor: 'white',
                  marginTop: 80,
                  marginHorizontal: 10,
                  position: 'absolute',
                  zIndex: 1,
              }}
          >

          <View style={styles.positions}>
            <Text style={{ fontSize: 20, color: 'rgb(0,118,129)', paddingTop: 10, fontFamily: 'HelveticaNeue-Medium', paddingLeft: 20 }}>
              Positions & Orders
            </Text>
          </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View
                      style={{
                          width: '15%',
                          marginLeft: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10
                      }}
                  ><Text style={{ paddingTop: 10, fontSize: 10, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(0,118,129)' }}>Select Commodity ▼</Text>
                      <Picker
                          style={{ width: 150, height: 55, marginTop: -10, borderColor: 'rgb(39,153,137)' }}
                          // this.state.Crop === 'C' ? { backgroundColor: '#fff8dc' } : this.state.Crop === 'S' ? {backgroundColor: '#665847'} : {backgroundColor: '#f5deb3'}]}
                          mode='dropdown'
                          itemStyle={{ height: 48, borderColor: 'rgb(39,153,137)' }}
                          selectedValue={this.state.Crop}
                          onValueChange={this.dropDown.bind(this)}
                      >

                          {this.pickerValues()}

                      </Picker>
                  </View>
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <SegmentedControlIOS
              alignItems='center'
              tintColor='rgb(39,153,137)'
              style={[styles.segment, { width: width / 2 }]}
              values={['Open Orders', 'Open Positions', 'Closed Positions']}
              selectedIndex={{ 'Open Orders': 0,
                  'Open Positions': 1,
                  'Closed Positions': 2
                }[this.state.selectedTab]}
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                });
              }}
              onValueChange={this.selectedTabOrder}
            />
          </View>
                  <View style={{ width: '20%', justifyContent: 'center', marginLeft: 45, marginRight: 25 }}>
                  <TouchableHighlight onPress={this.placeNewOrder.bind(this)}>
                      <View style={{ width: 206, height: 32, borderRadius: 5, backgroundColor: 'rgb(39,153,137)', justifyContent: 'center', alignItems: 'center' }} >
                          <Text style={{ fontSize: 16, color: 'rgb(255,255,255)' }}>PLACE NEW ORDER NOW</Text>
                      </View>
                  </TouchableHighlight>
              </View>
          </View>
          </View>
            <View style={{ backgroundColor: 'rgb(239,244,247)', height: height - 118 }}>
                <View style={{ backgroundColor: '#3d4c57', height: 50, marginLeft: 10, marginRight: 10 }} />
          <View style={{ backgroundColor: '#3d4c57', height: height - 180, marginLeft: 10, marginRight: 10 }}>
            {this.renderFlatList()}
          </View>

        </View>
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#3d4c57'
  },

  segment: {
    marginLeft: 50,
  },
  positions: {

    justifyContent: 'center'
  },
  buttonview: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '20%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center'
  },
  viewbutton: {
    height: 35,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#5db7e8',
    justifyContent: 'center',
    alignItems: 'center'
  },
};
const mapStateToProps = state => {
  //  console.log(state)
  return {
    viewOrders: state.vieworder,
    openPositions: state.openPositions,
    closedPositions: state.closedPositions,
    auth: state.auth,
    cropBut: state.cropsButtons
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ViewOrdersData,
      ClosedPositionsData,
      OpenPositionsData,
      dropDownCrop,
      selectedCrop,
        logOut
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

