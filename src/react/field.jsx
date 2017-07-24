import React from 'react';
import ReactDOM from 'react-dom';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.img = props.img;
    this.state = {
      size: 0
    };
    this.img_obj = new Image();
    this.img_obj.src = this.img;
    this.img_obj.onload = () => this.updateCanvas();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  updateWindowDimensions() {
    if ((window.innerWidth - 500) < window.innerHeight) {
      this.setState({
        size: (window.innerWidth - 500)
      });
    } else {
      this.setState({size: window.innerHeight});
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
    let canvas = this.refs.canvas;
    canvas.setAttribute("width", this.state.size);
    canvas.setAttribute("height", this.state.size);
    let ctx = canvas.getContext('2d');
    console.log("Drawing image! Scale: " + this.state.size);
    ctx.clearRect(0, 0, this.state.size, this.state.size);
    ctx.drawImage(this.img_obj, 0, 0, this.state.size, this.state.size);
    //ctx.fillRect(0,0, 10, 10);
  }

  render() {
    // For some reason this hates css defined dimensions
    // Dimensions are set in updateCanvas via attributes
    return <canvas ref="canvas"/>
  }
}
