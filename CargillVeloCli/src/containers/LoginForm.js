import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, switchChanged } from '../actions/index';
import { Button, Card, CardSection, Input, Spinner } from '../components/common/index';

class LoginForm extends Component {
    state= { switchValue: false }

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
    onSwitchChange(text) {
        this.props.switchChanged(text);
    }

    toggleSwitch = (value) => this.setState({ switchValue: value })
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        );
    }
    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <CardSection>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                    >
                        <Switch
                            style={{ backgroundColor: '#007681' }}
                            onValueChange={this.onSwitchChange.bind(this)}
                            value={this.state.switchValue}
                        />

                        <Text
                            style={{ fontSize: 20, marginLeft: 20 }}
                        > Save Username </Text>
                    </View>
                </CardSection>
                <CardSection>
                    <Text style={styles.errorStyles}>
                        {this.props.error}
                    </Text>
                    <Text style={{ color: 'green', fontSize: 20 }}>
                        {this.props.message}
                    </Text>


                </CardSection>
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
    errorStyles: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, message, loading } = auth
    return {
        email,
        password,
        error,
        message,
        loading
    };
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, switchChanged })(LoginForm);
