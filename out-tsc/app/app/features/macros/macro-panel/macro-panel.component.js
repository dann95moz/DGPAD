import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/dgpad-bridge/dgpad-bridge.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function MacroPanelComponent_aside_0_section_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 5)(1, "input", 6);
    i0.ɵɵtwoWayListener("ngModelChange", function MacroPanelComponent_aside_0_section_6_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.macroName, $event) || (ctx_r1.macroName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 7);
    i0.ɵɵelement(3, "span");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 8);
    i0.ɵɵelement(7, "span");
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 9);
    i0.ɵɵlistener("click", function MacroPanelComponent_aside_0_section_6_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveDraft()); });
    i0.ɵɵtext(11, "Guardar macro");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentDraft_r4 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.macroName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentDraft_r4.params.join(", "));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentDraft_r4.targets.join(", "));
} }
function MacroPanelComponent_aside_0_ng_container_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.activeMacro.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.requirementsMessage(ctx_r1.activeMacro));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectionMessage(ctx_r1.activeMacro.prompt));
} }
function MacroPanelComponent_aside_0_ng_container_7_div_5_div_6_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function MacroPanelComponent_aside_0_ng_container_7_div_5_div_6_button_1_Template_button_click_0_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.execute(item_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.displayName(item_r8), " ");
} }
function MacroPanelComponent_aside_0_ng_container_7_div_5_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtemplate(1, MacroPanelComponent_aside_0_ng_container_7_div_5_div_6_button_1_Template, 2, 1, "button", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r6.items);
} }
function MacroPanelComponent_aside_0_ng_container_7_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "button", 18);
    i0.ɵɵlistener("click", function MacroPanelComponent_aside_0_ng_container_7_div_5_Template_button_click_1_listener() { const group_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleGroup(group_r6.name)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, MacroPanelComponent_aside_0_ng_container_7_div_5_div_6_Template, 2, 1, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.expanded.has(group_r6.name) ? "\u25BE" : "\u25B8");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.expanded.has(group_r6.name));
} }
function MacroPanelComponent_aside_0_ng_container_7_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "No hay macros de biblioteca.");
    i0.ɵɵelementEnd();
} }
function MacroPanelComponent_aside_0_ng_container_7_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function MacroPanelComponent_aside_0_ng_container_7_button_10_Template_button_click_0_listener() { const item_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.execute(item_r10)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r10.name, " ");
} }
function MacroPanelComponent_aside_0_ng_container_7_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "Todav\u00EDa no hay macros personales.");
    i0.ɵɵelementEnd();
} }
function MacroPanelComponent_aside_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MacroPanelComponent_aside_0_ng_container_7_div_1_Template, 7, 3, "div", 10);
    i0.ɵɵelementStart(2, "section", 11)(3, "h4");
    i0.ɵɵtext(4, "Biblioteca");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, MacroPanelComponent_aside_0_ng_container_7_div_5_Template, 7, 3, "div", 12)(6, MacroPanelComponent_aside_0_ng_container_7_p_6_Template, 2, 0, "p", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "section", 14)(8, "h4");
    i0.ɵɵtext(9, "Macros personales");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, MacroPanelComponent_aside_0_ng_container_7_button_10_Template, 2, 1, "button", 15)(11, MacroPanelComponent_aside_0_ng_container_7_p_11_Template, 2, 0, "p", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.activeMacro);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.pluginGroups);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.catalog.plugins.length === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.catalog.tools);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.catalog.tools.length === 0);
} }
function MacroPanelComponent_aside_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "header")(2, "h3");
    i0.ɵɵtext(3, "Macros");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 2);
    i0.ɵɵlistener("click", function MacroPanelComponent_aside_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, MacroPanelComponent_aside_0_section_6_Template, 12, 3, "section", 3)(7, MacroPanelComponent_aside_0_ng_container_7_Template, 12, 5, "ng-container", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.draft);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.draft);
} }
export class MacroPanelComponent {
    dgpadBridge;
    closed = new EventEmitter();
    visible = false;
    catalog = { plugins: [], tools: [] };
    draft = null;
    activeMacro = null;
    macroName = 'Macro sin título';
    expanded = new Set();
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    get pluginGroups() {
        return this.group(this.catalog.plugins);
    }
    open() {
        this.visible = true;
        this.refresh();
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    toggleGroup(name) {
        this.expanded.has(name) ? this.expanded.delete(name) : this.expanded.add(name);
    }
    execute(item) {
        this.dgpadBridge.startMacro(item.key);
        this.activeMacro = this.dgpadBridge.getActiveMacro();
    }
    saveDraft() {
        const name = this.macroName.trim();
        if (!name)
            return;
        this.dgpadBridge.saveMacroDraft(name);
        this.macroName = 'Macro sin título';
        this.refresh();
    }
    displayName(item) {
        const parts = item.name.split('/');
        return parts[parts.length - 1];
    }
    requirementsMessage(active) {
        const types = active.types.map((type) => this.typeName(type));
        const total = types.length;
        if (total === 0)
            return 'Esta macro no necesita objetos iniciales.';
        const allSame = types.every((type) => type === types[0]);
        let message;
        if (allSame) {
            message = `Se ${total === 1 ? 'necesita' : 'necesitan'} ${this.cardinal(total)} ` +
                `${total === 1 ? types[0] : this.pluralType(types[0])}`;
        }
        else {
            const described = types.map((type) => `${this.articleFor(type)} ${type}`);
            const last = described.pop();
            message = `Se necesitan ${this.cardinal(total)} objetos: ` +
                `${described.join(', ')}${described.length ? ' y ' : ''}${last}`;
        }
        const normalizedName = active.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (normalizedName.includes('triangulo') && types.every((type) => type === 'punto')) {
            message += ', que serán vértices del triángulo';
        }
        return `${message}.`;
    }
    selectionMessage(prompt) {
        const match = /^(\d+)\/(\d+)\s*-\s*(.+?)\s*\??$/.exec(prompt.trim());
        if (!match)
            return prompt || 'Preparando macro…';
        return `Selecciona ahora el ${this.ordinal(Number(match[1]))}.`;
    }
    handleLegacyMessage(event) {
        if (this.visible && event.origin === window.location.origin) {
            if (event.data?.type === 'dgpad-macro-catalog' ||
                event.data?.type === 'dgpad-macro-draft' ||
                event.data?.type === 'dgpad-macro-progress') {
                this.refresh();
            }
        }
    }
    refresh() {
        this.catalog = this.dgpadBridge.getMacroCatalog();
        this.draft = this.dgpadBridge.getMacroDraft();
        this.activeMacro = this.dgpadBridge.getActiveMacro();
    }
    group(items) {
        const groups = new Map();
        for (const item of items) {
            const root = item.name.includes('/') ? item.name.split('/')[0] : 'Otras';
            groups.set(root, [...(groups.get(root) ?? []), item]);
        }
        return [...groups.entries()].map(([name, groupItems]) => ({ name, items: groupItems }));
    }
    cardinal(value) {
        const words = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
        return words[value] ?? String(value);
    }
    ordinal(value) {
        const words = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
        return words[value] ?? `número ${value}`;
    }
    articleFor(type) {
        const feminineTypes = ['recta', 'semirrecta', 'circunferencia', 'expresión', 'lista'];
        return feminineTypes.some((candidate) => type.includes(candidate)) ? 'una' : 'un';
    }
    typeName(type) {
        const names = {
            point: 'punto',
            line: 'recta',
            ray: 'semirrecta',
            segment: 'segmento',
            circle: 'círculo',
            area: 'polígono',
            angle: 'ángulo',
            expression: 'expresión',
        };
        return names[type.toLowerCase()] ?? type.toLowerCase();
    }
    pluralType(type) {
        const plurals = {
            punto: 'puntos',
            recta: 'rectas',
            semirrecta: 'semirrectas',
            segmento: 'segmentos',
            círculo: 'círculos',
            polígono: 'polígonos',
            ángulo: 'ángulos',
            expresión: 'expresiones',
        };
        return plurals[type] ?? `${type}s`;
    }
    static ɵfac = function MacroPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MacroPanelComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MacroPanelComponent, selectors: [["app-macro-panel"]], hostBindings: function MacroPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("message", function MacroPanelComponent_message_HostBindingHandler($event) { return ctx.handleLegacyMessage($event); }, false, i0.ɵɵresolveWindow);
        } }, outputs: { closed: "closed" }, decls: 1, vars: 1, consts: [["class", "macro-panel", "aria-label", "Panel de macros", 4, "ngIf"], ["aria-label", "Panel de macros", 1, "macro-panel"], ["type", "button", "aria-label", "Cerrar", 3, "click"], ["class", "draft-card", 4, "ngIf"], [4, "ngIf"], [1, "draft-card"], ["aria-label", "Nombre de la macro", 3, "ngModelChange", "ngModel"], [1, "macro-role", "initial"], [1, "macro-role", "target"], ["type", "button", 1, "save-button", 3, "click"], ["class", "macro-progress", "role", "status", 4, "ngIf"], [1, "macro-list"], ["class", "macro-group", 4, "ngFor", "ngForOf"], ["class", "empty", 4, "ngIf"], [1, "macro-list", "personal-list"], ["type", "button", "class", "personal-item", 3, "click", 4, "ngFor", "ngForOf"], ["role", "status", 1, "macro-progress"], [1, "macro-group"], ["type", "button", 1, "group-button", 3, "click"], ["class", "group-items", 4, "ngIf"], [1, "group-items"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 3, "click"], [1, "empty"], ["type", "button", 1, "personal-item", 3, "click"]], template: function MacroPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, MacroPanelComponent_aside_0_Template, 8, 2, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, FormsModule, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel], styles: [".macro-panel[_ngcontent-%COMP%] { position: fixed; top: 16px; left: 16px; z-index: 40; width: min(300px, calc(100vw - 32px)); max-height: calc(100vh - 96px); overflow: auto; padding: 0 10px 12px; box-sizing: border-box; border: 1px solid #b8bdc5; border-radius: 12px; background: rgba(241,242,244,.98); box-shadow: 0 12px 32px rgba(17,24,39,.2); color: #252525; font-family: Arial,sans-serif; }\nheader[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; }\nheader[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 12px 4px; font-size: 18px; }\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; background: transparent; font-size: 24px; cursor: pointer; }\n.macro-list[_ngcontent-%COMP%] { overflow: hidden; margin-bottom: 10px; border: 1px solid #b8bdc5; border-radius: 9px; background: #ddd; }\n.macro-list[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] { margin: 0; padding: 9px; background: #eee; text-align: center; font-size: 14px; font-weight: 400; }\n.group-button[_ngcontent-%COMP%], .personal-item[_ngcontent-%COMP%], .group-items[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: flex; width: 100%; justify-content: space-between; padding: 9px; border: 0; border-top: 1px solid white; background: #eee; text-align: left; cursor: pointer; }\n.macro-group[_ngcontent-%COMP%]:nth-child(even)   .group-button[_ngcontent-%COMP%] { background: #d3d3d3; }\n.group-items[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { padding-left: 20px; background: white; }\n.personal-list[_ngcontent-%COMP%] { min-height: 130px; }\n.personal-item[_ngcontent-%COMP%] { background: white; }\n.empty[_ngcontent-%COMP%] { margin: 0; padding: 18px 10px; color: #666; font-size: 13px; text-align: center; }\n.draft-card[_ngcontent-%COMP%] { padding: 8px; border: 1px solid #b8bdc5; border-radius: 10px; background: #eee; }\n.draft-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; padding: 7px 10px; box-sizing: border-box; border: 0; border-radius: 18px; background: white; text-align: center; font-size: 16px; }\n.macro-role[_ngcontent-%COMP%] { display: grid; grid-template-columns: 24px 1fr; align-items: start; gap: 10px; padding: 10px 0; }\n.macro-role[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 22px; height: 22px; border-radius: 50%; box-sizing: border-box; }\n.macro-role.initial[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { background: #64ad37; }\n.macro-role.target[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { border: 4px solid #e20b17; background: white; }\n.macro-role[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { line-height: 1.35; overflow-wrap: anywhere; }\n.save-button[_ngcontent-%COMP%] { width: 100%; padding: 7px; border: 1px solid #8f969f; border-radius: 4px; background: white; cursor: pointer; }\n.macro-progress[_ngcontent-%COMP%] { display: grid; gap: 4px; margin-bottom: 10px; padding: 10px; border: 1px solid #d6a70b; border-radius: 8px; background: #fff8d8; }\n.macro-progress[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 14px; }\n.macro-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #b30d16; font-weight: 600; }\n.macro-progress[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #5f6368; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MacroPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-macro-panel', imports: [CommonModule, FormsModule], template: "<aside *ngIf=\"visible\" class=\"macro-panel\" aria-label=\"Panel de macros\">\n  <header>\n    <h3>Macros</h3>\n    <button type=\"button\" (click)=\"close()\" aria-label=\"Cerrar\">\u00D7</button>\n  </header>\n\n  <section *ngIf=\"draft as currentDraft\" class=\"draft-card\">\n    <input [(ngModel)]=\"macroName\" aria-label=\"Nombre de la macro\" />\n    <div class=\"macro-role initial\"><span></span><strong>{{ currentDraft.params.join(', ') }}</strong></div>\n    <div class=\"macro-role target\"><span></span><strong>{{ currentDraft.targets.join(', ') }}</strong></div>\n    <button type=\"button\" class=\"save-button\" (click)=\"saveDraft()\">Guardar macro</button>\n  </section>\n\n  <ng-container *ngIf=\"!draft\">\n    <div *ngIf=\"activeMacro\" class=\"macro-progress\" role=\"status\">\n      <strong>{{ activeMacro.name }}</strong>\n      <span>{{ requirementsMessage(activeMacro) }}</span>\n      <small>{{ selectionMessage(activeMacro.prompt) }}</small>\n    </div>\n\n    <section class=\"macro-list\">\n      <h4>Biblioteca</h4>\n      <div *ngFor=\"let group of pluginGroups\" class=\"macro-group\">\n        <button type=\"button\" class=\"group-button\" (click)=\"toggleGroup(group.name)\">\n          <span>{{ group.name }}</span><span>{{ expanded.has(group.name) ? '\u25BE' : '\u25B8' }}</span>\n        </button>\n        <div *ngIf=\"expanded.has(group.name)\" class=\"group-items\">\n          <button *ngFor=\"let item of group.items\" type=\"button\" (click)=\"execute(item)\">\n            {{ displayName(item) }}\n          </button>\n        </div>\n      </div>\n      <p *ngIf=\"catalog.plugins.length === 0\" class=\"empty\">No hay macros de biblioteca.</p>\n    </section>\n\n    <section class=\"macro-list personal-list\">\n      <h4>Macros personales</h4>\n      <button *ngFor=\"let item of catalog.tools\" type=\"button\" class=\"personal-item\" (click)=\"execute(item)\">\n        {{ item.name }}\n      </button>\n      <p *ngIf=\"catalog.tools.length === 0\" class=\"empty\">Todav\u00EDa no hay macros personales.</p>\n    </section>\n  </ng-container>\n</aside>\n", styles: [".macro-panel { position: fixed; top: 16px; left: 16px; z-index: 40; width: min(300px, calc(100vw - 32px)); max-height: calc(100vh - 96px); overflow: auto; padding: 0 10px 12px; box-sizing: border-box; border: 1px solid #b8bdc5; border-radius: 12px; background: rgba(241,242,244,.98); box-shadow: 0 12px 32px rgba(17,24,39,.2); color: #252525; font-family: Arial,sans-serif; }\nheader { display: flex; align-items: center; justify-content: space-between; }\nheader h3 { margin: 12px 4px; font-size: 18px; }\nheader button { border: 0; background: transparent; font-size: 24px; cursor: pointer; }\n.macro-list { overflow: hidden; margin-bottom: 10px; border: 1px solid #b8bdc5; border-radius: 9px; background: #ddd; }\n.macro-list h4 { margin: 0; padding: 9px; background: #eee; text-align: center; font-size: 14px; font-weight: 400; }\n.group-button,.personal-item,.group-items button { display: flex; width: 100%; justify-content: space-between; padding: 9px; border: 0; border-top: 1px solid white; background: #eee; text-align: left; cursor: pointer; }\n.macro-group:nth-child(even) .group-button { background: #d3d3d3; }\n.group-items button { padding-left: 20px; background: white; }\n.personal-list { min-height: 130px; }\n.personal-item { background: white; }\n.empty { margin: 0; padding: 18px 10px; color: #666; font-size: 13px; text-align: center; }\n.draft-card { padding: 8px; border: 1px solid #b8bdc5; border-radius: 10px; background: #eee; }\n.draft-card input { width: 100%; padding: 7px 10px; box-sizing: border-box; border: 0; border-radius: 18px; background: white; text-align: center; font-size: 16px; }\n.macro-role { display: grid; grid-template-columns: 24px 1fr; align-items: start; gap: 10px; padding: 10px 0; }\n.macro-role span { width: 22px; height: 22px; border-radius: 50%; box-sizing: border-box; }\n.macro-role.initial span { background: #64ad37; }\n.macro-role.target span { border: 4px solid #e20b17; background: white; }\n.macro-role strong { line-height: 1.35; overflow-wrap: anywhere; }\n.save-button { width: 100%; padding: 7px; border: 1px solid #8f969f; border-radius: 4px; background: white; cursor: pointer; }\n.macro-progress { display: grid; gap: 4px; margin-bottom: 10px; padding: 10px; border: 1px solid #d6a70b; border-radius: 8px; background: #fff8d8; }\n.macro-progress strong { font-size: 14px; }\n.macro-progress span { color: #b30d16; font-weight: 600; }\n.macro-progress small { color: #5f6368; }\n"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { closed: [{
            type: Output
        }], handleLegacyMessage: [{
            type: HostListener,
            args: ['window:message', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MacroPanelComponent, { className: "MacroPanelComponent", filePath: "src/app/features/macros/macro-panel/macro-panel.component.ts", lineNumber: 20 }); })();
