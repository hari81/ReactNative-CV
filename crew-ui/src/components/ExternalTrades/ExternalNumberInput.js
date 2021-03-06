import React from 'react';
import { TextInput, View, Text, Keyboard } from 'react-native';
import bugsnag from '../common/BugSnag';
import PropTypes from 'prop-types';

class ExternalNumberInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        try {
            const {
                label,
                val,
                onChangeText,
                placeholder,
                edit, onfocus, onblur, stylenp, onChange
            } = this.props;

            return (
                <View style={styles.containerStyle}>
                    <Text style={styles.labelStyle}> {label}</Text>
                    <TextInput
                        placeholder={placeholder}
                        style={[styles.inputStyle, stylenp]}
                        value={val + ''}
                        onChangeText={onChangeText}
                        editable={edit}
                        onFocus={onfocus}
                        onBlur={onblur}
                        onChange={onChange}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                                Keyboard.dismiss();
                            }
                        }}
                    />
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
ExternalNumberInput.defaultProps = {
    val: ''
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
        borderRadius: 5
    },
    labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
        color: 'white',
        alignItems: 'center'

    },
    containerStyle: {
        height: 70,
        alignItems: 'center',
        width: '14.16%',
        marginLeft: 5,

    }
};

export { ExternalNumberInput };
