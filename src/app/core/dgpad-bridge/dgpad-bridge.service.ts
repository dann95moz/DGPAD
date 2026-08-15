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

  createBlocklyButton(): void {
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
  }

  createExpression(): void {
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
  }

  createExpressionPoints(): void {
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
  }

  createExpressionSegments(): void {
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
  }

  createBoardPoints(): void {
    this.getLegacyBridge()?.createBoardPoints?.();
  }

  createIntegerCursor(): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
        throw new Error('ExpressionObject no está disponible en DGPad legacy');
      }

      var canvas = $CANVAS;
      var Cn = canvas.getConstruction();
      var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
      var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

      var obj = new ExpressionObject(Cn, "_a", "", "", "", "", x, y);

      obj.setName("n");
      obj.setMin("0");
      obj.setMax("10");
      obj.setIncrement(1);

      canvas.addObject(obj);
      Cn.compute();
      canvas.paint();
    `);
  }

  createContinuousCursor(): void {
    this.runLegacyScript(`
      if (typeof $CANVAS === 'undefined' || typeof ExpressionObject !== 'function') {
        throw new Error('ExpressionObject no está disponible en DGPad legacy');
      }

      var canvas = $CANVAS;
      var Cn = canvas.getConstruction();
      var x = Math.round(canvas.getWidth() / 2 / 10) * 10;
      var y = Math.round(canvas.getHeight() / 2 / 10) * 10;

      var obj = new ExpressionObject(Cn, "_a", "", "", "", "0", x, y);

      obj.setName("m");
      obj.setMin("-10");
      obj.setMax("10");

      canvas.addObject(obj);
      Cn.compute();
      canvas.paint();
    `);
  }

  createEditWidget(): void {
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

  clearConstruction(): void {
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

  createMidPoint(_name: string, _pointA: string, _pointB: string): void {
    throw new Error('Punto medio aún no está conectado en Angular');
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

  


}
