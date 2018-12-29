import React from 'react';
import { Menu } from 'electron';
import Field from './main/react/field.jsx'
import ActionList from './main/react/actionlist.jsx'
import styles from './app.css.js';
import ActionProvider from './impl/current/ActionProvider.jsx'
import Robot from './main/Robot.jsx'
import InitAutonAction from './main/actions/InitAutonAction.jsx'
const electron = require('electron')
const fs = require("fs");
const {dialog} = require('electron').remote;

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
    this.save = this.save.bind(this);
    this.saveAs = this.saveAs.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);

    // Create the empty/test list of actions
    let actionWrappers = [];
    // Add an initialize auton action to the beginning
    var initAction = this.createActionWrapper(0, "Initialize");
    initAction.meta.name = "Setup Robot";
    actionWrappers.push(initAction);

    // Save any states we need
    this.state = {
      actionWrappers: actionWrappers, // Save our actions to our state so we redraw on modify
      selected: -1 // Default selected to -1, aka no index selected
    };

    // Events from the menu
    electron.ipcRenderer.on('save', (event) => {
      this.save()
    });
    electron.ipcRenderer.on('saveAs', (event) => {
      this.saveAs()
    });
    electron.ipcRenderer.on('open', (event) => {
      this.open()
    });
    electron.ipcRenderer.on('clear', (event) => {
      this.clear(true)
    });
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
    if (selectedIndex != (-1)) {
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
    var ActionWrapperTyped;
    if (type === "Initialize") {
      ActionWrapperTyped = InitAutonAction;
    } else {
      ActionWrapperTyped = this.actionTypes[type];
    }
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
    if (index >= 0) {
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
      var addIndex = this.state.selected;
      // We don't want to add before initialize action. If we're trying to, add
      //  after the initialize spot
      addIndex = addIndex == 0 ? 1 : addIndex;
      this.addActionWrapper(this.createActionWrapper(this.state.actionWrappers.length+1, Object.keys(this.actionTypes)[0]), addIndex);
      // Trick setSelected to think it's getting a new index when just...
      // feeding it back the same index (unless index was 0)
      this.state.selected = -1;
      this.setSelected(addIndex);
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

  clear(addInit) {
    this.setSelected(-1);
    let actionWrappers = [];
    if (addInit) {
      // Add an initialize auton action to the beginning
      var initAction = this.createActionWrapper(0, "Initialize");
      initAction.meta.name = "Setup Robot";
      actionWrappers.push(initAction);
    }
    this.setState(Object.assign(this.state, {selected: -1, actionWrappers: actionWrappers}));
  }

  open() {
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if(fileNames === undefined){
          console.log("No file selected");
          return;
      }

      let filepath = fileNames[0];
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        this.clear();
        this.saveLocation = filepath;
        this.loadSaveData(JSON.parse(data));
      });
    });
  }

  saveAs() {
    dialog.showSaveDialog({defaultPath:"unnamed.cheap"},(fileName) => {
      if (fileName === undefined){
          console.log("You didn't save the file");
          return;
      }

      this.saveLocation = fileName;
      this.save();
    });
  }

  save() {
    if (this.saveLocation === undefined) {
      this.saveAs();
      return;
    }
    fs.writeFile(this.saveLocation, JSON.stringify(this.generateSaveObj()), (err) => {
      if(err) {
          alert("An error ocurred saving the auton "+ err.message)
      }
    });
  }

  highlightOnFocus(event) {
    event.target.select();
  }

  // Render the HTML for the component
  render() {
    this.generateSaveObj(); // TODO Cache somewhere

    let actionSettings = (<div></div>);
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

      // Selected action information. Rendered only if theres a selected action
      // and if the action selected should be able to change it's type
      if (!(this.state.actionWrappers[this.state.selected].typeData.display === "Initialize")) {
        actionSelect = (<div>
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

      actionSettings = (<div style={styles.action_area_top}>
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
          {actionSelect}
      </div>);
    }

    // Each AutonAction stores jsx to display. Grab it from the selected
    // action if there is one so we can display it. Otherwise, inejct empty
    let actionGUI = (<div>No action selected :'(</div>);
    if (this.state.selected != -1) {
      var wrapper = this.state.actionWrappers[this.state.selected];
      var ActionGUI = wrapper.typeData.actionGUI;
      actionGUI = <ActionGUI data={wrapper.typeData.data} updateCallback={wrapper.updateCallback}/>
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
              {actionSettings}
              <div style={styles.action_area_bottom}>{actionGUI}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
