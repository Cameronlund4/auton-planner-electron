import React from 'react';

// TODO Implement
export default class TurnActionGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.handleChange = this.handleChange.bind(this);
  }

  highlightOnFocus(event) {
    event.target.select();
  }

  render() {
    return (<div>
      Degrees: <br/>
      <input type="number" onFocus={this.highlightOnFocus}
        onChange={this.handleChange} value={this.state.degrees}/>
    </div>);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data);
  }

  handleChange(event) {
    var newState = Object.assign(this.state, {degrees: event.target.value});
    this.props.updateCallback(newState);
    this.setState(newState);
  }

}
