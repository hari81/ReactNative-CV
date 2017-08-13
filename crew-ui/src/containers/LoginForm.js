/*jshint esversion: 6 */
"use strict";

import React, { Component } from "react";
import { Text, View, Switch, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import base64 from "base-64";
import {
  emailChanged,
  passwordChanged,
  saveUserSwitchChanged
} from "../redux/actions/index";
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common/index";
import { loginUser } from "../redux/actions/LoginAuth";
class LoginForm extends Component {
  constructor() {
    super();
    AsyncStorage.getItem("userData")
      .then(data => {
        const userInfo = JSON.parse(data);
        if (userInfo) {
          this.props.emailChanged(
            userInfo.email ? base64.decode(userInfo.email) : ""
          );
          this.props.saveUserSwitchChanged({ value: true });
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { saveUser, email, password } = this.props.auth;
    this.props.loginUser({ saveUser }); //.then(response => console.log("login success", response));
  }
  onSaveUserChange(value) {
    this.props.saveUserSwitchChanged({ value });
  }

  renderButton() {
    if (this.props.auth.loading) {
      return <Spinner size="large" />;
    } else {
      return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="Email"
            label="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.auth.email}

          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="Password"
            label="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.auth.password}
          />
        </CardSection>
        <Text style={styles.errorStyle}>
          {this.props.auth.error}
        </Text>
        <CardSection>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Switch
              style={{ backgroundColor: "#3d4c57", marginLeft: 10 }}
              onTintColor="#01aca8"
              onValueChange={this.onSaveUserChange.bind(this)}
              value={this.props.auth.saveUser}
            />

            <Text style={{ fontSize: 15, marginLeft: 15, color: "#ffffff" }}>
              Save Username
            </Text>
          </View>
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <Text style={{ fontSize: 12, color: "white", paddingLeft: 10 }}>
          Having trouble logging in? Please call +1-952-742-7414 or email
          cargillpricehedge@cargill.com
        </Text>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    color: "white",
    marginLeft: 100,
    fontSize: 20
  }
};

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  saveUserSwitchChanged
})(LoginForm);
