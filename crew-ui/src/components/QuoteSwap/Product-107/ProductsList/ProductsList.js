import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { onChangeName, onChangeId } from '../../../../redux/actions/QuoteSwap/ProductType/SelectedProduct';
import bugsnag from '../../../common/BugSnag';

class ProductsList extends Component {
    selectProduct(name, id) {
        this.props.onChangeName(name);
        this.props.onChangeId(id);
    }
    render() {
        try {
            return (
                <TouchableOpacity onPress={this.selectProduct.bind(this, this.props.item.name, this.props.item.id)}>
                    <View style={{
                        height: 36,
                        width: 252,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        justifyContent: 'center'
                    }}>
                        <ScrollView>
                            <Text style={{
                                color: 'rgb(159,159,159)',
                                fontFamily: 'HelveticaNeue',
                                fontSize: 16,
                                paddingLeft: 10
                            }}>{this.props.item.name}</Text>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
export default connect(null, { onChangeName, onChangeId })(ProductsList);