import React from 'react';
import styles from './actioncard.css.js';

export default class ActionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="ActionCard" style={Object.assign(styles.card, {
        background: this.props.selected
          ? 'lightgray'
          : 'white'
      })} onClick={() => this.props.selectedCallback(this.props.index)}>
        <img style={styles.image} src={this.props.icon}/>
        <div style={{
          overflow: 'hidden'
        }}>
          <p style={styles.textTop}>{this.props.name}</p>
          <p style={styles.textBottom}>{this.props.type}</p>
        </div>
      </div>
    );
  }
}
