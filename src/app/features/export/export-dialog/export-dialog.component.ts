import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type ExportFormat =
  | 'text'
  | 'html_js'
  | 'html'
  | 'responsive'
  | 'svg'
  | 'png';

export type ExportOptions = {
  format: ExportFormat;
  fixWidgets: boolean;
  fixDgScripts: boolean;
  hideControlPanel: boolean;
  disableZoom: boolean;
};

@Component({
  selector: 'app-export-dialog',
  imports: [FormsModule],
  templateUrl: './export-dialog.component.html',
  styleUrl: './export-dialog.component.css',
})
export class ExportDialogComponent {
  @Output() exportConfirmed = new EventEmitter<ExportOptions>();
  @Output() closed = new EventEmitter<void>();

  visible = false;

  format: ExportFormat = 'svg';
  fixWidgets = false;
  fixDgScripts = false;
  hideControlPanel = true;
  disableZoom = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  export(): void {
    this.exportConfirmed.emit({
      format: this.format,
      fixWidgets: this.fixWidgets,
      fixDgScripts: this.fixDgScripts,
      hideControlPanel: this.hideControlPanel,
      disableZoom: this.disableZoom,
    });

    this.close();
  }
}