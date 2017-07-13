import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Alert,Switch } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false, swichValue: false };

  toggleSwitch = (value) => this.setState({switchValue: value})

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

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

        {/*<CardSection> dsfddsf </CardSection> */}

        <CardSection>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
      {/*   <TouchableHighlight style={styles.buttonStyle} onPress={() => Alert.alert("You touched on me")}>
         <Text></Text>
         </TouchableHighlight> */}

        <Switch onValueChange = {this.toggleSwitch} value = {this.state.switchValue? true : false} />

        <Text style={{color: 'white', fontSize: 20, marginLeft: 20}}> Save Username </Text>
        </View>
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Text style={{fontSize: 20, color: 'white'}}> Having trouble loggin in? Please call +1-952-742-7414 or
           email cargillpricehedge@cargill.com</Text>
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
