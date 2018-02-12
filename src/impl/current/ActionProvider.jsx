import DriveAutonAction from './actions/DriveAutonAction.jsx'

export default class ActionProvider {
  constructor() {
    // Store the list of available types of actions to create
    this.actionTypes = {
      Drive: DriveAutonAction,
      Turn: TurnAutonAction
    }
  }
}
