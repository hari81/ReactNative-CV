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
              backgroundColor: 'rgb(39,153,137)',
              height: 35,
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 12, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>
              {month}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgb(61,76,87)',
              height: 55,
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontFamily: 'HelveticaNeue-Bold'
              }}
            >
              {year}
            </Text>
          </View>
        </View>

        <View style={{ width: 220 }}>
          <View style={{ margin: 10 }}>
            <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}>
              {crop} {riskProductName}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>QUANTITY</Text>
                <View style={{ width: 150 }}>
                  <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                    {quantity
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
                      ' ' +
                      unit}s
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>DIRECTION</Text>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
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
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>ORDER #</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {orderId}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 14 }}> PRICE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}> ${targetPrice.toFixed(2)} </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: 130
          }}
        >
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}> STATUS </Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {' '}{orderState.label}{' '}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 14 }}> ORDER TYPE </Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
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
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}> ORDER CREATION DATE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {' '}{strDate}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 14 }}>
            {' '}ORDER EXPIRATION DATE{' '}
          </Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {' '}{expirationDate}{' '}
          </Text>
        </View>

        <View style={styles.borderStyle} />

        <View style={styles.buttonview}>
          <TouchableHighlight
            style={[styles.viewbutton, orderState.label === 'PENDING_CANCEL' ? { backgroundColor: 'rgba(39,153,137,0.65)' } : {}]}

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
    marginHorizontal: 10,
    marginVertical: 5,
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
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%'
  },
  buttonText: {
    color: 'rgb(255,255,255)',
    fontSize: 10,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'HelveticaNeue'
  },
  viewbutton: {
    height: 35,
    width: 127,
    borderRadius: 5,
   // marginTop: 30,
    //paddingLeft: 20,
   // paddingRight: 8,
    backgroundColor: 'rgb(39,153,137)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderStyle: {
    borderLeftWidth: 1,
    borderColor: 'rgb(159,169,186)',
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
