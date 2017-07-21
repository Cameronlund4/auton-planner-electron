import React from 'react';
import ActionCard from './../react/actioncard.jsx'
import ActionList from './../react/actionlist.jsx'

export default class ActionManager {
  constructor() {
    this.actions = [];
    this.actionList = <ActionList elements={this.actions}/>;
    this.iteration = 0;
  }

  addAction(action) {
    this.actions.push(action);
    console.log(this.actionList);
    this.actionList.type.updateActions(this.actions);
  }

  createAction() {
    var i = this.iteration++;
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
    this.addAction(<ActionCard name={"Unnamed Action " + i} type={type} icon={src}/>);
  }
}
