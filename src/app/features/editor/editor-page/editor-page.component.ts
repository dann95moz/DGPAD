import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import {
  ExportDialogComponent,
  ExportOptions,
} from '../../export/export-dialog/export-dialog.component';
import {
  HistoryDialogComponent,
  HistoryEntry,
} from '../../history/history-dialog/history-dialog.component';
import {
  DgpadBridgeService,
  LegacyHistoryEntry,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

@Component({
  selector: 'app-editor-page',
  imports: [ToolbarComponent, ExportDialogComponent, HistoryDialogComponent],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.css',
})
export class EditorPageComponent implements AfterViewInit {
  @ViewChild(ExportDialogComponent)
  private exportDialog?: ExportDialogComponent;

  @ViewChild(HistoryDialogComponent)
  private historyDialog?: HistoryDialogComponent;

  @ViewChild(ToolbarComponent)
  private toolbar?: ToolbarComponent;

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  ngAfterViewInit(): void {
    this.mountLegacyDgpad();
  }

  openExportDialog(): void {
    this.exportDialog?.open();
  }

  handleExportDialogClosed(): void {
    this.toolbar?.closeExportState();
  }

  openHistoryDialog(): void {
    this.refreshHistoryDialog(true);
  }

  handleHistoryDialogClosed(): void {
    this.toolbar?.closeHistoryState();
  }

  handleHistoryRefreshRequested(): void {
    this.refreshHistoryDialog(true);
  }

  handleHistorySaveRequested(): void {
    this.dgpadBridge.saveHistorySnapshot();
    this.refreshHistoryDialog(true);
  }

  handleHistoryClearRequested(): void {
    this.dgpadBridge.clearUnlockedHistory();
    this.refreshHistoryDialog(true);
  }

  handleHistoryOpenEntryRequested(index: number): void {
    this.dgpadBridge.openHistoryEntry(index);
  }

  handleAutosaveChanged(minutes: number): void {
    this.dgpadBridge.setAutosaveMinutes(minutes);
    this.refreshHistoryDialog(true);
  }

  handleExport(options: ExportOptions): void {
    const exportOptions = {
      fixWidgets: options.fixWidgets,
      fixDgScripts: options.fixDgScripts,
      hideControlPanel: options.hideControlPanel,
      disableZoom: options.disableZoom,
    };

    if (options.format === 'svg') {
      this.dgpadBridge.exportSvg();
      return;
    }

    if (options.format === 'png') {
      this.dgpadBridge.exportPng();
      return;
    }

    if (options.format === 'text') {
      this.dgpadBridge.exportText(exportOptions);
      return;
    }

    if (options.format === 'html_js') {
      this.dgpadBridge.exportHtmlJs(exportOptions);
      return;
    }

    if (options.format === 'html') {
      this.dgpadBridge.exportHtml(exportOptions);
      return;
    }

    if (options.format === 'responsive') {
      this.dgpadBridge.exportResponsive(exportOptions);
      return;
    }

    console.log('Formato aún no conectado:', options.format, options);
  }

  private refreshHistoryDialog(open = false): void {
    const entries = this.mapHistoryEntries(this.dgpadBridge.getHistoryEntries());
    const autosaveMinutes = this.dgpadBridge.getAutosaveMinutes();

    if (open) {
      this.historyDialog?.open(entries, autosaveMinutes);
      return;
    }

    this.historyDialog?.open(entries, autosaveMinutes);
  }

  private mapHistoryEntries(entries: LegacyHistoryEntry[]): HistoryEntry[] {
    return entries.map((entry) => ({
      index: entry.index,
      date: entry.date,
      img: entry.img,
      lock: entry.lock,
    }));
  }

  private mountLegacyDgpad(): void {
    const stage = document.getElementById('dgpad-stage');

    if (!stage) {
      console.error('No se encontró dgpad-stage');
      return;
    }

    stage.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.id = 'dgpad-legacy-frame';
    iframe.src = `${window.location.origin}/dgpad-legacy-host.html`;
    iframe.title = 'DGPad legacy';
    iframe.frameBorder = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.display = 'block';

    iframe.onload = () => {
      const bridge = (iframe.contentWindow as Window & {
        dgpadBridge?: { setMode?: (mode: number) => void };
      }).dgpadBridge;

      bridge?.setMode?.(1);
    };

    stage.appendChild(iframe);
  }
}