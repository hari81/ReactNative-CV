import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, Linking
} from 'react-native';
import { connect } from 'react-redux';

class ClosedPositions extends Component {
    render(){
        let product = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'NEW') {
                    return obj.product;
                }
            }
        )
        let tradeDate = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'NEW') {
                    return obj.tradeDate;
                }
            }
        )
        let netPrice = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'NEW') {
                    return obj.netPremium;
                }
            }
        )

        let closedPrice = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'REPRICE') {
                    return obj.netPremium;
                }
            }
        )
        let unwindDate = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'REPRICE') {
                    return obj.tradeDate;
                }
            }
        )
        let quantity = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'REPRICE') {
                    return obj.quantity;
                }
            }
        )
        let buySell = this.props.item.lines.map((obj) => {
                if ((obj.type) === 'REPRICE') {
                    if (obj.buysell === 'S') {
                        return 'Sell';
                    } else if (obj.buysell === 'B'){
                        return 'Buy';
                    }
                }
            }
        )
        let month = this.props.underlyingData.map((obj) => {
                return obj.contractMonth.month.name;
            }
        )
        let year = this.props.underlyingData.map((obj) => {
                return obj.contractMonth.year.value;
            }
        )
        let crop = this.props.underlyingData.map((obj) => {
                return obj.commodity.name;
            }
        )
        let unit = this.props.underlyingData.map((obj) => {
                return obj.commodity.unit;
            }
        )

        const { id, riskProduct, confirm  } = this.props.item;

        return (

            <View style={styles.subContainerStyle}>
                <View style={styles.yearStyle}>
                    <View style={{ backgroundColor: '#01aca8', height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                            {month[0]}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#3d4c57', height: 50, justifyContent: 'center' }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 25,
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >{year[0]}
                        </Text>
                    </View>

                </View>

                <View style={{ margin: 14 }}>
                    <Text>{crop[0]} {riskProduct}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'green' }}>QUANTITY</Text>
                            <View style={{ width: 100 }}>
                                <Text>
                                    {quantity[1].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </Text>
                                <Text>{unit[0]}s</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color: 'green' }}>DIRECTION</Text>
                            <Text>{buySell}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> PRODUCT</Text>
                    <Text> {product}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'green' }}> NET PRICE</Text>
                            <Text> {netPrice} </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color: 'green' }}> CLOSED PRICE</Text>
                            <View style={{ width: 100 }}>
                                <Text>{closedPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'green' }}> TRADE RECEIPT </Text>
                        <TouchableHighlight onPress={() => Linking.openURL(confirm)}><Image
                            style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                            source={require('./common/img/PDF.png')}
                        /></TouchableHighlight>
                    </View>
                    <Text style={{ color: 'green', marginTop: 16 }}> TRADE ID#</Text>
                    <Text> {id} </Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> TRADE DATE</Text>
                    <Text> {tradeDate}</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> UNWIND DATE</Text>
                    <Text> {unwindDate} </Text>
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
        width: 120,
        borderWidth: 1,
        borderColor: 'green',
        marginLeft: 14,
        marginTop: 14,
        marginBottom: 14

    },
    yearStyle: {
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: 100,
        justifyContent: 'space-around',
    }

}
const mapStateToProps = (state) => {
    //console.log(state.closedUnderlying)
    return {
        underlyingData: state.closedUnderlying
    };
};

export default connect(mapStateToProps, null)(ClosedPositions);