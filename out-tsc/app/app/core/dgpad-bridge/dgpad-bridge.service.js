import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DgpadBridgeService {
    setMode(mode) {
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
    closeProperties() {
        this.getLegacyBridge()?.closeProperties?.();
    }
    getPropertyState() {
        return this.getLegacyBridge()?.getPropertyState?.() ?? null;
    }
    getGlobalPropertyState() {
        return this.getLegacyBridge()?.getGlobalPropertyState?.() ?? null;
    }
    getAxisPropertyState() {
        return this.getLegacyBridge()?.getAxisPropertyState?.() ?? null;
    }
    getWidgetState() {
        return this.getLegacyBridge()?.getWidgetState?.() ?? null;
    }
    updateProperty(property, value, applyAll = false) {
        this.getLegacyBridge()?.updateProperty?.(property, value, applyAll);
    }
    updateGlobalProperty(property, value) {
        this.getLegacyBridge()?.updateGlobalProperty?.(property, value);
    }
    updateAxisProperty(property, value) {
        this.getLegacyBridge()?.updateAxisProperty?.(property, value);
    }
    updateWidgetProperty(property, value) {
        this.getLegacyBridge()?.updateWidgetProperty?.(property, value);
    }
    createWidget(options) {
        this.getLegacyBridge()?.createWidget?.(options);
    }
    getMacroCatalog() {
        return this.getLegacyBridge()?.getMacroCatalog?.() ?? { plugins: [], tools: [] };
    }
    startMacro(key) {
        this.getLegacyBridge()?.startMacro?.(key);
    }
    getActiveMacro() {
        return this.getLegacyBridge()?.getActiveMacro?.() ?? null;
    }
    getMacroDraft() {
        return this.getLegacyBridge()?.getMacroDraft?.() ?? null;
    }
    saveMacroDraft(name) {
        this.getLegacyBridge()?.saveMacroDraft?.(name);
    }
    getCalculatorState() {
        return this.getLegacyBridge()?.getCalculatorState?.() ?? null;
    }
    beginCalculatorExpression() {
        this.getLegacyBridge()?.beginCalculatorExpression?.();
    }
    updateCalculatorField(field, value) {
        this.getLegacyBridge()?.updateCalculatorField?.(field, value);
    }
    setCalculatorDegrees(value) {
        this.getLegacyBridge()?.setCalculatorDegrees?.(value);
    }
    validateCalculator() {
        this.getLegacyBridge()?.validateCalculator?.();
    }
    cancelCalculator() {
        this.getLegacyBridge()?.cancelCalculator?.();
    }
    openNames() {
        const bridge = this.getLegacyBridge();
        if (!bridge?.openNames) {
            return;
        }
        if (!bridge.isNamesVisible?.()) {
            bridge.openNames();
        }
    }
    closeNames() {
        const bridge = this.getLegacyBridge();
        if (!bridge?.closeNames) {
            return;
        }
        if (bridge.isNamesVisible?.()) {
            bridge.closeNames();
        }
    }
    isNamesVisible() {
        return this.getLegacyBridge()?.isNamesVisible?.() ?? false;
    }
    toggleGrid() {
        return this.getLegacyBridge()?.toggleGrid?.() ?? false;
    }
    isGridVisible() {
        return this.getLegacyBridge()?.isGridVisible?.() ?? false;
    }
    resetZoom() {
        this.getLegacyBridge()?.resetZoom?.();
    }
    openConstructionProtocol() {
        this.getLegacyBridge()?.openConstructionProtocol?.();
    }
    duplicateFigure() {
        this.getLegacyBridge()?.duplicateFigure?.();
    }
    openFile() {
        this.getLegacyBridge()?.openFile?.();
    }
    saveFile() {
        this.getLegacyBridge()?.saveFile?.();
    }
    createBlocklyButton() {
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
    createExpression() {
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
    createExpressionPoints() {
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
    createExpressionSegments() {
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
    createBoardPoints() {
        this.getLegacyBridge()?.createBoardPoints?.();
    }
    createIntegerCursor() {
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
    createContinuousCursor() {
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
    createEditWidget() {
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
    clearConstruction() {
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
    createAnyPoint(name) {
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
    createLine(name, pointA, pointB) {
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
    createSegment(name, pointA, pointB) {
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
    createMidPoint(_name, _pointA, _pointB) {
        throw new Error('Punto medio aún no está conectado en Angular');
    }
    getUsedNames() {
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
            ? result.filter((value) => typeof value === 'string')
            : [];
    }
    exportText(options) {
        const content = this.getLegacyBridge()?.exportText?.(options);
        if (!content) {
            console.error('DGPad no devolvió texto de exportación');
            return;
        }
        this.downloadTextFile(content, 'dgpad-export.txt', 'text/plain;charset=utf-8');
    }
    exportHtmlJs(options, fileName = 'dgpad-export-html-js.html') {
        const content = this.getLegacyBridge()?.exportHtmlJs?.(options);
        if (!content) {
            console.error('DGPad no devolvió HTML + JS');
            return;
        }
        this.downloadTextFile(content, fileName, 'text/html;charset=utf-8');
    }
    exportHtml(options) {
        const content = this.getLegacyBridge()?.exportHtml?.(options);
        if (!content) {
            console.error('DGPad no devolvió HTML');
            return;
        }
        this.downloadTextFile(content, 'dgpad-export.html', 'text/html;charset=utf-8');
    }
    exportResponsive(options) {
        const content = this.getLegacyBridge()?.exportResponsive?.(options);
        if (!content) {
            console.error('DGPad no devolvió HTML responsive');
            return;
        }
        this.downloadTextFile(content, 'dgpad-export-responsive.html', 'text/html;charset=utf-8');
    }
    exportSvg() {
        const frame = document.getElementById('dgpad-legacy-frame');
        if (!frame?.contentWindow) {
            console.error('No se encontró el iframe de DGPad');
            return;
        }
        const handleMessage = (event) => {
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
    exportPng() {
        const frame = document.getElementById('dgpad-legacy-frame');
        if (!frame?.contentWindow) {
            console.error('No se encontró el iframe de DGPad');
            return;
        }
        const handleMessage = (event) => {
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
    getHistoryEntries() {
        return this.getLegacyBridge()?.getHistoryEntries?.() ?? [];
    }
    saveHistorySnapshot() {
        this.getLegacyBridge()?.saveHistorySnapshot?.();
    }
    openHistoryEntry(index) {
        this.getLegacyBridge()?.openHistoryEntry?.(index);
    }
    clearUnlockedHistory() {
        this.getLegacyBridge()?.clearUnlockedHistory?.();
    }
    getAutosaveMinutes() {
        return this.getLegacyBridge()?.getAutosaveMinutes?.() ?? 0;
    }
    setAutosaveMinutes(minutes) {
        this.getLegacyBridge()?.setAutosaveMinutes?.(minutes);
    }
    runLegacyScript(script) {
        const win = this.getLegacyWindow();
        if (!win || typeof win.eval !== 'function') {
            throw new Error('No se pudo ejecutar código en DGPad legacy');
        }
        return win.eval.call(win, script);
    }
    getLegacyBridge() {
        return this.getLegacyWindow()?.dgpadBridge;
    }
    getLegacyWindow() {
        const frame = document.getElementById('dgpad-legacy-frame');
        if (!frame?.contentWindow) {
            console.error('No se encontró el iframe de DGPad');
            return undefined;
        }
        return frame.contentWindow;
    }
    downloadTextFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        URL.revokeObjectURL(url);
    }
    downloadDataUrl(dataUrl, fileName) {
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.click();
    }
    undo() {
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
    redo() {
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
    static ɵfac = function DgpadBridgeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DgpadBridgeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DgpadBridgeService, factory: DgpadBridgeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DgpadBridgeService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
