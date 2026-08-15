import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesPanelComponent } from './properties-panel.component';
import {
  DgpadBridgeService,
  LegacyAxisPropertyState,
  LegacyGlobalPropertyState,
  LegacyPropertyState,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

describe('PropertiesPanelComponent', () => {
  let component: PropertiesPanelComponent;
  let fixture: ComponentFixture<PropertiesPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  const mockPropertyState: LegacyPropertyState = {
    name: 'A',
    code: 'point_1',
    family: 'point',
    showName: true,
    color: '#ff0000',
    opacity: 1,
    size: 5,
    layer: 0,
    fontSize: 14,
    precision: 2,
    increment: 0.1,
    shape: 0,
    dash: false,
    noMouse: false,
    track: false,
    angle360: false,
    supportsExclusive: false,
    exclusive: false,
  };

  const mockGlobalState: LegacyGlobalPropertyState = {
    backgroundColor: '#ffffff',
    presentationMode: false,
    magnifier: false,
    animation: false,
    degrees: true,
  };

  const mockAxisState: LegacyAxisPropertyState = {
    color: '#000000',
    fontSize: 12,
    axisWidth: 1,
    gridWidth: 1,
    showGrid: true,
    showOx: true,
    showOy: true,
    lockOx: false,
    lockOy: false,
    onlyPositive: false,
    centerZoom: false,
  };

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', [
      'getPropertyState',
      'getGlobalPropertyState',
      'getAxisPropertyState',
      'updateProperty',
      'updateGlobalProperty',
      'updateAxisProperty',
      'closeProperties',
    ]);

    mockBridge.getPropertyState.and.callFake(() => ({ ...mockPropertyState }));
    mockBridge.getGlobalPropertyState.and.callFake(() => ({ ...mockGlobalState }));
    mockBridge.getAxisPropertyState.and.callFake(() => ({ ...mockAxisState }));

    await TestBed.configureTestingModule({
      imports: [PropertiesPanelComponent],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and fetch state from bridge', () => {
    component.open();
    expect(component.visible).toBeTrue();
    expect(mockBridge.getPropertyState).toHaveBeenCalled();
    expect(mockBridge.getGlobalPropertyState).toHaveBeenCalled();
    expect(component.state).toEqual(mockPropertyState);
    expect(component.globalState).toEqual(mockGlobalState);
    expect(component.axisSelected).toBeFalse();
    expect(component.axisState).toBeNull();
  });

  it('should detect axis selection when property code starts with axis', () => {
    mockBridge.getPropertyState.and.returnValue({
      ...mockPropertyState,
      code: 'axis_ox',
    });

    component.open();
    expect(component.axisSelected).toBeTrue();
    expect(mockBridge.getAxisPropertyState).toHaveBeenCalled();
    expect(component.axisState).toEqual(mockAxisState);
  });

  it('should close and reset internal state and emit closed', () => {
    spyOn(component.closed, 'emit');
    component.open();
    component.close();

    expect(component.visible).toBeFalse();
    expect(component.state).toBeNull();
    expect(component.globalState).toBeNull();
    expect(component.axisState).toBeNull();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should update object property and refresh state', () => {
    component.open();
    component.applyAll = true;
    component.update('color', '#00ff00');

    expect(mockBridge.updateProperty).toHaveBeenCalledWith('color', '#00ff00', true);
    expect(mockBridge.getPropertyState).toHaveBeenCalled();
  });

  it('should update global property and refresh global state', () => {
    component.open();
    component.updateGlobal('backgroundColor', '#0000b2');

    expect(mockBridge.updateGlobalProperty).toHaveBeenCalledWith('backgroundColor', '#0000b2');
    expect(mockBridge.getGlobalPropertyState).toHaveBeenCalled();
  });

  it('should update axis property and refresh axis state', () => {
    component.open();
    component.updateAxis('showGrid', false);

    expect(mockBridge.updateAxisProperty).toHaveBeenCalledWith('showGrid', false);
    expect(mockBridge.getAxisPropertyState).toHaveBeenCalled();
  });

  it('should return correct family labels', () => {
    expect(component.familyLabel('point')).toBe('Puntos');
    expect(component.familyLabel('angle')).toBe('Ángulos');
    expect(component.familyLabel('line')).toBe('Rectas');
    expect(component.familyLabel('circle')).toBe('Círculos');
    expect(component.familyLabel('other')).toBe('other');
  });

  it('should handle legacy window messages for property selection', () => {
    component.open();
    const event = new MessageEvent('message', {
      origin: window.location.origin,
      data: { type: 'dgpad-property-selection' },
    });

    component.handleLegacyMessage(event);
    expect(mockBridge.getPropertyState).toHaveBeenCalled();
  });
});
