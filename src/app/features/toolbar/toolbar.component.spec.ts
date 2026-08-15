import { Component } from '@angular/core';
import {
  DgpadBridgeService,
  DgpadMode,
} from '../../core/dgpad-bridge/dgpad-bridge.service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructionEnabled = true;

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  toggleConstruction(): void {
    this.constructionEnabled = !this.constructionEnabled;

    const mode: DgpadMode = this.constructionEnabled ? 'build' : 'move';
    this.dgpadBridge.setMode(mode);
  }

  exportSvg(): void {
    this.dgpadBridge.exportSvg();
  }

  deleteAll(): void {
    this.dgpadBridge.deleteAll();
  }
}