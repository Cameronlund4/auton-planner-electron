import React from 'react';
import AutonAction from './AutonAction.jsx'

// Class to hold information about a certain auton action. As each type...
// handles things in different ways, the AutonAction itself will be swapped...
// out based on types, keeping the wrapper the same. This keeps the...
// reference to the action the same across type changes.
export default class AutonActionWrapper {
  constructor(selectedCallback, updateCallback) {
    // Create the default meta for this action, will be modified by wrapepd...
    // AutonAction object via AutonAction.setParent
    this.meta = {
      name: "Unsetup Action",
      type: "<No Type>",
      icon: "./assets/icon_unknown.png",
      selectedCallback: (selectedCallback
        ? selectedCallback
        : (() => console.error("Action has no callback!"))),
      selected: false
    }

    // Store the callback to be called when
    this.updateCallback = updateCallback;

    // Bind the `this` keyword manually to any methods that need it (react):
    this.setAutonAction = this.setAutonAction.bind(this);

    // Set the current auton action to a blank/default action
    this.setAutonAction(new AutonAction());
  }

  // Returns the gui from the wrapepd AutonAction
  getGUI() {
    return this.autonAction.gui;
  }

  // Sets the wrapped AutonAction
  setAutonAction(action) {
    this.autonAction = action;
    // Tell this action this is the parent now and have it update our meta
    action.setParent(this);
  }
}
