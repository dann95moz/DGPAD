import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

export type HistoryEntry = {
  index: number;
  date: string;
  img: string;
  lock: boolean;
};

@Component({
  selector: 'app-history-dialog',
  imports: [CommonModule],
  templateUrl: './history-dialog.component.html',
  styleUrl: './history-dialog.component.css',
})
export class HistoryDialogComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() refreshRequested = new EventEmitter<void>();
  @Output() saveRequested = new EventEmitter<void>();
  @Output() clearRequested = new EventEmitter<void>();
  @Output() openEntryRequested = new EventEmitter<number>();
  @Output() autosaveChanged = new EventEmitter<number>();

  visible = false;
  entries: HistoryEntry[] = [];
  autosaveMinutes = 0;

  open(entries: HistoryEntry[], autosaveMinutes: number): void {
    this.entries = entries;
    this.autosaveMinutes = autosaveMinutes;
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  saveSnapshot(): void {
    this.saveRequested.emit();
  }

  clearHistory(): void {
    this.clearRequested.emit();
  }

  openEntry(index: number): void {
    this.openEntryRequested.emit(index);
    this.close();
  }

  updateAutosave(value: string): void {
    const minutes = Number(value);

    if (!Number.isNaN(minutes) && minutes >= 0) {
      this.autosaveMinutes = minutes;
      this.autosaveChanged.emit(minutes);
    }
  }

  refresh(): void {
    this.refreshRequested.emit();
  }
}