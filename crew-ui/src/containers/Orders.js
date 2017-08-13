/*jshint esversion: 6 */
import React, { Component } from "react";
import {
  FlatList,
  View,
  SegmentedControlIOS,
  Text,
  TouchableOpacity,
  Picker
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dimensions from "Dimensions";
import ViewOrders from "../components/Orders/ViewOrders";
import OpenPositions from "../components/Orders/OpenPositions";
import ClosedPositions from "../components/Orders/ClosedPositions";
import { LogoPhoneHeader, Spinner } from "../components/common";
import {
  ViewOrdersData,
  dropDownCrop,
  selectedCrop
} from "../redux/actions/OrdersAction/ViewOrderAction";
import { OpenPositionsData } from "../redux/actions/OrdersAction/OpenPositions";
import { ClosedPositionsData } from "../redux/actions/OrdersAction/ClosedPositions";
import st from "../Utils/SafeTraverse";

//const openpositions = require('../restAPI/openpositions.json');
//const closedpositions = require('../restAPI/closedpositions.json');

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.selectedTab || "Orders",
      Crop: props.Crop || 'C'
    };

  }
  componentDidMount() {
    const crop = this.state.Crop;
    console.log(crop)
     /* switch (this.state.selectedTab) {
          case "Orders":
              this.props.ViewOrdersData(crop)
              break;
          case "Open Positions":
              this.props.OpenPositionsData(crop);
              break;
          case "Closed Positions":
              this.props.ClosedPositionsData(crop);
              break;
          default:
              console.log("Something wrong");*/
      this.props.dropDownCrop();
    this.props.ViewOrdersData(this.state.Crop);
    this.props.OpenPositionsData(this.state.Crop);
    this.props.ClosedPositionsData(this.state.Crop);

  }


    refreshData = () => {

        const crop = this.state.Crop;
        switch (this.state.selectedTab) {
            case "Orders":
                this.props.ViewOrdersData(crop)
                break;
            case "Open Positions":
                this.props.OpenPositionsData(crop);
                break;
            case "Closed Positions":
                this.props.ClosedPositionsData(crop);
                break;
            default:
                console.log("Something wrong");
        };

        /*this.props.ViewOrdersData(this.state.Crop);
        this.props.OpenPositionsData(this.state.Crop);
        this.props.ClosedPositionsData(this.state.Crop);*/
    }
  dropDown (cropCode) {
    console.log(cropCode);

    this.setState({Crop: cropCode});
      this.props.ViewOrdersData(cropCode);
      this.props.OpenPositionsData(cropCode);
      this.props.ClosedPositionsData(cropCode);

    /*switch (this.state.selectedTab) {
        case "Orders":
        this.props.ViewOrdersData(crop);

        break;
        case "Open Positions":
            this.props.OpenPositionsData(crop);
            break;
        case "Closed Positions":
            this.props.ClosedPositionsData(crop);
            break;
        default:
          console.log("Something wrong");
    }*/
  }
  renderFlatList() {
    if (this.props.viewOrders.fetchflag) {
      return (
        <View
          style={{  justifyContent: "center", flexDirection: "column" }}
        >
          <Text
            style={{
              marginTop: 30,
              color: "white",
              textAlign: "center",
              fontSize: 25,
                marginBottom: 30
            }}
          >
            Loading orders...
          </Text>
          <Spinner size="large" />
        </View>
      );
    }

    if (this.state.selectedTab === "Orders") {
      //console.log("Orders Button Pressed");

      if (!st(this.props, ["viewOrders", "items", "value", "length"])) {

        return (
          <View
            style={{

              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                marginTop: 30,
                color: "white",
                textAlign: "center",
                fontSize: 25
              }}
            >
              Sorry... No Orders Available!.
            </Text>
          </View>
        );
      } else {
        return (
          <FlatList
            data={this.props.viewOrders.items.value}
            keyExtractor={item => item.orderId}
            renderItem={({ item }) =>
              <ViewOrders key={item.orderId} item={item} />}
          />
        );
      }
    }
    if (this.state.selectedTab === "Open Positions") {
        //console.log("Open Positions Pressed");
        if (!st(this.props, ["openPositions", "length"])) {

            return (
                <View
                    style={{

                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Text
                        style={{
                            marginTop: 30,
                            color: "white",
                            textAlign: "center",
                            fontSize: 25
                        }}
                    >
                        Sorry... No Open Positions Available!.
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.openPositions}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <OpenPositions key={item.id} item={item}/>}
                />
            );
        }
    }
    if (this.state.selectedTab === "Closed Positions") {
      // console.log("Closed Positions Pressed");

      if (this.props.closedPositions.length === 0) {
        return (
          <Text
            style={{
              marginTop: 50,
              color: "white",
              textAlign: "center",
              fontSize: 25
            }}
          >
            No Closed Positions{" "}
          </Text>
        );
      } else {
        return (
          <FlatList
            data={this.props.closedPositions}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <ClosedPositions key={item.id} item={item} />}
          />
        );
      }
    }
  }
  pickerValues()
  {
      return this.props.viewOrders.dropDownData.map((item) => (
          <Picker.Item label={item.name} value={item.code}  key={item.code} />));
      //return PickerItems;
  }
  render() {
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.containerStyle}>
        <View
          style={{
            backgroundColor: "black",
            width ,
            height: 20
          }}
        />
        <LogoPhoneHeader   refresh={this.refreshData}/>

        <View style={{ height: 90, backgroundColor: "gray" }}>
          <View
              style={{
                  height: 70,
                  borderTopColor: "#e7b514",
                  borderTopWidth: 3,
                  backgroundColor: "white",
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: "flex-start",
                  flexDirection: "row"
              }}
          >

          <View style={styles.positions}>
            <Text style={{ fontSize: 18, color: "#01aca8" }}>
              Positions & Orders
            </Text>
          </View>

          <View style={{ justifyContent: "center", marginLeft: 40 }}>
            <SegmentedControlIOS
              alignItems="center"
              tintColor="#01aca8"
              style={styles.segment}
              values={["Orders", "Open Positions", "Closed Positions"]}
              selectedIndex={
                {
                  "Orders": 0,
                  "Open Positions": 1,
                  "Closed Positions": 2
                }[this.state.selectedTab]
              }
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                });
              }}
              onValueChange={val => this.setState({ selectedTab: val })}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 60,
              paddingTop: 18,
              justifyContent: "flex-start",
              width: 150,
              height: 60,
              borderRadius: 10
            }}
          >
            <Picker
                style = {[{width: 150, height: 55},
                    this.state.Crop === 'C' ? {backgroundColor: '#fff8dc'} : this.state.Crop === 'S' ? {backgroundColor: '#665847'} : {backgroundColor: '#f5deb3'}]}
               mode = "dropdown"
                itemStyle={{height: 48}}
              selectedValue={this.state.Crop}
              onValueChange={this.dropDown.bind(this)}
            >

                {this.pickerValues()}

            </Picker>
          </View>

          </View>
          </View>
        <View style={{ backgroundColor: "white", height: 650 }}>
          <View style={{ backgroundColor: "#3d4c57", height:650, marginLeft: 5, marginRight: 5, marginTop: 10}}>
            {this.renderFlatList()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#3d4c57"
  },

  segment: {
    marginLeft: 50,
    width: 500,

  },
  positions: {
    left: 30,
    justifyContent: "center"
  },
  buttonview: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "20%"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center"
  },
  viewbutton: {
    height: 35,
    width: 150,
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#5db7e8",
    justifyContent: "center",
    alignItems: "center"
  },
  touchopa: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#279989",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    backgroundColor: "white"
  }
};
const mapStateToProps = state => {
  //  console.log(state)
  return {
    viewOrders: state.vieworder,
    openPositions: state.openPositions,
    closedPositions: state.closedPositions
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ViewOrdersData,
      ClosedPositionsData,
      OpenPositionsData,
      dropDownCrop,
      selectedCrop
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
//export default Orders;
