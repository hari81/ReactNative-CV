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
import {onChangeName,onChangeId} from '../../../redux/actions/QuoteSwap/ProductType/SelectedProduct'
class ProductsList extends Component {
    selectProduct(name,id) {
        this.props.onChangeName(name);
        this.props.onChangeId(id);
    }
    render(){
        return (
            <TouchableOpacity onPress={this.selectProduct.bind(this,this.props.item.name,this.props.item.id)}>
                <View style={{height:36,width:252, backgroundColor:'white',borderRadius:4,justifyContent:'center'}}>
                    <ScrollView>
                        <Text style={{color:'rgb(159,159,159)',fontFamily:'HelveticaNeue', fontSize:16, paddingLeft:10}}>{this.props.item.name}</Text>
                    </ScrollView>
                </View>
            </TouchableOpacity>
        )
    }
}
export default connect(null, {onChangeName,onChangeId})(ProductsList)