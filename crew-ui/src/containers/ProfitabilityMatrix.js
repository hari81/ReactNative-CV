import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Matrix from '../components/ProfitabilityMatrix/Matrix';
import { CommonHeader } from '../components/common';
import CropHeader from '../components/ProfitabilityMatrix/CropHeader';
import IncrementSettingBar from '../components/ProfitabilityMatrix/IncrementSettingBar';
import { profitabilityMatrixData } from '../redux/actions/ProfitabilityMatrixAction';
import st from '../Utils/SafeTraverse';
import bugsnag from '../components/common/BugSnag';

class ProfitabilityMatrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetPrice: props.todayPrice,
            expectedYield: props.expectedYield,
            matrixPriceIncrement: '',
            matrixYieldIncrement: ''
        };
    }
    componentWillMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ matrixPriceIncrement: crop[0].matrixPriceIncrement, matrixYieldIncrement: crop[0].matrixYieldIncrement });
    }
    componentDidMount() {
        this.props.profitabilityMatrixData(this.state);
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />
                    <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: height * 0.026 }} />
                    <CommonHeader />
                    <CropHeader />
                    <Matrix />
                    <IncrementSettingBar />
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { height, width } = Dimensions.get('window');
const styles = {
    container: {
        backgroundColor: 'rgb(39,49,66)'
    },
};
const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        id: state.cropsButtons.selectedId,
        acc: state.account,
        todayPrice: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])),
        expectedYield: st(state.dashBoardData, ['Data', 'myFarmProduction', 'expectedYield']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'expectedYield']))
    };
};

export default connect(mapStateToProps, { profitabilityMatrixData })(ProfitabilityMatrix);
