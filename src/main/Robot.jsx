// Class to represent a robot whenever we need to represent a robots position...
// or movement along the field (graphics and code generation)
export default class Robot {
  // NOTE: Positions are stored in millimeters to keep position storage based...
  // on real world values. For drawing mm are converted to pixels.

  constructor(fieldSize, posx, posy, rotation) {
    this.fieldSize = fieldSize;
    this.posx = posx | 0;
    this.posy = posy | 0;
    this.rotation = rotation | 0;
  }

  // Converts millimeters to pixels based on the displayed fields size
  mmToPixels(mm) {
    // 1in............25.4mm
    // 12ft field.....144in
    // 12ft field mm..(144*25.4)mm
    // totalPixels * (percent of field)
    return this.fieldSize * (mm / (144 * 25.4));
  }

  // Converts pixels to millimeters based on the displayed fields size
  pixelsToMM(pixels) {
    // 1in............25.4mm
    // 12ft field.....144in
    // 12ft field mm..(144*25.4)mm
    // totalMM * (percent of pixel)
    return (144 * 25.4) * (pixels / this.fieldSize);
  }

  // Converts an angle to radians
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  // Moves the robot's position a certain distance in mm based on current...
  // position and the current rotation of the robot
  moveDistance(mm) {
    // `- (Math.PI / 2)` is to make 0 degrees be directly up on the field
    this.posx += Math.cos(this.toRadians(this.rotation) - (Math.PI / 2)) * mm;
    this.posy += Math.sin(this.toRadians(this.rotation) - (Math.PI / 2)) * mm;
  }
}
