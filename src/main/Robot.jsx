export default class Robot {
  // *posx and posy are in mm*
  constructor(fieldSize, posx, posy, rotation) {
    this.fieldSize = fieldSize;
    this.posx = posx | 0;
    this.posy = posy | 0;
    this.rotation = rotation | 0;
  }

  mmToPixels(mm) {
    // 1in............25.4mm
    // 12ft field.....144in
    // 12ft field mm..(144*25.4)mm
    // totalPixels * (percent of field)
    return this.fieldSize * (mm / (144 * 25.4));
  }

  pixelsToMM(pixels) {
    // 1in............25.4mm
    // 12ft field.....144in
    // 12ft field mm..(144*25.4)mm
    // totalMM * (percent of pixel)
    return (144 * 25.4) * (pixels / this.fieldSize);
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  moveDistance(mm) {
    // `- (Math.PI / 2)`` is to make 0 degrees be directly up on the field
    this.posx += Math.cos(this.toRadians(this.rotation) - (Math.PI / 2)) * mm;
    this.posy += Math.sin(this.toRadians(this.rotation) - (Math.PI / 2)) * mm;
  }
}
