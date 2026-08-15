import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  DgpadBridgeService,
  DgpadMode,
} from '../../core/dgpad-bridge/dgpad-bridge.service';
import {
  OtherToolAction,
  OtherToolsMenuComponent,
} from '../other-tools/other-tools-menu/other-tools-menu.component';
import { TextualConstructionDialogComponent } from '../textual-construction/textual-construction-dialog/textual-construction-dialog.component';
import { NamesPanelComponent } from '../names/names-panel/names-panel.component';
import { PropertiesPanelComponent } from '../properties/properties-panel/properties-panel.component';
import { WidgetPanelComponent } from '../widgets/widget-panel/widget-panel.component';
import { MacroPanelComponent } from '../macros/macro-panel/macro-panel.component';
import { CalculatorPanelComponent } from '../calculator/calculator-panel/calculator-panel.component';
import { BoardPointsPanelComponent } from '../board-points/board-points-panel/board-points-panel.component';

type ParsedInstruction =
  | { kind: 'any_point'; name: string }
  | { kind: 'line'; name: string; a: string; b: string }
  | { kind: 'segment'; name: string; a: string; b: string }
  | { kind: 'midpoint'; name: string; a: string; b: string };

@Component({
  selector: 'app-toolbar',
  imports: [
    OtherToolsMenuComponent,
    TextualConstructionDialogComponent,
    NamesPanelComponent,
    PropertiesPanelComponent,
    WidgetPanelComponent,
    MacroPanelComponent,
    CalculatorPanelComponent,
    BoardPointsPanelComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Output() exportRequested = new EventEmitter<void>();
  @Output() historyRequested = new EventEmitter<void>();

  @ViewChild(OtherToolsMenuComponent)
  private otherToolsMenu?: OtherToolsMenuComponent;

  @ViewChild(TextualConstructionDialogComponent)
  private textualConstructionDialog?: TextualConstructionDialogComponent;

  @ViewChild(NamesPanelComponent)
  private namesPanel?: NamesPanelComponent;

  @ViewChild(PropertiesPanelComponent)
  private propertiesPanel?: PropertiesPanelComponent;

  @ViewChild(WidgetPanelComponent)
  private widgetPanel?: WidgetPanelComponent;

  @ViewChild(MacroPanelComponent)
  private macroPanel?: MacroPanelComponent;

  @ViewChild(CalculatorPanelComponent)
  private calculatorPanel?: CalculatorPanelComponent;

  @ViewChild(BoardPointsPanelComponent)
  private boardPointsPanel?: BoardPointsPanelComponent;

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
  boardPointsEnabled = false;

  namesReplaceMode = false;
  currentSuggestedName = 'P';

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  toggleConstruction(): void {
    this.disableAllModes();
    this.closeFloatingPanels();
    this.constructionEnabled = !this.constructionEnabled;

    const mode: DgpadMode = this.constructionEnabled ? 'build' : 'move';
    this.dgpadBridge.setMode(mode);
  }

  toggleHide(): void {
    this.disableAllModes();
    this.closeFloatingPanels();
    this.hideEnabled = true;
    this.constructionEnabled = false;
    this.dgpadBridge.setMode('hide');
  }

  toggleDelete(): void {
    this.disableAllModes();
    this.closeFloatingPanels();
    this.deleteEnabled = true;
    this.constructionEnabled = false;
    this.dgpadBridge.setMode('delete');
  }

  toggleMacro(): void {
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

  closeMacroState(): void {
    this.macroEnabled = false;
    this.dgpadBridge.setMode('move');
  }

  toggleCalc(): void {
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

  closeCalculatorState(): void {
    this.calcEnabled = false;
    this.dgpadBridge.setMode('move');
  }

  toggleTex(): void {
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

  closeWidgetState(): void {
    this.texEnabled = false;
    this.dgpadBridge.setMode('move');
  }

  toggleProperties(): void {
    const next = !this.propertiesEnabled;

    this.disableAllModes();
    this.closeFloatingPanels();
    this.propertiesEnabled = next;
    this.constructionEnabled = false;

    if (next) {
      this.dgpadBridge.setMode('properties');
      this.propertiesPanel?.open();
      return;
    }

    this.dgpadBridge.closeProperties();
    this.dgpadBridge.setMode('move');
  }

  closePropertiesState(): void {
    this.propertiesEnabled = false;
    this.dgpadBridge.setMode('move');
  }

  openHistory(): void {
    this.disableAllModes();
    this.closeFloatingPanels();
    this.historyEnabled = true;
    this.constructionEnabled = false;
    this.dgpadBridge.setMode('move');
    this.historyRequested.emit();
  }

  closeHistoryState(): void {
    this.historyEnabled = false;
  }

  openExport(): void {
    this.disableAllModes();
    this.closeFloatingPanels();
    this.exportEnabled = true;
    this.constructionEnabled = false;
    this.dgpadBridge.setMode('move');
    this.exportRequested.emit();
  }

  closeExportState(): void {
    this.exportEnabled = false;
  }

  toggleName(): void {
    const next = !this.nameEnabled;

    this.disableAllModes();
    this.dgpadBridge.closeProperties();

    this.nameEnabled = next;
    this.constructionEnabled = false;
    this.dgpadBridge.setMode('move');

    if (next) {
      const usedNames = this.dgpadBridge.getUsedNames();
      this.namesPanel?.open(usedNames, this.namesReplaceMode);
      return;
    }

    this.namesPanel?.close();
  }

  closeNameState(): void {
    this.nameEnabled = false;
  }

  handleNamesReplaceModeChanged(value: boolean): void {
    this.namesReplaceMode = value;
  }

  handleNameSelected(name: string): void {
    this.currentSuggestedName = name;
  }

  toggleGrid(): void {
    this.gridEnabled = this.dgpadBridge.toggleGrid();
  }

  resetZoom(): void {
    this.dgpadBridge.resetZoom();
  }

  toggleOtherTools(): void {
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

  closeOtherToolsState(): void {
    this.otherToolsEnabled = false;
  }

  undo(): void {
    this.dgpadBridge.undo();
  }

  redo(): void {
    this.dgpadBridge.redo();
  }

  handleOtherToolSelected(action: OtherToolAction): void {
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
        this.boardPointsPanel?.open();
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

  closeBoardPointsState(): void {
    this.boardPointsEnabled = false;
  }

  handleTextualConstructionBuildRequested(text: string): void {
    try {
      const instructions = this.parseTextualConstruction(text);
      this.dgpadBridge.clearConstruction();

      for (const instruction of instructions) {
        this.executeInstruction(instruction);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error desconocido en construcción textual';

      alert(message);
    }
  }

  private parseTextualConstruction(text: string): ParsedInstruction[] {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const instructions: ParsedInstruction[] = [];
    const knownNames = new Set<string>();

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

      const lineMatch =
        /^recta\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])([A-Za-zÁÉÍÓÚáéíóúÑñ])$/i.exec(predicate);

      if (lineMatch) {
        const [, a, b] = lineMatch;

        if (!knownNames.has(a) || !knownNames.has(b)) {
          throw new Error(`Línea ${lineNumber}: la recta requiere puntos ya definidos`);
        }

        instructions.push({ kind: 'line', name, a, b });
        knownNames.add(name);
        continue;
      }

      const segmentMatch =
        /^segmento\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])([A-Za-zÁÉÍÓÚáéíóúÑñ])$/i.exec(predicate);

      if (segmentMatch) {
        const [, a, b] = segmentMatch;

        if (!knownNames.has(a) || !knownNames.has(b)) {
          throw new Error(`Línea ${lineNumber}: el segmento requiere puntos ya definidos`);
        }

        instructions.push({ kind: 'segment', name, a, b });
        knownNames.add(name);
        continue;
      }

      const midpointMatch =
        /^punto\s+medio\s+de\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])\s+y\s+([A-Za-zÁÉÍÓÚáéíóúÑñ])$/i.exec(predicate);

      if (midpointMatch) {
        const [, a, b] = midpointMatch;

        if (!knownNames.has(a) || !knownNames.has(b)) {
          throw new Error(`Línea ${lineNumber}: el punto medio requiere puntos ya definidos`);
        }

        instructions.push({ kind: 'midpoint', name, a, b });
        knownNames.add(name);
        continue;
      }

      throw new Error(`Línea ${lineNumber}: no entiendo "${line}"`);
    }

    return instructions;
  }

  private executeInstruction(instruction: ParsedInstruction): void {
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
      case 'midpoint':
        this.dgpadBridge.createMidPoint(instruction.name, instruction.a, instruction.b);
        return;
    }
  }

  private disableAllModes(): void {
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
    this.boardPointsEnabled = false;
  }

  private closeFloatingPanels(): void {
    this.dgpadBridge.closeProperties();

    this.namesPanel?.close();
    this.otherToolsMenu?.close();
    this.propertiesPanel?.close();
    this.widgetPanel?.close();
    this.macroPanel?.close();
    this.calculatorPanel?.close();
    this.boardPointsPanel?.close();
  }
}
