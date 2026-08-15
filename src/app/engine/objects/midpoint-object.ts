import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Punto medio calculado a partir de dos puntos padres.
 * Migrado desde MidPointObject.js
 */
export class MidPointObject extends PointObject {
  protected P1: PointObject;
  protected P2: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
  ) {
    super(construction, name, (p1.getX() + p2.getX()) / 2, (p1.getY() + p2.getY()) / 2, true);
    this.P1 = p1;
    this.P2 = p2;
    this.setParent(p1, p2);
  }

  override getCode(): string {
    return 'midpoint';
  }

  getP1(): PointObject {
    return this.P1;
  }

  getP2(): PointObject {
    return this.P2;
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    this.x = (this.P1.getX() + this.P2.getX()) / 2;
    this.y = (this.P1.getY() + this.P2.getY()) / 2;
  }
}
