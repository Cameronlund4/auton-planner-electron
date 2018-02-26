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
      x: posx,
      y: posy,
      rotation: rotation
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
    this.setRotation(this.pos.rotation + degrees);
  }

  subtractRotation(degrees) {
    this.setRotation(this.pos.rotation - degrees);
  }

  setPos(posx, posy, rotation) {
    this.setPosX(posx);
    this.setPosY(posy);
    this.setRotation(rotation | this.pos.rotation);
  }

  // Moves the robot's position a certain distance based on current position
  // and the current rotation of the robot
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
    return this.pos.x * this.fieldSize;
  }

  getPixelsY() {
    return this.pos.y * this.fieldSize;
  }

  renderWithGraphics(ctx) {
    ctx.beginPath();
    var size = (18/144)*this.fieldSize;
    ctx.strokeStyle="black";
    ctx.fillStyle = "black";
    // Move the center of rotation to the center of the bot
    ctx.translate(this.getPixelsX(), this.getPixelsY());
    // Rotate canvas to match rotation of the robot
    ctx.rotate(this.pos.rotation*Math.PI/180);
    // Draw the outline of the bot
    ctx.rect(-1*(size/2), -1*(size/2), size, size);
    // Draw corners in the front of the bot to show where the front is
    ctx.fillRect(-1*(size/2),-1*(size/2),Math.round(size*0.1), Math.round(size*0.1))
    ctx.fillRect((size/2)-Math.round(size*0.1), -1*(size/2), Math.round(size*0.1), Math.round(size*0.1))
    // Draw and undo rotations/translations
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();
  }
}
