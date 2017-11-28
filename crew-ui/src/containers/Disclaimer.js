import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { PageHeader } from '../components/common/PageHeader';
import { CommonHeader } from '../components/common';
import DisclaimerData from '../restAPI/disclaimer.json';
import bugsnag from '../components/common/BugSnag';
import * as common from '../Utils/common';

class Disclaimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId,
            productName: common.translateProductId(this.props.productId, this.props.products)
        };
    }

    onGetStarted() {
        Actions.pop();
    }

    renderTerms() {
        const listHeight = height - 395;
        return (
            <FlatList
                style={{ height: listHeight }}
                data={DisclaimerData.terms}
                keyExtractor={item => item.terminology}
                renderItem={({ item }) => (
                    <View key={item.terminology} style={styles.disclaimerTerm}>
                        <Text style={styles.disclaimerSubHead}>{item.terminology}</Text>
                        <Text style={styles.disclaimerText}>{item.description}</Text>
                    </View>
                )}
            />
        );
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);

            //get disclosure based on product id
            let tDisclosure = '';
            const ddd = DisclaimerData.disclosures.find(x => x.productId === this.state.productId);
            if (common.isValueExists(ddd)) {
                tDisclosure = ddd.description;
            }

            return (
                <View>
                    <StatusBar barStyle='light-content' />
                    <View style={{ backgroundColor: '#000', width, height: 20 }} />
                    <CommonHeader />
                    <PageHeader headerText="Terminology You'll See Here" headerInfoText='' />

                    <View style={styles.disclaimerMain}>
                        <View style={styles.disclaimerContainer}>
                            <Text style={styles.disclaimerTitle}>To help you get started, let's go over a couple terms we'll use here</Text>
                            <View style={styles.disclaimerTermsContainer}>
                                <View style={[styles.disclaimerTextBox, { flex: 0.52, marginRight: 20 }]}>
                                    <Text style={styles.disclaimerSubHead}>{this.state.productName}</Text>
                                    <Text style={styles.disclaimerText}>{tDisclosure}</Text>
                                </View>
                                <View style={[styles.disclaimerTextBox, { flex: 0.48 }]}>
                                    {this.renderTerms()}
                                </View>
                            </View>
                            <View style={styles.disclaimerButtonStyle}>
                                <TouchableOpacity onPress={this.onGetStarted.bind()}>
                                    <Text style={styles.disclaimerButtonTextStyle}>LET'S GET STARTED!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    disclaimerMain: { height: height - 0, backgroundColor: '#eff4f7' },
    disclaimerContainer: { height: height - 180, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, paddingLeft: 50, paddingTop: 35, paddingRight: 50, paddingBottom: 50 },
    disclaimerTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 32, color: '#fff', paddingTop: 10, marginBottom: 20 },

    disclaimerTermsContainer: { flexDirection: 'row', backgroundColor: '#404e59' },
    disclaimerTextBox: { backgroundColor: '#fff', padding: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 4 },
    disclaimerTerm: { marginTop: 5 },
    disclaimerSubHead: { fontFamily: 'HelveticaNeue', color: '#444', fontSize: 18, },
    disclaimerText: { fontFamily: 'HelveticaNeue', fontSize: 13, color: '#888', marginTop: 5 },
    disclaimerButtonStyle: {
        alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#279988', borderRadius: 4, paddingLeft: 60, paddingTop: 10, paddingRight: 60, paddingBottom: 10
    },
    disclaimerButtonTextStyle: { fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: '#fff' }
});

const mapStateToProps = (state) => {
    return {
        acc: state.account,
        products: state.products
    };
};

export default connect(mapStateToProps, null)(Disclaimer);
