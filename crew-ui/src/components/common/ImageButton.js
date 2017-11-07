import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import rightArrow from './img/rightArrow.png';
import leftArrow from './img/leftArrow.png';
import checkGreen from './img/checkGreen.png';
import checkWhite from './img/checkWhite.png';

const { height, width } = Dimensions.get('window');
const ImageButton = ({ onPress, text, buttonStyle = styles.buttonStyle, textStyle = styles.textStyle }) => {
    let button = null;

    if (text === 'BACK') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={[buttonStyle, { backgroundColor: 'rgb(255,255,255)', marginRight: 10 }]}>
                <Image source={leftArrow} />
                <Text style={[textStyle, { color: 'rgb(83,97,114)' }]}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    } else if (text === 'NEXT') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={buttonStyle}>
                <Text style={textStyle}>{text}</Text>
                <Image source={rightArrow} />
                </View>
            </TouchableOpacity>
        );
    }
    if (text.substr(0, 2) === 'YE' || text.substr(0, 2) === 'NO') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={[buttonStyle, { width: width * 0.27 }, text.substr(0, 2) === 'NO' ? { backgroundColor: 'rgb(255,255,255)' } : {}] }>
                    <Image source={text.substr(0, 2) === 'NO' ? checkWhite : checkGreen} />
                    <Text style={[textStyle, { paddingRight: 20 }, text.substr(0, 2) === 'NO' ? { color: 'rgb(39,153,137)' } : {}]}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return button;
};
const styles = {
    buttonStyle: { flexDirection: 'row', height: height * 0.078, width: width * 0.16, backgroundColor: 'rgb(39,153,137)', alignItems: 'center', borderRadius: 4, justifyContent: 'space-around' },
    textStyle: { fontSize: 20, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' },
};
export { ImageButton };
