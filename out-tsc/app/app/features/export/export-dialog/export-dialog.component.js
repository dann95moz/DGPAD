import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ExportDialogComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵlistener("click", function ExportDialogComponent_Conditional_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "section", 1)(2, "header", 2)(3, "h2");
    i0.ɵɵtext(4, "Exportar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 3);
    i0.ɵɵlistener("click", function ExportDialogComponent_Conditional_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 4)(8, "label", 5)(9, "span");
    i0.ɵɵtext(10, "Formato");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 6);
    i0.ɵɵtwoWayListener("ngModelChange", function ExportDialogComponent_Conditional_0_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.format, $event) || (ctx_r1.format = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(12, "option", 7);
    i0.ɵɵtext(13, "Texto");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 8);
    i0.ɵɵtext(15, "HTML + JS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "option", 9);
    i0.ɵɵtext(17, "HTML");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option", 10);
    i0.ɵɵtext(19, "P\u00E1gina responsive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "option", 11);
    i0.ɵɵtext(21, "SVG");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "option", 12);
    i0.ɵɵtext(23, "PNG");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "label", 13)(25, "input", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function ExportDialogComponent_Conditional_0_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.fixWidgets, $event) || (ctx_r1.fixWidgets = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Fijar widgets");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "label", 13)(29, "input", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function ExportDialogComponent_Conditional_0_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.fixDgScripts, $event) || (ctx_r1.fixDgScripts = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "Fijar dgscripts");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "label", 13)(33, "input", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function ExportDialogComponent_Conditional_0_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.hideControlPanel, $event) || (ctx_r1.hideControlPanel = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Ocultar barra de herramientas");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "label", 13)(37, "input", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function ExportDialogComponent_Conditional_0_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.disableZoom, $event) || (ctx_r1.disableZoom = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Deshabilitar zoom");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "footer", 15)(41, "button", 16);
    i0.ɵɵlistener("click", function ExportDialogComponent_Conditional_0_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(42, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "button", 16);
    i0.ɵɵlistener("click", function ExportDialogComponent_Conditional_0_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.export()); });
    i0.ɵɵtext(44, "Exportar");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.format);
    i0.ɵɵadvance(14);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.fixWidgets);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.fixDgScripts);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.hideControlPanel);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.disableZoom);
} }
export class ExportDialogComponent {
    exportConfirmed = new EventEmitter();
    closed = new EventEmitter();
    visible = false;
    format = 'svg';
    fixWidgets = false;
    fixDgScripts = false;
    hideControlPanel = true;
    disableZoom = false;
    open() {
        this.visible = true;
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    export() {
        this.exportConfirmed.emit({
            format: this.format,
            fixWidgets: this.fixWidgets,
            fixDgScripts: this.fixDgScripts,
            hideControlPanel: this.hideControlPanel,
            disableZoom: this.disableZoom,
        });
        this.close();
    }
    static ɵfac = function ExportDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ExportDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ExportDialogComponent, selectors: [["app-export-dialog"]], outputs: { exportConfirmed: "exportConfirmed", closed: "closed" }, decls: 1, vars: 1, consts: [[1, "backdrop", 3, "click"], ["aria-label", "Opciones de exportaci\u00F3n", 1, "dialog"], [1, "dialog-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "dialog-body"], [1, "field"], [3, "ngModelChange", "ngModel"], ["value", "text"], ["value", "html_js"], ["value", "html"], ["value", "responsive"], ["value", "svg"], ["value", "png"], [1, "checkbox-field"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "dialog-footer"], ["type", "button", 3, "click"]], template: function ExportDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ExportDialogComponent_Conditional_0_Template, 45, 5);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.visible ? 0 : -1);
        } }, dependencies: [FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel], styles: ["[_nghost-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.backdrop[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(420px, calc(100vw - 32px));\r\n  transform: translate(-50%, -50%);\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n  overflow: hidden;\r\n}\r\n\r\n.dialog-header[_ngcontent-%COMP%], \r\n.dialog-footer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 14px 16px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-footer[_ngcontent-%COMP%] {\r\n  border-bottom: 0;\r\n  border-top: 1px solid #ececec;\r\n  justify-content: flex-end;\r\n  gap: 10px;\r\n}\r\n\r\n.dialog-body[_ngcontent-%COMP%] {\r\n  padding: 16px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n}\r\n\r\n.field[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.checkbox-field[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.close-button[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExportDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-export-dialog', imports: [FormsModule], template: "@if (visible) {\r\n  <div class=\"backdrop\" (click)=\"close()\"></div>\r\n\r\n  <section class=\"dialog\" aria-label=\"Opciones de exportaci\u00F3n\">\r\n    <header class=\"dialog-header\">\r\n      <h2>Exportar</h2>\r\n      <button type=\"button\" class=\"close-button\" (click)=\"close()\">\u2715</button>\r\n    </header>\r\n\r\n    <div class=\"dialog-body\">\r\n      <label class=\"field\">\r\n        <span>Formato</span>\r\n        <select [(ngModel)]=\"format\">\r\n          <option value=\"text\">Texto</option>\r\n          <option value=\"html_js\">HTML + JS</option>\r\n          <option value=\"html\">HTML</option>\r\n          <option value=\"responsive\">P\u00E1gina responsive</option>\r\n          <option value=\"svg\">SVG</option>\r\n          <option value=\"png\">PNG</option>\r\n        </select>\r\n      </label>\r\n\r\n      <label class=\"checkbox-field\">\r\n        <input type=\"checkbox\" [(ngModel)]=\"fixWidgets\" />\r\n        <span>Fijar widgets</span>\r\n      </label>\r\n\r\n      <label class=\"checkbox-field\">\r\n        <input type=\"checkbox\" [(ngModel)]=\"fixDgScripts\" />\r\n        <span>Fijar dgscripts</span>\r\n      </label>\r\n\r\n      <label class=\"checkbox-field\">\r\n        <input type=\"checkbox\" [(ngModel)]=\"hideControlPanel\" />\r\n        <span>Ocultar barra de herramientas</span>\r\n      </label>\r\n\r\n      <label class=\"checkbox-field\">\r\n        <input type=\"checkbox\" [(ngModel)]=\"disableZoom\" />\r\n        <span>Deshabilitar zoom</span>\r\n      </label>\r\n    </div>\r\n\r\n    <footer class=\"dialog-footer\">\r\n      <button type=\"button\" (click)=\"close()\">Cancelar</button>\r\n      <button type=\"button\" (click)=\"export()\">Exportar</button>\r\n    </footer>\r\n  </section>\r\n}", styles: [":host {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.backdrop {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(420px, calc(100vw - 32px));\r\n  transform: translate(-50%, -50%);\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n  overflow: hidden;\r\n}\r\n\r\n.dialog-header,\r\n.dialog-footer {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 14px 16px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-footer {\r\n  border-bottom: 0;\r\n  border-top: 1px solid #ececec;\r\n  justify-content: flex-end;\r\n  gap: 10px;\r\n}\r\n\r\n.dialog-body {\r\n  padding: 16px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 14px;\r\n}\r\n\r\n.field {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.checkbox-field {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.close-button {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] }]
    }], null, { exportConfirmed: [{
            type: Output
        }], closed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ExportDialogComponent, { className: "ExportDialogComponent", filePath: "src/app/features/export/export-dialog/export-dialog.component.ts", lineNumber: 26 }); })();
