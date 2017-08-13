/*jshint esversion: 6 */
"use strict";
import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableHighlight,
  Image,
  StatusBar, Slider
} from "react-native";
import Dimensions from "Dimensions";

import {
  LogoHeader,
  CardSection,
  CropButton,
  FarmInput
} from "../components/common";
import Plus from "../components/common/img/Plus.png";

export default class MyFarm extends Component {
  constructor() {
    super();
    this.state = {
      selectedButton: "CORN2016",
        farmInput:'',
      value: "",
      estimate: 0,
        acres: '',
        profit:'',
        cost:'',
        yield: ''
    };
  }

  onChangeButton(selectedButton) {
    this.setState({ selectedButton });
    switch (selectedButton) {
      case "CORN2016":
        //action
        return;
      case "CORN2017":
        //action
        return;
      case "CORN2018":
        //ACTION
        return;
      case "SOYBEAN2016":
        //ACTION
        return;
      case "SOYBEAN2017":
        //ACTION
        return;
      case "SOYBEAN2018":
        //ACTION
        return;
      default:
    }
  }
    onChangeAcres(value){
        const re = /[0-9]+$/;
        if ( re.test(value)) {
            this.setState({acres: value});
        }
    }
    onChangeCost(value){
        const re = /[0-9]+$/;
        if ( re.test(value)) {
            this.setState({cost: value});
        }
    }
    onChangeProfit(value){
        const re = /[0-9]+$/;
        if ( re.test(value)) {
            this.setState({profit: value});
        }
    }
    onChangeYield(value){
        const re = /[0-9]+$/;
        if ( re.test(value)) {
            this.setState({yield: value});
        }
    }
  render() {
    const { width, height } = Dimensions.get("window");
    console.log(width, height);
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {/* <StatusBar barStyle="light-content" />*/}
        <View
          style={{
            backgroundColor: "black",
            width: width,
            height: 20
          }}
        />
        <LogoHeader phNumber="+1-952-742-7414" subHeaderText="Price Hedging" />

        <View style={{ height: 80, backgroundColor: "gray" }}>
          <View
            style={{
              height: 60,
              borderTopColor: "#e7b514",
              borderTopWidth: 3,
              backgroundColor: "white",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              justifyContent: "flex-start",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: 30,
                justifyContent: "flex-end",
                borderRightColor: "gray",
                borderRightWidth: 2,
                marginTop: 20
              }}
            >
              <Text
                style={{
                  color: "#279989",
                  fontSize: 25,
                  paddingRight: 30,
                  paddingLeft: 20
                }}
              >
                {" "}My Farm Set up{" "}
              </Text>
            </View>
            <View
              style={{ justifyContent: "flex-end", height: 50, marginLeft: 30 }}
            >
              <Text>
                {" "}Please complete the fields below. This information will be
                used to provide you with insights{" "}
              </Text>
              <Text>
                {" "}about your farm in the My Farm section of the application.
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={{
                    backgroundColor: '#3d4c57',
                    width,
                    height: height - 250,

                    marginRight: 30,
                    marginBottom: 30 }}>*/}

        <View style={{ height: height - 290, backgroundColor: "white" }}>
          {/*<View style={{marginLeft: 20, marginRight: 20}}>
                        <View style={{ width: 200, borderRightColor: 'gray', borderRightWidth: 2}}> </View>
                    </View>*/}

          <View
            style={{
              height: height - 330,
              backgroundColor: "#3d4c57",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 20,
                fontSize: 20
              }}
            >
              My{" "}
              {this.state.selectedButton.slice(-4) +
                " " +
                this.state.selectedButton.substring(
                  0,
                  this.state.selectedButton.length - 4
                )}{" "}
              Crop
            </Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View
                style={{
                  marginRight: 50,
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  marginLeft: 20,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: 450,
                  height: 300
                }}
              >
                <Text
                  style={{ color: "white", marginBottom: 10, marginLeft: 50 }}
                >
                  {" "}* Acres Planted (acres){" "}
                </Text>
                <FarmInput value= {this.state.acres}
                           onblur = {() => { if(this.state.acres !== '') {this.setState({acres: this.state.acres + " acres"})}}}
                           onfocus = { () => { if(this.state.acres.slice(-5) === 'acres')
                           {this.setState({acres: this.state.acres.slice(0,(this.state.acres.length-6))
                           })}}}
                           onChangeText = {this.onChangeAcres.bind(this)}
                           placeholder="Ex: 2500 acres                              " />
                <Text
                  style={{
                    color: "white",
                    marginBottom: 10,
                    marginTop: 30,
                    marginLeft: 50
                  }}
                >
                  {" "}* Cost Per Acre{" "}
                </Text>
                <FarmInput
                    value= {this.state.cost}
                    onblur = {() => { if(this.state.cost !== '') {this.setState({cost: "$" +this.state.cost + " /per acre"})}}}
                    onfocus = { () => { if(this.state.cost.slice(-4) === 'acre')
                    {this.setState({cost: this.state.cost.slice(1,(this.state.cost.length-10))
                    })}}}
                    onChangeText = {this.onChangeCost.bind(this)}
                    placeholder="Ex: $525 /per acre              " />
                <Text
                  style={{
                    color: "white",
                    marginBottom: 10,
                    marginTop: 30,
                    marginLeft: 50
                  }}
                >
                  {" "}* Profit Goal Per Acre{" "}
                </Text>
                <FarmInput
                    value= {this.state.profit}
                    onblur = {() => { if(this.state.profit !== '') {this.setState({profit: "$" +this.state.profit + " /per acre"})}}}
                    onfocus = { () => { if(this.state.profit.slice(-4) === 'acre')
                    {this.setState({profit: this.state.profit.slice(1,(this.state.profit.length-10))
                    })}}}
                    onChangeText = {this.onChangeProfit.bind(this)}
                    placeholder="Ex: $75 /per acre      " />
                <Text
                  style={{
                    color: "white",
                    marginBottom: 10,
                    marginTop: 30,
                    marginLeft: 50
                  }}
                >
                  {" "}* Expected Yield{" "}
                </Text>
                <FarmInput
                    value= {this.state.yield}
                    onblur = {() => { if(this.state.yield !== '') {this.setState({yield: this.state.yield + " bushels"})}}}
                    onfocus = { () => { if(this.state.yield.slice(-7) === 'bushels')
                    {this.setState({yield: this.state.yield.slice(0,(this.state.yield.length-8))
                    })}}}
                    onChangeText = {this.onChangeYield.bind(this)}
                    placeholder="Ex: 175 bushels      " />
              </View>
              <View>
                <Text
                  style={{ color: "white", marginLeft: 50, marginBottom: 10 }}
                >
                  {" "}* Basis Estimate for Unsold Production (-/+){" "}
                </Text>
                  <Text style={[styles.slidenum, this.state.estimate > 0 ? {color:'green'} : {color:'red'}] }>
                      ${this.state.estimate.toFixed(2)}
                  </Text>
                      <Slider
                          style={{ marginLeft: 50, width: 300, }}
                          step={.01}
                          minimumValue={-2}
                          maximumValue={2}
                          value={this.state.estimate}
                          onValueChange={slideval => this.setState({ estimate: slideval })}
                          maximumTrackTintColor = 'red'
                          minimumTrackTintColor = 'green'
                          thumbTintColor = '#279989'
                      />



