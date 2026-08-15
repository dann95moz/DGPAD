import { MathUtils } from '../../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Semirrecta con origen en P1 y pasando por P2.
 * Migrado desde RayObject.js
 */
export class RayObject extends PrimitiveLineObject {
  protected P2: PointObject;

  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
  ) {
    super(construction, name, p1);
    this.P2 = p2;
    this.color.set('#993300');
    this.setParent(p1, p2);
  }

  getCode(): string {
    return 'ray';
  }

  getP2(): PointObject {
    return this.P2;
  }

  override compute(): void {
    this.dx = this.P2.getX() - this.P1.getX();
    this.dy = this.P2.getY() - this.P1.getY();
    const norm = MathUtils.normalize(0, 0, this.dx, this.dy);
    this.ndx = norm.x;
    this.ndy = norm.y;

    const width = 2000;
    const height = 2000;
    const bounds = MathUtils.computeBorderPoints(
      this.P1.getX(),
      this.P1.getY(),
      this.ndx,
      this.ndy,
      width,
      height,
    );

    this.xmin = this.P1.getX();
    this.ymin = this.P1.getY();
    this.xmax = bounds[2];
    this.ymax = bounds[3];
  }

  override isNear(x: number, y: number, tolerance = 6): boolean {
    const xA = this.P1.getX();
    const yA = this.P1.getY();
    const xB = this.P2.getX();
    const yB = this.P2.getY();

    const dx = xB - xA;
    const dy = yB - yA;

    // Verificar si el punto está en la dirección positiva de la semirrecta
    const dot = (x - xA) * dx + (y - yA) * dy;
    if (dot < 0) return false;

    return MathUtils.isNearToLine(xA, yA, dx, dy, x, y, Math.max(this.size, tolerance));
  }
}
