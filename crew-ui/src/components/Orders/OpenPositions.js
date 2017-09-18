import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  Linking,
  Alert
} from 'react-native';
import st from '../../Utils/SafeTraverse';

class OpenPositions extends Component {
  render() {
    const {
      id,
      status,
      riskProduct,
      confirm,
      lines,
      underlyingObjectData
    } = this.props.item;
    //console.log(this.props.item.buysell);
    const direction = lines[0].buysell === 'B' ? 'Buy' : 'Sell';
    const year = st(underlyingObjectData, ['contractMonth', 'year', 'value']);
    const month = st(underlyingObjectData, ['contractMonth', 'month', 'name']);
    const crop = st(underlyingObjectData, ['commodity', 'name']);
    const unit = st(underlyingObjectData, ['commodity', 'unit']);
    return (
      <View style={styles.subContainerStyle}>
        <View style={styles.yearStyle}>
          <View
            style={{
              backgroundColor: '#01aca8',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                paddingBottom: 10
              }}
            >
              {month}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#3d4c57',
              height: 50,
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {year}
            </Text>
          </View>
        </View>

        <View style={{ width: 230 }}>
          <View style={{ margin: 14 }}>
            <Text>
              {crop} {riskProduct}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: '#01aca8' }}>QUANTITY</Text>
                <View
                  style={{
                    width: 130,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Text>
                    {lines[0].quantity
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                  <Text>
                    {' ' + unit}s
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: '#01aca8' }}>DIRECTION</Text>
                <Text>
                  {direction}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 5,
            marginTop: 10,
            width: 165
          }}
        >
          <Text style={{ color: '#01aca8' }}>PRODUCT</Text>
          <Text>
            {lines[0].product}
          </Text>
          <Text style={{ color: '#01aca8', marginTop: 6 }}> NET PRICE</Text>
          <Text>
            ${lines[0].netPremium.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 135
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#01aca8' }}> TRADE RECEIPT </Text>
            <TouchableHighlight onPress={() => Linking.openURL(confirm)}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                source={require('../common/img/PDF.png')}
              />
            </TouchableHighlight>
          </View>
          <Text style={{ color: '#01aca8', marginTop: 16 }}> TRADE ID#</Text>
          <Text>
            {' '}{id}{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 110
          }}
        >
          <Text style={{ color: '#01aca8' }}> TRADE DATE </Text>
          <Text>
            {lines[0].tradeDate}
          </Text>
          <Text style={{ color: '#01aca8', marginTop: 6 }}> STATUS </Text>
          <Text>
            {' '}{status}{' '}
          </Text>
        </View>

        <View style={styles.borderStyle} />

        <View style={styles.buttonview}>
          <TouchableHighlight
            style={[styles.viewbutton, status === 'pendingUnwind' ? { backgroundColor: '#7FFFD4' } : {}]}
            disabled={status === 'pendingUnwind'}
            onPress={() => Alert.alert('Unwind will be in progress...')}
            underlayColor='#dddddd'
          >
            <Text style={styles.buttonText}>UNWIND</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = {
  subContainerStyle: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 110
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: 'green',
    marginLeft: 14,
    marginTop: 14,
    marginBottom: 14
  },
  buttonview: {
    justifyContent: 'flex-start',
    width: '18%'
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
    // paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#279989',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderStyle: {
    borderLeftWidth: 2,
    borderColor: 'grey',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20
  },
  yearStyle: {
    // marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    width: 100,
    justifyContent: 'space-around'
  }
};

export default OpenPositions;