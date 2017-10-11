import React from 'react';
import { View, Image, TouchableOpacity, Button, AlertIOS } from 'react-native';
import cancelimage from '../common/img/Cancel-20.png';

const LogOff = ({ popupInfo, onClose }) => {
    const boxwidth = popupInfo.width;
    const arrowleft = (boxwidth - 50);
    let popup = (
        <View style={{ position: 'absolute', marginLeft: 870 }}>
            <View style={[styles.triangle, styles.triangleTop, { marginLeft: arrowleft }]} />
            <View style={[styles.messageBox, { width: boxwidth }]}>
                <TouchableOpacity onPress={onClose} >
                    <View style={{ marginLeft: boxwidth - 20 }}>
                        <Image source={cancelimage} style={{ width: 20, height: 20 }} />
                    </View>
                </TouchableOpacity>
                <Button title='Log Off'onPress={() => { AlertIOS.alert('Will be Logoff...'); }} />
                <Button title='Reset Password' onPress={() => { AlertIOS.alert('Ready soon...'); }} />
            </View>
        </View>
    );

    return popup;
};

const styles = {
    /* popup/message style */
    triangle: { width: 0, height: 0, marginTop: 110, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#fff', borderLeftWidth: 15, borderRightWidth: 15, borderLeftColor: 'transparent', borderRightColor: 'transparent', shadowColor: '#aaa', shadowRadius: 1, shadowOpacity: 0.5, zIndex: 10 },

    triangleTop: { marginBottom: -1, borderBottomWidth: 20, borderTopColor: '#ddd', borderBottomColor: '#fff', shadowOffset: { width: 0, height: -1 } },
    messageBox: { borderColor: '#ddd', borderWidth: 1, backgroundColor: '#fff', borderRadius: 3, shadowColor: '#aaa', shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, shadowOpacity: 0.5, zIndex: 9 },

};

export { LogOff };
