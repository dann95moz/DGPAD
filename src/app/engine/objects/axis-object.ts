import { IConstruction } from './base/construction-object';
import { PointObject } from './point-object';
import { PrimitiveLineObject } from './primitive-line-object';

/**
 * Eje X cartesiano (eje de abscisas).
 * Migrado desde OXObject.js
 */
export class OXAxisObject extends PrimitiveLineObject {
  constructor(construction: IConstruction, name = 'Ox') {
    const origin = new PointObject(construction, '_O', 0, 0, true);
    super(construction, name, origin);
    this.color.set('#888888');
    this.size = 1;
  }

  override getCode(): string {
    return 'ox';
  }

  override compute(): void {
    const cs = this.cn.getCoordsSystem();
    this.P1.setXY(cs.px(0), cs.py(0));
    this.dx = 1;
    this.dy = 0;
    super.compute();
  }
}

/**
 * Eje Y cartesiano (eje de ordenadas).
 * Migrado desde OYObject.js
 */
export class OYAxisObject extends PrimitiveLineObject {
  constructor(construction: IConstruction, name = 'Oy') {
    const origin = new PointObject(construction, '_O', 0, 0, true);
    super(construction, name, origin);
    this.color.set('#888888');
    this.size = 1;
  }

  override getCode(): string {
    return 'oy';
  }

  override compute(): void {
    const cs = this.cn.getCoordsSystem();
    this.P1.setXY(cs.px(0), cs.py(0));
    this.dx = 0;
    this.dy = -1;
    super.compute();
  }
}
