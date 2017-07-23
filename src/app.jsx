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
    console.log("Selected: " + selectedIndex);
    let actions = this.state.actions
    if (this.state.selected != -1) {
      actions[this.state.selected].selected = false;
    }
    actions[selectedIndex].selected = true;
    this.setState(Object.assign(this.state, {selected: selectedIndex}));
    console.log(actions[selectedIndex]);
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

  addAction(action, index) {
    let actions = this.state.actions;
    if (index) {
      actions.splice(index, 0, action);
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

  // TODO FIX: Isn't actually adding to the end, likely issue with addAction
  createActionBeforeSelected() {
    this.state.selected != -1
      ? this.addAction(this.createAction(this.state.actionCount++), this.state.selected)
      : this.addAction(this.createAction(this.state.actionCount++), 0)
    if (this.state.selected == -1) {
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
