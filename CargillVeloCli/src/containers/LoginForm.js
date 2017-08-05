import React, { Component } from 'react';
import { Text, View, Switch, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import base64 from 'base-64';
import { emailChanged, passwordChanged, saveUserSwitchChanged } from '../redux/actions/index';
import { Button, Card, CardSection, Input, Spinner } from '../components/common/index';
import { loginUser } from '../redux/actions/LoginAuth';

class LoginForm extends Component {
    constructor()
    {
        super();
        AsyncStorage.getItem('userData')
            .then((data) => {
                const userInfo = JSON.parse(data);
                if (userInfo) {
                    this.props.emailChanged(userInfo.email ? base64.decode(userInfo.email) : '');
                    this.props.saveUserSwitchChanged({ value: true });
                }
            })
            .catch((error) => {
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
        const { email, password, saveUser } = this.props.auth;
        this.props.loginUser({ email, password, saveUser });
    }
   onSaveUserChange(value) {
        this.props.saveUserSwitchChanged({ value });
    }

    renderButton() {
        if (this.props.loading) {
           return ( <Spinner size="large"/> );
        } else {

           return (<Button onPress={this.onButtonPress.bind(this)}>Login</Button>);
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
                <CardSection>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                    >
                        <Switch
                            style={{ backgroundColor: '#3d4c57' }}
                            onTintColor="#01aca8"
                            onValueChange={this.onSaveUserChange.bind(this)}
                            value={this.props.auth.saveUser}
                        />

                        <Text
                            style={{ fontSize: 20, marginLeft: 20, color: '#ffffff' }}
                        > Save Username </Text>
                    </View>
                </CardSection>

                <Text style={styles.errorStyle}> {this.props.error} </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <Text style={{ fontSize: 20, color: 'white' }}>
                    Having trouble logging in? Please call +1-952-742-7414 or
                    email cargillpricehedge@cargill.com
                </Text>

            </Card>
        );
    }
    }

    const styles = {
    errorStyle: {
        color: 'red',
        marginLeft: 200
    }
    };

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ emailChanged, passwordChanged, loginUser, saveUserSwitchChanged }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
