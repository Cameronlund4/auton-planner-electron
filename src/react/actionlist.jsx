import React from 'react';
//import styles from './card.css.js';

export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: props.elements,
      size: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateActions = this.updateActions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({size: window.innerHeight-30});
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateActions(list) {
    this.state = {
      elements: list,
      size: 0
    };
    this.updateWindowDimensions();
  }

  render() {
    var rows = [];
    for (var i = 0; i < this.state.elements.length; i++) {
      rows.push(
        <li>{this.state.elements[i]}</li>
      );
    }

    return (
      <div class="ActionList" style={{}}>
        <ul style={{
          padding: '0px',
          margin: '0px',
          overflowY: 'scroll',
          height: this.state.size,
          width: '250px'
        }}>
          {rows}
        </ul>
      </div>
    );
  }
}
