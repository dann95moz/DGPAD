import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import {
  DgpadBridgeService,
  EditableWidgetProperty,
  LegacyWidgetState,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

@Component({
  selector: 'app-widget-panel',
  imports: [CommonModule],
  templateUrl: './widget-panel.component.html',
  styleUrl: './widget-panel.component.css',
})
export class WidgetPanelComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  hasSelection = false;
  state: LegacyWidgetState = this.defaultState();

  readonly colors = ['#0000b2', '#007c7c', '#006633', '#966400', '#770012', '#cc66cc', '#ffffff'];

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  open(): void {
    this.visible = true;
    this.loadSelection();
  }

  close(): void {
    this.visible = false;
    this.hasSelection = false;
    this.closed.emit();
  }

  update(
    property: EditableWidgetProperty,
    value: string | number | boolean,
  ): void {
    this.state = { ...this.state, [property]: value };

    if (this.hasSelection) {
      this.dgpadBridge.updateWidgetProperty(property, value);
      this.loadSelection();
    }
  }

  createWidget(): void {
    this.dgpadBridge.createWidget(this.state);
  }

  numberValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  checkedValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  textValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  @HostListener('window:message', ['$event'])
  handleLegacyMessage(event: MessageEvent): void {
    if (
      this.visible &&
      event.origin === window.location.origin &&
      event.data?.type === 'dgpad-widget-selection'
    ) {
      this.loadSelection();
    }
  }

  private loadSelection(): void {
    const selected = this.dgpadBridge.getWidgetState();
    this.hasSelection = !!selected;

    if (selected) {
      this.state = selected;
    }
  }

  private defaultState(): LegacyWidgetState {
    return {
      color: '#3b4f73',
      opacity: 0.18,
      borderSize: 3,
      borderRadius: 15,
      precision: 4,
      fontSize: 3,
      fixPosition: false,
      fixSize: false,
    };
  }
}
