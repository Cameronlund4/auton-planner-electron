import DriveAutonAction from './actions/DriveAutonAction.jsx'
import TurnAutonAction from './actions/TurnAutonAction.jsx'

export default class ActionProvider {
  constructor() {
    // Store the list of available types of actions to create
    // The key should match the display value of the action
    this.actionTypes = {
      Drive: DriveAutonAction,
      Turn: TurnAutonAction
    }
  }
}
