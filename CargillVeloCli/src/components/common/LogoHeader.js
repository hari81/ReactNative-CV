import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogoHeader = (props) => {
    const { viewStyle, subHeadTextStyle, phNumberStyle, dataStyle } = styles;
    return (
        <View style={viewStyle}>
            <Image
                style={{ width: 30, height: 30, marginLeft: 10 }}
                source={ require('./img/homeIcon.png')}
            /><Image
            style={{ width: 70, height: 30, marginLeft: 30, marginRight: 10 }}
            source={ require('./img/Logo.png') }
        />
            <Text style={subHeadTextStyle}>{props.subHeaderText}</Text>
            <Text style={dataStyle}>{props.data}</Text>
            <Image
                style={{ width: 30, height: 30 }}
                source={ require('./img/Phone.png')}
            /><Text style={phNumberStyle}>{props.phNumber}</Text>
        </View>
    );
}
const styles = {
    dataStyle: {
        flex: 1,
        fontSize: 14,
        paddingTop: 8,
        paddingLeft: 300,
        color: '#ffffff'
    },
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#007681',
        height: 70,
        paddingTop: 20
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
