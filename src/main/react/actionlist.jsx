import React from 'react';
import ActionCard from './actioncard.jsx'

// Component that takes and displays ActionCards in a scrollable list
export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  // Render the HTML for the component
  render() {
    // Generate the HTML for each of the card metas
    // Basically, create an ActionCard component as a list element
    let rows = [];
    for (let i = 0; i < this.props.actionWrappers.length; i++) {
      // Pull the actionWrappers meta and tag on the index in the list
      let withIndex = Object.assign(this.props.actionWrappers[i].meta, {index: i});
      withIndex = Object.assign(withIndex, this.props.actionWrappers[i].typeData);
      // Generate and push the ActionCard component to the list with meta
      rows.push(
        <li key={i}><ActionCard {...withIndex}/></li>
      );
    }

    // Create a list element containing all of the action cards in rows
    return (
      <ul id="actionlist_scroll" style={{
        padding: '0px',
        margin: '0px',
        overflow: "hidden",
        overflowY: 'auto',
        width: '250px',
        height: 'calc(100% - 393px)' // TODO More elegant solution
      }}>
        {rows}
      </ul>
    );
  }
}
