import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import st from '../../Utils/SafeTraverse';

//const underlying = require('../../restAPI/underlying.json');

class ViewOrders extends Component {
  onCancelPress(item) {

    Actions.cancelorder(item);
  }
  render() {
    const {
      quantity,
      orderId,
      createTime,
      expirationDate,
      buySell,
      orderState,
      orderType,
      riskProductName,
      underlyingObject
    } = this.props.item;
    //console.log(this.props.item);
    const year = st(underlyingObject, ['contractMonth', 'year', 'value']);
    const month = st(underlyingObject, ['contractMonth', 'month', 'name']);
    const crop = st(underlyingObject, ['commodity', 'name']);
    const unit = st(underlyingObject, ['commodity', 'unit']);
    const targetPrice = this.props.item.targetPrice || 0;

    const d = new Date(createTime);
    const strDate = d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + d.getDate()).slice(-2) +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2) +
      ':' +
      ('0' + d.getSeconds()).slice(-2);
    const utcdate = new Date(createTime);
    const offset = new Date().getTimezoneOffset();
    utcdate.setMinutes(utcdate.getMinutes() - offset);
    //let strDate = utcdate.getFullYear()+ '-' +utcdate.getMonth() +'-' +utcdate.getDate()  +' ' + utcdate.toLocaleTimeString();
   // console.log('CST' + utcdate);
    return (
      <View style={styles.subContainerStyle}>
        <View style={styles.yearStyle}>
          <View
            style={{
              backgroundColor: '#01aca8',
              height: 35,
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
              {month}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#3d4c57',
              height: 55,
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

        <View style={{ width: 220 }}>
          <View style={{ margin: 10 }}>
            <Text>
              {crop} {riskProductName}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: '#01aca8' }}>QUANTITY</Text>
                <View style={{ width: 150 }}>
                  <Text>
                    {quantity
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
                      ' ' +
                      unit}s
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: '#01aca8' }}>DIRECTION</Text>
                <Text>
                  {buySell}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 70
          }}
        >
          <Text style={{ color: '#01aca8' }}>ORDER #</Text>
          <Text>
            {orderId}
          </Text>
          <Text style={{ color: '#01aca8', marginTop: 6 }}> PRICE</Text>
          <Text> ${targetPrice.toFixed(2)} </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 130
          }}
        >
          <Text style={{ color: '#01aca8' }}> STATUS </Text>
          <Text>
            {' '}{orderState.label}{' '}
          </Text>
          <Text style={{ color: '#01aca8', marginTop: 6 }}> ORDER TYPE </Text>
          <Text>
            {' '}{orderType}{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 175
          }}
        >
          <Text style={{ color: '#01aca8' }}> ORDER CREATION DATE</Text>
          <Text>
            {' '}{strDate}
          </Text>
          <Text style={{ color: '#01aca8', marginTop: 6 }}>
            {' '}ORDER EXPIRATION DATE{' '}
          </Text>
          <Text>
            {' '}{expirationDate}{' '}
          </Text>
        </View>

        <View style={styles.borderStyle} />

        <View style={styles.buttonview}>
          <TouchableHighlight
            style={[styles.viewbutton, orderState.label === 'PENDING_CANCEL' ? { backgroundColor: 'gray' } : {}]}

            onPress={
              orderState.label !== 'PENDING_CANCEL'
                ? () =>
                    this.onCancelPress({
                      ...this.props.item,
                      month,
                      year,
                      crop,
                      orderId
                    })
                : () => {}
            }
            disabled={orderState.label === 'PENDING_CANCEL'}

            underlayColor='#dddddd'
          >
            <Text style={styles.buttonText}>CANCEL</Text>
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
    width: 100,
    borderWidth: 1,
    borderColor: '#01aca8',
    marginLeft: 14,
    marginTop: 14,
    marginBottom: 14
  },
  buttonview: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '17%'
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
    backgroundColor: '#279989',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderStyle: {
    borderLeftWidth: 2,
    borderColor: 'grey',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 30
  },
  yearStyle: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    width: 100,
    justifyContent: 'space-around'
  }
};

export default ViewOrders;