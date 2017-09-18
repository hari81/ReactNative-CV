import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Refresh from './img/Refresh.png';
import cargillLogoWhite from './img/cargillLogoWhite.png';
import Phone from './img/Phone.png';
import HomeIcon from './img/homeIconMed.png';
import User from './img/User.png';

const LogoHomeHeader = () => {
    return (
        <View style={{ flexDirection: 'row', height: 43, backgroundColor: 'rgb(35,43,50)' }}>
            <TouchableHighlight onPress={() => Actions.dashboard()}>
                <Image
                    source={HomeIcon}
                    style={{ width: 30, height: 30, marginLeft: 10 }}
                />
            </TouchableHighlight>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 50, alignItems: 'center' }}>
                <Image style={{ width: 76, height: 34, marginLeft: 30, marginRight: 10 }} source={cargillLogoWhite} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>
                    Price Hedging
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableHighlight>
                        <Image style={{ width: 25, height: 25, marginLeft: 1, marginRight: 5 }} source={Refresh} />
                    </TouchableHighlight>
                    <Text style={{ color: 'white', fontSize: 14, borderColor: 'white', borderRightWidth: 2 }}>
                        Refresh Data
                    </Text>
                </View>
                <Text style={{ color: 'white', fontSize: 14 }}> | </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 30, marginRight: 30 }}>
                    <Image style={{ width: 25, height: 25, marginLeft: 1, marginRight: 1 }} source={Phone} />
                    <Text style={{ color: 'white', fontSize: 14 }}> +1-952-742-7414</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 14 }}> | </Text>
                <View>
                    <Image style={{ width: 30, height: 30, marginLeft: 20, marginRight: 30 }} source={User} />
                </View>
            </View>
        </View>

    );
};

export { LogoHomeHeader };