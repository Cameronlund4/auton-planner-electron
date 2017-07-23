import React from 'react';
import AutonAction from './../AutonAction.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor() {
    super();
    this.gui = <p>This be some DriveAutonAction</p>
  }

  setupGUI(gui) {
    this.gui = gui;
  }

}
