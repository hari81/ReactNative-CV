/*jshint esversion: 6 */
import React from 'react';
import { Text, View, Linking} from 'react-native';
import Dimensions from 'Dimensions';
import LoginForm from '../containers/LoginForm';
import { Header, ImageLogo } from './common/index';

export default class App extends React.Component {
    render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
                style={{ backgroundColor: '#3d4c57',
                width,
                height: height - 120,
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
              style={{ width: width,
                  height: 90,
                  backgroundColor: '#3d4c57',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10 }}
          >
              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{ color: 'white', fontSize: 15 }}>
                      Cargill Website | </Text>
                  <Text style={{ color: 'white', fontSize: 15 }} onPress={() => Linking.openURL('http://go.cargill.com/CargillPriceHedgingPrivacy')}>
                      Privacy
                      | </Text>
                  <Text style={{ color: 'white', fontSize: 15 }} onPress={() => Linking.openURL('http://go.cargill.com/CargillPriceHedgingTerms')}>
                      Terms & Conditions
                  </Text>
              </View>


              < Text style={{ color: 'white', fontSize: 15 }}>
                  &copy; 2017 Cargill, Incorporated. All Rights Reserved.
              </Text>

          </View>


      </View>
    );
  }
}
