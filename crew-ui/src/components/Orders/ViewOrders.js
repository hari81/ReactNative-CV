import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import bugsnag from '../../components/common/BugSnag';
import * as common from '../../Utils/common';
import * as cStyles from '../../Utils/styles';

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowAddlDetails: false
    };
  }

  onCancelPress(item) {
    Actions.cancelorder({ item, selectedCrop: this.props.selected });
  }

  toggleAddlDetails() {
    this.setState({ isShowAddlDetails: !this.state.isShowAddlDetails });
  }
  
  render() {
    try {
      const { userId, firstName, email } = this.props.acc.accountDetails;
      bugsnag.setUser(`User Id: ${userId}`, firstName, email);
      const {
        quantity,
        orderId,
        createTime,
        buySell,
        orderState,
        orderType,
        riskProductName,
        underlyingObjectData,
        goodTilDate
      } = this.props.item;

    const year = underlyingObjectData.year;
    const month = underlyingObjectData.month;
    const crop = underlyingObjectData.crop;
    const unit = underlyingObjectData.unit;
    const targetPrice = this.props.item.targetPrice || 0;
    let tStrike = this.props.item.strike;
    if (common.isValueExists(tStrike)) { tStrike = tStrike.toFixed(2); }
    let tBonusPrice = this.props.item.bonusPrice;
    if (common.isValueExists(tBonusPrice)) { tBonusPrice = tBonusPrice.toFixed(2); }
    
    const d = new Date(createTime);
    const strDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
    const utcdate = new Date(createTime);
    const offset = new Date().getTimezoneOffset();
    utcdate.setMinutes(utcdate.getMinutes() - offset);

    return (
      <View style={styles.subContainerStyle}>
        <View style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
          <View style={[cStyles.common.positionsYearStyle, { width: '10.74%' }]}>
            <View style={{ backgroundColor: 'rgb(39,153,137)', height: 35, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>{month}</Text>
            </View>
            <View style={{ backgroundColor: 'rgb(61,76,87)', height: 55, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'HelveticaNeue-Bold' }}>{year}</Text>
            </View>
          </View>

          <View style={{ width: '21.48%' }}>
            <View style={{ margin: 10 }}>
              <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }, (crop.length + riskProductName.length) >= 18 ? { fontSize: 16 } : {}]}>
                {crop} {riskProductName}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[cStyles.common.positionsDataLabel, (crop.length + riskProductName.length) >= 18 ? { paddingTop: 8 } : {}]}>QUANTITY</Text>
                  <View style={{ width: 150 }}>
                    <Text style={cStyles.common.positionsData}>
                      {quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + unit}s
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[cStyles.common.positionsDataLabel, (crop.length + riskProductName.length) >= 18 ? { paddingTop: 8 } : {}]}>DIRECTION</Text>
                  <Text style={cStyles.common.positionsData}>{buySell}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 40, marginTop: 10, width: '7%' }}>
            <Text style={cStyles.common.positionsDataLabel}>ORDER #</Text>
            <Text style={cStyles.common.positionsData}>{orderId}</Text>
            <Text style={[cStyles.common.positionsDataLabel, { paddingTop: 14 }]}>PRICE</Text>
            <Text style={cStyles.common.positionsData}>${targetPrice}</Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '8%' }}>
            <Text style={cStyles.common.positionsDataLabel}>STATUS</Text>
            <Text style={cStyles.common.positionsData}>{orderState.label}</Text>
            <Text style={[cStyles.common.positionsDataLabel, { paddingTop: 14 }]}>ORDER TYPE</Text>
            <Text style={cStyles.common.positionsData}>{orderType}</Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '14%' }}>
            <Text style={cStyles.common.positionsDataLabel}>CREATION DATE</Text>
            <Text style={cStyles.common.positionsData}>{strDate}</Text>
            <Text style={[cStyles.common.positionsDataLabel, { paddingTop: 14 }]}>VALID UNTIL</Text>
            <Text style={cStyles.common.positionsData}>
              {goodTilDate === undefined ? 'N/A' : goodTilDate}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10, width: '10%' }}>
            <Text style={cStyles.common.positionsDataLabel}>STRIKE</Text>
            <Text style={cStyles.common.positionsData}>${tStrike}</Text>
            <Text style={[cStyles.common.positionsDataLabel, { paddingTop: 14 }]}>BONUS PRICE</Text>
            <Text style={cStyles.common.positionsData}>${tBonusPrice}</Text>
          </View>

          <View style={styles.borderStyle} />

          <View style={styles.buttonview}>
            <TouchableOpacity
              style={[styles.viewbutton, orderState.label === 'PENDING_CANCEL' ? { backgroundColor: 'rgba(39,153,137,0.65)' } : {}]}
              onPress={orderState.label !== 'PENDING_CANCEL' ? () => this.onCancelPress({ ...this.props.item, month, year, crop, orderId, targetPrice }) : () => {}}
              disabled={orderState.label === 'PENDING_CANCEL'}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } catch (error) {
      common.handleError(error);
  }
  }
}

const styles = {
  subContainerStyle: { flexDirection: 'column', margin: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 4 },
  contentContainerStyle: { justifyContent: 'center', alignItems: 'center', width: 100, borderWidth: 1, borderColor: '#01aca8', marginLeft: 14, marginTop: 14, marginBottom: 14 },
  buttonview: { alignItems: 'center', justifyContent: 'center', width: '15.25%' },
  buttonText: { color: '#fff', fontSize: 14, textAlign: 'center', justifyContent: 'center', fontFamily: 'HelveticaNeue' },
  viewbutton: { height: 35, width: 127, borderRadius: 5, backgroundColor: 'rgb(39,153,137)', justifyContent: 'center', alignItems: 'center' },
  borderStyle: { borderLeftWidth: 1, borderColor: 'rgb(159,169,186)', marginTop: 16, marginBottom: 16, marginLeft: 10 },
};

const mapStateToProps = state => {
    return { acc: state.account };
};

export default connect(mapStateToProps, null)(ViewOrders);
