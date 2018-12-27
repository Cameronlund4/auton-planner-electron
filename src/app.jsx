import React from 'react';
import { Menu } from 'electron';
import Field from './main/react/field.jsx'
import ActionList from './main/react/actionlist.jsx'
import styles from './app.css.js';
import ActionProvider from './impl/current/ActionProvider.jsx'
import Robot from './main/Robot.jsx'

// Root component for the whole project. Root of all gui generation
// TODO {Project}: Prevent highlighting of clickable areas
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Store the list of available types of actions to create
    this.actionTypes = new ActionProvider().actionTypes;

    // Bind the `this` keyword manually to any methods that need it (react):
    this.addActionWrapper = this.addActionWrapper.bind(this);
    this.createActionWrapper = this.createActionWrapper.bind(this);
    this.createActionAtEnd = this.createActionAtEnd.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.createActionBeforeSelected = this.createActionBeforeSelected.bind(this);
    this.updateWindow = this.updateWindow.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.onActionTypeChange = this.onActionTypeChange.bind(this);
    this.onActionNameChange = this.onActionNameChange.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.highlightOnFocus = this.highlightOnFocus.bind(this);

    // Create the empty/test list of actions
    let actionWrappers = [];
    // let i = 0;
    // for (; i < 1; i++) {
    //   actionWrappers.push(this.createActionWrapper(i+1, Object.keys(this.actionTypes)[0]));
    // }

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
  createActionWrapper(index, type, instanceData) {
    // Create a blank wrapper
    //let actionWrapper = new AutonAction(this.setSelected, this.updateCanvas);
    // Fill the wrapper with the first user defined action
    //var ActionComponent = this.actionTypes[Object.keys(this.actionTypes)[0]];
    //actionWrapper.setAutonAction(<ActionComponent/>);
    var ActionWrapperTyped = this.actionTypes[type];
    let action = new ActionWrapperTyped(this.setSelected, this.updateCanvas, instanceData);
    action.meta.name = "Unnamed Action "+index;
    return action;
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
    this.addActionWrapper(this.createActionWrapper(this.state.actionWrappers.length+1, Object.keys(this.actionTypes)[0]));
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
      this.addActionWrapper(this.createActionWrapper(this.state.actionWrappers.length+1, Object.keys(this.actionTypes)[0]), this.state.selected)
      // Trick setSelected to think it's getting a new index when just...
      // feeding it back the same index
      let temp = this.state.selected;
      this.state.selected = -1;
      this.setSelected(temp);
    } else { // If we don't have a selected index
      // Create an action at the beginning of the list
      this.addActionWrapper(this.createActionWrapper(this.state.actionWrappers.length+1, Object.keys(this.actionTypes)[0]), 0);
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

  onActionTypeChange(event) {
    // Grab our current action wrappers
    let actionWrappers = this.state.actionWrappers;
    // Create a new action with the new type
    let index = this.state.actionWrappers.length+1;
    let type = Object.keys(this.actionTypes)[event.target.value];
    let newAction = this.createActionWrapper(index, type);
    // Swap the old meta into the new action
    newAction.updateMeta(this.state.actionWrappers[this.state.selected].meta);
    // Replace the old action
    actionWrappers[this.state.selected] = newAction;
    // Update actions back into state
    this.setState(Object.assign(this.state, {actionWrappers: actionWrappers}));
  }

  onActionNameChange(event) {
    let wrapper = this.state.actionWrappers[this.state.selected];
    let actionWrappers = this.state.actionWrappers;
    wrapper.meta.name = event.target.value;
    actionWrappers[this.state.selected] = wrapper;
    // Update actions back into state
    this.setState(Object.assign(this.state, {actionWrappers: actionWrappers}));
  }

  // NOTE possible BUG: THis may be getting called way more than it should be
  // (It seems to be getting called 15 times a render)
  generateCode() {
    var code = "";
    // TODO Set the robot's starting positions
    // Create the robot to be drawn and moved
    let robot = new Robot(this.state.size, 0.75, .8, 0);
    // Draw every action, making sure to draw selected state
    for (let i = 0; i < this.state.actionWrappers.length; i++) {
      code += this.state.actionWrappers[i].renderCode(robot) + "\n";
    }
    return code;
  }

  generateSaveObj() {
    let wrappers = this.state.actionWrappers;
    let data = {};
    for (let i = 0; i < wrappers.length; i++) {
      data[i] = wrappers[i].renderSaveData();
    }
    // console.log("Save data:");
    // console.log(data);
    // console.log(JSON.stringify(data, null, "    "));
    return data;
  }

  loadSaveData(data) {
    for (let i = 0; i < Object.keys(data).length; i++ ) {
      // Grab the specific actions data
      let datum = data[Object.keys(data)[i]];
      // Create a new action using the data as instance data
      let action = this.createActionWrapper(i, datum.typeData.display, datum.typeData);
      // Update the new actions meta
      action.updateMeta(datum.meta);
      // Add the action wrapper into the system
      this.addActionWrapper(action, i);
      // If this was selected when saved, reselect it now
      if (datum.meta.selected) {
        this.setSelected(i);
      }
    }
  }

  highlightOnFocus(event) {
    event.target.select();
  }

  // Render the HTML for the component
  render() {
    this.generateSaveObj();
    // if (this.state.actionWrappers.length == 0) {
    //   this.loadSaveData(JSON.parse('{ \"0\": { \"typeData\": { \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"45\" } }, \"meta\": { \"name\": \"Unnamed Action 1\", \"selected\": false, \"index\": 0, \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"45\" } } }, \"1\": { \"typeData\": { \"display\": \"Drive\", \"type\": \"DriveAutonAction\", \"icon\": \".\/main\/assets\/icon_drive.png\", \"data\": { \"percent\": 0.16666666666666666, \"distance\": \"1\", \"unit\": \"4\" } }, \"meta\": { \"name\": \"Unnamed Action 2\", \"selected\": false, \"index\": 1, \"display\": \"Drive\", \"type\": \"DriveAutonAction\", \"icon\": \".\/main\/assets\/icon_drive.png\", \"data\": { \"percent\": 0.16666666666666666, \"distance\": \"1\", \"unit\": \"4\" } } }, \"2\": { \"typeData\": { \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"-90\" } }, \"meta\": { \"name\": \"Unnamed Action 3\", \"selected\": false, \"index\": 2, \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"-90\" } } }, \"3\": { \"typeData\": { \"display\": \"Drive\", \"type\": \"DriveAutonAction\", \"icon\": \".\/main\/assets\/icon_drive.png\", \"data\": { \"percent\": 0.38276465441819774, \"distance\": \"140\", \"unit\": \"1\" } }, \"meta\": { \"name\": \"Unnamed Action 4\", \"selected\": false, \"index\": 3, \"display\": \"Drive\", \"type\": \"DriveAutonAction\", \"icon\": \".\/main\/assets\/icon_drive.png\", \"data\": { \"percent\": 0.38276465441819774, \"distance\": \"140\", \"unit\": \"1\" } } }, \"4\": { \"typeData\": { \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"-90\" } }, \"meta\": { \"name\": \"Unnamed Action 5\", \"selected\": true, \"index\": 4, \"display\": \"Turn\", \"type\": \"TurnAutonAction\", \"icon\": \".\/main\/assets\/icon_turn.png\", \"data\": { \"degrees\": \"-90\" } } } }'));
    // }

    // Each AutonAction stores jsx to display. Grab it from the selected
    // action if there is one so we can display it. Otherwise, inejct empty
    let actionGUI = (<div>No action selected :'(</div>);
    if (this.state.selected != -1) {
      var wrapper = this.state.actionWrappers[this.state.selected];
      var ActionGUI = wrapper.typeData.actionGUI;
      actionGUI = <ActionGUI data={wrapper.typeData.data} updateCallback={wrapper.updateCallback}/>
    }

    // TODO Remove; for testing
    this.generateSaveObj();

    let actionSelect = (<div></div>);
    if (this.state.selected != -1) {
      let rows = [];
      for (let i = 0; i < Object.keys(this.actionTypes).length; i++) {
        // Generate and push the input unit items to the input
        rows.push(
          <option value={i} key={i}>
            {Object.keys(this.actionTypes)[i]}
          </option>
        );
      }

      actionSelect = (<div style={styles.action_area_top}>
        <textarea
            onFocus={this.highlightOnFocus}
            style={{
              resize: "none",
              margin: '0px',
              padding: '0px',
              resize: "none",
              width: "100%",
              borderStyle: "none",
              outlineWidth: '0px',
              fontWeight: 'bold',
              fontSize: '1.2em',
              rows: '1',
              height: '20px'}}
            value={this.state.actionWrappers[this.state.selected].meta.name}
            onChange={this.onActionNameChange}/>
        Action type: <select
            style={{
              borderStyle: "none",
              outlineWidth: "0px"}}
            value={Object.keys(this.actionTypes).indexOf(this.state.actionWrappers[this.state.selected].typeData.display)}
            onChange={this.onActionTypeChange}>
          {rows}
        </select>
      </div>);
    }

    let code = this.generateCode();

    return (
      <div style={{height: "100%", minHeight: "100%"}}>
        <div style={styles.field}>
          <Field
            img="./impl/current/assets/game_field.jpg"
            actionWrappers={this.state.actionWrappers}
            selected={this.state.selected}
            ref="field"
          />
        </div>

        <div style={styles.panel}>
          <div style={styles.panel_upper} id={this.state.selected}>
            <textarea
                onFocus={this.highlightOnFocus}
                style={{
                  resize: "none",
                  height: "100%",
                  width: "100%",
                  borderStyle: "none",
                  outlineWidth: '0px'}}
                  value={this.generateCode()}/>
          </div>

          <div style={styles.panel_lower}>
            <div style={styles.panel_lower_left}>
              <ActionList actionWrappers={this.state.actionWrappers} style={{flexGrow: '1'}}/>
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "lightgray",
                  height: "30px",
                  width: "248px"
                }}
              >
                <button
                  type="button"
                  style={Object.assign(Object.assign({}, styles.buttonStyle), {
                    cssFloat: "left",
                    borderWidth: "1px",
                    borderRightStyle: "solid",
                    borderColor: "lightgray"
                  })}
                  onClick={this.createActionAtEnd}
                >
                  Add to end
                </button>
                <button
                  type="button"
                  style={Object.assign(Object.assign({}, styles.buttonStyle), {
                    overflow: "hidden",
                    borderStyle: "none"
                  })}
                  onClick={this.createActionBeforeSelected}
                >
                  Add before
                </button>
              </div>
              <div style={{height: '200px'}}>

              </div>
            </div>

            <div style={styles.panel_lower_right}>
              {actionSelect}
              <div style={styles.action_area_bottom}>{actionGUI}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
