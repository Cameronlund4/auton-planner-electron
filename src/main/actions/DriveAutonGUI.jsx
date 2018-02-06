import React from 'react';

export default class DriveActionGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    console.log("Rendering again")
    return (<div>
      Distance: <br/>
      <input type="number"
        onChange={this.handleChange} value={this.state.distance}/>
    </div>);
  }

  handleChange(event) {
    this.setState({distance: event.target.value});
    this.props.updateCallback(this.state);
  }

}
