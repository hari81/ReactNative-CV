import React from 'react';
import { View, Text, Image } from 'react-native';

class PriceHedging extends React.Component {
  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#007681s'}}>
        <Image source={require('./common/logo.png')} />
      </View>
    );
  }
}

export default PriceHedging;
