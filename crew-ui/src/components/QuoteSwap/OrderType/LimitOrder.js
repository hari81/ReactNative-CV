import React,{Component} from 'react';
import {View, Text,Image, TouchableOpacity,TextInput,TouchableWithoutFeedback} from 'react-native';
import Minus from '../../common/img/Minus-32.png';
import Plus from '../../common/img/Plus.png';

export default class LimitOrder extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue', paddingBottom:10}}>LIMIT PRICE</Text>
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
                    </View>
                </View>
                <View style={{flexDirection:'column', marginLeft:26}}>
                    <Text style={{fontSize:16, fontFamily:'HelveticaNeue',color:'rgb(255,255,255)'}}>ORDER EXPIRATION DATE</Text>
                    <TextInput
                        style={{height: 42, width:252, borderRadius:4,backgroundColor:'rgb(255,255,255)',marginTop:12}}
                        maxLength={12}
                        keyboardType = 'numeric'
                    />
                </View>

            </View>
        )
    }
}
const styles={
    container:{
        flexDirection:'row',
        marginTop:16
    }
}
