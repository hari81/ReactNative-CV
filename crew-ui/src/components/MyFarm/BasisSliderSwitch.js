import React, { Component } from 'react';
import { View, Text, Slider, Switch } from 'react-native';


class BasisSliderSwitch extends Component {

render(){
    const { estim, basis } = this.props;
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 370, height: 118, backgroundColor: 'rgb(89,108,121)', marginRight: 5, justifyContent: 'space-around', alignItems: 'center' }}>
                <Text
                    style={{ color: 'white', fontSize: 16 }}
                >
                    Basis Estimate for Unsold Production (-/+)
                </Text>
                <Text style={[styles.slidenum, estim > 0 ? { color: 'rgb(39,153,137)' } : { color: 'rgb(181,182,181)' }]}>
                    ${estim.toFixed(2)}
                </Text>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>$-2.00</Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>$2.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: 'white' }}>|</Text>
                        <Slider
                            style={{ width: 325 }}
                            step={0.01}
                            minimumValue={-2}
                            maximumValue={2}
                            value={estim}
                            onValueChange={slideval => this.props.sliderVal(slideval)}
                            maximumTrackTintColor='rgb(181,182,181)'
                            minimumTrackTintColor='rgb(39,153,137)'
                            thumbTintColor='rgb(181,182,181)'
                        />
                        <Text style={{ fontSize: 25, color: 'white' }}>|</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: 130, height: 118, backgroundColor: 'rgb(89,108,121)', justifyContent: 'center' }}>
                <Text style={{ color: 'rgb(255,255,255)', fontSize: 10, textAlign: 'center' }}> TOGGLE ON/OFF TO
                    INCLUDE BASIS IN
                    CALCULATIONS </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                    <Text style={{ color: 'rgb(255,255,255)' }}>OFF</Text>
                    <Switch
                        value={basis}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        onTintColor='#01aca8'
                        onValueChange={() => this.props.switchVal(!basis)}

                    />
                    <Text style={{ color: 'rgb(255,255,255)' }}>ON</Text>
                </View>
            </View>
        </View >
    );
    }
}
const styles = {
    slidenum: {
        fontSize: 20,
        textAlign: 'center',

    }
};
export default BasisSliderSwitch;
