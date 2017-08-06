import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { Actions} from 'react-native-router-flux';
import User from './img/User.png';

const LogoHeader = (props) => {
    const { viewStyle, subHeadTextStyle, phNumberStyle, dataStyle } = styles;
    return (
        <View style={viewStyle}>
            <TouchableHighlight onPress={()=>Actions.dashboard()}>
            <Image
                style={{ width: 30, height: 30, marginLeft: 10 }}
                source={ require('./img/homeIcon.png')}
            />
            </TouchableHighlight>
            <Image
            style={{ width: 70, height: 30, marginLeft: 30, marginRight: 10 }}
            source={ require('./img/Logo.png') }
        />
            <Text style={subHeadTextStyle}>{props.subHeaderText}</Text>
            <Text style={dataStyle}>{props.data}</Text>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginRight: 20, width: 400 }}>
            <Image
                style={{ width: 30, height: 30 }}
                source={ require('./img/Phone.png')}
            />
            <Text style={phNumberStyle}>{props.phNumber}</Text>
            <Text style={{ fontSize: 30, color: 'white' }}> | </Text>
            <Image source={User} style={{marginLeft: 20, width: 40, height: 40}}/>
                <Image />
            </View>
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
        backgroundColor: '#3d4c57',
        height: 70,
        paddingTop: 20,
        marginRight:15
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
       // paddingLeft: 10,
        color: '#ffffff'
    }
}
export { LogoHeader };