                <Text style={{ color: "white", marginLeft: 50, marginTop: 20 }}>
                  {" "}Physical Transactions Total{" "}
                </Text>
                <Text
                  style={{ color: "white", marginLeft: 50, marginBottom: 20 }}
                >
                  {" "}(Bushels){" "}
                </Text>
                <Text style={{ color: "white", marginLeft: 50 }}>
                  {" "}Weighted Average Price of{" "}
                </Text>
                <Text
                  style={{ color: "white", marginLeft: 50, marginBottom: 20 }}
                >
                  {" "}Physical Transactions($)
                </Text>
                <Text
                  style={{ color: "white", marginLeft: 50, marginBottom: 10 }}
                >
                  {" "}Enter Physical trades
                </Text>
                <TouchableHighlight
                  style={{
                    marginLeft: 50,
                    borderRadius: 5,
                    borderColor: "white",
                    borderWidth: 1,
                    height: 40,
                    width: 300,
                    backgroundColor: "#279989"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={Plus}
                      style={{ height: 35, width: 35, marginRight: 20 }}
                    />
                    <Text style={{ color: "white" }}>
                      {" "}ADD/MODIFY PHYSICAL TRADES
                    </Text>
                  </View>
                </TouchableHighlight>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 50,
                    marginTop: 20
                  }}
                >
                  <TouchableHighlight
                    style={{
                      backgroundColor: "white",
                      borderRadius: 5,
                      height: 40,
                      width: 150
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ textAlign: "center" }}> CLEAR ALL </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      marginLeft: 20,
                      backgroundColor: "#279989",
                      borderRadius: 5,
                      height: 40,
                      width: 150
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "white" }}> SAVE </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/*  </View>*/}
        <View
          style={{
            width: width,
            height: 145,
            backgroundColor: "#3d4c57",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}> MY CROPS </Text>
            <View
              style={{ height: 2, width: 820, backgroundColor: "#e7b514" }}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 15,
                marginRight: 15
              }}
            >
              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "CORN2016")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "CORN2016"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "CORN2016"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2016"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2016
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "CORN2016"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    CORN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2016"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "SOYBEAN2016")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "SOYBEAN2016"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "SOYBEAN2016"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2016"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2016
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "SOYBEAN2016"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    SOYBEAN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2016"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "CORN2017")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "CORN2017"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "CORN2017"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2017"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2017
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "CORN2017"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    CORN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2017"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "SOYBEAN2017")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "SOYBEAN2017"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "SOYBEAN2017"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2017"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2017
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "SOYBEAN2017"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    SOYBEAN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2017"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "CORN2018")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "CORN2018"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "CORN2018"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2018"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2018
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "CORN2018"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    CORN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "CORN2018"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onChangeButton.bind(this, "SOYBEAN2018")}
                style={[
                  styles.buttonStyle,
                  this.state.selectedButton === "SOYBEAN2018"
                    ? { backgroundColor: "#279989" }
                    : { backgroundColor: "white" }
                ]}
              >
                <View
                  style={[
                    styles.buttonStyle,
                    this.state.selectedButton === "SOYBEAN2018"
                      ? { backgroundColor: "#279989" }
                      : { backgroundColor: "white" }
                  ]}
                >
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2018"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    2018
                  </Text>
                  <Text
                    style={[
                      styles.cropType,
                      this.state.selectedButton === "SOYBEAN2018"
                        ? { color: "white" }
                        : { color: "#3d4c57" }
                    ]}
                  >
                    SOYBEAN
                  </Text>
                  <Text
                    style={[
                      styles.yearCrop,
                      this.state.selectedButton === "SOYBEAN2018"
                        ? { color: "white" }
                        : { color: "gray" }
                    ]}
                  >
                    Crop
                  </Text>
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
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10
  },
  yearCrop: {
    fontSize: 15
  },
  cropType: {
    fontSize: 25
  },

    slidenum: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

};
