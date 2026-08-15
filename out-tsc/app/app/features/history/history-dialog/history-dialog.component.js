import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function HistoryDialogComponent_div_0_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtext(1, " No hay elementos guardados. ");
    i0.ɵɵelementEnd();
} }
function HistoryDialogComponent_div_0_article_24_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 14);
    i0.ɵɵelement(1, "img", 15);
    i0.ɵɵelementStart(2, "div", 16)(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 7);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_article_24_Template_button_click_7_listener() { const entry_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEntry(entry_r4.index)); });
    i0.ɵɵtext(8, "Abrir");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", entry_r4.img, i0.ɵɵsanitizeUrl)("alt", "Miniatura " + entry_r4.date);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entry_r4.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r4.lock ? "Bloqueado" : "Desbloqueado");
} }
function HistoryDialogComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 1);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "section", 2)(3, "header", 3)(4, "h2");
    i0.ɵɵtext(5, "Historial");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 4);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(7, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 5)(9, "div", 6)(10, "button", 7);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveSnapshot()); });
    i0.ɵɵtext(11, "Guardar actual");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 7);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearHistory()); });
    i0.ɵɵtext(13, "Borrar hist\u00F3rico");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 7);
    i0.ɵɵlistener("click", function HistoryDialogComponent_div_0_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.refresh()); });
    i0.ɵɵtext(15, "Actualizar");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "label", 8)(17, "span");
    i0.ɵɵtext(18, "Guardar autom\u00E1ticamente cada");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "input", 9);
    i0.ɵɵlistener("change", function HistoryDialogComponent_div_0_Template_input_change_19_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateAutosave($event.target.value)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "minutos");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 10);
    i0.ɵɵtemplate(23, HistoryDialogComponent_div_0_div_23_Template, 2, 0, "div", 11)(24, HistoryDialogComponent_div_0_article_24_Template, 9, 4, "article", 12);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("value", ctx_r1.autosaveMinutes);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.entries.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.entries);
} }
export class HistoryDialogComponent {
    closed = new EventEmitter();
    refreshRequested = new EventEmitter();
    saveRequested = new EventEmitter();
    clearRequested = new EventEmitter();
    openEntryRequested = new EventEmitter();
    autosaveChanged = new EventEmitter();
    visible = false;
    entries = [];
    autosaveMinutes = 0;
    open(entries, autosaveMinutes) {
        this.entries = entries;
        this.autosaveMinutes = autosaveMinutes;
        this.visible = true;
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    saveSnapshot() {
        this.saveRequested.emit();
    }
    clearHistory() {
        this.clearRequested.emit();
    }
    openEntry(index) {
        this.openEntryRequested.emit(index);
        this.close();
    }
    updateAutosave(value) {
        const minutes = Number(value);
        if (!Number.isNaN(minutes) && minutes >= 0) {
            this.autosaveMinutes = minutes;
            this.autosaveChanged.emit(minutes);
        }
    }
    refresh() {
        this.refreshRequested.emit();
    }
    static ɵfac = function HistoryDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HistoryDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HistoryDialogComponent, selectors: [["app-history-dialog"]], outputs: { closed: "closed", refreshRequested: "refreshRequested", saveRequested: "saveRequested", clearRequested: "clearRequested", openEntryRequested: "openEntryRequested", autosaveChanged: "autosaveChanged" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "backdrop", 3, "click"], ["aria-label", "Historial", 1, "dialog"], [1, "dialog-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "dialog-body"], [1, "history-toolbar"], ["type", "button", 3, "click"], [1, "autosave-field"], ["type", "number", "min", "0", 3, "change", "value"], [1, "history-list"], ["class", "empty-state", 4, "ngIf"], ["class", "history-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "history-card"], [3, "src", "alt"], [1, "history-meta"]], template: function HistoryDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, HistoryDialogComponent_div_0_Template, 25, 3, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: ["[_nghost-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.backdrop[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(900px, calc(100vw - 32px));\r\n  max-height: calc(100vh - 32px);\r\n  transform: translate(-50%, -50%);\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n  overflow: hidden;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.dialog-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 14px 16px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-body[_ngcontent-%COMP%] {\r\n  padding: 16px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n  overflow: auto;\r\n}\r\n\r\n.close-button[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}\r\n\r\n.history-toolbar[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 10px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.autosave-field[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.autosave-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\r\n  width: 70px;\r\n}\r\n\r\n.history-list[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\r\n  gap: 12px;\r\n}\r\n\r\n.history-card[_ngcontent-%COMP%] {\r\n  border: 1px solid #ddd;\r\n  border-radius: 10px;\r\n  padding: 10px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  background: #fafafa;\r\n}\r\n\r\n.history-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 120px;\r\n  object-fit: cover;\r\n  border-radius: 6px;\r\n  background: #fff;\r\n}\r\n\r\n.history-meta[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: #444;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  color: #666;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HistoryDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-history-dialog', imports: [CommonModule], template: "<div *ngIf=\"visible\">\r\n  <div class=\"backdrop\" (click)=\"close()\"></div>\r\n\r\n  <section class=\"dialog\" aria-label=\"Historial\">\r\n    <header class=\"dialog-header\">\r\n      <h2>Historial</h2>\r\n      <button type=\"button\" class=\"close-button\" (click)=\"close()\">\u2715</button>\r\n    </header>\r\n\r\n    <div class=\"dialog-body\">\r\n      <div class=\"history-toolbar\">\r\n        <button type=\"button\" (click)=\"saveSnapshot()\">Guardar actual</button>\r\n        <button type=\"button\" (click)=\"clearHistory()\">Borrar hist\u00F3rico</button>\r\n        <button type=\"button\" (click)=\"refresh()\">Actualizar</button>\r\n      </div>\r\n\r\n      <label class=\"autosave-field\">\r\n        <span>Guardar autom\u00E1ticamente cada</span>\r\n        <input\r\n          type=\"number\"\r\n          min=\"0\"\r\n          [value]=\"autosaveMinutes\"\r\n          (change)=\"updateAutosave($any($event.target).value)\"\r\n        />\r\n        <span>minutos</span>\r\n      </label>\r\n\r\n      <div class=\"history-list\">\r\n        <div *ngIf=\"entries.length === 0\" class=\"empty-state\">\r\n          No hay elementos guardados.\r\n        </div>\r\n\r\n        <article class=\"history-card\" *ngFor=\"let entry of entries\">\r\n          <img [src]=\"entry.img\" [alt]=\"'Miniatura ' + entry.date\" />\r\n          <div class=\"history-meta\">\r\n            <div>{{ entry.date }}</div>\r\n            <div>{{ entry.lock ? 'Bloqueado' : 'Desbloqueado' }}</div>\r\n          </div>\r\n          <button type=\"button\" (click)=\"openEntry(entry.index)\">Abrir</button>\r\n        </article>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>", styles: [":host {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.backdrop {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(900px, calc(100vw - 32px));\r\n  max-height: calc(100vh - 32px);\r\n  transform: translate(-50%, -50%);\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n  overflow: hidden;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.dialog-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 14px 16px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-body {\r\n  padding: 16px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n  overflow: auto;\r\n}\r\n\r\n.close-button {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}\r\n\r\n.history-toolbar {\r\n  display: flex;\r\n  gap: 10px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.autosave-field {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.autosave-field input {\r\n  width: 70px;\r\n}\r\n\r\n.history-list {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\r\n  gap: 12px;\r\n}\r\n\r\n.history-card {\r\n  border: 1px solid #ddd;\r\n  border-radius: 10px;\r\n  padding: 10px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  background: #fafafa;\r\n}\r\n\r\n.history-card img {\r\n  width: 100%;\r\n  height: 120px;\r\n  object-fit: cover;\r\n  border-radius: 6px;\r\n  background: #fff;\r\n}\r\n\r\n.history-meta {\r\n  font-size: 12px;\r\n  color: #444;\r\n}\r\n\r\n.empty-state {\r\n  color: #666;\r\n}"] }]
    }], null, { closed: [{
            type: Output
        }], refreshRequested: [{
            type: Output
        }], saveRequested: [{
            type: Output
        }], clearRequested: [{
            type: Output
        }], openEntryRequested: [{
            type: Output
        }], autosaveChanged: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HistoryDialogComponent, { className: "HistoryDialogComponent", filePath: "src/app/features/history/history-dialog/history-dialog.component.ts", lineNumber: 17 }); })();
