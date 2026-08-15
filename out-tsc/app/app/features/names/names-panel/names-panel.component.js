import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NamesPanelComponent_div_0_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function NamesPanelComponent_div_0_button_6_Template_button_click_0_listener() { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectTab(i_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.currentTabIndex === i_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", tab_r5.label, " ");
} }
function NamesPanelComponent_div_0_div_11_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function NamesPanelComponent_div_0_div_11_button_1_Template_button_click_0_listener() { const key_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectKey(ctx_r1.getFlatKeys().indexOf(key_r7))); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r1.isSelectedKey(ctx_r1.getFlatKeys().indexOf(key_r7)))("used", !ctx_r1.isKeyAvailable(ctx_r1.getFlatKeys().indexOf(key_r7)));
    i0.ɵɵproperty("disabled", !ctx_r1.isKeyAvailable(ctx_r1.getFlatKeys().indexOf(key_r7)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", key_r7, "", ctx_r1.modifiers[ctx_r1.currentModifierIndex], " ");
} }
function NamesPanelComponent_div_0_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, NamesPanelComponent_div_0_div_11_button_1_Template, 2, 7, "button", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r8);
} }
function NamesPanelComponent_div_0_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function NamesPanelComponent_div_0_button_13_Template_button_click_0_listener() { const i_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectModifier(i_r10)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const modifier_r11 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.currentModifierIndex === i_r10);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.getDisplayedModifierBase(), "", modifier_r11, " ");
} }
function NamesPanelComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "section", 2)(2, "header", 3)(3, "button", 4);
    i0.ɵɵlistener("click", function NamesPanelComponent_div_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setReplaceMode(!ctx_r1.replaceMode)); });
    i0.ɵɵtext(4, " \u270D ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 5);
    i0.ɵɵtemplate(6, NamesPanelComponent_div_0_button_6_Template, 2, 3, "button", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 7);
    i0.ɵɵlistener("click", function NamesPanelComponent_div_0_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(8, " \u2715 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 8)(10, "div", 9);
    i0.ɵɵtemplate(11, NamesPanelComponent_div_0_div_11_Template, 2, 1, "div", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 11);
    i0.ɵɵtemplate(13, NamesPanelComponent_div_0_button_13_Template, 2, 4, "button", 12);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.replaceMode);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.tabs);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.tabs[ctx_r1.currentTabIndex].rows);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.modifiers);
} }
export class NamesPanelComponent {
    closed = new EventEmitter();
    replaceModeChanged = new EventEmitter();
    nameSelected = new EventEmitter();
    visible = false;
    replaceMode = false;
    usedNames = new Set();
    modifiers = ['', "'", "''", '₀'];
    currentTabIndex = 0;
    currentModifierIndex = 0;
    currentKeyIndex = -1;
    tabs = [
        {
            id: 'latin-upper',
            label: 'A',
            rows: [
                'ABCDEFGHI'.split(''),
                'JKLMNOPQR'.split(''),
                'STUVWXYZ'.split(''),
            ],
        },
        {
            id: 'latin-lower',
            label: 'a',
            rows: [
                'abcdefghi'.split(''),
                'jklmnopqr'.split(''),
                'stuvwxyz'.split(''),
            ],
        },
        {
            id: 'greek-upper',
            label: 'Δ',
            rows: [
                'ΑΒΓΔΕΖΗΘ'.split(''),
                'ΙΚΛΜΝΞΟΠ'.split(''),
                'ΡΣΤΥΦΧΨΩ'.split(''),
            ],
        },
        {
            id: 'greek-lower',
            label: 'δ',
            rows: [
                'αβγδεζηθι'.split(''),
                'κλμνξοπρ'.split(''),
                'ςστυφχψω'.split(''),
            ],
        },
    ];
    open(usedNames = [], replaceMode = false) {
        this.usedNames = new Set(usedNames);
        this.replaceMode = replaceMode;
        this.visible = true;
        this.refreshKeyboard();
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    setReplaceMode(value) {
        this.replaceMode = value;
        this.replaceModeChanged.emit(value);
    }
    selectTab(index) {
        if (index === this.currentTabIndex) {
            return;
        }
        this.currentTabIndex = index;
        this.currentModifierIndex = 0;
        this.refreshKeyboard();
    }
    selectModifier(index) {
        this.currentModifierIndex = index;
        this.refreshKeyboard();
    }
    selectKey(index) {
        if (!this.isKeyAvailable(index)) {
            return;
        }
        this.currentKeyIndex = index;
        this.emitCurrentName();
    }
    isKeyAvailable(index) {
        const name = this.getNameForIndex(index);
        return !this.usedNames.has(name);
    }
    getCurrentName() {
        if (this.currentKeyIndex < 0) {
            return 'P';
        }
        return this.getNameForIndex(this.currentKeyIndex);
    }
    getFlatKeys() {
        return this.tabs[this.currentTabIndex].rows.flat();
    }
    getDisplayedModifierBase() {
        const keys = this.getFlatKeys();
        return keys.length > 0 ? keys[0] : 'A';
    }
    isSelectedKey(index) {
        return this.currentKeyIndex === index;
    }
    refreshKeyboard() {
        const keys = this.getFlatKeys();
        if (keys.length === 0) {
            this.currentKeyIndex = -1;
            return;
        }
        const startIndex = this.currentKeyIndex >= 0 ? this.currentKeyIndex : 0;
        let nextIndex = -1;
        for (let index = startIndex; index < keys.length; index += 1) {
            if (this.isKeyAvailable(index)) {
                nextIndex = index;
                break;
            }
        }
        if (nextIndex === -1) {
            for (let index = 0; index < startIndex; index += 1) {
                if (this.isKeyAvailable(index)) {
                    nextIndex = index;
                    break;
                }
            }
        }
        this.currentKeyIndex = nextIndex;
        if (this.currentKeyIndex >= 0) {
            this.emitCurrentName();
        }
    }
    getNameForIndex(index) {
        const key = this.getFlatKeys()[index] ?? 'P';
        const modifier = this.modifiers[this.currentModifierIndex] ?? '';
        return `${key}${modifier}`;
    }
    emitCurrentName() {
        this.nameSelected.emit(this.getCurrentName());
    }
    static ɵfac = function NamesPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NamesPanelComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NamesPanelComponent, selectors: [["app-names-panel"]], outputs: { closed: "closed", replaceModeChanged: "replaceModeChanged", nameSelected: "nameSelected" }, decls: 1, vars: 1, consts: [["class", "names-panel-shell", 4, "ngIf"], [1, "names-panel-shell"], ["aria-label", "Nombres", 1, "names-panel"], [1, "names-panel-header"], ["type", "button", "title", "Renombrar al seleccionar", 1, "replace-toggle", 3, "click"], [1, "tabs"], ["type", "button", "class", "tab-button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", "title", "Cerrar", 1, "close-button", 3, "click"], [1, "names-panel-body"], [1, "keyboard"], ["class", "keyboard-row", 4, "ngFor", "ngForOf"], [1, "modifiers"], ["type", "button", "class", "modifier-button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "tab-button", 3, "click"], [1, "keyboard-row"], ["type", "button", "class", "key-button", 3, "selected", "used", "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "key-button", 3, "click", "disabled"], ["type", "button", 1, "modifier-button", 3, "click"]], template: function NamesPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, NamesPanelComponent_div_0_Template, 14, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: ["[_nghost-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.names-panel-shell[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1250;\r\n  pointer-events: none;\r\n}\r\n\r\n.names-panel[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 8px;\r\n  bottom: 72px;\r\n  width: 500px;\r\n  height: 170px;\r\n  border: 2px solid red;\r\n  border-bottom-left-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n  background: rgba(230, 230, 230, 0.98);\r\n  overflow: hidden;\r\n  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n}\r\n\r\n.names-panel-header[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 30px;\r\n  background: rgba(210, 210, 210, 1);\r\n}\r\n\r\n.replace-toggle[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 5px;\r\n  top: 2px;\r\n  width: 60px;\r\n  height: 26px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 24px;\r\n  cursor: pointer;\r\n}\r\n\r\n.replace-toggle.active[_ngcontent-%COMP%] {\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}\r\n\r\n.tabs[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 70px;\r\n  top: 5px;\r\n  display: flex;\r\n  gap: 5px;\r\n}\r\n\r\n.tab-button[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n  height: 25px;\r\n  border: 1px solid #b4b4b4;\r\n  border-top-right-radius: 10px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 18px;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.tab-button.active[_ngcontent-%COMP%] {\r\n  background: rgba(230, 230, 230, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}\r\n\r\n.close-button[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 5px;\r\n  top: 5px;\r\n  width: 20px;\r\n  height: 20px;\r\n  border: 0;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n}\r\n\r\n.names-panel-body[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: calc(100% - 30px);\r\n}\r\n\r\n.keyboard[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  background: rgba(230, 230, 230, 0.9);\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-evenly;\r\n  padding: 8px 10px;\r\n}\r\n\r\n.keyboard-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-evenly;\r\n}\r\n\r\n.key-button[_ngcontent-%COMP%] {\r\n  width: 35px;\r\n  height: 30px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}\r\n\r\n.key-button.selected[_ngcontent-%COMP%] {\r\n  background: rgba(50, 50, 50, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n}\r\n\r\n.key-button.used[_ngcontent-%COMP%] {\r\n  color: rgba(150, 150, 150, 1);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modifiers[_ngcontent-%COMP%] {\r\n  width: 70px;\r\n  background: rgba(230, 230, 230, 0.9);\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-evenly;\r\n  padding: 0 10px;\r\n}\r\n\r\n.modifier-button[_ngcontent-%COMP%] {\r\n  width: 50px;\r\n  height: 25px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 18px;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.modifier-button.active[_ngcontent-%COMP%] {\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NamesPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-names-panel', imports: [CommonModule], template: "<div *ngIf=\"visible\" class=\"names-panel-shell\">\r\n  <section class=\"names-panel\" aria-label=\"Nombres\">\r\n    <header class=\"names-panel-header\">\r\n      <button\r\n        type=\"button\"\r\n        class=\"replace-toggle\"\r\n        [class.active]=\"replaceMode\"\r\n        (click)=\"setReplaceMode(!replaceMode)\"\r\n        title=\"Renombrar al seleccionar\"\r\n      >\r\n        \u270D\r\n      </button>\r\n\r\n      <div class=\"tabs\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"tab-button\"\r\n          *ngFor=\"let tab of tabs; let i = index\"\r\n          [class.active]=\"currentTabIndex === i\"\r\n          (click)=\"selectTab(i)\"\r\n        >\r\n          {{ tab.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <button\r\n        type=\"button\"\r\n        class=\"close-button\"\r\n        (click)=\"close()\"\r\n        title=\"Cerrar\"\r\n      >\r\n        \u2715\r\n      </button>\r\n    </header>\r\n\r\n    <div class=\"names-panel-body\">\r\n      <div class=\"keyboard\">\r\n        <div class=\"keyboard-row\" *ngFor=\"let row of tabs[currentTabIndex].rows\">\r\n          <button\r\n            type=\"button\"\r\n            class=\"key-button\"\r\n            *ngFor=\"let key of row; let rowIndex = index\"\r\n            [class.selected]=\"isSelectedKey(getFlatKeys().indexOf(key))\"\r\n            [class.used]=\"!isKeyAvailable(getFlatKeys().indexOf(key))\"\r\n            [disabled]=\"!isKeyAvailable(getFlatKeys().indexOf(key))\"\r\n            (click)=\"selectKey(getFlatKeys().indexOf(key))\"\r\n          >\r\n            {{ key }}{{ modifiers[currentModifierIndex] }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modifiers\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"modifier-button\"\r\n          *ngFor=\"let modifier of modifiers; let i = index\"\r\n          [class.active]=\"currentModifierIndex === i\"\r\n          (click)=\"selectModifier(i)\"\r\n        >\r\n          {{ getDisplayedModifierBase() }}{{ modifier }}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n", styles: [":host {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.names-panel-shell {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1250;\r\n  pointer-events: none;\r\n}\r\n\r\n.names-panel {\r\n  position: absolute;\r\n  right: 8px;\r\n  bottom: 72px;\r\n  width: 500px;\r\n  height: 170px;\r\n  border: 2px solid red;\r\n  border-bottom-left-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n  background: rgba(230, 230, 230, 0.98);\r\n  overflow: hidden;\r\n  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);\r\n  pointer-events: auto;\r\n}\r\n\r\n.names-panel-header {\r\n  position: relative;\r\n  height: 30px;\r\n  background: rgba(210, 210, 210, 1);\r\n}\r\n\r\n.replace-toggle {\r\n  position: absolute;\r\n  left: 5px;\r\n  top: 2px;\r\n  width: 60px;\r\n  height: 26px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 24px;\r\n  cursor: pointer;\r\n}\r\n\r\n.replace-toggle.active {\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}\r\n\r\n.tabs {\r\n  position: absolute;\r\n  left: 70px;\r\n  top: 5px;\r\n  display: flex;\r\n  gap: 5px;\r\n}\r\n\r\n.tab-button {\r\n  width: 60px;\r\n  height: 25px;\r\n  border: 1px solid #b4b4b4;\r\n  border-top-right-radius: 10px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 18px;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.tab-button.active {\r\n  background: rgba(230, 230, 230, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}\r\n\r\n.close-button {\r\n  position: absolute;\r\n  right: 5px;\r\n  top: 5px;\r\n  width: 20px;\r\n  height: 20px;\r\n  border: 0;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n}\r\n\r\n.names-panel-body {\r\n  display: flex;\r\n  height: calc(100% - 30px);\r\n}\r\n\r\n.keyboard {\r\n  flex: 1;\r\n  background: rgba(230, 230, 230, 0.9);\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-evenly;\r\n  padding: 8px 10px;\r\n}\r\n\r\n.keyboard-row {\r\n  display: flex;\r\n  justify-content: space-evenly;\r\n}\r\n\r\n.key-button {\r\n  width: 35px;\r\n  height: 30px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n}\r\n\r\n.key-button.selected {\r\n  background: rgba(50, 50, 50, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n}\r\n\r\n.key-button.used {\r\n  color: rgba(150, 150, 150, 1);\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modifiers {\r\n  width: 70px;\r\n  background: rgba(230, 230, 230, 0.9);\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-evenly;\r\n  padding: 0 10px;\r\n}\r\n\r\n.modifier-button {\r\n  width: 50px;\r\n  height: 25px;\r\n  border: 1px solid #b4b4b4;\r\n  border-radius: 5px;\r\n  background: rgba(90, 90, 90, 1);\r\n  color: rgba(230, 230, 230, 1);\r\n  font-size: 18px;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.modifier-button.active {\r\n  background: rgba(200, 200, 200, 1);\r\n  color: rgba(30, 30, 30, 1);\r\n}"] }]
    }], null, { closed: [{
            type: Output
        }], replaceModeChanged: [{
            type: Output
        }], nameSelected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NamesPanelComponent, { className: "NamesPanelComponent", filePath: "src/app/features/names/names-panel/names-panel.component.ts", lineNumber: 22 }); })();
