import React,{Component} from 'react';
import {View, Text,Image, TouchableOpacity,FlatList} from 'react-native';
import {connect} from 'react-redux';
import ContractMonthSellList from './ContractMonthSellList';
import ContractMonthBuyList from './ContractMonthBuyList';
import st from '../../../Utils/SafeTraverse';
import {Spinner} from "../../common/Spinner";
import Refresh from '../../common/img/Refresh.png';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import moment from 'moment';
class ContractMonth extends Component {
    constructor(){
        super();
        this.state={
            timeNow:moment().format('MMM Do YYYY, h:mm a')
        }
    }
    contractMonthList() {
        if(this.props.contractMonth.spinFlag){
            return <Spinner size='small'/>
        }
        return (<FlatList
            numColumns={4}
            data={this.props.contractMonth.contract}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ContractMonthSellList item={item} key={item.id}/>}
        />)

    }
    componentWillReceiveProps(){
        this.setState({timeNow:moment().format('MMM Do YYYY, h:mm a')});
    }

    onUpdate(timeNow){
        const {cropYear,cropCode}=this.props.contractMonth.contract[0]
        this.props.quoteSwapUnderlying(cropYear,cropCode);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgb(255,255,255)', fontSize:16, fontFamily:'HelveticaNeue', paddingBottom:10}}>CONTRACT MONTH</Text>
                    <TouchableOpacity onPress={this.onUpdate.bind(this,this.state.timeNow)}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={{ width: 20, height: 18,  marginLeft:24,marginRight:4}} source={Refresh}/>
                            <Text style={{color:'white', fontSize:12,marginTop:4}}>as of {this.state.timeNow}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        contractMonth:state.contractData

    };
}
export default connect(mapStateToProps,{quoteSwapUnderlying})(ContractMonth);