import React from 'react';
import DistanceInput from './../react/distanceinput.jsx'

// TODO Implement
export default class InitActionGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleRotation = this.handleRotation.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleY = this.handleY.bind(this);
  }

  highlightOnFocus(event) {
    event.target.select();
  }

  render() {
    return (<div>
      Rotation: <br/>
      <input type="number" onFocus={this.highlightOnFocus}
        onChange={this.handleRotation} value={this.state.degrees}/>
      <br/>
      X pos: <br/>
      <DistanceInput onChange={this.handleX} distance={this.state.pX.distance} unit={this.state.pX.unit}/>
      Y pos: <br/>
      <DistanceInput onChange={this.handleY} distance={this.state.pY.distance} unit={this.state.pY.unit}/>
    </div>);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data);
  }

  handleRotation(event) {
    var newState = Object.assign(this.state, {degrees: event.target.value});
    this.props.updateCallback(newState);
    this.setState(newState);
  }

  handleX(event) {
    var newState = Object.assign(this.state, Object.assign(this.state.pX, event));
    this.props.updateCallback(newState);
    this.setState(newState);
  }

  handleY(event) {
    var newState = Object.assign(this.state, Object.assign(this.state.pY, event));
    this.props.updateCallback(newState);
    this.setState(newState);
  }
}
