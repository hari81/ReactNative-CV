import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common/Spinner';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import bugsnag from '../../components/common/BugSnag';

class Matrix extends Component {
    rows() {
        return (
            <FlatList
                data={this.props.matrix.Data}
                numColumns={11}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={item.value <= 0 ? [styles.boxStyle, { backgroundColor: 'rgb(158,42,47)', borderColor: item.id === 60 ? 'rgb(245,131,51)' : 'white', borderWidth: item.id === 60 ? 3 : 1 }] : [styles.boxStyle, { backgroundColor: 'rgb(1,172,168)', borderColor: item.id === 60 ? 'rgb(245,131,51)' : 'white', borderWidth: item.id === 60 ? 3 : 1  }]}>
                        <Text style={styles.textStyle}>{common.minusBeforeDollarSign(item.value, 0)}</Text >
                    </View>
                )}
            />
        );
    }
    spinner() {
       if (this.props.matrix.matrixSpinner) {
           return < Spinner size='small' />;
       }
       return (
           <View style={{ flexDirection: 'column' }}>
               <View style={{ flexDirection: 'row' }}>
                   <View style={{ marginTop: height * 0.50, width: width * 0.0586 }}><Text style={{ fontSize: 14, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue', transform: [{ rotate: '270deg' }] }}>Price Per Bushel</Text></View>
                   <View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 0, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 12, 'price']), 2)}</Text ></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 23, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 34, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 45, 'price']), 2)}</Text ></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 56, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 67, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 78, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 89, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 100, 'price']), 2)}</Text></View>
                       <View style={styles.boxStyle}><Text style={styles.textStyle}>{common.minusBeforeDollarSign(st(this.props, ['matrix', 'Data', 112, 'price']), 2)}</Text></View>
                   </View>
                   <View>
                       {this.rows()}
                   </View>
               </View>
               <View style={{ flexDirection: 'row', marginLeft: width * 0.0586 }}>
                   <View style={styles.boxStyle} />
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 0, 'yield'])}</Text ></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 1, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 2, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 3, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 4, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 5, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 6, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 7, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 8, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 9, 'yield'])}</Text></View>
                   <View style={styles.boxStyle}><Text style={styles.textStyle}>{st(this.props, ['matrix', 'Data', 10, 'yield'])}</Text></View>
               </View>
           </View>
       );
    }
    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={{height: height * 0.63}}>
                    {this.spinner()}
                    <Text style={{
                        color: 'rgb(255,255,255)',
                        fontSize: 14,
                        paddingLeft: width * 0.0586,
                        fontFamily: 'HelveticaNeue'
                    }}>Yield Bushels Per Acre</Text>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
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
const mapStateToProps = (state) => {
    return {
        matrix: state.matrixData,
        acc: state.account
    };
}
 export default connect(mapStateToProps, null)(Matrix);
