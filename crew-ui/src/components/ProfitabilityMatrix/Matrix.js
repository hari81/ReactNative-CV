import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import matrix1 from '../../restAPI/Matrix1.json';

export default class Matrix extends Component {
    rows() {
        return (
            <FlatList
                data={matrix1}
                numColumns={11}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View style={item.value <= 0 ? [styles.boxStyle, { backgroundColor: 'rgb(158,42,47)' }] : [styles.boxStyle, { backgroundColor: 'rgb(1,172,168)' }]}>
                        <Text style={styles.textStyle}>${item.value.toFixed(0)}</Text >
                    </View>}
            />
        );
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginTop: height * 0.50, width: width * 0.0586 }}><Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', transform: [{ rotate: '270deg' }] }}>Price Per Bushel</Text></View>
                        <View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[0].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[12].y.toFixed(2)}</Text ></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[23].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[34].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[45].y.toFixed(2)}</Text ></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[56].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[67].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[78].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[89].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[100].y.toFixed(2)}</Text></View>
                            <View style={styles.boxStyle}><Text style={styles.textStyle}>${matrix1[112].y.toFixed(2)}</Text></View>
                        </View>
                        <View>
                            {this.rows()}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: width * 0.0586 }}>
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[0].x}</Text ></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[1].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[2].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[3].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[4].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[5].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[6].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[7].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[8].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[9].x}</Text></View>
                        <View style={styles.boxStyle}><Text style={styles.textStyle}>{matrix1[10].x}</Text></View>
                    </View>
                </View>
                <Text style={{ color: 'rgb(255,255,255)', fontSize: 14, paddingLeft: width * 0.0586, fontFamily: 'HelveticaNeue' }}>Yield Bushels Per Acre</Text>
            </View>
        );
    }
}
const { width, height } = Dimensions.get('window');
const styles = {
    boxStyle: {
        height: height * 0.051,
        width: width * 0.076,
        borderColor: 'rgb(237,233,233)',
        borderWidth: 1,
        backgroundColor: 'rgb(29,37,49)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
      color: 'rgb(255,255,255)',
      fontSize: 18,
      fontFamily: 'HelveticaNeue-Bold',
    }
}
