import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { LogoHomeHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/DashBoard/MyFarmTiles';
import SetOrderDetails from './SetOrderDetails';
import UpdateOrderDetails from './UpdateOrderDetails';
import { quoteSwapUnderlying } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import st from '../../Utils/SafeTraverse';

class QuoteSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropcode: props.cropcode || st(props, ['Crops', 0, 'code']),
            cropyear: props.cropyear || st(props, ['Crops', 0, 'cropYear']),
            selectedOrder: props.selectedOrder
        };
    }
    componentDidMount() {
        this.props.quoteSwapUnderlying(this.state.cropyear, this.state.cropcode);
    }

    render() {
        const { width } = Dimensions.get('window');
        if (this.state.selectedOrder === undefined) {
            return (
                <View >
                    <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20 }} />
                    <LogoHomeHeader />
                    <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                        <View style={{ height: 83, width: 1024, backgroundColor: 'rgb(64,78,89)' }} />
                        <MyFarmTiles />
                        <SetOrderDetails />
                        <MyCropButton />
                    </View>
                </View>
            );
        }
        return (
            <View >
                <View style={{ backgroundColor: '#000', width, height: 20 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: 83, width: 1024, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <UpdateOrderDetails selectedOrder={this.state.selectedOrder} />
                    <MyCropButton />
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons
    };
};
export default connect(mapStateToProps, { quoteSwapUnderlying })(QuoteSwap);
