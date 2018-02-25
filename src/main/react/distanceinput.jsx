import React from 'react';
import styles from './actioncard.css.js';

// Component that displays information about a certain AutonAction
export default class DistanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get distance passed or set to 0
      distance: props.distance, //| 0,
      // Determine which of the units we are using
      unit: props.unit, //| 0,
      // Use given units or use the defaults
      units: ["in","tiles","feet","mm","cm"], // props.units | ["in","tiles","feet","mm","cm"],
      // 12 feet in the unit in the same index in this.state.units
      fieldTotal: [144, 6, 12, 3657.6, 365.76] // props.fieldTotal | [144, 6, 12, 3657.6, 365.76]
    }
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  // Render the HTML for the component
  render() {
    let rows = [];
    for (let i = 0; i < this.state.units.length; i++) {
      // Generate and push the input unit items to the input
      rows.push(
        <option value={i} key={i}>
          {this.state.units[i]}
        </option>
      );
    }
    console.log("Setting dist "+this.props.distance);

    return (<div>
      Distance: <br/>
      <input type="number" step="any"
        onChange={this.handleDistanceChange} value={this.props.distance}/>
      <select value={this.state.unit} onChange={this.handleUnitChange}>
        {rows}
      </select>
    </div>);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign(this.state, nextProps));
  }

  handleDistanceChange(event) {
    //if (this.state.distance == event.target.value || isNaN(event.target.value)) // Allow decimals to be typed
    //  return;
    console.log("Value: "+event.target.value);
    let percent = (event.target.value/this.state.fieldTotal[this.state.unit])*100;
    console.log("Percent: "+percent);
    console.log("State: "+this.state.distance);
    //let newState = Object.assign(this.state, {distance: event.target.value});
    //console.log("New State: "+newState.distance);
    this.props.onChange({distance: event.target.value, percent: percent, unit: this.state.unit});
    //this.setState(newState);
  }

  handleUnitChange(event) {
    let unit = event.target.value;
    let percent = (this.props.distance/this.state.fieldTotal[this.props.unit]);
    //let newState = Object.assign(this.state, {unit: unit});
    this.props.onChange({distance: Math.round(this.state.fieldTotal[unit]*percent*1000)/1000, percent: percent*100, unit: unit});
    //this.setState(newState);
  }
}
