import { Construction } from '../construction/construction';
import { Point2D } from '../core/math-utils';
import { AreaObject } from '../objects/area-object';
import { CircleObject } from '../objects/circle-object';
import { PointObject } from '../objects/point-object';
import { SegmentObject } from '../objects/segment-object';



/**
 * Reconocedor de trazos a mano alzada (Gesture recognizer) para figuras geométricas.
 * Migrado desde Ghost.js
 */
export class GhostRecognizer {
  private construction: Construction;
  private path: Point2D[] = [];
  private active = false;

  constructor(construction: Construction) {
    this.construction = construction;
  }

  start(x: number, y: number): void {
    this.path = [{ x, y }];
    this.active = true;
  }

  addPoint(x: number, y: number): void {
    if (!this.active) return;
    this.path.push({ x, y });
  }

  clear(): void {
    this.path = [];
    this.active = false;
  }

  finish(): void {
    if (!this.active || this.path.length < 5) {
      this.clear();
      return;
    }

    const first = this.path[0];
    const last = this.path[this.path.length - 1];
    const dx = last.x - first.x;
    const dy = last.y - first.y;
    const closedDist = Math.sqrt(dx * dx + dy * dy);

    // Si el trazo es cerrado (< 25px entre inicio y fin)
    if (closedDist < 25 && this.path.length > 15) {
      // Calcular centro aproximado
      let sumX = 0;
      let sumY = 0;
      for (const p of this.path) {
        sumX += p.x;
        sumY += p.y;
      }
      const cx = sumX / this.path.length;
      const cy = sumY / this.path.length;

      // Calcular radio medio y varianza
      let totalR = 0;
      for (const p of this.path) {
        totalR += Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
      }
      const avgR = totalR / this.path.length;

      // Crear círculo
      const centerPt = new PointObject(this.construction, 'O', cx, cy);
      const edgePt = new PointObject(this.construction, 'P', cx + avgR, cy);
      const circle = new CircleObject(this.construction, 'c', centerPt, edgePt);

      this.construction.addObject(centerPt);
      this.construction.addObject(edgePt);
      this.construction.addObject(circle);
    } else {
      // Trazo lineal: crear segmento
      const p1 = new PointObject(this.construction, 'A', first.x, first.y);
      const p2 = new PointObject(this.construction, 'B', last.x, last.y);
      const seg = new SegmentObject(this.construction, 's', p1, p2);

      this.construction.addObject(p1);
      this.construction.addObject(p2);
      this.construction.addObject(seg);
    }

    this.construction.computeAll();
    this.clear();
  }

  paint(ctx: CanvasRenderingContext2D): void {
    if (this.path.length < 2) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.path[0].x, this.path[0].y);
    for (let i = 1; i < this.path.length; i++) {
      ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }
}
