import { ConstructionObject, IConstruction } from './base/construction-object';

/**
 * Objeto geométrico Expresión matemática / Cursor.
 * Migrado desde ExpressionObject.js
 */
export class ExpressionObject extends ConstructionObject {
  protected expressionString = '';
  protected value = 0;
  protected x = 100;
  protected y = 100;
  protected min = '0';
  protected max = '10';

  constructor(
    construction: IConstruction,
    name: string,
    expressionString = '',
    x = 100,
    y = 100,
  ) {
    super(construction, name);
    this.expressionString = expressionString;
    this.x = x;
    this.y = y;
    this.fontSize = 18;
    this.color.set('#000000');
  }

  getCode(): string {
    return 'expression';
  }

  getFamily(): string {
    return 'expression';
  }

  getExpression(): string {
    return this.expressionString;
  }

  setExpression(expr: string): void {
    this.expressionString = expr;
  }

  getValue(): number {
    return this.value;
  }

  setValue(val: number): void {
    this.value = val;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setXY(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getMin(): string {
    return this.min;
  }

  setMin(val: string): void {
    this.min = val;
  }

  getMax(): string {
    return this.max;
  }

  setMax(val: string): void {
    this.max = val;
  }

  compute(): void {
    if (!this.expressionString) return;
    try {
      // Evaluación matemática segura básica
      const sanitized = this.expressionString
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/pi|π/gi, 'Math.PI');
      // eslint-disable-next-line no-new-func
      const result = new Function(`return (${sanitized});`)();
      if (typeof result === 'number' && !isNaN(result)) {
        this.value = result;
      }
    } catch {
      // Ignorar errores de sintaxis en evaluación
    }
  }

  isNear(x: number, y: number, tolerance = 15): boolean {
    return Math.abs(this.x - x) < 50 && Math.abs(this.y - y) < tolerance;
  }

  paintObject(ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.fontSize}px Verdana, sans-serif`;
    ctx.fillStyle = this.color.getRGBA();
    const text = `${this.name} = ${this.value.toFixed(this.precision)}`;
    ctx.fillText(text, this.x, this.y);
  }
}
