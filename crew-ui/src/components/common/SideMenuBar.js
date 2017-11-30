import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cancelimage from './img/Cancel-20.png';
import { Button } from './Button';
import { invalidateSession } from '../../redux/actions/LogOutMenuBar/InvalidateSessionAction';
import { getAccountLimits } from '../../redux/actions/AccountDetails/AccountInfo';
import bugsnag from '../common/BugSnag';

const { width, height } = Dimensions.get('window');

class SideMenuBar extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }

    logOutButtonPress = () => {
        Alert.alert('Price Hedging', 'Are you sure you want to log out?', [{ text: 'Cancel', onPress: () => this.cancelButton() }, { text: 'Yes', onPress: () => this.logout() }]);
    }

    logout =() => {
        this.props.invalidateSession();
        Actions.auth();
    }

    onAccountInfo() {
        this.props.getAccountLimits();        
    }

    onAbout() {
        this.props.onShowAbout();
    }

    onChangePassword() {
        this.props.onShowChangePassword();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={styles.messageContainer}>
                    <View style={[styles.triangle, { marginLeft: width * 0.94, marginTop: 4 }]} />
                    <View style={[styles.messageBox, { marginLeft: width * 0.74 }]}>
                        <TouchableOpacity onPress={this.cancelButton}>
                            <View style={{ marginLeft: width * 0.2324, marginTop: 2 }}>
                                <Image source={cancelimage} style={{ width: width * 0.0156, height: width * 0.0156 }} />
                            </View>
                        </TouchableOpacity>
                        <Button onPress={this.onAccountInfo.bind(this)} buttonStyle={{}} textStyle={styles.messageBoxText}>Account Information</Button>
                        <Button onPress={this.onChangePassword.bind(this)} buttonStyle={{}} textStyle={styles.messageBoxText}>Change Password</Button>
                        <Button onPress={this.logOutButtonPress} buttonStyle={{}} textStyle={styles.messageBoxText}>Log Out</Button>
                        <Button onPress={this.onAbout.bind(this)} buttonStyle={{}} textStyle={styles.messageBoxText}>About</Button>
                    </View>
                </View>
            );
        } catch (error) {
                bugsnag.notify(error);
        }
    }
}
const styles = {
    messageContainer: { position: 'absolute', marginTop: 35, left: 0, zIndex: 10 },
    triangle: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#ddd', borderLeftWidth: 8, borderRightWidth: 8, borderBottomWidth: 16, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd' },
    messageBox: { width: width * 0.253, borderColor: '#ddd', borderWidth: 2, backgroundColor: '#fff', borderRadius: 3, zIndex: 10 },
    messageBoxText: { fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 15, paddingTop: 0, paddingRight: 15, paddingBottom: 15 },
    resetPasswordContainer: { zIndex: 15, position: 'absolute', marginTop: height * 0.16, marginLeft: width * 0.29, width: width * 0.4, backgroundColor: 'rgb(64,78,89)', borderColor: '#ddd', borderWidth: 2, borderRadius: 3 },
};

const mapStateToProps = state => {
    return { acc: state.account };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            invalidateSession, 
            getAccountLimits
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBar);
