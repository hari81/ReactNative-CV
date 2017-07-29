import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, switchChanged } from '../redux/actions/index';
import { Button, Card, CardSection, Input } from '../components/common/index';

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
   onSwitchChange(value) {
        const { email } = this.props;
        console.log(email)
        this.props.switchChanged({ email, value });
    }

    onLoginButton() {
        return (
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        );
    }

    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                        placeholder="Email"
                        label="Email"
                        onChangeText={this.onEmailChange.bind(this)}

                    />

                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="Password"
                        label="Password"
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                    >
                        <Switch
                            style={{ backgroundColor: '#007681' }}
                            onValueChange={this.onSwitchChange.bind(this)}
                            value={this.props.switchValue}
                        />

                        <Text
                            style={{ fontSize: 20, marginLeft: 20, color: '#ffffff' }}
                        > Save Username </Text>
                    </View>
                </CardSection>

                <CardSection>
                    {this.onLoginButton()}
                </CardSection>

                <Text style={{ fontSize: 20, color: 'white' }}>
                    Having trouble logging in? Please call +1-952-742-7414 or
                    email cargillpricehedge@cargill.com
                </Text>

            </Card>
        );
    }
    }

const mapStateToProps = ({ auth }) => {
    const { email, password } = auth
    return {
        email,
        password
    };
}
export default connect(mapStateToProps,
                       { emailChanged, passwordChanged, loginUser, switchChanged })(LoginForm);
