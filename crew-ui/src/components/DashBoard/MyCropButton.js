import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firstButton, secondButton,
    thirdButton, fourthButton, fifthButton, sixthButton
} from '../../redux/actions/Dashboard/DashBoardButtonsAction';
import { myFarmCorn2017, myFarmCorn2016, myFarmCorn2018, myFarmSoy2016, myFarmSoy2017, myFarmSoy2018 } from '../../redux/actions/MyFarm/CropAction';
class MyCropButton extends Component {
    onButtonPress() {
        const cropAndYear = `${this.props.item.cropYear}${this.props.item.commodity.code}`;

        //console.log(cropAndYear)
        //LIVE DATA FETCH... No need of switch statement.. Only one fetch...
        //this.props.buttonDataFetch(`${this.props.item.cropYear}`, `${this.props.item.commodity.code}`)

        switch (cropAndYear) {

            case '2016S':
                this.props.secondButton();
                //this.props.myFarmSoy2016()
                break;
            case '2017C':
                this.props.thirdButton();
               // this.props.myFarmCorn2017();
                break;
            case '2017S':
                this.props.fourthButton();
               // this.props.myFarmSoy2017();
                break;
            case '2018C':
                this.props.fifthButton();
              //  this.props.myFarmCorn2018();
                break;
            case '2018S':
                this.props.sixthButton();
               // this.props.myFarmSoy2018();
                break;
            default:
                this.props.firstButton();

        }
    }
    render() {
        const { commodity, id, cropYear } = this.props.item;
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableHighlight onPress={this.onButtonPress.bind(this)}

                >
                    <View style={this.props.item.commodity.active ? styles.afterButtonStyle : styles.beforeButtonStyle}>
                        <Text style={this.props.item.commodity.active ? { color: 'white', fontSize: 16 } : { color: 'rgb(82,97,115)', fontSize: 16 }}>{cropYear}</Text>
                        <Text style={this.props.item.commodity.active ? { color: 'white', fontSize: 24 } : { color: 'rgb(82,97,115)', fontFamily: 'HelveticaNeue', fontSize: 24 }}>{commodity.name.toUpperCase()}</Text>
                        <Text style={this.props.item.commodity.active ? { color: 'white', fontSize: 14 } : { color: 'rgb(159,169,186)', fontSize: 14 }}>Crop</Text>

                    </View>
                </TouchableHighlight>

            </View>

        );
    }

}
const styles = {
    beforeButtonStyle: {
        width: 156,
        height: 78,
        borderRadius: 3,
        justifyContent: 'center',
        marginLeft: 4,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',

    },
    afterButtonStyle: {
        width: 156,
        height: 78,
        justifyContent: 'center',
        borderRadius: 3,
        marginLeft: 4,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: 'rgb(39,153,137)'
    }
}
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ secondButton,
        firstButton,
        thirdButton,
        fourthButton,
        fifthButton,
        sixthButton,
        myFarmCorn2017,
        myFarmCorn2016,
        myFarmCorn2018,
        myFarmSoy2017,
        myFarmSoy2016,
        myFarmSoy2018 }, dispatch);

};

export default connect(null, matchDispatchToProps)(MyCropButton);
