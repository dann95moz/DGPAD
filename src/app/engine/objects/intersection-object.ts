import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { CircleObject } from './circle-object';
import { PointObject } from './point-object';
import { PrimitiveCircleObject } from './primitive-circle-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Punto de intersección entre dos líneas rectas.
 * Migrado desde LineIntersectionObject.js
 */
export class LineIntersectionObject extends PointObject {
  protected line1: PrimitiveLineObject;
  protected line2: PrimitiveLineObject;

  constructor(
    construction: IConstruction,
    name: string,
    l1: PrimitiveLineObject,
    l2: PrimitiveLineObject,
  ) {
    super(construction, name, 0, 0, true);
    this.line1 = l1;
    this.line2 = l2;
    this.size = 4;
    this.color.set('#555555');
    this.setParent(l1, l2);
  }

  override getCode(): string {
    return 'line_int';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const pt = MathUtils.intersectLines(
      this.line1.getP1().getX(),
      this.line1.getP1().getY(),
      this.line1.getDX(),
      this.line1.getDY(),
      this.line2.getP1().getX(),
      this.line2.getP1().getY(),
      this.line2.getDX(),
      this.line2.getDY(),
    );

    if (pt) {
      this.setXY(pt.x, pt.y);
    } else {
      this.setXY(NaN, NaN);
    }
  }
}

/**
 * Punto de intersección entre recta y círculo o dos círculos.
 * Migrado desde IntersectionObject.js
 */
export class CircleIntersectionObject extends PointObject {
  protected obj1: PrimitiveLineObject | PrimitiveCircleObject;
  protected obj2: PrimitiveCircleObject;
  protected orderIndex: 0 | 1 = 0; // Primer o segundo punto de corte

  constructor(
    construction: IConstruction,
    name: string,
    o1: PrimitiveLineObject | PrimitiveCircleObject,
    o2: PrimitiveCircleObject,
    orderIndex: 0 | 1 = 0,
  ) {
    super(construction, name, 0, 0, true);
    this.obj1 = o1;
    this.obj2 = o2;
    this.orderIndex = orderIndex;
    this.size = 4;
    this.color.set('#555555');
    this.setParent(o1, o2);
  }

  override getCode(): string {
    return 'circle_int';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    if (this.obj1 instanceof PrimitiveLineObject) {
      // Intersección recta - círculo
      const res = MathUtils.intersectLineCircle(
        this.obj1.getP1().getX(),
        this.obj1.getP1().getY(),
        this.obj1.getNDX(),
        this.obj1.getNDY(),
        this.obj2.getP1().getX(),
        this.obj2.getP1().getY(),
        this.obj2.getR(),
      );

      if (res && res[this.orderIndex]) {
        this.setXY(res[this.orderIndex].x, res[this.orderIndex].y);
      } else {
        this.setXY(NaN, NaN);
      }
    } else {
      // Intersección círculo - círculo
      const res = MathUtils.intersectCircles(
        this.obj1.getP1().getX(),
        this.obj1.getP1().getY(),
        this.obj1.getR(),
        this.obj2.getP1().getX(),
        this.obj2.getP1().getY(),
        this.obj2.getR(),
      );

      if (res && res[this.orderIndex]) {
        this.setXY(res[this.orderIndex].x, res[this.orderIndex].y);
      } else {
        this.setXY(NaN, NaN);
      }
    }
  }
}
