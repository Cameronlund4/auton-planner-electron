import React from 'react';
import ActionCard from './actioncard.jsx'

export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({
      size: window.innerHeight - 330
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.elements.length; i++) {
      let withIndex = Object.assign(this.props.elements[i].meta, {
        index: i
      });
      rows.push(
        <li><ActionCard {...withIndex}/></li>
      );
    }

    return (
      <div class="ActionList">
        <ul id="actionlist_scroll" style={{
          padding: '0px',
          margin: '0px',
          overflowY: 'scroll',
          height: this.state.size,
          width: '250px'
        }}>
          {rows}
        </ul>
      </div>
    );
  }
}
