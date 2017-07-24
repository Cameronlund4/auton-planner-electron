import React from 'react';
import ReactDOM from 'react-dom';
import Robot from './../main/Robot.jsx'

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.img = props.img;
    this.state = {
      size: 0,
      selected: props.selected,
      elements: props.elements
    };
    this.img_obj = new Image();
    this.img_obj.src = this.img;
    this.img_obj.onload = () => this.updateCanvas();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(prop) {
    this.setState(Object.assign(this.state, {
      selected: prop.selected,
      elements: prop.elements
    }));
    this.updateCanvas();
  }

  updateWindowDimensions() {
    if ((window.innerWidth - 500) < window.innerHeight) {
      this.setState(Object.assign(this.state, {
        size: (window.innerWidth - 500)
      }));
    } else {
      this.setState(Object.assign(this.state, {size: window.innerHeight}));
    }
    this.updateCanvas();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateCanvas() {
    if (!this.refs.canvas) {
      return;
    }
    // Get the canvas
    let canvas = this.refs.canvas;
    // Set the canvas to the right size
    canvas.setAttribute("width", this.state.size);
    canvas.setAttribute("height", this.state.size);
    // Get the drawing context
    let ctx = canvas.getContext('2d');
    // Clear whatever we have and draw the field
    ctx.clearRect(0, 0, this.state.size, this.state.size);
    ctx.drawImage(this.img_obj, 0, 0, this.state.size, this.state.size);
    // Let every action draw it's own thing using a robot object
    // TODO Make sure this robot is edited by reference
    let robot = new Robot(this.state.size, 0, 0, 135);
    for (let i = 0; i < (this.state.selected) + 1; i++) {
      this.state.elements[i].autonAction.renderWithGraphics(robot, ctx);
    }
  }

  render() {
    // For some reason this hates css defined dimensions
    // Dimensions are set in updateCanvas via attributes
    return <canvas ref="canvas"/>
  }
}
