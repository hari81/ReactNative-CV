import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert, TouchableHighlight, Image } from 'react-native';
import Dimensions from 'Dimensions';

import { LogoHeader, CardSection, CropButton, FarmInput} from '../components/common';
import Plus from '../components/common/img/Plus.png';

const flag= {
    cornFlag2016: true, soyflag2016:false,
    cornFlag2017: false, soyflag2017:false,
    cornFlag2018: false, soyflag2018:false,
};

export default class MyFarm extends Component
{
    constructor()
    {
        super();
        this.state = {
            cornFlag2016: true, soyflag2016:false,
            cornFlag2017: false, soyflag2017:false,
            cornFlag2018: false, soyflag2018:false,
        }
    }
     onPress1()
     {
         this.setState({buttonFlag: true})
     }
    render() {
        const {width, height} = Dimensions.get('window');
        console.log(width, height);
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{
                    backgroundColor: '#3d4c57',
                    width,
                    height: height - 160,

                    marginRight: 30,
                    marginBottom: 15 }}>

                    <LogoHeader
                        phNumber="+1-952-742-7414"
                        subHeaderText="Price Hedging" />

                    <View style={{height: 80, backgroundColor: 'gray'}}>

                        <View style= {{ height: 60, borderTopColor: '#e7b514',
                            borderTopWidth: 3, backgroundColor: 'white', marginTop: 20, marginLeft: 20, marginRight: 20,
                                justifyContent: 'flex-start', flexDirection: 'row'}}>
                            <View style={{ height: 30, justifyContent: 'flex-end', borderRightColor: 'gray',
                                borderRightWidth: 2, marginTop: 20}}>
                                <Text style={{color: '#279989', fontSize : 25, paddingRight: 30, paddingLeft: 20}}> My Farm Set up </Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', height: 50, marginLeft: 30}}>
                                <Text> Please complete the fields below.
                                    This information will be used to provide you with insights </Text>
                                <Text> about your farm in the MY Farm section of the application.</Text>
                            </View>
                        </View>

                    </View>
                <View style= {{ height: height- 310, backgroundColor: 'white'}}>

                        {/*<View style={{marginLeft: 20, marginRight: 20}}>
                        <View style={{ width: 200, borderRightColor: 'gray', borderRightWidth: 2}}> </View>
                    </View>*/}

                    <View style= {{ height: height- 330, backgroundColor: '#3d4c57', marginLeft: 20,
                        marginRight: 20, marginTop: 20}}>

                        <Text style={{color: 'white', textAlign: 'center', marginTop: 20, fontSize: 20}}> My 2016 Corn Crop </Text>
                        <View style={{flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ marginRight: 50, borderRightWidth: 2, borderRightColor: 'white',
                                marginLeft: 20, flexDirection: 'column', justifyContent:'space-around', width: 450, height: 300 }}>

                                <Text style={{color: 'white', marginBottom: 10, marginLeft: 50}}> * Acres Planted &#8730; (acres) </Text>
                                <FarmInput placeholder="Acres Planted"/>
                                <Text style={{color: 'white', marginBottom: 10, marginTop: 30, marginLeft: 50}}> * Cost Per Acre </Text>
                                <FarmInput/>
                                <Text style={{color: 'white', marginBottom: 10, marginTop: 30, marginLeft: 50}}> * Profit Goal Per Acre </Text>
                                <FarmInput />
                                <Text style={{color: 'white', marginBottom: 10, marginTop: 30, marginLeft: 50}}> * Expected Yield </Text>
                                <FarmInput/>

