import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
class ButtonList extends Component {
    buttonPress(year, code, id, name) {
        this.props.ButtonPresss(year, code, id, name);
    }
    render() {
        const { id, cropYear, code, name } = this.props.item;
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.buttonPress.bind(this, cropYear, code, id, name)} disabled={id === this.props.id}>
                    <View style={[styles.ButtonStyle, id === this.props.id ? { backgroundColor: 'rgb(39,153,137)' } : { backgroundColor: 'rgb(255,255,255)' }]}>
                        <Text
                            style={id === this.props.id ? { color: 'white', fontSize: 16 } : {
                            color: 'rgb(82,97,115)',
                            fontSize: 16
                        }}>{cropYear}</Text>
                        <Text
                            style={id === this.props.id ? { color: 'white', fontSize: 24 } : {
                            color: 'rgb(82,97,115)',
                            fontFamily: 'HelveticaNeue',
                            fontSize: 24
                        }}>{name.toUpperCase()}</Text>
                        <Text style={id === this.props.id ? { color: 'white', fontSize: 14 } : {
                            color: 'rgb(159,169,186)',
                            fontSize: 14
                        }}>Crop</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}
const styles = {
    ButtonStyle: {
        width: 156,
        height: 78,
        borderRadius: 3,
        justifyContent: 'center',
        marginLeft: 4,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    }
}
const mapStateToProps = state => {
    return {
        id: state.cropsButtons.selectedId

    };
}
export default connect(mapStateToProps, null)(ButtonList);
