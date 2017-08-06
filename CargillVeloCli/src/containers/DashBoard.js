import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoPhoneHeader } from '../components/common';
import { dashboardOpenWorkingOrdersCount } from '../redux/actions/Dashboard/OpenWorkingOrdersCount';
import { dashboardOpenPositionsCount } from '../redux/actions/Dashboard/OpenPositionsCount';

class DashBoard extends Component {
    constructor() {
        super();
        this.state = {
            buttonStatus: false,
            yearCrop: '2017CORN',

        };
    }
    /*onSelect() {
        //const yearCrop = `${year}${crop}`
        switch (this.state.yearCrop) {
            default:
                this.props.dashboardOpenWorkingOrdersCount();
                this.props.dashboardOpenPositionsCount();
                this.setState({ buttonStatus: true });
        }
    }*/

    onCorn2017Press() {
        this.props.dashboardOpenWorkingOrdersCount();
        this.props.dashboardOpenPositionsCount();
        this.setState({ buttonStatus: true });
    }
    dashBoardToOrders() {
        Actions.orders();
    }
    dashBoardToOpenPositions() {
        Actions.orders({ selectedTab: 'Open Positions' });
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <LogoPhoneHeader />

                <View style={styles.firstRowStyle}>
                    <View style={styles.myFormStyle}>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>My Farm</Text>
                        <Text>2016 Corn</Text>
                    </View>
                    <View style={styles.borderStyle} />
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <Text>
                            Enter your current 2016 Corn crop details to receive helpful insights
                        </Text>
                    </View>
                    <View style={styles.enterCropButtonStyle}>
                        <Text style={{ color: 'white' }}>Enter Crop details</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.secondRowFirstColumnStyle}>
                        <Text>Progress Bar will appear here</Text>
                    </View>
                    <View style={styles.secondRowSecondColumnStyle}>
                        <Text>Profitability Matrix</Text>
                    </View>

                </View>

                <View style={styles.thirdRowStyle}>

                    <View
                        style={{ justifyContent: 'center',
                                 alignItems: 'center',
                                 margin: 10,
                                  width: 200 }}
                    >
                    <Text> TODAY'S PRICE </Text>
                    <Text>as of Aug 8,2017 at 9:00AM</Text>
                    </View>

                    <View style={styles.thirdRowBorderStyle} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, width: 100 }}>
                        <Text style={{ fontWeight: 'bold' }}>CORN</Text>
                        <Text style={{ color: '#007681', fontSize: 24, fontWeight: 'bold' }}>$3.7529</Text>
                        <Text>July 2017</Text>
                    </View>

                    <View style={styles.thirdRowBorderStyle} />

                    <TouchableOpacity onPress={this.dashBoardToOrders.bind(this)}>
                    <View
                        style={{ justifyContent: 'space-around',
                                  alignItems: 'center',
                                  margin: 10,
                                  width: 100,
                                  flexDirection: 'row',
                                   }}
                    >
                        <View><Text style={{ color: '#007681', fontSize: 30 }}>{this.props.openOrders.totalCount}</Text></View>
                        <View style={{ flexDirection: 'column' }}>
                        <Text>Open</Text>
                        <Text>Working</Text>
                        <Text>Orders</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={styles.thirdRowBorderStyle} />
                    <TouchableOpacity onPress={this.dashBoardToOpenPositions.bind(this)}>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center', margin: 10, width: 100, flexDirection: 'row' }}>
                        <View><Text style={{ color: '#007681', fontSize: 30, paddingTop:8 }}>{this.props.openPositionsCount.totalCount}</Text></View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text>Open</Text>
                            <Text>Positions</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                    <View style={styles.thirdRowBorderStyle} />

                    <View style={{ justifyContent: 'space-around', alignItems: 'center', margin: 6, width: 100, flexDirection: 'row' }}>
                        <View><Text style={{ color: '#007681', fontSize: 30 }}>0</Text></View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text>Physical</Text>
                            <Text>Positions</Text>
                        </View>
                    </View >

                    <View style={styles.placeOrderButtonStyle}>
                        <Text style={{ color: 'white' }}>PLACE ORDER NOW</Text>
                    </View>
                </View>

                <View style={styles.fourthRowStyle}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View >
                        <Text style={{ color: 'white', fontSize: 20 }}>MY CROPS</Text>

                    </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator>

                            <TouchableHighlight
                             style={this.state.buttonStatus ? styles.afterPress : styles.beforePress}
                             onPress={() => this.onCorn2017Press()}
                         >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={this.state.buttonStatus ? styles.afterPressText : styles.beforePressText}>2017</Text>
                                <Text style={this.state.buttonStatus ? styles.afterPressText : styles.beforePressText}>CORN</Text>
                            </View>
                        </TouchableHighlight>

                        </ScrollView>

                    </View>
                </View>

            </View>

        )
    }
}
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#3d4c57',


    },
    firstRowStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 80,
        borderWidth: 1,
        borderRadius: 5,
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
    myFormStyle: {
       margin: 20,

    },
    borderStyle: {
        borderRightWidth: 1,
        borderColor: 'grey',
        marginTop: 15,
        marginBottom: 15,
    },
    enterCropButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 160,
        backgroundColor: '#007681',
        marginTop: 25,
        marginLeft: 40,
        borderRadius: 5,
    },
    secondRowFirstColumnStyle: {
        height: 370,
        width: 700,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    },
    secondRowSecondColumnStyle: {
      height: 370,
      backgroundColor: 'white',
        width: 290,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 10

    },
    thirdRowStyle: {
        flexDirection: 'row',
        height: 80,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    fourthRowStyle: {
        flexDirection: 'row',
        height: 120,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 5,


    },
    thirdRowBorderStyle: {
        borderRightWidth: 2,
        borderColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
    },
    placeOrderButtonStyle: {
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: '#007681',
        borderRadius: 5,


    },
    beforePress: {
        backgroundColor: 'white',
        width: 120,
        height: 80,
        borderRadius: 3,
        margin: 10
    },
    afterPress: {
        backgroundColor: 'green',
        width: 120,
        height: 80,
        borderRadius: 3,
        margin: 10
    },
    afterPressText: {
      color: 'white',
        fontSize: 20
    },
    beforePressText: {
        color: 'black',
        fontSize: 20
    }

}
const mapStateToProps = (state) => {
    //console.log(state.openPositionsCount)
    return {
     openOrders: state.openWorkingOrders,
        openPositionsCount: state.openPositionsCount
    };
}
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ dashboardOpenWorkingOrdersCount,
                                 dashboardOpenPositionsCount }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DashBoard);
