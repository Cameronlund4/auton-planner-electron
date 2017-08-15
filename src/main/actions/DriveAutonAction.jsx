import React from 'react';
import AutonAction from './../AutonAction.jsx'

export default class DriveAutonAction extends AutonAction {
  constructor() {
    super();
    this.icon = "./assets/icon_drive.png"
    this.type = "Drive"
    this.distance = 500;
    this.renderGUI();
  }

  onDistanceInput(event) {
    this.distance = event.target.value;
    this.onUpdate();
  }

  renderGUI() {
    console.log("Rendering again")
    return <div>
      Distance: <br/>
      <input type="number"
        onChange={this.onDistanceInput.bind(this)} defaultValue={this.distance}/>
    </div>
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
