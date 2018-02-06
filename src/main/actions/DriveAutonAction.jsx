import React from 'react';
import AutonAction from './../AutonAction.jsx'
import DriveAutonGUI from './DriveAutonGui.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback) {
    super(selectedCallback, redrawCallback);
    // Overwrite the type data for this action
    this.typeData = {
      display: "Drive",
      type: "DriveAutonAction",
      icon: "./assets/icon_drive.png",
      data: {distance: 0},
      actionGUI: DriveAutonGUI
    }
  }

  // When theres new data, save the value to state and tell the action we updated
  onDistanceInput(event) {
    this.distance = event.target.value;
    this.onUpdate();
  }

  // Draw on the field
  renderWithGraphics(robot, ctx) {
    let x1 = robot.posx;
    let y1 = robot.posy;
    robot.moveDistance(this.distance); // mm mmToPixels(mm)
    let x2 = robot.posx;
    let y2 = robot.posy;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle="#FF0000";
    ctx.moveTo(robot.mmToPixels(x1), robot.mmToPixels(y1));
    ctx.lineTo(robot.mmToPixels(x2), robot.mmToPixels(y2));
    ctx.stroke();
    ctx.moveTo(0, 0);
  }

}
