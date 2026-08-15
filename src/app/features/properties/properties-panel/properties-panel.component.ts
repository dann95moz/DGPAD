import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DgpadBridgeService,
  EditableProperty,
  EditableGlobalProperty,
  EditableAxisProperty,
  LegacyAxisPropertyState,
  LegacyGlobalPropertyState,
  LegacyPropertyState,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

@Component({
  selector: 'app-properties-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.css',
})
export class PropertiesPanelComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  state: LegacyPropertyState | null = null;
  globalState: LegacyGlobalPropertyState | null = null;
  axisState: LegacyAxisPropertyState | null = null;
  axisSelected = false;
  applyAll = false;

  readonly precisionOptions = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  readonly incrementOptions = [0, 0.001, 0.01, 0.1, 0.5, 1, 2, 5, 10, 100, 1000];
  readonly backgroundColors = [
    '#0000b2',
    '#007c7c',
    '#006633',
    '#966400',
    '#770012',
    '#cc66cc',
    '#ffffff',
  ];

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  open(): void {
    this.visible = true;
    this.applyAll = false;
    this.state = this.dgpadBridge.getPropertyState();
    this.globalState = this.dgpadBridge.getGlobalPropertyState();
    this.axisSelected = !!this.state?.code.startsWith('axis');
    this.axisState = this.axisSelected
      ? this.dgpadBridge.getAxisPropertyState()
      : null;
  }

  close(): void {
    this.visible = false;
    this.state = null;
    this.globalState = null;
    this.axisState = null;
    this.axisSelected = false;
    this.applyAll = false;
    this.closed.emit();
  }

  update(property: EditableProperty, value: string | number | boolean): void {
    this.dgpadBridge.updateProperty(property, value, this.applyAll);
    this.state = this.dgpadBridge.getPropertyState();
  }

  updateGlobal(property: EditableGlobalProperty, value: string | boolean): void {
    this.dgpadBridge.updateGlobalProperty(property, value);
    this.globalState = this.dgpadBridge.getGlobalPropertyState();
  }

  updateAxis(
    property: EditableAxisProperty,
    value: string | number | boolean,
  ): void {
    this.dgpadBridge.updateAxisProperty(property, value);
    this.axisState = this.dgpadBridge.getAxisPropertyState();
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

  familyLabel(family: string): string {
    const labels: Record<string, string> = {
      point: 'Puntos',
      angle: 'Ángulos',
      line: 'Rectas',
      circle: 'Círculos',
    };

    return labels[family] ?? family;
  }

  @HostListener('window:message', ['$event'])
  handleLegacyMessage(event: MessageEvent): void {
    if (
      this.visible &&
      event.origin === window.location.origin &&
      event.data?.type === 'dgpad-property-selection'
    ) {
      this.applyAll = false;
      this.state = this.dgpadBridge.getPropertyState();
      this.axisSelected = !!this.state?.code.startsWith('axis');
      this.axisState = this.axisSelected
        ? this.dgpadBridge.getAxisPropertyState()
        : null;
    }
  }
}
