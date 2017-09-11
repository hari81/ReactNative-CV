import React,{Component} from 'react';
import {View, Text,Image, TouchableOpacity,TextInput,TouchableWithoutFeedback} from 'react-native';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';

export default class BushelQuantity extends Component {
    constructor(){
        super();
        this.state={
            quantity:0
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue', paddingBottom:10}}>BUSHEL QUANTITY</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableWithoutFeedback >
                        <Image style={{ width: 32, height: 32,marginRight:15,marginTop:5 }} source={Minus}/>
                    </TouchableWithoutFeedback>
                    <TextInput
                        style={{height: 42, width:112, borderRadius:4,backgroundColor:'rgb(255,255,255)',padding:2}}
                        maxLength={12}
                        placeholder='0'
                        keyboardType = 'numeric'
                    />
                    <TouchableWithoutFeedback>
                        <Image style={{ width: 32, height: 32,marginLeft:15,marginTop:5  }} source={Plus}/>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:'column', marginLeft:30}}>
                        <Text style={{fontSize:16, fontFamily:'HelveticaNeue',color:'rgb(255,255,255)'}}>35% HEDGED</Text>
                        <Text style={{fontSize:12, fontFamily:'HelveticaNeue',color:'rgb(231,181,20)'}}>Your Available Limit is 40,000 bushels</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles={
    container:{
        flexDirection:'column',
        marginTop:16
    }
}
