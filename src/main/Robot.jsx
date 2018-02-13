// Class to represent a robot whenever we need to represent a robots position...
// or movement along the field (graphics and code generation)

// Uses percentages as units, aka percent of the field size. This makes things
// easy when using scaling images and things. Some helpers exist to convert
// normal units to percents and vice versa
export default class Robot {
  // UNITS:
  //   Angles: Degrees (To match up with gyroscopes easier)
  //   Distance: Percent of field (To easily work with scaling GUI)

  constructor(fieldSize, posx, posy, rotation) {
    this.fieldSize = fieldSize;
    this.pos = {
      x: posx | 0,
      y: posy | 0,
      rotation: rotation | 0
    }
  }

  // Converts an angle to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // percentage based
  setPosX(percent) {
    this.pos.x = percent;
  }

  // percentage based
  setPosY(percent) {
    this.pos.y = percent;
  }

  // degrees based, since gyroscopes use degrees
  setRotation(degrees) {
    this.pos.rotation = degrees;
  }

  addRotation(degrees) {
    setRotation(this.pos.rotation + degrees);
  }

  subtractRotation(degrees) {
    setRotation(this.pos.rotation - degrees);
  }

  setPos(posx, posy, rotation) {
    setPosX(posx);
    setPosY(posy);
    setRotation(rotation | this.pos.rotation);
  }

  // Moves the robot's position a certain distance in mm based on current...
  // position and the current rotation of the robot
  moveDistance(percent) {
    // `- (Math.PI / 2)` is to make 0 degrees be directly up on the field
    this.pos.x += Math.cos(this.toRadians(this.pos.rotation) - (Math.PI / 2)) * percent;
    this.pos.y += Math.sin(this.toRadians(this.pos.rotation) - (Math.PI / 2)) * percent;
  }

  /*
  ** Graphics methods
  ** Should really only be used for drawing, not calculating anything for robot
  ** code
  */

  getPixelsX() {
    return (this.pos.x/100) * this.fieldSize;
  }

  getPixelsY() {
    return (this.pos.y/100) * this.fieldSize;
  }
}
