import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textual-construction-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './textual-construction-dialog.component.html',
  styleUrl: './textual-construction-dialog.component.css',
})
export class TextualConstructionDialogComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() buildRequested = new EventEmitter<string>();

  visible = false;
  text = '';

  readonly placeholder = [
    'A: Punto cualquiera',
    'B: Punto cualquiera',
    'r: Recta A B',
    'M: Punto medio de A y B',
  ].join('\n');

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  build(): void {
    const value = this.text.trim();

    if (!value) {
      return;
    }

    this.buildRequested.emit(value);
    this.close();
  }

  clear(): void {
    this.text = '';
  }
}