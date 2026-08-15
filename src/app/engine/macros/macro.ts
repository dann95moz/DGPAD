import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';

export interface MacroDefinition {
  id: string;
  name: string;
  parameters: string[]; // Tipos requeridos de parámetros iniciales (ej: ['point', 'point'])
  execCode: string;
}

/**
 * Macro paramétrica de construcción geométrica.
 * Migrado desde Macro.js
 */
export class Macro {
  readonly id: string;
  readonly name: string;
  readonly parameters: string[];
  readonly execCode: string;

  constructor(def: MacroDefinition) {
    this.id = def.id;
    this.name = def.name;
    this.parameters = def.parameters;
    this.execCode = def.execCode;
  }

  getShortName(): string {
    const parts = this.name.split('/');
    return parts[parts.length - 1];
  }

  getParameterCount(): number {
    return this.parameters.length;
  }

  execute(construction: Construction, initialObjects: ConstructionObject[]): void {
    if (initialObjects.length < this.parameters.length) {
      throw new Error(`Macro ${this.name} requires ${this.parameters.length} parameters, got ${initialObjects.length}`);
    }

    // Ejecución segura de macro
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('cn', 'params', this.execCode);
      fn(construction, initialObjects);
      construction.computeAll();
    } catch (e) {
      console.error(`Error executing macro ${this.name}:`, e);
    }
  }
}
