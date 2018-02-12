import React from 'react';
import Robot from './robot.jsx'

// TODO Document how to create a proper AutonAction extension
export default class AutonAction {
  constructor(selectedCallback, redrawCallback) {
    this.typeData = {
      display: "Unsetup Action",
      type: "UnsetAutonAction",
      icon: "./assets/icon_unknown.png",
      data: { },
      actionGUI: <p>Looks like you need to set up your GUI for this action!</p>
    }
    this.meta = {
      name: "Unnamed Auton Action",
      selected: false,
      selectedCallback: (selectedCallback
        ? selectedCallback
        : (() => console.error("Action has no callback!")))
    }
    this.selectedCallback = selectedCallback;
    this.redrawCallback = redrawCallback;
    this.updateCallback = this.updateCallback.bind(this);
  }

  // When our GUI tells us we have new data, tell the field we need to redraw
  updateCallback(data) {
    this.typeData.data = data;
    this.redrawCallback();
  }

  // Move the robot how this action would and draw any representations of this
  // Is passed an instance of the canvas drawing context that the field is on
  renderWithGraphics(robot, ctx) {
    ctx.fillRect(0, 0, 20, 20);
  }

  // Make the physical changes to the robot without drawing anything
  renderWithoutGraphics(robot) {}

  // Based on the robot given, render the code to perform this action on the
  // real robot
  renderCode(robot) {
    return "// Looks like you need to setup renderCode(robot) in your action " + this.typeData.type + "!"
  }
}
