import { Construction } from '../construction/construction';
import { BaseConstructor } from '../constructors/base-constructor';
import { PointConstructor } from '../constructors/point-constructor';
import { CoordsSystem } from '../core/coords-system';
import { MathUtils } from '../core/math-utils';
import { TrackManager } from '../core/track-manager';
import { GhostRecognizer } from '../ghost/ghost-recognizer';
import { CoincidenceManager } from '../interaction/coincidence-manager';
import { MagnifierManager } from '../interaction/magnifier-manager';
import { MacroManager } from '../macros/macro-manager';
import { UndoManager } from '../undo/undo-manager';

export enum CanvasMode {
  POINTER = 0,
  CONSTRUCT = 1,
  HIDE = 2,
  DELETE = 3,
  MACRO_DEF = 4,
  MACRO_EXE = 5,
  PROPERTIES = 6,
  GHOST = 7,
  CALCULATOR = 8,
  MAGNET = 9,
  TEXT = 10,
  DEPENDS = 11,
}

/**
 * Controlador principal del lienzo HTML5 Canvas.
 * Orquesta eventos del puntero, bucle de renderizado, modos de interacción y constructores.
 * Migrado desde Canvas.js
 */
export class CanvasManager {
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private construction: Construction;
  private undoManager: UndoManager;
  private trackManager: TrackManager;
  private ghostRecognizer: GhostRecognizer;
  private coincidenceManager: CoincidenceManager;
  private magnifierManager: MagnifierManager;
  private macroManager: MacroManager;

  private currentMode: CanvasMode = CanvasMode.CONSTRUCT;
  private currentConstructor: BaseConstructor;
  private defaultPointConstructor: PointConstructor;

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private backgroundColor = '#f8f8f8';

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement;
    const context = canvasElement.getContext('2d');
    if (!context) {
      throw new Error('Unable to obtain 2D rendering context for canvas');
    }
    this.ctx = context;

    this.construction = new Construction();
    this.undoManager = new UndoManager(this.construction);
    this.trackManager = new TrackManager(canvasElement.width, canvasElement.height);
    this.ghostRecognizer = new GhostRecognizer(this.construction);
    this.coincidenceManager = new CoincidenceManager(this.construction);
    this.magnifierManager = new MagnifierManager();
    this.macroManager = new MacroManager(this.construction);

    this.defaultPointConstructor = new PointConstructor();
    this.currentConstructor = this.defaultPointConstructor;

    this.bindEvents();
    this.paint();
  }

  getConstruction(): Construction {
    return this.construction;
  }

  getUndoManager(): UndoManager {
    return this.undoManager;
  }

  getTrackManager(): TrackManager {
    return this.trackManager;
  }

  getGhostRecognizer(): GhostRecognizer {
    return this.ghostRecognizer;
  }

  getCoincidenceManager(): CoincidenceManager {
    return this.coincidenceManager;
  }

  getMagnifierManager(): MagnifierManager {
    return this.magnifierManager;
  }

  getMacroManager(): MacroManager {
    return this.macroManager;
  }

  getMode(): CanvasMode {
    return this.currentMode;
  }

  setMode(mode: CanvasMode): void {
    this.currentMode = mode;
    this.paint();
  }

  setConstructor(constructor: BaseConstructor): void {
    this.currentConstructor = constructor;
  }

  resetConstructor(): void {
    this.currentConstructor = this.defaultPointConstructor;
  }

  resize(width: number, height: number): void {
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    this.trackManager.resize(width, height);
    this.paint();
  }

  clearBackground(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  paint(): void {
    this.clearBackground();
    this.construction.paint(this.ctx);
    this.trackManager.draw(this.ctx);

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.paint(this.ctx);
    }
  }

  private bindEvents(): void {
    this.canvasElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvasElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvasElement.addEventListener('mouseup', (e) => this.onMouseUp(e));
    this.canvasElement.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    // Eventos táctiles
    this.canvasElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = this.canvasElement.getBoundingClientRect();
        this.handlePointerDown(touch.clientX - rect.left, touch.clientY - rect.top);
      }
    });

    this.canvasElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = this.canvasElement.getBoundingClientRect();
        this.handlePointerMove(touch.clientX - rect.left, touch.clientY - rect.top);
      }
    });

    this.canvasElement.addEventListener('touchend', () => {
      this.handlePointerUp();
    });
  }

  private onMouseDown(e: MouseEvent): void {
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.handlePointerDown(x, y);
  }

  private onMouseMove(e: MouseEvent): void {
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.handlePointerMove(x, y);
  }

  private onMouseUp(_e: MouseEvent): void {
    this.handlePointerUp();
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const delta = MathUtils.extractDelta(e);
    const zoomFactor = 1 + delta / 2000;

    this.construction.getCoordsSystem().zoom(x, y, zoomFactor);
    this.construction.computeAll();
    this.paint();
  }

  private handlePointerDown(x: number, y: number): void {
    this.isDragging = true;
    this.dragStartX = x;
    this.dragStartY = y;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.start(x, y);
    } else if (this.currentMode === CanvasMode.CONSTRUCT) {
      this.currentConstructor.onMouseDown(x, y, this.construction);
    }

    this.paint();
  }

  private handlePointerMove(x: number, y: number): void {
    if (!this.isDragging) return;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.addPoint(x, y);
    } else if (this.currentMode === CanvasMode.POINTER) {
      // Pan / Desplazamiento del lienzo
      const dx = x - this.dragStartX;
      const dy = y - this.dragStartY;
      this.dragStartX = x;
      this.dragStartY = y;
      this.construction.getCoordsSystem().translate(dx, dy);
      this.construction.computeAll();
    } else if (this.currentMode === CanvasMode.CONSTRUCT) {
      this.currentConstructor.onMouseMove(x, y, this.construction);
    }

    this.paint();
  }

  private handlePointerUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.finish();
    } else if (this.currentMode === CanvasMode.CONSTRUCT) {
      this.currentConstructor.onMouseUp(this.dragStartX, this.dragStartY, this.construction);
    }

    this.paint();
  }
}
