import React from 'react';
import { Text, View, Linking, StatusBar, Dimensions, Image } from 'react-native';
import LoginForm from '../containers/LoginForm';
import { PRIVACY, TERMS, learnMoreProdUrl } from '../ServiceURLS/index';
import { Button } from './common/Button';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>

        <StatusBar barStyle='light-content' />
        <View
          style={{
            backgroundColor: 'black',
              width,
            height: 20
          }}
        />
        <View
          style={{
            backgroundColor: 'rgb(61,76,87)',
            width: width - 100,
            height: height - 160,
            marginTop: 30,
            marginRight: 50,
            marginLeft: 50,
            marginBottom: 50
          }}
        >
            <View style={styles.welcomeViewStyle}>
                <Text style={styles.welcomeTextStyle}>
                    Welcome
                </Text>
            </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
              alignItems: 'stretch'
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: 'white'
              }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../components/common/img/WelcomeLogo.png')}
                        style={styles.logoStyle}
                    />
                    <Text style={styles.textStyle}>Price Hedging</Text>
                    <Button buttonStyle={{ marginLeft: width * 0.08 }} textStyle={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => Linking.openURL(learnMoreProdUrl)}> Learn More</Button>
                </View>
            </View>
            <View style={{ flex: 2 }}>
              <View style={{ alignItems: 'flex-start', marginLeft: 50 }}>
                <Text style={{ fontSize: 20, color: 'white' }}>
                  Login below
                </Text>
              </View>

              <LoginForm />

            </View>
          </View>
        </View>

        <View style={{ width, height: 60, backgroundColor: '#3d4c57', alignItems: 'center', justifyContent: 'center' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Cargill Website |</Text>
            <Button buttonStyle={{}} textStyle={{ color: 'white', fontSize: 12 }} onPress={() => Linking.openURL(PRIVACY)}>Privacy |</Button>
            <Button buttonStyle={{}} textStyle={{ color: 'white', fontSize: 12 }} onPress={() => Linking.openURL(TERMS)}>Terms & Conditions</Button>
          </View>

          <Text style={{ color: 'white', fontSize: 12 }}>
            &copy; 2017 Cargill, Incorporated. All Rights Reserved.
          </Text>
        </View>

      </View>

    );
  }
}
const styles = {
    imageContainer: {
        justifyContent: 'center',
        marginLeft: 2,
        marginRight: 20,
        flexDirection: 'column',
        paddingBottom: 10
    },

    logoStyle: {
        height: height * 0.156,
        width: width * 0.263,
        //paddingLeft: 10,
        alignItems: 'center'
    },
    textStyle: {
        marginTop: 10,
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    welcomeViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.134,
        paddingTop: 15,
        shadowColor: '#000',
        elevation: 2,
        position: 'relative'
    },
    welcomeTextStyle: {
        fontSize: 50,
        color: 'white'
    }
}
