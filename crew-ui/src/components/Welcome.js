/*jshint esversion: 6 */
"use strict";
import React from "react";
import { Text, View, Linking, StatusBar } from "react-native";
import Dimensions from "Dimensions";
import LoginForm from "../containers/LoginForm";
import { Header, ImageLogo } from "./common/index";
import { PRIVACY, TERMS } from "../ServiceURLS/index";

export default class App extends React.Component {
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            backgroundColor: "black",
            width: width,
            height: 20
          }}
        />
        <View
          style={{
            backgroundColor: "#3d4c57",
            width: width - 100,
            height: height - 160,
            marginTop: 30,
            marginRight: 50,
            marginLeft: 50,
            marginBottom: 50
          }}
        >
          <Header headerText="Welcome" />

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 15, marginTop: 15 }}>
              Please log in below by entering your username and password
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
              alignItems: "stretch"
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                borderColor: "white"
              }}
            >
              <ImageLogo />
            </View>
            <View style={{ flex: 2 }}>
              <View style={{ alignItems: "flex-start", marginLeft: 50 }}>
                <Text style={{ fontSize: 20, color: "white" }}>
                  {" "}Login below{" "}
                </Text>
              </View>
              <LoginForm />
            </View>
          </View>
        </View>

        <View
          style={{
            width: width,
            height: 60,
            backgroundColor: "#3d4c57",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 12 }}>
              Cargill Website |{" "}
            </Text>
            <Text
              style={{ color: "white", fontSize: 12 }}
              onPress={() => Linking.openURL(PRIVACY)}
            >
              Privacy |{" "}
            </Text>
            <Text
              style={{ color: "white", fontSize: 12 }}
              onPress={() => Linking.openURL(TERMS)}
            >
              Terms & Conditions
            </Text>
          </View>

          <Text style={{ color: "white", fontSize: 12 }}>
            &copy; 2017 Cargill, Incorporated. All Rights Reserved.
          </Text>
        </View>
      </View>
    );
  }
}
