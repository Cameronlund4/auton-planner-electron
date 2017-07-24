import React from 'react';
import AutonActionWrapper from './AutonActionWrapper.jsx'
import Robot from './robot.jsx'

export default class AutonAction {
  constructor() {
    this.gui = <p>Looks like you need to set up your GUI for this action!
      This can be done with the method: <br/> setupGUI(jsx element)</p>
    this.parent = null; // Holds the AutonActionWrapper parent
    this.icon = "./assets/icon_unknown.png";
    this.type = "<No Type>";
  }

  setParent(wrapper) {
    this.parent = wrapper;
    wrapper.meta.icon = this.icon;
    wrapper.meta.type = this.type;
  }

  setupGUI(gui) {
    this.gui = gui;
  }

  renderWithGraphics(robot, ctx) {
    ctx.fillRect(0,0,20,20);
  }

  renderWithoutGraphics(robot) {

  }

  renderCode(robot) {
    return "// Looks like you need to setup renderCode(robot) in your action!"
  }
}
