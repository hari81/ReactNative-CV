import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ButtonList from './ButtonList';
import { Spinner } from '../index';
import bugsnag from '../BugSnag';

class MyCropButton extends Component {
    getItemLayout = (data, index) => (
        { length: 100, offset: 100 * index, index }
    );

    componentDidMount() {
        //console.log(this.props.crops.cropButtons);
       const buttons = this.props.crops.cropButtons.map(val => val.id);
        const activeButton = buttons.indexOf(this.props.id);
        this.flatListRef.scrollToIndex({ animated: true, index: activeButton });
    }

    buttonsAppear() {
        if (this.props.crops.buttonActive) {
            return <Spinner />;
        }
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    getItemLayout={this.getItemLayout}
                    horizontal
                    data={this.props.crops.cropButtons}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ButtonList 
                            item={item} 
                            key={item.id} 
                            userflag={this.props.uservaluesfalg} 
                            old={this.props.olditem} 
                            onQuoteSwapUnderlying={this.onQuoteSwapUnderlying.bind(this)}
                            sTab={this.props.sTab}
                        />)
                    }
                />
            </View>);
    }

    onQuoteSwapUnderlying(year, code) {
        if (this.props.onQuoteSwapUnderlying !== undefined) {
            this.props.onQuoteSwapUnderlying(year, code);            
        }
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const {width} = Dimensions.get('window');
            return (

                <View style={styles.buttonStyle}>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                height: 18,
                                alignSelf: 'stretch',
                                fontFamily: 'HelveticaNeue',
                                fontSize: 16
                            }}>MY CROPS</Text>
                            <View style={{
                                height: 1,
                                marginLeft: 22,
                                marginTop: 9,
                                marginRight: 22,
                                width: width - 170,
                                backgroundColor: 'rgb(245,131,51)'
                            }}/>
                        </View>
                    </View>
                    {this.buttonsAppear()}
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const styles = {
    buttonStyle: {
        flexDirection: 'column',
        height: '16.4%',
        //width: 1024,
        backgroundColor: 'rgb(61,76,81)'
    },
};
const mapStateToProps = state => {
    return {
        crops: state.cropsButtons,
        id: state.cropsButtons.selectedId,
        acc: state.account
    };
};

export default connect(mapStateToProps, null)(MyCropButton);
