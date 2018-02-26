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

    //if (selected) {
      //ctx.shadowColor="#FFFF00";
      //ctx.shadowBlur=10;
    //} else {
      ctx.shadowColor="black";
      ctx.shadowBlur=20;
    //}

    var xOff1 = (9/144)*robot.fieldSize*Math.cos(robot.toRadians(robot.pos.rotation));
    var yOff1 = (9/144)*robot.fieldSize*Math.sin(robot.toRadians(robot.pos.rotation));
    var xOff2 = (9/144)*robot.fieldSize*Math.cos(robot.toRadians(robot.pos.rotation+90));
    var yOff2 = (9/144)*robot.fieldSize*Math.sin(robot.toRadians(robot.pos.rotation+90));
    ctx.lineWidth = 2;
    // Main robot path
    ctx.beginPath();
    var xOrig = robot.getPixelsX();
    var yOrig = robot.getPixelsY();
    ctx.moveTo(xOrig+xOff2, yOrig+yOff2);
    robot.moveDistance(this.typeData.data.percent);
    var xFinal = robot.getPixelsX();
    var yFinal = robot.getPixelsY();
    ctx.lineTo(xFinal+xOff2, yFinal+yOff2);
    ctx.stroke();
    ctx.closePath();
    // Hit mark
    if (selected) {
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.fillStyle = "red";
      ctx.moveTo(xFinal-xOff1-xOff2, yFinal-yOff1-yOff2); // 3
      ctx.lineTo(xOrig-xOff1+xOff2, yOrig-yOff1+yOff2); // 4
      ctx.lineTo(xOrig+xOff1+xOff2, yOrig+yOff1+yOff2); // 1
      ctx.lineTo(xFinal+xOff1+xOff2, yFinal+yOff1+yOff2); // 2
      ctx.stroke();
      ctx.closePath();
    }
  }

}
