import React, { Component } from 'react';
import { Text, View, Switch, AsyncStorage, ScrollView, AlertIOS, Linking, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import base64 from 'base-64';
import { Button, Card, CardSection, Input, Spinner } from '../components/common/index';
import { loginUser, forGetPassword } from '../redux/actions/LoginAuth';
import { productType } from '../redux/actions/QuoteSwap/ProductType/ProductType';
import { accountDetails } from '../redux/actions/AccountDetails/AccountInfo';
import { displayProperties } from '../redux/actions/Dashboard/DisplayPropertiesAction';
import { URL_SIGN_UP } from '../ServiceURLS/index';
import bugsnag from '../components/common/BugSnag';

const { height, width } = Dimensions.get('window');
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
      .catch(/*error => {
        throw new Error(error);
      }*/bugsnag.notify);
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
          if (Object.keys(newProps.acc.accountDetails).length > 0) {
              this.setState({ signIn: true });
              return;
          }
         this.props.accountDetails();
          this.props.productType();
          this.props.displayProperties();

      }
      if (newProps.auth.error) {
          AlertIOS.alert('Error', newProps.auth.msg);
      }
  }

  render() {
      try {
          bugsnag.setUser(`User Id: ${this.state.email}`, this.state.email, this.state.email);
          bugsnag.leaveBreadcrumb('Navigated to Scene [LoginForm]', {
              type: 'navigation',
              component: '<LoginForm />',
              previousScene: 'Main',
          });
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

                      <CardSection>
                          <View
                              style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  marginTop: 20
                              }}
                          >
                              <Switch
                                  style={{backgroundColor: '#3d4c57', marginLeft: 10}}
                                  onTintColor='#01aca8'
                                  onValueChange={this.onSaveUserChange.bind(this)}
                                  value={this.state.saveUser}
                              />

                              <Text style={{fontSize: 15, marginLeft: 15, color: '#ffffff'}}>
                                  Save Username
                              </Text>
                          </View>
                      </CardSection>

                      <CardSection>
                          {this.renderButton()}
                      </CardSection>
                        <View style={{ flexDirection: 'row' }}>
                            <Button 
                                buttonStyle={{}}
                                textStyle={{ color: 'white', textDecorationLine: 'underline', fontSize: 16 }}
                                onPress={this.forGetPass.bind(this)}
                            > Forgot Password? </Button>
                            <Button 
                                buttonStyle={{ marginLeft: width * 0.02 }}
                                textStyle={{ color: 'white', textDecorationLine: 'underline', fontSize: 16 }}
                                onPress={() => Linking.openURL(URL_SIGN_UP)}
                            > Not Registered? Sign Up Now! </Button>
                        </View>
                        <View style={{ paddingLeft: 5, paddingTop: 15 }}>
                            <Text style={{ fontSize: 13, color: '#fff' }}>Having trouble logging in? Please call +1-952-742-7414</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 13, color: '#fff' }}>or email: </Text>
                                <Button 
                                    textStyle={{ fontSize: 13, color: '#fff', textDecorationLine: 'underline' }} 
                                    buttonStyle={{}} onPress={() => Linking.openURL('mailto:cargillpricehedge@cargill.com')}
                                >cargillpricehedge@cargill.com</Button>
                            </View>
                            <Text style={{ fontSize: 12, color: '#fff', paddingTop: 5 }}>Support available from 7:30am to 4:30pm CST Monday - Friday.</Text>
                        </View>
                  </Card>
              </ScrollView>
          );
      } catch (error) {
          bugsnag.notify(error);
      }
  }
}

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
