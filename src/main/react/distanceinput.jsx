import React from 'react';
import styles from './actioncard.css.js';

// Component that displays information about a certain AutonAction
export default class DistanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get distance passed or set to 0
      distance: props.distance,
      // Determine which of the units we are using
      unit: props.unit,
      // Use given units or use the defaults
      units: ["in","tiles","feet","mm","cm"], // props.units | ["in","tiles","feet","mm","cm"],
      // 12 feet in the unit in the same index in this.state.units
      fieldTotal: [144, 6, 12, 3657.6, 365.76] // props.fieldTotal | [144, 6, 12, 3657.6, 365.76]
    }
    this.precision = 0;
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

    var step = "";
    if ((this.props.distance + "").split(".")[1]) {
      var locprec = (this.props.distance + "").split(".")[1].length;
      if (locprec > this.precision) {
        this.precision = locprec;
      }
      step = "0.";
      for (var i = 0; i < this.precision-1; i++) {
        step += "0";
      }
      step += "1";
    } else {
      if (this.precision == 0) {
        step = "any";
      } else {
        step = "0.";
        for (var i = 0; i < this.precision-1; i++) {
          step += "0";
        }
        step += "1";
      }
    }

    return (<div>
      Distance: <br/>
      <input type="number" step={step}
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
    let percent = (event.target.value/this.state.fieldTotal[this.state.unit])*100;
    this.props.onChange({distance: event.target.value, percent: percent, unit: this.state.unit});
  }

  handleUnitChange(event) {
    let unit = event.target.value;
    let percent = (this.props.distance/this.state.fieldTotal[this.props.unit]);
    this.props.onChange({distance: Math.round(this.state.fieldTotal[unit]*percent*1000)/1000, percent: percent*100, unit: unit});
  }
}
