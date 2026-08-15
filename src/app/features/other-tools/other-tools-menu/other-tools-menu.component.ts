import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { APP_CONFIG } from '../../../app-config/app-config';

export type OtherToolAction =
  | 'construction_protocol'
  | 'textual_construction'
  | 'duplicate_figure'
  | 'open_file'
  | 'save_file'
  | 'blockly_button'
  | 'expression'
  | 'expression_points'
  | 'expression_segments'
  | 'board_points'
  | 'integer_cursor'
  | 'continuous_cursor'
  | 'edit_widget';

type OtherToolItem = {
  id: OtherToolAction;
  label: string;
};

@Component({
  selector: 'app-other-tools-menu',
  imports: [CommonModule],
  templateUrl: './other-tools-menu.component.html',
  styleUrl: './other-tools-menu.component.css',
})
export class OtherToolsMenuComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<OtherToolAction>();

  visible = false;
  readonly version = APP_CONFIG.version;

  readonly baseItems: OtherToolItem[] = [
    { id: 'construction_protocol', label: 'Protocolo de construcción' },
    { id: 'textual_construction', label: 'Construcción textual' },
    { id: 'duplicate_figure', label: 'Duplicar figura' },
    { id: 'open_file', label: 'Abrir archivo' },
    { id: 'save_file', label: 'Guardar archivo' },
  ];

  readonly teacherItems: OtherToolItem[] = [
    { id: 'blockly_button', label: 'Botón Blockly' },
    { id: 'expression', label: 'Expresión' },
    { id: 'expression_points', label: 'Expresión: lista de puntos' },
    { id: 'expression_segments', label: 'Expresión: lista de segmentos' },
    { id: 'board_points', label: 'Tablero de puntos' },
    { id: 'integer_cursor', label: 'Cursor entero' },
    { id: 'continuous_cursor', label: 'Cursor continuo' },
    { id: 'edit_widget', label: 'Widget de edición' },
  ];

  get items(): OtherToolItem[] {
    return this.version === 'profesores'
      ? [...this.baseItems, ...this.teacherItems]
      : this.baseItems;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  select(action: OtherToolAction): void {
    this.actionSelected.emit(action);
    this.close();
  }
}