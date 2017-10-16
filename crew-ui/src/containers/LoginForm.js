import React, { Component } from 'react';
import { Text, View, Switch, AsyncStorage, ScrollView, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import base64 from 'base-64';
import { emailChanged, passwordChanged, saveUserSwitchChanged } from '../redux/actions/index';
import { Button, Card, CardSection, Input, Spinner } from '../components/common/index';
import { loginUser, forGetPassword } from '../redux/actions/LoginAuth';
import { productType } from '../redux/actions/QuoteSwap/ProductType/ProductType';
import { accountDetails } from '../redux/actions/AccountDetails/AccountInfo';
import { displayProperties } from '../redux/actions/Dashboard/DisplayPropertiesAction';
import { signUpNow } from '../ServiceURLS/index';

const { height, width } = Dimensions.get('window')

class LoginForm extends Component {
  constructor() {
    super();
      this.state = { signIn: false };
    AsyncStorage.getItem('userData')
      .then(data => {
        const userInfo = JSON.parse(data);
        if (userInfo) {
          this.props.emailChanged(
            userInfo.email ? base64.decode(userInfo.email) : ''
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
      const { saveUser } = this.props.auth;
      this.props.loginUser({ saveUser });
  }

  onSaveUserChange(value) {
    this.props.saveUserSwitchChanged({ value });
  }

  renderButton() {
    if (this.props.auth.loading) {
      return <Spinner size='large' />;
    } else {
      return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
    }
  }

  scrollChange() {
      this.refs.scrollView.scrollTo({ x: 0, y: 50, animated: true });
  }

  scrollDown() {
      this.refs.scrollView.scrollToEnd();
  }

  forGetPass() {
  this.props.forGetPassword(this.props.auth.email); //this.props.auth.email.slice(0, this.props.auth.email.indexOf('@')));
  }
  componentWillReceiveProps(newProps) {
      if (newProps.auth.loginSuccess && !this.state.signIn) {
          this.props.accountDetails();
          this.props.productType();
          this.props.displayProperties();
          this.setState({ signIn: true });
      }
  }

  render() {
    return (
        <ScrollView ref='scrollView' keyboardDismissMode='interactive' keyboardShouldPersistTaps='never'>
      <Card>
        <CardSection>
          <Input
            placeholder='Email'
            label='Email'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.auth.email}

          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='Password'
            label='Password'
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.auth.password}
            onfocus={this.scrollChange.bind(this)}
            onblur={this.scrollDown.bind(this)}
          />
        </CardSection>
        <Text style={styles.errorStyle}>
          {this.props.auth.error}
        </Text>
        <CardSection>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Switch
              style={{ backgroundColor: '#3d4c57', marginLeft: 10 }}
              onTintColor='#01aca8'
              onValueChange={this.onSaveUserChange.bind(this)}
              value={this.props.auth.saveUser}
            />

            <Text style={{ fontSize: 15, marginLeft: 15, color: '#ffffff' }}>
              Save Username
            </Text>
          </View>
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>
          <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={this.forGetPass.bind(this)}> Forgot Password? </Text>
              <Text style={{ color: 'white', textDecorationLine: 'underline', paddingLeft: width * 0.16 }} onPress={() => Linking.openURL(signUpNow)}> Sign Up Now </Text>
          </View>
        <Text style={{ fontSize: 12, color: 'white', paddingLeft: 10, paddingTop: 20 }}>
          Having trouble logging in? Please call +1-952-742-7414 or email
          cargillpricehedge@cargill.com
        </Text>
      </Card>
     </ScrollView>
    );
  }
}

const styles = {
  errorStyle: {
    color: 'white',
    marginLeft: 100,
    fontSize: 20
  }
};

const mapStateToProps = state => {
  return { auth: state.auth, acc: state.account };
};
export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    saveUserSwitchChanged,
    productType,
    accountDetails,
    displayProperties,
    forGetPassword
})(LoginForm);
