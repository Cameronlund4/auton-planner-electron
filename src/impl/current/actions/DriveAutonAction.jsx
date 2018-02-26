import React from 'react';
import AutonAction from './../../../main/actions/AutonAction.jsx'
import DriveAutonGUI from './DriveAutonGui.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback) {
    super(selectedCallback, redrawCallback);
    // Overwrite the type data for this action
    this.typeData = {
      display: "Drive",
      type: "DriveAutonAction",
      icon: "./main/assets/icon_drive.png",
      data: {percent: 0.0, distance: 0.0, unit: 0.0},
      actionGUI: DriveAutonGUI
    }
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.fillStyle = "black";
    if (selected) {
      ctx.shadowColor="#FFFF00";
      ctx.shadowBlur=10;
    } else {
      ctx.shadowColor="black";
      ctx.shadowBlur=20;
    }
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(robot.getPixelsX(), robot.getPixelsY());
    robot.moveDistance(this.typeData.data.percent);
    ctx.lineTo(robot.getPixelsX(), robot.getPixelsY());
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.closePath();
  }

}
