import React from 'react';
import AutonAction from './../../../main/actions/AutonAction.jsx'
import TurnAutonGUI from './TurnAutonGui.jsx'

// TODO Implement
export default class TurnAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback, instanceData) {
    super(selectedCallback, redrawCallback, instanceData);
    // Overwrite the type data for this action

    if (!instanceData) { // If no instance data was passed
      // Overwrite the type data for this action
      this.typeData = {
        display: "Turn",
        type: "TurnAutonAction",
        icon: "./main/assets/icon_turn.png",
        data: {degrees: 0},
        actionGUI: TurnAutonGUI
      }
    } else { // Instance data was passed
      // Write in our instanceData
      this.typeData= instanceData;
      // Assign in anything not saved in instanceData
      Object.assign(this.typeData, {actionGUI: TurnAutonGUI});
    }
  }

  drawArcedRegion(ctx, robot, origAngle, finalAngle, count) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    // Get the distance of the center of the robot to a corner
    var rad = (9/144)*Math.sqrt(2)*robot.fieldSize;
    // Rotate the canvas to be diagonal across the robot, orientation based on count
    ctx.translate(robot.getPixelsX(), robot.getPixelsY());
    ctx.rotate(origAngle+(Math.PI/4)+((Math.PI/2)*count));
    // Draw an arc indicating where the turn will hit
    if (finalAngle-origAngle < 0) { // If the angle is negative
      ctx.arc(0, 0, rad, finalAngle-origAngle, 0);
    } else { // If the angle is positive
      ctx.arc(0, 0, rad, 0, finalAngle-origAngle);
    }
    // Close off the arc region
    // BUG This calculation is wrong, should always touch robot bordar
    // ctx.moveTo(rad,0);
    // ctx.lineTo(rad*(Math.cos(finalAngle-origAngle)),0);
    // BUG end
    // Draw and return canvas to normal
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();
  }

  // Draw on the field
  renderWithGraphics(robot, ctx, selected) {
    ctx.beginPath();
    // Grab the robot's starting angle
    var origAngle = robot.toRadians(robot.pos.rotation);
    // Turn the robot desired distance
    robot.addRotation(parseInt(this.typeData.data.degrees));
    // Grab the robot's final angle
    var finalAngle = robot.toRadians(robot.pos.rotation);

    if (selected) { // Show what the robot will hit
      // Rotate canvas to match rotation of the robot
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 1);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 2);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 3);
      this.drawArcedRegion(ctx, robot, origAngle, finalAngle, 4);
      ctx.resetTransform();
    }

    // TODO Draw basic turn indicator
    ctx.closePath();
  }

  renderCode(robot) {
    return "pseudoTurnMethod("+this.typeData.data.degrees+");";
  }
}
