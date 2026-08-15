import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Recta definida por dos puntos.
 * Migrado desde TwoPointsLineObject.js
 */
export class TwoPointsLineObject extends PrimitiveLineObject {
  protected P2: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
  ) {
    super(construction, name, p1);
    this.P2 = p2;
    this.setParent(p1, p2);
  }

  getCode(): string {
    return 'line';
  }

  getP2(): PointObject {
    return this.P2;
  }

  override compute(): void {
    this.dx = this.P2.getX() - this.P1.getX();
    this.dy = this.P2.getY() - this.P1.getY();
    super.compute();
  }
}
