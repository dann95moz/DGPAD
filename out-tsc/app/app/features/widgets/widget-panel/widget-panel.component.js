import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/dgpad-bridge/dgpad-bridge.service";
import * as i2 from "@angular/common";
function WidgetPanelComponent_aside_0_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function WidgetPanelComponent_aside_0_button_13_Template_button_click_0_listener() { const color_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.update("color", color_r4)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("background", color_r4);
    i0.ɵɵclassProp("active", ctx_r1.state.color === color_r4);
    i0.ɵɵattribute("aria-label", color_r4);
} }
function WidgetPanelComponent_aside_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "header")(2, "h3");
    i0.ɵɵtext(3, "Widgets");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 2);
    i0.ɵɵlistener("click", function WidgetPanelComponent_aside_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 3);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "label", 4)(9, "span");
    i0.ɵɵtext(10, "Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 5);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_11_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("color", ctx_r1.textValue($event))); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 6);
    i0.ɵɵtemplate(13, WidgetPanelComponent_aside_0_button_13_Template, 1, 5, "button", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 8)(15, "label")(16, "span");
    i0.ɵɵtext(17, "Opacidad");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "input", 9);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_18_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("opacity", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "output");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "label")(22, "span");
    i0.ɵɵtext(23, "Tama\u00F1o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 10);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_24_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("borderSize", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "output");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "label")(28, "span");
    i0.ɵɵtext(29, "Radio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "input", 11);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_30_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("borderRadius", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "output");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "label")(34, "span");
    i0.ɵɵtext(35, "Precisi\u00F3n");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "input", 12);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_36_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("precision", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "output");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "label")(40, "span");
    i0.ɵɵtext(41, "Fuente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "input", 13);
    i0.ɵɵlistener("input", function WidgetPanelComponent_aside_0_Template_input_input_42_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("fontSize", ctx_r1.numberValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "output");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "div", 14)(46, "label")(47, "input", 15);
    i0.ɵɵlistener("change", function WidgetPanelComponent_aside_0_Template_input_change_47_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("fixPosition", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(48, "Fijar posici\u00F3n");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "label")(50, "input", 15);
    i0.ɵɵlistener("change", function WidgetPanelComponent_aside_0_Template_input_change_50_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("fixSize", ctx_r1.checkedValue($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(51, "Fijar tama\u00F1o");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "button", 16);
    i0.ɵɵlistener("click", function WidgetPanelComponent_aside_0_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createWidget()); });
    i0.ɵɵtext(53, "Nuevo widget");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.hasSelection ? "Modifica las propiedades del widget seleccionado." : "Haz clic sobre un widget para modificar sus propiedades.", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.state.color);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.colors);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.state.opacity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.state.opacity);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.state.borderSize);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.state.borderSize);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.state.borderRadius);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.state.borderRadius);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.state.precision);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.state.precision);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.state.fontSize);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.state.fontSize);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", ctx_r1.state.fixPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", ctx_r1.state.fixSize);
} }
export class WidgetPanelComponent {
    dgpadBridge;
    closed = new EventEmitter();
    visible = false;
    hasSelection = false;
    state = this.defaultState();
    colors = ['#0000b2', '#007c7c', '#006633', '#966400', '#770012', '#cc66cc', '#ffffff'];
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    open() {
        this.visible = true;
        this.loadSelection();
    }
    close() {
        this.visible = false;
        this.hasSelection = false;
        this.closed.emit();
    }
    update(property, value) {
        this.state = { ...this.state, [property]: value };
        if (this.hasSelection) {
            this.dgpadBridge.updateWidgetProperty(property, value);
            this.loadSelection();
        }
    }
    createWidget() {
        this.dgpadBridge.createWidget(this.state);
    }
    numberValue(event) {
        return Number(event.target.value);
    }
    checkedValue(event) {
        return event.target.checked;
    }
    textValue(event) {
        return event.target.value;
    }
    handleLegacyMessage(event) {
        if (this.visible &&
            event.origin === window.location.origin &&
            event.data?.type === 'dgpad-widget-selection') {
            this.loadSelection();
        }
    }
    loadSelection() {
        const selected = this.dgpadBridge.getWidgetState();
        this.hasSelection = !!selected;
        if (selected) {
            this.state = selected;
        }
    }
    defaultState() {
        return {
            color: '#3b4f73',
            opacity: 0.18,
            borderSize: 3,
            borderRadius: 15,
            precision: 4,
            fontSize: 3,
            fixPosition: false,
            fixSize: false,
        };
    }
    static ɵfac = function WidgetPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WidgetPanelComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WidgetPanelComponent, selectors: [["app-widget-panel"]], hostBindings: function WidgetPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("message", function WidgetPanelComponent_message_HostBindingHandler($event) { return ctx.handleLegacyMessage($event); }, false, i0.ɵɵresolveWindow);
        } }, outputs: { closed: "closed" }, decls: 1, vars: 1, consts: [["class", "widget-panel", "aria-label", "Panel de widgets", 4, "ngIf"], ["aria-label", "Panel de widgets", 1, "widget-panel"], ["type", "button", "aria-label", "Cerrar", 3, "click"], [1, "help-text"], [1, "color-control"], ["type", "color", 3, "input", "value"], [1, "color-swatches"], ["type", "button", 3, "background", "active", "click", 4, "ngFor", "ngForOf"], [1, "controls"], ["type", "range", "min", "0", "max", "1", "step", "0.01", 3, "input", "value"], ["type", "range", "min", "0", "max", "30", "step", "0.5", 3, "input", "value"], ["type", "range", "min", "0", "max", "200", "step", "0.5", 3, "input", "value"], ["type", "range", "min", "0", "max", "13", "step", "1", 3, "input", "value"], ["type", "range", "min", "5", "max", "40", "step", "1", 3, "input", "value"], [1, "checkboxes"], ["type", "checkbox", 3, "change", "checked"], ["type", "button", 1, "new-widget", 3, "click"], ["type", "button", 3, "click"]], template: function WidgetPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, WidgetPanelComponent_aside_0_Template, 54, 15, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf], styles: [".widget-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 16px;\n  z-index: 40;\n  width: min(320px, calc(100vw - 32px));\n  max-height: calc(100vh - 96px);\n  overflow: auto;\n  padding: 0 16px 16px;\n  box-sizing: border-box;\n  border: 1px solid #c8cdd5;\n  border-radius: 12px;\n  background: rgba(245, 246, 248, 0.98);\n  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.2);\n  color: #252525;\n  font-family: Arial, sans-serif;\n}\n\nheader[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; }\nheader[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 14px 0; font-size: 18px; }\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; background: transparent; font-size: 24px; cursor: pointer; }\n.help-text[_ngcontent-%COMP%] { margin: 0 0 14px; font-size: 13px; font-style: italic; text-align: center; line-height: 1.35; }\n.color-control[_ngcontent-%COMP%] { display: grid; gap: 6px; font-size: 13px; font-weight: 600; }\n.color-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; height: 110px; padding: 2px; border: 1px solid #adb5c0; border-radius: 8px; }\n.color-swatches[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(7, 1fr); margin: 8px 0 16px; }\n.color-swatches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { height: 30px; border: 1px solid #adb5c0; cursor: pointer; }\n.color-swatches[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { outline: 3px solid #4a90e2; outline-offset: -4px; }\n.controls[_ngcontent-%COMP%] { display: grid; gap: 13px; }\n.controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: grid; grid-template-columns: 78px 1fr 36px; align-items: center; gap: 8px; font-size: 13px; }\n.controls[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { min-width: 0; width: 100%; }\n.controls[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] { text-align: right; font-size: 12px; }\n.checkboxes[_ngcontent-%COMP%] { display: grid; gap: 12px; margin: 18px 4px; }\n.checkboxes[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: flex; gap: 9px; align-items: center; font-size: 14px; }\n.new-widget[_ngcontent-%COMP%] { width: 100%; padding: 7px 12px; border: 1px solid #8f969f; border-radius: 4px; background: white; cursor: pointer; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WidgetPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-widget-panel', imports: [CommonModule], template: "<aside *ngIf=\"visible\" class=\"widget-panel\" aria-label=\"Panel de widgets\">\n  <header>\n    <h3>Widgets</h3>\n    <button type=\"button\" (click)=\"close()\" aria-label=\"Cerrar\">\u00D7</button>\n  </header>\n\n  <p class=\"help-text\">\n    {{ hasSelection ? 'Modifica las propiedades del widget seleccionado.' : 'Haz clic sobre un widget para modificar sus propiedades.' }}\n  </p>\n\n  <label class=\"color-control\">\n    <span>Color</span>\n    <input type=\"color\" [value]=\"state.color\" (input)=\"update('color', textValue($event))\" />\n  </label>\n\n  <div class=\"color-swatches\">\n    <button *ngFor=\"let color of colors\" type=\"button\" [style.background]=\"color\"\n      [class.active]=\"state.color === color\" (click)=\"update('color', color)\"\n      [attr.aria-label]=\"color\"></button>\n  </div>\n\n  <div class=\"controls\">\n    <label><span>Opacidad</span><input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"\n      [value]=\"state.opacity\" (input)=\"update('opacity', numberValue($event))\" />\n      <output>{{ state.opacity }}</output></label>\n    <label><span>Tama\u00F1o</span><input type=\"range\" min=\"0\" max=\"30\" step=\"0.5\"\n      [value]=\"state.borderSize\" (input)=\"update('borderSize', numberValue($event))\" />\n      <output>{{ state.borderSize }}</output></label>\n    <label><span>Radio</span><input type=\"range\" min=\"0\" max=\"200\" step=\"0.5\"\n      [value]=\"state.borderRadius\" (input)=\"update('borderRadius', numberValue($event))\" />\n      <output>{{ state.borderRadius }}</output></label>\n    <label><span>Precisi\u00F3n</span><input type=\"range\" min=\"0\" max=\"13\" step=\"1\"\n      [value]=\"state.precision\" (input)=\"update('precision', numberValue($event))\" />\n      <output>{{ state.precision }}</output></label>\n    <label><span>Fuente</span><input type=\"range\" min=\"5\" max=\"40\" step=\"1\"\n      [value]=\"state.fontSize\" (input)=\"update('fontSize', numberValue($event))\" />\n      <output>{{ state.fontSize }}</output></label>\n  </div>\n\n  <div class=\"checkboxes\">\n    <label><input type=\"checkbox\" [checked]=\"state.fixPosition\"\n      (change)=\"update('fixPosition', checkedValue($event))\" />Fijar posici\u00F3n</label>\n    <label><input type=\"checkbox\" [checked]=\"state.fixSize\"\n      (change)=\"update('fixSize', checkedValue($event))\" />Fijar tama\u00F1o</label>\n  </div>\n\n  <button type=\"button\" class=\"new-widget\" (click)=\"createWidget()\">Nuevo widget</button>\n</aside>\n", styles: [".widget-panel {\n  position: fixed;\n  top: 16px;\n  right: 16px;\n  z-index: 40;\n  width: min(320px, calc(100vw - 32px));\n  max-height: calc(100vh - 96px);\n  overflow: auto;\n  padding: 0 16px 16px;\n  box-sizing: border-box;\n  border: 1px solid #c8cdd5;\n  border-radius: 12px;\n  background: rgba(245, 246, 248, 0.98);\n  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.2);\n  color: #252525;\n  font-family: Arial, sans-serif;\n}\n\nheader { display: flex; align-items: center; justify-content: space-between; }\nheader h3 { margin: 14px 0; font-size: 18px; }\nheader button { border: 0; background: transparent; font-size: 24px; cursor: pointer; }\n.help-text { margin: 0 0 14px; font-size: 13px; font-style: italic; text-align: center; line-height: 1.35; }\n.color-control { display: grid; gap: 6px; font-size: 13px; font-weight: 600; }\n.color-control input { width: 100%; height: 110px; padding: 2px; border: 1px solid #adb5c0; border-radius: 8px; }\n.color-swatches { display: grid; grid-template-columns: repeat(7, 1fr); margin: 8px 0 16px; }\n.color-swatches button { height: 30px; border: 1px solid #adb5c0; cursor: pointer; }\n.color-swatches button.active { outline: 3px solid #4a90e2; outline-offset: -4px; }\n.controls { display: grid; gap: 13px; }\n.controls label { display: grid; grid-template-columns: 78px 1fr 36px; align-items: center; gap: 8px; font-size: 13px; }\n.controls input { min-width: 0; width: 100%; }\n.controls output { text-align: right; font-size: 12px; }\n.checkboxes { display: grid; gap: 12px; margin: 18px 4px; }\n.checkboxes label { display: flex; gap: 9px; align-items: center; font-size: 14px; }\n.new-widget { width: 100%; padding: 7px 12px; border: 1px solid #8f969f; border-radius: 4px; background: white; cursor: pointer; }\n"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { closed: [{
            type: Output
        }], handleLegacyMessage: [{
            type: HostListener,
            args: ['window:message', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WidgetPanelComponent, { className: "WidgetPanelComponent", filePath: "src/app/features/widgets/widget-panel/widget-panel.component.ts", lineNumber: 15 }); })();
