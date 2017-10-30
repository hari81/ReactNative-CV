import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import bugsnag from '../../components/common/BugSnag';

class ClosedPositions extends Component {
    openTradeReceipt() {
        Actions.pdfview({ orderId: this.props.item.id, confirm: this.props.item.confirm });
    }
  render() {
        try {
            const {userId, firstName, email} = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
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

            const { id, riskProduct, underlyingObjectData } = this.props.item;

            return (
                <View style={[styles.subContainerStyle]}>
                    <View style={[styles.yearStyle, { width: '10.74%' }]}>
                        <View style={{ backgroundColor: 'rgb(39,153,137)', height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>
                                {underlyingObjectData.month}
                            </Text>
                        </View>
                        <View style={{ backgroundColor: 'rgb(61,76,87)', height: 55, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'HelveticaNeue-Bold' }}>
                                {underlyingObjectData.year}
                            </Text>
                        </View>
                    </View>

                    <View style={{ margin: 20, width: '24.41%' }}>
                        <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }, (underlyingObjectData.crop.length + riskProduct.length) >= 18 ? {fontSize: 14} : {}]}>
                            {underlyingObjectData.crop} {riskProduct}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column'}}>
                                <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (underlyingObjectData.crop.length + riskProduct.length) >= 18 ? {paddingTop: 7} : {}]}>QUANTITY</Text>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                                        {quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </Text>
                                    <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>{`  ${underlyingObjectData.unit}s`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={[{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }, (underlyingObjectData.crop.length + riskProduct.length) >= 18 ? {paddingTop: 7} : {}]}>DIRECTION</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                                    {buysell === 'S' ? 'Sell' : 'Buy'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 12, width: '20%' }}>
                        <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>PRODUCT</Text>
                        <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                            {product}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>NET PRICE</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                                    ${netPrice.toFixed(4)}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>CLOSED PRICE</Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                                        ${closedPrice.toFixed(4)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 30, marginTop: 12, width: '16%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}>TRADE RECEIPT </Text>
                            <TouchableHighlight onPress={this.openTradeReceipt.bind(this)}>
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

                    <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 12 }}>
                        <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12 }}> TRADE
                            DATE</Text>
                        <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                            {tradeDate}
                        </Text>
                        <Text style={{ color: 'rgb(1,172,168)', fontFamily: 'HelveticaNeue', fontSize: 12, paddingTop: 18 }}>CLOSE OUT DATE</Text>
                        <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 14 }}>
                            {unwindDate}
                        </Text>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
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

const mapStateToProps = state => {
    return {
        acc: state.account
    };
};

export default connect(mapStateToProps, null)(ClosedPositions);
