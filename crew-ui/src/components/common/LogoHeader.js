import React from 'react';
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import cargillLogoWhite from './img/cargillLogoWhite.png';
import Phone from './img/Phone.png';
import HomeIcon from './img/homeIconMed.png';
import User from './img/User.png';

const LogoHeader = props => {
  return (
    <View style={{ flexDirection: 'row', height: 43, backgroundColor: 'rgb(35,43,50)' }}>
      <TouchableHighlight onPress={() => Actions.dashboard()}>
          <Image source={HomeIcon} style={{ width: 24, height: 24, marginLeft: 20, marginTop: 10 }} />
      </TouchableHighlight>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 35, alignItems: 'center' }}>
          <Image style={{ width: 76, height: 34, marginTop: 2, marginRight: 10 }} source={cargillLogoWhite} />
          <Text style={{ color: '#fefefe', fontFamily: 'HelveticaNeue', fontSize: 10, marginTop: 18 }}>{props.subHeaderText.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15, marginRight: 15 }}>
              <Image style={{ width: 18, height: 18, marginLeft: 1, marginTop: 5, marginRight: 3 }} source={Phone} />
              <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue-Light', fontSize: 14, marginTop: 5 }}> {props.phNumber}</Text>
          </View>
          <Text style={{ color: '#ffffff35', fontFamily: 'HelveticaNeue-Thin', fontSize: 20 }}> | </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image style={{ width: 32, height: 32, marginLeft: 20 }} source={User} />
              <TouchableHighlight onPress={() => Alert.alert('Soon...')/*this.props.logOut(true)*/}>
                  <Image source={require('./img/ExpandArrow.png')} style={{ width: 10, height: 10, marginLeft: 10, marginTop: 10, marginRight: 20 }} />
              </TouchableHighlight>
          </View>
      </View>
    </View>
  );
};

export { LogoHeader };
