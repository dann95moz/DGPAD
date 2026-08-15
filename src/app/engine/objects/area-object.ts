import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto geométrico Polígono / Área cerrada definida por N vértices.
 * Migrado desde AreaObject.js
 */
export class AreaObject extends ConstructionObject {
  protected points: PointObject[] = [];
  protected areaValue = 0;

  constructor(
    construction: IConstruction,
    name: string,
    points: PointObject[],
  ) {
    super(construction, name);
    this.points = points;
    this.size = 2;
    this.color.set('#006633');
    this.fillcolor.set('rgba(0,102,51,0.2)');
    this.setParent(...points);
  }

  getCode(): string {
    return 'area';
  }

  getFamily(): string {
    return 'area';
  }

  getPoints(): PointObject[] {
    return this.points;
  }

  getArea(): number {
    return this.areaValue;
  }

  compute(): void {
    if (this.points.length < 3) {
      this.areaValue = 0;
      return;
    }

    // Fórmula del área de Gauss / Shoelace formula
    let sum = 0;
    const n = this.points.length;
    for (let i = 0; i < n; i++) {
      const p1 = this.points[i];
      const p2 = this.points[(i + 1) % n];
      sum += p1.getX() * p2.getY() - p2.getX() * p1.getY();
    }
    this.areaValue = Math.abs(sum) / 2;
  }

  isNear(x: number, y: number): boolean {
    if (this.points.length < 3) return false;

    // Ray casting algorithm para punto dentro de polígono
    let inside = false;
    const n = this.points.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = this.points[i].getX();
      const yi = this.points[i].getY();
      const xj = this.points[j].getX();
      const yj = this.points[j].getY();

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    if (this.points.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(this.points[0].getX(), this.points[0].getY());
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].getX(), this.points[i].getY());
    }
    ctx.closePath();

    ctx.fillStyle = this.fillcolor.getRGBA();
    ctx.fill();

    ctx.strokeStyle = this.color.getRGBA();
    ctx.stroke();
  }
}
