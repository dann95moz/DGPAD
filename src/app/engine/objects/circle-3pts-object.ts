import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveCircleObject } from './primitive-circle-object';

/**
 * Circunferencia definida por 3 puntos no alineados.
 * Migrado desde Circle3ptsObject.js
 */
export class Circle3ptsObject extends PrimitiveCircleObject {
  protected P2: PointObject;
  protected P3: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
    p3: PointObject,
  ) {
    const center = new PointObject(construction, '_center', 0, 0, true);
    super(construction, name, center);
    this.P2 = p2;
    this.P3 = p3;
    this.setParent(p1, p2, p3);
  }

  override getCode(): string {
    return 'circle3pts';
  }

  override compute(): void {
    const parents = this.getParents() as PointObject[];
    if (parents.length < 3) return;

    const p1 = parents[0];
    const p2 = parents[1];
    const p3 = parents[2];

    const [cx, cy] = MathUtils.computeCenter(
      p1.getX(),
      p1.getY(),
      p2.getX(),
      p2.getY(),
      p3.getX(),
      p3.getY(),
    );

    this.P1.setXY(cx, cy);
    this.r = MathUtils.distance(cx, cy, p1.getX(), p1.getY());
  }
}

/**
 * Arco que pasa por 3 puntos ordenados.
 * Migrado desde Arc3ptsObject.js
 */
export class Arc3ptsObject extends PrimitiveCircleObject {
  protected P2: PointObject;
  protected P3: PointObject;
  protected startAngle = 0;
  protected endAngle = 0;
  protected trigo = true;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
    p3: PointObject,
  ) {
    const center = new PointObject(construction, '_center', 0, 0, true);
    super(construction, name, center);
    this.P2 = p2;
    this.P3 = p3;
    this.setParent(p1, p2, p3);
  }

  override getCode(): string {
    return 'arc3pts';
  }

  override compute(): void {
    const parents = this.getParents() as PointObject[];
    if (parents.length < 3) return;

    const p1 = parents[0];
    const p2 = parents[1];
    const p3 = parents[2];

    const params = MathUtils.computeArcParams(
      p1.getX(),
      p1.getY(),
      p2.getX(),
      p2.getY(),
      p3.getX(),
      p3.getY(),
    );

    this.P1.setXY(params.centerX, params.centerY);
    this.r = MathUtils.distance(params.centerX, params.centerY, p1.getX(), p1.getY());
    this.startAngle = params.startAngle;
    this.endAngle = params.endAngle;
    this.trigo = params.trigo;
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    if (this.r <= 0) return;
    ctx.beginPath();
    ctx.arc(this.P1.getX(), this.P1.getY(), this.r, this.startAngle, this.endAngle, !this.trigo);
    ctx.stroke();
  }
}
