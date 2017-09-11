import React,{Component} from 'react';
import {View, Text,Image, TouchableOpacity,FlatList} from 'react-native';
import {connect} from 'react-redux';
import ContractMonthSellList from './ContractMonthSellList';
import ContractMonthBuyList from './ContractMonthBuyList';
class ContractMonth extends Component {
    contractMonthList() {
        return (<FlatList
            numColumns={4}
            data={this.props.contractMonth}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ContractMonthSellList item={item} key={item.id}/>}
        />)
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue', paddingBottom:10}}>CONTRACT MONTH</Text>
                <View style={{width:340,height:110}}>
                    {this.contractMonthList()}
                </View>
            </View>
        )
    }
}
const styles={
    container:{
        flexDirection:'column',
        marginTop:16,
        zIndex:-1
    }
}
const mapStateToProps = state => {
    return {
        contractMonth:state.contractMonthData

    };
}
export default connect(mapStateToProps,null)(ContractMonth);