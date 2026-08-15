import { ConstructionObject, IConstruction } from './base/construction-object';
import { ExpressionObject } from './expression-object';

/**
 * Objeto geométrico Lista (secuencia de puntos o segmentos generados).
 * Migrado desde ListObject.js
 */
export class ListObject extends ConstructionObject {
  protected expressionParent?: ExpressionObject;
  protected segmentsSize = 0; // 0: puntos, 1: segmentos conectados

  constructor(
    construction: IConstruction,
    name: string,
    expressionParent?: ExpressionObject,
  ) {
    super(construction, name);
    this.expressionParent = expressionParent;
    this.size = 1;
    this.color.set('rgb(0,0,178)');
    if (expressionParent) {
      this.setParent(expressionParent);
    }
  }

  getCode(): string {
    return 'list';
  }

  getFamily(): string {
    return 'list';
  }

  getSegmentsSize(): number {
    return this.segmentsSize;
  }

  setSegmentsSize(val: number): void {
    this.segmentsSize = val;
  }

  compute(): void {
    // Si depende de una expresión, recalcular lista de puntos
  }

  isNear(_x: number, _y: number): boolean {
    return false;
  }

  paintObject(_ctx: CanvasRenderingContext2D): void {
    // Pintado de los puntos o segmentos de la lista
  }
}
