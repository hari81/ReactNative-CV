import React from 'react';
import { View, ART } from 'react-native';
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
        const arcs = shape.pie()
            .value(this.value)
            .startAngle(0)
            .sort(null)(this.props.data);

        const hightlightedArc = shape.arc()
            .outerRadius(100)
            .padAngle(0.02)
            .innerRadius(50);

        const arc = shape.arc()
            .outerRadius(100)
            .padAngle(0.02)
            .innerRadius(50);
        const arcData = arcs[index];
        const path = (this.state.highlightedIndex === index) ? hightlightedArc(arcData) : arc(arcData);
        return {
            path,
            color: this.color(index),
        };
    }
    onPieItemSelected(index) {
        this.setState({ ...this.state, highlightedIndex: index });
        this.props.onItemSelected(index);
    }

    render() {
        return (
            <View >
                <Surface width={250} height={250} >
                    <Group x={130} y={102}>{
                            this.props.data.map((item, index) => (
                                    <AnimShape key={'pieshape' + index} color={this.color(index)} d={() => this.createPieChart(index)}/>
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
