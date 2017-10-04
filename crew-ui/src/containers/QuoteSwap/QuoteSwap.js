import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { LogoHomeHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/DashBoard/MyFarmTiles';
import SetOrderDetails from './SetOrderDetails';
import { quoteSwapUnderlying } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import st from '../../Utils/SafeTraverse';

const { width, height } = Dimensions.get('window');

class QuoteSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropcode: props.cropcode || st(props, ['Crops', 0, 'code']),
            cropyear: props.cropyear || st(props, ['Crops', 0, 'cropYear'])
        };
    }
    componentDidMount() {
        this.props.quoteSwapUnderlying(this.state.cropyear, this.state.cropcode);
    }

    render() {
        return (
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', height: height * 0.026 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <SetOrderDetails />
                    <MyCropButton />
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons,
    };
};
export default connect(mapStateToProps, { quoteSwapUnderlying })(QuoteSwap);
