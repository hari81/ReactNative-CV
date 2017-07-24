import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogoHeader = (props) => {
    const { viewStyle, subHeadTextStyle, phNumberStyle, dataStyle } = styles;
    return (
        <View style={viewStyle}>
        <Image
            style={{ width: 70, height: 30, marginLeft: 50, marginRight: 10 }}
            source={ require('./logo.png') }
        />
            <Text style={subHeadTextStyle}>{props.subHeaderText}</Text>
            <Text style={dataStyle}>{props.data}</Text>
            <Text style={phNumberStyle}>{props.phNumber}</Text>
        </View>
    );
}
const styles = {
    dataStyle: {
        flex: 1,
        fontSize: 14,
        paddingTop: 8,
        paddingLeft: 500,
        color: '#ffffff'
    },
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#007681',
        height: 70,
        paddingTop: 15
    },
    subHeadTextStyle: {
        fontSize: 14,
        paddingTop: 8,
        color: '#ffffff'
    },
    phNumberStyle: {
        flex: 1,
        fontSize: 14,
        paddingTop: 8,
        paddingLeft: 10,
        color: '#ffffff'
    }
}
export { LogoHeader };
