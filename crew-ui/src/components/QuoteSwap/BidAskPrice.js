import React,{Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
class BidAskPrice extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center', marginLeft:40,marginTop:4}}>
                    <Text style={{fontSize:16, fontFamily:'HelveticaNeue',color:'rgb(231,181,20)'}}>BID PRICE:</Text>
                    <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue'}}>{this.props.bidPrice||0}</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center', marginLeft:60,marginTop:4}}>
                    <Text style={{fontSize:16, fontFamily:'HelveticaNeue',color:'rgb(231,181,20)'}}>ASK PRICE:</Text>
                    <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue'}}>{this.props.askPrice||0}</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center', marginLeft:60,marginTop:4}}>
                    <Text style={{fontSize:16, fontFamily:'HelveticaNeue',color:'rgb(231,181,20)'}}>LAST SETTLE:</Text>
                    <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue'}}>N/A</Text>
                </View>
            </View>
        )
    }
}
const styles={
    container:{
        flexDirection:'row',
        marginTop:269,
        width:483,
        height:55,
        backgroundColor:'rgb(93,109,121)',
        position:'absolute',
        zIndex:-1
    }
}
const mapStateToProps=state=>{
    return{
        bidPrice:state.selectedContractMonth.bidprice,
        askPrice:state.selectedContractMonth.askprice,

    }

}
export default connect(mapStateToProps,null)(BidAskPrice);