import { ConstructionObject, IConstruction } from './base/construction-object';

/**
 * Botón interactivo de Blockly insertado en el canvas.
 * Migrado desde BlocklyButtonObject.js
 */
export class BlocklyButtonObject extends ConstructionObject {
  protected x = 50;
  protected y = 50;
  protected width = 120;
  protected height = 36;
  protected label = 'Ejecutar';
  protected xmlCode = '';

  constructor(
    construction: IConstruction,
    name: string,
    label = 'Ejecutar',
    x = 50,
    y = 50,
  ) {
    super(construction, name);
    this.label = label;
    this.x = x;
    this.y = y;
    this.color.set('#2196f3');
    this.fillcolor.set('#e3f2fd');
    this.fontSize = 14;
  }

  override getCode(): string {
    return 'blockly_button';
  }

  override getFamily(): string {
    return 'widget';
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(lbl: string): void {
    this.label = lbl;
  }

  getXmlCode(): string {
    return this.xmlCode;
  }

  setXmlCode(xml: string): void {
    this.xmlCode = xml;
  }

  override compute(): void {
    // No-op
  }

  override isNear(px: number, py: number): boolean {
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    // Fondo con bordes redondeados
    ctx.save();
    ctx.fillStyle = this.fillcolor.getRGBA();
    ctx.strokeStyle = this.color.getRGBA();
    ctx.lineWidth = 2;

    const r = 6;
    ctx.beginPath();
    ctx.moveTo(this.x + r, this.y);
    ctx.lineTo(this.x + this.width - r, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + r);
    ctx.lineTo(this.x + this.width, this.y + this.height - r);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - r, this.y + this.height);
    ctx.lineTo(this.x + r, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - r);
    ctx.lineTo(this.x, this.y + r);
    ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Texto
    ctx.fillStyle = this.color.getRGBA();
    ctx.font = `${this.fontSize}px Verdana, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }
}

/**
 * Curva continua / Gráfica de función paramétrica f(x).
 * Migrado desde CurvusObject.js
 */
export class CurvusObject extends ConstructionObject {
  protected formula = 'sin(x)';
  protected pointsCache: [number, number][] = [];

  constructor(
    construction: IConstruction,
    name: string,
    formula = 'sin(x)',
  ) {
    super(construction, name);
    this.formula = formula;
    this.color.set('#0088cc');
    this.size = 2;
  }

  override getCode(): string {
    return 'curvus';
  }

  override getFamily(): string {
    return 'function';
  }

  getFormula(): string {
    return this.formula;
  }

  setFormula(f: string): void {
    this.formula = f;
  }

  override compute(): void {
    this.pointsCache = [];
    const cs = this.cn.getCoordsSystem();
    const width = 800; // Puntos calculados a través del ancho del canvas
    const step = 4;

    try {
      const sanitized = this.formula
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/log/g, 'Math.log')
        .replace(/pi|π/gi, 'Math.PI');

      // eslint-disable-next-line no-new-func
      const fn = new Function('x', `return (${sanitized});`);

      for (let px = 0; px <= width; px += step) {
        const mathX = cs.x(px);
        const mathY = fn(mathX);
        if (typeof mathY === 'number' && !isNaN(mathY) && isFinite(mathY)) {
          const py = cs.py(mathY);
          this.pointsCache.push([px, py]);
        }
      }
    } catch {
      // Ignorar errores de sintaxis en evaluación de fórmula
    }
  }

  override isNear(px: number, py: number, tolerance = 6): boolean {
    for (const pt of this.pointsCache) {
      const dx = pt[0] - px;
      const dy = pt[1] - py;
      if (dx * dx + dy * dy < tolerance * tolerance) {
        return true;
      }
    }
    return false;
  }

  override paintObject(ctx: CanvasRenderingContext2D): void {
    if (this.pointsCache.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.pointsCache[0][0], this.pointsCache[0][1]);
    for (let i = 1; i < this.pointsCache.length; i++) {
      ctx.lineTo(this.pointsCache[i][0], this.pointsCache[i][1]);
    }
    ctx.stroke();
  }
}
