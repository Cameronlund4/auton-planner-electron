import React from 'react';
import ActionCard from './actioncard.jsx'

// Component that takes and displays ActionCards in a scrollable list
export default class ActionList extends React.Component {
  constructor(props) {
    super(props);

    // Save any props to state
    this.state = {
      size: 0
    };

    // Bind the `this` keyword manually to any methods that need it (react):
    this.updateWindow = this.updateWindow.bind(this);
  }

  updateWindow() {
    // 330px taken up by the bottom buttons and top panel
    // Set the window size to the available window height
    this.setState({
      size: window.innerHeight - 330
    });
  }

  // When the component has been added to the active UI
  componentDidMount() {
    this.updateWindow();
    // Add a listener to update whenever we resize
    window.addEventListener('resize', this.updateWindow);
  }

  // When the component will ve removed from the active UI
  componentWillUnmount() {
    // Remove the update listener
    window.removeEventListener('resize', this.updateWindow);
  }

  // Render the HTML for the component
  render() {
    // Generate the HTML for each of the card metas
    // Basically, create an ActionCard component as a list element
    let rows = [];
    for (let i = 0; i < this.props.elements.length; i++) {
      // Pull the elements meta and tag on the index in the list
      let withIndex = Object.assign(this.props.elements[i].meta, {index: i});
      // Generate and push the ActionCard component to the list with meta
      rows.push(
        <li><ActionCard {...withIndex}/></li>
      );
    }

    // Create a list element containing all of the action cards in rows
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
