/**
 * Sistema de coordenadas cartesianas bidimensional y transformaciones canvas ↔ coordenadas matemáticas.
 * Migrado desde CoordsSystem.js
 */
export class CoordsSystem {
  private unit = 40; // Pixeles por unidad matemática
  private x0 = 400; // Posición X del origen (0,0) en pixeles de canvas
  private y0 = 300; // Posición Y del origen (0,0) en pixeles de canvas
  private lockOx = false;
  private lockOy = false;
  private onlyPositive = false;
  private centerZoom = false;

  constructor(width = 800, height = 600) {
    this.reset(width, height);
  }

  reset(width: number, height: number): void {
    this.unit = width / 30 || 40;
    this.x0 = width / 2;
    this.y0 = height / 2;
  }

  getX0(): number {
    return this.x0;
  }

  setX0(val: number): void {
    this.x0 = val;
  }

  getY0(): number {
    return this.y0;
  }

  setY0(val: number): void {
    this.y0 = val;
  }

  getUnit(): number {
    return this.unit;
  }

  setUnit(val: number): void {
    if (val > 0) {
      this.unit = val;
    }
  }

  isLockOx(): boolean {
    return this.lockOx;
  }

  setLockOx(val: boolean): void {
    this.lockOx = val;
  }

  isLockOy(): boolean {
    return this.lockOy;
  }

  setLockOy(val: boolean): void {
    this.lockOy = val;
  }

  isOnlyPositive(): boolean {
    return this.onlyPositive;
  }

  setOnlyPositive(val: boolean): void {
    this.onlyPositive = val;
  }

  isCenterZoom(): boolean {
    return this.centerZoom;
  }

  setCenterZoom(val: boolean): void {
    this.centerZoom = val;
  }

  /**
   * Convierte coordenadas de píxeles en canvas a coordenada matemática X
   */
  x(px: number): number {
    return (px - this.x0) / this.unit;
  }

  /**
   * Convierte coordenadas de píxeles en canvas a coordenada matemática Y
   */
  y(py: number): number {
    return (this.y0 - py) / this.unit;
  }

  /**
   * Convierte coordenada matemática X a coordenada en píxeles de canvas
   */
  px(x: number): number {
    return this.x0 + x * this.unit;
  }

  /**
   * Convierte coordenada matemática Y a coordenada en píxeles de canvas
   */
  py(y: number): number {
    return this.y0 - y * this.unit;
  }

  /**
   * Convierte una longitud en píxeles a longitud en unidades matemáticas
   */
  l(pixels: number): number {
    return pixels / this.unit;
  }

  /**
   * Convierte una longitud en unidades matemáticas a píxeles
   */
  lx(units: number): number {
    return units * this.unit;
  }

  /**
   * Traslación de la vista (panning)
   */
  translate(dx: number, dy: number): void {
    if (!this.lockOy) {
      this.x0 += dx;
    }
    if (!this.lockOx) {
      this.y0 += dy;
    }
  }

  /**
   * Zoom centrado en un punto (xz, yz) con factor zoomFactor
   */
  zoom(xz: number, yz: number, factor: number): void {
    const targetX = this.centerZoom || this.lockOy ? this.x0 : xz;
    const targetY = this.centerZoom || this.lockOx ? this.y0 : yz;

    this.x0 = targetX + (this.x0 - targetX) * factor;
    this.y0 = targetY + (this.y0 - targetY) * factor;
    this.unit *= factor;
  }
}
