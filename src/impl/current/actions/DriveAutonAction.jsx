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
    ctx.shadowColor="black";
    ctx.shadowBlur=20;
    ctx.lineWidth = 2;

    // 1st offset set. Considering robot front up, this translates points left/right half the robot length.
    var xOff1 = (9/144)*robot.fieldSize*Math.cos(robot.toRadians(robot.pos.rotation));
    var yOff1 = (9/144)*robot.fieldSize*Math.sin(robot.toRadians(robot.pos.rotation));
    // 2nd offset set. Considering robot front up, this translates points up/down half the robot length.
    // These will adjust based on the direction of the drive.
    var xOff2 = (9/144)*robot.fieldSize*Math.cos(robot.toRadians(robot.pos.rotation+90));
    xOff2 *= (this.typeData.data.percent > 0 ? 1 : -1);
    var yOff2 = (9/144)*robot.fieldSize*Math.sin(robot.toRadians(robot.pos.rotation+90));
    yOff2 *= (this.typeData.data.percent > 0 ? 1 : -1);

    // Main robot path
    ctx.beginPath();
    // Grab where the robot started and start line there
    var xOrig = robot.getPixelsX();
    var yOrig = robot.getPixelsY();
    ctx.moveTo(xOrig + xOff2, yOrig + yOff2);
    // Move the robot desired distance
    robot.moveDistance(this.typeData.data.percent);
    // Grab where the robot ends up and end the line there
    var xFinal = robot.getPixelsX();
    var yFinal = robot.getPixelsY();
    ctx.lineTo(xFinal + xOff2, yFinal + yOff2);
    // Draw line and close path
    ctx.stroke();
    ctx.closePath();

    // If selected, mark what drive will hit. Otherwise, mark endpoint of drive.
    if (selected) {
      // Draw a red box where the robot used to be along the path.
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.fillStyle = "red";
      ctx.moveTo(xFinal-xOff1-xOff2, yFinal-yOff1-yOff2);
      ctx.lineTo(xOrig-xOff1+xOff2, yOrig-yOff1+yOff2);
      ctx.lineTo(xOrig+xOff1+xOff2, yOrig+yOff1+yOff2);
      ctx.lineTo(xFinal+xOff1+xOff2, yFinal+yOff1+yOff2);
      ctx.stroke();
      ctx.closePath();
    } else {
      // Draw a 6 pixel diameter around where the robot will end up.
      ctx.beginPath();
      ctx.arc(xFinal+xOff2,yFinal+yOff2,3,0,2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

}
