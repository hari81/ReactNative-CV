import React, { Component } from 'react';
import {
    ListView, View, SegmentedControlIOS, Text
} from 'react-native';
import OrderItem from './OrderItem';
import { LogoHeader } from '../components/common';

const customData = require('../restAPI/restapi.json');

class Orders extends Component {
    renderData(rowData) {
        return <OrderItem rowData={rowData} />;
    }
    render() {
        const standardDataSource =
            new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.clonedData = standardDataSource.cloneWithRows(customData.value);
            return (

                <View style={styles.containerStyle}>
                    <LogoHeader
                        subHeaderText="PRICE HEDGING"
                        phNumber="+1-952-742-7414"
                        data="Refresh Data"
                    />
                    <View style={styles.segmentarea}>

                        <View style={styles.positions}>
                            <Text style={{ fontSize: 20 }} >Positions & Orders</Text>
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
                                        selectedIndex: event.nativeEvent.selectedSegmentIndex });
                                }}
                                onValueChange={(val) => {
                                    this.setState({
                                        value: val,
                                    });
                                }}
                            />
                        </View>
                    </View>

                    <ListView
                        style={styles.listViewStyle}
                        dataSource={this.clonedData}
                        renderRow={(rowData) => this.renderData(rowData)}
                    />


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
;
export default Orders;

