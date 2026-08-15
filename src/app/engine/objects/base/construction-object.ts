import { Color } from '../../core/color';

export interface IConstruction {
  getCoordsSystem(): {
    px(x: number): number;
    py(y: number): number;
    x(px: number): number;
    y(py: number): number;
    l(pixels: number): number;
    lx(units: number): number;
    getUnit(): number;
  };
  getTrackManager?(): {
    clear(): void;
  };
  getSerial(): number;
  getUnusedName(nameProposal: string, obj: ConstructionObject): string;
}

/**
 * Clase base para todos los objetos geométricos de la construcción.
 * Migrado desde ConstructionObject.js
 */
export abstract class ConstructionObject {
  protected cn: IConstruction;
  protected name: string;
  protected showName = false;
  protected indicated = false;
  protected selected = false;
  protected hidden = 0; // 0: visible, 1: oculto, 2: super oculto
  protected color: Color = new Color('#0000b2');
  protected fillcolor: Color = new Color('rgba(0,0,178,0.2)');
  protected size = 5;
  protected layer = 0;
  protected fontSize = 14;
  protected precision = 2;
  protected increment = 0;
  protected dash = false;
  protected noMouse = false;
  protected track = false;
  protected parents: ConstructionObject[] = [];
  protected children: ConstructionObject[] = [];
  protected serial: number;

  constructor(construction: IConstruction, name: string) {
    this.cn = construction;
    this.serial = construction.getSerial();
    this.name = construction.getUnusedName(name, this);
  }

  abstract getCode(): string;
  abstract getFamily(): string;
  abstract compute(): void;
  abstract paintObject(ctx: CanvasRenderingContext2D): void;
  abstract isNear(x: number, y: number, tolerance?: number): boolean;

  getName(): string {
    return this.name;
  }

  setName(newName: string): void {
    this.name = newName;
  }

  getFullName(): string {
    return this.name;
  }

  getCn(): IConstruction {
    return this.cn;
  }

  getSerial(): number {
    return this.serial;
  }

  getColor(): Color {
    return this.color;
  }

  setColor(c: Color | string): void {
    if (typeof c === 'string') {
      this.color.set(c);
    } else {
      this.color = c;
    }
  }

  setRGBColor(r: number, g: number, b: number): void {
    this.color.setRGBA(r, g, b, this.color.getOpacity());
  }

  getFillColor(): Color {
    return this.fillcolor;
  }

  getSize(): number {
    return this.size;
  }

  setSize(val: number): void {
    this.size = val;
  }

  getOpacity(): number {
    return this.color.getOpacity();
  }

  setOpacity(val: number): void {
    this.color.setOpacity(val);
  }

  getLayer(): number {
    return this.layer;
  }

  setLayer(val: number): void {
    this.layer = val;
  }

  getFontSize(): number {
    return this.fontSize;
  }

  setFontSize(val: number): void {
    this.fontSize = val;
  }

  getPrecision(): number {
    return this.precision;
  }

  setPrecision(val: number): void {
    this.precision = val;
  }

  getIncrement(): number {
    return this.increment;
  }

  setIncrement(val: number): void {
    this.increment = val;
  }

  isShowName(): boolean {
    return this.showName;
  }

  setShowName(val: boolean): void {
    this.showName = val;
  }

  isDash(): boolean {
    return this.dash;
  }

  setDash(val: boolean): void {
    this.dash = val;
  }

  isNoMouse(): boolean {
    return this.noMouse;
  }

  setNoMouse(val: boolean): void {
    this.noMouse = val;
  }

  isTrack(): boolean {
    return this.track;
  }

  setTrack(val: boolean): void {
    this.track = val;
  }

  getHidden(): number {
    return this.hidden;
  }

  setHidden(val: number): void {
    this.hidden = val;
  }

  isVisible(): boolean {
    return this.hidden === 0;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(val: boolean): void {
    this.selected = val;
  }

  isIndicated(): boolean {
    return this.indicated;
  }

  setIndicated(val: boolean): void {
    this.indicated = val;
  }

  getParents(): ConstructionObject[] {
    return this.parents;
  }

  getParentLength(): number {
    return this.parents.length;
  }

  setParent(...parents: ConstructionObject[]): void {
    this.parents = parents;
    for (const parent of parents) {
      parent.addChild(this);
    }
  }

  addParent(parent: ConstructionObject): void {
    if (!this.parents.includes(parent)) {
      this.parents.push(parent);
      parent.addChild(this);
    }
  }

  getChildren(): ConstructionObject[] {
    return this.children;
  }

  getChildLength(): number {
    return this.children.length;
  }

  addChild(child: ConstructionObject): void {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  removeChild(child: ConstructionObject): void {
    const idx = this.children.indexOf(child);
    if (idx >= 0) {
      this.children.splice(idx, 1);
    }
  }

  computeChilds(): void {
    for (const child of this.children) {
      child.compute();
      child.computeChilds();
    }
  }

  isInstanceType(type: string): boolean {
    return this.getCode() === type || this.getFamily() === type;
  }

  paint(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible()) return;

    ctx.save();
    ctx.strokeStyle = this.color.getRGBA();
    ctx.fillStyle = this.color.getRGBA();
    ctx.lineWidth = this.size;

    if (this.dash) {
      ctx.setLineDash([6, 6]);
    } else {
      ctx.setLineDash([]);
    }

    this.paintObject(ctx);

    if (this.showName && this.name) {
      this.paintName(ctx);
    }

    ctx.restore();
  }

  protected paintName(ctx: CanvasRenderingContext2D): void {
    // Implementación por defecto de pintado de etiqueta de nombre
  }
}
