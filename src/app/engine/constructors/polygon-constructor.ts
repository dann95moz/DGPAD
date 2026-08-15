import { AreaObject } from '../objects/area-object';
import { PointObject } from '../objects/point-object';
import { BaseConstructor, ConstructorEvent } from './base-constructor';

/**
 * Constructor interactivo para polígonos cerrados.
 * Migrado desde AreaConstructor.js
 */
export class PolygonConstructor extends BaseConstructor {
  getToolName(): string {
    return 'polygon';
  }

  onMouseDown(event: ConstructorEvent): void {
    const pt = this.getOrCreatePoint(event);

    // Si hace clic en el primer punto inicial y hay al menos 3 vértices, cerrar polígono
    if (this.selectedPoints.length >= 3 && pt === this.selectedPoints[0]) {
      const area = new AreaObject(this.construction, 'poly', this.selectedPoints);
      this.construction.addObject(area);
      this.construction.computeAll();
      this.selectedPoints = [];
      return;
    }

    if (!this.selectedPoints.includes(pt)) {
      this.selectedPoints.push(pt);
    }
  }

  onMouseMove(_event: ConstructorEvent): void {
    // Dibujar línea temporal al cursor
  }

  onMouseUp(_event: ConstructorEvent): void {
    // No-op
  }
}
