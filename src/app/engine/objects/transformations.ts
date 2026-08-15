import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Traslación de un punto según un vector definido por (pOrig, pDest).
 * Migrado desde TransPointObject.js / TranslationObject.js
 */
export class TransformedPointTranslation extends PointObject {
  protected sourcePoint: PointObject;
  protected vectorOrigin: PointObject;
  protected vectorDest: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    sourcePoint: PointObject,
    vectorOrigin: PointObject,
    vectorDest: PointObject,
  ) {
    super(construction, name, 0, 0, true);
    this.sourcePoint = sourcePoint;
    this.vectorOrigin = vectorOrigin;
    this.vectorDest = vectorDest;
    this.setParent(sourcePoint, vectorOrigin, vectorDest);
  }

  override getCode(): string {
    return 'trans_point';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const vx = this.vectorDest.getX() - this.vectorOrigin.getX();
    const vy = this.vectorDest.getY() - this.vectorOrigin.getY();
    this.setXY(this.sourcePoint.getX() + vx, this.sourcePoint.getY() + vy);
  }
}

/**
 * Rotación de un punto alrededor de un centro con un ángulo determinado.
 * Migrado desde RotationPointObject.js / RotationObject.js
 */
export class TransformedPointRotation extends PointObject {
  protected sourcePoint: PointObject;
  protected center: PointObject;
  protected angleRad: number;

  constructor(
    construction: IConstruction,
    name: string,
    sourcePoint: PointObject,
    center: PointObject,
    angleRad = Math.PI / 2,
  ) {
    super(construction, name, 0, 0, true);
    this.sourcePoint = sourcePoint;
    this.center = center;
    this.angleRad = angleRad;
    this.setParent(sourcePoint, center);
  }

  override getCode(): string {
    return 'rotation_point';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const cx = this.center.getX();
    const cy = this.center.getY();
    const px = this.sourcePoint.getX();
    const py = this.sourcePoint.getY();

    const dx = px - cx;
    const dy = py - cy;

    const cos = Math.cos(this.angleRad);
    const sin = Math.sin(this.angleRad);

    this.setXY(cx + dx * cos - dy * sin, cy + dx * sin + dy * cos);
  }
}

/**
 * Homotecia de un punto respecto a un centro con una razón k.
 * Migrado desde HomoPointObject.js / HomothetyObject.js
 */
export class TransformedPointHomothety extends PointObject {
  protected sourcePoint: PointObject;
  protected center: PointObject;
  protected ratio: number;

  constructor(
    construction: IConstruction,
    name: string,
    sourcePoint: PointObject,
    center: PointObject,
    ratio = 2,
  ) {
    super(construction, name, 0, 0, true);
    this.sourcePoint = sourcePoint;
    this.center = center;
    this.ratio = ratio;
    this.setParent(sourcePoint, center);
  }

  override getCode(): string {
    return 'homo_point';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const cx = this.center.getX();
    const cy = this.center.getY();
    const px = this.sourcePoint.getX();
    const py = this.sourcePoint.getY();

    this.setXY(cx + (px - cx) * this.ratio, cy + (py - cy) * this.ratio);
  }
}

/**
 * Simetría Central (reflexión respecto a un punto centro).
 * Migrado desde SymcPointObject.js
 */
export class TransformedPointCentralSymmetry extends PointObject {
  protected sourcePoint: PointObject;
  protected center: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    sourcePoint: PointObject,
    center: PointObject,
  ) {
    super(construction, name, 0, 0, true);
    this.sourcePoint = sourcePoint;
    this.center = center;
    this.setParent(sourcePoint, center);
  }

  override getCode(): string {
    return 'symc_point';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const cx = this.center.getX();
    const cy = this.center.getY();
    const px = this.sourcePoint.getX();
    const py = this.sourcePoint.getY();

    this.setXY(2 * cx - px, 2 * cy - py);
  }
}

/**
 * Simetría Axial (reflexión respecto a una recta/eje).
 * Migrado desde SymaPointObject.js
 */
export class TransformedPointAxialSymmetry extends PointObject {
  protected sourcePoint: PointObject;
  protected axis: PrimitiveLineObject;

  constructor(
    construction: IConstruction,
    name: string,
    sourcePoint: PointObject,
    axis: PrimitiveLineObject,
  ) {
    super(construction, name, 0, 0, true);
    this.sourcePoint = sourcePoint;
    this.axis = axis;
    this.setParent(sourcePoint, axis);
  }

  override getCode(): string {
    return 'syma_point';
  }

  override free(): boolean {
    return false;
  }

  override isMoveable(): boolean {
    return false;
  }

  override compute(): void {
    const px = this.sourcePoint.getX();
    const py = this.sourcePoint.getY();
    const ax = this.axis.getP1().getX();
    const ay = this.axis.getP1().getY();
    const dx = this.axis.getDX();
    const dy = this.axis.getDY();

    const d2 = dx * dx + dy * dy;
    if (d2 === 0) {
      this.setXY(px, py);
      return;
    }

    // Proyección sobre el eje
    const u = ((px - ax) * dx + (py - ay) * dy) / d2;
    const projX = ax + u * dx;
    const projY = ay + u * dy;

    // Reflejo: 2 * proyección - punto original
    this.setXY(2 * projX - px, 2 * projY - py);
  }
}
