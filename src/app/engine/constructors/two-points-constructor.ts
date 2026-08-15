import { CircleObject } from '../objects/circle-object';
import { TwoPointsLineObject } from '../objects/line-object';
import { MidPointObject } from '../objects/midpoint-object';
import { RayObject } from '../objects/ray-object';
import { SegmentObject } from '../objects/segment-object';
import { BaseConstructor, ConstructorEvent } from './base-constructor';

export type TwoPointsKind = 'segment' | 'line' | 'ray' | 'circle' | 'midpoint';

/**
 * Constructor interactivo genérico para herramientas que requieren 2 puntos.
 * Migrado desde SegmentConstructor, LineConstructor, RayConstructor, CircleConstructor, MidPointConstructor.
 */
export class TwoPointsConstructor extends BaseConstructor {
  private kind: TwoPointsKind;

  constructor(construction: any, kind: TwoPointsKind) {
    super(construction);
    this.kind = kind;
  }

  getToolName(): string {
    return this.kind;
  }

  onMouseDown(event: ConstructorEvent): void {
    const pt = this.getOrCreatePoint(event);
    this.selectedPoints.push(pt);

    if (this.selectedPoints.length === 2) {
      const p1 = this.selectedPoints[0];
      const p2 = this.selectedPoints[1];

      switch (this.kind) {
        case 'segment': {
          const seg = new SegmentObject(this.construction, 's', p1, p2);
          this.construction.addObject(seg);
          break;
        }
        case 'line': {
          const line = new TwoPointsLineObject(this.construction, 'r', p1, p2);
          this.construction.addObject(line);
          break;
        }
        case 'ray': {
          const ray = new RayObject(this.construction, 'sr', p1, p2);
          this.construction.addObject(ray);
          break;
        }
        case 'circle': {
          const circ = new CircleObject(this.construction, 'c', p1, p2);
          this.construction.addObject(circ);
          break;
        }
        case 'midpoint': {
          const mid = new MidPointObject(this.construction, 'M', p1, p2);
          this.construction.addObject(mid);
          break;
        }
      }

      this.construction.computeAll();
      this.selectedPoints = [];
    }
  }

  onMouseMove(_event: ConstructorEvent): void {
    // Renderizado preliminar en vivo
  }

  onMouseUp(_event: ConstructorEvent): void {
    // No-op
  }
}
