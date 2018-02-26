import React from 'react';
import ReactDOM from 'react-dom';
import Robot from './../Robot.jsx'

// Component that handles the drawing of and interactions with the field display
// NOTE:  Position click of check might now be redundant due to click listner
// NOTE: being on the component itself. Consider removing.
export default class Field extends React.Component {
  constructor(props) {
    super(props);

    // Save any props to state
    this.state = {
      size: 0, // The pixel size to render the field at
      selected: props.selected, // The selected element index
      actionWrappers: props.actionWrappers // The list of auton action wrappers
    };

    this.img = props.img; // The image to draw as the field
    this.img_obj = new Image(); // Create a new image object to store the field
    this.img_obj.src = this.img; // Load the field image into the obj...
    this.img_obj.onload = () => this.updateCanvas(); // Once it loads, render

    // Bind the `this` keyword manually to any methods that need it (react):
    this.updateWindow = this.updateWindow.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  // When the component is getting new props make sure we handle it
  componentWillReceiveProps(prop) {
    // Update our state with the new props
    this.setState(Object.assign(this.state, {
      selected: prop.selected,
      actionWrappers: prop.actionWrappers
    }));
    this.updateCanvas(); // Redraw custom movement graphics
  }

  // When the component has been added to the active UI
  componentDidMount() {
    // Update the window dimensions
    this.updateWindow();
    // Add a listener to update whenever we resize
    window.addEventListener('resize', this.updateWindow);
  }

  // When the component will ve removed from the active UI
  componentWillUnmount() {
    // Remove the update listener
    window.removeEventListener('resize', this.updateWindow);
  }

  // Draw all the custom movement graphics onto the canvas element
  updateCanvas() {
    // If we haven't stored a canvas object yet, return for a later call
    if (!this.refs.canvas) {
      return;
    }

    // Get the stored canvas object
    let canvas = this.refs.canvas;

    // Set the canvas to the right size as set by updateWindow()
    canvas.setAttribute("width", this.state.size);
    canvas.setAttribute("height", this.state.size);

    // Get the drawing context to use
    let ctx = canvas.getContext('2d');

    // Clear whatever we already have
    ctx.clearRect(0, 0, this.state.size, this.state.size);

    // Set shadows
    ctx.shadowBlur=20;
    ctx.shadowColor="black";

    // Draw the new properly sized field image
    ctx.drawImage(this.img_obj, 0, 0, this.state.size, this.state.size);

    // TODO Set the robot's starting positions
    // Create the robot to be drawn and moved
    let robot = new Robot(this.state.size, 0.5, 0.5, 135);
    // Draw every action, making sure to draw selected state
    for (let i = 0; i < (this.state.selected + 1); i++) {
      this.state.actionWrappers[i].renderWithGraphics(robot, ctx, this.state.selected == i);
    }
    // Render the robot
    robot.renderWithGraphics(ctx);
  }

  // Handles when the field has been clicked, typically causing a new action
  // to be made
  handleClick(event) {
    // If this click was outside the field...
    if (event.clientX > this.state.size || event.clientY > this.state.size)
      return; // Then we don't care about it, return
    // Convert coordinates into percentages
    var x = event.clientX/this.state.size;
    var y = event.clientY/this.state.size;
    // IF an action is selected, tell it field was clicked
    if (this.state.selected != -1)
      this.state.actionWrappers[this.state.selected].onFieldClick(x, y);
  }

  // Update the window dimensions then draw the custom graphics
  updateWindow() {
    // 500px taken up by the right panel containing everything but the field
    // If the available width is smaller than the height...
    if ((window.innerWidth - 500) < window.innerHeight) {
      // Set the field size to be that of the available width of the window
      this.setState(Object.assign(this.state, {
        size: (window.innerWidth - 500)
      }));
    } else {
      // Set the field size to be that of the height of the window
      this.setState(Object.assign(this.state, {size: window.innerHeight}));
    }
    this.updateCanvas(); // Redraw custom movement graphics
  }

  // Render the HTML for the component
  render() {
    // For some reason this hates css defined dimensions...
    // Dimensions are set in updateCanvas via attributes
    return <canvas onClick={this.handleClick} ref="canvas"/>
  }
}
