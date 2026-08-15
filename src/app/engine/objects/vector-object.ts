import { MathUtils } from '../core/math-utils';
import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { SegmentObject } from './segment-object';

/**
 * Objeto geométrico Vector con punta de flecha orientada de P1 a P2.
 * Migrado desde VectorObject.js
 */
export class VectorObject extends SegmentObject {
  constructor(
    construction: IConstruction,
    name: string,
    p1: PointObject,
    p2: PointObject,
  ) {
    super(construction, name, p1, p2);
    this.color.set('#006633');
    this.size = 2;
  }

  override getCode(): string {
    return 'vector';
  }

  override getFamily(): string {
    return 'line';
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    const x1 = this.P1.getX();
    const y1 = this.P1.getY();
    const x2 = this.P2.getX();
    const y2 = this.P2.getY();

    const headlen = 16;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.save();
    ctx.strokeStyle = this.color.getRGBA();
    ctx.fillStyle = this.color.getRGBA();
    ctx.lineWidth = this.size;

    // Cuerpo del vector
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 - headlen * Math.cos(angle), y2 - headlen * Math.sin(angle));
    ctx.stroke();

    // Punta de flecha
    const c1 = Math.cos(angle - Math.PI / 7);
    const s1 = Math.sin(angle - Math.PI / 7);
    const c2 = Math.cos(angle + Math.PI / 7);
    const s2 = Math.sin(angle + Math.PI / 7);

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
    ctx.lineTo(x2 - headlen * c2, y2 - headlen * s2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
