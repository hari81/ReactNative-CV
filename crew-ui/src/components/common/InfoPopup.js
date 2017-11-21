import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import cancelimage from '../common/img/Cancel-20.png';
import bugsnag from '../common/BugSnag';
import * as common from '../../Utils/common';

const InfoPopup = ({ popupInfo, onClose }) => {
    try {
        const top = popupInfo.top;
        const left = popupInfo.left;
        const boxwidth = popupInfo.width;
        const arrowleft = (boxwidth / 2) - 10;
        const arrowPosition = popupInfo.arrowPosition;
        const boxmessage = popupInfo.message;

        let tLink = null;
        if (common.isValueExists(popupInfo.link)) {
            tLink = (
                <View style={{ paddingLeft: 25, marginBottom: 20 }}>
                    {popupInfo.link}
                </View>
            );
        }

        let popup = (
            <View style={{ position: 'absolute', marginTop: top, marginLeft: left }}>
                <View style={[styles.triangle, styles.triangleTop, { marginLeft: arrowleft }]} />
                <View style={[styles.messageBox, { width: boxwidth }]}>
                    <TouchableOpacity onPress={onClose}>
                        <View style={{ marginLeft: boxwidth - 25, marginTop: 5 }}>
                            <Image source={cancelimage} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.messageBoxText}>{boxmessage}</Text>
                    {tLink}
                </View>
            </View>
        );
        if (arrowPosition === 'bottom') {
            popup = (
                <View style={{ position: 'absolute', marginTop: top, marginLeft: left }}>
                    <View style={[styles.messageBox, { width: boxwidth }]}>
                        <TouchableOpacity onPress={onClose}>
                            <View style={{ marginLeft: boxwidth - 25, marginTop: 5 }}>
                                <Image source={cancelimage} style={{ width: 20, height: 20 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.messageBoxText}>{boxmessage}</Text>
                        {tLink}
                    </View>
                    <View style={[styles.triangle, styles.triangleBottom, { marginLeft: arrowleft }]} />
                </View>
            );
        }
        return popup;
    } catch (error) {
        bugsnag.notify(error);
    }
};
    
const styles = {
    /* popup/message style */
    triangle: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#fff', borderLeftWidth: 15, borderRightWidth: 15, borderLeftColor: 'transparent', borderRightColor: 'transparent', shadowColor: '#aaa', shadowRadius: 1, shadowOpacity: 0.5, zIndex: 10 },
    triangleBottom: { marginTop: -2, borderTopWidth: 20, borderBottomColor: '#ddd', shadowOffset: { width: 0, height: 2 } },
    triangleTop: { marginBottom: -1, borderBottomWidth: 20, borderTopColor: '#ddd', borderBottomColor: '#fff', shadowOffset: { width: 0, height: -1 } },
    messageBox: { borderColor: '#ddd', borderWidth: 1, backgroundColor: '#fff', borderRadius: 3, shadowColor: '#aaa', shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, shadowOpacity: 0.5, zIndex: 9 },
    messageBoxText: { fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 25, paddingTop: 0, paddingRight: 25, paddingBottom: 25 }    
};

export { InfoPopup };
