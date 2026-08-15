import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetPanelComponent } from './widget-panel.component';
import {
  DgpadBridgeService,
  LegacyWidgetState,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

describe('WidgetPanelComponent', () => {
  let component: WidgetPanelComponent;
  let fixture: ComponentFixture<WidgetPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  const mockSelectedWidget: LegacyWidgetState = {
    color: '#0000b2',
    opacity: 0.5,
    borderSize: 2,
    borderRadius: 10,
    precision: 3,
    fontSize: 4,
    fixPosition: true,
    fixSize: false,
  };

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', [
      'getWidgetState',
      'updateWidgetProperty',
      'createWidget',
    ]);

    mockBridge.getWidgetState.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [WidgetPanelComponent],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and load selection (default state if no selection)', () => {
    component.open();
    expect(component.visible).toBeTrue();
    expect(component.hasSelection).toBeFalse();
    expect(mockBridge.getWidgetState).toHaveBeenCalled();
    expect(component.state.color).toBe('#3b4f73');
  });

  it('should open and load selection when widget is selected', () => {
    mockBridge.getWidgetState.and.returnValue({ ...mockSelectedWidget });
    component.open();

    expect(component.visible).toBeTrue();
    expect(component.hasSelection).toBeTrue();
    expect(component.state).toEqual(mockSelectedWidget);
  });

  it('should close and reset hasSelection and emit closed', () => {
    spyOn(component.closed, 'emit');
    component.open();
    component.close();

    expect(component.visible).toBeFalse();
    expect(component.hasSelection).toBeFalse();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should update local state when updating without selection', () => {
    component.open();
    component.update('color', '#ff0000');

    expect(component.state.color).toBe('#ff0000');
    expect(mockBridge.updateWidgetProperty).not.toHaveBeenCalled();
  });

  it('should update bridge when updating with active selection', () => {
    mockBridge.getWidgetState.and.returnValue({ ...mockSelectedWidget });
    component.open();
    component.update('opacity', 0.8);

    expect(mockBridge.updateWidgetProperty).toHaveBeenCalledWith('opacity', 0.8);
    expect(mockBridge.getWidgetState).toHaveBeenCalled();
  });

  it('should create widget using current state', () => {
    component.open();
    component.createWidget();
    expect(mockBridge.createWidget).toHaveBeenCalledWith(component.state);
  });

  it('should handle legacy window messages for widget selection', () => {
    component.open();
    mockBridge.getWidgetState.and.returnValue({ ...mockSelectedWidget });

    const event = new MessageEvent('message', {
      origin: window.location.origin,
      data: { type: 'dgpad-widget-selection' },
    });

    component.handleLegacyMessage(event);
    expect(component.hasSelection).toBeTrue();
    expect(component.state).toEqual(mockSelectedWidget);
  });
});
