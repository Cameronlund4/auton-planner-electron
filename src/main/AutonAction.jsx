import React from 'react';
import AutonActionWrapper from './AutonActionWrapper.jsx'
import Robot from './robot.jsx'

export default class AutonAction {
  constructor() {
    this.gui = <p>Looks like you need to set up your GUI for this action!
      This can be done with the method: <br/> setupGUI(jsx element)</p>
    this.parent = null; // Holds the AutonActionWrapper parent
  }

  setupGUI(gui) {
    this.gui = gui;
  }

  // TODO Find out how we're handling this, adding graphics to a jsx?
  renderWithGraphics(robot) {

  }

  renderWithoutGraphics(robot) {
      
  }

  renderCode(robot) {
    return "// Looks like you need to setup renderCode(robot) in your action!"
  }
}
