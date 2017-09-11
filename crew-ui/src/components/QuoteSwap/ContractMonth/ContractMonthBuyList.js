import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {contractMonthSelect} from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonthSelect';
class ContractMonthBuyList extends Component{
    /*contractMonthSelect(id){
         this.props.contractMonthSelect(id);
     }
     render(){
         return (
             <TouchableOpacity onPress={this.contractMonthSelect.bind(this, this.props.item.underlying)}>
                 <View style={ this.props.item.underlying===this.props.id?styles.afterButtonPress: styles.beforeButtonPress}>
                     <Text style={this.props.item.underlying===this.props.id?
                         {fontSize:12,fontFamily:'HelveticaNeue',color:'rgb(255,255,255)'} :
                         {fontSize:12,fontFamily:'HelveticaNeue',color:'rgb(61,76,87)'}}>
                         {this.props.item.month.substr(0,3)} {this.props.item.year}
                     </Text>
                     <Text style={this.props.item.underlying===this.props.id?
                         {fontSize:18,fontFamily:'HelveticaNeue-Bold',color:'rgb(255,255,255)'} :
                         {fontSize:18,fontFamily:'HelveticaNeue-Bold',color:'rgb(61,76,87)'}}>
                         Hello
                     </Text>
                 </View>
             </TouchableOpacity>
         )
     }*/
    render(){
        return(
            <Text style={{fontSize:60}}>{this.props.item.askPrice}</Text>
        )
    }
}
const styles={
    beforeButtonPress:{
        width:80,
        height:48,
        backgroundColor:'rgb(147,204,196)',
        marginLeft:5,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'

    },
    afterButtonPress:{
        width:80,
        height:48,
        backgroundColor:'rgb(39,153,137)',
        marginLeft:5,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'

    }

}
const mapStateToProps = state => {
    return {
        id:state.selectedContractMonth

    };
}
export default connect(mapStateToProps, {contractMonthSelect})(ContractMonthBuyList);
