import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

type NamesTabId =
  | 'latin-upper'
  | 'latin-lower'
  | 'greek-upper'
  | 'greek-lower';

type NamesTab = {
  id: NamesTabId;
  label: string;
  rows: string[][];
};

@Component({
  selector: 'app-names-panel',
  imports: [CommonModule],
  templateUrl: './names-panel.component.html',
  styleUrl: './names-panel.component.css',
})
export class NamesPanelComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() replaceModeChanged = new EventEmitter<boolean>();
  @Output() nameSelected = new EventEmitter<string>();

  visible = false;
  replaceMode = false;

  usedNames = new Set<string>();

  readonly modifiers = ['', "'", "''", '₀'];
  currentTabIndex = 0;
  currentModifierIndex = 0;
  currentKeyIndex = -1;

  readonly tabs: NamesTab[] = [
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

  open(usedNames: string[] = [], replaceMode = false): void {
    this.usedNames = new Set(usedNames);
    this.replaceMode = replaceMode;
    this.visible = true;
    this.refreshKeyboard();
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  setReplaceMode(value: boolean): void {
    this.replaceMode = value;
    this.replaceModeChanged.emit(value);
  }

  selectTab(index: number): void {
    if (index === this.currentTabIndex) {
      return;
    }

    this.currentTabIndex = index;
    this.currentModifierIndex = 0;
    this.refreshKeyboard();
  }

  selectModifier(index: number): void {
    this.currentModifierIndex = index;
    this.refreshKeyboard();
  }

  selectKey(index: number): void {
    if (!this.isKeyAvailable(index)) {
      return;
    }

    this.currentKeyIndex = index;
    this.emitCurrentName();
  }

  isKeyAvailable(index: number): boolean {
    const name = this.getNameForIndex(index);
    return !this.usedNames.has(name);
  }

  getCurrentName(): string {
    if (this.currentKeyIndex < 0) {
      return 'P';
    }

    return this.getNameForIndex(this.currentKeyIndex);
  }

  getFlatKeys(): string[] {
    return this.tabs[this.currentTabIndex].rows.flat();
  }

  getDisplayedModifierBase(): string {
    const keys = this.getFlatKeys();
    return keys.length > 0 ? keys[0] : 'A';
  }

  isSelectedKey(index: number): boolean {
    return this.currentKeyIndex === index;
  }

  refreshKeyboard(): void {
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

  private getNameForIndex(index: number): string {
    const key = this.getFlatKeys()[index] ?? 'P';
    const modifier = this.modifiers[this.currentModifierIndex] ?? '';
    return `${key}${modifier}`;
  }

  private emitCurrentName(): void {
    this.nameSelected.emit(this.getCurrentName());
  }
}
