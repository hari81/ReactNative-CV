import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as common from '../../Utils/common';

class PositionsAdditionalDetail extends Component {
    render() {
        try {
            let tAddlDetails = null;
            switch (this.props.riskProductId) {
                case 110:
                    const bd = this.props.data.bonusDetails;
                    const od = this.props.data.offerDetails;
                    tAddlDetails = (
                        <View style={{ paddingTop: 5, paddingRight: 20, paddingLeft: 20, paddingBottom: 5, backgroundColor: '#efefef80' }}>
                            {/* bonus details */ }
                            <Text style={styles.addlGroupTitle}>Floored Daily Bonus Details</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { width: 150, marginLeft: 0 }]}>
                                    <Text style={styles.listLabel}>QUANTITY</Text>
                                    <Text style={styles.listText}>{common.formatNumberCommas(bd.quantity)}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>FLOOR PRICE</Text>
                                    <Text style={styles.listText}>${common.formatNumberCommas(bd.floorPrice.toFixed(2))}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>BONUS PRICE</Text>
                                    <Text style={styles.listText}>${common.formatNumberCommas(bd.bonusPrice.toFixed(2))}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING PERIOD</Text>
                                    <Text style={styles.listText}>{bd.pricingPeriod}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING DAYS</Text>
                                    <Text style={styles.listText}>{common.formatNumberCommas(bd.tradingDays)}</Text>
                                </View>
                            </View>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { width: 150, marginLeft: 0 }]}>
                                    <Text style={styles.listLabel}>DAYS PASSED</Text>
                                    <Text style={styles.listText}>{common.formatNumberCommas(bd.averageDays)}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>DAYS PRICED AT BONUS PRICE</Text>
                                    <Text style={styles.listText}>{common.formatNumberCommas(bd.bonusDays)}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>AVERAGE PRICE</Text>
                                    <Text style={styles.listText}>TBD</Text>
                                </View>
                            </View>
                            {/* Offer Details */ }
                            <Text style={styles.addlGroupTitle}>Contingent Offer Details</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { width: 150, marginLeft: 0 }]}>
                                    <Text style={styles.listLabel}>QUANTITY</Text>
                                    <Text style={styles.listText}>{common.formatNumberCommas(od.quantity)}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>CONTINGENT OFFER PRICE</Text>
                                    <Text style={styles.listText}>${common.formatNumberCommas(od.contingentOfferPrice.toFixed(2))}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>CALCULATION DATE</Text>
                                    <Text style={styles.listText}>{common.formatDate(od.pricingDate, 5)}</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>TRIGGERED</Text>
                                    <Text style={styles.listText}>{od.triggered}</Text>
                                </View>
                            </View>
                            <Text style={[styles.addlGroupTitle, styles.addlFieldNote]}>You may price up to {common.formatNumberCommas(od.priceUpTo)} {this.props.unit}s</Text>
                        </View>
                        );
                    break;
                default: // others
                    tAddlDetails = (
                        <View style={{ paddingTop: 5, paddingRight: 20, paddingLeft: 15, paddingBottom: 5, backgroundColor: '#efefef80' }}>
                            {/* product description */ }
                            <Text style={styles.addlGroupTitle}>Product Description</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>TBD</Text>
                                    <Text style={styles.listText}>$0.00</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>TBD</Text>
                                    <Text style={styles.listText}>0,000</Text>
                                </View>
                            </View>
                        </View>
                        );
                    break;
            }
            return (
                <View>{tAddlDetails}</View>
            );
        } catch (error) {
            common.handleError(error);
        }
    }
}

const styles = {
    listLabel: { fontFamily: 'HelveticaNeue', fontSize: 12, color: '#01aca8' },
    listText: { fontFamily: 'HelveticaNeue-Thin', fontSize: 14 },
    addlField: { width: 190, marginLeft: 8 },
    addlGroupTitle: { fontFamily: 'HelveticaNeue-Bold', color: '#3d4c57', marginTop: 2, marginBottom: 5 },
    addlGroup: { marginLeft: 10, flexDirection: 'row', marginBottom: 3 },
    addlFieldNote: { alignSelf: 'flex-end', marginTop: 15, marginRight: 20, fontStyle: 'italic', fontFamily: 'HelveticaNeue', color: '#3d4c57' }
};

export default PositionsAdditionalDetail;
