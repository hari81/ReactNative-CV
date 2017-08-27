import React, { Component } from 'react';
import { Text, View, Image,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ChartApp from './DoughnutChart/ChartApp';
import cancelimage from '../common/img/Cancel-20.png';
import matrix from '../common/img/Small-Matrix.png';
import {hideInfoButtonClick} from '../../redux/actions/Dashboard/infobuttonsAction';
class MyFarmProduction extends Component {
    //arrow display conditon
    showArrow(btnNumber){
        switch(btnNumber){
            case 1:
                return <View style={[styles.triangle,{marginLeft:200}]}/>
            case 2:
                return <View style={[styles.triangle,{marginLeft:360}]}/>
            case 3:
                return <View style={[styles.triangle,{marginLeft:500}]}/>
            case 4:
                return <View style={[styles.triangle,{marginLeft:640}]}/>
            case 5:
                return <View style={[styles.triangle,{marginLeft:790}]}/>
        }
    }
    //info block display condition
    showMessage(btnNumber) {
        switch(btnNumber) {
            case 1:
                return this.btnMessage(90,this.props.MyFarmProd.myFarmTiles.breakEvenPrice.info);
            case 2:
                return this.btnMessage(240,this.props.MyFarmProd.myFarmTiles.targetPrice.info);
            case 3:
                return this.btnMessage(390,this.props.MyFarmProd.myFarmTiles.averagePriceSold.info);
            case 4:
                return this.btnMessage(540,this.props.MyFarmProd.myFarmTiles.profitPerAcre.info);
            case 5:
                return this.btnMessage(640,this.props.MyFarmProd.myFarmTiles.unhedgedProduction.info);
            default:
                return <View style={{display:'none'}}/>


        }
    }
    //info block display method
    btnMessage(num1, message){
        return(
            <View style={[styles.messageBox,{marginLeft:num1}]}>
                <TouchableOpacity onPress={this.cancelButton.bind(this)} ><View style={{marginLeft: 240}}><Image source={cancelimage} style={{
                    width: 16,
                    height: 16
                }}/></View></TouchableOpacity>
                <Text style={{fontFamily:'HelveticaNeue-Thin', color:'rgb(59,74,85)', fontSize:14}}>{message}</Text>
            </View>

        )

    }
    //on Cancel info button press
    cancelButton(){
        this.props.hideInfoButtonClick();
    }
    // info block hide method
    hideMessage(){
        return (
            <View style={{display:'none'}}>
            </View>
        )
    }

    render() {
        //returning no data when my farm production data is absent
        if(!this.props.MyFarmProd.myFarmProduction){
            return(
                <View style={{ flexDirection: 'row'}}>
                    <View style={styles.secondRowFirstColumnStyle}>
                        <View style={styles.productionTitleStyle}>
                            <View style={{width:216,height:20, marginTop:15, marginLeft:34}}>
                                <Text style={{fontSize:16, color:'rgb(131,141,148)'}}>YOUR FARM PRODUCTION</Text>
                            </View>
                        </View>
                        <View style={{margin:50, justifyContent:'center', alignItems:'center', flex:1}}>
                            <Text style={{fontSize:30, color:'rgb(131,141,148)'}}>No Data</Text>
                        </View>
                    </View>
                    <View style={styles.secondRowSecondColumnStyle}>
                        <View style={[styles.productionTitleStyle,{width:286}]}>
                            <View style={{marginTop: 15, marginLeft: 34}}>
                                <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>PROFITABILITY MATRIX</Text>
                            </View>
                        </View>
                        <Text style={{fontSize:14, fontFamily:'HelveticaNeue-Thin', padding:20,color:'rgb(29,37,49)'}}>Customize Scenarios to see how your trading decisions affect your profitability</Text>
                        <View style={{marginLeft:30}}><Image source={matrix} width={223} height={153}/></View>
                        <View style={styles.viewProfitabilityButton}><Text style={{fontSize:12, fontFamily:'HelveticaNeue', color:'rgb(39,49,67)'}}>VIEW PROFITABILITY</Text></View>
                    </View>
                </View>
            )

        }
        //returning data when my farm production data is present
        else {
            const percent = this.props.MyFarmProd.myFarmProduction.unhedgedProduction.totalQuantity / this.props.MyFarmProd.myFarmProduction.estimatedTotalProduction
            return (
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.secondRowFirstColumnStyle}>
                            <View style={styles.productionTitleStyle}>
                                <View style={{width: 216, height: 20, marginTop: 15, marginLeft: 34}}>
                                    <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>YOUR FARM PRODUCTION</Text>
                                </View>
                                <View style={{marginTop: 19}}>
                                    <Text style={{fontSize: 14, marginLeft: 90, color: 'rgb(127,127,127)'}}>Estimated Total
                                        Production</Text>
                                </View>
                                <View style={{marginTop: 11, alignSelf: 'stretch'}}>
                                    <Text style={{
                                        fontSize: 23,
                                        fontFamily: 'HelveticaNeue-Bold',
                                        marginLeft: 4,
                                        color: 'rgb(1,172,168)'
                                    }}>{this.props.MyFarmProd.myFarmProduction.estimatedTotalProduction.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>
                                <View style={{marginTop: 21, marginLeft:6}}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgb(127,127,127)'
                                    }}>{this.props.MyFarmProd.activeCommodity.unit}s</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: 190, flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <Text style={{fontSize: 15, paddingTop: 28, color: 'rgb(29,37,49)'}}>UNHEDGED
                                        PRODUCTION</Text>
                                    <Text style={{
                                        fontSize: 24,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.myFarmProduction.unhedgedProduction.totalQuantity.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.activeCommodity.unit}s</Text>
                                    <Text style={{
                                        fontSize: 26,
                                        color: 'rgb(61,76,87)'
                                    }}>${this.props.MyFarmProd.myFarmProduction.unhedgedProduction.totalTradeAmount.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{fontSize: 15, paddingTop: 12, color: 'rgb(29,37,49)'}}>OPEN ORDERS</Text>
                                    <Text style={{
                                        fontSize: 24,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.myFarmProduction.openOrders.totalQuantity.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.activeCommodity.unit}s</Text>
                                </View>

                                <View style={{width: 280}}>
                                    <View style={{
                                        borderRadius: 100,
                                        marginTop: 28,
                                        marginLeft: 5,
                                        width: 16,
                                        height: 16,
                                        backgroundColor: 'rgb(158,42,47)'
                                    }}/>
                                    <ChartApp/>
                                    <View style={{
                                        flexDirection: 'column',
                                        position: 'absolute',
                                        marginLeft: 110,
                                        marginTop: 120,
                                    }}>
                                        <Text style={{
                                            fontSize: 22,
                                            paddingLeft: 14,
                                            fontFamily: 'HelveticaNeue-Medium',
                                            color: 'rgb(61,76,87)'
                                        }}>{percent.toFixed(2) * 100}%</Text>
                                        <Text style={{
                                            fontSize: 15,
                                            paddingLeft: 4,
                                            fontFamily: 'HelveticaNeue',
                                            color: 'rgb(171,178,183)'
                                        }}>UNSOLD</Text>

                                    </View>
                                </View>


                                <View>
                                    <View style={{
                                        borderRadius: 100,
                                        marginTop: 28,
                                        marginRight: 5,
                                        width: 16,
                                        height: 16,
                                        backgroundColor: 'rgb(135,136,140)'
                                    }}/>
                                    <View style={{
                                        borderRadius: 100,
                                        marginTop: 115,
                                        marginRight: 5,
                                        width: 16,
                                        height: 16,
                                        backgroundColor: 'rgb(218,170,0)'
                                    }}/>
                                </View>
                                <View style={{width: 190, flexDirection: 'column'}}>
                                    <Text style={{fontSize: 15, paddingTop: 28, color: 'rgb(29,37,49)'}}>TRADES/SALES</Text>
                                    <Text style={{fontSize: 12, color: 'rgb(29,37,49)'}}>(OUTSIDE THE APP)</Text>
                                    <Text style={{
                                        fontSize: 24,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.myFarmProduction.externalTrades.totalQuantity.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.activeCommodity.unit}s</Text>
                                    <Text style={{
                                        fontSize: 26,
                                        color: 'rgb(61,76,87)'
                                    }}>${this.props.MyFarmProd.myFarmProduction.externalTrades.totalTradeAmount.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{fontSize: 15, paddingTop: 20, color: 'rgb(29,37,49)'}}>OPEN TRADES</Text>
                                    <Text style={{fontSize: 12, color: 'rgb(29,37,49)'}}>(IN APP)</Text>
                                    <Text style={{
                                        fontSize: 24,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.myFarmProduction.openPositions.totalQuantity.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgb(121,120,119)'
                                    }}>{this.props.MyFarmProd.activeCommodity.unit}s</Text>
                                    <Text style={{
                                        fontSize: 26,
                                        color: 'rgb(61,76,87)'
                                    }}>${this.props.MyFarmProd.myFarmProduction.openPositions.totalTradeAmount.toString()
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>

                            </View>


                        </View>
                        <View style={styles.secondRowSecondColumnStyle}>
                            <View style={[styles.productionTitleStyle,{width:286}]}>
                                <View style={{marginTop: 15, marginLeft: 34}}>
                                    <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>PROFITABILITY MATRIX</Text>
                                </View>
                            </View>
                            <Text style={{fontSize:14, fontFamily:'HelveticaNeue-Thin', padding:20,color:'rgb(29,37,49)'}}>Customize Scenarios to see how your trading decisions affect your profitability</Text>
                            <View style={{marginLeft:30}}><Image source={matrix} width={223} height={153}/></View>
                            <View style={styles.viewProfitabilityButton}><Text style={{fontSize:12, fontFamily:'HelveticaNeue', color:'rgb(39,49,67)'}}>VIEW PROFITABILITY</Text></View>
                        </View>
                    </View>
                    {this.props.infoState.infoEnable?this.showArrow(this.props.infoState.btnNumber):this.hideMessage()}
                    {this.props.infoState.infoEnable?this.showMessage(this.props.infoState.btnNumber):this.hideMessage()}
                </View>
            )
        }
    }

}
const styles={
    secondRowFirstColumnStyle: {
        height: 352,
        width: 689,
        backgroundColor: 'rgb(255,255,255)',
        marginHorizontal:16,
        marginTop:45,
        borderColor:'rgb(190,216,221)',
        borderWidth:1,
    },
    productionTitleStyle:{
        flexDirection: 'row',
        height:47,
        width:689,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(221,221,221)'
    },
    secondRowSecondColumnStyle: {
        height: 352,
        backgroundColor: 'rgb(255,255,255)',
        width: 288,
        marginRight: 16,
        marginTop: 45,
        borderColor:'rgb(190,216,221)',
        borderWidth:1
    },
    messageBox:{
        position:'absolute',
        marginTop:20,
        width:260,
        height:140,
        borderColor:'rgb(221,221,221)',
        borderWidth:2,
        backgroundColor:'rgb(255,255,255)',
        borderRadius:3,
    },
    triangle: {
        position:'absolute',
        marginTop:6,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor:'rgb(221,221,221)',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgb(221,221,221)',

    },
    viewProfitabilityButton:{
        width:141,
        height:28,
        borderWidth:1,
        borderColor:'rgb(1,172,168)',
        marginTop:30,
        marginLeft:70,
        justifyContent:'center',
        alignItems:'center'
    }
}
const mapStateToProps=(state)=>{
    return { MyFarmProd: state.dashBoardButtons,
        infoState:state.info
    }
}
export default connect(mapStateToProps, {hideInfoButtonClick})(MyFarmProduction);