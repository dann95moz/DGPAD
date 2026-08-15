import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DgpadBridgeService,
  LegacyMacroCatalog,
  LegacyMacroDraft,
  LegacyMacroItem,
  LegacyActiveMacro,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

type MacroGroup = { name: string; items: LegacyMacroItem[] };

@Component({
  selector: 'app-macro-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './macro-panel.component.html',
  styleUrl: './macro-panel.component.css',
})
export class MacroPanelComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  catalog: LegacyMacroCatalog = { plugins: [], tools: [] };
  draft: LegacyMacroDraft | null = null;
  activeMacro: LegacyActiveMacro | null = null;
  macroName = 'Macro sin título';
  readonly expanded = new Set<string>();

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  get pluginGroups(): MacroGroup[] {
    return this.group(this.catalog.plugins);
  }

  open(): void {
    this.visible = true;
    this.refresh();
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  toggleGroup(name: string): void {
    this.expanded.has(name) ? this.expanded.delete(name) : this.expanded.add(name);
  }

  execute(item: LegacyMacroItem): void {
    this.dgpadBridge.startMacro(item.key);
    this.activeMacro = this.dgpadBridge.getActiveMacro();
  }

  saveDraft(): void {
    const name = this.macroName.trim();
    if (!name) return;
    this.dgpadBridge.saveMacroDraft(name);
    this.macroName = 'Macro sin título';
    this.refresh();
  }

  displayName(item: LegacyMacroItem): string {
    const parts = item.name.split('/');
    return parts[parts.length - 1];
  }

  requirementsMessage(active: LegacyActiveMacro): string {
    const types = active.types.map((type) => this.typeName(type));
    const total = types.length;

    if (total === 0) return 'Esta macro no necesita objetos iniciales.';

    const allSame = types.every((type) => type === types[0]);
    let message: string;

    if (allSame) {
      message = `Se ${total === 1 ? 'necesita' : 'necesitan'} ${this.cardinal(total)} ` +
        `${total === 1 ? types[0] : this.pluralType(types[0])}`;
    } else {
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

  selectionMessage(prompt: string): string {
    const match = /^(\d+)\/(\d+)\s*-\s*(.+?)\s*\??$/.exec(prompt.trim());
    if (!match) return prompt || 'Preparando macro…';
    return `Selecciona ahora el ${this.ordinal(Number(match[1]))}.`;
  }

  @HostListener('window:message', ['$event'])
  handleLegacyMessage(event: MessageEvent): void {
    if (this.visible && event.origin === window.location.origin) {
      if (
        event.data?.type === 'dgpad-macro-catalog' ||
        event.data?.type === 'dgpad-macro-draft' ||
        event.data?.type === 'dgpad-macro-progress'
      ) {
        this.refresh();
      }
    }
  }

  private refresh(): void {
    this.catalog = this.dgpadBridge.getMacroCatalog();
    this.draft = this.dgpadBridge.getMacroDraft();
    this.activeMacro = this.dgpadBridge.getActiveMacro();
  }

  private group(items: LegacyMacroItem[]): MacroGroup[] {
    const groups = new Map<string, LegacyMacroItem[]>();
    for (const item of items) {
      const root = item.name.includes('/') ? item.name.split('/')[0] : 'Otras';
      groups.set(root, [...(groups.get(root) ?? []), item]);
    }
    return [...groups.entries()].map(([name, groupItems]) => ({ name, items: groupItems }));
  }

  private cardinal(value: number): string {
    const words = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
    return words[value] ?? String(value);
  }

  private ordinal(value: number): string {
    const words = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
    return words[value] ?? `número ${value}`;
  }

  private articleFor(type: string): string {
    const feminineTypes = ['recta', 'semirrecta', 'circunferencia', 'expresión', 'lista'];
    return feminineTypes.some((candidate) => type.includes(candidate)) ? 'una' : 'un';
  }

  private typeName(type: string): string {
    const names: Record<string, string> = {
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

  private pluralType(type: string): string {
    const plurals: Record<string, string> = {
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
}
