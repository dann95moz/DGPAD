import { MathUtils } from '../../core/math-utils';
import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto geométrico base para rectas infinitas, semirrectas y segmentos.
 * Migrado desde PrimitiveLineObject.js
 */
export abstract class PrimitiveLineObject extends ConstructionObject {
  protected P1: PointObject;
  protected dx = 1;
  protected dy = 0;
  protected ndx = 1;
  protected ndy = 0;
  protected xmin = 0;
  protected ymin = 0;
  protected xmax = 0;
  protected ymax = 0;

  constructor(construction: IConstruction, name: string, p1: PointObject) {
    super(construction, name);
    this.P1 = p1;
    this.size = 2;
    this.color.set('#780013');
  }

  getP1(): PointObject {
    return this.P1;
  }

  getDX(): number {
    return this.dx;
  }

  getDY(): number {
    return this.dy;
  }

  getNDX(): number {
    return this.ndx;
  }

  getNDY(): number {
    return this.ndy;
  }

  getFamily(): string {
    return 'line';
  }

  compute(): void {
    const norm = MathUtils.normalize(0, 0, this.dx, this.dy);
    this.ndx = norm.x;
    this.ndy = norm.y;

    const width = 2000;
    const height = 2000;
    const bounds = MathUtils.computeBorderPoints(
      this.P1.getX(),
      this.P1.getY(),
      this.ndx,
      this.ndy,
      width,
      height,
    );

    this.xmin = bounds[0];
    this.ymin = bounds[1];
    this.xmax = bounds[2];
    this.ymax = bounds[3];
  }

  isNear(x: number, y: number, tolerance = 6): boolean {
    return MathUtils.isNearToLine(
      this.P1.getX(),
      this.P1.getY(),
      this.dx,
      this.dy,
      x,
      y,
      Math.max(this.size, tolerance),
    );
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.xmin, this.ymin);
    ctx.lineTo(this.xmax, this.ymax);
    ctx.stroke();
  }
}
