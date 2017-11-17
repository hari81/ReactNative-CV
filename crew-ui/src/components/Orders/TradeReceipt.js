import React, { Component } from 'react';
import { View, WebView, StyleSheet, Button, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CommonHeader, Spinner } from '../../components/common';
import bugsnag from '../../components/common/BugSnag';
import { tradeReceipt } from '../../redux/actions/OrdersAction/OpenPositions';

class TradeReceipt extends Component {
    constructor() {
        super();
        this.state = { 
            pdfloading: false,
            pdferror: false
        };
    }

    componentDidMount() {
        this.props.tradeReceipt(this.props.confirm);
    }
    componentWillReceiveProps(newProps) {
    //console.log(newProps.pdfview);
       setTimeout(() =>
            this.setState({ pdfloading: true }), 1000);
        if (newProps.pdfview === 'error') {
            this.setState({ pdferror: true });
        }
    }


    renderPdfView() {
        if (!this.state.pdfloading) {
            return (
                <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Text style={{ marginTop: 30, color: 'white', textAlign: 'center', fontSize: 25, marginBottom: 30 }}>
                        Loading Trade Receipt for Id: {this.props.orderId}
                    </Text>
                    <Spinner size='large' />
                </View>
            );
        }
        if (this.state.pdferror) {
            return (
                <View style={{ padding: 20, paddingLeft: 50 }}>
                    <Text style={{ fontFamily: 'HelveticaNeue', fontSize: 18, color: '#fff' }}>{`There was an issue in retrieving the Trade Receipt for Id ${this.props.orderId}.\n\nPlease return to the Positions screen and try again.`}</Text>
                </View>
            );
        }
        return (
            <WebView 
                style={{ backgroundColor: 'rgb(64,78,89)' }} 
                source={{ uri: `file://${this.props.pdfview}` }}
            />
        );
    }

    render() {
        try {
            return (
                <View style={styles.container}>
                    <View style={{ backgroundColor: 'black', height: 20 }} />
                    <CommonHeader />
                    <Button color='white' title='<< Back to Positions' onPress={() => Actions.pop()} />
                    {this.renderPdfView()}
                </View>);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(64,78,89)',
        height
    }
});

const mapStateToProps = state => {
    return { 
        pdfview: state.openPositions.receipt
    };
};

export default connect(mapStateToProps, { tradeReceipt })(TradeReceipt);
