import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorField,
  DgpadBridgeService,
  LegacyCalculatorState,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

type CalcKey = { label: string; value: string };

@Component({
  selector: 'app-calculator-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator-panel.component.html',
  styleUrl: './calculator-panel.component.css',
})
export class CalculatorPanelComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  state: LegacyCalculatorState | null = null;
  activeField: CalculatorField = 'e1';

  readonly functionKeys: CalcKey[] = [
    { label: '?', value: '?' }, { label: ':', value: ':' }, { label: '=', value: '=' },
    { label: '<', value: '<' }, { label: '>', value: '>' }, { label: '( )', value: '()' },
    { label: '[ ]', value: '[]' }, { label: ';', value: ';' }, { label: ',', value: ',' },
    { label: 'i', value: 'i' }, { label: 'cos', value: 'cos()' }, { label: 'sin', value: 'sin()' },
    { label: 'tan', value: 'tan()' }, { label: 'exp', value: 'exp()' }, { label: 'round', value: 'round()' },
    { label: 'mod', value: 'mod()' }, { label: 'x()', value: 'x()' }, { label: 'acos', value: 'acos()' },
    { label: 'asin', value: 'asin()' }, { label: 'atan', value: 'atan()' }, { label: 'log', value: 'log()' },
    { label: 'floor', value: 'floor()' }, { label: 'arg', value: 'arg()' }, { label: 'y()', value: 'y()' },
    { label: 'sqrt', value: 'sqrt()' }, { label: 'abs', value: 'abs()' }, { label: 'max', value: 'max()' },
    { label: 'min', value: 'min()' }, { label: 'random', value: 'random()' }, { label: 'conj', value: 'conj()' },
  ];

  readonly numberKeys = ['d', 'x', '7', '8', '9', '+', 'π', 'y', '4', '5', '6', '-', 'z', '1', '2', '3', '*', 't', '0', '.', '^', '/'];

  constructor(private readonly dgpadBridge: DgpadBridgeService) {}

  open(): void {
    this.visible = true;
    this.refresh();
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  focus(field: CalculatorField): void {
    this.activeField = field;
    if (!this.state?.editing) {
      this.dgpadBridge.beginCalculatorExpression();
      this.refresh();
    }
  }

  update(field: CalculatorField, value: string): void {
    if (!this.state?.editing) this.dgpadBridge.beginCalculatorExpression();
    this.dgpadBridge.updateCalculatorField(field, value);
    this.refresh();
  }

  press(value: string): void {
    const current = this.state?.[this.activeField] ?? '';
    this.update(this.activeField, current + value);
  }

  deleteLast(): void {
    const current = this.state?.[this.activeField] ?? '';
    this.update(this.activeField, current.slice(0, -1));
  }

  clearField(): void {
    this.update(this.activeField, '');
  }

  setDegrees(value: boolean): void {
    this.dgpadBridge.setCalculatorDegrees(value);
    this.refresh();
  }

  validate(): void {
    this.dgpadBridge.validateCalculator();
    this.refresh();
  }

  cancel(): void {
    this.dgpadBridge.cancelCalculator();
    this.refresh();
  }

  @HostListener('window:message', ['$event'])
  handleLegacyMessage(event: MessageEvent): void {
    if (
      this.visible &&
      event.origin === window.location.origin &&
      event.data?.type === 'dgpad-calculator-state'
    ) {
      this.refresh();
    }
  }

  private refresh(): void {
    this.state = this.dgpadBridge.getCalculatorState();
  }
}
