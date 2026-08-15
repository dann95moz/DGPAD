import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Ángulo con valor o amplitud fija dada por una expresión o valor numérico.
 * Migrado desde FixedAngleObject.js
 */
export class FixedAngleObject extends PrimitiveLineObject {
  protected vertex: PointObject;
  protected referencePoint: PointObject;
  protected angleDeg: number;
  protected trigo: boolean;
  protected arcRadius = 30;

  constructor(
    construction: IConstruction,
    name: string,
    vertex: PointObject,
    referencePoint: PointObject,
    angleDeg = 45,
    trigo = true,
  ) {
    super(construction, name, vertex);
    this.vertex = vertex;
    this.referencePoint = referencePoint;
    this.angleDeg = angleDeg;
    this.trigo = trigo;
    this.setParent(vertex, referencePoint);
    this.color.set('#006633');
    this.fillcolor.set('rgba(0,102,51,0.2)');
  }

  override getCode(): string {
    return 'fixedangle';
  }

  getAngleDeg(): number {
    return this.angleDeg;
  }

  setAngleDeg(val: number): void {
    this.angleDeg = val;
  }

  isTrigo(): boolean {
    return this.trigo;
  }

  setTrigo(val: boolean): void {
    this.trigo = val;
  }

  override compute(): void {
    const vx = this.vertex.getX();
    const vy = this.vertex.getY();
    const rx = this.referencePoint.getX();
    const ry = this.referencePoint.getY();

    let rad = (this.angleDeg * Math.PI) / 180;
    if (!this.trigo) rad = -rad;

    const dx0 = rx - vx;
    const dy0 = ry - vy;

    this.dx = dx0 * Math.cos(rad) - dy0 * Math.sin(rad);
    this.dy = dx0 * Math.sin(rad) + dy0 * Math.cos(rad);

    super.compute();
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    super.paintObject(ctx);

    const vx = this.vertex.getX();
    const vy = this.vertex.getY();
    const baseAngle = MathUtils.angleH(this.referencePoint.getX() - vx, this.referencePoint.getY() - vy);
    let rad = (this.angleDeg * Math.PI) / 180;
    if (!this.trigo) rad = -rad;
    const endAngle = baseAngle + rad;

    ctx.save();
    ctx.fillStyle = this.fillcolor.getRGBA();
    ctx.beginPath();
    ctx.moveTo(vx, vy);
    ctx.arc(vx, vy, this.arcRadius, baseAngle, endAngle, !this.trigo);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
