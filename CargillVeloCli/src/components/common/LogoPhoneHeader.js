import React from 'react';
import { Text, View, Image, TouchableHighlight, Alert }  from 'react-native';
import { Actions } from 'react-native-router-flux';
import Refresh from './img/Refresh.png';
import cargillLogoWhite from './img/cargillLogoWhite.png';
import HomeIcon from './img/homeIconMed.png';
import Phone from './img/Phone.png';
import User from './img/User.png';


const LogoPhoneHeader = () => {

    return (

        <View style={styles.logoStyle}>
            <View
                style={{ flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center' }}
            >
                <TouchableHighlight

                    onPress={() => Actions.dashboard()}
                >
                    <Image source={HomeIcon} />
                </TouchableHighlight>

                <Image
                    style={{ width: 70, height: 32, marginLeft: 30, marginRight: 10 }}
                    source={cargillLogoWhite}
                />
                <Text
                    style={{ color: 'white', textAlign: 'center', fontSize: 14 }}
                >
                    Price Hedging
                </Text>

            </View>
            <View
                style={{ flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center' }}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={() => Alert("Data will refresh")}>
                        <Image
                            style={{ width: 25, height: 25, marginLeft: 1, marginRight: 5 }}
                            source={Refresh}
                        />
                    </TouchableHighlight>
                    <Text
                        style={{ color: 'white',
                            fontSize: 14,
                            borderColor: 'white',
                            borderRightWidth: 2 }}
                    >
                        Refesh Data
                    </Text>

                </View>
                <Text style={{ color: 'white', fontSize: 14 }}> | </Text>
                <View
                    style={{ flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 30,
                        marginRight: 30 }}
                >
                    <Image
                        style={{ width: 25, height: 25, marginLeft: 1, marginRight: 1 }}
                        source={Phone}
                    />
                    <Text style={{ color: 'white', fontSize: 14 }}> +1-952-742-7414</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 14 }}> | </Text>
                <View>

                    <Image
                        style={{ width: 30, height: 30, marginLeft: 20, marginRight: 30 }}
                        source={User}
                    />
                </View>
            </View>

        </View>

    );
}

const styles = {
    logoStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        height: 64
    },
}

export { LogoPhoneHeader };
