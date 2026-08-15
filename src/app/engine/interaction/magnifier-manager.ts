export interface MagnifierBounds {
  left: number;
  top: number;
  width: number;
  height: number;
  captureWidth: number;
}

/**
 * Gestor de la lupa de aumento táctil (Magnifier / Loupe) para precisión en dispositivos móviles.
 * Migrado desde MagnifierManager.js y MagnifierPanel.js
 */
export class MagnifierManager {
  private active = false;
  private bounds: MagnifierBounds = {
    left: 20,
    top: 20,
    width: 140,
    height: 140,
    captureWidth: 70,
  };

  setActive(val: boolean): void {
    this.active = val;
  }

  isActive(): boolean {
    return this.active;
  }

  getBounds(): MagnifierBounds {
    return this.bounds;
  }

  setBounds(b: Partial<MagnifierBounds>): void {
    this.bounds = { ...this.bounds, ...b };
  }

  paintMagnifier(
    sourceCanvas: HTMLCanvasElement,
    targetCtx: CanvasRenderingContext2D,
    focusX: number,
    focusY: number,
  ): void {
    if (!this.active || isNaN(focusX) || isNaN(focusY)) return;

    const { left, top, width, height, captureWidth } = this.bounds;
    const half = captureWidth / 2;

    targetCtx.save();
    targetCtx.beginPath();
    targetCtx.arc(left + width / 2, top + height / 2, width / 2, 0, Math.PI * 2);
    targetCtx.clip();

    // Dibujar área ampliada
    targetCtx.drawImage(
      sourceCanvas,
      focusX - half,
      focusY - half,
      captureWidth,
      captureWidth,
      left,
      top,
      width,
      height,
    );

    // Borde circular de la lente
    targetCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    targetCtx.lineWidth = 4;
    targetCtx.stroke();

    // Punto de mira central
    targetCtx.beginPath();
    targetCtx.arc(left + width / 2, top + height / 2, 3, 0, Math.PI * 2);
    targetCtx.fillStyle = '#ff0000';
    targetCtx.fill();

    targetCtx.restore();
  }
}
