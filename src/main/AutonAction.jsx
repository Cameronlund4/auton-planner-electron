import React from 'react';
import AutonActionWrapper from './AutonActionWrapper.jsx'
import Robot from './robot.jsx'

// Class to handle the code generation and graphics rendering for a certain...
// type of action a robot may do in autonomous mode. This is intended to be...
// extended.

// TODO Document how to create a proper AutonAction extension
export default class AutonAction {
  constructor() {
    // Create a basic gui to tell the extender they forgot to overwrite this
    this.gui = <p>Looks like you need to set up your GUI for this action! This can be done with the method:
      <br/>
      setupGUI(jsx element)</p>
    this.parent = null; // Holds the AutonActionWrapper parent
    this.icon = "./assets/icon_unknown.png";
    this.type = "<No Type>";
  }

  // Save instance of our wrapper and update our wrappers meta
  setParent(wrapper) {
    this.parent = wrapper;
    wrapper.meta.icon = this.icon;
    wrapper.meta.type = this.type;
  }

  // Set the jsx component that will be displayed for this component
  setupGUI(gui) {
    this.gui = gui;
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
    return "// Looks like you need to setup renderCode(robot) in your action" + this.type + "!"
  }
}
