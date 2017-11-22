import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as common from '../../Utils/common';

class PositionsAdditionalDetail extends Component {
    render() {
        try {
            let tAddlDetails = null;
            switch (this.props.riskProductId) {
                case 107:
                    tAddlDetails = (
                        <View style={{ paddingTop: 5, paddingRight: 20, paddingLeft: 20, paddingBottom: 5, backgroundColor: '#efefef65' }}>
                            {/* product description */ }
                            <Text style={styles.addlGroupTitle}>Product Description</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>FLOOR PRICE</Text>
                                    <Text style={styles.listText}>$3.83</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>BONUS PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>ADDITIONAL QUANTITY PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICE</Text>
                                    <Text style={styles.listText}>-$0.03</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING PERIOD</Text>
                                    <Text style={styles.listText}>11/07/2017 - 11/24/2018</Text>
                                </View>
                            </View>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>PRICING DAYS</Text>
                                    <Text style={styles.listText}>128</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>DAYS PASSED</Text>
                                    <Text style={styles.listText}>10</Text>
                                </View>
                            </View>
                            {/* floored with daily bonus qty */ }
                            <Text style={styles.addlGroupTitle}>Floored with Daily Bonus Quantity Details</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>QUANTITY COMMITTED</Text>
                                    <Text style={styles.listText}>10,000</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>DAYS AT FLOOR PRICE</Text>
                                    <Text style={styles.listText}>2</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>DAYS AT BONUS PRICE</Text>
                                    <Text style={styles.listText}>8</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>QUANTITY AT FLOOR</Text>
                                    <Text style={styles.listText}>100</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>QUANTITY AT BONUS</Text>
                                    <Text style={styles.listText}>500</Text>
                                </View>
                            </View>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>PRICED QUANTITY</Text>
                                    <Text style={styles.listText}>600</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>AVERAGE PRICE</Text>
                                    <Text style={styles.listText}>$4.15</Text>
                                </View>
                            </View>
                            {/* additional qty details */ }
                            <Text style={styles.addlGroupTitle}>Additional Quantity Details</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>QUANTITY COMMITTED</Text>
                                    <Text style={styles.listText}>10,000</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>OFFERED PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING DATE</Text>
                                    <Text style={styles.listText}>11/24/2018</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>TRIGGERED</Text>
                                    <Text style={styles.listText}>TBD</Text>
                                </View>
                            </View>
                        </View>
                        );
                    break;
                case 110:
                default: // producer swap and all others
                    tAddlDetails = (
                        <View style={{ paddingTop: 5, paddingRight: 20, paddingLeft: 15, paddingBottom: 5, backgroundColor: '#efefef65' }}>
                            {/* product description */ }
                            <Text style={styles.addlGroupTitle}>Product Description</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>FLOOR PRICE</Text>
                                    <Text style={styles.listText}>$3.83</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>BONUS PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>ADDITIONAL QUANTITY PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICE</Text>
                                    <Text style={styles.listText}>-$0.03</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING PERIOD</Text>
                                    <Text style={styles.listText}>11/07/2017 - 11/24/2018</Text>
                                </View>
                            </View>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>PRICING DAYS</Text>
                                    <Text style={styles.listText}>128</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>DAYS PASSED</Text>
                                    <Text style={styles.listText}>10</Text>
                                </View>
                            </View>
                            {/* additional qty details */ }
                            <Text style={styles.addlGroupTitle}>Additional Quantity Details</Text>
                            <View style={styles.addlGroup}>
                                <View style={[styles.addlField, { paddingLeft: 0 }]}>
                                    <Text style={styles.listLabel}>QUANTITY COMMITTED</Text>
                                    <Text style={styles.listText}>10,000</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>OFFERED PRICE</Text>
                                    <Text style={styles.listText}>$4.27</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>PRICING DATE</Text>
                                    <Text style={styles.listText}>11/24/2018</Text>
                                </View>
                                <View style={styles.addlField}>
                                    <Text style={styles.listLabel}>TRIGGERED</Text>
                                    <Text style={styles.listText}>TBD</Text>
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
    addlField: { minWidth: 185, paddingLeft: 15 },
    addlGroupTitle: { fontFamily: 'HelveticaNeue-Bold', color: '#3d4c57', marginTop: 2, marginBottom: 5 },
    addlGroup: { marginLeft: 20, flexDirection: 'row', marginBottom: 3 }
};

export default PositionsAdditionalDetail;
