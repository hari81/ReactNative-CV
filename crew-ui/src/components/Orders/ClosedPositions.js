import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PositionsAdditionalDetail from './PositionsAdditionalDetail';
import bugsnag from '../../components/common/BugSnag';
import * as common from '../../Utils/common';
import * as commonStyles from '../../Utils/styles';

class ClosedPositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAddlDetails: false
        };
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

            //values from NEW type
            const oLineNew = this.props.item.lines.filter(obj => obj.type === 'NEW');
            let product = '';
            let tradeDate = '';
            let netPrice = '';
            if (common.isValueExists(oLineNew) && oLineNew.length > 0) { 
                product = oLineNew[0].product;
                tradeDate = oLineNew[0].tradeDate;
                netPrice = `$${oLineNew[0].netPremium.toFixed(4)}`;
            }

            //values from REPRICE type
            const oLineReprice = this.props.item.lines.filter(obj => obj.type === 'REPRICE');
            let closedPrice = '';
            let unwindDate = '';
            let quantity = '';
            let buysell = '';
            if (common.isValueExists(oLineReprice) && oLineReprice.length > 0) {
                closedPrice = `$${oLineReprice[0].netPremium.toFixed(4)}`;
                unwindDate = oLineReprice[0].tradeDate;
                quantity = oLineReprice[0].quantity;
                buysell = oLineReprice[0].buysell;                
            }

            const { id, riskProduct, riskProductId, underlyingObjectData } = this.props.item;

            let tAddlDetails = null;
            let tShowAddlDetails = null;
            let direction = buysell === 'S' ? 'Sell' : 'Buy';
            let moreLinkText = 'Show Details >>';
            if (this.state.isShowAddlDetails) {
                moreLinkText = '<< Hide Details';
                tAddlDetails = <PositionsAdditionalDetail riskProductId={riskProductId} unit={underlyingObjectData.unit} data={oLineReprice[0]} />;
            }

            if (riskProductId === 110) {
                direction = direction === 'Buy' ? 'Short' : 'Long';
                tShowAddlDetails = (
                    <View style={{ marginTop: -8, marginLeft: 823, paddingBottom: 8 }}>
                        <TouchableOpacity onPress={this.toggleAddlDetails.bind(this)}>
                            <Text style={commonStyles.common.positionsMoreLink}>{moreLinkText}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

            const firstRowHeight = 55;            

            return (
                <View style={[styles.subContainerStyle]}>
                    <View style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
                      {/* month/year box */}
                        <View style={[commonStyles.common.positionsYearStyle, { width: '10.74%' }]}>
                            <View style={{ backgroundColor: '#279989', height: 40, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontFamily: 'HelveticaNeue' }}>
                                    {underlyingObjectData.month}
                                </Text>
                            </View>
                            <View style={{ backgroundColor: '#3d4c57', height: 55, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontFamily: 'HelveticaNeue-Bold' }}>
                                    {underlyingObjectData.year}
                                </Text>
                            </View>
                        </View>

                        <View style={{ width: '29%' }}>
                            <View style={{ margin: 10 }}>
                                <View style={{ height: firstRowHeight }}>
                                    <Text style={[{ fontFamily: 'HelveticaNeue-Thin', fontSize: 20, marginTop: 5 }, (underlyingObjectData.crop.length + riskProduct.length) >= 18 ? { fontSize: 14 } : {}]}>
                                        {underlyingObjectData.crop} {riskProduct}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={commonStyles.common.positionsDataLabel}>QUANTITY</Text>
                                        <View style={{ width: 130, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={commonStyles.common.positionsData}>{quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                            <Text style={commonStyles.common.positionsData}>{` ${underlyingObjectData.unit}s`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={commonStyles.common.positionsDataLabel}>DIRECTION</Text>
                                        <Text style={commonStyles.common.positionsData}>{direction}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 20, width: '20%' }}>
                            <View style={{ flexDirection: 'column', height: firstRowHeight }}>
                                <Text style={commonStyles.common.positionsDataLabel}>PRODUCT</Text>
                                <Text style={commonStyles.common.positionsData}>{product}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={commonStyles.common.positionsDataLabel}>NET PRICE</Text>
                                    <Text style={commonStyles.common.positionsData}>{netPrice}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={commonStyles.common.positionsDataLabel}>CLOSED PRICE</Text>
                                    <Text style={commonStyles.common.positionsData}>{closedPrice}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 20, width: '16%' }}>
                            <View style={{ flexDirection: 'row', height: firstRowHeight }}>
                                <Text style={commonStyles.common.positionsDataLabel}>TRADE RECEIPT </Text>
                                <TouchableHighlight onPress={this.openTradeReceipt.bind(this)}>
                                    <Image
                                        style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                                        source={require('../common/img/PDF.png')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[commonStyles.common.positionsDataLabel, { }]}>TRADE ID#</Text>
                                <Text style={commonStyles.common.positionsData}>{id}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'column', height: firstRowHeight }}>
                                <Text style={commonStyles.common.positionsDataLabel}> TRADE DATE</Text>
                                <Text style={commonStyles.common.positionsData}>{tradeDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={commonStyles.common.positionsDataLabel}>CLOSE OUT DATE</Text>
                                <Text style={commonStyles.common.positionsData}>{unwindDate}</Text>
                            </View>
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
  subContainerStyle: { flexDirection: 'column', margin: 5, backgroundColor: '#fff', borderRadius: 4 }
};

const mapStateToProps = state => {
    return {
        acc: state.account
    };
};

export default connect(mapStateToProps, null)(ClosedPositions);
