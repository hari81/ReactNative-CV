import React from 'react';
import { Text, View } from 'react-native';
import base64 from 'base-64';
import fetch from 'fetch';
import Dimensions from 'Dimensions';


import LoginForm from './src/components/LoginForm';
import { Header, Button, Spinner, ImageLogo } from './src/components/common';
import Orders from './src/components/Orders';

export default class App extends React.Component {
   state = { loggedIn: false };
   goOrders = () => {
        this.props.navigator.push({
       title: '',
       component: Orders,
       navigationBarHidden: true,

     });
   }


 postData = (url) =>
    new Promise((resolve, reject) => {
            wrppedFetch = (maxNetworkHits) => {
                fetch(url, {
                        method: 'GET',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' +
                                base64.encode('BernM@commodityhedging.com:test1234')
                             },
                })

                .then((response) => response.json())
                .then((jsonResponse) => {
                    resolve(jsonResponse);
                })

                .catch((error) => {
                    if (error.message == 'Network request failed' && maxNetworkHits > 0) {
                        wrppedFetch(--maxNetworkHits);
                    } else {
                        reject(error);
                        console.log('error:' + error);
                    }
                });
            };

            wrppedFetch(this.MAX_NETWORK_HITS);
    })


  renderContent = () => {
      switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={() => this.goOrders()}>
              Orders Details
            </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
      }
    }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
            style={{ backgroundColor: '#007681',
            marginTop: 5,
            marginBottom: 10,
                width: width, height: height - 110 }}
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
              {this.renderContent()}
            </View>
          </View>
        </View>
      {/*<View style={{width: width, height: height-100, backgroundColor: 'white'}}>
      </View> */}
      <View style={{ width: width,
            height: 90,
            backgroundColor: '#007681',
            alignItems: 'center',
          justifyContent: 'flex-end' }}
      >
        <Text style={{ color: 'white', fontSize: 15 }}>
            Cargill Website | Privacy | Terms & Conditions
        </Text>
      < Text style={{ color: 'white', fontSize: 15 }}>
          2017 Cargill, Incorporated. All Rights Reserved.
      </Text>
      </View>

    </View>
    );
  }
}
