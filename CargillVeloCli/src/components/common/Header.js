import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        paddingTop: 15,
        shadowColor: '#000',
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 50,
        color: 'white'
    }
};

// Make the component available to other parts of the app
export { Header };
