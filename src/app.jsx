import React from 'react';
import Field from './react/field.jsx'
import ActionCard from './react/actioncard.jsx'
import ActionList from './react/actionlist.jsx'
import styles from './app.css.js';
import AutonAction from './main/AutonAction.jsx'
import AutonActionWrapper from './main/AutonActionWrapper.jsx'
import DriveAutonAction from './main/actions/DriveAutonAction.jsx'

// Root component for the whole project. Root of all gui generation
// TODO (Project): Rename lists of actions/wrappers to be better recognized
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO Replace with dynamic system
    this.actionTypes = {
      drive: DriveAutonAction
    }

    // Bind the `this` keyword manually to any methods that need it (react):
    this.addAction = this.addAction.bind(this);
    this.createActionWrapper = this.createActionWrapper.bind(this);
    this.createActionAtEnd = this.createActionAtEnd.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.createActionBeforeSelected = this.createActionBeforeSelected.bind(this);

    // Create the empty/test list of actions
    let actions = [];
    let i = 0;
    for (; i < 1; i++) {
      actions.push(this.createActionWrapper(i));
    }

    // Save any states we need
    this.state = {
      actions: actions, // Save our actions to our state so we redraw on modify
      selected: -1 // Default selected to -1, aka no index selected
    };
  }

  // Set the selected action index
  setSelected(selectedIndex) {
    let actions = this.state.actions; // Grab the selected index
    if (this.state.selected != -1) { // If we have something selected...
      // It should no longer be selected as we're changing or toggling
      actions[this.state.selected].meta.selected = false;
    }
    // We already have this object selected, it should no longer should be
    if (selectedIndex == this.state.selected) {
      // Set selection to `none`
      this.setState(Object.assign(this.state, {selected: -1}));
    } else
    // We're selecting somethign new, set it to be selected
    {
      actions[selectedIndex].meta.selected = true;
      this.setState(Object.assign(this.state, {selected: selectedIndex}));
    }
  }

  // Create a new blank auton action wrapper and return it
  createActionWrapper() {
    let action = new AutonActionWrapper(this.setSelected);
    // TODO Somehow find the first dynamically assigned action
    action.setAutonAction(new DriveAutonAction());
    return action;
  }

  // Add an auton action at the given index in the list and redraw
  // NOTE: Inserting at index other than 0 or null may not work as expected
  addAction(action, index) {
    let actions = this.state.actions;
    // If we were provided an index to insert at
    if (index) { // BUG: This may be false if index is 0...
      if (index == 0) { // If the index is 0...
        actions.unshift(action);
      } else { // If the index isn't 0....
        actions.splice(index, 0, action);
      }
    } else { // No index given, add to the end
      actions.push(action);
    }

    // Reset the state with the new actions list
    this.setState(Object.assign(this.state, {actions: actions}));
  }

  // Create an auton action at the end of the list
  createActionAtEnd() {
    this.addAction(this.createActionWrapper());
    this.setSelected(this.state.actions.length - 1);
    // TODO Scroll to the selected action
  }

  // Create an auton action before the selected index
  // (AKA place new action at index and shift everything after up an index)
  // If nothing is selected will create action at the beginning of the list
  createActionBeforeSelected() {
    if (this.state.selected != -1) { // If we have a selected index
       // Unselect previously selected action
      this.state.actions[this.state.selected].meta.selected = false;
      // Add new action to the index that the selected was at
      this.addAction(this.createActionWrapper(), this.state.selected)
      // Trick setSelected to think it's getting a new index when just...
      // feeding it back the same index
      let temp = this.state.selected;
      this.state.selected = -1;
      this.setSelected(temp);
    } else { // If we don't have a selected index
      // Create an action at the beginning of the list
      this.addAction(this.createActionWrapper(), 0);
      // Select the new action
      this.setSelected(0);
    }
    // TODO Scroll to the selected action
  }

  // Render the HTML for the component
  render() {
    // Each AutonAction stores jsx to display. Grab it from the selected...
    // action if there is one so we can display it. Otherwise, inejct empty div
    let actionGUI = <div/>;
    if (this.state.selected != -1) {
      actionGUI = this.state.actions[this.state.selected].getGUI();
    }

    return (
      <div>
        <div style={styles.field}>
          <Field img="./assets/itz_field.jpg" elements={this.state.actions} selected={this.state.selected}/>
        </div>

        <div style={styles.panel}>

          <div style={styles.panel_upper}>
            {actionGUI}
          </div>

          <div style={styles.panel_lower_left}>
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

          <div style={styles.panel_lower_right}>
            <p>Lower right</p>
          </div>
        </div>
      </div>
    );
  }
}
