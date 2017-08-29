/*jshint esversion: 6 */
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
import { Spinner } from '../components/common';
import LogoPhoneHeader from '../components/common/LogoPhoneHeader';
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
      selectedTab: props.selectedTab || 'Orders',
      Crop: props.Crop || 'C'
    };

  }
  componentDidMount() {
      this.props.dropDownCrop();
    const crop = this.state.Crop;
    console.log(crop);
      switch (this.state.selectedTab) {
          case 'Orders':
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
            case 'Orders':
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
        };

    }
  dropDown(cropCode) {
   // console.log(cropCode);

    this.setState({ Crop: cropCode });

    switch (this.state.selectedTab) {
        case 'Orders':
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
   logOutSection() {
        if (this.props.auth.logout) {
            return (
                <View style={{ marginLeft: 960, with: 100, height: 20, displaySize: 50 }}>
                    <TouchableHighlight onPress={() => { this.props.logOut(false); Actions.auth() }}>
                        <Text> LOGOUT</Text>
                    </TouchableHighlight>
                </View>
            );
        }

    }
    pickerValues() {
        return (this.props.viewOrders.dropDownData || []).map((item) => (
            <Picker.Item label={item.name} value={item.code}  key={item.code} />));

    }

    selectedTabOrder = (val) => {
        this.setState({ selectedTab: val });
        switch (val) {
            case 'Orders':
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
            Loading orders...
          </Text>
          <Spinner size='large' />
        </View>
      );
    }

    if (this.state.selectedTab === 'Orders') {
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
              <ViewOrders key={item.orderId} item={item} />}
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


  render() {
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.containerStyle}>
        <View
          style={{
            backgroundColor: 'black',
            width,
            height: 20
          }}
        />
        <LogoPhoneHeader refresh={this.refreshData} />

        <View style={{ height: 90, backgroundColor: 'rgb(64,78,89)' }}>
            {/*this.logOutSection()*/}
          <View
              style={{
                  height: 70,
                  borderTopColor: '#e7b514',
                  borderTopWidth: 3,
                  backgroundColor: 'white',
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'flex-start',
                  flexDirection: 'row'
              }}
          >

          <View style={styles.positions}>
            <Text style={{ fontSize: 18, color: '#01aca8' }}>
              Positions & Orders
            </Text>
          </View>

          <View style={{ justifyContent: 'center', marginLeft: 40 }}>
            <SegmentedControlIOS
              alignItems='center'
              tintColor='#01aca8'
              style={styles.segment}
              values={['Orders', 'Open Positions', 'Closed Positions']}
              selectedIndex={
                {
                  'Orders': 0,
                  'Open Positions': 1,
                  'Closed Positions': 2
                }[this.state.selectedTab]
              }
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                });
              }}
              onValueChange={this.selectedTabOrder}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 60,
              paddingTop: 18,
              justifyContent: 'center',
               // flexDirection: 'row',
                alignItems: 'center',
              width: 150,
              height: 60,
              borderRadius: 10
            }}
          ><Text style={{ fontSize: 10 }}>Select Commodity{/*▼*/}</Text>
            <Picker
                style={[{ width: 150, height: 55 },
                    this.state.Crop === 'C' ? { backgroundColor: '#fff8dc' } : this.state.Crop === 'S' ? {backgroundColor: '#665847'} : {backgroundColor: '#f5deb3'}]}
               mode = 'dropdown'
                itemStyle={{height: 48}}
              selectedValue={this.state.Crop}
              onValueChange={this.dropDown.bind(this)}
            >

                {this.pickerValues()}

            </Picker>
          </View>

          </View>
          </View>
        <View style={{ backgroundColor: 'white', height: 650 }}>
          <View style={{ backgroundColor: '#3d4c57', height:650, marginLeft: 5, marginRight: 5, marginTop: 10}}>
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
    width: 500,

  },
  positions: {
    left: 30,
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
  touchopa: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#279989',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    backgroundColor: 'white'
  }
};
const mapStateToProps = state => {
  //  console.log(state)
  return {
    viewOrders: state.vieworder,
    openPositions: state.openPositions,
    closedPositions: state.closedPositions,
      auth: state.auth
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

