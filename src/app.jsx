import React from 'react';
import Field from './react/field.jsx'
import ActionCard from './react/actioncard.jsx'
import ActionList from './react/actionlist.jsx'
import styles from './app.css.js';
import AutonAction from './main/AutonAction.jsx'
import DriveAutonAction from './main/actions/DriveAutonAction.jsx'

// Root component for the whole project. Root of all gui generation
// TODO {Project}: Prevent highlighting of clickable areas
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Store the list of available types of actions to create
    this.actionTypes = {
      drive: DriveAutonAction
    }

    // Bind the `this` keyword manually to any methods that need it (react):
    this.addActionWrapper = this.addActionWrapper.bind(this);
    this.createActionWrapper = this.createActionWrapper.bind(this);
    this.createActionAtEnd = this.createActionAtEnd.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.createActionBeforeSelected = this.createActionBeforeSelected.bind(this);
    this.updateWindow = this.updateWindow.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);

    // Create the empty/test list of actions
    let actionWrappers = [];
    let i = 0;
    for (; i < 1; i++) {
      actionWrappers.push(this.createActionWrapper(i));
    }

    // Save any states we need
    this.state = {
      actionWrappers: actionWrappers, // Save our actions to our state so we redraw on modify
      selected: -1 // Default selected to -1, aka no index selected
    };
  }

  /*****************************************************************************
  * Actions
  *****************************************************************************/

  // Set the selected action index
  setSelected(selectedIndex) {
    let actionWrappers = this.state.actionWrappers; // Grab the selected index
    if (this.state.selected != -1) { // If we have something selected...
      // It should no longer be selected as we're changing or toggling
      actionWrappers[this.state.selected].meta.selected = false;
    }
    // We already have this object selected, it should no longer should be
    if (selectedIndex == this.state.selected) {
      // Set selection to `none`
      this.setState(Object.assign(this.state, {selected: -1}));
    } else
    // We're selecting somethign new, set it to be selected
    {
      actionWrappers[selectedIndex].meta.selected = true;
      this.setState(Object.assign(this.state, {selected: selectedIndex}));
    }
  }

  // Redraw the canvas when needed
  updateCanvas() {
    if (!this.refs.field) {
      return;
    }
    let field = this.refs.field;
    field.updateCanvas();
    this.forceUpdate();
  }

  // Create a new blank auton action wrapper and return it
  createActionWrapper() {
    // Create a blank wrapper
    //let actionWrapper = new AutonAction(this.setSelected, this.updateCanvas);
    // Fill the wrapper with the first user defined action
    //var ActionComponent = this.actionTypes[Object.keys(this.actionTypes)[0]];
    //actionWrapper.setAutonAction(<ActionComponent/>);
    return new this.actionTypes[Object.keys(this.actionTypes)[0]](this.setSelected, this.updateCanvas);
  }

  // Add an auton action at the given index in the list and redraw
  // TODO Confirm or deny the following
  // BUG: Inserting at index other than 0 or null may not work as expected
  addActionWrapper(actionWrapper, index) {
    let actionWrappers = this.state.actionWrappers;
    // If we were provided an index to insert at
    if (index) { // BUG: This may be false if index is 0...
      if (index == 0) { // If the index is 0...
        actionWrappers.unshift(actionWrapper);
      } else { // If the index isn't 0....
        actionWrappers.splice(index, 0, actionWrapper);
      }
    } else { // No index given, add to the end
      actionWrappers.push(actionWrapper);
    }

    // Reset the state with the new actions list
    this.setState(Object.assign(this.state, {actionWrappers: actionWrappers}));
  }

  // Create an auton action at the end of the list
  createActionAtEnd() {
    this.addActionWrapper(this.createActionWrapper());
    this.setSelected(this.state.actionWrappers.length - 1);
    // TODO Scroll to the selected action
  }

  // Create an auton action before the selected index
  // (AKA place new action at index and shift everything after up an index)
  // If nothing is selected will create action at the beginning of the list
  createActionBeforeSelected() {
    if (this.state.selected != -1) { // If we have a selected index
      // Unselect previously selected action
      this.state.actionWrappers[this.state.selected].meta.selected = false;
      // Add new action to the index that the selected was at
      this.addActionWrapper(this.createActionWrapper(), this.state.selected)
      // Trick setSelected to think it's getting a new index when just...
      // feeding it back the same index
      let temp = this.state.selected;
      this.state.selected = -1;
      this.setSelected(temp);
    } else { // If we don't have a selected index
      // Create an action at the beginning of the list
      this.addActionWrapper(this.createActionWrapper(), 0);
      // Select the new action
      this.setSelected(0);
    }
    // TODO Scroll to the selected action
  }

  /*****************************************************************************
  * GUI
  *****************************************************************************/

  updateWindow() {
    // 300px taken up by the bottom buttons and top panel
    // Set the window size to the available window height
    this.setState(Object.assign(this.state, {
      size: window.innerHeight - 310
    }));
  }

  // When the component has been added to the active UI
  componentDidMount() {
    this.updateWindow();
    // Add a listener to update whenever we resize
    window.addEventListener('resize', this.updateWindow);
  }

  // When the component will ve removed from the active UI
  componentWillUnmount() {
    // Remove the update listener
    window.removeEventListener('resize', this.updateWindow);
  }

  // Render the HTML for the component
  render() {
    // Each AutonAction stores jsx to display. Grab it from the selected...
    // action if there is one so we can display it. Otherwise, inejct empty div
    let actionGUI = <div/>;
    if (this.state.selected != -1) {
      var wrapper = this.state.actionWrappers[this.state.selected];
      var ActionGUI = wrapper.typeData.actionGUI;
      actionGUI = <ActionGUI data={wrapper.typeData.data} updateCallback={wrapper.updateCallback}/>
    }

    return (
      <div>
        <div style={styles.field}>
          <Field img="./assets/itz_field.jpg" actionWrappers={this.state.actionWrappers} selected={this.state.selected} ref="field"/>
        </div>

        <div style={styles.panel}>

          <div style={Object.assign(styles.panel_upper, {
            height: (this.state.size + "px")
          })} id={this.state.selected}>
            {actionGUI}
          </div>

          <div style={styles.panel_lower_left}>
            <ActionList actionWrappers={this.state.actionWrappers}/>
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
