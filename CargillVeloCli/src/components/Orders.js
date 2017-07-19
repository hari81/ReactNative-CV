import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SegmentedControlIOS,
    TextInput,
    ListView,
    TouchableHighlight,
    Alert
} from 'react-native';

import CargillImg from './common/logo.png';
import App from '../../App';

const customData = require('../../restapi.json');


class Orders extends Component {
//constructor properties
constructor(props) {
   super(props);
   this.state = {
      isLoading: true,
      clonedData: []
   };
}

backToLogin = () => {
  this.props.navigator.push({
    title: '',
    component: App,
    navigationBarHidden: true,

  });
}


//rendering data for list view
renderData = (cData) =>
     (
      <TouchableHighlight style={styles.touchopa}
        onPress={() => this.rowPressed(cData)}
        underlayColor='white'
      >
        {this.getDataCell(cData)}
     </TouchableHighlight>
    );


//each cell modeling
getDataCell = (data) =>
  (
    <View style={styles.contentcontainer}>
         <View style={styles.yearStyle}>
            <Text style={{ fontSize: 25 }}> July </Text>
             <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {data.underlyingYear}
              </Text>
         </View>
         <View style={styles.producttextcontainer}>
              <Text>{data.riskProductName}</Text>
              <View style={styles.quaContainer}>
                  <View>
                    <Text>QUANTITY</Text>
                    <Text>{data.quantity}bushels</Text>
                  </View>
                  <View style={styles.directionContainer}>
                    <Text>DIRECTION</Text>
                    <Text>{data.buySell}</Text>
                  </View>
              </View>
         </View>
         <View style={styles.ordertextcontainer}>
              <Text>ORDER #</Text>
              <Text>{data.orderId}</Text>
              <Text>PRICE</Text>
              <Text>$0.0</Text>
         </View>
         <View style={styles.textcontainer}>
              <Text>STATUS</Text>
              <Text>{data.orderState.label}</Text>
              <Text>ORDER TYPE</Text>
              <Text>{data.orderType}</Text>
         </View>
         <View style={styles.textcontainer}>
              <Text>ORDER CREATION DATE</Text>
              <Text>{data.createTime}</Text>
              <Text>ORDER EXPIRATION DATE</Text>
              <Text>{data.expirationDate}</Text>
         </View>
         <View style={styles.buttonview}>
               <TouchableHighlight style={styles.viewbutton} onPress={() => this.rowPressed()}
                     underlayColor='#dddddd'
               >
                     <Text style={styles.buttonText}>CANCEL</Text>
               </TouchableHighlight>
         </View>
   </View>
  );

//on clicking list view row
    rowPressed = () =>
        //on click function goes here
        Alert.alert('This is goes Cancel Order Screen \n Screen design in progress...');


render()
{
    const standardDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const clonedData = standardDataSource.cloneWithRows(customData.value);
    /*if(this.state.isLoading){
        return(
          <View>
              <ActivityIndicator />
          </View>
        );
    }*/
    return (
        <View  style={styles.container}>

            <View style={styles.logoStyle}>
                  <View style={{ flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center' }}
                  >
                  <TouchableHighlight onPress={() => this.backToLogin()}>
                    <Text> backToLogin </Text>
                  </TouchableHighlight>

                    <Image style={{ width: 70, height: 30, marginLeft: 50, marginRight: 10 }}
                           source={CargillImg}
                    />
                    <Text style={{ color: 'white', textAlign: 'center' }}>Price Hedging</Text>

                  </View>
                  <View style={{ flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center' }}
                  >
                    <Image />
                    <Text style={{ color: 'white', borderColor: 'white', borderRightWidth: 2 }}>
                        Refesh Data
                    </Text>
                    <Text style={{ color: 'white', fontSize: 20 }}> | </Text>
                    <Text style={{ color: 'white' }}> +1-952-742-7414</Text>
                    <Image />
                  </View>

            </View>


            <View style={styles.segmentarea}>

                  <View style={styles.positions}>
                    <Text style={{ fontSize: 20 }} >Positions & Orders</Text>
                  </View>

                  <View justifyContent='center'>
                      <SegmentedControlIOS
                          alignItems='center'
                          tintColor="green"
                          style={styles.segment}
                          values={['Orders', 'Open Positions', 'Closed Positions']}
                          selectedIndex={0}
                          onChange={(event) => {
                              this.setState({
                                  selectedIndex: event.nativeEvent.selectedSegmentIndex });
                            }}
                          onValueChange={(val) => {
                            this.setState({
                              value: val,
                            });
                          }}
                      />
                  </View>



                  <View justifyContent='center'>
                       <TextInput
                              style={styles.input}
                              autoCapitalize="none"
                              onSubmitEditing={() => this.passwordInput.focus()}
                              editable={false}
                              placeholder='corn'
                       />
                              {/*placeholderTextColor='rgba(225,225,225,0.7)'/>*/}
                  </View>


            </View>


            <View style={styles.listviewarea}>
                <ListView
                   dataSource={clonedData}
                   renderRow={(rowData) => this.renderData(rowData)}
                />

            </View>

        </View>
      );
    }
}

// <TouchableHighlight  onPress={() => this.rowPressed(this.props.candidate)}
//         underlayColor='#dddddd'>
//         {this.getCellData(customData)}
// </TouchableHighlight>
// define your styles
const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#007681',
      },
        logoStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 25,
        height: 64
      },
        segmentarea:{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 64,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#279989',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
      },
        segment: {
        marginLeft: 50,
        width: 500,

      },
        positions: {
        left: 30,
        justifyContent: 'center',
      },
        input: {
        alignSelf: 'center',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 0,
        height: 25,
        width: 150,
        marginLeft: 100
      },
        quaContainer: {
        flexDirection: 'row',
        marginTop: 5
      },
        directionContainer: {
        marginLeft: 5
      },
        image: {
        height: 58,
        width: 60,
        borderRadius: 30,
      },
        contentcontainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
      },
        yearStyle: {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'green',
        width: 100,
        height: 100,
        justifyContent: 'space-around',
        marginBottom: 10,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'green',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,


      },
        imageborder: {
        height: 80,
        width: 80,
        borderColor: '#5db7e8'
      },
        separator: {
        height: 1,
        backgroundColor: '#e3e3e3',
        paddingBottom: 1,
        marginLeft: 15,
        marginRight: 15
      },
        titlecontainer: {
        backgroundColor: '#e3e3e3',
      },
        ordertextcontainer: {
        flex: 1,
        marginLeft: 55
      },
        textcontainer: {
        flex: 1
      },
        producttextcontainer: {
        flex: 1,
        marginLeft: 20
      },
        titletext: {
        flexGrow: 1,
        fontSize: 16,
        color: '#5db7e8',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10
      },
        name: {
        fontSize: 16,
        color: '#7d7c7b',
      },
        highlightedLabel:{
        fontSize: 16,
        color: 'black',
      },
        experience: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        color: '#7d7c7b',
      },
        statustext: {
        fontSize: 14,
        color: '#5db7e8',
      },
        featurewording: {
        fontSize: 14,
        color: '#7d7c7b',
      },
        buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center'
      },
        buttonview: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '20%'
      },
        viewbutton: {
        height: 35,
        width: 150,
        borderRadius: 5,
        marginTop: 18,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#5db7e8',
        justifyContent: 'center',
        alignItems: 'center'
      },
        touchopa: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#279989',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        backgroundColor: 'white',
      },


});


export default Orders;
