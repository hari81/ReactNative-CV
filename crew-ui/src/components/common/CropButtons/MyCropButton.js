import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import ButtonList from './ButtonList';
import { Spinner } from '../index';

class MyCropButton extends Component {

    buttonsAppear() {
        if (this.props.crops.buttonActive) {
            return <Spinner />;
        } else {
            return (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    horizontal
                    data={this.props.crops.cropButtons}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ButtonList item={item} key={item.id} userflag={this.props.uservaluesfalg} old={this.props.olditem} />}
                />
            </View>);
        }
    }

    render() {
        const { width } = Dimensions.get('window');
        return (

            <View style={styles.buttonStyle}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
                        <Text style={{ color: 'rgb(255,255,255)', height: 18, alignSelf: 'stretch', fontFamily: 'HelveticaNeue', fontSize: 16 }}>MY CROPS</Text>
                        <View style={{ height: 1, marginLeft: 22, marginTop: 9, marginRight: 22, width: width - 170, backgroundColor: 'rgb(245,131,51)' }} />
                    </View>
                </View>
                {this.buttonsAppear()}
            </View>
        );
    }
}
const styles = {
    buttonStyle: {
        flexDirection: 'column',
        height: 126,
        //width: 1024,
        backgroundColor: 'rgb(61,76,81)'
    },
};
const mapStateToProps = state => {
    return {
        crops: state.cropsButtons,
    };
};

export default connect(mapStateToProps, null)(MyCropButton);
