import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Linking, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, CommonHeader } from '../../components/common';
import bugsnag from '../common/BugSnag';
import * as common from '../../Utils/common';

class AccountInfo extends Component {
    renderCrops() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={item => item.limitGroupId}
                renderItem={({ item }) => {
                    const cs = this.props.acc.defaultAccount.commodities;
                    const citem = cs.find(x => x.commodity === item.limitGroupName);
                    const yearStart = citem.crops[0].cropYear;
                    const yearEnd = citem.crops[citem.crops.length - 1].cropYear;
                    return (
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={[styles.cropField, { width: 125, textAlign: 'left' }]}>{citem.name}</Text>
                        <Text style={styles.cropField}>{common.formatNumberCommas(item.shortLimitAvailable)} {citem.unitOfMeasure}s</Text>
                        <Text style={styles.cropField}>{common.formatNumberCommas(item.longLimitAvailable)} {citem.unitOfMeasure}s</Text>
                        <Text style={styles.cropField}>{common.formatNumberCommas(item.shortOptionLimitAvailable)} {citem.unitOfMeasure}s</Text>
                        <Text style={styles.cropField}>{common.formatNumberCommas(item.longOptionLimitAvailable)} {citem.unitOfMeasure}s</Text>
                        <Text style={[styles.cropField, { width: 100, marginLeft: 40, textAlign: 'left' }]}>{item.tenor} months</Text>
                        <Text style={[styles.cropField, { width: 100, textAlign: 'left' }]}>{yearStart}-{yearEnd}</Text>
                    </View>
                    );
                }}
            />
        );
    }

    render() {
        try {
            const { userId, userName, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={{ height, backgroundColor: '#eff4f7' }}>
                    <StatusBar barStyle='light-content' />
                    <View style={{ backgroundColor: '#000', width, height: 20 }} />                    
                    <CommonHeader />
                    <View style={{ height: 80, width, backgroundColor: '#404e59', zIndex: -1 }} />
                    <View style={[styles.container, { zIndex: 0, marginTop: -65 }]}>
                        {/* Account Info */}
                        <View style={styles.section}>
                            <View style={[styles.sectionBodyContainer, { flexDirection: 'row' }]}>
                                <View style={{ flex: 0.5 }}>
                                    <View style={[styles.fieldGroup, { marginTop: 10, marginBottom: 10 }]}>
                                        <Text style={{ fontSize: 18 }}>{this.props.acc.defaultAccount.legalName}</Text>
                                    </View>
                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.labelSm}>ACCOUNT ID:</Text>
                                        <Text style={styles.fieldSm}>{this.props.acc.accountDetails.defaultAccountId}</Text>
                                    </View>
                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.labelSm}>USER NAME:</Text>
                                        <Text style={styles.fieldSm}>{userName}</Text>
                                    </View>
                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.labelSm}>USER ID:</Text>
                                        <Text style={styles.fieldSm}>{userId}</Text>
                                    </View>
                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.labelSm}>EMAIL:</Text>
                                        <Button 
                                            textStyle={{ fontSize: 11, color: '#4a90e2' }} 
                                            buttonStyle={{}} onPress={() => Linking.openURL(`mailto:${email}`)}
                                        >{email}</Button>
                                    </View>
                                </View>
                                {/* Credit Limit
                                <View style={{ flex: 0.5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Credit Limit</Text>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={styles.labelCredit}>Margin Agreement:</Text>
                                        <Text style={styles.fieldMd}>Unilateral Agreement (Cpty Pays Cargill)</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={styles.labelCredit}>Margining Threshold Limit:</Text>
                                        <Text style={styles.fieldMd}>$80,000</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={styles.labelCredit}>Minimum Transfer:</Text>
                                        <Text style={styles.fieldMd}>$20,000</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.labelCredit}>Rounding Amount:</Text>
                                        <Text style={styles.fieldMd}>$5,000</Text>
                                    </View>
                                </View>
                                */}
                            </View>
                        </View>
                        {/* Crops/Limits */}
                        <View style={styles.section}>
                            <View style={styles.sectionTitleContainer}>
                                <Text style={styles.sectionTitle}>Crops and Limit Available</Text>
                            </View>
                            <View style={styles.sectionBodyContainer}>
                                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                    <Text style={[styles.cropHeader, { width: 125, textAlign: 'left' }]} />
                                    <Text style={styles.cropHeader}>SHORT LIMIT</Text>
                                    <Text style={styles.cropHeader}>LONG LIMIT</Text>
                                    <Text style={styles.cropHeader}>SHORT OPTION LIMIT</Text>
                                    <Text style={styles.cropHeader}>LONG OPTION LIMIT</Text>
                                    <Text style={[styles.cropHeader, { width: 100, marginLeft: 40, textAlign: 'left' }]}>TENOR</Text>
                                    <Text style={[styles.cropHeader, { width: 100, textAlign: 'left' }]}>CROP YEARS</Text>
                                </View>
                                {this.renderCrops()}
                            </View>
                        </View>
                        {/* Positions/Account Summary
                        <View style={styles.section}>
                            <View style={styles.sectionTitleContainer}>
                                <Text style={styles.sectionTitle}>Position/Account Summary</Text>
                            </View>
                            <View style={styles.sectionBodyContainer}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.labelLg}>Position Market Value:</Text>
                                    <Text style={styles.labelLg}>$40,150</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.labelLg}>Customer Margin Balance:</Text>
                                    <Text style={styles.labelLg}>$0</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.labelLg}>Payable/Receivable:</Text>
                                    <Text style={styles.labelLg}>$0</Text>
                                </View>
                                <View style={{ backgroundColor: '#bed8dd35', marginLeft: 60, marginRight: 80, padding: 10, paddingBottom: 5 }}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.labelLg}>Trade Settlements:</Text>
                                        <Text style={styles.labelLg}>$0</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={[styles.labelLg, { fontStyle: 'italic' }]}>Premiums Due:</Text>
                                        <Text style={styles.labelLg}>$0</Text>
                                    </View>
                                </View>
                                <View style={[styles.summaryRow, { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, marginTop: 5, paddingTop: 5 }]}>
                                    <Text style={[styles.labelLg, { fontWeight: 'bold' }]}>Account Balance:</Text>
                                    <Text style={[styles.labelLg, { fontWeight: 'bold' }]}>$40,150</Text>
                                </View>
                            </View>
                        </View>
                         */}
                        {/* Contact Cargill Info */}
                        <View style={{ marginTop: 10, marginLeft: 10 }}>
                            <Text style={[styles.fieldMd, { marginBottom: 2 }]}>Please direct questions regarding this report to:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.fieldMd, { marginBottom: 2 }]}>CRM Operations - Phone: +1 (952) 984-3924 Email: </Text>
                                <Button textStyle={styles.emailStyle} buttonStyle={{}} onPress={() => Linking.openURL('Crm_Reports@cargill.com')}>Crm_Reports@cargill.com</Button>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.fieldMd}>Collateral - Phone: +1 (952) 984-0122 Email: </Text>
                                <Button textStyle={styles.emailStyle} buttonStyle={{}} onPress={() => Linking.openURL('CRMcollateral@cargill.com')}>CRMcollateral@cargill.com</Button>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            common.handleError(error);
        }
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({    
    container: { marginLeft: 20, marginRight: 20 },
    section: { borderWidth: 1, borderColor: '#bed8dd', backgroundColor: '#fff', marginBottom: 15, shadowColor: '#aaa', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, shadowOpacity: 0.5 },
    sectionTitleContainer: { borderBottomWidth: 1, borderColor: '#ccc', paddingLeft: 12, paddingTop: 8, marginLeft: 3, marginRight: 3, marginBottom: 10 },
    sectionTitle: { fontSize: 18, paddingBottom: 6 },
    sectionBodyContainer: { paddingLeft: 15, paddingBottom: 20, paddingRight: 15 },
    fieldGroup: { flexDirection: 'row', marginBottom: 3 },
    labelSm: { fontFamily: 'HelveticaNeue', fontSize: 11, textAlign: 'right', width: 80, marginRight: 5 },
    labelLg: { fontFamily: 'HelveticaNeue', fontSize: 14 },
    labelCredit: { fontFamily: 'HelveticaNeue', fontSize: 12, width: 200 },
    fieldSm: { fontFamily: 'HelveticaNeue', fontSize: 11 },
    fieldMd: { fontFamily: 'HelveticaNeue', fontSize: 12 },
    cropHeader: { fontFamily: 'HelveticaNeue', fontSize: 11, width: 150, textAlign: 'right' },
    cropField: { fontFamily: 'HelveticaNeue', fontSize: 14, width: 150, textAlign: 'right' },
    emailStyle: { fontFamily: 'HelveticaNeue', fontSize: 12, color: '#4a90e2' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }
});

const mapStateToProps = state => {
    return { 
        acc: state.account,
        data: state.account.limits
    };
};

export default connect(mapStateToProps, null)(AccountInfo);
