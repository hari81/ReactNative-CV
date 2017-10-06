import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import ProductsList from './ProductsList';
import st from '../../../Utils/SafeTraverse';
import expandArrow from '../../common/img/arrow_down_grey.png';

class ProductType extends Component {
    constructor() {
        super();
        this.state = {
            productListEnable: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ productListEnable: !this.state.productListEnable });
        this.props.onProductChange(nextProps.selectedProduct.productId);
    }

    productsList() {
        if (this.state.productListEnable) {
            return (<FlatList
                data={this.props.products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ProductsList item={item} key={item.id} />}
            />);
        }
    }
    render() {
        const productInitial = st(this.props, ['products', 0, 'name'])
        return (
            <View>
                <View style={styles.container}>
                        <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>PRODUCT</Text>
                        <TouchableWithoutFeedback onPress={() => this.setState({ productListEnable: !this.state.productListEnable })}>
                        <View style={{ width: 252, height: 50, backgroundColor: 'rgb(255,255,255)', flexDirection: 'row' }}>
                            <View style={{ width: 200, marginTop: 10, marginLeft: 10 }}><Text style={{ color: 'rgb(159,159,159)', fontFamily: 'HelveticaNeue', textAlign: 'auto', fontSize: 16, alignSelf: 'stretch' }}>{this.props.selectedProduct.productName || productInitial}</Text></View>
                            <Image source={expandArrow} style={{ height: 20, width: 20, margin: 10 }} />
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                <View style={this.state.productListEnable ? styles.productListContainer:''}>
                    {this.productsList()}
                </View>
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 16,
        justifyContent: 'center'

    },
    productListContainer: {
        width: 252,
        height: 100,
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: 98,

    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        selectedProduct: state.selectedProductQuoteSwap
    };
}
export default connect(mapStateToProps, null)(ProductType);
