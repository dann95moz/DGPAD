import { Injectable } from '@angular/core';

export type DgpadMode =
  | 'move'
  | 'build'
  | 'hide'
  | 'delete'
  | 'macro'
  | 'calc'
  | 'tex'
  | 'properties';

export type LegacyExportOptions = {
  fixWidgets: boolean;
  fixDgScripts: boolean;
  hideControlPanel: boolean;
  disableZoom: boolean;
};

export type LegacyHistoryEntry = {
  index: number;
  date: string;
  img: string;
  lock: boolean;
};

export type LegacyPropertyState = {
  name: string;
  code: string;
  family: string;
  showName: boolean;
  color: string;
  opacity: number;
  size: number;
  layer: number;
  fontSize: number;
  precision: number;
  increment: number;
  shape: number;
  dash: boolean;
  noMouse: boolean;
  track: boolean;
  angle360: boolean;
  supportsExclusive: boolean;
  exclusive: boolean;
};

export type EditableProperty =
  | 'name'
  | 'showName'
  | 'color'
  | 'opacity'
  | 'size'
  | 'layer'
  | 'fontSize'
  | 'precision'
  | 'increment'
  | 'shape'
  | 'dash'
  | 'noMouse'
  | 'track'
  | 'angle360'
  | 'exclusive';

export type LegacyGlobalPropertyState = {
  backgroundColor: string;
  presentationMode: boolean;
  magnifier: boolean;
  animation: boolean;
  degrees: boolean;
};

export type EditableGlobalProperty =
  | 'backgroundColor'
  | 'presentationMode'
  | 'magnifier'
  | 'animation'
  | 'degrees';

export type LegacyAxisPropertyState = {
  color: string;
  fontSize: number;
  axisWidth: number;
  gridWidth: number;
  showGrid: boolean;
  showOx: boolean;
  showOy: boolean;
  lockOx: boolean;
  lockOy: boolean;
  onlyPositive: boolean;
  centerZoom: boolean;
};

export type EditableAxisProperty = keyof LegacyAxisPropertyState;

export type LegacyWidgetState = {
  color: string;
  opacity: number;
  borderSize: number;
  borderRadius: number;
  precision: number;
  fontSize: number;
  fixPosition: boolean;
  fixSize: boolean;
};

export type EditableWidgetProperty = keyof LegacyWidgetState;

export type LegacyMacroItem = { key: string; name: string };
export type LegacyMacroCatalog = {
  plugins: LegacyMacroItem[];
  tools: LegacyMacroItem[];
};
export type LegacyMacroDraft = { params: string[]; targets: string[] };
export type LegacyActiveMacro = { key: string; name: string; prompt: string; types: string[] };
export type CalculatorField = 'e1' | 'e2' | 'min' | 'max';
export type LegacyCalculatorState = {
  editing: boolean;
  e1: string;
  e1Label: string;
  e2: string;
  e2Label: string;
  min: string;
  max: string;
  showE2: boolean;
  showMin: boolean;
  showMax: boolean;
  degrees: boolean;
};

type LegacyBridge = {
  setMode?: (mode: number) => void;
  openProperties?: () => void;
  closeProperties?: () => void;
  getPropertyState?: () => LegacyPropertyState | null;
  getGlobalPropertyState?: () => LegacyGlobalPropertyState | null;
  getAxisPropertyState?: () => LegacyAxisPropertyState | null;
  getWidgetState?: () => LegacyWidgetState | null;
  updateProperty?: (
    property: EditableProperty,
    value: string | number | boolean,
    applyAll: boolean,
  ) => void;
  updateGlobalProperty?: (
    property: EditableGlobalProperty,
    value: string | boolean,
  ) => void;
  updateAxisProperty?: (
    property: EditableAxisProperty,
    value: string | number | boolean,
  ) => void;
  updateWidgetProperty?: (
    property: EditableWidgetProperty,
    value: string | number | boolean,
  ) => void;
  createWidget?: (options: LegacyWidgetState) => void;
  getMacroCatalog?: () => LegacyMacroCatalog;
  startMacro?: (key: string) => void;
  getActiveMacro?: () => LegacyActiveMacro | null;
  getMacroDraft?: () => LegacyMacroDraft | null;
  saveMacroDraft?: (name: string) => void;
  getCalculatorState?: () => LegacyCalculatorState | null;
  beginCalculatorExpression?: () => void;
  updateCalculatorField?: (field: CalculatorField, value: string) => void;
  setCalculatorDegrees?: (value: boolean) => void;
  validateCalculator?: () => void;
  cancelCalculator?: () => void;
  openNames?: () => void;
  closeNames?: () => void;
  isNamesVisible?: () => boolean;
  toggleGrid?: () => boolean;
  isGridVisible?: () => boolean;
  resetZoom?: () => void;
  openConstructionProtocol?: () => void;
  duplicateFigure?: () => void;
  openFile?: () => void;
  saveFile?: () => void;
  createBoardPoints?: () => void;
  exportText?: (options: LegacyExportOptions) => string;
  exportHtmlJs?: (options: LegacyExportOptions) => string;
  exportHtml?: (options: LegacyExportOptions) => string;
  exportResponsive?: (options: LegacyExportOptions) => string;
  saveHistorySnapshot?: () => void;
  getHistoryEntries?: () => LegacyHistoryEntry[];
  openHistoryEntry?: (index: number) => void;
  clearUnlockedHistory?: () => void;
  getAutosaveMinutes?: () => number;
  setAutosaveMinutes?: (minutes: number) => void;
};

type LegacyWindow = Window &
  typeof globalThis & {
    dgpadBridge?: LegacyBridge;
    eval?: (code: string) => unknown;
  };

@Injectable({
  providedIn: 'root',
})
export class DgpadBridgeService {
  setMode(mode: DgpadMode): void {
    const bridge = this.getLegacyBridge();

    if (!bridge) {
      return;
    }

    if (mode === 'move') {
      bridge.closeProperties?.();
      bridge.setMode?.(0);
      return;
    }

    if (mode === 'build') {
      bridge.closeProperties?.();
      bridge.setMode?.(1);
      return;
    }

    if (mode === 'hide') {
      bridge.closeProperties?.();
      bridge.setMode?.(2);
      return;
    }

    if (mode === 'delete') {
      bridge.closeProperties?.();
      bridge.setMode?.(3);
      return;
    }

    if (mode === 'macro') {
      bridge.closeProperties?.();
      bridge.setMode?.(4);
      return;
    }

    if (mode === 'calc') {
      bridge.closeProperties?.();
      bridge.setMode?.(8);
      return;
    }

    if (mode === 'tex') {
      bridge.closeProperties?.();
      bridge.setMode?.(10);
      return;
    }

    if (mode === 'properties') {
      bridge.openProperties?.();
    }
  }

  closeProperties(): void {
    this.getLegacyBridge()?.closeProperties?.();
  }

  getPropertyState(): LegacyPropertyState | null {
    return this.getLegacyBridge()?.getPropertyState?.() ?? null;
  }

  getGlobalPropertyState(): LegacyGlobalPropertyState | null {
    return this.getLegacyBridge()?.getGlobalPropertyState?.() ?? null;
  }

  getAxisPropertyState(): LegacyAxisPropertyState | null {
    return this.getLegacyBridge()?.getAxisPropertyState?.() ?? null;
  }

  getWidgetState(): LegacyWidgetState | null {
    return this.getLegacyBridge()?.getWidgetState?.() ?? null;
  }

