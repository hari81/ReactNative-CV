import React, { Component } from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false, switchValue: false };
  componentDidMount = () => {

      //Fetch calls from https://externalstage.commodityhedging.com/extracense/api

  }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        Actions.orders();
    }


    onButtonPress() {
        if (this.state.email !== 'Cargill1234') {
            Alert.alert('Please enter correct User name!...');
        } else if (this.state.password !== 'test1234') {
            Alert.alert('Incorrect Password, Please try again');
        } else {
            this.onLoginSuccess();
        }
    }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

    toggleSwitch = (value) => this.setState({ switchValue: value })

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (

      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>

    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Switch
                style={{ backgroundColor: '#007681' }}
                    onValueChange={this.toggleSwitch} value={this.state.switchValue ? true : false}
            />

            <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}> Save Username </Text>
        </View>
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Text style={{ fontSize: 20, color: 'white' }}>
              Having trouble login in? Please call +1-952-742-7414 or
           email cargillpricehedge@cargill.com
          </Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  buttonStyle: {
    //flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'green',
    borderRadius: 35,
    //borderWidth: 5,
    //borderColor: 'green',
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: 80
  }
};

export default LoginForm;
