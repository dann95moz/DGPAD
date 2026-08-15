import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorPanelComponent } from './calculator-panel.component';
import { DgpadBridgeService, LegacyCalculatorState } from '../../../core/dgpad-bridge/dgpad-bridge.service';

describe('CalculatorPanelComponent', () => {
  let component: CalculatorPanelComponent;
  let fixture: ComponentFixture<CalculatorPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  const initialCalcState: LegacyCalculatorState = {
    editing: false,
    e1: '2+3',
    e1Label: 'e1 =',
    e2: '',
    e2Label: 'e2 =',
    min: '0',
    max: '10',
    showE2: false,
    showMin: false,
    showMax: false,
    degrees: true,
  };

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', [
      'getCalculatorState',
      'beginCalculatorExpression',
      'updateCalculatorField',
      'setCalculatorDegrees',
      'validateCalculator',
      'cancelCalculator',
      'convertExpressionToPoint',
      'convertExpressionToList',
      'convertExpressionToFunction',
    ]);

    mockBridge.getCalculatorState.and.callFake(() => ({ ...initialCalcState }));

    await TestBed.configureTestingModule({
      imports: [CalculatorPanelComponent],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calculator component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and refresh state', () => {
    component.open();
    expect(component.visible).toBeTrue();
    expect(mockBridge.getCalculatorState).toHaveBeenCalled();
    expect(component.state).toEqual(initialCalcState);
  });

  it('should close and emit closed event', () => {
    spyOn(component.closed, 'emit');
    component.open();
    component.close();
    expect(component.visible).toBeFalse();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should update field value', () => {
    component.open();
    component.update('e1', '4*5');
    expect(mockBridge.updateCalculatorField).toHaveBeenCalledWith('e1', '4*5');
  });

  it('should append value on key press', () => {
    component.open();
    component.activeField = 'e1';
    component.press('+1');
    expect(mockBridge.updateCalculatorField).toHaveBeenCalledWith('e1', '2+3+1');
  });

  it('should delete last character on deleteLast', () => {
    component.open();
    component.activeField = 'e1';
    component.deleteLast();
    expect(mockBridge.updateCalculatorField).toHaveBeenCalledWith('e1', '2+');
  });

  it('should clear field on clearField', () => {
    component.open();
    component.activeField = 'e1';
    component.clearField();
    expect(mockBridge.updateCalculatorField).toHaveBeenCalledWith('e1', '');
  });

  it('should change degrees mode', () => {
    component.open();
    component.setDegrees(false);
    expect(mockBridge.setCalculatorDegrees).toHaveBeenCalledWith(false);
  });

  it('should validate calculator', () => {
    component.open();
    component.validate();
    expect(mockBridge.validateCalculator).toHaveBeenCalled();
  });

  it('should cancel calculator', () => {
    component.open();
    component.cancel();
    expect(mockBridge.cancelCalculator).toHaveBeenCalled();
  });

  describe('Special Conversion Buttons', () => {
    beforeEach(() => {
      component.open();
      mockBridge.convertExpressionToPoint.and.returnValue('P1');
      mockBridge.convertExpressionToList.and.returnValue('L1');
      mockBridge.convertExpressionToFunction.and.returnValue('f1');
    });

    it('should convert active expression to point', () => {
      const result = component.convertToPoint();
      expect(mockBridge.convertExpressionToPoint).toHaveBeenCalledWith('2+3');
      expect(result).toBe('P1');
    });

    it('should convert active expression to list', () => {
      const result = component.convertToList();
      expect(mockBridge.convertExpressionToList).toHaveBeenCalledWith('2+3');
      expect(result).toBe('L1');
    });

    it('should convert active expression to function', () => {
      const result = component.convertToFunction();
      expect(mockBridge.convertExpressionToFunction).toHaveBeenCalledWith('2+3');
      expect(result).toBe('f1');
    });

    it('should return null when expression is empty', () => {
      component.state!.e1 = '';
      const result = component.convertToPoint();
      expect(result).toBeNull();
      expect(mockBridge.convertExpressionToPoint).not.toHaveBeenCalled();
    });
  });

  it('should handle legacy window messages', () => {
    component.open();
    const event = new MessageEvent('message', {
      origin: window.location.origin,
      data: { type: 'dgpad-calculator-state' },
    });

    component.handleLegacyMessage(event);
    expect(mockBridge.getCalculatorState).toHaveBeenCalled();
  });
});