  updateProperty(
    property: EditableProperty,
    value: string | number | boolean,
    applyAll = false,
  ): void {
    this.getLegacyBridge()?.updateProperty?.(property, value, applyAll);
  }

  updateGlobalProperty(
    property: EditableGlobalProperty,
    value: string | boolean,
  ): void {
    this.getLegacyBridge()?.updateGlobalProperty?.(property, value);
  }

  updateAxisProperty(
    property: EditableAxisProperty,
    value: string | number | boolean,
  ): void {
    this.getLegacyBridge()?.updateAxisProperty?.(property, value);
  }

  updateWidgetProperty(
    property: EditableWidgetProperty,
    value: string | number | boolean,
  ): void {
    this.getLegacyBridge()?.updateWidgetProperty?.(property, value);
  }

  createWidget(options: LegacyWidgetState): void {
    this.getLegacyBridge()?.createWidget?.(options);
  }

  getMacroCatalog(): LegacyMacroCatalog {
    return this.getLegacyBridge()?.getMacroCatalog?.() ?? { plugins: [], tools: [] };
  }

  startMacro(key: string): void {
    this.getLegacyBridge()?.startMacro?.(key);
  }

  getActiveMacro(): LegacyActiveMacro | null {
    return this.getLegacyBridge()?.getActiveMacro?.() ?? null;
  }

  getMacroDraft(): LegacyMacroDraft | null {
    return this.getLegacyBridge()?.getMacroDraft?.() ?? null;
  }

  saveMacroDraft(name: string): void {
    this.getLegacyBridge()?.saveMacroDraft?.(name);
  }

  getCalculatorState(): LegacyCalculatorState | null {
    return this.getLegacyBridge()?.getCalculatorState?.() ?? null;
  }

  beginCalculatorExpression(): void {
    this.getLegacyBridge()?.beginCalculatorExpression?.();
  }

  updateCalculatorField(field: CalculatorField, value: string): void {
    this.getLegacyBridge()?.updateCalculatorField?.(field, value);
  }

  setCalculatorDegrees(value: boolean): void {
    this.getLegacyBridge()?.setCalculatorDegrees?.(value);
  }

  validateCalculator(): void {
    this.getLegacyBridge()?.validateCalculator?.();
  }

  cancelCalculator(): void {
    this.getLegacyBridge()?.cancelCalculator?.();
  }

  openNames(): void {
    const bridge = this.getLegacyBridge();

    if (!bridge?.openNames) {
      return;
    }

    if (!bridge.isNamesVisible?.()) {
      bridge.openNames();
    }
  }

  closeNames(): void {
    const bridge = this.getLegacyBridge();

    if (!bridge?.closeNames) {
      return;
    }

    if (bridge.isNamesVisible?.()) {
      bridge.closeNames();
    }
  }

  isNamesVisible(): boolean {
    return this.getLegacyBridge()?.isNamesVisible?.() ?? false;
  }

  toggleGrid(): boolean {
    return this.getLegacyBridge()?.toggleGrid?.() ?? false;
  }

  isGridVisible(): boolean {
    return this.getLegacyBridge()?.isGridVisible?.() ?? false;
  }

  resetZoom(): void {
    this.getLegacyBridge()?.resetZoom?.();
  }

  openConstructionProtocol(): void {
    this.getLegacyBridge()?.openConstructionProtocol?.();
  }

  duplicateFigure(): void {
    this.getLegacyBridge()?.duplicateFigure?.();
  }

  openFile(): void {
    this.getLegacyBridge()?.openFile?.();
  }

  saveFile(): void {
    this.getLegacyBridge()?.saveFile?.();
  }

