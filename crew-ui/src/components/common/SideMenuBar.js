import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { URL_PRIVACY, URL_TERMS, URL_LEARN_MORE } from '../../ServiceURLS/index';
import cancelimage from './img/Cancel-20.png';
import cancel from './img/Cancel.png';
import logo from '../common/img/logo-2.png';
import { Button } from './Button';
import { Input } from './Input';
import { invalidateSession } from '../../redux/actions/LogOutMenuBar/InvalidateSessionAction';
import { changePassword } from '../../redux/actions/LogOutMenuBar/ChangePasswordAction';
import { getAccountLimits } from '../../redux/actions/AccountDetails/AccountInfo';
import bugsnag from '../common/BugSnag';

const { width, height } = Dimensions.get('window');

class SideMenuBar extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isShowAbout: false,
            isShowChangePassword: false
        };
    }
    changePasswordButtonPress = () => {
        this.setState({ isShowChangePassword: !this.state.isShowChangePassword });
    }
    logOutButtonPress = () => {
        Alert.alert('Price Hedging', 'Are you sure you want to log out?', [{ text: 'Cancel', onPress: () => this.cancelButton() }, { text: 'Yes', onPress: () => this.logout() }]);
    }
    logout =() => {
        this.props.invalidateSession();
        Actions.auth();
    }
    oldPasswordTextChange = (text) => {
        this.setState({ oldPassword: text });
    }
    newPasswordTextChange = (text) => {
        this.setState({ newPassword: text });
    }
    confirmPasswordTextChange = (text) => {
        this.setState({ confirmPassword: text });
    }
    submitPassword = () => {
        if (this.state.oldPassword && this.state.newPassword && this.state.confirmPassword && this.state.newPassword === this.state.confirmPassword) {
            this.props.changePassword(this.state.oldPassword, this.state.newPassword);
        } else {
            Alert.alert('Please Enter Valid or Matching Passwords');
        }
    }
    cancelButton = () => {
        this.props.hideSideMenu();
    }

    onAccountInfo() {
        this.props.getAccountLimits();        
    }

    onOpenAboutLink(linkUrl) {
        Linking.openURL(linkUrl);
    }

    onShowHideAbout() {
        this.setState({ isShowAbout: !this.state.isShowAbout });
        if (this.state.isShowAbout) {
            this.props.hideSideMenu();
        }
    }

    aboutPopup = () => {
        if (this.state.isShowAbout) {
            return (
                <View style={styles.aboutContainer}>
                    <View style={styles.aboutTitleContainter}>
                        <TouchableOpacity onPress={this.onShowHideAbout.bind(this)}>
                            <View style={{ marginLeft: 350, marginTop: 4 }}>
                                <Image source={cancel} style={{ width: 20, height: 20 }} />
                            </View>
                        </TouchableOpacity>
                        <Image source={logo} style={{ alignSelf: 'center' }} />
                        <Text style={styles.aboutTitle}>PRICE HEDGING</Text>
                        <Text style={styles.aboutVersion}>Version 2.0</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.aboutLink}
                        onPress={this.onOpenAboutLink.bind(this, URL_LEARN_MORE)}
                    >
                        <Text style={styles.aboutLinkText}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.aboutLink}
                        onPress={this.onOpenAboutLink.bind(this, URL_PRIVACY)}
                    >
                        <Text style={styles.aboutLinkText}>Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.aboutLink}
                        onPress={this.onOpenAboutLink.bind(this, URL_TERMS)}
                    >
                        <Text style={styles.aboutLinkText}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    changePasswordAlert = () => {
        if (this.state.isShowChangePassword) {
            return (
                <View style={styles.resetPasswordContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                       <Text style={{ fontSize: 26, color: 'white' }}>Change Password</Text>
                    </View>
                    <View style={{ justifyContent: 'space-around' }}>
                       <Input
                           placeholder="Old Password"
                           secureTextEntry containerStyle={{ height: 40, marginVertical: 5, marginHorizontal: 20, backgroundColor: 'white' }}
                           onChangeText={this.oldPasswordTextChange}
                       />
                       <Input
                           placeholder="New Password"
                           secureTextEntry containerStyle={{ height: 40, marginVertical: 5, marginHorizontal: 20, backgroundColor: 'white' }}
                           onChangeText={this.newPasswordTextChange}
                       />
                       <Input
                           placeholder="Confirm Password"
                           secureTextEntry containerStyle={{ height: 40, marginVertical: 5, marginHorizontal: 20, backgroundColor: 'white' }}
                           onChangeText={this.confirmPasswordTextChange}
                       />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
                        <Button onPress={this.cancelButton} textStyle={{ alignSelf: 'center', color: 'white', fontSize: 20, paddingTop: 10, paddingBottom: 10 }} buttonStyle={{ flex: 1, borderRadius: 5, borderWidth: 1, borderColor: '#01aca8' }}>Cancel</Button>
                        <Button onPress={this.submitPassword} buttonStyle={{ flex: 1, backgroundColor: '#01aca8', borderRadius: 5, borderWidth: 1, borderColor: '#01aca8', marginLeft: 10 }}>Submit</Button>
                    </View>
               </View>
            );
        }
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
                        <Button onPress={this.onAccountInfo.bind(this)} buttonStyle={{}} textStyle={styles.messageBoxText}>{'Account Information'}</Button>
                        <Button onPress={this.changePasswordButtonPress} buttonStyle={{}} textStyle={styles.messageBoxText}>{'Change Password'}</Button>
                        <Button onPress={this.logOutButtonPress} buttonStyle={{}} textStyle={styles.messageBoxText}>{'Log Out'}</Button>
                        <Button onPress={this.onShowHideAbout.bind(this)} buttonStyle={{}} textStyle={styles.messageBoxText}>{'About'}</Button>
                    </View>
                    {this.changePasswordAlert()}
                    {this.aboutPopup()}
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

    aboutContainer: { zIndex: 1000, alignSelf: 'center', borderWidth: 2, backgroundColor: '#fff', borderColor: '#bed8dd', width: 400, shadowColor: '#aaa', shadowOffset: { width: 2, height: 2 }, shadowRadius: 5, shadowOpacity: 0.8 },
    aboutTitleContainter: { backgroundColor: '#3d4c57', padding: 20, paddingTop: 0 },
    aboutTitle: { color: '#fff', fontFamily: 'HelveticaNeue-Thin', fontSize: 24, textAlign: 'center', paddingTop: 10, paddingBottom: 15 },
    aboutVersion: { color: '#fff', fontFamily: 'HelveticaNeue', fontSize: 18, textAlign: 'center', paddingBottom: 10 },
    aboutLink: { marginBottom: 5, padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
    aboutLinkText: { fontFamily: 'HelveticaNeue', fontSize: 16, padding: 10, color: '#485761', textDecorationLine: 'underline' }
};

const mapStateToProps = state => {
    return { acc: state.account };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            invalidateSession, 
            changePassword, 
            getAccountLimits
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBar);
