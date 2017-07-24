import React from 'react';
import AutonAction from './AutonAction.jsx'

export default class AutonActionWrapper {
  constructor(selectedCallback) {
    this.meta = {
      name: "Unsetup Action",
      type: "<No Type>",
      icon: "./assets/icon_unknown.png",
      selectedCallback: (selectedCallback
        ? selectedCallback
        : (() => console.error("Action has no callback!"))),
      selected: false
    }
    this.setAutonAction = this.setAutonAction.bind(this);
    this.setAutonAction(new AutonAction());
  }

  getGUI() {
    return this.autonAction.gui;
  }

  setAutonAction(action) {
    this.autonAction = action;
    action.setParent(this);
  }
}
