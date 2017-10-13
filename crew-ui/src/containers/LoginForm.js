import React, { Component } from 'react';
import { Text, View, Switch, AsyncStorage, ScrollView, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import base64 from 'base-64';
import { Button, Card, CardSection, Input, Spinner } from '../components/common/index';
import { loginUser, forGetPassword } from '../redux/actions/LoginAuth';
import { productType } from '../redux/actions/QuoteSwap/ProductType/ProductType';
import { accountDetails } from '../redux/actions/AccountDetails/AccountInfo';
import { displayProperties } from '../redux/actions/Dashboard/DisplayPropertiesAction';

class LoginForm extends Component {
  constructor() {
    super();
      this.state = { email: '', password: '', signIn: false, saveUser: false };
    AsyncStorage.getItem('userData')
      .then(data => {
        const userInfo = JSON.parse(data);
        if (userInfo) {
            this.setState({ email: userInfo.email ? base64.decode(userInfo.email) : '', saveUser: true });
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  onEmailChange(text) {
      this.setState({ email: text });
  }

  onPasswordChange(text) {
      this.setState({ password: text });
  }

  onButtonPress() {
      this.props.loginUser(this.state.saveUser, this.state.email, this.state.password);
  }

  onSaveUserChange(value) {
      this.setState({ saveUser: value });
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
  this.props.forGetPassword(this.state.email);
  }

  componentWillReceiveProps(newProps) {
      if (newProps.auth.loginSuccess && !this.state.signIn) {
          this.props.accountDetails();
          this.props.productType();
          this.props.displayProperties();
          this.setState({ signIn: true });
      }
      if (newProps.auth.error) {
          AlertIOS.alert('Error', newProps.auth.msg);
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
            value={this.state.email}

          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='Password'
            label='Password'
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
            onfocus={this.scrollChange.bind(this)}
            onblur={this.scrollDown.bind(this)}
          />
        </CardSection>
           <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={this.forGetPass.bind(this)}> Forgot Password? </Text>


        <CardSection>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: 10,
              marginTop: 20
            }}
          >
            <Switch
              style={{ backgroundColor: '#3d4c57' }}
              onTintColor='#01aca8'
              onValueChange={this.onSaveUserChange.bind(this)}
              value={this.state.saveUser}
            />

            <Text style={{ fontSize: 15, paddingLeft: 15, color: '#ffffff' }}>
              Save Username
            </Text>
          </View>
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <Text style={{ fontSize: 12, color: 'white', paddingLeft: 10 }}>
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
    loginUser,
    productType,
    accountDetails,
    displayProperties,
    forGetPassword
})(LoginForm);
