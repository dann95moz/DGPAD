import { PointObject } from '../objects/point-object';
import { BaseConstructor, ConstructorEvent } from './base-constructor';

/**
 * Constructor interactivo para crear puntos libres o sobre objetos.
 * Migrado desde PointConstructor.js
 */
export class PointConstructor extends BaseConstructor {
  getToolName(): string {
    return 'point';
  }

  onMouseDown(event: ConstructorEvent): void {
    if (!event.target) {
      const pt = new PointObject(this.construction, 'P', event.x, event.y);
      this.construction.addObject(pt);
      this.construction.computeAll();
    }
  }

  onMouseMove(_event: ConstructorEvent): void {
    // Feedback visual o resaltado
  }

  onMouseUp(_event: ConstructorEvent): void {
    // Finalizar acción
  }
}
