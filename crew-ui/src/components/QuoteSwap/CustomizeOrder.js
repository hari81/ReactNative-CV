import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ImageButton } from '../common/ImageButton';

const { height, width } = Dimensions.get('window');
class CustomizeOrder extends Component {
    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.pop();
                break;
            default:
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}><Text style={styles.subTextStyle}>Use the + and - buttons to customize your levels</Text></View>
                <View style={{ flexDirection: 'row', marginTop: height * 0.403, marginLeft: width * 0.62 }}>
                    <ImageButton text='BACK' onPress={this.nextScreens.bind(this, 1)} />
                    <ImageButton text='NEXT' />
                </View>

            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, },
    subViewStyle: { marginLeft: width * 0.042, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' }
}

export default connect(null, null)(CustomizeOrder);
