import React from 'react';
import { View } from 'react-native';

const Card = (props) =>
   (
    <View style={styles.containerStyle}>
      {props.children}

    </View>
  );


const styles = {
  containerStyle: {
  
    elevation: 1,
    marginLeft: 50,
    marginRight: 70,
    marginTop: 10,
    marginBottom: 5,
  }
};

export { Card };
