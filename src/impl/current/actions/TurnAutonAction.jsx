import React from 'react';
import AutonAction from './../../../main/actions/AutonAction.jsx'
import TurnAutonGUI from './TurnAutonGui.jsx'

// TODO Implement
export default class TurnAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback) {
    super(selectedCallback, redrawCallback);
    // Overwrite the type data for this action
    this.typeData = {
      display: "Turn",
      type: "TurnAutonAction",
      icon: "./main/assets/icon_turn.png",
      data: {degrees: 0},
      actionGUI: TurnAutonGUI
    }
  }

  drawArcedRegion(ctx, robot, origAngle, finalAngle, count) {
    ctx.beginPath();
    var rad = (9/144)*Math.sqrt(2)*robot.fieldSize;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.rotate(origAngle+(Math.PI/4)+((Math.PI/2)*count));
    if (finalAngle-origAngle < 0) {
      ctx.arc(0, 0, rad, finalAngle-origAngle, 0);
    } else {
      ctx.arc(0, 0, rad, 0, finalAngle-origAngle);
    }
    // BUG This calculation is wrong, should always touch robot bordar
    // ctx.moveTo(rad,0);
    // ctx.lineTo(rad*(Math.cos(finalAngle-origAngle)),0);
    // BUG end
    ctx.stroke();
    ctx.rotate((((origAngle+(Math.PI/4)+((Math.PI/2)*count))))*-1);
    ctx.closePath();
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    ctx.shadowColor="black";
    ctx.shadowBlur=20;
    ctx.beginPath();
    var origAngle = robot.toRadians(robot.pos.rotation);
    robot.addRotation(parseInt(this.typeData.data.degrees));
    var finalAngle = robot.toRadians(robot.pos.rotation);

    if (selected) { // Show what the robot will hit
      // Move the center of rotation to the center of the bot
      ctx.translate(robot.getPixelsX(), robot.getPixelsY());
      // Rotate canvas to match rotation of the robot
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 1);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 2);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 3);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 4);
      ctx.translate(-robot.getPixelsX(),-robot.getPixelsX());
    }

    // TODO Draw basic turn indicator
    ctx.closePath();
  }

}
