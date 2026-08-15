import { MathUtils } from '../../core/math-utils';
import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto geométrico Segmento entre dos puntos.
 * Migrado desde SegmentObject.js
 */
export class SegmentObject extends ConstructionObject {
  protected P1: PointObject;
  protected P2: PointObject;
  protected length = 0;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
  ) {
    super(construction, name);
    this.P1 = p1;
    this.P2 = p2;
    this.size = 2;
    this.color.set('#006633');
    this.setParent(p1, p2);
  }

  getCode(): string {
    return 'segment';
  }

  getFamily(): string {
    return 'line';
  }

  getP1(): PointObject {
    return this.P1;
  }

  getP2(): PointObject {
    return this.P2;
  }

  getLength(): number {
    return this.length;
  }

  compute(): void {
    this.length = MathUtils.distance(
      this.P1.getX(),
      this.P1.getY(),
      this.P2.getX(),
      this.P2.getY(),
    );
  }

  isNear(x: number, y: number, tolerance = 6): boolean {
    return MathUtils.isNearToSegment(
      this.P1.getX(),
      this.P1.getY(),
      this.P2.getX(),
      this.P2.getY(),
      x,
      y,
      Math.max(this.size, tolerance),
    );
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.P1.getX(), this.P1.getY());
    ctx.lineTo(this.P2.getX(), this.P2.getY());
    ctx.stroke();
  }

  protected override paintName(ctx: CanvasRenderingContext2D): void {
    const mx = (this.P1.getX() + this.P2.getX()) / 2;
    const my = (this.P1.getY() + this.P2.getY()) / 2;
    ctx.font = `${this.fontSize}px Verdana, sans-serif`;
    ctx.fillStyle = this.color.getRGBA();
    ctx.fillText(this.name, mx + 4, my - 4);
  }
}
