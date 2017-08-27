'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';


import Pie from './Pie';
import { connect } from 'react-redux';


class ChartApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: ''
        };

    }

    onPieItemSelected(newIndex){
        this.setState({...this.state, activeIndex: newIndex});
    }

    render() {
        return (

            <View>
                <Pie

                    pieWidth={400}
                    pieHeight={400}
                    onItemSelected={this.onPieItemSelected.bind(this)}
                    data={this.props.data} />
            </View>
        );
    }
}
const mapStateToProps=(state)=>{
    return {
        data:state.dashBoardButtons.openClosed
    }
}

export default connect(mapStateToProps, null)(ChartApp);