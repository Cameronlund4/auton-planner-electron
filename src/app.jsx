import React from 'react';
import Field from './react/field.jsx'
import ActionCard from './react/actioncard.jsx'
import ActionList from './react/actionlist.jsx'
import styles from './app.css.js';

export default class App extends React.Component {
  render() {
    let listItems = []
    for (let i = 0; i < 1000; i++) {
      var src;
      var type;
      switch (i % 3) {
        case 0:
          src = "./assets/icon_drive.png";
          type = "Drive";
          break;
        case 1:
          src = "./assets/icon_position.png";
          type = "Position";
          break;
        case 2:
          src = "./assets/icon_turn.png";
          type = "Turn";
          break;
      }
      var content = <ActionCard name={"Unnamed Action " + i} type={type} icon={src}/>
      listItems.push(content)
    }

    return (
      <div>
        <div style={styles.field}>
          <Field img="./assets/itz_field.jpg"/>
        </div>
        <div style={styles.panel}>
          <ActionList elements={listItems}/>
        </div>
      </div>
    );
  }
}
