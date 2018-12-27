import React from 'react';
import AutonAction from './AutonAction.jsx'
import InitAutonGUI from './InitAutonGui.jsx'

// TODO Implement
export default class InitAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback, instanceData) {
    super(selectedCallback, redrawCallback, instanceData);
    // Overwrite the type data for this action

    if (!instanceData) { // If no instance data was passed
      // Overwrite the type data for this action
      this.typeData = {
        display: "Initialize",
        type: "InitAutonAction",
        icon: "./main/assets/icon_init.png",
        data: {degrees: 0},
        actionGUI: InitAutonGUI
      }
    } else { // Instance data was passed
      // Write in our instanceData
      this.typeData = instanceData;
      // Assign in anything not saved in instanceData
      Object.assign(this.typeData, {actionGUI: TurnAutonGUI});
    }
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    // TODO Configure robot position and rotation
    robot.show(); // Make the robot show up
  }

  renderCode(robot) {
    return "";
  }
}
