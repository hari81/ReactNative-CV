/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import { LogoHomeHeader } from '../components/common';
import { dashboardOpenWorkingOrdersCount } from '../redux/actions/Dashboard/OpenWorkingOrdersCount';
import { dashboardOpenPositionsCount } from '../redux/actions/Dashboard/OpenPositionsCount';

class DashBoard extends Component {
    constructor() {
        super();
        this.state = {
           selectedButton: 'CORN2016'

        };
    }


    componentDidMount() {
        this.props.dashboardOpenWorkingOrdersCount();
        this.props.dashboardOpenPositionsCount();

    }
    onChangeButton(selectedButton){
        this.setState({ selectedButton });
    }
    dashBoardToOrders() {
        Actions.orders();
    }
    dashBoardToOpenPositions() {
        Actions.orders({ selectedTab: 'Open Positions' });
    }
    toMyFarm() {
        Actions.myfarm();
    }
    refresh()
    {
        Alert("Data");
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={styles.containerStyle}>
                <View
                style={{ backgroundColor: 'black',
                width : width,
                height: 20,

            }} />
                <LogoHomeHeader  />

                <View style={styles.firstRowStyle}>
                      <TouchableHighlight onPress={this.toMyFarm.bind(this)}>
                    <View style={styles.myFormStyle}>

                           <Text style={{ fontSize: 24, fontWeight: '600' }}>My Farm </Text>

                        <Text>2016 Corn</Text>

                    </View>
                     </TouchableHighlight>
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

                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, width: 120 }}>
                        <Text style={{ fontWeight: 'bold' }}>CORN</Text>
                        <Text style={{ color: '#007681', fontSize: 24, fontWeight: 'bold' }}>$3.72</Text>
                        <Text>September 2017</Text>
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
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems:'center'}}>
                            <Text style={{color: 'white', fontSize: 20 }}> MY CROPS </Text>
                            <View style={{height: 2, width: 820, backgroundColor: '#e7b514' }}/>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15}}>

                                <TouchableHighlight  onPress={this.onChangeButton.bind(this, 'CORN2016')}
                                                     style={[styles.buttonStyle, this.state.selectedButton==='CORN2016' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                >

                                    <View style={[styles.buttonStyle, this.state.selectedButton==='CORN2016'? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop,this.state.selectedButton==='CORN2016'? {color: "white"} : {color: "#3d4c57"}]}>2016</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='CORN2016' ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                        <Text style={[styles.yearCrop,this.state.selectedButton==='CORN2016'? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>



                                </TouchableHighlight>
                                <TouchableHighlight onPress={this.onChangeButton.bind(this, 'SOYBEAN2016')}
                                                    style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2016' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                >

                                    <View style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2016' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2016' ? {color: "white"} : {color: "#3d4c57"}]}>2016</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='SOYBEAN2016' ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2016' ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>

                                </TouchableHighlight>

                                <TouchableHighlight onPress={this.onChangeButton.bind(this, 'CORN2017')}
                                                    style={[styles.buttonStyle, this.state.selectedButton==='CORN2017' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                >
                                    <View style={[styles.buttonStyle, this.state.selectedButton==='CORN2017' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='CORN2017' ? {color: "white"} : {color: "#3d4c57"}]}>2017</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='CORN2017' ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='CORN2017' ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>

                                </TouchableHighlight>

                                <TouchableHighlight onPress={this.onChangeButton.bind(this, 'SOYBEAN2017')}
                                                    style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2017' ? {backgroundColor: "#279989"} : { backgroundColor: "white"}]}
                                >
                                    <View style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2017' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2017' ? {color: "white"} : {color: "#3d4c57"}]}>2017</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='SOYBEAN2017' ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2017' ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={this.onChangeButton.bind(this, 'CORN2018')}

                                                    style={[styles.buttonStyle, this.state.selectedButton==='CORN2018' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                >
                                    <View style={[styles.buttonStyle, this.state.selectedButton==='CORN2018' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='CORN2018' ? {color: "white"} : {color: "#3d4c57"}]}>2018</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='CORN2018' ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='CORN2018' ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={this.onChangeButton.bind(this, 'SOYBEAN2018')}
                                                    style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2018' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                >
                                    <View style={[styles.buttonStyle, this.state.selectedButton==='SOYBEAN2018' ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2018' ? {color: "white"} : {color: "#3d4c57"}]}>2018</Text>
                                        <Text style={[styles.cropType, this.state.selectedButton==='SOYBEAN2018' ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                        <Text style={[styles.yearCrop, this.state.selectedButton==='SOYBEAN2018' ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                                    </View>
                                </TouchableHighlight>


                            </View>


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
    buttonStyle: {
        width: 150,
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10
    },
    yearCrop: {
        fontSize: 15
    },
    cropType: {
        fontSize: 25
    }

};
const mapStateToProps = (state) => {
    //console.log(state.openPositionsCount)
    return {
     openOrders: state.openWorkingOrders,
        openPositionsCount: state.openPositionsCount
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ dashboardOpenWorkingOrdersCount,
                                 dashboardOpenPositionsCount }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(DashBoard);
