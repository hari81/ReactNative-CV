import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const PageHeader = props => {
    return (
        <View style={styles.backPageHeader}>
            <View style={styles.backBlackBar}>
                <View style={styles.backHeader}>
                    <View style={styles.headerTextBox}>
                        <Text style={styles.headerText}>{props.headerText}</Text>
                    </View>
                    <View style={styles.headerInfoTextBox}>
                        <Text style={styles.headerInfoText}>{props.headerInfoText}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = {
    backPageHeader: { height: 100, backgroundColor: '#eff4f7' },
    backBlackBar: { height: 80, backgroundColor: '#404e59', },
    backHeader: { backgroundColor: '#fff', position: 'absolute', height: 80, borderWidth: 1, borderColor: '#bed8dd', borderTopColor: '#e7b514', borderTopWidth: 4, marginTop: 20, marginLeft: 15, marginRight: 15, overflow: 'visible', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', width: width - 30 },
    headerTextBox: { height: 50, justifyContent: 'center', borderRightColor: '#e6eaee', borderRightWidth: 2 },
    headerText: { fontFamily: 'HelveticaNeue-Medium', color: '#007681', fontSize: 20, paddingLeft: 20, paddingRight: 20 },
    headerInfoTextBox: { justifyContent: 'center', height: 50, marginLeft: 30 },
    headerInfoText: { fontSize: 12, color: '#9fa9ba' }
};

export { PageHeader };
