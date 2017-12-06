import React, { Component } from 'react';
import { FlatList, View, SegmentedControlIOS, Text, Dimensions, StatusBar, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import ViewOrders from '../components/Orders/ViewOrders';
import OpenPositions from '../components/Orders/OpenPositions';
import ClosedPositions from '../components/Orders/ClosedPositions';
import { Spinner, CommonHeader } from '../components/common';
import { ViewOrdersData, segmentTabSelect, selectedCrop } from '../redux/actions/OrdersAction/ViewOrderAction';
import { OpenPositionsData } from '../redux/actions/OrdersAction/OpenPositions';
import { ClosedPositionsData } from '../redux/actions/OrdersAction/ClosedPositions';
import MyCropButton from '../components/common/CropButtons/MyCropButton';
import st from '../Utils/SafeTraverse';
import Refresh from '../components/common/img/Refresh.png';
import bugsnag from '../components/common/BugSnag';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.selectedTab || 'Open Orders',
      Crop: props.Crop || 'C'
    };
  }
  componentDidMount() {
      const id = this.props.cropBut.selectedId;
      const cropCode = id.substr(0, id.length - 4);
      const cropYear = id.slice(-4);
      switch (this.state.selectedTab) {
          case 'Open Orders':
              this.props.ViewOrdersData(cropCode, cropYear);
              break;
          case 'Open Positions':
              this.props.OpenPositionsData(cropCode, cropYear);
              break;
          case 'Closed Positions':
              this.props.ClosedPositionsData(cropCode, cropYear);
              break;
          default:
      }
  }
  
  refreshData = () => {
      const id = this.props.cropBut.selectedId;
        const cropCode = id.substr(0, id.length - 4);
      const cropYear = id.slice(-4);
        switch (this.state.selectedTab) {
            case 'Open Orders':
                this.props.ViewOrdersData(cropCode, cropYear);
                break;
            case 'Open Positions':
                this.props.OpenPositionsData(cropCode, cropYear);
                break;
            case 'Closed Positions':
                this.props.ClosedPositionsData(cropCode, cropYear);
                break;
            default:
                console.log('Something wrong');
        }
    };
    selectedTabOrder = (val) => {
        this.setState({ selectedTab: val });
        const id = this.props.cropBut.selectedId;
        const cropCode = id.substr(0, id.length - 4);
        const cropYear = id.slice(-4);
        this.props.segmentTabSelect(val);
        switch (val) {
            case 'Open Orders':
                this.props.ViewOrdersData(cropCode, cropYear);
                break;
            case 'Open Positions':
                this.props.OpenPositionsData(cropCode, cropYear);
                break;
            case 'Closed Positions':
                this.props.ClosedPositionsData(cropCode, cropYear);
                break;
            default:
                console.log('Selected Wrong');
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
      if (!st(this.props, ['viewOrders', 'items', 'length'])) {
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
               No Orders Available.
            </Text>
          </View>
        );
      }
      return (
        <FlatList
          data={this.props.viewOrders.items}
          keyExtractor={item => item.orderId}
          renderItem={({ item }) =>
            <ViewOrders key={item.orderId} item={item} selected={this.state.Crop} />}
        />
      );
    }
    if (this.state.selectedTab === 'Open Positions') {
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
                        No Open Positions Available.
                    </Text>
                </View>
            );
        } 
        return (
            <FlatList
                data={this.props.openPositions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <OpenPositions key={item.id} item={item} />}
            />
        );
    }
    if (this.state.selectedTab === 'Closed Positions') {
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
            No Closed Positions Available.
          </Text>
        );
      }
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
    placeNewOrder() {
        const cropButData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        Actions.quoteswap({ cropcode: cropButData[0].code, cropyear: cropButData[0].cropYear });
    }


  render() {
      try {
          const { userId, firstName, email } = this.props.acc.accountDetails;
          bugsnag.setUser(`User Id: ${userId}`, firstName, email);
          const { width, height } = Dimensions.get('window');
          return (
              <View style={{ width, height }}>
                  <StatusBar barStyle='light-content' />
                  <View
                      style={{
                          backgroundColor: 'black',
                          width,
                          height: 20
                      }}
                  />
                  <CommonHeader onPress={this.refreshData} refreshImg={Refresh} title="Refresh Data" />

                  <View style={{ height: 80, backgroundColor: 'rgb(64,78,89)' }} />

                  <View
                      style={{
                          width: width - 20,
                          height: 70,
                          borderTopColor: 'rgb(231,181,20)',
                          borderTopWidth: 3,
                          backgroundColor: 'white',
                          marginTop: 80,
                          marginHorizontal: 10,
                          position: 'absolute',
                          zIndex: 0,
                      }}
                  >

                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                          <View
                              style={{
                                  width: '17%',
                                  marginLeft: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                 // borderRadius: 10
                              }}
                          >
                              <Text style={{ fontSize: 18, color: 'rgb(0,118,129)', paddingTop: 15, fontFamily: 'HelveticaNeue-Medium', }}>Orders & Positions</Text>
                          </View>
                          <View style={{ justifyContent: 'center', marginLeft: 10, alignItems: 'center', marginTop: 15 }}>
                              <SegmentedControlIOS
                                  alignItems='center'
                                  tintColor='rgb(39,153,137)'
                                  style={[styles.segment, { width: width / 2 }]}
                                  values={['Open Orders', 'Open Positions', 'Closed Positions']}
                                  selectedIndex={{
                                      'Open Orders': 0,
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
                          <View style={{ width: '20%', justifyContent: 'center', marginLeft: 45, marginRight: 25, marginTop: 15 }}>

                              <TouchableHighlight onPress={this.placeNewOrder.bind(this)}>
                                  <View style={{ width: 206, height: 32, borderRadius: 5, backgroundColor: 'rgb(39,153,137)', justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{ fontSize: 16, color: 'rgb(255,255,255)' }}>NEW ORDER</Text>
                                  </View>
                              </TouchableHighlight>

                          </View>
                      </View>
                  </View>
                  <View style={{ backgroundColor: 'rgb(239,244,247)', height, zIndex: -1 }}>
                      <View style={{ backgroundColor: '#3d4c57', height: 10, marginLeft: 10, marginRight: 10 }} />
                      <View style={{ backgroundColor: '#3d4c57', height: height - 290, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                          {this.renderFlatList()}
                      </View>

                    <MyCropButton sTab={this.state.selectedTab} />

                  </View>
              </View>
          );
      } catch (error) {
          bugsnag.notify(error);
      }
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
  return {
    viewOrders: state.vieworder,
    openPositions: state.openPositions.openPstns,
    closedPositions: state.closedPositions,
    auth: state.auth,
    cropBut: state.cropsButtons,
    acc: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ViewOrdersData,
      ClosedPositionsData,
      OpenPositionsData,
      selectedCrop,
      segmentTabSelect
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
