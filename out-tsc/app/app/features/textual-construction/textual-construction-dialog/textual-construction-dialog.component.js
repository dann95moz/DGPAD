import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function TextualConstructionDialogComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
    i0.ɵɵlistener("click", function TextualConstructionDialogComponent_div_0_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "section", 3)(3, "header", 4)(4, "h3");
    i0.ɵɵtext(5, "Construcci\u00F3n textual");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 5);
    i0.ɵɵlistener("click", function TextualConstructionDialogComponent_div_0_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(7, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 6)(9, "p", 7);
    i0.ɵɵtext(10, " Escribe una instrucci\u00F3n por l\u00EDnea. Luego pulsa ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12, "Construir");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "textarea", 8);
    i0.ɵɵtwoWayListener("ngModelChange", function TextualConstructionDialogComponent_div_0_Template_textarea_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.text, $event) || (ctx_r1.text = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 9)(16, "button", 10);
    i0.ɵɵlistener("click", function TextualConstructionDialogComponent_div_0_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clear()); });
    i0.ɵɵtext(17, "Limpiar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 10);
    i0.ɵɵlistener("click", function TextualConstructionDialogComponent_div_0_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.build()); });
    i0.ɵɵtext(19, "Construir");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.text);
    i0.ɵɵproperty("placeholder", ctx_r1.placeholder);
} }
export class TextualConstructionDialogComponent {
    closed = new EventEmitter();
    buildRequested = new EventEmitter();
    visible = false;
    text = '';
    placeholder = [
        'A: Punto cualquiera',
        'B: Punto cualquiera',
        'r: Recta A B',
        'M: Punto medio de A y B',
    ].join('\n');
    open() {
        this.visible = true;
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    build() {
        const value = this.text.trim();
        if (!value) {
            return;
        }
        this.buildRequested.emit(value);
        this.close();
    }
    clear() {
        this.text = '';
    }
    static ɵfac = function TextualConstructionDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextualConstructionDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextualConstructionDialogComponent, selectors: [["app-textual-construction-dialog"]], outputs: { closed: "closed", buildRequested: "buildRequested" }, decls: 1, vars: 1, consts: [["class", "dialog-shell", 4, "ngIf"], [1, "dialog-shell"], [1, "dialog-backdrop", 3, "click"], ["aria-label", "Construcci\u00F3n textual", 1, "dialog-panel"], [1, "dialog-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "dialog-body"], [1, "help-text"], [1, "construction-input", 3, "ngModelChange", "ngModel", "placeholder"], [1, "dialog-actions"], ["type", "button", 3, "click"]], template: function TextualConstructionDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TextualConstructionDialogComponent_div_0_Template, 20, 2, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel], styles: ["[_nghost-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.dialog-shell[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1300;\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog-backdrop[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.dialog-panel[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(720px, calc(100vw - 24px));\r\n  max-height: min(80vh, 640px);\r\n  transform: translate(-50%, -50%);\r\n  background: #fff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);\r\n  overflow: hidden;\r\n}\r\n\r\n.dialog-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 12px 14px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-body[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n  padding: 14px;\r\n}\r\n\r\n.help-text[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n}\r\n\r\n.construction-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  min-height: 320px;\r\n  resize: vertical;\r\n  padding: 10px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px;\r\n  font: inherit;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dialog-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 8px;\r\n}\r\n\r\n.close-button[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextualConstructionDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-textual-construction-dialog', imports: [CommonModule, FormsModule], template: "<div *ngIf=\"visible\" class=\"dialog-shell\">\r\n  <div class=\"dialog-backdrop\" (click)=\"close()\"></div>\r\n\r\n  <section class=\"dialog-panel\" aria-label=\"Construcci\u00F3n textual\">\r\n    <header class=\"dialog-header\">\r\n      <h3>Construcci\u00F3n textual</h3>\r\n      <button type=\"button\" class=\"close-button\" (click)=\"close()\">\u2715</button>\r\n    </header>\r\n\r\n    <div class=\"dialog-body\">\r\n      <p class=\"help-text\">\r\n        Escribe una instrucci\u00F3n por l\u00EDnea. Luego pulsa <strong>Construir</strong>.\r\n      </p>\r\n\r\n      <textarea\r\n        [(ngModel)]=\"text\"\r\n        [placeholder]=\"placeholder\"\r\n        class=\"construction-input\"\r\n      ></textarea>\r\n\r\n      <div class=\"dialog-actions\">\r\n        <button type=\"button\" (click)=\"clear()\">Limpiar</button>\r\n        <button type=\"button\" (click)=\"build()\">Construir</button>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>", styles: [":host {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.dialog-shell {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1300;\r\n  pointer-events: auto;\r\n}\r\n\r\n.dialog-backdrop {\r\n  position: absolute;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.dialog-panel {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: min(720px, calc(100vw - 24px));\r\n  max-height: min(80vh, 640px);\r\n  transform: translate(-50%, -50%);\r\n  background: #fff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);\r\n  overflow: hidden;\r\n}\r\n\r\n.dialog-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 12px 14px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.dialog-body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n  padding: 14px;\r\n}\r\n\r\n.help-text {\r\n  margin: 0;\r\n}\r\n\r\n.construction-input {\r\n  width: 100%;\r\n  min-height: 320px;\r\n  resize: vertical;\r\n  padding: 10px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px;\r\n  font: inherit;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dialog-actions {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 8px;\r\n}\r\n\r\n.close-button {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] }]
    }], null, { closed: [{
            type: Output
        }], buildRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextualConstructionDialogComponent, { className: "TextualConstructionDialogComponent", filePath: "src/app/features/textual-construction/textual-construction-dialog/textual-construction-dialog.component.ts", lineNumber: 11 }); })();
