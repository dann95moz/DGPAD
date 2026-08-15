import { MathUtils } from '../../core/math-utils';
import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto geométrico Ángulo definido por 3 puntos (A, Vértice, C).
 * Migrado desde AngleObject.js
 */
export class AngleObject extends ConstructionObject {
  protected A: PointObject;
  protected vertex: PointObject;
  protected C: PointObject;
  protected value = 0; // Valor del ángulo en radianes
  protected angle360 = false;

  constructor(
    construction: IConstruction,
    name: string,
    a: PointObject,
    vertex: PointObject,
    c: PointObject,
  ) {
    super(construction, name);
    this.A = a;
    this.vertex = vertex;
    this.C = c;
    this.size = 2;
    this.color.set('#006633');
    this.fillcolor.set('rgba(0,102,51,0.2)');
    this.setParent(a, vertex, c);
  }

  getCode(): string {
    return 'angle';
  }

  getFamily(): string {
    return 'angle';
  }

  getA(): PointObject {
    return this.A;
  }

  getVertex(): PointObject {
    return this.vertex;
  }

  getC(): PointObject {
    return this.C;
  }

  getValue(): number {
    return this.value;
  }

  getValueDegrees(): number {
    return (this.value * 180) / Math.PI;
  }

  isAngle360(): boolean {
    return this.angle360;
  }

  setAngle360(val: boolean): void {
    this.angle360 = val;
  }

  compute(): void {
    const params = MathUtils.computeAngleParams(
      this.A.getX(),
      this.A.getY(),
      this.vertex.getX(),
      this.vertex.getY(),
      this.C.getX(),
      this.C.getY(),
    );

    this.value = this.angle360 ? params.aoc : params.aoc180;
  }

  isNear(x: number, y: number, tolerance = 10): boolean {
    const r = 30;
    const d = MathUtils.distance(this.vertex.getX(), this.vertex.getY(), x, y);
    return Math.abs(d - r) < tolerance;
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    const params = MathUtils.computeAngleParams(
      this.A.getX(),
      this.A.getY(),
      this.vertex.getX(),
      this.vertex.getY(),
      this.C.getX(),
      this.C.getY(),
    );

    const vx = this.vertex.getX();
    const vy = this.vertex.getY();
    const r = 25;

    ctx.beginPath();
    ctx.moveTo(vx, vy);
    ctx.arc(vx, vy, r, params.startAngle, params.endAngle, !params.trigo);
    ctx.closePath();

    ctx.fillStyle = this.fillcolor.getRGBA();
    ctx.fill();

    ctx.strokeStyle = this.color.getRGBA();
    ctx.stroke();
  }
}
