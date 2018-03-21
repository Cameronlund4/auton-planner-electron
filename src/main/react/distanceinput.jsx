import React from 'react';

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
      units: ["mm","cm","in","feet","tiles","league"],
      // 12 feet in the unit in the same index in this.state.units
      fieldTotal: [3657.6, 365.76, 144, 12, 6, 0.000658]
    }
    // Save the precision to use for input
    this.precision = 0;
    // Bind necessary methods
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.determineStep = this.determineStep.bind(this);
  }

  determineStep() {
    var step = "";
    if ((this.props.distance + "").split(".")[1]) { // If we have decimals
      // Figure out how many decimals we need
      var locprec = (this.props.distance + "").split(".")[1].length;
      if (locprec > this.precision) { // If our decimal is more than previous
        this.precision = locprec; // Use this new decimal
      }
    } else { // If we do not have decimals
      if (this.precision == 0) { // If we do not have a state stored
        step = "any"; // Use default precision
      }
    }
    // If we got a precision to set up, set it up for the input tag
    if (step != "any") {
      step = "0.";
      for (var i = 0; i < this.precision-1; i++) {
        step += "0";
      }
      step += "1";
    }
    return step;
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

    // Figure out the step to be used
    var step = this.determineStep();
    
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
    let percent = (event.target.value/this.state.fieldTotal[this.state.unit]);
    this.props.onChange({distance: event.target.value, percent: percent, unit: this.state.unit});
  }

  // When a unit changes, convert the current distance to that unit to 3 decimals
  handleUnitChange(event) {
    let unit = event.target.value;
    let percent = (this.props.distance/this.state.fieldTotal[this.props.unit]);
    this.props.onChange({distance: Math.round(this.state.fieldTotal[unit]*percent*1000)/1000, percent: percent, unit: unit});
  }
}
