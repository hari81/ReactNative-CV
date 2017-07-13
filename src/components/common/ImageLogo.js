import { Image, View, Text, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';

const ImageLogo = () => {
  return (
    <View style={styles.imageContainer}>
    <TouchableOpacity title="Hedging" style={styles.buttonStyle} onPress={()=>Alert.alert("you Clciked")}>
    <Image source={{uri: 'https://www.cargill.com/image/1432080092113/cargill-color-logo.jpg'}}
     style={styles.logoStyle} />
     <Text style={styles.textStyle}> Price Hedging</Text>
    </TouchableOpacity>


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
  buttonStyle: {
    //flex: 1,
    //alignSelf: 'stretch',
    backgroundColor: 'green',
    borderRadius: 5,
  //  borderWidth: 1,
  //  borderColor: 'green',
    marginLeft: 5,
    marginRight: 5
  },
  logoStyle: {
    height: 150,
    width: 250,
    paddingLeft: 10,
    //alignItems: 'flex-start',

  },
  textStyle: {
    fontSize: 35,
    color: 'white',
    backgroundColor: '#279989'
    //justifyContent: 'center',
    //alignItems: 'center',

  },


}

export { ImageLogo };
