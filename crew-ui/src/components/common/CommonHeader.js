import React from 'react';
import { Text, View, Image, TouchableHighlight, Alert, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { homeScreenDataFetch } from '../../redux/actions/Dashboard/DashboardAction';
import Logo from './img/logo-2.png';
import Phone from './img/Phone.png';
import HomeIcon from './img/homeIcon.png';
import User from './img/User.png';
import { farmActionFlag } from '../../redux/actions/MyFarm/CropAction';

const { height, width } = Dimensions.get('window');

const CommonHeader = (props) => {
    return (
        <View style={{ flexDirection: 'row', height: '6%', backgroundColor: 'rgb(35,43,50)' }}>
            <TouchableHighlight
                onPress={() => {
                if (props.farmFlag) {
                if (!props.uservaluesfalg()) {
                    props.farmActionFlag(false);
                    props.homeScreenDataFetch();
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
                    props.farmActionFlag(false);
                    props.homeScreenDataFetch();
                    Actions.dashboard();
                   }
                }
                }
            >
                <View style={{ width: width * 0.073 }}>
                <Image source={HomeIcon} style={{ width: width * 0.033, height: height * 0.042, marginLeft: width * 0.023, marginTop: 8 }} />
                </View>
            </TouchableHighlight>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: width * 0.020, alignItems: 'center' }}>
                <Image style={{ width: width * 0.074, height: height * 0.044, marginTop: 2, marginRight: 10 }} source={Logo} />
                <Text style={{ color: '#fefefe', fontFamily: 'HelveticaNeue', fontSize: 10, marginTop: 18 }}>PRICE HEDGING</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableHighlight onPress={props.onPress}>
                    <Image style={{ width: width * 0.019, height: height * 0.026, marginTop: 5, marginRight: 5 }} source={props.refreshImg} />
                </TouchableHighlight>
                <Text style={{ fontFamily: 'HelveticaNeue-Light', color: '#fff', fontSize: 13, marginTop: 5, marginRight: 15 }}>{props.title}</Text>
                <Text style={{ color: '#ffffff35', fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}> | </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15, marginRight: 15 }}>
                    <Image style={{ width: width * 0.017, height: height * 0.0234, marginLeft: 1, marginTop: 5, marginRight: 3 }} source={Phone} />
                    <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue-Light', fontSize: 14, marginTop: 5 }}> 1-952-742-7414</Text>
                </View>
                <Text style={{ color: '#ffffff35', fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}> | </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image style={{ width: width * 0.031, height: height * 0.0416, marginLeft: 20 }} source={User} />
                    <TouchableHighlight onPress={() => Alert.alert('Soon...')}>
                        <Image source={require('./img/ExpandArrow.png')} style={{ width: 10, height: 10, marginLeft: 10, marginTop: 10, marginRight: 20 }} />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        farmFlag: state.myFar.farmFlag
    };
}

export default connect(mapStateToProps, { farmActionFlag, homeScreenDataFetch })(CommonHeader);
