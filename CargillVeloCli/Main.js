import React, { Component } from 'react';
import { NavigatorIOS, View, StyleSheet } from 'react-native';
import RouterComponent from './src/Router';
import App from './App';

class Main extends Component {
  render() {
    return (
      <NavigatorIOS style = {styles.container}
        initialRoute={{ navigationBarHidden: true,
          title: '',
          component: App}} />
    );
  }
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
      }
    });


export default Main;
