import React from 'react';
import AutonAction from './../../../main/actions/AutonAction.jsx'
import DriveAutonGUI from './TurnAutonGui.jsx'

// TODO Implement
export default class TurnAutonAction extends AutonAction {
  constructor(selectedCallback, redrawCallback) {
    super(selectedCallback, redrawCallback);
    // Overwrite the type data for this action
    this.typeData = {
      display: "Turn",
      type: "TurnAutonAction",
      icon: "./main/assets/icon_turn.png",
      data: {distance: 0},
      actionGUI: TurnAutonGUI
    }
  }

  // Draw on the field
  renderWithGraphics(robot, ctx) {
    let x1 = robot.posx;
    let y1 = robot.posy;
    robot.moveDistance(this.typeData.data.distance); // mm mmToPixels(mm)
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
