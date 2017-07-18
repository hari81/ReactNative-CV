import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, ImageLogo } from './src/components/common';
import LoginForm  from './src/components/LoginForm';
import { ScrollView, Alert } from 'react-native';
import Dimensions from 'Dimensions';

export default class App extends React.Component {
   state = { loggedIn: null };
   componentWillMount() {
     firebase.initializeApp({
    apiKey: "AIzaSyBnUeJE6Zq8E2n9TYVQiYdI2JYmNgwWTg0",
    authDomain: "authentication-7f974.firebaseapp.com",
    databaseURL: "https://authentication-7f974.firebaseio.com",
    projectId: "authentication-7f974",
    storageBucket: "authentication-7f974.appspot.com",
    messagingSenderId: "829454352489"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
      switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
      }
    }

  render() {
    let { width, height } = Dimensions.get('window');
    return (
      <View style={{flex: 1, flexDirection: 'column' }}>
        <View style={{backgroundColor:'#007681', marginTop: 5, marginBottom: 10,
                width: width, height: height-110}}>


          <Header headerText='Welcome' />

          <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontSize:25, marginTop: 50,}}>
              Please log in below by entering your username and password
            </Text>
          </View>


          <View style={{flexDirection:'row',
            marginTop: 100, marginLeft: 20, marginRight: 20}}>
            <ImageLogo />
            <View style={{flex: 1}}>
            <View style={{alignItems:'flex-start'}}>
              <Text style={{fontSize: 25, color: 'white'}}> Login below </Text>
            </View>
              {this.renderContent()}
            </View>
          </View>
        </View>
      {/*<View style={{width: width, height: height-100, backgroundColor: 'white'}}>
      </View> */}
      <View style={{width: width,
        height: 90,
        backgroundColor:'#007681',
        alignItems: 'center',
          justifyContent: 'flex-end'}}>
      <Text style={{color:'white', fontSize: 15}}>Cargill Website | Privacy | Terms & Conditions </Text>
      <Text style={{color: 'white', fontSize: 15}}> 2017 Cargill, Incorporated. All Rights Reserved.</Text>
      </View>

    </View>



    );
  }
}
