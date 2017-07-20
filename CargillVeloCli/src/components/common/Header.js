import React from 'react';
import {Text, View, Image } from 'react-native';

const Header = (props) => {
    const { viewStyle, subHeadTextStyle, phNumberStyle } = styles;
    return (
        <View style={viewStyle}>
        <Image
            style={{ width: 70, height: 30, marginLeft: 50, marginRight: 10 }}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Cargill_logo.svg/1200px-Cargill_logo.svg.png' }}
        />
            <Text style={subHeadTextStyle}>{props.subHeaderText}</Text>
            <Text style={phNumberStyle}>{props.phNumber}</Text>
        </View>
    );
}
const styles = {
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
        paddingLeft: 500,
        color: '#ffffff'
    }
}
export { Header };
