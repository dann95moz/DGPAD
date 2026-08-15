import { CoordsSystem } from '../core/coords-system';
import { TrackManager } from '../core/track-manager';
import { ConstructionObject, IConstruction } from '../objects/base/construction-object';
import { PointObject } from '../objects/point-object';

/**
 * Gestor del grafo de construcción geométrica.
 * Migrado desde Construction.js
 */
export class Construction implements IConstruction {
  private objects: ConstructionObject[] = [];
  private coordsSystem: CoordsSystem;
  private trackManager: TrackManager;
  private serialCounter = 0;

  constructor(width = 800, height = 600) {
    this.coordsSystem = new CoordsSystem(width, height);
    this.trackManager = new TrackManager();
    this.trackManager.resize(width, height);
  }

  getCoordsSystem(): CoordsSystem {
    return this.coordsSystem;
  }

  getTrackManager(): TrackManager {
    return this.trackManager;
  }

  getSerial(): number {
    this.serialCounter += 1;
    return this.serialCounter;
  }

  addObject(obj: ConstructionObject): void {
    if (!this.objects.includes(obj)) {
      this.objects.push(obj);
    }
  }

  removeObject(obj: ConstructionObject): void {
    const idx = this.objects.indexOf(obj);
    if (idx >= 0) {
      this.objects.splice(idx, 1);
    }
  }

  safelyDelete(obj: ConstructionObject): void {
    // Eliminar recursivamente hijos dependientes
    const children = obj.getChildren().slice();
    for (const child of children) {
      this.safelyDelete(child);
    }

    // Desconectar de los padres
    for (const parent of obj.getParents()) {
      parent.removeChild(obj);
    }

    this.removeObject(obj);
  }

  elements(): ConstructionObject[] {
    return this.objects;
  }

  getListObject(): ConstructionObject[] {
    return this.objects;
  }

  find(name: string): ConstructionObject | null {
    const clean = name.trim().toLowerCase();
    for (const obj of this.objects) {
      if (obj.getName().toLowerCase() === clean) {
        return obj;
      }
    }
    return null;
  }

  findFreePoints(obj?: ConstructionObject): PointObject[] {
    return this.objects.filter(
      (item): item is PointObject => item instanceof PointObject && item.free() && item !== obj,
    );
  }

  getObjectsUnderPoint(x: number, y: number, tolerance = 8): ConstructionObject[] {
    return this.objects.filter((obj) => obj.isVisible() && obj.isNear(x, y, tolerance));
  }

  findObjectsAt(x: number, y: number, tolerance = 8): ConstructionObject[] {
    return this.getObjectsUnderPoint(x, y, tolerance);
  }

  getNames(): string[] {
    return this.objects.map((obj) => obj.getName());
  }

  getUnusedName(nameProposal: string, _obj: ConstructionObject): string {
    if (!nameProposal) {
      nameProposal = 'P';
    }

    const existing = new Set(this.getNames());
    if (!existing.has(nameProposal)) {
      return nameProposal;
    }

    let i = 1;
    while (existing.has(`${nameProposal}${i}`)) {
      i += 1;
    }
    return `${nameProposal}${i}`;
  }

  compute(): void {
    for (const obj of this.objects) {
      obj.compute();
    }
  }

  computeAll(): void {
    this.compute();
  }

  paint(ctx: CanvasRenderingContext2D): void {
    // Dibujar capas ordenadas (de menor layer a mayor layer)
    const sorted = this.objects.slice().sort((a, b) => a.getLayer() - b.getLayer());
    for (const obj of sorted) {
      obj.paint(ctx);
    }
  }

  clear(): void {
    this.objects = [];
    this.trackManager.clear();
  }
}
