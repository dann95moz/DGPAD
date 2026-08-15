import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/dgpad-bridge/dgpad-bridge.service";
import * as i2 from "@angular/common";
function CalculatorPanelComponent_div_0_label_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵlistener("focus", function CalculatorPanelComponent_div_0_label_7_Template_input_focus_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.focus("e2")); })("input", function CalculatorPanelComponent_div_0_label_7_Template_input_input_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.update("e2", $event.target.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const calc_r4 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(calc_r4.e2Label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", calc_r4.e2);
} }
function CalculatorPanelComponent_div_0_label_8_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "span");
    i0.ɵɵtext(2, "min =");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵlistener("focus", function CalculatorPanelComponent_div_0_label_8_Template_input_focus_3_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.focus("min")); })("input", function CalculatorPanelComponent_div_0_label_8_Template_input_input_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.update("min", $event.target.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const calc_r4 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", calc_r4.min);
} }
function CalculatorPanelComponent_div_0_label_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "span");
    i0.ɵɵtext(2, "max =");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵlistener("focus", function CalculatorPanelComponent_div_0_label_9_Template_input_focus_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.focus("max")); })("input", function CalculatorPanelComponent_div_0_label_9_Template_input_input_3_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.update("max", $event.target.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const calc_r4 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", calc_r4.max);
} }
function CalculatorPanelComponent_div_0_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_button_25_Template_button_click_0_listener() { const key_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.press(key_r8.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(key_r8.label);
} }
function CalculatorPanelComponent_div_0_button_32_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_button_32_Template_button_click_0_listener() { const key_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.press(key_r10)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(key_r10);
} }
function CalculatorPanelComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "section", 2)(2, "div", 3)(3, "label")(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 4);
    i0.ɵɵlistener("focus", function CalculatorPanelComponent_div_0_Template_input_focus_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.focus("e1")); })("input", function CalculatorPanelComponent_div_0_Template_input_input_6_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.update("e1", $event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, CalculatorPanelComponent_div_0_label_7_Template, 4, 2, "label", 5)(8, CalculatorPanelComponent_div_0_label_8_Template, 4, 1, "label", 5)(9, CalculatorPanelComponent_div_0_label_9_Template, 4, 1, "label", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 6)(11, "button", 7);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.validate()); });
    i0.ɵɵtext(12, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 8);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel()); });
    i0.ɵɵtext(14, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 9);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(16, "\u25BE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "label", 10)(18, "span");
    i0.ɵɵtext(19, "RAD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "input", 11);
    i0.ɵɵlistener("change", function CalculatorPanelComponent_div_0_Template_input_change_20_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setDegrees($event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "DEG");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(23, "section", 12)(24, "div", 13);
    i0.ɵɵtemplate(25, CalculatorPanelComponent_div_0_button_25_Template, 2, 1, "button", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 15)(27, "button", 16);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.deleteLast()); });
    i0.ɵɵtext(28, "DEL");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 16);
    i0.ɵɵlistener("click", function CalculatorPanelComponent_div_0_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearField()); });
    i0.ɵɵtext(30, "CLR");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 17);
    i0.ɵɵtemplate(32, CalculatorPanelComponent_div_0_button_32_Template, 2, 1, "button", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const calc_r4 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(calc_r4.e1Label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", calc_r4.e1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", calc_r4.showE2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", calc_r4.showMin);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", calc_r4.showMax);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("checked", calc_r4.degrees);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.functionKeys);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r1.numberKeys);
} }
export class CalculatorPanelComponent {
    dgpadBridge;
    closed = new EventEmitter();
    visible = false;
    state = null;
    activeField = 'e1';
    functionKeys = [
        { label: '?', value: '?' }, { label: ':', value: ':' }, { label: '=', value: '=' },
        { label: '<', value: '<' }, { label: '>', value: '>' }, { label: '( )', value: '()' },
        { label: '[ ]', value: '[]' }, { label: ';', value: ';' }, { label: ',', value: ',' },
        { label: 'i', value: 'i' }, { label: 'cos', value: 'cos()' }, { label: 'sin', value: 'sin()' },
        { label: 'tan', value: 'tan()' }, { label: 'exp', value: 'exp()' }, { label: 'round', value: 'round()' },
        { label: 'mod', value: 'mod()' }, { label: 'x()', value: 'x()' }, { label: 'acos', value: 'acos()' },
        { label: 'asin', value: 'asin()' }, { label: 'atan', value: 'atan()' }, { label: 'log', value: 'log()' },
        { label: 'floor', value: 'floor()' }, { label: 'arg', value: 'arg()' }, { label: 'y()', value: 'y()' },
        { label: 'sqrt', value: 'sqrt()' }, { label: 'abs', value: 'abs()' }, { label: 'max', value: 'max()' },
        { label: 'min', value: 'min()' }, { label: 'random', value: 'random()' }, { label: 'conj', value: 'conj()' },
    ];
    numberKeys = ['d', 'x', '7', '8', '9', '+', 'π', 'y', '4', '5', '6', '-', 'z', '1', '2', '3', '*', 't', '0', '.', '^', '/'];
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    open() {
        this.visible = true;
        this.refresh();
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    focus(field) {
        this.activeField = field;
        if (!this.state?.editing) {
            this.dgpadBridge.beginCalculatorExpression();
            this.refresh();
        }
    }
    update(field, value) {
        if (!this.state?.editing)
            this.dgpadBridge.beginCalculatorExpression();
        this.dgpadBridge.updateCalculatorField(field, value);
        this.refresh();
    }
    press(value) {
        const current = this.state?.[this.activeField] ?? '';
        this.update(this.activeField, current + value);
    }
    deleteLast() {
        const current = this.state?.[this.activeField] ?? '';
        this.update(this.activeField, current.slice(0, -1));
    }
    clearField() {
        this.update(this.activeField, '');
    }
    setDegrees(value) {
        this.dgpadBridge.setCalculatorDegrees(value);
        this.refresh();
    }
    validate() {
        this.dgpadBridge.validateCalculator();
        this.refresh();
    }
    cancel() {
        this.dgpadBridge.cancelCalculator();
        this.refresh();
    }
    handleLegacyMessage(event) {
        if (this.visible &&
            event.origin === window.location.origin &&
            event.data?.type === 'dgpad-calculator-state') {
            this.refresh();
        }
    }
    refresh() {
        this.state = this.dgpadBridge.getCalculatorState();
    }
    static ɵfac = function CalculatorPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CalculatorPanelComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalculatorPanelComponent, selectors: [["app-calculator-panel"]], hostBindings: function CalculatorPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("message", function CalculatorPanelComponent_message_HostBindingHandler($event) { return ctx.handleLegacyMessage($event); }, false, i0.ɵɵresolveWindow);
        } }, outputs: { closed: "closed" }, decls: 1, vars: 1, consts: [["class", "calculator-shell", 4, "ngIf"], [1, "calculator-shell"], ["aria-label", "Calculadora", 1, "calculator-top"], [1, "fields"], [3, "focus", "input", "value"], [4, "ngIf"], [1, "actions"], ["type", "button", "title", "Validar", 1, "valid", 3, "click"], ["type", "button", "title", "Cancelar", 1, "cancel", 3, "click"], ["type", "button", "title", "Cerrar", 1, "close", 3, "click"], [1, "degrees"], ["type", "checkbox", 3, "change", "checked"], ["aria-label", "Teclado matem\u00E1tico", 1, "calculator-keyboard"], [1, "function-keys"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf"], [1, "command-keys"], ["type", "button", 3, "click"], [1, "number-keys"]], template: function CalculatorPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CalculatorPanelComponent_div_0_Template, 33, 8, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible && ctx.state);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, FormsModule], styles: [".calculator-shell[_ngcontent-%COMP%] { position: fixed; inset: 0; z-index: 35; pointer-events: none; font-family: Arial,sans-serif; color: #333; }\n.calculator-top[_ngcontent-%COMP%], .calculator-keyboard[_ngcontent-%COMP%] { pointer-events: auto; background: rgba(235,235,235,.97); border-color: #b7b7b7; }\n.calculator-top[_ngcontent-%COMP%] { position: absolute; top: 0; left: 0; right: 0; min-height: 72px; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 18px; padding: 7px 10px; box-sizing: border-box; border-bottom: 1px solid #aaa; }\n.fields[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(300px,740px) 230px; gap: 8px 28px; align-content: start; }\n.fields[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { position: relative; display: flex; align-items: center; }\n.fields[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { position: absolute; left: 20px; color: #555; pointer-events: none; }\n.fields[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; height: 25px; padding: 2px 8px 2px 90px; box-sizing: border-box; border: 1px solid #aaa; border-radius: 5px; font-size: 17px; }\n.actions[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3,44px); gap: 10px; align-items: start; }\n.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { height: 42px; border: 0; background: transparent; font-size: 36px; cursor: pointer; }\n.actions[_ngcontent-%COMP%]   .valid[_ngcontent-%COMP%] { color: #83a916; }.actions[_ngcontent-%COMP%]   .cancel[_ngcontent-%COMP%] { color: #d43b2f; }.actions[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] { color: #596b78; }\n.degrees[_ngcontent-%COMP%] { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 13px; }\n.calculator-keyboard[_ngcontent-%COMP%] { position: absolute; left: 0; right: 0; bottom: 64px; min-height: 190px; display: grid; grid-template-columns: minmax(480px,1fr) 190px 260px; gap: 28px; padding: 10px; box-sizing: border-box; border-top: 1px solid #aaa; }\n.function-keys[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(10,minmax(35px,1fr)); gap: 8px; align-content: start; }\n.number-keys[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(6,1fr); gap: 8px; align-content: start; }\n.command-keys[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-content: end; }\n.calculator-keyboard[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-height: 35px; border: 1px solid #bbb; border-radius: 5px; background: #fafafa; color: #666; cursor: pointer; }\n@media (max-width:900px) { .calculator-keyboard[_ngcontent-%COMP%] { grid-template-columns: 1fr; max-height: 45vh; overflow: auto; }.fields[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.calculator-top[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.actions[_ngcontent-%COMP%] { position: static; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalculatorPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-calculator-panel', imports: [CommonModule, FormsModule], template: "<div *ngIf=\"visible && state as calc\" class=\"calculator-shell\">\n  <section class=\"calculator-top\" aria-label=\"Calculadora\">\n    <div class=\"fields\">\n      <label><span>{{ calc.e1Label }}</span><input [value]=\"calc.e1\" (focus)=\"focus('e1')\"\n        (input)=\"update('e1', $any($event.target).value)\" /></label>\n      <label *ngIf=\"calc.showE2\"><span>{{ calc.e2Label }}</span><input [value]=\"calc.e2\" (focus)=\"focus('e2')\"\n        (input)=\"update('e2', $any($event.target).value)\" /></label>\n      <label *ngIf=\"calc.showMin\"><span>min =</span><input [value]=\"calc.min\" (focus)=\"focus('min')\"\n        (input)=\"update('min', $any($event.target).value)\" /></label>\n      <label *ngIf=\"calc.showMax\"><span>max =</span><input [value]=\"calc.max\" (focus)=\"focus('max')\"\n        (input)=\"update('max', $any($event.target).value)\" /></label>\n    </div>\n\n    <div class=\"actions\">\n      <button type=\"button\" class=\"valid\" (click)=\"validate()\" title=\"Validar\">\u2713</button>\n      <button type=\"button\" class=\"cancel\" (click)=\"cancel()\" title=\"Cancelar\">\u00D7</button>\n      <button type=\"button\" class=\"close\" (click)=\"close()\" title=\"Cerrar\">\u25BE</button>\n      <label class=\"degrees\"><span>RAD</span><input type=\"checkbox\" [checked]=\"calc.degrees\"\n        (change)=\"setDegrees($any($event.target).checked)\" /><span>DEG</span></label>\n    </div>\n  </section>\n\n  <section class=\"calculator-keyboard\" aria-label=\"Teclado matem\u00E1tico\">\n    <div class=\"function-keys\">\n      <button *ngFor=\"let key of functionKeys\" type=\"button\" (click)=\"press(key.value)\">{{ key.label }}</button>\n    </div>\n    <div class=\"command-keys\">\n      <button type=\"button\" (click)=\"deleteLast()\">DEL</button>\n      <button type=\"button\" (click)=\"clearField()\">CLR</button>\n    </div>\n    <div class=\"number-keys\">\n      <button *ngFor=\"let key of numberKeys\" type=\"button\" (click)=\"press(key)\">{{ key }}</button>\n    </div>\n  </section>\n</div>\n", styles: [".calculator-shell { position: fixed; inset: 0; z-index: 35; pointer-events: none; font-family: Arial,sans-serif; color: #333; }\n.calculator-top,.calculator-keyboard { pointer-events: auto; background: rgba(235,235,235,.97); border-color: #b7b7b7; }\n.calculator-top { position: absolute; top: 0; left: 0; right: 0; min-height: 72px; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 18px; padding: 7px 10px; box-sizing: border-box; border-bottom: 1px solid #aaa; }\n.fields { display: grid; grid-template-columns: minmax(300px,740px) 230px; gap: 8px 28px; align-content: start; }\n.fields label { position: relative; display: flex; align-items: center; }\n.fields span { position: absolute; left: 20px; color: #555; pointer-events: none; }\n.fields input { width: 100%; height: 25px; padding: 2px 8px 2px 90px; box-sizing: border-box; border: 1px solid #aaa; border-radius: 5px; font-size: 17px; }\n.actions { display: grid; grid-template-columns: repeat(3,44px); gap: 10px; align-items: start; }\n.actions button { height: 42px; border: 0; background: transparent; font-size: 36px; cursor: pointer; }\n.actions .valid { color: #83a916; }.actions .cancel { color: #d43b2f; }.actions .close { color: #596b78; }\n.degrees { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 13px; }\n.calculator-keyboard { position: absolute; left: 0; right: 0; bottom: 64px; min-height: 190px; display: grid; grid-template-columns: minmax(480px,1fr) 190px 260px; gap: 28px; padding: 10px; box-sizing: border-box; border-top: 1px solid #aaa; }\n.function-keys { display: grid; grid-template-columns: repeat(10,minmax(35px,1fr)); gap: 8px; align-content: start; }\n.number-keys { display: grid; grid-template-columns: repeat(6,1fr); gap: 8px; align-content: start; }\n.command-keys { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-content: end; }\n.calculator-keyboard button { min-height: 35px; border: 1px solid #bbb; border-radius: 5px; background: #fafafa; color: #666; cursor: pointer; }\n@media (max-width:900px) { .calculator-keyboard { grid-template-columns: 1fr; max-height: 45vh; overflow: auto; }.fields { grid-template-columns: 1fr; }.calculator-top { grid-template-columns: 1fr; }.actions { position: static; } }\n"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { closed: [{
            type: Output
        }], handleLegacyMessage: [{
            type: HostListener,
            args: ['window:message', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CalculatorPanelComponent, { className: "CalculatorPanelComponent", filePath: "src/app/features/calculator/calculator-panel/calculator-panel.component.ts", lineNumber: 18 }); })();
