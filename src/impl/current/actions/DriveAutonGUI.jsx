import React from 'react';
import DistanceInput from './../../../main/react/distanceinput.jsx'

export default class DriveActionGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handlePercent = this.handlePercent.bind(this);
  }

  render() {
    return (<div>
      <DistanceInput onChange={this.handlePercent} distance={this.state.distance} unit={this.state.unit}/>
    </div>);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data);
  }

  handlePercent(data) {
    var newState = Object.assign(this.state, data);
    this.props.updateCallback(newState);
    this.setState(newState);
  }

}
