import React from 'react';
import AutonAction from './../AutonAction.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor() {
    super();
    this.gui = <p>This be some DriveAutonAction</p>
    this.icon = "./assets/icon_drive.png"
    this.type = "Drive"
  }

  setupGUI(gui) {
    this.gui = gui;
  }

}
