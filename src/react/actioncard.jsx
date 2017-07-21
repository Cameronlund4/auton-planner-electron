import React from 'react';
import styles from './card.css.js';

export default class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      type: props.type,
      icon: props.icon
    };
  }

  render() {
    return (
      <div class="ActionCard" style={styles.card}>
        <img style={styles.image} src={this.props.icon}/>
        <div style={{overflow: 'hidden'}}>
          <p style={styles.textTop}>{this.props.name}</p>
          <p style={styles.textBottom}>{this.props.type}</p>
        </div>
      </div>
    );
  }
}
