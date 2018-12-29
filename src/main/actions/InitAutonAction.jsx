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
        data: {
          degrees: 0,
          pX: {percent: 0.0, distance: 0.0, unit: 2},
          pY: {percent: 0.0, distance: 0.0, unit: 2}
        },
        actionGUI: InitAutonGUI
      }
    } else { // Instance data was passed
      // Write in our instanceData
      this.typeData = instanceData;
      // Assign in anything not saved in instanceData
      Object.assign(this.typeData, {actionGUI: InitAutonGUI});
    }
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    robot.setPos(this.typeData.data.pX.percent, this.typeData.data.pY.percent,
      this.typeData.data.degrees);
    robot.show(); // Make the robot show up
  }

  renderCode(robot) {
    return "";
  }
}
