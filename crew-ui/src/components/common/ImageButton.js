import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import rightArrow from './img/rightArrow.png';
import leftArrow from './img/leftArrow.png';

const { height, width } = Dimensions.get('window');
const ImageButton = ({ onPress, text, buttonStyle = styles.buttonStyle, textStyle = styles.textStyle }) => {
    let button = null;

    if (text === 'BACK') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={[buttonStyle, { backgroundColor: 'rgb(255,255,255)', marginRight: 10 }]}>
                <Image source={leftArrow} marginLeft={10} marginRight={20} />
                <Text style={[textStyle, { color: 'rgb(83,97,114)' }]}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    } else if (text === 'NEXT') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={buttonStyle}>
                <Text style={textStyle}>{text}</Text>
                <Image source={rightArrow} marginLeft={10} marginRight={20} />
                </View>
            </TouchableOpacity>
        );
    }
    return button;
};
const styles = {
    buttonStyle: { flexDirection: 'row', height: height * 0.078, width: width * 0.16, backgroundColor: 'rgb(39,153,137)', alignItems: 'center', borderRadius: 4, justifyContent: 'center' },
    textStyle: { fontSize: 20, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' },
};
export { ImageButton };
