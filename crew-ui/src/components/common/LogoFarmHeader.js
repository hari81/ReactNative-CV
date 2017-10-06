import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { farmActionFlag } from '../../redux/actions/MyFarm/CropAction';
import User from './img/User.png';

const LogoFarmHeader = props => {
  const { viewStyle, subHeadTextStyle, phNumberStyle } = styles;
  return (
    <View style={viewStyle}>
      <View
        style={{
          marginLeft: 20,
          height: 40,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <TouchableHighlight onPress={() => { props.farmActionFlag(false); Actions.dashboard(); }}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./img/homeIcon.png')}
          />
        </TouchableHighlight>
        <Image
          style={{ width: 77, height: 35, marginLeft: 50, marginRight: 10 }}
          source={require('./img/logo-2.png')}
        />
        <Text style={subHeadTextStyle}>
          {props.subHeaderText}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: 20,
          alignItems: 'center'
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('./img/Phone.png')}
        />
        <Text style={phNumberStyle}>
          {props.phNumber}
        </Text>
        <Text style={{ fontSize: 30, color: 'white', paddingLeft: 20 }}>
          {' '}|{' '}
        </Text>
        <Image
          source={User}
          style={{ marginLeft: 20, width: 35, height: 35 }}
        />
          <TouchableHighlight onPress={()=> {}}>
        <Image
          source={require('./img/ExpandArrow.png')}
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
          </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgb(35,43,50)',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  subHeadTextStyle: {
    fontSize: 10,
    paddingTop: 10,
    color: '#ffffff'
  },
  phNumberStyle: {
    fontSize: 14,
    paddingTop: 8,
    color: '#ffffff'
  }
};

export default connect(null, { farmActionFlag })(LogoFarmHeader);
