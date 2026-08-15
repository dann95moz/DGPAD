import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { ExportDialogComponent, } from '../../export/export-dialog/export-dialog.component';
import { HistoryDialogComponent, } from '../../history/history-dialog/history-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/dgpad-bridge/dgpad-bridge.service";
export class EditorPageComponent {
    dgpadBridge;
    exportDialog;
    historyDialog;
    toolbar;
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    ngAfterViewInit() {
        this.mountLegacyDgpad();
    }
    openExportDialog() {
        this.exportDialog?.open();
    }
    handleExportDialogClosed() {
        this.toolbar?.closeExportState();
    }
    openHistoryDialog() {
        this.refreshHistoryDialog(true);
    }
    handleHistoryDialogClosed() {
        this.toolbar?.closeHistoryState();
    }
    handleHistoryRefreshRequested() {
        this.refreshHistoryDialog(true);
    }
    handleHistorySaveRequested() {
        this.dgpadBridge.saveHistorySnapshot();
        this.refreshHistoryDialog(true);
    }
    handleHistoryClearRequested() {
        this.dgpadBridge.clearUnlockedHistory();
        this.refreshHistoryDialog(true);
    }
    handleHistoryOpenEntryRequested(index) {
        this.dgpadBridge.openHistoryEntry(index);
    }
    handleAutosaveChanged(minutes) {
        this.dgpadBridge.setAutosaveMinutes(minutes);
        this.refreshHistoryDialog(true);
    }
    handleExport(options) {
        const exportOptions = {
            fixWidgets: options.fixWidgets,
            fixDgScripts: options.fixDgScripts,
            hideControlPanel: options.hideControlPanel,
            disableZoom: options.disableZoom,
        };
        if (options.format === 'svg') {
            this.dgpadBridge.exportSvg();
            return;
        }
        if (options.format === 'png') {
            this.dgpadBridge.exportPng();
            return;
        }
        if (options.format === 'text') {
            this.dgpadBridge.exportText(exportOptions);
            return;
        }
        if (options.format === 'html_js') {
            this.dgpadBridge.exportHtmlJs(exportOptions);
            return;
        }
        if (options.format === 'html') {
            this.dgpadBridge.exportHtml(exportOptions);
            return;
        }
        if (options.format === 'responsive') {
            this.dgpadBridge.exportResponsive(exportOptions);
            return;
        }
        console.log('Formato aún no conectado:', options.format, options);
    }
    refreshHistoryDialog(open = false) {
        const entries = this.mapHistoryEntries(this.dgpadBridge.getHistoryEntries());
        const autosaveMinutes = this.dgpadBridge.getAutosaveMinutes();
        if (open) {
            this.historyDialog?.open(entries, autosaveMinutes);
            return;
        }
        this.historyDialog?.open(entries, autosaveMinutes);
    }
    mapHistoryEntries(entries) {
        return entries.map((entry) => ({
            index: entry.index,
            date: entry.date,
            img: entry.img,
            lock: entry.lock,
        }));
    }
    mountLegacyDgpad() {
        const stage = document.getElementById('dgpad-stage');
        if (!stage) {
            console.error('No se encontró dgpad-stage');
            return;
        }
        stage.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.id = 'dgpad-legacy-frame';
        iframe.src = `${window.location.origin}/dgpad-legacy-host.html`;
        iframe.title = 'DGPad legacy';
        iframe.frameBorder = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.style.display = 'block';
        iframe.onload = () => {
            const bridge = iframe.contentWindow.dgpadBridge;
            bridge?.setMode?.(1);
        };
        stage.appendChild(iframe);
    }
    static ɵfac = function EditorPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EditorPageComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EditorPageComponent, selectors: [["app-editor-page"]], viewQuery: function EditorPageComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(ExportDialogComponent, 5);
            i0.ɵɵviewQuery(HistoryDialogComponent, 5);
            i0.ɵɵviewQuery(ToolbarComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.exportDialog = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.historyDialog = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.toolbar = _t.first);
        } }, decls: 7, vars: 0, consts: [[1, "editor-page"], [1, "editor-canvas-area"], ["aria-label", "\u00C1rea del editor DGPad", 1, "dgpad-host"], ["id", "dgpad-stage", 1, "dgpad-stage"], [3, "historyRequested", "exportRequested"], [3, "closed", "refreshRequested", "saveRequested", "clearRequested", "openEntryRequested", "autosaveChanged"], [3, "exportConfirmed", "closed"]], template: function EditorPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "main", 1)(2, "section", 2);
            i0.ɵɵelement(3, "div", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "app-toolbar", 4);
            i0.ɵɵlistener("historyRequested", function EditorPageComponent_Template_app_toolbar_historyRequested_4_listener() { return ctx.openHistoryDialog(); })("exportRequested", function EditorPageComponent_Template_app_toolbar_exportRequested_4_listener() { return ctx.openExportDialog(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "app-history-dialog", 5);
            i0.ɵɵlistener("closed", function EditorPageComponent_Template_app_history_dialog_closed_5_listener() { return ctx.handleHistoryDialogClosed(); })("refreshRequested", function EditorPageComponent_Template_app_history_dialog_refreshRequested_5_listener() { return ctx.handleHistoryRefreshRequested(); })("saveRequested", function EditorPageComponent_Template_app_history_dialog_saveRequested_5_listener() { return ctx.handleHistorySaveRequested(); })("clearRequested", function EditorPageComponent_Template_app_history_dialog_clearRequested_5_listener() { return ctx.handleHistoryClearRequested(); })("openEntryRequested", function EditorPageComponent_Template_app_history_dialog_openEntryRequested_5_listener($event) { return ctx.handleHistoryOpenEntryRequested($event); })("autosaveChanged", function EditorPageComponent_Template_app_history_dialog_autosaveChanged_5_listener($event) { return ctx.handleAutosaveChanged($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "app-export-dialog", 6);
            i0.ɵɵlistener("exportConfirmed", function EditorPageComponent_Template_app_export_dialog_exportConfirmed_6_listener($event) { return ctx.handleExport($event); })("closed", function EditorPageComponent_Template_app_export_dialog_closed_6_listener() { return ctx.handleExportDialogClosed(); });
            i0.ɵɵelementEnd()();
        } }, dependencies: [ToolbarComponent, ExportDialogComponent, HistoryDialogComponent], styles: [".editor-page[_ngcontent-%COMP%] {\r\n  height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.editor-canvas-area[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  padding: 0;\r\n  background: #f5f5f5;\r\n  min-height: 0;\r\n  display: flex;\r\n}\r\n\r\n.dgpad-host[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #ffffff;\r\n  overflow: hidden;\r\n  display: flex;\r\n  min-height: 0;\r\n}\r\n\r\n.dgpad-stage[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 0;\r\n  position: relative;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EditorPageComponent, [{
        type: Component,
        args: [{ selector: 'app-editor-page', imports: [ToolbarComponent, ExportDialogComponent, HistoryDialogComponent], template: "<div class=\"editor-page\">\r\n  <main class=\"editor-canvas-area\">\r\n    <section class=\"dgpad-host\" aria-label=\"\u00C1rea del editor DGPad\">\r\n      <div class=\"dgpad-stage\" id=\"dgpad-stage\"></div>\r\n    </section>\r\n  </main>\r\n\r\n  <app-toolbar\r\n    (historyRequested)=\"openHistoryDialog()\"\r\n    (exportRequested)=\"openExportDialog()\"\r\n  ></app-toolbar>\r\n\r\n  <app-history-dialog\r\n    (closed)=\"handleHistoryDialogClosed()\"\r\n    (refreshRequested)=\"handleHistoryRefreshRequested()\"\r\n    (saveRequested)=\"handleHistorySaveRequested()\"\r\n    (clearRequested)=\"handleHistoryClearRequested()\"\r\n    (openEntryRequested)=\"handleHistoryOpenEntryRequested($event)\"\r\n    (autosaveChanged)=\"handleAutosaveChanged($event)\"\r\n  ></app-history-dialog>\r\n\r\n  <app-export-dialog\r\n    (exportConfirmed)=\"handleExport($event)\"\r\n    (closed)=\"handleExportDialogClosed()\"\r\n  ></app-export-dialog>\r\n</div>", styles: [".editor-page {\r\n  height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.editor-canvas-area {\r\n  flex: 1;\r\n  padding: 0;\r\n  background: #f5f5f5;\r\n  min-height: 0;\r\n  display: flex;\r\n}\r\n\r\n.dgpad-host {\r\n  flex: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #ffffff;\r\n  overflow: hidden;\r\n  display: flex;\r\n  min-height: 0;\r\n}\r\n\r\n.dgpad-stage {\r\n  flex: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 0;\r\n  position: relative;\r\n}"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { exportDialog: [{
            type: ViewChild,
            args: [ExportDialogComponent]
        }], historyDialog: [{
            type: ViewChild,
            args: [HistoryDialogComponent]
        }], toolbar: [{
            type: ViewChild,
            args: [ToolbarComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EditorPageComponent, { className: "EditorPageComponent", filePath: "src/app/features/editor/editor-page/editor-page.component.ts", lineNumber: 22 }); })();
