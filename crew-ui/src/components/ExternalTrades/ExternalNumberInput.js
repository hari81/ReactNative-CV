/*jshint esversion: 6 */
'use strict';
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class ExternalNumberInput extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {
            label,
            val,
            onChangeText,
            placeholder,
            edit
        } = this.props;
        // const { inputStyle, containerStyle } = styles;
        /*let newval='';
        console.log('instancet', typeof val);
        console.log(' number', val);
        if(typeof val === 'number')
        {
            newval= ''+val;
        }*/

        //console.log('after if', typeof val)
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.labelStyle}> {label}</Text>
                <TextInput
                    placeholder={placeholder}
                    style={styles.inputStyle}
                    value={val}
                    onChangeText={onChangeText}
                    editable={edit}
                />
            </View>
        );
    }
}

ExternalNumberInput.propTypes = {
   val: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number]),
    label: PropTypes.string
};

ExternalNumberInput.defaultProps = {
    val: 0
};


const styles = {
    inputStyle: {
        width: 132,
        height: 45,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 20,
        backgroundColor: 'white',
        borderRadius:5

    },
    labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
        color: 'white',
        alignSelf: 'stretch'

    },
    containerStyle: {
        height: 70,
        alignItems: 'center',
        width: 150,
        marginLeft: 10
    }
};

export { ExternalNumberInput };
