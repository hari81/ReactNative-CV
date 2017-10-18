import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import cancelimage from './img/Cancel-20.png';
import { Button } from './Button';
import { Input } from './Input';
import { invalidateSession } from '../../redux/actions/LogOutMenuBar/InvalidateSessionAction';
import { changePassword } from '../../redux/actions/LogOutMenuBar/ChangePasswordAction';


const { width, height } = Dimensions.get('window');
class SideMenuBar extends Component {
    constructor() {
        super();
        this.state = {
            popUpAlert: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }

    changePasswordButtonPress = () => {
        this.setState({ popUpAlert: !this.state.popUpAlert });
    }
    logOutButtonPress = () => {
        this.props.invalidateSession();
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
    changePasswordAlert = () => {
        if (this.state.popUpAlert) {
            return(
                <View style={styles.resetPasswordContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                       <Text style={{ fontSize: 26 }}>Change Password</Text>
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
                       <Button onPress={this.submitPassword} buttonStyle={{ flex: 1, backgroundColor: '#01aca8', borderRadius: 5, borderWidth: 1, borderColor: '#01aca8', marginRight: 10 }}>Submit</Button>
                       <Button onPress={this.cancelButton} textStyle={{ alignSelf: 'center', color: 'grey', fontSize: 20, paddingTop: 10, paddingBottom: 10 }} buttonStyle={{ flex: 1, borderRadius: 5, borderWidth: 1, borderColor: '#01aca8' }}>Cancel</Button>
                    </View>
               </View>
            );
        }
    }
    render() {
        return (
            <View style={styles.messageContainer}>
                <View style={[styles.triangle, { marginLeft: width * 0.96 }]} />
                <View style={[styles.messageBox, { marginLeft: width * 0.74 }]}>
                    <TouchableOpacity onPress={this.cancelButton} >
                        <View style={{ marginLeft: width * 0.2324, marginTop: 2 }}>
                            <Image source={cancelimage} style={{ width: width * 0.0156, height: width * 0.0156 }} />
                        </View>
                    </TouchableOpacity>
                    <Button onPress={this.changePasswordButtonPress} buttonStyle={{}} textStyle={styles.messageBoxText}>{'Change Password'}</Button>
                    <Button onPress={this.logOutButtonPress} buttonStyle={{}} textStyle={styles.messageBoxText}>{'Log Out'}</Button>
                </View>
                {this.changePasswordAlert()}
            </View>
        );
    }
}
const styles = {
    messageContainer: { position: 'absolute', marginTop: 35, left: 0, zIndex: 10 },
    triangle: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#ddd', borderLeftWidth: 8, borderRightWidth: 8, borderBottomWidth: 16, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd' },
    messageBox: { width: width * 0.253, borderColor: '#ddd', borderWidth: 2, backgroundColor: '#fff', borderRadius: 3, zIndex: 10 },
    messageBoxText: { fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 15, paddingTop: 0, paddingRight: 15, paddingBottom: 15 },
    resetPasswordContainer: { zIndex: 15, position: 'absolute', marginTop: height * 0.26, marginLeft: width * 0.25, width: width * 0.4, backgroundColor: 'rgb(239,244,247)', borderColor: '#ddd', borderWidth: 2, borderRadius: 3 }
}
export default connect(null, { invalidateSession, changePassword })(SideMenuBar);
