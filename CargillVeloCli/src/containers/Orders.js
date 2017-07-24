import React, { Component } from 'react';
import {
    ListView, View, SegmentedControlIOS, Text
} from 'react-native';
import OrderItem from './OrderItem';
import { LogoHeader } from '../components/common';

class Orders extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(['row 1', 'row 2', 'row 3']);
    }


        render() {
            return (
                <View>
                <View style={styles.containerStyle}>
                    <LogoHeader
                        subHeaderText="PRICE HEADGING"
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
                </View>

                    <ListView
                    dataSource={this.dataSource}
                    renderRow={() => <OrderItem />}
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
        positionTextStyle: {
            fontSize: 20,
            paddingTop: 20,
            paddingLeft: 30,
            fontWeight: 'bold',


        },
        subContainerStyle: {
            height: 94,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 3,
            justifyContent: 'flex-start',


        },
        contentContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            width: 100,
            borderWidth: 1,
            borderColor: '#007681',
            marginLeft: 10,
            marginTop: 12


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
        }
    }
;
                    export default Orders ;

