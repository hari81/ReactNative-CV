import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, Linking } from 'react-native';
import Dimensions from 'Dimensions';

class ClosedPositions extends Component {
  render() {
      const {width, height} = Dimensions.get('window');
    const product = this.props.item.lines.filter(obj => obj.type === 'NEW')[0]
      .product;
    const tradeDate = this.props.item.lines.filter(obj => obj.type === 'NEW')[0]
      .tradeDate;
    const netPrice = this.props.item.lines.filter(obj => obj.type === 'NEW')[0]
      .netPremium;
    const closedPrice = this.props.item.lines.filter(
      obj => obj.type === 'REPRICE'
    )[0].netPremium;
    const unwindDate = this.props.item.lines.filter(
      obj => obj.type === 'REPRICE'
    )[0].tradeDate;
    const quantity = this.props.item.lines.filter(
      obj => obj.type === 'REPRICE'
    )[0].quantity;
    const buysell = this.props.item.lines.filter(obj => obj.type === 'REPRICE')[0]
      .buysell;

    const { id, riskProduct, confirm, underlyingObjectData } = this.props.item;

    return (
      <View style={[styles.subContainerStyle]}>
        <View style={[styles.yearStyle, { width: '10.74%' }]}>
          <View
            style={{
              backgroundColor: 'rgb(39,153,137)',
              height: 40,
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>
              {underlyingObjectData.contractMonth.month.name}
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
              {underlyingObjectData.contractMonth.year.value}
            </Text>
          </View>
        </View>

        <View style={{ margin: 20, width: '24.41%' }}>
          <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }, (underlyingObjectData.commodity.name.length + riskProduct.length) >= 18 ? { fontSize: 14 } : {}]}>
            {underlyingObjectData.commodity.name} {riskProduct}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (underlyingObjectData.commodity.name.length + riskProduct.length) >= 18 ? { paddingTop: 7 } : {}]}>QUANTITY</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                  {quantity
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </Text>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                  {' ' + underlyingObjectData.commodity.unit}s
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (underlyingObjectData.commodity.name.length + riskProduct.length) >= 18 ? { paddingTop: 7 } : {}]}>DIRECTION</Text>
              <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                {buysell === 'S' ? 'Sell' : 'Buy'}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ flexDirection: 'column', marginLeft: 20, marginTop: 12, width: '20%' }}
        >
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>PRODUCT</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {product}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>NET PRICE</Text>
              <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                ${netPrice.toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>CLOSED PRICE</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                  ${closedPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{ flexDirection: 'column', marginLeft: 30, marginTop: 12, width: '16%' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>TRADE RECEIPT </Text>
            <TouchableHighlight onPress={() => Linking.openURL(confirm)}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                source={require('../common/img/PDF.png')}
              />
            </TouchableHighlight>
          </View>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, marginTop: 22 }}>TRADE ID#</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {id}
          </Text>
        </View>

        <View
          style={{ flexDirection: 'column', marginLeft: 20, marginTop: 12 }}
        >
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}> TRADE DATE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {tradeDate}
          </Text>
          <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 18 }}>UNWIND DATE</Text>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
            {unwindDate}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = {
  subContainerStyle: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 110
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

export default ClosedPositions;
