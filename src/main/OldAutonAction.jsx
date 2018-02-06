import React from 'react';
import AutonActionWrapper from './AutonActionWrapper.jsx'
import Robot from './robot.jsx'

// Class to handle the code generation and graphics rendering for a certain...
// type of action a robot may do in autonomous mode. This is intended to be...
// extended.

// TODO Document how to create a proper AutonAction extension
export default class AutonAction extends React.Component {
  constructor(props) {
    super(props);
    // Create a basic gui to tell the extender they forgot to overwrite this
    this.props.wrapper.meta.icon = "./assets/icon_unknown.png";
    this.props.wrapper.meta.type = "<No Type>";
  }

  // To be called whenever a change is made that needs the action to be redrawn
  onUpdate() {
    if (this.parent != null)
      this.parent.updateCallback();
    this.gui = this.renderGUI();
  }

  // Render the jsx component that will be displayed for this component
  render() {
    return <p>Looks like you need to set up your GUI for this action! This can be done within the method:
      <br/>
      renderGUI()<br/><br/>
      If you're setting the gui in another location than this method it will be overwritten by the default AutonAction method</p>
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
