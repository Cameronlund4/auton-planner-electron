import React from 'react';
import styles from './actioncard.css.js';

// Component that displays information about a certain AutonAction
export default class ActionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  // Render the HTML for the component
  render() {
    return (
      <div className="ActionCard" style={Object.assign(styles.card, {
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
