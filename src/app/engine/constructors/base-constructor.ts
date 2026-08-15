import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';
import { PointObject } from '../objects/point-object';

export interface ConstructorEvent {
  x: number; // Coordenada X en píxeles del canvas
  y: number; // Coordenada Y en píxeles del canvas
  target?: ConstructionObject; // Objeto bajo el cursor (si existe)
}

/**
 * Clase base para los constructores interactivos de herramientas de DGPad.
 * Migrado desde ObjectConstructor.js
 */
export abstract class BaseConstructor {
  protected construction: Construction;
  protected active = false;
  protected selectedPoints: PointObject[] = [];

  constructor(construction: Construction) {
    this.construction = construction;
  }

  abstract getToolName(): string;

  start(): void {
    this.active = true;
    this.selectedPoints = [];
  }

  cancel(): void {
    this.active = false;
    this.selectedPoints = [];
  }

  isActive(): boolean {
    return this.active;
  }

  abstract onMouseDown(event: ConstructorEvent): void;
  abstract onMouseMove(event: ConstructorEvent): void;
  abstract onMouseUp(event: ConstructorEvent): void;

  protected getOrCreatePoint(event: ConstructorEvent): PointObject {
    if (event.target instanceof PointObject) {
      return event.target;
    }
    const pt = new PointObject(this.construction, 'P', event.x, event.y);
    this.construction.addObject(pt);
    return pt;
  }
}
