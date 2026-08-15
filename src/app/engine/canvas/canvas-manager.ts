import { Construction } from '../construction/construction';
import { BaseConstructor, ConstructorEvent } from '../constructors/base-constructor';
import { PointConstructor } from '../constructors/point-constructor';
import { PolygonConstructor } from '../constructors/polygon-constructor';
import { TwoPointsConstructor, TwoPointsKind } from '../constructors/two-points-constructor';
import { MathUtils } from '../core/math-utils';
import { TrackManager } from '../core/track-manager';
import { EngineExporter } from '../export/exporter';
import { GhostRecognizer } from '../ghost/ghost-recognizer';
import { CoincidenceManager } from '../interaction/coincidence-manager';
import { MagnifierManager } from '../interaction/magnifier-manager';
import { MacroManager } from '../macros/macro-manager';
import { ConstructionObject } from '../objects/base/construction-object';
import { MoveableObject } from '../objects/base/moveable-object';
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

interface PinchState {
  x: number;
  y: number;
  distance: number;
}

/**
 * Controlador principal del lienzo HTML5 Canvas.
 * Orquesta eventos del puntero, gestos multi-touch (pinch-to-zoom), bucle de renderizado,
 * modos de interacción, arrastre, constructores y exportaciones.
 * Migrado y optimizado desde Canvas.js
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
  private exporter: EngineExporter;

  private currentMode: CanvasMode = CanvasMode.CONSTRUCT;
  private currentConstructor: BaseConstructor;
  private defaultPointConstructor: PointConstructor;

  private isDragging = false;
  private draggedObject: MoveableObject | null = null;
  private dragStartX = 0;
  private dragStartY = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private backgroundColor = '#f8f8f8';
  private pinchState: PinchState | null = null;

  // Event handlers guardados para remoción
  private onMouseDownBound: (e: MouseEvent) => void;
  private onMouseMoveBound: (e: MouseEvent) => void;
  private onMouseUpBound: (e: MouseEvent) => void;
  private onWheelBound: (e: WheelEvent) => void;
  private onTouchStartBound: (e: TouchEvent) => void;
  private onTouchMoveBound: (e: TouchEvent) => void;
  private onTouchEndBound: (e: TouchEvent) => void;

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
    this.exporter = new EngineExporter(this.construction);

    this.defaultPointConstructor = new PointConstructor(this.construction);
    this.currentConstructor = this.defaultPointConstructor;

    this.onMouseDownBound = (e: MouseEvent) => this.onMouseDown(e);
    this.onMouseMoveBound = (e: MouseEvent) => this.onMouseMove(e);
    this.onMouseUpBound = (e: MouseEvent) => this.onMouseUp(e);
    this.onWheelBound = (e: WheelEvent) => this.onWheel(e);
    this.onTouchStartBound = (e: TouchEvent) => this.onTouchStart(e);
    this.onTouchMoveBound = (e: TouchEvent) => this.onTouchMove(e);
    this.onTouchEndBound = (e: TouchEvent) => this.onTouchEnd(e);

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

  getExporter(): EngineExporter {
    return this.exporter;
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getCanvasElement(): HTMLCanvasElement {
    return this.canvasElement;
  }

  getMode(): CanvasMode {
    return this.currentMode;
  }

  setMode(mode: CanvasMode): void {
    this.currentMode = mode;
    this.paint();
  }

  setTool(tool: 'point' | 'segment' | 'line' | 'ray' | 'circle' | 'midpoint' | 'polygon'): void {
    this.currentMode = CanvasMode.CONSTRUCT;
    if (tool === 'point') {
      this.currentConstructor = this.defaultPointConstructor;
    } else if (tool === 'polygon') {
      this.currentConstructor = new PolygonConstructor(this.construction);
    } else {
      this.currentConstructor = new TwoPointsConstructor(this.construction, tool as TwoPointsKind);
    }
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

  setBackgroundColor(color: string): void {
    this.backgroundColor = color;
    this.paint();
  }

  getBackgroundColor(): string {
    return this.backgroundColor;
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

    if (this.magnifierManager.isActive()) {
      this.magnifierManager.paintMagnifier(
        this.canvasElement,
        this.ctx,
        this.lastPointerX,
        this.lastPointerY,
      );
    }
  }

  deleteAll(): void {
    this.construction.clear();
    this.undoManager.clear();
    this.trackManager.clear();
    this.paint();
  }

  exportSVG(): string {
    return this.exporter.exportSvg(this.canvasElement.width, this.canvasElement.height);
  }

  exportPNG(): string {
    this.paint();
    return this.canvasElement.toDataURL('image/png');
  }

  getSource(): string {
    return this.exporter.exportText();
  }

  getMouseMathCoords(): { x: number; y: number } {
    const cs = this.construction.getCoordsSystem();
    return {
      x: cs.x(this.lastPointerX),
      y: cs.y(this.lastPointerY),
    };
  }

  destroy(): void {
    this.unbindEvents();
  }

  private bindEvents(): void {
    this.canvasElement.addEventListener('mousedown', this.onMouseDownBound);
    this.canvasElement.addEventListener('mousemove', this.onMouseMoveBound);
    this.canvasElement.addEventListener('mouseup', this.onMouseUpBound);
    this.canvasElement.addEventListener('wheel', this.onWheelBound, { passive: false });

    this.canvasElement.addEventListener('touchstart', this.onTouchStartBound, { passive: false });
    this.canvasElement.addEventListener('touchmove', this.onTouchMoveBound, { passive: false });
    this.canvasElement.addEventListener('touchend', this.onTouchEndBound, { passive: false });
  }

  private unbindEvents(): void {
    this.canvasElement.removeEventListener('mousedown', this.onMouseDownBound);
    this.canvasElement.removeEventListener('mousemove', this.onMouseMoveBound);
    this.canvasElement.removeEventListener('mouseup', this.onMouseUpBound);
    this.canvasElement.removeEventListener('wheel', this.onWheelBound);

    this.canvasElement.removeEventListener('touchstart', this.onTouchStartBound);
    this.canvasElement.removeEventListener('touchmove', this.onTouchMoveBound);
    this.canvasElement.removeEventListener('touchend', this.onTouchEndBound);
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

  private onMouseUp(e: MouseEvent): void {
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.handlePointerUp(x, y);
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

  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const rect = this.canvasElement.getBoundingClientRect();

    if (e.touches.length === 1) {
      this.pinchState = null;
      const touch = e.touches[0];
      this.handlePointerDown(touch.clientX - rect.left, touch.clientY - rect.top);
    } else if (e.touches.length === 2) {
      // Iniciar gesto de pellizco (Pinch to Zoom)
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const x0 = t0.clientX - rect.left;
      const y0 = t0.clientY - rect.top;
      const x1 = t1.clientX - rect.left;
      const y1 = t1.clientY - rect.top;
      const dist = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
      this.pinchState = {
        x: (x0 + x1) / 2,
        y: (y0 + y1) / 2,
        distance: dist,
      };
    }
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const rect = this.canvasElement.getBoundingClientRect();

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      this.handlePointerMove(touch.clientX - rect.left, touch.clientY - rect.top);
    } else if (e.touches.length === 2 && this.pinchState) {
      // Continuar pellizco
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const x0 = t0.clientX - rect.left;
      const y0 = t0.clientY - rect.top;
      const x1 = t1.clientX - rect.left;
      const y1 = t1.clientY - rect.top;
      const currentDist = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
      const currentX = (x0 + x1) / 2;
      const currentY = (y0 + y1) / 2;

      if (this.pinchState.distance > 0 && currentDist > 0) {
        const scale = currentDist / this.pinchState.distance;
        const dx = currentX - this.pinchState.x;
        const dy = currentY - this.pinchState.y;

        this.construction.getCoordsSystem().translate(dx, dy);
        this.construction.getCoordsSystem().zoom(currentX, currentY, scale);
        this.construction.computeAll();
        this.paint();
      }

      this.pinchState = {
        x: currentX,
        y: currentY,
        distance: currentDist,
      };
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    this.pinchState = null;
    this.handlePointerUp(this.lastPointerX, this.lastPointerY);
  }

  private handlePointerDown(x: number, y: number): void {
    this.isDragging = true;
    this.dragStartX = x;
    this.dragStartY = y;
    this.lastPointerX = x;
    this.lastPointerY = y;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.start(x, y);
      this.paint();
      return;
    }

    const target = this.findObjectUnderPointer(x, y);

    if (this.currentMode === CanvasMode.DELETE) {
      if (target) {
        this.undoManager.recordRemove(target);
        this.construction.removeObject(target);
        this.construction.computeAll();
      }
      this.paint();
      return;
    }

    if (this.currentMode === CanvasMode.HIDE) {
      if (target) {
        target.setHidden(!target.isHidden());
      }
      this.paint();
      return;
    }

    // Comprobar si se tocó un objeto arrastrable
    if (target instanceof MoveableObject && target.isMoveable()) {
      this.draggedObject = target;
      this.draggedObject.startDrag(x, y);
      this.paint();
      return;
    }

    if (this.currentMode === CanvasMode.CONSTRUCT) {
      const event: ConstructorEvent = { x, y, target: target ?? undefined };
      this.currentConstructor.onMouseDown(event);
    }

    this.paint();
  }

  private handlePointerMove(x: number, y: number): void {
    this.lastPointerX = x;
    this.lastPointerY = y;

    if (!this.isDragging) return;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.addPoint(x, y);
      this.paint();
      return;
    }

    if (this.draggedObject) {
      this.draggedObject.dragTo(x, y);
      this.construction.computeAll();
      this.trackManager.record(this.draggedObject);
      this.paint();
      return;
    }

    if (this.currentMode === CanvasMode.POINTER) {
      // Pan / Desplazamiento del lienzo
      const dx = x - this.dragStartX;
      const dy = y - this.dragStartY;
      this.dragStartX = x;
      this.dragStartY = y;
      this.construction.getCoordsSystem().translate(dx, dy);
      this.construction.computeAll();
    } else if (this.currentMode === CanvasMode.CONSTRUCT) {
      const target = this.findObjectUnderPointer(x, y);
      const event: ConstructorEvent = { x, y, target: target ?? undefined };
      this.currentConstructor.onMouseMove(event);
    }

    this.paint();
  }

  private handlePointerUp(x: number, y: number): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.currentMode === CanvasMode.GHOST) {
      this.ghostRecognizer.finish();
      this.paint();
      return;
    }

    if (this.draggedObject) {
      this.draggedObject.stopDrag();
      this.draggedObject = null;
      this.construction.computeAll();
      this.paint();
      return;
    }

    if (this.currentMode === CanvasMode.CONSTRUCT) {
      const target = this.findObjectUnderPointer(x, y);
      const event: ConstructorEvent = { x, y, target: target ?? undefined };
      this.currentConstructor.onMouseUp(event);
    }

    this.paint();
  }

  private findObjectUnderPointer(x: number, y: number): ConstructionObject | null {
    const under = this.construction.getObjectsUnderPoint(x, y);
    return under.length > 0 ? under[0] : null;
  }
}
