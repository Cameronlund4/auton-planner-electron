import React from 'react';

export default class DriveActionGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (<div>
      Distance: <br/>
      <input type="number"
        onChange={this.handleChange} value={this.state.distance}/>
    </div>);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data);
  }

  handleChange(event) {
    var newState = Object.assign(this.state, {distance: event.target.value});
    this.props.updateCallback(newState);
    this.setState(newState);
  }

}
