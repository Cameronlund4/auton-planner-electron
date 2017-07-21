import React from 'react';
//import styles from './card.css.js';

export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: props.elements
    };
  }

  render() {
    var rows = [];
    for (var i = 0; i < this.state.elements.length; i++) {
      rows.push(<li>{this.state.elements[i]}</li>);
    }

    return (
      <div class="ActionList" style={{}}>
        <ul style={{padding: '0px', margin: '0px',overflowY: 'scroll', height:'500px', width: '250px'}}>
          {rows}
        </ul>
      </div>
    );
  }
}
