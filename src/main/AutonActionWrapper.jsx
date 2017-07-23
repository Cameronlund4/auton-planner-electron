import React from 'react';
import AutonAction from './AutonAction.jsx'

export default class AutonActionWrapper {
  constructor(selectedCallback) {
    this.setAutonAction(new AutonAction());
    this.meta = {
      name: "Unsetup Action",
      type: "No type setup",
      icon: "",
      selectedCallback: () => console.error("Action has no callback!"),
      selected: false
    }
  }

  getGUI() {
    return this.autonAction.gui;
  }

  setAutonAction(action) {
    this.autonAction = action;
    action.parent = this;
  }
}
