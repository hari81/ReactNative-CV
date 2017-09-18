import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ButtonList from './ButtonList';

class MyCropButton extends Component {

    render() {
        return (

            <View style={styles.fourthRowStyle}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
                        <Text style={{ color: 'rgb(255,255,255)', height: 18, alignSelf: 'stretch', fontFamily: 'HelveticaNeue', fontSize: 16 }}>MY CROPS</Text>
                        <View style={{ height: 1, marginLeft: 22, marginTop: 9, width: 868, backgroundColor: 'rgb(245,131,51)' }} />
                    </View>
                </View>
                <FlatList
                    horizontal
                    data={this.props.Crops}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ButtonList item={item} key={item.id}/>}
                />
            </View>

        );
    }
}
const styles = {
    fourthRowStyle: {
        flexDirection: 'column',
        height: 126,
        width: 1024,
        backgroundColor: 'rgb(61,76,81)'
    },
};
const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons,
    };
};

export default connect(mapStateToProps, null)(MyCropButton);
