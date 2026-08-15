import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';
import { Macro, MacroDefinition } from './macro';

/**
 * Gestor de almacenamiento y ejecución de macros paramétricas.
 * Migrado desde MacrosManager.js
 */
export class MacroManager {
  private macros: Map<string, Macro> = new Map();
  private construction: Construction;

  constructor(construction: Construction) {
    this.construction = construction;
  }

  registerMacro(def: MacroDefinition): Macro {
    const m = new Macro(def);
    this.macros.set(m.id, m);
    return m;
  }

  getMacro(id: string): Macro | undefined {
    return this.macros.get(id);
  }

  getAllMacros(): Macro[] {
    return Array.from(this.macros.values());
  }

  removeMacro(id: string): boolean {
    return this.macros.delete(id);
  }

  clear(): void {
    this.macros.clear();
  }

  execute(id: string, initialObjects: ConstructionObject[]): void {
    const m = this.getMacro(id);
    if (!m) {
      throw new Error(`Macro with id "${id}" not found`);
    }
    m.execute(this.construction, initialObjects);
  }
}
