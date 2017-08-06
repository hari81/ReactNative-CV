import React, { Component } from 'react';
import {
    FlatList, View, SegmentedControlIOS, Text, TouchableOpacity
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewOrders from '../components/ViewOrders';
import OpenPositions from '../components/OpenPositions';
import ClosedPositions from '../components/ClosedPositions';
import { LogoPhoneHeader } from '../components/common';
import { ViewOrdersData, dropDownCrop } from '../redux/actions/ViewOrderAction';
import { OpenPositionsData } from '../redux/actions/OpenPositions';
import { ClosedPositionsData } from '../redux/actions/ClosedPositions';

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
    renderFlatList() {
        if (this.state.selectedTab === 'Orders') {
            return (<FlatList
                data={this.props.viewOrders.value}
                renderItem={({ item }) => <ViewOrders item={item} />}
                //keyExtractor={this.props.viewOrders.value.map((item) => item.orderId)}

            />);
        }
        if (this.state.selectedTab === 'Open Positions') {
            return (<FlatList
                data={this.props.openPositions.lines}
                renderItem={({ item }) => <OpenPositions item={item} />}
                //keyExtractor={item => item.orderId}
            />);
        }
        if (this.state.selectedTab === 'Closed Positions') {
            return (<FlatList
            data={this.props.closedPositions}
            renderItem={({ item }) => <ClosedPositions item={item} />}
            //keyExtractor={item => item.id}
            />);
        }
    }
    render() {
        return (

            <View style={styles.containerStyle}>

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
                            onPress={() => { this.dropDown && this.dropDown.show(); }}
                        >
                            <View
                                style={{ width: 150,
                                    height: 25,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderColor: '#3d4c57',
                                    borderRadius: 5 }}
                            >
                                <ModalDropdown
                                    ref={(el) => { this.dropDown = el; }}
                                    options={['CORN', 'SOYBEAN']}
                                    defaultValue={'CORN'}
                                    style={{ flex: 1 }}
                                    textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
                                    onSelect={(index, value) => { }}
                                    dropdownTextStyle={{ fontWeight: 'bold' }}
                                    dropdownStyle={{ width: 150, marginLeft: 10 }}

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
    //console.log(state.closedPositions)
    return {
        viewOrders: state.vieworder.items,
        openPositions: state.openPositions,
        closedPositions: state.closedPositions

    };
}

const matchDispatchToProps = (dispatch) => {
   return bindActionCreators({ ViewOrdersData, ClosedPositionsData, OpenPositionsData, dropDownCrop, }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Orders);
