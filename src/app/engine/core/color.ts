/**
 * Manejo de colores con soporte para HEX, RGB, RGBA y opacidad.
 * Migrado desde Color.js
 */
export class Color {
  private r = 0;
  private g = 0;
  private b = 0;
  private a = 1;
  private hex = '#000000';
  private rgb = 'rgb(0,0,0)';
  private rgba = 'rgba(0,0,0,1)';

  constructor(initialColor?: string) {
    if (initialColor) {
      this.set(initialColor);
    }
  }

  getHEX(): string {
    return this.hex;
  }

  getRGB(): string {
    return this.rgb;
  }

  getRGBA(): string {
    return this.rgba;
  }

  getR(): number {
    return this.r;
  }

  getG(): number {
    return this.g;
  }

  getB(): number {
    return this.b;
  }

  getOpacity(): number {
    return this.a;
  }

  setOpacity(opacity: number): void {
    this.setRGBA(this.r, this.g, this.b, opacity);
  }

  setRGBA(r: number, g: number, b: number, a = 1): void {
    this.r = Math.min(255, Math.max(0, Math.round(r)));
    this.g = Math.min(255, Math.max(0, Math.round(g)));
    this.b = Math.min(255, Math.max(0, Math.round(b)));
    this.a = Math.min(1, Math.max(0, a));

    const hexVal = this.b | (this.g << 8) | (this.r << 16) | 0x1000000;
    this.hex = '#' + hexVal.toString(16).substring(1);
    this.rgb = `rgb(${this.r},${this.g},${this.b})`;
    this.rgba = `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  set(colorString: string): void {
    if (!colorString || typeof colorString !== 'string') {
      return;
    }

    const clean = colorString.replace(/\s+/g, '');

    // 6-digit hex
    let match = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(clean);
    if (match) {
      this.setRGBA(parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), this.a);
      return;
    }

    // 3-digit hex
    match = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(clean);
    if (match) {
      this.setRGBA(parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, this.a);
      return;
    }

    // rgba(r,g,b,a)
    match = /^rgba\((\d+),(\d+),(\d+),([\d.]+)\)/.exec(clean);
    if (match) {
      this.setRGBA(Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4]));
      return;
    }

    // rgb(r,g,b)
    match = /^rgb\((\d+),(\d+),(\d+)\)/.exec(clean);
    if (match) {
      this.setRGBA(Number(match[1]), Number(match[2]), Number(match[3]), 1);
      return;
    }
  }

  clone(): Color {
    const c = new Color();
    c.setRGBA(this.r, this.g, this.b, this.a);
    return c;
  }
}
