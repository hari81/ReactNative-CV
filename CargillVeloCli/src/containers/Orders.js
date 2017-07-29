import React, { Component } from 'react';
import {
    FlatList, View, SegmentedControlIOS, Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderItem from '../components/ViewOrders';
import OpenPositions from '../components/OpenPositions';
import ClosedPositions from '../components/ClosedPositions';
import { LogoHeader } from '../components/common';
import { itemsFetchData } from '../redux/actions/ViewOrderAction';

const openpositions = require('../restAPI/openpositions.json');
const closedpositions = require('../restAPI/closedpositions.json');

class Orders extends Component {
    state = {
        selectedTab: 'Orders'
    }
    componentWillMount() {
        this.props.itemsFetchData();
    }

    renderFlatList() {
        if (this.state.selectedTab === 'Orders') {
            console.log('Orders Button Pressed');
            return (<FlatList
                data={this.props.orders.value}
                renderItem={({ item }) => <OrderItem item={item} />}
            />);
        }
        if (this.state.selectedTab === 'Open Positions') {
            console.log('Open Positions Pressed');
            return (<FlatList
                data={openpositions.lines}
                renderItem={({ item }) => <OpenPositions item={item} />}
            />);
        }
        if (this.state.selectedTab === 'Closed Positions') {
            console.log('Closed Positions Pressed');
            return (<FlatList
                data={closedpositions.lines}
                renderItem={({ item }) => <ClosedPositions item={item} />}
            />);
        }
    }
    render() {
        return (

            <View style={styles.containerStyle}>
                <LogoHeader
                    subHeaderText="PRICE HEDGING"
                    phNumber="+1-952-742-7414"
                    data="Refresh Data"
                />
                <View style={styles.segmentarea}>

                    <View style={styles.positions}>
                        <Text style={{ fontSize: 20 }}>Positions & Orders</Text>
                    </View>

                    <View justifyContent='center'>
                        <SegmentedControlIOS
                            alignItems='center'
                            tintColor="green"
                            style={styles.segment}
                            values={['Orders', 'Open Positions', 'Closed Positions']}
                            selectedIndex={0}
                            onChange={(event) => {
                                this.setState({
                                    selectedIndex: event.nativeEvent.selectedSegmentIndex
                                });
                            }}
                            onValueChange={(val) => this.setState({ selectedTab: val })}

                        />
                    </View>
                </View>
                {this.renderFlatList()}
            </View>
        );
    }
}


const styles = {
        containerStyle: {
            flex: 1,
            backgroundColor: '#007681',


        },
        segmentarea: {
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 64,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#279989',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 5,
        },
        segment: {
            marginLeft: 50,
            width: 500,

        },
        positions: {
            left: 30,
            justifyContent: 'center',
        },
        buttonview: {
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            width: '20%'
        },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            textAlign: 'center',
            justifyContent: 'center'
        },
        viewbutton: {
            height: 35,
            width: 150,
            borderRadius: 5,
            marginTop: 30,
            paddingLeft: 8,
            paddingRight: 8,
            backgroundColor: '#5db7e8',
            justifyContent: 'center',
            alignItems: 'center'
        },
    touchopa: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#279989',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        backgroundColor: 'white',
    },

    }
  const mapStateToProps = (state) => {
    console.log(state)
    return {
       orders: state.vieworder
    };
}

const matchDispatchToProps = (dispatch) => {
   return bindActionCreators({ itemsFetchData }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Orders);
//export default Orders;
