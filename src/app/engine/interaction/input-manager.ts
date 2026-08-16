import { CoordsSystem } from '../core/coords-system';

export interface CustomInputConfig {
  id: string;
  xVal: number;
  yVal: number;
  width?: number;
  fontSize?: number;
  pointName?: string;
  value?: string;
}

/**
 * Gestor de cajas de entrada HTML interactivas ancladas a coordenadas geométricas del canvas.
 * Migrado desde createCustomInput en DGPad.js y Utils.js
 */
export class CanvasInputManager {
  private container: HTMLElement;
  private coordsSystem: CoordsSystem;
  private inputs: Map<string, HTMLInputElement> = new Map();
  private meta: Map<string, { xVal: number; yVal: number; pointName: string }> = new Map();

  constructor(container: HTMLElement, coordsSystem: CoordsSystem) {
    this.container = container;
    this.coordsSystem = coordsSystem;
  }

  createOrUpdateInput(config: CustomInputConfig, onValueChange?: (val: string) => void): HTMLInputElement {
    let input = this.inputs.get(config.id);
    const x = this.coordsSystem.px(config.xVal);
    const y = this.coordsSystem.py(config.yVal);
    const width = config.width ?? 80;
    const fontSize = config.fontSize ?? 14;

    if (!input) {
      input = document.createElement('input');
      input.id = config.id;
      input.type = 'text';
      input.className = 'dgpad-custom-input';
      input.style.position = 'absolute';
      input.style.border = '1px solid #336699';
      input.style.borderRadius = '3px';
      input.style.padding = '2px 4px';
      input.style.background = '#ffffff';
      input.style.zIndex = '10';

      if (onValueChange) {
        input.addEventListener('input', () => onValueChange(input?.value ?? ''));
      }

      this.container.appendChild(input);
      this.inputs.set(config.id, input);
    }

    input.style.left = `${x}px`;
    input.style.top = `${y - fontSize / 2}px`;
    input.style.width = `${width}px`;
    input.style.fontSize = `${fontSize}px`;

    if (config.value !== undefined) {
      input.value = config.value;
    }

    this.meta.set(config.id, {
      xVal: config.xVal,
      yVal: config.yVal,
      pointName: config.pointName ?? '',
    });

    return input;
  }

  updatePositions(): void {
    for (const [id, input] of this.inputs.entries()) {
      const m = this.meta.get(id);
      if (m) {
        const x = this.coordsSystem.px(m.xVal);
        const y = this.coordsSystem.py(m.yVal);
        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
      }
    }
  }

  removeInput(id: string): void {
    const input = this.inputs.get(id);
    if (input) {
      input.remove();
      this.inputs.delete(id);
      this.meta.delete(id);
    }
  }

  clear(): void {
    for (const input of this.inputs.values()) {
      input.remove();
    }
    this.inputs.clear();
    this.meta.clear();
  }
}
