import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import ProductsList from './ProductsList';
import st from '../../../Utils/SafeTraverse';
import expandArrow from '../../common/img/arrow_down_grey.png';
import bugsnag from '../../common/BugSnag';

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
        try {
            const productInitial = this.props.products.find(x => x.name.toLowerCase() === 'producer swap').name;
            return (
                <View>
                    <View style={styles.container}>
                        <Text style={{color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10}}>PRODUCT</Text>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({productListEnable: !this.state.productListEnable})}>
                            <View style={{width: 252, height: 50, backgroundColor: '#fff', flexDirection: 'row'}}>
                                <View style={{width: 200, marginTop: 8, marginLeft: 8}}>
                                    <Text style={{
                                        color: '#9f9f9f',
                                        fontFamily: 'HelveticaNeue',
                                        textAlign: 'auto',
                                        fontSize: 16,
                                        alignSelf: 'stretch'
                                    }}>{this.props.selectedProduct.productName || productInitial}</Text>
                                </View>
                                <Image source={expandArrow} style={{height: 20, width: 20, margin: 10}}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={this.state.productListEnable ? styles.productListContainer : ''}>
                        {this.productsList()}
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
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
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        selectedProduct: state.selectedProductQuoteSwap
    };
};

export default connect(mapStateToProps, null)(ProductType);
