import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Mediatriz del segmento definido por los puntos A1 y A2.
 * Migrado desde PerpBisectorObject.js
 */
export class PerpBisectorObject extends PrimitiveLineObject {
  protected A1: PointObject;
  protected A2: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    a1: PointObject,
    a2: PointObject,
  ) {
    // El punto medio virtual sirve como punto de referencia P1
    const midX = (a1.getX() + a2.getX()) / 2;
    const midY = (a1.getY() + a2.getY()) / 2;
    const virtualMid = new PointObject(construction, '_mid', midX, midY, true);

    super(construction, name, virtualMid);
    this.A1 = a1;
    this.A2 = a2;
    this.setParent(a1, a2);
  }

  override getCode(): string {
    return 'perpbis';
  }

  override compute(): void {
    const xA = this.A1.getX();
    const yA = this.A1.getY();
    const xB = this.A2.getX();
    const yB = this.A2.getY();

    this.P1.setXY((xA + xB) / 2, (yA + yB) / 2);
    this.dx = yA - yB;
    this.dy = xB - xA;
    super.compute();
  }
}

/**
 * Bisectriz del ángulo formado por los puntos P1, Vértice P2, P3.
 * Migrado desde AngleBisectorObject.js
 */
export class AngleBisectorObject extends PrimitiveLineObject {
  protected P1_point: PointObject;
  protected P3_point: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    vertex: PointObject,
    p3: PointObject,
  ) {
    super(construction, name, vertex);
    this.P1_point = p1;
    this.P3_point = p3;
    this.setParent(p1, vertex, p3);
  }

  override getCode(): string {
    return 'anglebis';
  }

  override compute(): void {
    const b = MathUtils.distance(this.P1.getX(), this.P1.getY(), this.P1_point.getX(), this.P1_point.getY());
    const a = MathUtils.distance(this.P1.getX(), this.P1.getY(), this.P3_point.getX(), this.P3_point.getY());

    if (a + b === 0) return;

    const k = b / (a + b);
    const x = this.P1_point.getX() + k * (this.P3_point.getX() - this.P1_point.getX());
    const y = this.P1_point.getY() + k * (this.P3_point.getY() - this.P1_point.getY());

    this.dx = x - this.P1.getX();
    this.dy = y - this.P1.getY();
    super.compute();
  }
}
