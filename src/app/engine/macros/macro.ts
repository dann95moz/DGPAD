import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';

export type MacroExecFn = (
  construction: Construction,
  inputs: ConstructionObject[],
) => ConstructionObject[] | void;

export interface MacroDefinition {
  id: string;
  name: string;
  parameters: string[]; // Tipos requeridos de parámetros iniciales (ej: ['point', 'point'])
  description?: string;
  exec?: MacroExecFn;
  execCode?: string;
}

/**
 * Macro paramétrica de construcción geométrica.
 * Migrado desde Macro.js
 */
export class Macro {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly parameters: string[];
  readonly exec?: MacroExecFn;
  readonly execCode?: string;

  constructor(def: MacroDefinition) {
    this.id = def.id;
    this.name = def.name;
    this.description = def.description;
    this.parameters = def.parameters;
    this.exec = def.exec;
    this.execCode = def.execCode;
  }

  getShortName(): string {
    const parts = this.name.split('/');
    return parts[parts.length - 1];
  }

  getParameterCount(): number {
    return this.parameters.length;
  }

  execute(construction: Construction, initialObjects: ConstructionObject[]): ConstructionObject[] | void {
    if (initialObjects.length < this.parameters.length) {
      throw new Error(`Macro ${this.name} requires ${this.parameters.length} parameters, got ${initialObjects.length}`);
    }

    if (this.exec) {
      const res = this.exec(construction, initialObjects);
      construction.computeAll();
      return res;
    }

    if (this.execCode) {
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function('cn', 'params', this.execCode);
        const res = fn(construction, initialObjects);
        construction.computeAll();
        return res;
      } catch (e) {
        console.error(`Error executing macro ${this.name}:`, e);
      }
    }
  }
}
