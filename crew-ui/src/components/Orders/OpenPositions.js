import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image, Linking, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ORDER_SERVICES_URL } from '../../ServiceURLS';
import st from '../../Utils/SafeTraverse';
import { tradeReceipt } from '../../redux/actions/OrdersAction/OpenPositions';

class OpenPositions extends Component {
  onUnwind(item) {
    const sOrder = this.props.item;
    const sLine = sOrder.lines.find(x => x.type.toLowerCase() === 'new');
    const uOrder = {
      riskProductId: sOrder.riskProductId,
      quoteType: 'rpx', //set type to rpx/Reprice
      orderType: 'market', //default open positions to market
      quantity: sLine.quantity,
      buySell: sLine.buysell === 'S' ? 'B' : 'S', //flip the buysell flag
      underlying: sOrder.underlyingObjectData.symbol,
      expirationDate: sLine.expirationDate,
      notes: '',
      transId: sOrder.id,
      activityId: sLine.id
    };
    const year = st(item.underlyingObjectData, ['contractMonth', 'year', 'value']);    
    const crop = st(item.underlyingObjectData, ['commodity', 'code']);

    Actions.quoteswap({ selectedOrder: uOrder, cropcode: crop, cropyear: year }); 
  }

  openTradeReceipt() {

  }

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
    console.log('crop', crop);
    const unit = st(underlyingObjectData, ['commodity', 'unit']);
    return (
      <View style={styles.subContainerStyle}>
        <View style={[styles.yearStyle, { width: '10.74%' }]}>
          <View
            style={{
              backgroundColor: 'rgb(39,153,137)',
              height: 40,
              justifyContent: 'center',

            }}
          >
            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }} >
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

        <View style={{ width: '22.4%' }}>
          <View style={{ margin: 14 }}>
            <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }, (crop.length + riskProduct.length) >= 18 ? { fontSize: 14 } : {}]}>
              {crop} {riskProduct}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (crop.length + riskProduct.length) >= 18 ? { paddingTop: 7 } : {}]}>QUANTITY</Text>
                <View
                  style={{
                    width: 130,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                    {lines[0].quantity
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + unit}s
                  </Text>

                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (crop.length + riskProduct.length) >= 18 ? { paddingTop: 7 } : {}]}>DIRECTION</Text>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                  {direction}
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
            width: '16.11%'
          }}
        >
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>PRODUCT</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {lines[0].product}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 16 }}>NET PRICE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            ${lines[0].netPremium}
          </Text>
        </View>

        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '13.18%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>TRADE RECEIPT</Text>
            <TouchableHighlight onPress={() => {this.props.tradeReceipt(confirm); Linking.openURL(`${ORDER_SERVICES_URL}${confirm.substr(1, confirm.length)}`); }}>
              <Image style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }} source={require('../common/img/PDF.png')} />
            </TouchableHighlight>
          </View>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 25 }}>TRADE ID#</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {' '}{id}{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            marginTop: 10,
            width: '10.74%'
          }}
        >
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>TRADE DATE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {lines[0].tradeDate}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 18 }}>STATUS</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {status.charAt(0).toUpperCase() + status.substr(1)}
          </Text>
        </View>

        <View style={styles.borderStyle} />

        <View style={styles.buttonview}>
          <TouchableHighlight
            style={[styles.viewbutton, status === 'pendingUnwind' ? { backgroundColor: 'rgba(39,153,137,0.65 )' } : {}]}
            disabled={status === 'pendingUnwind'}
            onPress={this.onUnwind.bind(this, this.props.item)}
            underlayColor='#ddd'
          ><View>
              <Text style={styles.buttonText}>SET ORDER TO</Text><Text style={styles.buttonText}>CLOSE POSITION</Text></View>
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
    marginVertical: 5,
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
    alignItems: 'center',
    width: '18%'
  },
  buttonText: {
      color: 'rgb(255,255,255)',
      fontSize: 14,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'HelveticaNeue'
  },
  viewbutton: {
    height: 50,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: '#279989',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderStyle: {
    borderLeftWidth: 1,
    borderColor: 'rgb(159,169,186)',
    marginTop: 16,
    marginBottom: 16,
    //marginLeft: 20,
    marginRight: 20
  },
  yearStyle: {
    // marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    width: 100,
    justifyContent: 'center'
  }
};

export default connect(null, { tradeReceipt })(OpenPositions);
