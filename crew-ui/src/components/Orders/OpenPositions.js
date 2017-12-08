import React, { Component } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PositionsAdditionalDetail from './PositionsAdditionalDetail';
import { tradeReceipt } from '../../redux/actions/OrdersAction/OpenPositions';
import * as common from '../../Utils/common';
import * as commonStyles from '../../Utils/styles';
import bugsnag from '../../components/common/BugSnag';

class OpenPositions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowAddlDetails: false
    };
  }

  onUnwind(item) {
    const sOrder = this.props.item;
    const sLine = sOrder.lines.find(x => x.type.toLowerCase() === 'new');
    const uOrder = {
      riskProductId: sOrder.riskProductId,
      quoteType: 'rpx', //set type to rpx/Reprice
      orderType: 'market', //default open positions to market
      quantity: sLine.quantity,
      buySell: sLine.buysell === 'S' ? 'B' : 'S', //flip the buysell flag
      underlying: sLine.underlying,
      expirationDate: sLine.expirationDate,
      notes: '',
      transId: sOrder.id,
      activityId: sLine.id
    };
    Actions.quoteswap({ selectedOrder: uOrder, cropcode: item.underlyingObjectData.cropCode, cropyear: item.underlyingObjectData.cropYear });
  }

  openTradeReceipt() {
    Actions.pdfview({ orderId: this.props.item.id, confirm: this.props.item.confirm });
  }

  toggleAddlDetails() {
    this.setState({ isShowAddlDetails: !this.state.isShowAddlDetails });
  }

  render() {
    try {
      const { userId, firstName, email } = this.props.acc.accountDetails;
      bugsnag.setUser(`User Id: ${userId}`, firstName, email);
      const { id, status, riskProduct, riskProductId, lines, underlyingObjectData } = this.props.item;

      const direction = lines[0].buysell === 'B' ? 'Buy' : 'Sell';
      const year = underlyingObjectData.year;
      const month = underlyingObjectData.month;
      const crop = underlyingObjectData.crop;
      const unit = underlyingObjectData.unit;

      let tAddlDetails = null;
      let tShowAddlDetails = null;

      let moreLinkText = 'Show Details >>';
      if (this.state.isShowAddlDetails) {
          moreLinkText = '<< Hide Details';
          tAddlDetails = <PositionsAdditionalDetail riskProductId={riskProductId} unit={unit} data={lines[0]} />;
      }

      if (riskProductId === 110) {
        tShowAddlDetails = (
            <View style={{ marginTop: -16, marginLeft: 860, paddingBottom: 8 }}>
                <TouchableOpacity onPress={this.toggleAddlDetails.bind(this)}>
                    <Text style={commonStyles.common.positionsMoreLink}>{moreLinkText}</Text>
                </TouchableOpacity>
            </View>
        );
      }

      const firstRowHeight = 55;

    return (
      <View style={styles.subContainerStyle}>
        <View style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
          {/* month/year box */}
          <View style={[commonStyles.common.positionsYearStyle, { width: '10.74%' }]}>
            <View style={{ backgroundColor: 'rgb(39,153,137)', height: 40, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>{month}</Text>
            </View>

            <View style={{ backgroundColor: 'rgb(61,76,87)', height: 55, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'HelveticaNeue-Bold' }}>{year}</Text>
            </View>
          </View>

          <View style={{ width: '22.4%' }}>
            <View style={{ margin: 10 }}>
              <View style={{ height: firstRowHeight }}>
                <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20, marginTop: 5 }, (crop.length + riskProduct.length) >= 18 ? { fontSize: 14 } : {}]}>
                  {crop} {riskProduct}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={commonStyles.common.positionsDataLabel}>QUANTITY</Text>
                  <View style={{ width: 130, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={commonStyles.common.positionsData}>
                      {lines[0].quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + unit}s
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={commonStyles.common.positionsDataLabel}>DIRECTION</Text>
                  <Text style={commonStyles.common.positionsData}>{direction}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[commonStyles.common.positionsDataLabel, { marginLeft: 35 }]}>NET PRICE</Text>
                  <Text style={[commonStyles.common.positionsData, { marginLeft: 35 }]}>${lines[0].netPremium}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, height: firstRowHeight, width: '16.11%' }}>
            <Text style={commonStyles.common.positionsDataLabel}>PRODUCT</Text>
            <Text style={commonStyles.common.positionsData}>{lines[0].product}</Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '13.18%' }}>
            <View style={{ flexDirection: 'row', height: firstRowHeight }}>
              <Text style={commonStyles.common.positionsDataLabel}>TRADE RECEIPT</Text>
              <TouchableHighlight onPress={this.openTradeReceipt.bind(this)}>
                <Image style={{ width: 20, height: 20, marginLeft: 5 }} source={require('../common/img/PDF.png')} />
              </TouchableHighlight>
            </View>
            <Text style={commonStyles.common.positionsDataLabel}>TRADE ID#</Text>
            <Text style={commonStyles.common.positionsData}>
              {' '}{id}{' '}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '10.74%' }}>
            <View style={{ height: firstRowHeight }}>
              <Text style={commonStyles.common.positionsDataLabel}>TRADE DATE</Text>
              <Text style={commonStyles.common.positionsData}>{lines[0].tradeDate}</Text>
            </View>
            <Text style={commonStyles.common.positionsDataLabel}>STATUS</Text>
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
                  <Text style={styles.buttonText}>ENTER DETAILS TO</Text><Text style={styles.buttonText}>CLOSE POSITION</Text></View>
              </TouchableHighlight>
          </View>
        </View>
        {tShowAddlDetails}
        {tAddlDetails}
      </View>
    );
    } catch (error) {
      common.handleError(error);
    }
  }
}

const styles = {
  subContainerStyle: { flexDirection: 'column', margin: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 4 },
  buttonview: { justifyContent: 'flex-start', alignItems: 'center', width: '18%' },
  buttonText: { color: '#fff', fontSize: 14, textAlign: 'center', justifyContent: 'center', fontFamily: 'HelveticaNeue' },
  viewbutton: { height: 50, width: 150, borderRadius: 5, marginTop: 30, backgroundColor: '#279989', justifyContent: 'center', alignItems: 'center' },
  borderStyle: { borderLeftWidth: 1, borderColor: 'rgb(159,169,186)', marginTop: 16, marginBottom: 16, marginRight: 20 },
};

const mapStateToProps = state => {
    return {
        acc: state.account
    };
};
export default connect(mapStateToProps, { tradeReceipt })(OpenPositions);
