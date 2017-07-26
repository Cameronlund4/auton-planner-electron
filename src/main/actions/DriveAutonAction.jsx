import React from 'react';
import AutonAction from './../AutonAction.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor() {
    super();
    this.gui = <p>This be some DriveAutonAction</p>
    this.icon = "./assets/icon_drive.png"
    this.type = "Drive"
    this.distance = 500;
  }

  setupGUI(gui) {
    this.gui = gui;
  }

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
