import React from 'react';
import { Text, View } from 'react-native';
import Dimensions from 'Dimensions';
import LoginForm from '../containers/LoginForm';
import { Header, ImageLogo } from './common/index';

export default class App extends React.Component {
    render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
                style={{ backgroundColor: '#007681',
                width,
                height: height - 140,
                    marginTop: 10,
                    marginRight: 30,
                    marginBottom: 10
                }}
        >
            <Header headerText='Welcome' />

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 25 }}>
              Please log in below by entering your username and password
            </Text>
          </View>
            <View
              style={{ flexDirection: 'row',
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
              alignItems: 'stretch' }}
            >
            <View
                style={{ flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 2,
                borderColor: 'white' }}
            >
            <ImageLogo />
            </View>
            <View style={{ flex: 2 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 50 }}>
              <Text style={{ fontSize: 25, color: 'white' }}> Login below </Text>
            </View>
              <LoginForm />
            </View>
          </View>
        </View>
      <View
            style={{ width,
            backgroundColor: '#007681',
            alignItems: 'center',
                height: 140
           }}
      >
               <Text
                   style={{ color: 'white', paddingTop: 8 }}
               >Cargill Website | Privacy | Terms & Conditions</Text>
                <Text
                    style={{ color: 'white' }}
                >2017 Cargill, Incorporated. All Rights Reserved.</Text>
      </View>


    </View>
    );
  }
}
