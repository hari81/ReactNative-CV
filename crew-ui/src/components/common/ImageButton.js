import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Spinner } from './Spinner';
import rightArrow from './img/structure/rightArrow.png';
import leftArrow from './img/structure/leftArrow.png';
import checkGreen from './img/structure/checkGreen.png';
import checkWhite from './img/structure/checkWhite.png';

const { height, width } = Dimensions.get('window');
const ImageButton = (props) => {
    const { onPress, text, inactive, buttonStyle = styles.buttonStyle, textStyle = styles.textStyle } = props;
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
        if (props.suggestQuote.spinFlag) {
         button = (<View style={[buttonStyle, { backgroundColor: 'rgb(39,153,137)' }]}>
                 <Spinner />
             </View>
             );
         } else {
        button = (
            <TouchableOpacity onPress={onPress} disabled={inactive === 'true'}>
                <View style={[buttonStyle, inactive === 'true' ? { backgroundColor: 'rgba(39,153,137, .65)' } : {}]}>
                    <Text
                        style={[textStyle, inactive === 'true' ? { color: 'rgba(255,255,255, .35)' } : {}]}>{text}</Text>
                    <Image source={rightArrow} />
                </View>
            </TouchableOpacity>
        );
    }
    }
    if (text.substr(0, 2) === 'YE' || text.substr(0, 2) === 'NO') {
        button = (
            <TouchableOpacity onPress={onPress}>
                <View style={[buttonStyle, { width: width * 0.27 }, text.substr(0, 2) === 'NO' ? { backgroundColor: 'rgb(255,255,255)' } : {}] }>
                    <Image source={text.substr(0, 2) === 'NO' ? checkWhite : checkGreen} style={{ height: 40, width: 40 }} />
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
const mapStateToProps = (state) => {
    return { suggestQuote: state.optimalQuote };
};
export default connect(mapStateToProps, null)(ImageButton);
