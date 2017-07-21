import React from 'react';
import Field from './react/field.jsx'
import ActionList from './react/actionlist.jsx'
import ActionManager from './main/actionmanager.jsx'
import styles from './app.css.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.actionManager = new ActionManager();
  }

  render() {
    for (let i = 0; i < 1000; i++) {
      this.actionManager.createAction();
    }

    return (
      <div>
        <div style={styles.field}>
          <Field img="./assets/itz_field.jpg"/>
        </div>
        <div style={styles.panel}>
          {this.actionManager.actionList}
          <div style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'lightgray',
            height: '30px',
            width: '248px'
          }}>
            <button type="button" style={Object.assign(styles.buttonStyle, {
              cssFloat: 'left',
              borderWidth: '1px',
              borderRightStyle: 'solid',
              borderColor: 'lightgray'
            })}>Add to end</button>
            <button type="button" style={Object.assign(styles.buttonStyle, {
              overflow: 'hidden',
              borderStyle: 'none'
            })}>Add before</button>
          </div>
        </div>
      </div>
    );
  }
}
