import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Spinner } from '../common/Spinner';
import * as common from '../../Utils/common';
import st from '../../Utils/SafeTraverse';
import { ImageButton } from '../common/ImageButton';

const { height, width } = Dimensions.get('window');
class SelectContractMonthList extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.contractMonth.spinFlag && nextProps.selectedMonth !== 0) {
            this.onSelectedMonth(0);
        }
    }
    onSelectedMonth(id, month, year) { this.props.onSelectedMonth(id, month, year); }
    benefitsScreen = () => { Actions.productBenefits(); }
    render() {
        let spinner = null;
        if (this.props.contractMonth.spinFlag) {
            spinner = (<Spinner size="small" />);
        } else {
            const sId = this.props.selectedMonth;
            let risk110Name = null;
            if (common.isValueExists(this.props.products)) {
                const risk110 = this.props.products.find(x => x.id === 110);
                if (common.isValueExists(risk110)) { risk110Name = risk110.name; }
            }
            spinner = (
                <View>
                     <View style={{ flexDirection: 'row' }}>
                          <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>Let's select your contract month</Text></View>
                          <View style={styles.productDetailsView}>
                              <View style={{ marginLeft: 14, marginTop: 6 }}>
                                  <Text style={{ fontSize: 24, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Product Details</Text>
                                  <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' }}>Your Crop is</Text>
                                  <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{this.props.cropButton.selectedCropName} {this.props.underlyingData.underlyingYear}</Text>
                                  <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' }}>Your Product is a </Text>
                                  <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>{risk110Name}</Text>
                                  <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' }}>Your trade direction is</Text>
                                  <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Sell</Text>
                                  <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' }}>Your product details are</Text>
                                  <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>
                                      {this.props.cMonth || st(this.props, ['contractMonth', 'contract', 0, 'month'])} {this.props.cYear || st(this.props, ['contractMonth', 'contract', 0, 'year'])}
                                  </Text>
                              </View>
                          </View>
                     </View>
                    <View style={{ position: 'absolute', marginTop: height * 0.078 }}>
                      <FlatList
                       numColumns={4}
                        data={this.props.contractMonth.contract}
                        extraData={this.props.selectedMonth}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                                <View style={{ marginTop: height * 0.039, marginLeft: width * 0.012 }}>
                                         <TouchableOpacity onPress={this.onSelectedMonth.bind(this, item.id, item.month, item.year)}>
                                                    <View style={styles.contractMonthView}>
                                                        <View style={item.id === sId ? [styles.monthYearView, { backgroundColor: 'rgb(39,153,137)' }] : styles.monthYearView}>
                                                            <Text style={item.id === sId ? [styles.monthYearText, { color: 'rgb(255,255,255)' }] : styles.monthYearText}>
                                                                {item.month.substr(0, 3)} {item.year}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.priceView}>
                                                            <Text style={styles.priceText}> ${parseFloat(item.bidPrice).toFixed(4)}</Text>
                                                        </View>
                                                    </View>
                                         </TouchableOpacity>
                                </View>
                                )}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: height * 0.015, marginLeft: width * 0.60 }}>
                                <ImageButton text='BACK' onPress={this.benefitsScreen} />
                                <ImageButton text='NEXT' />
                     </View>
                 </View>
            );
        }
        return (
            <View style={styles.container}>
                {spinner}
            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, },
    subViewStyle: { marginLeft: width * 0.012, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    contractMonthView: { height: height * 0.154, width: width * 0.134, backgroundColor: 'rgb(255,255,255)', borderRadius: 4 },
    productDetailsView: { height: height * 0.416, width: width * 0.324, borderRadius: 4, backgroundColor: 'rgba(224,242,243, 0.1)', marginLeft: width * 0.175, marginTop: 41 },
    monthYearView: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(239,244,247)', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
    monthYearText: { color: 'rgb(59,76,89)', fontSize: 18, fontFamily: 'HelveticaNeue' },
    priceView: { flex: 3, justifyContent: 'center', alignItems: 'center' },
    priceText: { color: 'rgb(60,76,88)', fontSize: 30, fontFamily: 'HelveticaNeue-Bold' }
}
const mapStateToProps = state => {
    return {
        contractMonth: state.contractData,
        cropButton: state.cropsButtons,
        products: state.products,
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol)

    };
};

export default connect(mapStateToProps, null)(SelectContractMonthList);
