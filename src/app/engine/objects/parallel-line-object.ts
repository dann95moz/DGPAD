import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Recta Paralela que pasa por un punto P1 y sigue la dirección de otra recta/segmento L.
 * Migrado desde ParallelLineObject.js
 */
export class ParallelLineObject extends PrimitiveLineObject {
  protected referenceLine: PrimitiveLineObject;

  constructor(
    construction: IConstruction,
    name: string,
    throughPoint: PointObject,
    referenceLine: PrimitiveLineObject,
  ) {
    super(construction, name, throughPoint);
    this.referenceLine = referenceLine;
    this.setParent(throughPoint, referenceLine);
  }

  override getCode(): string {
    return 'parallel';
  }

  getReferenceLine(): PrimitiveLineObject {
    return this.referenceLine;
  }

  override compute(): void {
    this.dx = this.referenceLine.getDX();
    this.dy = this.referenceLine.getDY();
    super.compute();
  }
}

/**
 * Recta Perpendicular que pasa por un punto P1 y es ortogonal a otra recta/segmento L.
 * Migrado desde PlumbObject.js
 */
export class PlumbLineObject extends PrimitiveLineObject {
  protected referenceLine: PrimitiveLineObject;

  constructor(
    construction: IConstruction,
    name: string,
    throughPoint: PointObject,
    referenceLine: PrimitiveLineObject,
  ) {
    super(construction, name, throughPoint);
    this.referenceLine = referenceLine;
    this.setParent(throughPoint, referenceLine);
  }

  override getCode(): string {
    return 'plumb';
  }

  getReferenceLine(): PrimitiveLineObject {
    return this.referenceLine;
  }

  override compute(): void {
    this.dx = this.referenceLine.getDY();
    this.dy = -this.referenceLine.getDX();
    super.compute();
  }
}
