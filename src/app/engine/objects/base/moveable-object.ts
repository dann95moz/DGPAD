import { ConstructionObject, IConstruction } from './construction-object';

/**
 * Clase base para objetos que pueden ser arrastrados por el usuario.
 * Migrado desde MoveableObject.js
 */
export abstract class MoveableObject extends ConstructionObject {
  protected startDragX = 0;
  protected startDragY = 0;

  constructor(construction: IConstruction, name: string) {
    super(construction, name);
  }

  abstract isMoveable(): boolean;
  abstract dragObject(x: number, y: number): void;
  abstract computeDrag(): void;

  startDrag(x: number, y: number): void {
    this.startDragX = x;
    this.startDragY = y;
  }

  dragTo(x: number, y: number): void {
    if (!this.isMoveable()) return;
    this.dragObject(x, y);
    this.computeDrag();
  }
}
