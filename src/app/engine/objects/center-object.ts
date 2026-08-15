import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveCircleObject } from './primitive-circle-object';

/**
 * Punto centro dependiente de un círculo o cónica.
 * Migrado desde CenterObject.js
 */
export class CenterObject extends PointObject {
  protected circleParent: PrimitiveCircleObject;

  constructor(
    construction: IConstruction,
    name: string,
    circle: PrimitiveCircleObject,
  ) {
    super(construction, name, circle.getP1().getX(), circle.getP1().getY(), true);
    this.circleParent = circle;
    this.setParent(circle);
    this.size = 4;
  }

  override getCode(): string {
    return 'center';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    this.setXY(this.circleParent.getP1().getX(), this.circleParent.getP1().getY());
  }
}
