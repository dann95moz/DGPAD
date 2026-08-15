import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { APP_CONFIG } from '../../../app-config/app-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function OtherToolsMenuComponent_div_0_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function OtherToolsMenuComponent_div_0_button_9_Template_button_click_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.select(item_r4.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function OtherToolsMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
    i0.ɵɵlistener("click", function OtherToolsMenuComponent_div_0_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "section", 3)(3, "header", 4)(4, "h3");
    i0.ɵɵtext(5, "Otras herramientas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 5);
    i0.ɵɵlistener("click", function OtherToolsMenuComponent_div_0_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(7, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 6);
    i0.ɵɵtemplate(9, OtherToolsMenuComponent_div_0_button_9_Template, 2, 1, "button", 7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r1.items);
} }
export class OtherToolsMenuComponent {
    closed = new EventEmitter();
    actionSelected = new EventEmitter();
    visible = false;
    version = APP_CONFIG.version;
    baseItems = [
        { id: 'construction_protocol', label: 'Protocolo de construcción' },
        { id: 'textual_construction', label: 'Construcción textual' },
        { id: 'duplicate_figure', label: 'Duplicar figura' },
        { id: 'open_file', label: 'Abrir archivo' },
        { id: 'save_file', label: 'Guardar archivo' },
    ];
    teacherItems = [
        { id: 'blockly_button', label: 'Botón Blockly' },
        { id: 'expression', label: 'Expresión' },
        { id: 'expression_points', label: 'Expresión: lista de puntos' },
        { id: 'expression_segments', label: 'Expresión: lista de segmentos' },
        { id: 'board_points', label: 'Tablero de puntos' },
        { id: 'integer_cursor', label: 'Cursor entero' },
        { id: 'continuous_cursor', label: 'Cursor continuo' },
        { id: 'edit_widget', label: 'Widget de edición' },
    ];
    get items() {
        return this.version === 'profesores'
            ? [...this.baseItems, ...this.teacherItems]
            : this.baseItems;
    }
    open() {
        this.visible = true;
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    select(action) {
        this.actionSelected.emit(action);
        this.close();
    }
    static ɵfac = function OtherToolsMenuComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OtherToolsMenuComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OtherToolsMenuComponent, selectors: [["app-other-tools-menu"]], outputs: { closed: "closed", actionSelected: "actionSelected" }, decls: 1, vars: 1, consts: [["class", "menu-shell", 4, "ngIf"], [1, "menu-shell"], [1, "menu-backdrop", 3, "click"], ["aria-label", "Otras herramientas", 1, "menu-panel"], [1, "menu-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "menu-body"], ["type", "button", "class", "menu-item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "menu-item", 3, "click"]], template: function OtherToolsMenuComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, OtherToolsMenuComponent_div_0_Template, 10, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: ["[_nghost-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.menu-shell[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1200;\r\n  pointer-events: auto;\r\n}\r\n\r\n.menu-backdrop[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  inset: 0;\r\n  background: transparent;\r\n}\r\n\r\n.menu-panel[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  bottom: 72px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  width: min(360px, calc(100vw - 24px));\r\n  max-height: min(70vh, 520px);\r\n  overflow: auto;\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);\r\n}\r\n\r\n.menu-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 12px 14px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.menu-body[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 8px;\r\n  gap: 6px;\r\n}\r\n\r\n.menu-item[_ngcontent-%COMP%] {\r\n  border: 1px solid #d9d9d9;\r\n  background: #f8f8f8;\r\n  border-radius: 8px;\r\n  padding: 10px 12px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.close-button[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OtherToolsMenuComponent, [{
        type: Component,
        args: [{ selector: 'app-other-tools-menu', imports: [CommonModule], template: "<div *ngIf=\"visible\" class=\"menu-shell\">\r\n  <div class=\"menu-backdrop\" (click)=\"close()\"></div>\r\n\r\n  <section class=\"menu-panel\" aria-label=\"Otras herramientas\">\r\n    <header class=\"menu-header\">\r\n      <h3>Otras herramientas</h3>\r\n      <button type=\"button\" class=\"close-button\" (click)=\"close()\">\u2715</button>\r\n    </header>\r\n\r\n    <div class=\"menu-body\">\r\n      <button\r\n        type=\"button\"\r\n        class=\"menu-item\"\r\n        *ngFor=\"let item of items\"\r\n        (click)=\"select(item.id)\"\r\n      >\r\n        {{ item.label }}\r\n      </button>\r\n    </div>\r\n  </section>\r\n</div>", styles: [":host {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.menu-shell {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1200;\r\n  pointer-events: auto;\r\n}\r\n\r\n.menu-backdrop {\r\n  position: absolute;\r\n  inset: 0;\r\n  background: transparent;\r\n}\r\n\r\n.menu-panel {\r\n  position: absolute;\r\n  bottom: 72px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  width: min(360px, calc(100vw - 24px));\r\n  max-height: min(70vh, 520px);\r\n  overflow: auto;\r\n  background: #ffffff;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 12px;\r\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);\r\n}\r\n\r\n.menu-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 12px 14px;\r\n  border-bottom: 1px solid #ececec;\r\n}\r\n\r\n.menu-body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 8px;\r\n  gap: 6px;\r\n}\r\n\r\n.menu-item {\r\n  border: 1px solid #d9d9d9;\r\n  background: #f8f8f8;\r\n  border-radius: 8px;\r\n  padding: 10px 12px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.close-button {\r\n  border: 0;\r\n  background: transparent;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}"] }]
    }], null, { closed: [{
            type: Output
        }], actionSelected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OtherToolsMenuComponent, { className: "OtherToolsMenuComponent", filePath: "src/app/features/other-tools/other-tools-menu/other-tools-menu.component.ts", lineNumber: 31 }); })();
