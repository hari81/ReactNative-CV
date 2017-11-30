import React, { Component } from 'react';
import { Alert, Dimensions, Image, Linking, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import VersionNumber from 'react-native-version-number';
import { dashBoardDataFetch } from '../../redux/actions/Dashboard/DashboardAction';
import { Input } from './Input';
import Phone from './img/Phone.png';
import HomeIcon from './img/homeIcon.png';
import User from './img/User.png';
import imgCancel from './img/Cancel.png';
import imgLogo from '../common/img/logo-2.png';
import { farmActionFlag } from '../../redux/actions/MyFarm/CropAction';
import SideMenuBar from './SideMenuBar';
import bugsnag from '../common/BugSnag';
import { URL_PRIVACY, URL_TERMS, URL_LEARN_MORE } from '../../ServiceURLS/index';
import { changePassword } from '../../redux/actions/LogOutMenuBar/ChangePasswordAction';
import * as cStyles from '../../Utils/styles';

const { height, width } = Dimensions.get('window');

class CommonHeader extends Component {
    constructor() {
        super();
        this.state = {
            sideMenuBarShow: false,
            isShowAbout: false,
            isShowChangePassword: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''            
        };
    }

    toggleSideMenu =() => {
        this.setState({ sideMenuBarShow: !this.state.sideMenuBarShow });
    }

    sideMenuShow() {
        if (this.state.sideMenuBarShow) {
            return (
                <SideMenuBar 
                    onToggleSideMenu={this.toggleSideMenu}
                    onShowAbout={this.onShowHideAbout} 
                    onShowChangePassword={this.onShowHideChangePassword}
                />
            );
        }
    }

    homeButtonPress =() => {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        if (this.props.farmFlag) {
            if (!this.props.uservaluesfalg()) {
                this.props.farmActionFlag(false);
                this.props.dashBoardDataFetch(cropData[0].cropYear, cropData[0].code);
                Actions.dashboard();
            } else {
                Alert.alert(
                    'My Farm Data',
                    'Please CANCEL or SAVE your changes prior to proceeding to the next screen.',
                    [{ text: 'GOT IT!', style: 'OK' }],
                    { cancelable: false }
                );
            }
        } else {
            this.props.farmActionFlag(false);
            this.props.dashBoardDataFetch(cropData[0].cropYear, cropData[0].code);
            Actions.dashboard();
        }
    }

    /* About stuff */
    onShowHideAbout = () => {
        this.setState({ isShowAbout: !this.state.isShowAbout });
        if (!this.state.isShowAbout) {
            this.toggleSideMenu();
        }
    }

    onOpenAboutLink(linkUrl) {
        Linking.openURL(linkUrl);
    }

    aboutPopup = () => {
        if (this.state.isShowAbout) {
            return (
                <View style={[cStyles.common.popupContainer, styles.aboutContainer]}>
                    <View style={[cStyles.common.popupTitleContainer, styles.aboutTitleContainer]}>
                        <TouchableOpacity onPress={this.onShowHideAbout.bind(this)}>
                            <View style={{ marginLeft: 350, marginTop: 10 }}>
                                <Image source={imgCancel} style={{ width: 20, height: 20 }} />
                            </View>
                        </TouchableOpacity>
                        <Image source={imgLogo} style={{ alignSelf: 'center' }} />
                        <Text style={[cStyles.common.popupTitleText, styles.aboutTitle]}>PRICE HEDGING</Text>
                        <Text style={styles.aboutVersion}>Build Version {VersionNumber.buildVersion}</Text>
                    </View>
                    <TouchableOpacity style={styles.aboutLink} onPress={this.onOpenAboutLink.bind(this, URL_LEARN_MORE)}>
                        <Text style={styles.aboutLinkText}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aboutLink} onPress={this.onOpenAboutLink.bind(this, URL_PRIVACY)}>
                        <Text style={styles.aboutLinkText}>Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aboutLink} onPress={this.onOpenAboutLink.bind(this, URL_TERMS)}>
                        <Text style={styles.aboutLinkText}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    /* Change Password stuff */
    onShowHideChangePassword = () => {
        this.setState({ isShowChangePassword: !this.state.isShowChangePassword });
        if (!this.state.isShowChangePassword) {
            this.toggleSideMenu();
        }
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

    submitPasswordChange = () => {
        if (this.state.oldPassword && this.state.newPassword && this.state.confirmPassword && this.state.newPassword === this.state.confirmPassword) {
            this.props.changePassword(this.state.oldPassword, this.state.newPassword);
        } else {
            Alert.alert('Price Hedging', 'Please Enter Valid or Matching Passwords');
        }
    }

    cancelPasswordChange = () => {
        this.onShowHideChangePassword();
    }

    changePasswordPopup = () => {
        if (this.state.isShowChangePassword) {
            return (
                <View style={[cStyles.common.popupContainer, styles.resetPasswordContainer]}>
                    <View style={[cStyles.common.popupTitleContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                       <Text style={[cStyles.common.popupTitleText, { margin: 5, marginBottom: 10 }]}>Change Password</Text>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Input
                            placeholder="Old Password"
                            secureTextEntry containerStyle={{ height: 40, marginVertical: 5, backgroundColor: 'white' }}
                            onChangeText={this.oldPasswordTextChange}
                        />
                        <Input
                            placeholder="New Password"
                            secureTextEntry containerStyle={{ height: 40, marginVertical: 5, backgroundColor: 'white' }}
                            onChangeText={this.newPasswordTextChange}
                        />
                        <Input
                            placeholder="Confirm Password"
                            secureTextEntry containerStyle={{ height: 40, marginVertical: 5, backgroundColor: 'white' }}
                            onChangeText={this.confirmPasswordTextChange}
                        />
                        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={this.cancelPasswordChange} style={[styles.passwordButtonStyle, { backgroundColor: '#fff', marginRight: 10 }]}>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: '#9fa9ba' }}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.submitPasswordChange} style={styles.passwordButtonStyle}>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: '#fff' }}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
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
                <View style={{ flexDirection: 'row', height: '6%', backgroundColor: 'rgb(35,43,50)', zIndex: 1 }}>
                    <TouchableOpacity onPress={this.homeButtonPress}>
                        <View style={{ width: width * 0.073 }}>
                            <Image source={HomeIcon} style={{ width: width * 0.033, height: height * 0.042, marginLeft: width * 0.023, marginTop: 6 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: width * 0.020, alignItems: 'center' }}>
                        <Image style={{ width: width * 0.074, height: height * 0.044, marginTop: 2, marginRight: 10 }} source={imgLogo} />
                        <Text style={{ color: '#fefefe', fontFamily: 'HelveticaNeue', fontSize: 10, marginTop: 18 }}>PRICE HEDGING</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.props.onPress} style={{ marginTop: 5, marginRight: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: width * 0.019, height: height * 0.026, marginRight: 5 }} source={this.props.refreshImg} />
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', color: '#fff', fontSize: 13, marginTop: 2 }}>{this.props.refreshTitle}</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ color: '#ffffff35', fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}> | </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15, marginRight: 15 }}>
                            <Image style={{ width: width * 0.017, height: height * 0.0234, marginLeft: 1, marginTop: 5, marginRight: 3 }} source={Phone} />
                            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue-Light', fontSize: 14, marginTop: 5 }}>1-952-742-7414</Text>
                        </View>
                        <Text style={{ color: '#ffffff35', fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}> | </Text>
                        <TouchableHighlight onPress={this.toggleSideMenu}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image style={{ width: width * 0.031, height: height * 0.0416, marginLeft: 20 }} source={User} />
                                <Image source={require('./img/ExpandArrow.png')} style={{ width: 10, height: 10, marginLeft: 10, marginTop: 10, marginRight: 20 }} />
                        </View>
                        </TouchableHighlight>
                    </View>
                    {this.sideMenuShow()}
                    {this.aboutPopup()}
                    {this.changePasswordPopup()}                    
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const styles = {
    aboutContainer: { top: 150, left: (width / 2) - 200, backgroundColor: '#fff', width: 400 },
    aboutTitleContainer: { backgroundColor: '#3d4c57', padding: 20, paddingTop: 0 },
    aboutTitle: { color: '#fff', paddingTop: 10, paddingBottom: 15 },
    aboutVersion: { color: '#fff', fontFamily: 'HelveticaNeue', fontSize: 16, textAlign: 'center', paddingBottom: 5 },
    aboutLink: { marginBottom: 5, padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
    aboutLinkText: { fontFamily: 'HelveticaNeue', fontSize: 16, padding: 10, color: '#485761', textDecorationLine: 'underline' },
    resetPasswordContainer: { top: 150, left: (width / 2) - 200, width: 450, backgroundColor: '#404e59' },
    passwordButtonStyle: { backgroundColor: '#279989', paddingTop: 10, paddingBottom: 10, minWidth: 160, justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
};

const mapStateToProps = (state) => {
    return {
        farmFlag: state.myFar.farmFlag,
        cropButton: state.cropsButtons,
        acc: state.account
    };
};

export default connect(mapStateToProps, { farmActionFlag, dashBoardDataFetch, changePassword })(CommonHeader);
