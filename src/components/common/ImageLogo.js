import { Image, View, Text, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';

const ImageLogo = () => {
  return (
    <View style={styles.imageContainer}>
    <Image source={require('./logo.png')}
     style={styles.logoStyle} />
     <Text style={styles.textStyle}> Price Hedging</Text>
     </View>
  )
};

const styles = {
  imageContainer: {
    justifyContent: 'center',
    //alignItems: 'left',
    marginLeft: 2,
    marginRight: 20,
    flexDirection: 'column',
    paddingTop: 25,
    paddingBottom: 10,

  },

  logoStyle: {
    height: 50,
    width: 120,
    paddingLeft: 10,
    //alignItems: 'flex-start',

  },
  textStyle: {
    fontSize: 25,
    color: 'white',
    //backgroundColor: '#279989'
    //justifyContent: 'center',
    //alignItems: 'center',

  },


}

export { ImageLogo };