                            </View>
                            <View>
                                <Text style={{color: 'white', marginLeft: 50, marginBottom: 10}}> * Crop Insurance Coverage </Text>
                                 <FarmInput />
                                <Text style={{color: 'white', marginLeft: 50, marginTop: 20}}> Physical Transactions Total </Text>
                                <Text style={{color: 'white', marginLeft: 50, marginBottom: 20}}> (Bushels) </Text>
                                <Text style={{color: 'white', marginLeft: 50}}> Weighted Average Price of </Text>
                                <Text style={{color: 'white', marginLeft: 50, marginBottom: 20}}> Physical Transactions($)</Text>
                                <Text style={{color: 'white', marginLeft: 50, marginBottom: 10}}> Enter Physical trades</Text>
                                <TouchableHighlight style={{marginLeft: 50, borderRadius: 5, borderColor: 'white', borderWidth: 1,
                                    height: 40, width: 300, backgroundColor: '#279989'}} >
                                    <View style = {{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={Plus} style={{ height: 35, width: 35, marginRight: 20 }}/>
                                        <Text style={{ color: 'white'}}> ADD/MODIFY PHYSICAL TRADES</Text>

                                    </View>

                                </TouchableHighlight>
                                <View style = {{ flexDirection: 'row', marginLeft: 50, marginTop: 20}}>
                                <TouchableHighlight style={{ backgroundColor: 'white', borderRadius: 5, height: 40, width: 150}}>
                                    <View style = {{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                                        <Text style={{ textAlign: 'center'}}> CLEAR ALL </Text>

                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight style={{marginLeft: 20,backgroundColor: '#279989', borderRadius: 5,
                                    height: 40, width: 150}}>
                                    <View style = {{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                                    <Text style={{ color: 'white'}}> SAVE </Text>

                                    </View>
                                </TouchableHighlight>
                            </View>

                            </View>
                            </View>
                        </View>

                    </View>

            </View>
            <View style={{
                    width: width,
                    height: 145,
                    backgroundColor: '#3d4c57',
                    alignItems: 'center',
                    justifyContent: 'center' }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems:'center'}}>
                    <Text style={{color: 'white', fontSize: 20 }}> MY CROPS </Text>
                    <View style={{height: 2, width: 820, backgroundColor: '#e7b514' }}/>
                </View>
                <ScrollView  horizontal showsHorizontalScrollIndicator>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15}}>

                        <TouchableHighlight  onPress={() => {
                            this.setState( {
                            cornFlag2016: true, soyflag2016:false,
                            cornFlag2017: false, soyflag2017:false,
                            cornFlag2018: false, soyflag2018:false,
                        })}}
                                     style={[styles.buttonStyle, this.state.cornFlag2016 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                                             >

                            <View style={[styles.buttonStyle, this.state.cornFlag2016 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.cornFlag2016 ? {color: "white"} : {color: "#3d4c57"}]}>2016</Text>
                                <Text style={[styles.cropType, this.state.cornFlag2016 ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                <Text style={[styles.yearCrop,this.state.cornFlag2016 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>



                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {this.setState( {
                            cornFlag2016: false, soyflag2016:true,
                            cornFlag2017: false, soyflag2017:false,
                            cornFlag2018: false, soyflag2018:false,
                        }); console.log(this.state);}}
                                    style={[styles.buttonStyle, this.state.soyflag2016 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                             >

                            <View style={[styles.buttonStyle, this.state.soyflag2016 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.soyflag2016 ? {color: "white"} : {color: "#3d4c57"}]}>2016</Text>
                                <Text style={[styles.cropType, this.state.soyflag2016 ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                <Text style={[styles.yearCrop,this.state.soyflag2016 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>

                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.setState( {
                            cornFlag2016: false, soyflag2016:false,
                            cornFlag2017: true, soyflag2017:false,
                            cornFlag2018: false, soyflag2018:false,
                        })}
                                    style={[styles.buttonStyle, this.state.cornFlag2017 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                             >
                            <View style={[styles.buttonStyle, this.state.cornFlag2017 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.cornFlag2017 ? {color: "white"} : {color: "#3d4c57"}]}>2017</Text>
                                <Text style={[styles.cropType, this.state.cornFlag2017 ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                <Text style={[styles.yearCrop,this.state.cornFlag2017 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>

                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.setState( {
                            cornFlag2016: false, soyflag2016:false,
                            cornFlag2017: false, soyflag2017:true,
                            cornFlag2018: false, soyflag2018:false,
                        })}
                                    style={[styles.buttonStyle, this.state.soyflag2017 ? {backgroundColor: "#279989"} : { backgroundColor: "white"}]}
                           >
                            <View style={[styles.buttonStyle, this.state.soyflag2017 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.soyflag2017 ? {color: "white"} : {color: "#3d4c57"}]}>2017</Text>
                                <Text style={[styles.cropType, this.state.soyflag2017 ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                <Text style={[styles.yearCrop,this.state.soyflag2017 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => this.setState( {
                                cornFlag2016: false, soyflag2016:false,
                                cornFlag2017: false, soyflag2017:false,
                                cornFlag2018: true, soyflag2018:false,
                            })}
                            style={[styles.buttonStyle, this.state.cornFlag2018 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}
                            >
                            <View style={[styles.buttonStyle, this.state.cornFlag2018 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.cornFlag2018 ? {color: "white"} : {color: "#3d4c57"}]}>2018</Text>
                                <Text style={[styles.cropType, this.state.cornFlag2018 ? {color: "white"} : {color: "#3d4c57"}]}>CORN</Text>
                                <Text style={[styles.yearCrop,this.state.cornFlag2018 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState( {
                            cornFlag2016: false, soyflag2016:false,
                            cornFlag2017: false, soyflag2017:false,
                            cornFlag2018: false, soyflag2018:true,
                        })}>
                            <View style={[styles.buttonStyle, this.state.soyflag2018 ? {backgroundColor: "#279989"} : {backgroundColor: "white"}]}>
                                <Text style={[styles.yearCrop,this.state.soyflag2018 ? {color: "white"} : {color: "#3d4c57"}]}>2018</Text>
                                <Text style={[styles.cropType, this.state.soyflag2018 ? {color: "white"} : {color: "#3d4c57"}]}>SOYBEAN</Text>
                                <Text style={[styles.yearCrop,this.state.soyflag2018 ? {color: "white"} : {color: "gray"}]}>Crop</Text>
                            </View>
                        </TouchableHighlight>


                    </View>
                </ScrollView>

                </View>
        </View>

        );
    }
}

const styles = {
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
}
