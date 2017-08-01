import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';


import Dimensions from 'Dimensions';

import { LogoPhoneHeader, CardSection } from '../components/common/index';

export default class MyFarm extends React.Component
{

    render()
    {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                    style={{ backgroundColor: '#3d4c57',
                        width,
                        height: height - 110,
                        marginTop: 5,
                        marginRight: 30,
                        marginBottom: 10
                    }}
                >
                    <LogoPhoneHeader/>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, marginTop: 25 }}>
                            Please log in below by entering your username and password
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row',
                            marginTop: 50,
                            marginLeft: 20,
                            marginRight: 20,
                            alignItems: 'stretch' }}
                    >
                        <View
                            style={{ flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRightWidth: 2,
                                borderColor: 'white' }}
                        >

                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ alignItems: 'flex-start', marginLeft: 50 }}>
                                <Text style={{ fontSize: 25, color: 'white' }}> Login below </Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View
                    style={{ width: width,
                        height: 90,
                        backgroundColor: '#3d4c57',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity>
                        <View style={{width: 1150, height: 80, backgroundColor: 'white'}}>
                            <Text>2016</Text>
                            <Text>Corn</Text>
                            <Text>Corp</Text>
                        </View>
                    </TouchableOpacity>

                    </View>




                </View>


            </View>
        );
    }
}
