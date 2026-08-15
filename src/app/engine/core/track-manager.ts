/**
 * Gestor de trazas para dibujar los rastros de movimiento de los objetos geométricos.
 * Migrado desde TrackManager.js
 */
export class TrackManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private enabled = true;

  constructor() {
    this.initBuffer();
  }

  private initBuffer(): void {
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
  }

  resize(width: number, height: number): void {
    if (!this.canvas || !this.ctx) return;
    const oldCanvas = this.canvas;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;
    const newCtx = newCanvas.getContext('2d');
    if (newCtx && oldCanvas.width > 0 && oldCanvas.height > 0) {
      newCtx.drawImage(oldCanvas, 0, 0);
    }
    this.canvas = newCanvas;
    this.ctx = newCtx;
  }

  clear(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  getContext(): CanvasRenderingContext2D | null {
    return this.ctx;
  }

  drawTo(targetCtx: CanvasRenderingContext2D): void {
    if (this.canvas && this.enabled && this.canvas.width > 0 && this.canvas.height > 0) {
      targetCtx.drawImage(this.canvas, 0, 0);
    }
  }

  setEnabled(val: boolean): void {
    this.enabled = val;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
