import { MathUtils } from '../../core/math-utils';
import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto geométrico base para circunferencias y arcos.
 * Migrado desde PrimitiveCircleObject.js
 */
export abstract class PrimitiveCircleObject extends ConstructionObject {
  protected P1: PointObject;
  protected r = 0;

  constructor(construction: IConstruction, name: string, center: PointObject) {
    super(construction, name);
    this.P1 = center;
    this.size = 2;
    this.color.set('#CC66CC');
  }

  getP1(): PointObject {
    return this.P1;
  }

  getR(): number {
    return this.r;
  }

  setR(radius: number): void {
    this.r = radius;
  }

  getFamily(): string {
    return 'circle';
  }

  isNear(x: number, y: number, tolerance = 6): boolean {
    return MathUtils.isNearToCircle(
      this.P1.getX(),
      this.P1.getY(),
      this.r,
      x,
      y,
      Math.max(this.size, tolerance),
    );
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    if (this.r <= 0) return;
    ctx.beginPath();
    ctx.arc(this.P1.getX(), this.P1.getY(), this.r, 0, MathUtils.DOUBLE_PI);
    ctx.stroke();
  }
}
