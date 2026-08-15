import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { MoveableObject } from './base/moveable-object';

export type PointShape = 0 | 1 | 2 | 3; // 0: circle, 1: cross, 2: diamond, 3: square

/**
 * Objeto geométrico Punto.
 * Migrado desde PointObject.js
 */
export class PointObject extends MoveableObject {
  protected x = 0;
  protected y = 0;
  protected shape: PointShape = 0;
  protected alpha = 0; // Para puntos sobre curvas o segmentos

  constructor(
    construction: IConstruction,
    name: string,
    x: number,
    y: number,
    isDependent = false,
  ) {
    super(construction, name);
    this.x = x;
    this.y = y;
    this.size = 5;
    this.color.set('rgb(0,0,178)');
  }

  getCode(): string {
    return 'point';
  }

  getFamily(): string {
    return 'point';
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setXY(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getShape(): PointShape {
    return this.shape;
  }

  setShape(s: PointShape): void {
    this.shape = s;
  }

  getAlpha(): number {
    return this.alpha;
  }

  setAlpha(a: number): void {
    this.alpha = a;
  }

  free(): boolean {
    return this.parents.length === 0;
  }

  isMoveable(): boolean {
    return this.free() || this.parents.length > 0;
  }

  compute(): void {
    // Si es un punto libre, no se recalcula a partir de padres.
    // Si tiene padres, la subclase (o el binding) actualiza x, y.
  }

  dragObject(x: number, y: number): void {
    this.setXY(x, y);
  }

  computeDrag(): void {
    this.compute();
    this.computeChilds();
  }

  isNear(x: number, y: number, tolerance = 10): boolean {
    return MathUtils.isNearToPoint(this.x, this.y, x, y, Math.max(this.size * 2, tolerance));
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    const s = this.size;
    const x = this.x;
    const y = this.y;

    ctx.fillStyle = this.color.getRGBA();
    ctx.strokeStyle = this.color.getRGBA();

    switch (this.shape) {
      case 0: // Círculo relleno
        ctx.beginPath();
        ctx.arc(x, y, s, 0, MathUtils.DOUBLE_PI);
        ctx.fill();
        break;

      case 1: // Cruz (X)
        ctx.beginPath();
        ctx.moveTo(x - s, y - s);
        ctx.lineTo(x + s, y + s);
        ctx.moveTo(x - s, y + s);
        ctx.lineTo(x + s, y - s);
        ctx.stroke();
        break;

      case 2: // Rombo (Diamante)
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x + s, y);
        ctx.lineTo(x, y + s);
        ctx.lineTo(x - s, y);
        ctx.closePath();
        ctx.fill();
        break;

      case 3: // Cuadrado
        ctx.fillRect(x - s, y - s, s * 2, s * 2);
        break;
    }
  }

  protected override paintName(ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.fontSize}px Verdana, sans-serif`;
    ctx.fillStyle = this.color.getRGBA();
    ctx.fillText(this.name, this.x + this.size + 4, this.y - this.size);
  }
}