  createAnyPoint(name: string): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || typeof PointObject !== 'function') {
        throw new Error('PointObject no está disponible en DGPad legacy');
      }

      var Cn = $CANVAS.getConstruction();
      var cs = Cn.coordsSystem;

      if (!Cn || !cs || typeof cs.px !== 'function' || typeof cs.py !== 'function') {
        throw new Error('No se encontró el sistema de coordenadas de DGPad');
      }

      var x = Math.random() * 10 - 5;
      var y = Math.random() * 10 - 5;
      var px = cs.px(x);
      var py = cs.py(y);

      var point = new PointObject(Cn, ${JSON.stringify(name)}, px, py);

      if (typeof point.setShowName === 'function') {
        point.setShowName(true);
      }

      $CANVAS.addObject(point);

      if (typeof point.compute === 'function') {
        point.compute();
      }

      if (typeof $CANVAS.paint === 'function') {
        $CANVAS.paint();
      }
    `);
  }

  createLine(name: string, pointA: string, pointB: string): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined') {
        throw new Error('No se encontró $CANVAS');
      }

      if (typeof TwoPointsLineObject !== 'function') {
        throw new Error('TwoPointsLineObject no está disponible en DGPad legacy');
      }

      var Cn = $CANVAS.getConstruction();

      if (!Cn) {
        throw new Error('No se encontró la construcción');
      }

      if (typeof Cn.find !== 'function') {
        throw new Error('Cn.find no está disponible en DGPad legacy');
      }

      var P1 = Cn.find(${JSON.stringify(pointA)});
      var P2 = Cn.find(${JSON.stringify(pointB)});

      if (!P1) {
        throw new Error('No se encontró el punto ${pointA}');
      }

      if (!P2) {
        throw new Error('No se encontró el punto ${pointB}');
      }

      var line = new TwoPointsLineObject(
        Cn,
        ${JSON.stringify(name)},
        P1,
        P2,
        false
      );

      $CANVAS.addObject(line);

      if (typeof line.compute === 'function') {
        line.compute();
      }

      if (typeof $CANVAS.paint === 'function') {
        $CANVAS.paint();
      }
    `);
  }

  createSegment(name: string, pointA: string, pointB: string): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined') {
        throw new Error('No se encontró $CANVAS');
      }

      if (typeof SegmentObject !== 'function') {
        throw new Error('SegmentObject no está disponible en DGPad legacy');
      }

      var Cn = $CANVAS.getConstruction();

      if (!Cn) {
        throw new Error('No se encontró la construcción');
      }

      if (typeof Cn.find !== 'function') {
        throw new Error('Cn.find no está disponible en DGPad legacy');
      }

      var P1 = Cn.find(${JSON.stringify(pointA)});
      var P2 = Cn.find(${JSON.stringify(pointB)});

      if (!P1) {
        throw new Error('No se encontró el punto ${pointA}');
      }

      if (!P2) {
        throw new Error('No se encontró el punto ${pointB}');
      }

      var segment = new SegmentObject(
        Cn,
        ${JSON.stringify(name)},
        P1,
        P2
      );

      $CANVAS.addObject(segment);

      if (typeof segment.compute === 'function') {
        segment.compute();
      }

      if (typeof $CANVAS.paint === 'function') {
        $CANVAS.paint();
      }
    `);
  }

  createMidPoint(name: string, pointA: string, pointB: string): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined') {
        throw new Error('No se encontró $CANVAS');
      }

      if (typeof MidPointObject !== 'function') {
        throw new Error('MidPointObject no está disponible en DGPad legacy');
      }

      var Cn = $CANVAS.getConstruction();

      if (!Cn) {
        throw new Error('No se encontró la construcción');
      }

      if (typeof Cn.find !== 'function') {
        throw new Error('Cn.find no está disponible en DGPad legacy');
      }

      var P1 = Cn.find(${JSON.stringify(pointA)});
      var P2 = Cn.find(${JSON.stringify(pointB)});

      if (!P1) {
        throw new Error('No se encontró el punto ${pointA}');
      }

      if (!P2) {
        throw new Error('No se encontró el punto ${pointB}');
      }

      var midpoint = new MidPointObject(
        Cn,
        ${JSON.stringify(name)},
        P1,
        P2
      );

      $CANVAS.addObject(midpoint);

      if (typeof midpoint.compute === 'function') {
        midpoint.compute();
      }

      if (typeof $CANVAS.paint === 'function') {
        $CANVAS.paint();
      }
    `);
  }

  getUsedNames(): string[] {
    const result = this.runLegacyScript(`
      (function() {
        if (typeof $CANVAS === 'undefined') {
          return [];
        }

        var Cn = $CANVAS.getConstruction();

        if (!Cn || typeof Cn.getNames !== 'function') {
          return [];
        }

        return Cn.getNames();
      })()
    `);

    return Array.isArray(result)
      ? result.filter((value): value is string => typeof value === 'string')
      : [];
  }

  exportText(options: LegacyExportOptions): void {
    const content = this.getLegacyBridge()?.exportText?.(options);

    if (!content) {
      console.error('DGPad no devolvió texto de exportación');
      return;
    }

    this.downloadTextFile(
      content,
      'dgpad-export.txt',
      'text/plain;charset=utf-8'
    );
  }

  exportHtmlJs(
    options: LegacyExportOptions,
    fileName = 'dgpad-export-html-js.html'
  ): void {
    const content = this.getLegacyBridge()?.exportHtmlJs?.(options);

    if (!content) {
      console.error('DGPad no devolvió HTML + JS');
      return;
    }

    this.downloadTextFile(content, fileName, 'text/html;charset=utf-8');
  }

  exportHtml(options: LegacyExportOptions): void {
    const content = this.getLegacyBridge()?.exportHtml?.(options);

    if (!content) {
      console.error('DGPad no devolvió HTML');
      return;
    }

    this.downloadTextFile(
      content,
      'dgpad-export.html',
      'text/html;charset=utf-8'
    );
  }

  exportResponsive(options: LegacyExportOptions): void {
    const content = this.getLegacyBridge()?.exportResponsive?.(options);

    if (!content) {
      console.error('DGPad no devolvió HTML responsive');
      return;
    }

    this.downloadTextFile(
      content,
      'dgpad-export-responsive.html',
      'text/html;charset=utf-8'
    );
  }

  exportSvg(): void {
    const frame = document.getElementById(
      'dgpad-legacy-frame'
    ) as HTMLIFrameElement | null;

    if (!frame?.contentWindow) {
      console.error('No se encontró el iframe de DGPad');
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        return;
      }

      const text = event.data.trim();

      if (text.startsWith('<?xml') || text.startsWith('<svg')) {
        window.removeEventListener('message', handleMessage);
        this.downloadTextFile(text, 'dgpad-export.svg', 'image/svg+xml');
      }
    };

    window.addEventListener('message', handleMessage);
    frame.contentWindow.postMessage({ action: 'get_SVG' }, '*');
  }

  exportPng(): void {
    const frame = document.getElementById(
      'dgpad-legacy-frame'
    ) as HTMLIFrameElement | null;

    if (!frame?.contentWindow) {
      console.error('No se encontró el iframe de DGPad');
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        return;
      }

      const text = event.data.trim();

      if (text.startsWith('data:image/png')) {
        window.removeEventListener('message', handleMessage);
        this.downloadDataUrl(text, 'dgpad-export.png');
      }
    };

    window.addEventListener('message', handleMessage);
    frame.contentWindow.postMessage({ action: 'get_PNG' }, '*');
  }

  getHistoryEntries(): LegacyHistoryEntry[] {
    return this.getLegacyBridge()?.getHistoryEntries?.() ?? [];
  }

  saveHistorySnapshot(): void {
    this.getLegacyBridge()?.saveHistorySnapshot?.();
  }

  openHistoryEntry(index: number): void {
    this.getLegacyBridge()?.openHistoryEntry?.(index);
  }

  clearUnlockedHistory(): void {
    this.getLegacyBridge()?.clearUnlockedHistory?.();
  }

  getAutosaveMinutes(): number {
    return this.getLegacyBridge()?.getAutosaveMinutes?.() ?? 0;
  }

  setAutosaveMinutes(minutes: number): void {
    this.getLegacyBridge()?.setAutosaveMinutes?.(minutes);
  }

  private runLegacyScript(script: string): unknown {
    const win = this.getLegacyWindow();

    if (!win || typeof win.eval !== 'function') {
      throw new Error('No se pudo ejecutar código en DGPad legacy');
    }

    return win.eval.call(win, script);
  }

  private getLegacyBridge(): LegacyBridge | undefined {
    return this.getLegacyWindow()?.dgpadBridge;
  }

  private getLegacyWindow(): LegacyWindow | undefined {
    const frame = document.getElementById(
      'dgpad-legacy-frame'
    ) as HTMLIFrameElement | null;

    if (!frame?.contentWindow) {
      console.error('No se encontró el iframe de DGPad');
      return undefined;
    }

    return frame.contentWindow as LegacyWindow;
  }

  private downloadTextFile(
    content: string,
    fileName: string,
    mimeType: string
  ): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private downloadDataUrl(dataUrl: string, fileName: string): void {
    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = fileName;
    anchor.click();
  }

  undo(): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || !$CANVAS.undoManager) {
        throw new Error('undoManager no está disponible en DGPad legacy');
      }

      if (typeof $CANVAS.undoManager.undo !== 'function') {
        throw new Error('undo no está disponible en DGPad legacy');
      }

      $CANVAS.undoManager.undo();
    `);
  }

  redo(): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || !$CANVAS.undoManager) {
        throw new Error('undoManager no está disponible en DGPad legacy');
      }

      if (typeof $CANVAS.undoManager.redo !== 'function') {
        throw new Error('redo no está disponible en DGPad legacy');
      }

      $CANVAS.undoManager.redo();
    `);
  }

  // ============================================================================
  // FEATURE 1: BOARD POINTS - Métodos Nuevos
  // ============================================================================

  /**
   * Crear un tablero de puntos con un patrón base y rango numérico
   *
   * Crea múltiples puntos con nombres del patrón especificado:
   * - basePattern: "A", startNum: 1, endNum: 3 → A1, A2, A3
   *
   * IMPORTANTE: compute() y paint() se ejecutan UNA SOLA VEZ al final,
   * evitando conflictos de renderizado y asegurando que los puntos permanezcan visibles.
   *
   * @param basePattern Patrón base del nombre (ej: "A", "P", "Punto")
   * @param startNum Número inicial del rango (inclusive)
   * @param endNum Número final del rango (inclusive)
   * @returns Objeto result con success, createdPoints y error opcional
   *
   * @example
   * const result = bridge.createBoardPoints('A', 1, 100);
   * if (result?.success) {
   *   console.log('Creados:', result.createdPoints); // ['A1', 'A2', ..., 'A100']
   * }
   */
  createBoardPoints(
    basePattern?: string,
    startNum?: number,
    endNum?: number,
  ): { success: boolean; createdPoints: string[]; error?: string } {
    try {
      // Parámetros por defecto si se llama sin argumentos desde toolbar
      const pattern = basePattern !== undefined ? basePattern : 'A';
      const start = startNum ?? 1;
      const end = endNum ?? 100;

      const bridge = this.getLegacyBridge();
      if (!bridge) {
        console.error('[Bridge] Legacy bridge not available');
        return {
          success: false,
          createdPoints: [],
          error: 'Canvas not ready',
        };
      }

      if (!pattern || start > end || start < 0 || end < 0) {
        console.error('[Bridge] createBoardPoints: Invalid parameters');
        return {
          success: false,
          createdPoints: [],
          error: 'Invalid parameters',
        };
      }

      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof PointObject !== 'function') {
            throw new Error('Canvas or PointObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var createdPoints = [];

          // FASE 1: Crear TODOS los puntos primero
          for (var i = ${start}; i <= ${end}; i++) {
            var name = ${JSON.stringify(pattern)} + i;
            var x = 100 + i * 50;
            var y = 100 + i * 50;
            var point = new PointObject(canvas, name, x, y, false);
            Cn.addObject(point);
            createdPoints.push(name);
          }

          // FASE 2: compute() y paint() UNA SOLA VEZ
          canvas.compute();
          canvas.paint();

          return createdPoints;
        })()
      `);

      if (Array.isArray(result)) {
        return {
          success: true,
          createdPoints: result,
        };
      }

      return {
        success: false,
        createdPoints: [],
        error: 'Script execution failed',
      };
    } catch (error) {
      console.error('[Bridge] createBoardPoints failed:', error);
      return {
        success: false,
        createdPoints: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Obtener lista de todos los objetos actuales
   *
   * @returns Array de objetos con nombre y familia, o null si error
   */
  getObjectsList(): Array<{ name: string; family: string }> | null {
    try {
      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined') {
            return [];
          }

          var Cn = $CANVAS.getConstruction();
          if (!Cn || typeof Cn.getListObject !== 'function') {
            return [];
          }

          var objects = Cn.getListObject();
          var result = [];

          for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if (obj && typeof obj.getFullName === 'function') {
              result.push({
                name: obj.getFullName(),
                family: obj.family || 'Unknown'
              });
            }
          }

          return result;
        })()
      `);

      return Array.isArray(result) ? result : null;
    } catch (error) {
      console.error('[Bridge] getObjectsList failed:', error);
      return null;
    }
  }

  // ============================================================================
  // FEATURE 2: CALCULATOR CONVERSIONS - Métodos Nuevos
  // ============================================================================

  /**
   * Convertir una expresión matemática a un PointObject
   *
   * @param expression Expresión matemática (ej: "(1+sqrt(5))/2")
   * @returns Nombre del objeto creado o null si error
   */
  convertExpressionToPoint(expression: string): string | null {
    try {
      if (!expression || typeof expression !== 'string') {
        console.error('[Bridge] convertExpressionToPoint: Invalid expression');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
            throw new Error('Canvas or ExpressionObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
          var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

          var obj = new ExpressionObject(Cn, '_a', '', '', '', ${JSON.stringify(expression)}, x, y);

          if (canvas.namesManager && canvas.namesManager.isVisible()) {
            canvas.namesManager.setName(obj);
          } else {
            obj.setName('a');
          }

          obj.setT('');
          obj.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
          canvas.addObject(obj);
          Cn.compute();
          canvas.paint();

          return obj.getFullName();
        })()
      `);

      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] convertExpressionToPoint failed:', error);
      return null;
    }
  }

  /**
   * Convertir una expresión matemática a un ListObject
   *
   * @param expression Expresión matemática que genera una lista
   * @returns Nombre del objeto creado o null si error
   */
  convertExpressionToList(expression: string): string | null {
    try {
      if (!expression || typeof expression !== 'string') {
        console.error('[Bridge] convertExpressionToList: Invalid expression');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          if (
            typeof $CANVAS === 'undefined' ||
            typeof ExpressionObject !== 'function' ||
            typeof ListObject !== 'function'
          ) {
            throw new Error('Canvas, ExpressionObject or ListObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
          var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

          var expr = new ExpressionObject(Cn, '_a', '', '', '', ${JSON.stringify(expression)}, x, y);

          if (canvas.namesManager && canvas.namesManager.isVisible()) {
            canvas.namesManager.setName(expr);
          } else {
            expr.setName('a');
          }

          expr.setT('');
          expr.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
          canvas.addObject(expr);

          var list = new ListObject(Cn, '_l', expr);
          list.setSegmentsSize(0);
          var c = expr.getColor();
          list.setRGBColor(c.getR(), c.getG(), c.getB());
          canvas.addObject(list);

          Cn.compute();
          canvas.paint();

          return list.getFullName();
        })()
      `);

      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] convertExpressionToList failed:', error);
      return null;
    }
  }

  /**
   * Convertir una expresión matemática a un FunctionObject
   *
   * @param expression Expresión matemática que define una función
   * @returns Nombre del objeto creado o null si error
   */
  convertExpressionToFunction(expression: string): string | null {
    try {
      if (!expression || typeof expression !== 'string') {
        console.error('[Bridge] convertExpressionToFunction: Invalid expression');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          if (
            typeof $CANVAS === 'undefined' ||
            typeof ExpressionObject !== 'function' ||
            typeof FunctionObject !== 'function'
          ) {
            throw new Error('Canvas, ExpressionObject or FunctionObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
          var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

          var func = new FunctionObject(Cn, '_f', ${JSON.stringify(expression)}, 'x', x, y);

          if (canvas.namesManager && canvas.namesManager.isVisible()) {
            canvas.namesManager.setName(func);
          } else {
            func.setName('f');
          }

          func.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
          canvas.addObject(func);
          Cn.compute();
          canvas.paint();

          return func.getFullName();
        })()
      `);

      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] convertExpressionToFunction failed:', error);
      return null;
    }
  }

  // ============================================================================
  // FEATURE 3: OTHER TOOLS - Métodos Nuevos
  // ============================================================================

  /**
   * Abrir el menú de herramientas adicionales
   */
  openOtherTools(): void {
    try {
      this.setMode('build');
    } catch (error) {
      console.error('[Bridge] openOtherTools failed:', error);
    }
  }

  /**
   * Crear un Edit Widget (widget de edición de expresión)
   *
   * @returns true si se creó correctamente
   */
  createEditWidgetAction(): boolean {
    try {
      this.createEditWidget_();
      return true;
    } catch (error) {
      console.error('[Bridge] createEditWidgetAction failed:', error);
      return false;
    }
  }

  /**
   * Método auxiliar interno: Crear Edit Widget
   */
  private createEditWidget_(): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || typeof $CANVAS.addText !== 'function') {
        throw new Error('addText no está disponible en DGPad legacy');
      }

      var canvas = $CANVAS;
      var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
      var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

      canvas.addText(
        $L.edit_widget_name +
          " : <input id=\\"exp_name\\" interactiveinput=\\"replace\\">\\n\\n\\u00a7  name=\\"" +
          $L.edit_widget_edit +
          "\\" style=\\"font-size:18px;padding: 5px 10px;background: #4479BA;color: #FFF;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);\\"\\nvar exp_n=Find(\\"exp_name\\");\\nvar exp_e=Find(\\"exp_edit\\");\\nexp_e.setAttribute(\\"target\\",exp_n.value);\\nRefreshInputs();\\n\\n\\u00a7\\n\\n<textarea id=\\"exp_edit\\" target=\\"aa\\" style=\\"width:500px;height:400px\\"></textarea>\\n",
        x,
        y,
        550,
        530,
        "c:rgba(59,79,115,0.18);s:3;r:15;p:4"
      );
    `);
  }

  /**
   * Crear un Edit Widget (compatibilidad pública)
   */
  createEditWidget(): void {
    try {
      this.createEditWidget_();
    } catch (error) {
      console.error('[Bridge] createEditWidget failed:', error);
    }
  }

  /**
   * Limpiar la construcción (eliminar todos los objetos)
   *
   * @returns true si se limpió correctamente
   */
  clearConstructionAction(): boolean {
    try {
      this.clearConstruction();
      return true;
    } catch (error) {
      console.error('[Bridge] clearConstructionAction failed:', error);
      return false;
    }
  }

  /**
   * Limpiar la construcción (eliminar todos los objetos) - método público
   */
  clearConstruction(): void {
    try {
      this.runLegacyScript(`
        if (typeof $CANVAS === 'undefined' || typeof $CANVAS.getConstruction !== 'function') {
          throw new Error('No se encontró $CANVAS');
        }

        var Cn = $CANVAS.getConstruction();

        if (!Cn || typeof Cn.getListObject !== 'function' || typeof Cn.safelyDelete !== 'function') {
          throw new Error('No se pudo limpiar la construcción');
        }

        var objects = Cn.getListObject().slice();

        for (var i = objects.length - 1; i >= 0; i--) {
          Cn.safelyDelete(objects[i]);
        }

        if (typeof $CANVAS.paint === 'function') {
          $CANVAS.paint();
        }
      `);
    } catch (error) {
      console.error('[Bridge] clearConstruction failed:', error);
    }
  }

  /**
   * Deshacer última acción (wrapper mejorado de undo)
   *
   * @returns true si undo se ejecutó
   */
  undoAction(): boolean {
    try {
      this.undo();
      return true;
    } catch (error) {
      console.error('[Bridge] undoAction failed:', error);
      return false;
    }
  }

  /**
   * Rehacer última acción deshecha (wrapper mejorado de redo)
   *
   * @returns true si redo se ejecutó
   */
  redoAction(): boolean {
    try {
      this.redo();
      return true;
    } catch (error) {
      console.error('[Bridge] redoAction failed:', error);
      return false;
    }
  }

  /**
   * Crear un cursor entero (slider discreto)
   *
   * @param name Nombre del cursor (ej: "n")
   * @param minValue Valor mínimo (default: 0)
   * @param maxValue Valor máximo (default: 10)
   * @returns true si se creó correctamente
   */
  createIntegerCursor(name?: string, minValue?: number, maxValue?: number): boolean {
    try {
      const cursorName = name || 'n';
      const min = minValue ?? 0;
      const max = maxValue ?? 10;

      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        console.error('[Bridge] createIntegerCursor: Invalid range');
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
            throw new Error('Canvas or ExpressionObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
          var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

          var obj = new ExpressionObject(Cn, '_a', '', '', '', '', x, y);
          obj.setName(${JSON.stringify(cursorName)});
          obj.setMin(${JSON.stringify(min.toString())});
          obj.setMax(${JSON.stringify(max.toString())});
          obj.setIncrement(1);

          canvas.addObject(obj);
          Cn.compute();
          canvas.paint();
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] createIntegerCursor failed:', error);
      return false;
    }
  }

  /**
   * Crear un cursor continuo (slider analógico)
   *
   * @param name Nombre del cursor (ej: "m")
   * @param minValue Valor mínimo (default: -10)
   * @param maxValue Valor máximo (default: 10)
   * @returns true si se creó correctamente
   */
  createContinuousCursor(
    name?: string,
    minValue?: number,
    maxValue?: number,
  ): boolean {
    try {
      const cursorName = name || 'm';
      const min = minValue ?? -10;
      const max = maxValue ?? 10;

      if (min >= max) {
        console.error('[Bridge] createContinuousCursor: Invalid range');
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
            throw new Error('Canvas or ExpressionObject not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();
          var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
          var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

          var obj = new ExpressionObject(Cn, '_a', '', '', '', '0', x, y);
          obj.setName(${JSON.stringify(cursorName)});
          obj.setMin(${JSON.stringify(min.toString())});
          obj.setMax(${JSON.stringify(max.toString())});

          canvas.addObject(obj);
          Cn.compute();
          canvas.paint();
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] createContinuousCursor failed:', error);
      return false;
    }
  }

  /**
   * Alias para compatibilidad: crear un cursor continuo con parámetros por nombre
   */
  createContinuousCursorAction(
    name = 'm',
    minValue = -10,
    maxValue = 10,
  ): boolean {
    return this.createContinuousCursor(name, minValue, maxValue);
  }

  /**
   * Crear Expression Points (lista de puntos desde expresión)
   *
   * @returns true si se creó correctamente
   */
  createExpressionPointsAction(): boolean {
    try {
      this.createExpressionPoints();
      return true;
    } catch (error) {
      console.error('[Bridge] createExpressionPointsAction failed:', error);
      return false;
    }
  }

  /**
   * Crear Expression Points (lista de puntos desde expresión) - método público
   */
  createExpressionPoints(): void {
    try {
      this.runLegacyScript(`
        if (
          typeof $CANVAS === 'undefined' ||
          typeof ExpressionObject !== 'function' ||
          typeof ListObject !== 'function'
        ) {
          throw new Error('ExpressionObject/ListObject no están disponibles en DGPad legacy');
        }

        var canvas = $CANVAS;
        var Cn = canvas.getConstruction();
        var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
        var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

        var cx = Cn.coordsSystem.x(Cn.getWidth() / 2);
        var cy = Cn.coordsSystem.y(Cn.getHeight() / 2);
        var l = Cn.coordsSystem.l(Cn.getHeight()) / 4;
        var L = l * (1 + Math.sqrt(5)) / 2;

        var t = [
          [cx - L / 2, cy - l / 2],
          [cx + L / 2, cy - l / 2],
          [cx + L / 2, cy + l / 2],
          [cx - L / 2, cy + l / 2],
          [cx - L / 2, cy - l / 2]
        ];

        for (var i = 0; i < t.length; i++) {
          t[i] = "[" + t[i].toString() + "]";
        }

        var expr = new ExpressionObject(Cn, "_a", "", "", "", "[" + t.toString() + "]", x, y);

        if (canvas.namesManager && canvas.namesManager.isVisible()) {
          canvas.namesManager.setName(expr);
        } else {
          expr.setName("a");
        }

        expr.setT("");
        expr.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
        canvas.addObject(expr);

        var list = new ListObject(Cn, "_l", expr);
        list.setSegmentsSize(0);

        var c = expr.getColor();
        list.setRGBColor(c.getR(), c.getG(), c.getB());
        canvas.addObject(list);

        Cn.compute();
        canvas.paint();
      `);
    } catch (error) {
      console.error('[Bridge] createExpressionPoints failed:', error);
    }
  }

  /**
   * Crear Expression Segments (segmentos desde expresión)
   *
   * @returns true si se creó correctamente
   */
  createExpressionSegmentsAction(): boolean {
    try {
      this.createExpressionSegments();
      return true;
    } catch (error) {
      console.error('[Bridge] createExpressionSegmentsAction failed:', error);
      return false;
    }
  }

  /**
   * Crear Expression Segments (segmentos desde expresión) - método público
   */
  createExpressionSegments(): void {
    try {
      this.runLegacyScript(`
        if (
          typeof $CANVAS === 'undefined' ||
          typeof ExpressionObject !== 'function' ||
          typeof ListObject !== 'function'
        ) {
          throw new Error('ExpressionObject/ListObject no están disponibles en DGPad legacy');
        }

        var canvas = $CANVAS;
        var Cn = canvas.getConstruction();
        var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
        var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

        var cx = Cn.coordsSystem.x(Cn.getWidth() / 2);
        var cy = Cn.coordsSystem.y(Cn.getHeight() / 2);
        var l = Cn.coordsSystem.l(Cn.getHeight()) / 4;
        var L = l * (1 + Math.sqrt(5)) / 2;

        var t = [
          [cx - L / 2, cy - l / 2],
          [cx + L / 2, cy - l / 2],
          [cx + L / 2, cy + l / 2],
          [cx - L / 2, cy + l / 2],
          [cx - L / 2, cy - l / 2]
        ];

        for (var i = 0; i < t.length; i++) {
          t[i] = "[" + t[i].toString() + "]";
        }

        var expr = new ExpressionObject(Cn, "_a", "", "", "", "[" + t.toString() + "]", x, y);

        if (canvas.namesManager && canvas.namesManager.isVisible()) {
          canvas.namesManager.setName(expr);
        } else {
          expr.setName("a");
        }

        expr.setT("");
        expr.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
        canvas.addObject(expr);

        var list = new ListObject(Cn, "_l", expr);
        list.setSegmentsSize(1);

        var c = expr.getColor();
        list.setRGBColor(c.getR(), c.getG(), c.getB());
        canvas.addObject(list);

        Cn.compute();
        canvas.paint();
      `);
    } catch (error) {
      console.error('[Bridge] createExpressionSegments failed:', error);
    }
  }

  /**
   * Crear un Blockly Button (botón que abre Blockly editor)
   *
   * @returns true si se creó correctamente
   */
  createBlocklyButtonAction(): boolean {
    try {
      this.createBlocklyButton();
      return true;
    } catch (error) {
      console.error('[Bridge] createBlocklyButtonAction failed:', error);
      return false;
    }
  }

  /**
   * Crear un Blockly Button (botón que abre Blockly editor) - método público
   */
  createBlocklyButton(): void {
    try {
      this.runLegacyScript(`
        if (typeof $CANVAS === 'undefined') {
          throw new Error('No se encontró $CANVAS');
        }

        var canvas = $CANVAS;
        var Cn = canvas.getConstruction();

        if (!canvas || !Cn || typeof BlocklyButtonObject !== 'function') {
          throw new Error('BlocklyButtonObject no está disponible en DGPad legacy');
        }

        if (typeof $U === 'undefined' || typeof $U.prompt !== 'function') {
          throw new Error('$U.prompt no está disponible en DGPad legacy');
        }

        var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
        var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

        $U.prompt(
          $L.create_blockly_program_change_message,
          $L.create_blockly_program_name,
          "text",
          function(_old, _new) {
            if (_new === "") {
              _new = _old;
            }

            var obj = new BlocklyButtonObject(Cn, "blk_btn", _new, x, y);
            obj.setOpacity(canvas.prefs.opacity.blockly_button);
            canvas.addObject(obj);
            Cn.compute();
            canvas.paint();
            canvas.blocklyManager.edit(obj);
          },
          450,
          165,
          430
        );
      `);
    } catch (error) {
      console.error('[Bridge] createBlocklyButton failed:', error);
    }
  }

  /**
   * Crear Expression (objeto de expresión matemática)
   *
   * @returns true si se creó correctamente
   */
  createExpressionAction(): boolean {
    try {
      this.createExpression();
      return true;
    } catch (error) {
      console.error('[Bridge] createExpressionAction failed:', error);
      return false;
    }
  }

  /**
   * Crear Expression (objeto de expresión matemática) - método público
   */
  createExpression(): void {
    try {
      this.runLegacyScript(`
        if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
          throw new Error('ExpressionObject no está disponible en DGPad legacy');
        }

        var canvas = $CANVAS;
        var Cn = canvas.getConstruction();
        var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
        var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

        var obj = new ExpressionObject(Cn, "_a", "", "", "", "(1+sqrt(5))/2", x, y);

        if (canvas.namesManager && canvas.namesManager.isVisible()) {
          canvas.namesManager.setName(obj);
        } else {
          obj.setName("a");
        }

        obj.setT("");
        obj.setRGBColor(Math.random() * 128, Math.random() * 128, Math.random() * 128);
        canvas.addObject(obj);
        Cn.compute();
        canvas.paint();
      `);
    } catch (error) {
      console.error('[Bridge] createExpression failed:', error);
    }
  }

  // ============================================================================
  // FEATURE 4: HISTORY - Métodos Nuevos
  // ============================================================================

  /**
   * Guardar snapshot actual del historial
   *
   * @returns Índice del snapshot guardado o null si error
   */
  saveHistorySnapshotAction(): number | null {
    try {
      this.saveHistorySnapshot();
      const entries = this.getHistoryEntries();
      return entries && entries.length > 0 ? entries[entries.length - 1].index : null;
    } catch (error) {
      console.error('[Bridge] saveHistorySnapshotAction failed:', error);
      return null;
    }
  }

  /**
   * Abrir/restaurar entrada del historial en índice específico
   *
   * @param index Índice del snapshot a restaurar
   * @returns true si se restauró correctamente
   */
  openHistoryEntryAction(index: number): boolean {
    try {
      if (!Number.isInteger(index) || index < 0) {
        console.error('[Bridge] openHistoryEntryAction: Invalid index');
        return false;
      }

      this.openHistoryEntry(index);
      return true;
    } catch (error) {
      console.error('[Bridge] openHistoryEntryAction failed:', error);
      return false;
    }
  }

  /**
   * Eliminar entrada del historial en índice específico
   *
   * @param index Índice del snapshot a eliminar
   * @returns true si se eliminó correctamente
   */
  deleteHistoryEntryAction(index: number): boolean {
    try {
      if (!Number.isInteger(index) || index < 0) {
        console.error('[Bridge] deleteHistoryEntryAction: Invalid index');
        return false;
      }

      const bridge = this.getLegacyBridge();
      if (!bridge) {
        console.error('[Bridge] Legacy bridge not available');
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.historyManager) {
            throw new Error('historyManager not available');
          }

          if (typeof $CANVAS.historyManager.removeEntry === 'function') {
            $CANVAS.historyManager.removeEntry(${index});
          }
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] deleteHistoryEntryAction failed:', error);
      return false;
    }
  }

  /**
   * Limpiar todas las entradas del historial no bloqueadas
   *
   * @returns true si se completó
   */
  clearUnlockedHistoryAction(): boolean {
    try {
      this.clearUnlockedHistory();
      return true;
    } catch (error) {
      console.error('[Bridge] clearUnlockedHistoryAction failed:', error);
      return false;
    }
  }

  // ============================================================================
  // FEATURE 5: ADVANCED PROPERTIES - Métodos Nuevos
  // ============================================================================

  /**
   * Actualizar propiedad avanzada en objeto(s) seleccionado(s)
   *
   * @param property Nombre de la propiedad
   * @param value Nuevo valor
   * @param targets Array de nombres de objetos (si undefined, usar selección actual)
   * @returns true si se actualizó correctamente
   */
  updateAdvancedProperty(
    property: string,
    value: unknown,
    targets?: string[],
  ): boolean {
    try {
      if (!property || value === null || value === undefined) {
        console.error('[Bridge] updateAdvancedProperty: Invalid parameters');
        return false;
      }

      const bridge = this.getLegacyBridge();
      if (!bridge) {
        console.error('[Bridge] Legacy bridge not available');
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined') {
            throw new Error('Canvas not available');
          }

          var canvas = $CANVAS;
          var Cn = canvas.getConstruction();

          var objectsToUpdate = ${targets ? JSON.stringify(targets) : '[]'};

          if (objectsToUpdate.length === 0) {
            var selectedObj = canvas.selectedObject;
            if (selectedObj) {
              objectsToUpdate = [selectedObj.getFullName()];
            }
          }

          for (var i = 0; i < objectsToUpdate.length; i++) {
            var obj = Cn.find(objectsToUpdate[i]);
            if (!obj) continue;

            var propName = 'set' + ${JSON.stringify(property)}.charAt(0).toUpperCase() + 
                          ${JSON.stringify(property)}.slice(1);

            if (typeof obj[propName] === 'function') {
              obj[propName](${JSON.stringify(value)});
            }
          }

          canvas.paint();
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] updateAdvancedProperty failed:', error);
      return false;
    }
  }

  /**
   * Obtener restricciones/validaciones para una propiedad específica
   *
   * @param family Familia de objeto (ej: "Point", "Line", "Circle")
   * @param property Nombre de la propiedad
   * @returns Objeto con restricciones o null
   */
  getPropertyConstraints(
    family: string,
    property: string,
  ): {
    type: string;
    minValue?: number;
    maxValue?: number;
    step?: number;
    allowedValues?: (string | number)[];
    help?: string;
  } | null {
    try {
      if (!family || !property) {
        console.error('[Bridge] getPropertyConstraints: Invalid parameters');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          var constraints = {
            precision: { type: 'number', minValue: 0, maxValue: 10, step: 1, help: 'Precisión de cálculo' },
            increment: { type: 'number', minValue: 0.01, maxValue: 100, step: 0.01, help: 'Incremento del cursor' },
            shape: { type: 'select', allowedValues: [0, 1, 2, 3, 4], help: 'Forma del punto' },
            dash: { type: 'boolean', help: 'Línea discontinua' },
            noMouse: { type: 'boolean', help: 'No responde a mouse' },
            track: { type: 'boolean', help: 'Seguimiento de movimiento' },
            angle360: { type: 'boolean', help: 'Ángulo 360 grados' },
            exclusive: { type: 'boolean', help: 'Modo exclusivo' },
            layer: { type: 'number', minValue: 0, maxValue: 1000, step: 1, help: 'Capa del objeto' },
            axisWidth: { type: 'number', minValue: 1, maxValue: 10, step: 1, help: 'Ancho del eje' },
            gridWidth: { type: 'number', minValue: 1, maxValue: 100, step: 1, help: 'Ancho de cuadrícula' },
            showGrid: { type: 'boolean', help: 'Mostrar cuadrícula' },
            onlyPositive: { type: 'boolean', help: 'Solo valores positivos' },
            centerZoom: { type: 'boolean', help: 'Zoom centrado' }
          };

          return constraints[${JSON.stringify(property)}] || null;
        })()
      `);

      if (result && typeof result === 'object' && 'type' in result) {
        return result as {
          type: string;
          minValue?: number;
          maxValue?: number;
          step?: number;
          allowedValues?: (string | number)[];
          help?: string;
        };
      }
      return null;
    } catch (error) {
      console.error('[Bridge] getPropertyConstraints failed:', error);
      return null;
    }
  }

  // ============================================================================
  // FEATURE 6: MACROS - Métodos Nuevos
  // ============================================================================

  /**
   * Obtener próximo prompt en ejecución de macro
   *
   * @param response Respuesta a prompt anterior
   * @returns Próximo prompt o null si macro completada
   */
  getNextMacroPrompt(response: string): LegacyActiveMacro | null {
    try {
      if (!response || typeof response !== 'string') {
        console.error('[Bridge] getNextMacroPrompt: Invalid response');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.macroManager) {
            return null;
          }

          if (typeof $CANVAS.macroManager.processResponse === 'function') {
            return $CANVAS.macroManager.processResponse(${JSON.stringify(response)});
          }

          return $CANVAS.macroManager.getActiveMacro ? $CANVAS.macroManager.getActiveMacro() : null;
        })()
      `);

      if (result && typeof result === 'object' && 'key' in result) {
        return result as LegacyActiveMacro;
      }
      return null;
    } catch (error) {
      console.error('[Bridge] getNextMacroPrompt failed:', error);
      return null;
    }
  }

  /**
   * Completar ejecución de macro
   *
   * @returns true si se completó correctamente
   */
  completeMacroAction(): boolean {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge) {
        console.error('[Bridge] Legacy bridge not available');
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.macroManager) {
            return false;
          }

          if (typeof $CANVAS.macroManager.completeMacro === 'function') {
            $CANVAS.macroManager.completeMacro();
            return true;
          }

          return false;
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] completeMacroAction failed:', error);
      return false;
    }
  }

  /**
   * Obtener draft (borrador) de macro específica
   *
   * @param key Identificador de la macro
   * @returns Draft con parámetros y targets o null
   */
  getMacroDraftAction(key: string): { params: string[]; targets: string[] } | null {
    try {
      if (!key || typeof key !== 'string') {
        console.error('[Bridge] getMacroDraftAction: Invalid key');
        return null;
      }

      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.macroManager) {
            return null;
          }

          if (typeof $CANVAS.macroManager.getDraft === 'function') {
            return $CANVAS.macroManager.getDraft(${JSON.stringify(key)});
          }

          return null;
        })()
      `);

      if (
        result &&
        typeof result === 'object' &&
        'params' in result &&
        'targets' in result &&
        Array.isArray(result.params) &&
        Array.isArray(result.targets)
      ) {
        return result as { params: string[]; targets: string[] };
      }
      return null;
    } catch (error) {
      console.error('[Bridge] getMacroDraftAction failed:', error);
      return null;
    }
  }

  /**
   * Guardar draft de ejecución de macro
   *
   * @param macroKey Identificador de la macro
   * @param params Array de parámetros/respuestas
   * @param targets Array de nombres de objetos seleccionados
   */
  saveMacroDraftAction(
    macroKey: string,
    params: string[],
    targets: string[],
  ): void {
    try {
      if (!macroKey) {
        console.error('[Bridge] saveMacroDraftAction: Invalid macro key');
        return;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.macroManager) {
            return;
          }

          if (typeof $CANVAS.macroManager.saveDraft === 'function') {
            $CANVAS.macroManager.saveDraft(${JSON.stringify(macroKey)}, 
              ${JSON.stringify(params)}, 
              ${JSON.stringify(targets)});
          }
        })()
      `);
    } catch (error) {
      console.error('[Bridge] saveMacroDraftAction failed:', error);
    }
  }

  // ============================================================================
  // FEATURE 7: NAMES - Métodos Nuevos
  // ============================================================================

  /**
   * Renombrar un objeto existente
   *
   * @param oldName Nombre actual del objeto
   * @param newName Nuevo nombre (debe ser único)
   * @returns true si se renombró correctamente
   */
  renameObject(oldName: string, newName: string): boolean {
    try {
      if (!oldName || !newName || oldName === newName) {
        console.error('[Bridge] renameObject: Invalid names');
        return false;
      }

      // Verificar que newName no existe
      const usedNames = this.getUsedNames();
      if (usedNames.includes(newName)) {
        console.error(`[Bridge] renameObject: Name "${newName}" already exists`);
        return false;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined') {
            throw new Error('Canvas not available');
          }

          var Cn = $CANVAS.getConstruction();
          var obj = Cn.find(${JSON.stringify(oldName)});

          if (!obj) {
            throw new Error('Object not found: ' + ${JSON.stringify(oldName)});
          }

          if (typeof obj.setName === 'function') {
            obj.setName(${JSON.stringify(newName)});
          }

          $CANVAS.paint();
        })()
      `);

      return true;
    } catch (error) {
      console.error('[Bridge] renameObject failed:', error);
      return false;
    }
  }

  /**
   * Mostrar o ocultar nombres de objetos en canvas
   *
   * @param visible true para mostrar, false para ocultar
   */
  setNamesVisible(visible: boolean): void {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge) {
        console.error('[Bridge] Legacy bridge not available');
        return;
      }

      this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || !$CANVAS.namesManager) {
            return;
          }

          if (${visible}) {
            if (typeof $CANVAS.namesManager.show === 'function') {
              $CANVAS.namesManager.show();
            } else if (typeof $CANVAS.namesManager.openNames === 'function') {
              $CANVAS.namesManager.openNames();
            }
          } else {
            if (typeof $CANVAS.namesManager.hide === 'function') {
              $CANVAS.namesManager.hide();
            } else if (typeof $CANVAS.namesManager.closeNames === 'function') {
              $CANVAS.namesManager.closeNames();
            }
          }

          $CANVAS.paint();
        })()
      `);
    } catch (error) {
      console.error('[Bridge] setNamesVisible failed:', error);
    }
  }

  // ============================================================================
  // FEATURE 8: EXPORT - Métodos Nuevos
  // ============================================================================

  /**
   * Exportar figura como SVG
   *
   * @returns Contenido SVG como string o null si error
   */
  exportSvgAsString(): string | null {
    try {
      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof $CANVAS.exportSVG !== 'function') {
            throw new Error('exportSVG not available');
          }

          return $CANVAS.exportSVG();
        })()
      `);

      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportSvgAsString failed:', error);
      return null;
    }
  }

  /**
   * Exportar figura como PNG
   *
   * @returns Data URL PNG o null si error
   */
  exportPngAsDataUrl(): string | null {
    try {
      const result = this.runLegacyScript(`
        (function() {
          if (typeof $CANVAS === 'undefined' || typeof $CANVAS.exportPNG !== 'function') {
            throw new Error('exportPNG not available');
          }

          return $CANVAS.exportPNG();
        })()
      `);

      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportPngAsDataUrl failed:', error);
      return null;
    }
  }

  /**
   * Exportar texto con opciones
   *
   * @param options Opciones de exportación
   * @returns Contenido de texto o null si error
   */
  exportTextWithOptions(options: LegacyExportOptions = {
    fixWidgets: false,
    fixDgScripts: false,
    hideControlPanel: false,
    disableZoom: false,
  }): string | null {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge?.exportText) {
        console.error('[Bridge] exportText not available');
        return null;
      }

      const result = bridge.exportText(options);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportTextWithOptions failed:', error);
      return null;
    }
  }

  /**
   * Exportar como HTML con JavaScript
   *
   * @param options Opciones de exportación
   * @returns Contenido HTML o null si error
   */
  exportHtmlJsWithOptions(options: LegacyExportOptions = {
    fixWidgets: false,
    fixDgScripts: false,
    hideControlPanel: false,
    disableZoom: false,
  }): string | null {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge?.exportHtmlJs) {
        console.error('[Bridge] exportHtmlJs not available');
        return null;
      }

      const result = bridge.exportHtmlJs(options);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportHtmlJsWithOptions failed:', error);
      return null;
    }
  }

  /**
   * Exportar como HTML simplificado
   *
   * @param options Opciones de exportación
   * @returns Contenido HTML o null si error
   */
  exportHtmlWithOptions(options: LegacyExportOptions = {
    fixWidgets: false,
    fixDgScripts: false,
    hideControlPanel: false,
    disableZoom: false,
  }): string | null {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge?.exportHtml) {
        console.error('[Bridge] exportHtml not available');
        return null;
      }

      const result = bridge.exportHtml(options);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportHtmlWithOptions failed:', error);
      return null;
    }
  }

  /**
   * Exportar como HTML responsive
   *
   * @param options Opciones de exportación
   * @returns Contenido HTML o null si error
   */
  exportResponsiveWithOptions(options: LegacyExportOptions = {
    fixWidgets: false,
    fixDgScripts: false,
    hideControlPanel: false,
    disableZoom: false,
  }): string | null {
    try {
      const bridge = this.getLegacyBridge();
      if (!bridge?.exportResponsive) {
        console.error('[Bridge] exportResponsive not available');
        return null;
      }

      const result = bridge.exportResponsive(options);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error('[Bridge] exportResponsiveWithOptions failed:', error);
      return null;
    }
  }

  /**
   * Descargar figura como SVG
   */
  downloadSvg(): void {
    try {
      const content = this.exportSvgAsString();
      if (!content) {
        console.error('[Bridge] No SVG content to download');
        return;
      }

      this.downloadTextFile(content, 'dgpad-export.svg', 'image/svg+xml;charset=utf-8');
    } catch (error) {
      console.error('[Bridge] downloadSvg failed:', error);
    }
  }

  /**
   * Descargar figura como PNG
   */
  downloadPngAction(): void {
    try {
      const dataUrl = this.exportPngAsDataUrl();
      if (!dataUrl) {
        console.error('[Bridge] No PNG data to download');
        return;
      }

      this.downloadDataUrl(dataUrl, 'dgpad-export.png');
    } catch (error) {
      console.error('[Bridge] downloadPngAction failed:', error);
    }
  }

  /**
   * Descargar figura como texto
   *
   * @param options Opciones de exportación
   */
  downloadTextFile_(): void {
    try {
      const content = this.exportTextWithOptions();
      if (!content) {
        console.error('[Bridge] No text content to download');
        return;
      }

      this.downloadTextFile(content, 'dgpad-export.txt', 'text/plain;charset=utf-8');
    } catch (error) {
      console.error('[Bridge] downloadTextFile_ failed:', error);
    }
  }

  /**
   * Descargar figura como HTML con JS
   */
  downloadHtmlJs(): void {
    try {
      const content = this.exportHtmlJsWithOptions();
      if (!content) {
        console.error('[Bridge] No HTML+JS content to download');
        return;
      }

      this.downloadTextFile(content, 'dgpad-export-html-js.html', 'text/html;charset=utf-8');
    } catch (error) {
      console.error('[Bridge] downloadHtmlJs failed:', error);
    }
  }

  /**
   * Descargar figura como HTML simplificado
   */
  downloadHtmlStandalone(): void {
    try {
      const content = this.exportHtmlWithOptions();
      if (!content) {
        console.error('[Bridge] No HTML content to download');
        return;
      }

      this.downloadTextFile(content, 'dgpad-export.html', 'text/html;charset=utf-8');
    } catch (error) {
      console.error('[Bridge] downloadHtmlStandalone failed:', error);
    }
  }

  /**
   * Descargar figura como HTML responsive
   */
  downloadResponsive(): void {
    try {
      const content = this.exportResponsiveWithOptions();
      if (!content) {
        console.error('[Bridge] No responsive HTML content to download');
        return;
      }

      this.downloadTextFile(
        content,
        'dgpad-export-responsive.html',
        'text/html;charset=utf-8',
      );
    } catch (error) {
      console.error('[Bridge] downloadResponsive failed:', error);
    }
  }

  


}
