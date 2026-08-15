import { ConstructionObject } from '../objects/base/construction-object';
import { PointObject } from '../objects/point-object';

/**
 * Gestor de trazas (Track Manager) para dibujar rastros de movimiento de objetos geométricos.
 * Migrado y optimizado desde TrackManager.js
 */
export class TrackManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private enabled = true;
  private width = 800;
  private height = 600;

  constructor(width = 800, height = 600) {
    this.width = width;
    this.height = height;
    this.initBuffer();
  }

  private initBuffer(): void {
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d');
    }
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    if (!this.canvas || !this.ctx) {
      this.initBuffer();
      return;
    }
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

  draw(targetCtx: CanvasRenderingContext2D): void {
    if (this.canvas && this.enabled && this.canvas.width > 0 && this.canvas.height > 0) {
      targetCtx.drawImage(this.canvas, 0, 0);
    }
  }

  drawTo(targetCtx: CanvasRenderingContext2D): void {
    this.draw(targetCtx);
  }

  record(obj: ConstructionObject): void {
    if (!this.enabled || !this.ctx || !obj.isTrack()) return;

    if (obj instanceof PointObject) {
      const x = obj.getX();
      const y = obj.getY();
      if (isNaN(x) || isNaN(y)) return;

      this.ctx.save();
      this.ctx.fillStyle = obj.getColor().getRGBA();
      this.ctx.beginPath();
      this.ctx.arc(x, y, Math.max(1, obj.getSize() / 2), 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  setEnabled(val: boolean): void {
    this.enabled = val;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
