import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { externalGetTrans } from '../../redux/actions/ExternalTrades/ExternalActions';
import bugsnag from '../../components/common/BugSnag';

class OutSideTradeSales extends Component {

    externalsales() {
        //this.props.externalGetTrans();
        this.props.gotoexternal();
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const {width, height} = Dimensions.get('window');
            return (<View style={{
                    flex: 1,
                    height: 168,
                    backgroundColor: 'rgb(89,108,121)',
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{color: 'white', fontSize: 19}}>
                        Trades Outside the App
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Text style={{color: 'white', marginBottom: 10, fontSize: 19}}>
                                Total
                            </Text>
                            <Text style={{color: 'white', fontSize: 19}}>
                                Average Price
                            </Text>

                        </View>
                        <View style={{justifyContent: 'space-between', marginLeft: 20}}>
                            <Text
                                style={{color: 'white', marginBottom: 10, fontSize: 19}}
                            >
                                {this.props.far.cropValuesSummary.totalQuantity === undefined ? 0 : this.props.far.cropValuesSummary.totalQuantity.toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} bushels
                            </Text>
                            <Text style={{color: 'white', fontSize: 19}}>
                                ${this.props.far.cropValuesSummary.averagePrice === undefined ? 0 : this.props.far.cropValuesSummary.averagePrice.toFixed(2)} per bushel
                            </Text>
                        </View>
                    </View>

                    <TouchableHighlight
                        style={[{
                            borderRadius: 5,
                            height: 40,
                            width: 300,
                            backgroundColor: 'rgb(39,153,137)'
                        }, this.props.tradeFlag ? {backgroundColor: 'rgba(39,153,137,0.35)'} : {}]}
                        //disabled={this.props.tradeFlag}
                        onPress={this.externalsales.bind(this)}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{color: 'white'}}>
                                ADD & MODIFY TRADES
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const mapStateToProps = (state) => {
    return { far: state.myFar, acc: state.account };
};

export default connect(mapStateToProps, { externalGetTrans })(OutSideTradeSales);
