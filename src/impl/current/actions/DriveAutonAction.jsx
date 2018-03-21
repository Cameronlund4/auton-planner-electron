import React from 'react';
import AutonAction from './../../../main/actions/AutonAction.jsx'
import DriveAutonGUI from './DriveAutonGui.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback, instanceData) {
    super(selectedCallback, redrawCallback, instanceData);
    this.typeData = {
      display: "Drive",
      type: "DriveAutonAction",
      icon: "./main/assets/icon_drive.png",
      data: {percent: 0.0, distance: 0.0, unit: 2},
      actionGUI: DriveAutonGUI
    }
    if (instanceData) { // Instance data was passed, fill it in
      // Write in our instanceData
      Object.assign(this.typeData, instanceData);
    }
  }

  renderSelected(robot, ctx, selected, xOrig, yOrig, xFinal, yFinal) {
    // 1st offset set. Considering robot front up, this translates points left/right half the robot length.
    let angleRadOff1 = robot.toRadians(robot.pos.rotation);
    let distOff = (9/144)*robot.fieldSize;
    var xOff1 = distOff*Math.cos(angleRadOff1);
    var yOff1 = distOff*Math.sin(angleRadOff1);
    // 2nd offset set. Considering robot front up, this translates points up/down half the robot length.
    // These will adjust based on the direction of the drive.
    let angleRadOff2 = robot.toRadians(robot.pos.rotation+90);
    var xOff2 = distOff*Math.cos(angleRadOff2);
    xOff2 *= (this.typeData.data.percent > 0 ? 1 : -1);
    var yOff2 = distOff*Math.sin(angleRadOff2);
    yOff2 *= (this.typeData.data.percent > 0 ? 1 : -1);

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
      ctx.arc(xFinal,yFinal,3,0,2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    // Main robot path
    ctx.beginPath();
    // Grab where the robot started and start line there
    var xOrig = robot.getPixelsX();
    var yOrig = robot.getPixelsY();
    ctx.moveTo(xOrig, yOrig);
    // Move the robot desired distance
    robot.moveDistance(this.typeData.data.percent);
    // Grab where the robot ends up and end the line there
    var xFinal = robot.getPixelsX();
    var yFinal = robot.getPixelsY();
    ctx.lineTo(xFinal, yFinal);
    // Draw line and close path
    ctx.stroke();
    ctx.closePath();

    this.renderSelected(robot, ctx, selected, xOrig, yOrig, xFinal, yFinal);
  }

  renderCode(robot) {
    return "pseudoDriveMethod("+Math.floor(((144/(4*Math.PI))*360)*this.typeData.data.percent)+");";
  }
}
