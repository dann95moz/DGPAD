import { MathUtils } from '../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveCircleObject } from './primitive-circle-object';

/**
 * Círculo definido por centro P1 y un punto perimetral P2.
 * Migrado desde CircleObject.js
 */
export class CircleObject extends PrimitiveCircleObject {
  protected P2: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    center: PointObject,
    edgePoint: PointObject,
  ) {
    super(construction, name, center);
    this.P2 = edgePoint;
    this.setParent(center, edgePoint);
  }

  getCode(): string {
    return 'circle';
  }

  getP2(): PointObject {
    return this.P2;
  }

  compute(): void {
    this.r = MathUtils.distance(
      this.P1.getX(),
      this.P1.getY(),
      this.P2.getX(),
      this.P2.getY(),
    );
  }
}
