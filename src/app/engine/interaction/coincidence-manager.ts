import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';

export interface CoincidentCandidate {
  label: string;
  object: ConstructionObject;
  color: string;
}

/**
 * Gestor de resolución de coincidencias cuando múltiples objetos geométricos
 * se solapan bajo el puntero/toque táctil.
 * Migrado desde CoincidenceManager.js
 */
export class CoincidenceManager {
  private construction: Construction;

  constructor(construction: Construction) {
    this.construction = construction;
  }

  private getPriority(obj: ConstructionObject): number {
    switch (obj.getFamily()) {
      case 'point':
        return 0;
      case 'line':
        return 1;
      case 'circle':
        return 2;
      case 'angle':
        return 3;
      case 'area':
        return 4;
      default:
        return 10;
    }
  }

  /**
   * Obtiene los candidatos coincidentes bajo las coordenadas (x, y)
   */
  findCoincidences(px: number, py: number): CoincidentCandidate[] {
    const under = this.construction.getObjectsUnderPoint(px, py);
    if (under.length < 2) return [];

    // Ordenar por prioridad geométrica
    under.sort((a, b) => this.getPriority(a) - this.getPriority(b));

    // Filtrar familia con mayor prioridad
    const topPriority = this.getPriority(under[0]);
    const candidates = under.filter((o) => this.getPriority(o) === topPriority);

    if (candidates.length < 2) return [];

    return candidates.map((obj) => ({
      label: `${obj.getName()}: ${obj.getCode()}`,
      object: obj,
      color: obj.isVisible() ? obj.getColor().getHEX() : '#777777',
    }));
  }
}
