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
        this.state = { pdfflag: false };
    }
    componentDidMount() {
        this.props.tradeReceipt(this.props.confirm);
    }
    componentWillReceiveProps(newProps) {
//console.log(newProps.pdfview);
       if (newProps.pdfview !== null) {
            this.setState({ pdfflag: true });
        }
    }
    renderPdfView() {
        if (!this.state.pdfflag) {
            return (<View
                style={{ justifyContent: 'center', flexDirection: 'column' }}
            >
                <Text
                    style={{
                        marginTop: 30,
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 25,
                        marginBottom: 30
                    }}
                >
                    Loading trade receipt for Trade id: {this.props.orderId}

                </Text>
                <Spinner size='large' />
            </View>);
        } else {
           return (<WebView
                style = {{backgroundColor: 'rgb(64,78,89)'}}
                //source={{uri: 'file://' + this.props.path,}}
                source={{ uri: `file://${this.props.pdfview}` }}

            />);
        }
    }

    render() {
        try {
            //console.log(this.props.path);
            return (
                <View style={styles.container}>
                    <View
                        style={{
                            backgroundColor: 'black',
                            height: 20
                        }}
                    />
                    <CommonHeader/>
                    <Button color='white' title='<<Back to Positions' onPress={() => Actions.pop()} />
                    {this.renderPdfView()}
                </View>);
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { width, height } = Dimensions.get('window');
//export default TradeReceipt;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(64,78,89)',
        height
    }
});

const mapStateToProps = state => {
    return { pdfview: state.openPositions.receipt };
};

export default connect(mapStateToProps, { tradeReceipt })(TradeReceipt);
