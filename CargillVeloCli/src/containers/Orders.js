/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
    FlatList, View, SegmentedControlIOS, Text, TouchableOpacity
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import ViewOrders from '../components/ViewOrders';
import OpenPositions from '../components/OpenPositions';
import ClosedPositions from '../components/ClosedPositions';
import { LogoPhoneHeader, Spinner } from '../components/common';
import { ViewOrdersData, dropDownCrop, selectedCrop } from '../redux/actions/ViewOrderAction';
import { OpenPositionsData } from '../redux/actions/OpenPositions';
import { ClosedPositionsData } from '../redux/actions/ClosedPositions';
import st from '../Utils/SafeTraverse';

//const openpositions = require('../restAPI/openpositions.json');
//const closedpositions = require('../restAPI/closedpositions.json');

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: props.selectedTab || 'Orders'

        };
    }
    componentDidMount() {
        this.props.ViewOrdersData();
        this.props.OpenPositionsData();
        this.props.ClosedPositionsData();
    }


    /*componentWillMount() {
        //console.log(this.props);
        this.props.ViewOrdersData();
        //this.props.dropDownCrop(this.props.auth.email,this.props.auth.password);
    }*/


    renderFlatList() {
        if (this.props.viewOrders.fetchflag){
            return (<View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>

                <Text style={{ marginTop: 50, color: 'white', textAlign: 'center', fontSize: 25 }}>
                    Loading orders...
                </Text>
                <Spinner size="large"/>
            </View>);
        }
            if (!st(this.props,['viewOrders','items','value','length'])) {
            console.log('identify', st(this.props,['viewOrders','items','value','length']));
                return (<View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}} >
                    <Text style={{ marginTop: 50, color: 'white', textAlign: 'center', fontSize: 25 }}>
                        Sorry... No Orders Available!.
                    </Text>
                </View>);
            }

                if (this.state.selectedTab === 'Orders') {

                    console.log('Orders Button Pressed');

                    return (<FlatList
                        data={this.props.viewOrders.items.value}
                        keyExtractor={item => item.orderId}
                        renderItem={({item}) => <ViewOrders key={item.orderId} item={item}/>}
                    />);
                }
                if (this.state.selectedTab === 'Open Positions') {
                    console.log('Open Positions Pressed');
                    return (<FlatList
                        data={this.props.openPositions.lines}
                        keyExtractor={item => item.orderId}
                        renderItem={({item}) => <OpenPositions key={item.orderId} item={item}/>}
                    />);
                }
                if (this.state.selectedTab === 'Closed Positions') {
                    console.log('Closed Positions Pressed');
                    return (<FlatList
                        data={this.props.closedPositions}
                        keyExtractor={item => item.orderId}
                        renderItem={({item}) => <ClosedPositions key={item.orderId} item={item}/>}
                    />);
                }


    }
    render() {
        const { width, height } = Dimensions.get('window');
       /* const dDValues = this.props.orders.dropDownData;
        const DDV =[];
        for (let i=0; i<dDValues.length; i++) {
            DDV[i] = dDValues[i].name;
        }
        const {email, password} = this.props.auth;*/

        return (

            <View style={styles.containerStyle}>
                <View
                    style={{ backgroundColor: 'black',
                        width : width,
                        height: 20,

                    }}
                />
               <LogoPhoneHeader />

                <View style={styles.segmentarea}>

                    <View style={styles.positions}>
                        <Text style={{ fontSize: 18, color: '#01aca8' }}>Positions & Orders</Text>
                    </View>

                    <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                        <SegmentedControlIOS
                            alignItems='center'
                            tintColor="#01aca8"
                            style={styles.segment}
                            values={['Orders', 'Open Positions', 'Closed Positions']}
                            selectedIndex={{
                                Orders: 0,
                                'Open Positions': 1,
                                'Closed Positions': 2
                            }[this.state.selectedTab]
                            }
                            onChange={(event) => {
                                this.setState({
                                    selectedIndex: event.nativeEvent.selectedSegmentIndex
                                });
                            }}
                            onValueChange={(val) => this.setState({ selectedTab: val })}

                        />
                    </View>

                    <View
                        style={{ flex: 1,
                            marginLeft: 60,
                            paddingTop: 18,
                            justifyContent: 'flex-start',
                            width: 150,
                            height: 100,
                        }}
                    >

                        <TouchableOpacity
                            style={{ justifyContent: 'center' }}
                           // onPress={() => { this.dropDown && this.dropDown.show(); }}
                        >
                            <View
                                style={{ width: 150,
                                    height: 25,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderColor: '#279989',
                                    borderRadius: 5 }}
                            >
                                <ModalDropdown
                                   // ref={(el) => { this.dropDown = el; }}
                                    options={['Corn','Soybeans']}//{DDV}
                                    defaultValue={'Corn'}
                                    style={{ flex: 1 }}
                                    textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
                                    onSelect={(index, value) => {
                                        /*this.props.selectedCrop(value)*/}}
                                    dropdownTextStyle={{ fontWeight: 'bold' }}
                                    dropdownStyle={{ width: 150, marginLeft: 10 }}
                                    animated={false}

                                />
                                <Text>▼</Text>
                            </View>

                        </TouchableOpacity>
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
            backgroundColor: '#3d4c57',


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
            borderTopColor: '#e7b514',
            borderTopWidth: 5
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
  //  console.log(state)
    return {
       viewOrders: state.vieworder,
        openPositions: state.openPositions,
        closedPositions: state.closedPositions

    };
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({ ViewOrdersData ,ClosedPositionsData, OpenPositionsData, dropDownCrop, selectedCrop }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
//export default Orders;
