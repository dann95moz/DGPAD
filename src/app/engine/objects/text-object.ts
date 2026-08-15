import { SymbolicCompute } from '../compute/symbolic-compute';
import { ConstructionObject, IConstruction } from './base/construction-object';
import { PointObject } from './point-object';

/**
 * Objeto de texto o etiqueta TeX dinámica posicionada en el lienzo.
 * Soporta expresiones embebidas con `%expr%`.
 * Migrado desde TextObject.js
 */
export class TextObject extends ConstructionObject {
  protected text: string;
  protected x: number;
  protected y: number;
  protected anchorPoint: PointObject | null = null;
  protected width = 200;
  protected height = 50;

  constructor(
    construction: IConstruction,
    name: string,
    text: string,
    x = 100,
    y = 100,
    anchorPoint: PointObject | null = null,
  ) {
    super(construction, name);
    this.text = text;
    this.x = x;
    this.y = y;
    this.anchorPoint = anchorPoint;
    if (anchorPoint) {
      this.setParent(anchorPoint);
    }
    this.color.set('#252525');
    this.fillcolor.set('rgba(255,255,255,0.85)');
    this.fontSize = 14;
  }

  override getCode(): string {
    return 'text';
  }

  override getFamily(): string {
    return 'text';
  }

  getText(): string {
    return this.text;
  }

  setText(val: string): void {
    this.text = val;
  }

  getX(): number {
    return this.anchorPoint ? this.anchorPoint.getX() + this.x : this.x;
  }

  getY(): number {
    return this.anchorPoint ? this.anchorPoint.getY() + this.y : this.y;
  }

  setXY(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  override compute(): void {
    // Si contiene expresiones %exp%, evaluarlas
  }

  getEvaluatedText(): string {
    return this.text.replace(/%([^%]+)%/g, (_match, expr) => {
      const val = SymbolicCompute.evaluate(expr);
      return isNaN(val) ? '???' : (Math.round(val * 100) / 100).toString();
    });
  }

  override isNear(px: number, py: number): boolean {
    const x = this.getX();
    const y = this.getY();
    return px >= x && px <= x + this.width && py >= y && py <= y + this.height;
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    const posX = this.getX();
    const posY = this.getY();
    const evaluated = this.getEvaluatedText();

    ctx.save();
    ctx.fillStyle = this.fillcolor.getRGBA();
    ctx.strokeStyle = this.color.getRGBA();
    ctx.lineWidth = 1;

    // Caja de fondo
    ctx.beginPath();
    ctx.rect(posX, posY, this.width, this.height);
    ctx.fill();
    ctx.stroke();

    // Texto
    ctx.fillStyle = this.color.getRGBA();
    ctx.font = `${this.fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(evaluated, posX + 8, posY + 8);
    ctx.restore();
  }
}
