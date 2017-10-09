import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Matrix from '../components/ProfitabilityMatrix/Matrix';
import { LogoHomeHeader } from '../components/common/LogoHomeHeader';
import CropHeader from '../components/ProfitabilityMatrix/CropHeader';
import IncrementSettingBar from '../components/ProfitabilityMatrix/IncrementSettingBar';
import { profitabilityMatrixData } from '../redux/actions/ProfitabilityMatrixAction';

class ProfitabilityMatrix extends Component {
    componentDidMount() {
        this.props.profitabilityMatrixData();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: height * 0.026 }} />
                <LogoHomeHeader />
                <CropHeader />
                <Matrix />
                <IncrementSettingBar />
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
    container: {
        backgroundColor: 'rgb(39,49,66)'
    },
}
export default connect(null, { profitabilityMatrixData })(ProfitabilityMatrix);
