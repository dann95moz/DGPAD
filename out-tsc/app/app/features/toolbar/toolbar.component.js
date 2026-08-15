import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { OtherToolsMenuComponent, } from '../other-tools/other-tools-menu/other-tools-menu.component';
import { TextualConstructionDialogComponent } from '../textual-construction/textual-construction-dialog/textual-construction-dialog.component';
import { NamesPanelComponent } from '../names/names-panel/names-panel.component';
import { PropertiesPanelComponent } from '../properties/properties-panel/properties-panel.component';
import { WidgetPanelComponent } from '../widgets/widget-panel/widget-panel.component';
import { MacroPanelComponent } from '../macros/macro-panel/macro-panel.component';
import { CalculatorPanelComponent } from '../calculator/calculator-panel/calculator-panel.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/dgpad-bridge/dgpad-bridge.service";
export class ToolbarComponent {
    dgpadBridge;
    exportRequested = new EventEmitter();
    historyRequested = new EventEmitter();
    otherToolsMenu;
    textualConstructionDialog;
    namesPanel;
    propertiesPanel;
    widgetPanel;
    macroPanel;
    calculatorPanel;
    constructionEnabled = true;
    hideEnabled = false;
    deleteEnabled = false;
    macroEnabled = false;
    calcEnabled = false;
    texEnabled = false;
    propertiesEnabled = false;
    historyEnabled = false;
    exportEnabled = false;
    nameEnabled = false;
    gridEnabled = false;
    otherToolsEnabled = false;
    namesReplaceMode = false;
    currentSuggestedName = 'P';
    constructor(dgpadBridge) {
        this.dgpadBridge = dgpadBridge;
    }
    toggleConstruction() {
        this.disableAllModes();
        this.closeFloatingPanels();
        this.constructionEnabled = !this.constructionEnabled;
        const mode = this.constructionEnabled ? 'build' : 'move';
        this.dgpadBridge.setMode(mode);
    }
    toggleHide() {
        this.disableAllModes();
        this.closeFloatingPanels();
        this.hideEnabled = true;
        this.constructionEnabled = false;
        this.dgpadBridge.setMode('hide');
    }
    toggleDelete() {
        this.disableAllModes();
        this.closeFloatingPanels();
        this.deleteEnabled = true;
        this.constructionEnabled = false;
        this.dgpadBridge.setMode('delete');
    }
    toggleMacro() {
        const next = !this.macroEnabled;
        this.disableAllModes();
        this.closeFloatingPanels();
        this.constructionEnabled = false;
        this.macroEnabled = next;
        if (next) {
            this.dgpadBridge.setMode('macro');
            this.macroPanel?.open();
            return;
        }
        this.dgpadBridge.setMode('move');
    }
    closeMacroState() {
        this.macroEnabled = false;
        this.dgpadBridge.setMode('move');
    }
    toggleCalc() {
        const next = !this.calcEnabled;
        this.disableAllModes();
        this.closeFloatingPanels();
        this.constructionEnabled = false;
        this.calcEnabled = next;
        if (next) {
            this.dgpadBridge.setMode('calc');
            this.calculatorPanel?.open();
            return;
        }
        this.dgpadBridge.setMode('move');
    }
    closeCalculatorState() {
        this.calcEnabled = false;
        this.dgpadBridge.setMode('move');
    }
    toggleTex() {
        const next = !this.texEnabled;
        this.disableAllModes();
        this.closeFloatingPanels();
        this.constructionEnabled = false;
        this.texEnabled = next;
        if (next) {
            this.dgpadBridge.setMode('tex');
            this.widgetPanel?.open();
            return;
        }
        this.dgpadBridge.setMode('move');
    }
    closeWidgetState() {
        this.texEnabled = false;
        this.dgpadBridge.setMode('move');
    }
    toggleProperties() {
        const next = !this.propertiesEnabled;
        this.disableAllModes();
        this.closeFloatingPanels();
        this.constructionEnabled = false;
        this.propertiesEnabled = next;
        if (next) {
            this.dgpadBridge.setMode('properties');
            this.propertiesPanel?.open();
            return;
        }
        this.dgpadBridge.setMode('move');
    }
    closePropertiesState() {
        this.propertiesEnabled = false;
        this.dgpadBridge.closeProperties();
    }
    openHistory() {
        this.disableAllModes();
        this.closeFloatingPanels();
        this.historyEnabled = true;
        this.constructionEnabled = false;
        this.dgpadBridge.setMode('move');
        this.historyRequested.emit();
    }
    closeHistoryState() {
        this.historyEnabled = false;
    }
    openExport() {
        this.disableAllModes();
        this.closeFloatingPanels();
        this.exportEnabled = true;
        this.constructionEnabled = false;
        this.dgpadBridge.setMode('move');
        this.exportRequested.emit();
    }
    closeExportState() {
        this.exportEnabled = false;
    }
    toggleName() {
        const next = !this.nameEnabled;
        this.disableAllModes();
        this.dgpadBridge.closeProperties();
        this.nameEnabled = next;
        this.constructionEnabled = false;
        this.dgpadBridge.setMode('move');
        if (next) {
            const usedNames = this.dgpadBridge.getUsedNames();
            console.log('Opening Angular names panel. usedNames =', usedNames);
            this.namesPanel?.open(usedNames, this.namesReplaceMode);
            return;
        }
        this.namesPanel?.close();
    }
    closeNameState() {
        this.nameEnabled = false;
    }
    handleNamesReplaceModeChanged(value) {
        this.namesReplaceMode = value;
    }
    handleNameSelected(name) {
        this.currentSuggestedName = name;
        console.log('Nombre actual sugerido:', name, 'replaceMode:', this.namesReplaceMode);
    }
    toggleGrid() {
        this.gridEnabled = this.dgpadBridge.toggleGrid();
    }
    resetZoom() {
        this.dgpadBridge.resetZoom();
    }
    toggleOtherTools() {
        const next = !this.otherToolsEnabled;
        this.disableAllModes();
        this.closeFloatingPanels();
        this.otherToolsEnabled = next;
        if (next) {
            this.otherToolsMenu?.open();
            return;
        }
        this.otherToolsMenu?.close();
    }
    closeOtherToolsState() {
        this.otherToolsEnabled = false;
    }
    undo() {
        this.dgpadBridge.undo();
    }
    redo() {
        this.dgpadBridge.redo();
    }
    handleOtherToolSelected(action) {
        switch (action) {
            case 'construction_protocol':
                this.dgpadBridge.openConstructionProtocol();
                break;
            case 'textual_construction':
                this.textualConstructionDialog?.open();
                break;
            case 'duplicate_figure':
                this.dgpadBridge.duplicateFigure();
                break;
            case 'open_file':
                this.dgpadBridge.openFile();
                break;
            case 'save_file':
                this.dgpadBridge.saveFile();
                break;
            case 'blockly_button':
                this.dgpadBridge.createBlocklyButton();
                break;
            case 'expression':
                this.dgpadBridge.createExpression();
                break;
            case 'expression_points':
                this.dgpadBridge.createExpressionPoints();
                break;
            case 'expression_segments':
                this.dgpadBridge.createExpressionSegments();
                break;
            case 'board_points':
                this.dgpadBridge.createBoardPoints();
                break;
            case 'integer_cursor':
                this.dgpadBridge.createIntegerCursor();
                break;
            case 'continuous_cursor':
                this.dgpadBridge.createContinuousCursor();
                break;
            case 'edit_widget':
                this.dgpadBridge.createEditWidget();
                break;
        }
        this.closeOtherToolsState();
    }
    handleTextualConstructionBuildRequested(text) {
        try {
            const instructions = this.parseTextualConstruction(text);
            this.dgpadBridge.clearConstruction();
            for (const instruction of instructions) {
                this.executeInstruction(instruction);
            }
        }
        catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'Error desconocido en construcción textual';
            alert(message);
        }
    }
    parseTextualConstruction(text) {
        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        const instructions = [];
        const knownNames = new Set();
        for (let index = 0; index < lines.length; index += 1) {
            const lineNumber = index + 1;
            const line = lines[index];
            const separatorIndex = line.indexOf(':');
            if (separatorIndex === -1) {
                throw new Error(`Línea ${lineNumber}: falta ":" en "${line}"`);
            }
            const name = line.slice(0, separatorIndex).trim();
            const predicate = line.slice(separatorIndex + 1).trim();
            if (!name) {
                throw new Error(`Línea ${lineNumber}: falta el nombre`);
            }
            if (!predicate) {
                throw new Error(`Línea ${lineNumber}: falta el predicado`);
            }
            if (knownNames.has(name)) {
                throw new Error(`Línea ${lineNumber}: "${name}" ya fue definido`);
            }
            if (/^Punto cualquiera$/i.test(predicate)) {
                instructions.push({ kind: 'any_point', name });
                knownNames.add(name);
                continue;
            }
            const lineMatch = /^recta\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])([A-Za-zÁÉÍÓÚáéíóúÑñ])$/i.exec(predicate);
            if (lineMatch) {
                const [, a, b] = lineMatch;
                if (!knownNames.has(a) || !knownNames.has(b)) {
                    throw new Error(`Línea ${lineNumber}: la recta requiere puntos ya definidos`);
                }
                instructions.push({ kind: 'line', name, a, b });
                knownNames.add(name);
                continue;
            }
            const segmentMatch = /^segmento\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])([A-Za-zÁÉÍÓÚáéíóúÑñ])$/i.exec(predicate);
            if (segmentMatch) {
                const [, a, b] = segmentMatch;
                if (!knownNames.has(a) || !knownNames.has(b)) {
                    throw new Error(`Línea ${lineNumber}: el segmento requiere puntos ya definidos`);
                }
                instructions.push({ kind: 'segment', name, a, b });
                knownNames.add(name);
                continue;
            }
            throw new Error(`Línea ${lineNumber}: no entiendo "${line}"`);
        }
        return instructions;
    }
    executeInstruction(instruction) {
        switch (instruction.kind) {
            case 'any_point':
                this.dgpadBridge.createAnyPoint(instruction.name);
                return;
            case 'line':
                this.dgpadBridge.createLine(instruction.name, instruction.a, instruction.b);
                return;
            case 'segment':
                this.dgpadBridge.createSegment(instruction.name, instruction.a, instruction.b);
                return;
        }
    }
    disableAllModes() {
        this.hideEnabled = false;
        this.deleteEnabled = false;
        this.macroEnabled = false;
        this.calcEnabled = false;
        this.texEnabled = false;
        this.propertiesEnabled = false;
        this.historyEnabled = false;
        this.exportEnabled = false;
        this.nameEnabled = false;
        this.otherToolsEnabled = false;
    }
    closeFloatingPanels() {
        this.dgpadBridge.closeProperties();
        this.namesPanel?.close();
        this.otherToolsMenu?.close();
        this.propertiesPanel?.close();
        this.widgetPanel?.close();
        this.macroPanel?.close();
        this.calculatorPanel?.close();
    }
    static ɵfac = function ToolbarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToolbarComponent)(i0.ɵɵdirectiveInject(i1.DgpadBridgeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToolbarComponent, selectors: [["app-toolbar"]], viewQuery: function ToolbarComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(OtherToolsMenuComponent, 5);
            i0.ɵɵviewQuery(TextualConstructionDialogComponent, 5);
            i0.ɵɵviewQuery(NamesPanelComponent, 5);
            i0.ɵɵviewQuery(PropertiesPanelComponent, 5);
            i0.ɵɵviewQuery(WidgetPanelComponent, 5);
            i0.ɵɵviewQuery(MacroPanelComponent, 5);
            i0.ɵɵviewQuery(CalculatorPanelComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.otherToolsMenu = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.textualConstructionDialog = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.namesPanel = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.propertiesPanel = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetPanel = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.macroPanel = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.calculatorPanel = _t.first);
        } }, outputs: { exportRequested: "exportRequested", historyRequested: "historyRequested" }, decls: 40, vars: 60, consts: [[1, "toolbar"], [1, "toolbar-left"], ["type", "button", "title", "Construcci\u00F3n", 1, "icon-button", 3, "click"], ["src", "/icons/controls/arrow.png", "alt", "Construcci\u00F3n"], ["type", "button", "title", "Ocultar / mostrar", 1, "icon-button", 3, "click"], ["src", "/icons/controls/hide.png", "alt", "Ocultar / mostrar"], ["type", "button", "title", "Borrar", 1, "icon-button", 3, "click"], ["src", "/icons/controls/trash.png", "alt", "Borrar"], ["type", "button", "title", "Macros", 1, "icon-button", 3, "click"], ["src", "/icons/controls/macros.png", "alt", "Macros"], ["type", "button", "title", "Calculadora", 1, "icon-button", 3, "click"], ["src", "/icons/controls/calc.png", "alt", "Calculadora"], ["type", "button", "title", "Texto", 1, "icon-button", 3, "click"], ["src", "/icons/controls/tex.png", "alt", "Texto"], ["type", "button", "title", "Propiedades", 1, "icon-button", 3, "click"], ["src", "/icons/controls/properties.png", "alt", "Propiedades"], ["type", "button", "title", "Historial", 1, "icon-button", 3, "click"], ["src", "/icons/controls/history.png", "alt", "Historial"], ["type", "button", "title", "Exportar", 1, "icon-button", 3, "click"], ["src", "/icons/controls/copy.png", "alt", "Exportar"], ["type", "button", "title", "Nombres", 1, "icon-button", 3, "click"], ["src", "/icons/controls/name.png", "alt", "Nombres"], ["type", "button", "title", "Cuadr\u00EDcula", 1, "icon-button", 3, "click"], ["src", "/icons/controls/grid.png", "alt", "Cuadr\u00EDcula"], ["type", "button", "title", "Restablecer zoom", 1, "icon-button", 3, "click"], ["src", "/icons/controls/zoom.png", "alt", "Restablecer zoom"], ["type", "button", "title", "Otras herramientas", 1, "icon-button", 3, "click"], ["src", "/icons/controls/OtherTools.png", "alt", "Otras herramientas"], [1, "toolbar-right"], ["type", "button", "title", "Deshacer", 1, "icon-button", 3, "click"], ["src", "/icons/controls/undo.png", "alt", "Deshacer"], ["type", "button", "title", "Rehacer", 1, "icon-button", 3, "click"], ["src", "/icons/controls/redo.png", "alt", "Rehacer"], [3, "closed", "actionSelected"], [3, "buildRequested"], [3, "closed", "replaceModeChanged", "nameSelected"], [3, "closed"]], template: function ToolbarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "footer", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_2_listener() { return ctx.toggleConstruction(); });
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 4);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_4_listener() { return ctx.toggleHide(); });
            i0.ɵɵelement(5, "img", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 6);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_6_listener() { return ctx.toggleDelete(); });
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 8);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_8_listener() { return ctx.toggleMacro(); });
            i0.ɵɵelement(9, "img", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 10);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_10_listener() { return ctx.toggleCalc(); });
            i0.ɵɵelement(11, "img", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 12);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_12_listener() { return ctx.toggleTex(); });
            i0.ɵɵelement(13, "img", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 14);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_14_listener() { return ctx.toggleProperties(); });
            i0.ɵɵelement(15, "img", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 16);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_16_listener() { return ctx.openHistory(); });
            i0.ɵɵelement(17, "img", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 18);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_18_listener() { return ctx.openExport(); });
            i0.ɵɵelement(19, "img", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 20);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_20_listener() { return ctx.toggleName(); });
            i0.ɵɵelement(21, "img", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 22);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_22_listener() { return ctx.toggleGrid(); });
            i0.ɵɵelement(23, "img", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 24);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_24_listener() { return ctx.resetZoom(); });
            i0.ɵɵelement(25, "img", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 26);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_26_listener() { return ctx.toggleOtherTools(); });
            i0.ɵɵelement(27, "img", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 28)(29, "button", 29);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_29_listener() { return ctx.undo(); });
            i0.ɵɵelement(30, "img", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "button", 31);
            i0.ɵɵlistener("click", function ToolbarComponent_Template_button_click_31_listener() { return ctx.redo(); });
            i0.ɵɵelement(32, "img", 32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "app-other-tools-menu", 33);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_other_tools_menu_closed_33_listener() { return ctx.closeOtherToolsState(); })("actionSelected", function ToolbarComponent_Template_app_other_tools_menu_actionSelected_33_listener($event) { return ctx.handleOtherToolSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "app-textual-construction-dialog", 34);
            i0.ɵɵlistener("buildRequested", function ToolbarComponent_Template_app_textual_construction_dialog_buildRequested_34_listener($event) { return ctx.handleTextualConstructionBuildRequested($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "app-names-panel", 35);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_names_panel_closed_35_listener() { return ctx.closeNameState(); })("replaceModeChanged", function ToolbarComponent_Template_app_names_panel_replaceModeChanged_35_listener($event) { return ctx.handleNamesReplaceModeChanged($event); })("nameSelected", function ToolbarComponent_Template_app_names_panel_nameSelected_35_listener($event) { return ctx.handleNameSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "app-properties-panel", 36);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_properties_panel_closed_36_listener() { return ctx.closePropertiesState(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "app-widget-panel", 36);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_widget_panel_closed_37_listener() { return ctx.closeWidgetState(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "app-macro-panel", 36);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_macro_panel_closed_38_listener() { return ctx.closeMacroState(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "app-calculator-panel", 36);
            i0.ɵɵlistener("closed", function ToolbarComponent_Template_app_calculator_panel_closed_39_listener() { return ctx.closeCalculatorState(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.constructionEnabled)("inactive", !ctx.constructionEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.constructionEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.hideEnabled)("inactive", !ctx.hideEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.hideEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.deleteEnabled)("inactive", !ctx.deleteEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.deleteEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.macroEnabled)("inactive", !ctx.macroEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.macroEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.calcEnabled)("inactive", !ctx.calcEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.calcEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.texEnabled)("inactive", !ctx.texEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.texEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.propertiesEnabled)("inactive", !ctx.propertiesEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.propertiesEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.historyEnabled)("inactive", !ctx.historyEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.historyEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.exportEnabled)("inactive", !ctx.exportEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.exportEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.nameEnabled)("inactive", !ctx.nameEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.nameEnabled);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.gridEnabled)("inactive", !ctx.gridEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.gridEnabled);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.otherToolsEnabled)("inactive", !ctx.otherToolsEnabled);
            i0.ɵɵattribute("aria-pressed", ctx.otherToolsEnabled);
        } }, dependencies: [OtherToolsMenuComponent,
            TextualConstructionDialogComponent,
            NamesPanelComponent,
            PropertiesPanelComponent,
            WidgetPanelComponent,
            MacroPanelComponent,
            CalculatorPanelComponent], styles: [".toolbar[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 10px 12px;\r\n  background: #efefef;\r\n  border-top: 1px solid #d6d6d6;\r\n}\r\n\r\n.toolbar-left[_ngcontent-%COMP%], \r\n.toolbar-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\n.toolbar-left[_ngcontent-%COMP%] {\r\n  justify-content: flex-start;\r\n}\r\n\r\n.toolbar-right[_ngcontent-%COMP%] {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.icon-button[_ngcontent-%COMP%] {\r\n  width: 46px;\r\n  height: 46px;\r\n  padding: 0;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid transparent;\r\n  border-radius: 6px;\r\n  background: transparent;\r\n  cursor: pointer;\r\n}\r\n\r\n.icon-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 28px;\r\n  height: 28px;\r\n  object-fit: contain;\r\n  filter: grayscale(1) brightness(0);\r\n  opacity: 1;\r\n}\r\n\r\n.icon-button.active[_ngcontent-%COMP%] {\r\n  background: #cfcfcf;\r\n  border-color: #a8a8a8;\r\n}\r\n\r\n.icon-button.inactive[_ngcontent-%COMP%] {\r\n  background: transparent;\r\n  border-color: transparent;\r\n}\r\n\r\n.icon-button[_ngcontent-%COMP%]   img[src*=\"OtherTools.png\"][_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n  image-rendering: -webkit-optimize-contrast;\r\n  image-rendering: crisp-edges;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToolbarComponent, [{
        type: Component,
        args: [{ selector: 'app-toolbar', imports: [
                    OtherToolsMenuComponent,
                    TextualConstructionDialogComponent,
                    NamesPanelComponent,
                    PropertiesPanelComponent,
                    WidgetPanelComponent,
                    MacroPanelComponent,
                    CalculatorPanelComponent,
                ], template: "<footer class=\"toolbar\">\r\n  <div class=\"toolbar-left\">\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"constructionEnabled\"\r\n      [class.inactive]=\"!constructionEnabled\"\r\n      (click)=\"toggleConstruction()\"\r\n      [attr.aria-pressed]=\"constructionEnabled\"\r\n      title=\"Construcci\u00F3n\"\r\n    >\r\n      <img src=\"/icons/controls/arrow.png\" alt=\"Construcci\u00F3n\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"hideEnabled\"\r\n      [class.inactive]=\"!hideEnabled\"\r\n      (click)=\"toggleHide()\"\r\n      [attr.aria-pressed]=\"hideEnabled\"\r\n      title=\"Ocultar / mostrar\"\r\n    >\r\n      <img src=\"/icons/controls/hide.png\" alt=\"Ocultar / mostrar\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"deleteEnabled\"\r\n      [class.inactive]=\"!deleteEnabled\"\r\n      (click)=\"toggleDelete()\"\r\n      [attr.aria-pressed]=\"deleteEnabled\"\r\n      title=\"Borrar\"\r\n    >\r\n      <img src=\"/icons/controls/trash.png\" alt=\"Borrar\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"macroEnabled\"\r\n      [class.inactive]=\"!macroEnabled\"\r\n      (click)=\"toggleMacro()\"\r\n      [attr.aria-pressed]=\"macroEnabled\"\r\n      title=\"Macros\"\r\n    >\r\n      <img src=\"/icons/controls/macros.png\" alt=\"Macros\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"calcEnabled\"\r\n      [class.inactive]=\"!calcEnabled\"\r\n      (click)=\"toggleCalc()\"\r\n      [attr.aria-pressed]=\"calcEnabled\"\r\n      title=\"Calculadora\"\r\n    >\r\n      <img src=\"/icons/controls/calc.png\" alt=\"Calculadora\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"texEnabled\"\r\n      [class.inactive]=\"!texEnabled\"\r\n      (click)=\"toggleTex()\"\r\n      [attr.aria-pressed]=\"texEnabled\"\r\n      title=\"Texto\"\r\n    >\r\n      <img src=\"/icons/controls/tex.png\" alt=\"Texto\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"propertiesEnabled\"\r\n      [class.inactive]=\"!propertiesEnabled\"\r\n      (click)=\"toggleProperties()\"\r\n      [attr.aria-pressed]=\"propertiesEnabled\"\r\n      title=\"Propiedades\"\r\n    >\r\n      <img src=\"/icons/controls/properties.png\" alt=\"Propiedades\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"historyEnabled\"\r\n      [class.inactive]=\"!historyEnabled\"\r\n      (click)=\"openHistory()\"\r\n      [attr.aria-pressed]=\"historyEnabled\"\r\n      title=\"Historial\"\r\n    >\r\n      <img src=\"/icons/controls/history.png\" alt=\"Historial\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"exportEnabled\"\r\n      [class.inactive]=\"!exportEnabled\"\r\n      (click)=\"openExport()\"\r\n      [attr.aria-pressed]=\"exportEnabled\"\r\n      title=\"Exportar\"\r\n    >\r\n      <img src=\"/icons/controls/copy.png\" alt=\"Exportar\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"nameEnabled\"\r\n      [class.inactive]=\"!nameEnabled\"\r\n      (click)=\"toggleName()\"\r\n      [attr.aria-pressed]=\"nameEnabled\"\r\n      title=\"Nombres\"\r\n    >\r\n      <img src=\"/icons/controls/name.png\" alt=\"Nombres\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"gridEnabled\"\r\n      [class.inactive]=\"!gridEnabled\"\r\n      (click)=\"toggleGrid()\"\r\n      [attr.aria-pressed]=\"gridEnabled\"\r\n      title=\"Cuadr\u00EDcula\"\r\n    >\r\n      <img src=\"/icons/controls/grid.png\" alt=\"Cuadr\u00EDcula\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      (click)=\"resetZoom()\"\r\n      title=\"Restablecer zoom\"\r\n    >\r\n      <img src=\"/icons/controls/zoom.png\" alt=\"Restablecer zoom\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      [class.active]=\"otherToolsEnabled\"\r\n      [class.inactive]=\"!otherToolsEnabled\"\r\n      (click)=\"toggleOtherTools()\"\r\n      [attr.aria-pressed]=\"otherToolsEnabled\"\r\n      title=\"Otras herramientas\"\r\n    >\r\n      <img src=\"/icons/controls/OtherTools.png\" alt=\"Otras herramientas\" />\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"toolbar-right\">\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      (click)=\"undo()\"\r\n      title=\"Deshacer\"\r\n    >\r\n      <img src=\"/icons/controls/undo.png\" alt=\"Deshacer\" />\r\n    </button>\r\n\r\n    <button\r\n      type=\"button\"\r\n      class=\"icon-button\"\r\n      (click)=\"redo()\"\r\n      title=\"Rehacer\"\r\n    >\r\n      <img src=\"/icons/controls/redo.png\" alt=\"Rehacer\" />\r\n    </button>\r\n  </div>\r\n</footer>\r\n\r\n<app-other-tools-menu\r\n  (closed)=\"closeOtherToolsState()\"\r\n  (actionSelected)=\"handleOtherToolSelected($event)\"\r\n></app-other-tools-menu>\r\n\r\n<app-textual-construction-dialog\r\n  (buildRequested)=\"handleTextualConstructionBuildRequested($event)\"\r\n></app-textual-construction-dialog>\r\n\r\n<app-names-panel\n  (closed)=\"closeNameState()\"\r\n  (replaceModeChanged)=\"handleNamesReplaceModeChanged($event)\"\r\n  (nameSelected)=\"handleNameSelected($event)\"\r\n></app-names-panel>\n\n<app-properties-panel\n  (closed)=\"closePropertiesState()\"\n></app-properties-panel>\n\n<app-widget-panel\n  (closed)=\"closeWidgetState()\"\n></app-widget-panel>\n\n<app-macro-panel\n  (closed)=\"closeMacroState()\"\n></app-macro-panel>\n\n<app-calculator-panel\n  (closed)=\"closeCalculatorState()\"\n></app-calculator-panel>\n", styles: [".toolbar {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 10px 12px;\r\n  background: #efefef;\r\n  border-top: 1px solid #d6d6d6;\r\n}\r\n\r\n.toolbar-left,\r\n.toolbar-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\n.toolbar-left {\r\n  justify-content: flex-start;\r\n}\r\n\r\n.toolbar-right {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.icon-button {\r\n  width: 46px;\r\n  height: 46px;\r\n  padding: 0;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid transparent;\r\n  border-radius: 6px;\r\n  background: transparent;\r\n  cursor: pointer;\r\n}\r\n\r\n.icon-button img {\r\n  width: 28px;\r\n  height: 28px;\r\n  object-fit: contain;\r\n  filter: grayscale(1) brightness(0);\r\n  opacity: 1;\r\n}\r\n\r\n.icon-button.active {\r\n  background: #cfcfcf;\r\n  border-color: #a8a8a8;\r\n}\r\n\r\n.icon-button.inactive {\r\n  background: transparent;\r\n  border-color: transparent;\r\n}\r\n\r\n.icon-button img[src*=\"OtherTools.png\"] {\r\n  width: 24px;\r\n  height: 24px;\r\n  image-rendering: -webkit-optimize-contrast;\r\n  image-rendering: crisp-edges;\r\n}"] }]
    }], () => [{ type: i1.DgpadBridgeService }], { exportRequested: [{
            type: Output
        }], historyRequested: [{
            type: Output
        }], otherToolsMenu: [{
            type: ViewChild,
            args: [OtherToolsMenuComponent]
        }], textualConstructionDialog: [{
            type: ViewChild,
            args: [TextualConstructionDialogComponent]
        }], namesPanel: [{
            type: ViewChild,
            args: [NamesPanelComponent]
        }], propertiesPanel: [{
            type: ViewChild,
            args: [PropertiesPanelComponent]
        }], widgetPanel: [{
            type: ViewChild,
            args: [WidgetPanelComponent]
        }], macroPanel: [{
            type: ViewChild,
            args: [MacroPanelComponent]
        }], calculatorPanel: [{
            type: ViewChild,
            args: [CalculatorPanelComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToolbarComponent, { className: "ToolbarComponent", filePath: "src/app/features/toolbar/toolbar.component.ts", lineNumber: 36 }); })();
