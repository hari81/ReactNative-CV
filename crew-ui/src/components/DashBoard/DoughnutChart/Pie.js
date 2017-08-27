'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ART,
    LayoutAnimation,
    Dimensions,
} from 'react-native';
const {
    Surface,
    Group,
} = ART;

import * as shape from 'd3-shape';
import AnimShape from './AnimShape';
import Theme from './Colors';

class Pie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { highlightedIndex: '' };
        this.createPieChart = this.createPieChart.bind(this);
        this.value = this.value.bind(this);
        this.color = this.color.bind(this);
        this.onPieItemSelected = this.onPieItemSelected.bind(this);
    }

    // methods used to tranform data into piechart:
    value(item) { return item.number; }

    color(index) { return Theme.colors[index]; }


    createPieChart(index) {

        var arcs = shape.pie()
            .value(this.value)
            .startAngle(0)
            .sort(null)
            (this.props.data);

        var hightlightedArc = shape.arc()
            .outerRadius(100)
            .padAngle(.02)
            .innerRadius(50);

        var arc = shape.arc()
            .outerRadius(100)
            .padAngle(.02)
            .innerRadius(50)



        var arcData = arcs[index];
        var path = (this.state.highlightedIndex === index) ? hightlightedArc(arcData) : arc(arcData);

        return {
            path,
            color: this.color(index),
        };
    }

    onPieItemSelected(index) {
        this.setState({...this.state, highlightedIndex: index});
        this.props.onItemSelected(index);
    }

    render() {

        return (
            <View >
                <Surface width={250} height={250} >
                    <Group x={140} y={102}>
                        {
                            this.props.data.map((item, index) =>
                                (
                                    <AnimShape
                                        key={'pieshape' + index}
                                        color={this.color(index)}
                                        d={() => this.createPieChart(index)}
                                    />


                                )
                            )
                        }
                    </Group>
                </Surface >
            </View>
        );
    }
}
export default Pie;