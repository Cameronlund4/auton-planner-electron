import React from 'react';
import Field from './react/field.jsx'
import ActionCard from './react/actioncard.jsx'
import ActionList from './react/actionlist.jsx'
import styles from './app.css.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addAction = this.addAction.bind(this);
    this.createAction = this.createAction.bind(this);
    this.createActionAtEnd = this.createActionAtEnd.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.createActionBeforeSelected = this.createActionBeforeSelected.bind(this);

    let actions = [];
    let i = 0;
    for (; i < 10; i++) {
      actions.push(this.createAction(i));
    }

    this.state = {
      actions: actions,
      actionCount: i,
      selected: -1
    };
  }

  setSelected(selectedIndex) {
    let actions = this.state.actions
    if (this.state.selected != -1) {
      actions[this.state.selected].selected = false;
    }
    if (selectedIndex == this.state.selected) { // Toggle selection, set false
      actions[selectedIndex].selected = false;
      this.setState(Object.assign(this.state, {selected: -1}));
    } else { // New selection, set true
      actions[selectedIndex].selected = true;
      this.setState(Object.assign(this.state, {selected: selectedIndex}));
    }
  }

  createAction(i) {
    let src;
    let type;
    switch (i % 3) {
      case 0:
        src = "./assets/icon_drive.png";
        type = "Drive";
        break;
      case 1:
        src = "./assets/icon_position.png";
        type = "Position";
        break;
      case 2:
        src = "./assets/icon_turn.png";
        type = "Turn";
        break;
    }
    return {
      name: "Unnamed Action " + i,
      type: type,
      icon: src,
      selectedCallback: this.setSelected,
      selected: false
    }
  }

  // NOTE: Inserting at index other than 0 or null may not work as expected
  addAction(action, index) {
    let actions = this.state.actions;
    if (index) {
      if (index == 0) {
        actions.unshift(action);
      } else {
        actions.splice(index, 0, action);
      }
    } else {
      actions.push(action);
    }

    this.setState(Object.assign(this.state, {actions: actions}));
  }

  createActionAtEnd() {
    this.addAction(this.createAction(this.state.actionCount++));
    this.setSelected(this.state.actions.length - 1);
    // TODO Scroll to the selected
  }

  createActionBeforeSelected() {
    if (this.state.selected != -1) {
      this.state.actions[this.state.selected].selected = false; // Unselect old
      // Add new
      this.addAction(this.createAction(this.state.actionCount++), this.state.selected)
      let temp = this.state.selected;
      this.state.selected = -1;
      this.setSelected(temp);
    } else {
      this.addAction(this.createAction(this.state.actionCount++), 0);
      // Select the new item
      this.setSelected(0);
    }

  }

  render() {
    return (
      <div>
        <div style={styles.field}>
          <Field img="./assets/itz_field.jpg"/>
        </div>
        <div style={styles.panel}>
          <ActionList elements={this.state.actions}/>
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
            })} onClick={this.createActionAtEnd}>Add to end</button>
            <button type="button" style={Object.assign(styles.buttonStyle, {
              overflow: 'hidden',
              borderStyle: 'none'
            })} onClick={this.createActionBeforeSelected}>Add before</button>
          </div>
        </div>
      </div>
    );
  }
}
