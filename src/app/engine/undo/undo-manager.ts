import { Construction } from '../construction/construction';
import { ConstructionObject } from '../objects/base/construction-object';

export type UndoActionType = 'ADD' | 'REMOVE' | 'MODIFY' | 'VISIBILITY';

export interface UndoAction {
  type: UndoActionType;
  target?: ConstructionObject | ConstructionObject[];
  prop?: string;
  oldValue?: unknown;
  newValue?: unknown;
  targets?: ConstructionObject[];
  oldStates?: number[];
  newStates?: number[];
}

/**
 * Gestor de Deshacer / Rehacer (Undo / Redo) para operaciones geométricas y cambios de estado.
 * Migrado desde UndoManager.js
 */
export class UndoManager {
  private construction: Construction;
  private actions: UndoAction[] = [];
  private cursor = 0;
  private isApplying = false;

  constructor(construction: Construction) {
    this.construction = construction;
  }

  canUndo(): boolean {
    return this.cursor > 0;
  }

  canRedo(): boolean {
    return this.cursor < this.actions.length;
  }

  recordAdd(elts: ConstructionObject | ConstructionObject[]): void {
    if (this.isApplying) return;
    this.actions.splice(this.cursor);
    this.actions.push({ type: 'ADD', target: elts });
    this.cursor += 1;
  }

  recordRemove(elts: ConstructionObject | ConstructionObject[]): void {
    if (this.isApplying) return;
    this.actions.splice(this.cursor);
    this.actions.push({ type: 'REMOVE', target: elts });
    this.cursor += 1;
  }

  recordPropertyChange(
    obj: ConstructionObject,
    prop: string,
    oldValue: unknown,
    newValue: unknown,
  ): void {
    if (this.isApplying) return;
    this.actions.splice(this.cursor);
    this.actions.push({
      type: 'MODIFY',
      target: obj,
      prop,
      oldValue,
      newValue,
    });
    this.cursor += 1;
  }

  recordVisibility(obj: ConstructionObject, nextHidden: number): void {
    if (this.isApplying) return;
    this.actions.splice(this.cursor);
    this.actions.push({
      type: 'VISIBILITY',
      targets: [obj],
      oldStates: [obj.getHidden()],
      newStates: [nextHidden],
    });
    this.cursor += 1;
  }

  undo(): void {
    if (this.cursor <= 0) return;
    this.isApplying = true;
    this.cursor -= 1;
    const action = this.actions[this.cursor];

    switch (action.type) {
      case 'ADD': {
        const targets = Array.isArray(action.target) ? action.target : [action.target!];
        for (const t of targets) {
          this.construction.removeObject(t);
        }
        action.type = 'REMOVE';
        break;
      }
      case 'REMOVE': {
        const targets = Array.isArray(action.target) ? action.target : [action.target!];
        for (const t of targets) {
          this.construction.addObject(t);
        }
        action.type = 'ADD';
        break;
      }
      case 'MODIFY': {
        const target = action.target as any;
        if (target && action.prop) {
          const setter = `set${action.prop.charAt(0).toUpperCase() + action.prop.slice(1)}`;
          if (typeof target[setter] === 'function') {
            target[setter](action.oldValue);
          }
        }
        [action.oldValue, action.newValue] = [action.newValue, action.oldValue];
        break;
      }
      case 'VISIBILITY': {
        if (action.targets && action.oldStates && action.newStates) {
          for (let i = 0; i < action.targets.length; i++) {
            action.targets[i].setHidden(action.oldStates[i]);
          }
          [action.oldStates, action.newStates] = [action.newStates, action.oldStates];
        }
        break;
      }
    }

    this.construction.computeAll();
    this.isApplying = false;
  }

  redo(): void {
    if (this.cursor >= this.actions.length) return;
    this.isApplying = true;
    const action = this.actions[this.cursor];

    switch (action.type) {
      case 'REMOVE': {
        const targets = Array.isArray(action.target) ? action.target : [action.target!];
        for (const t of targets) {
          this.construction.addObject(t);
        }
        action.type = 'ADD';
        break;
      }
      case 'ADD': {
        const targets = Array.isArray(action.target) ? action.target : [action.target!];
        for (const t of targets) {
          this.construction.removeObject(t);
        }
        action.type = 'REMOVE';
        break;
      }
      case 'MODIFY': {
        const target = action.target as any;
        if (target && action.prop) {
          const setter = `set${action.prop.charAt(0).toUpperCase() + action.prop.slice(1)}`;
          if (typeof target[setter] === 'function') {
            target[setter](action.oldValue);
          }
        }
        [action.oldValue, action.newValue] = [action.newValue, action.oldValue];
        break;
      }
      case 'VISIBILITY': {
        if (action.targets && action.oldStates && action.newStates) {
          for (let i = 0; i < action.targets.length; i++) {
            action.targets[i].setHidden(action.oldStates[i]);
          }
          [action.oldStates, action.newStates] = [action.newStates, action.oldStates];
        }
        break;
      }
    }

    this.cursor += 1;
    this.construction.computeAll();
    this.isApplying = false;
  }

  clear(): void {
    this.actions = [];
    this.cursor = 0;
  }
}
