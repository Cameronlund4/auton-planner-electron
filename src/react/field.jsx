import React from 'react';
import ReactDOM from 'react-dom';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.img = props.img;
    this.state = {
      size: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    if ((window.innerWidth-500) < window.innerHeight) {
      this.setState({size: (window.innerWidth-500)});
    } else {
      this.setState({size: window.innerHeight});
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // draw(context) {
  //   context.fillRect(25, 25, 100, 100);
  //   context.clearRect(45, 45, 60, 60);
  //   context.strokeRect(50, 50, 50, 50);
  // }
  //
  // componentDidMount() {
  //   var context = ReactDOM.findDOMNode(this).getContext('2d');
  //   this.draw(context);
  // }

  render() {
    return (<img id="field_img" src={this.img} style={{
      width: `${this.state.size}px`,
      height: `${this.state.size}px`
    }}/>);
  }
}
