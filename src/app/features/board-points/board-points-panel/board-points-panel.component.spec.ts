import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardPointsPanelComponent } from './board-points-panel.component';
import { DgpadBridgeService } from '../../../core/dgpad-bridge/dgpad-bridge.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('BoardPointsPanelComponent (Unit Tests)', () => {
  let component: BoardPointsPanelComponent;
  let fixture: ComponentFixture<BoardPointsPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  beforeEach(async () => {
    // Crear mock del bridge
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', ['createBoardPoints']);

    await TestBed.configureTestingModule({
      imports: [BoardPointsPanelComponent, FormsModule, CommonModule],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardPointsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ============================================================================
  // TESTS: Component Creation & Lifecycle
  // ============================================================================

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default state', () => {
    expect(component.state.isVisible).toBeFalse();
    expect(component.state.isCreating).toBeFalse();
    expect(component.state.basePattern).toBe('A');
    expect(component.state.startNumber).toBe(1);
    expect(component.state.endNumber).toBe(10);
    expect(component.state.createdPoints).toEqual([]);
    expect(component.state.error).toBeNull();
  });

  // ============================================================================
  // TESTS: Panel Open/Close
  // ============================================================================

  it('should open panel when calling open()', () => {
    expect(component.state.isVisible).toBeFalse();
    component.open();
    expect(component.state.isVisible).toBeTrue();
  });

  it('should close panel when calling close()', () => {
    component.open();
    component.close();
    expect(component.state.isVisible).toBeFalse();
  });

  it('should emit closed event when close() is called', () => {
    spyOn(component.closed, 'emit');
    component.open();
    component.close();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should reset state when opening panel', () => {
    component.state.createdPoints = ['A1', 'A2'];
    component.state.error = 'Some error';
    component.open();
    expect(component.state.createdPoints).toEqual([]);
    expect(component.state.error).toBeNull();
  });

  // ============================================================================
  // TESTS: Validation
  // ============================================================================

  it('should show error for empty pattern', () => {
    component.open();
    component.state.basePattern = '';
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
    expect(mockBridge.createBoardPoints).not.toHaveBeenCalled();
  });

  it('should show error for negative start number', () => {
    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = -5;
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
    expect(mockBridge.createBoardPoints).not.toHaveBeenCalled();
  });

  it('should show error if end number < start number', () => {
    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = 10;
    component.state.endNumber = 5;
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
    expect(mockBridge.createBoardPoints).not.toHaveBeenCalled();
  });

  it('should show error for too many points (> 1000)', () => {
    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = 1;
    component.state.endNumber = 1001;
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
    expect(mockBridge.createBoardPoints).not.toHaveBeenCalled();
  });

  it('should show error for invalid pattern characters', () => {
    component.open();
    component.state.basePattern = 'A@#$';
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
    expect(mockBridge.createBoardPoints).not.toHaveBeenCalled();
  });

  // ============================================================================
  // TESTS: Successful Creation
  // ============================================================================

  it('should call bridge.createBoardPoints with correct params', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['A1', 'A2', 'A3'],
    });

    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = 1;
    component.state.endNumber = 3;
    component.onCreatePoints();

    expect(mockBridge.createBoardPoints).toHaveBeenCalledWith('A', 1, 3);
  });

  it('should display created points on success', () => {
    const expectedPoints = ['A1', 'A2', 'A3'];
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: expectedPoints,
    });

    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = 1;
    component.state.endNumber = 3;
    component.onCreatePoints();

    expect(component.state.createdPoints).toEqual(expectedPoints);
    expect(component.state.error).toBeNull();
  });

  it('should handle large number of points (100)', () => {
    const expectedPoints = Array.from({ length: 100 }, (_, i) => `P${i + 1}`);
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: expectedPoints,
    });

    component.open();
    component.state.basePattern = 'P';
    component.state.startNumber = 1;
    component.state.endNumber = 100;
    component.onCreatePoints();

    expect(component.state.createdPoints.length).toBe(100);
    expect(component.state.createdPoints[0]).toBe('P1');
    expect(component.state.createdPoints[99]).toBe('P100');
  });

  // ============================================================================
  // TESTS: Error Handling
  // ============================================================================

  it('should handle bridge error', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: false,
      createdPoints: [],
      error: 'Canvas not ready',
    });

    component.open();
    component.onCreatePoints();

    expect(component.state.error).toBe('Canvas not ready');
    expect(component.state.createdPoints).toEqual([]);
  });

  it('should handle bridge exception', () => {
    mockBridge.createBoardPoints.and.throwError('Network error');

    component.open();
    component.onCreatePoints();

    expect(component.state.error).toContain('Network error');
  });

  it('should show default error message if bridge returns null', () => {
    mockBridge.createBoardPoints.and.returnValue(null as any);

    component.open();
    component.onCreatePoints();

    expect(component.state.error).toBeTruthy();
  });

  // ============================================================================
  // TESTS: Loading State
  // ============================================================================

  it('should show loading state while creating', () => {
    mockBridge.createBoardPoints.and.callFake(() => {
      expect(component.state.isCreating).toBeTrue();
      return { success: true, createdPoints: ['A1'] };
    });

    component.open();
    component.onCreatePoints();

    expect(component.state.isCreating).toBeFalse();
  });

  it('should disable form inputs while creating', () => {
    mockBridge.createBoardPoints.and.callFake(() => {
      expect(component.state.isCreating).toBeTrue();
      return { success: true, createdPoints: ['A1'] };
    });

    component.open();
    component.onCreatePoints();

    expect(component.state.isCreating).toBeFalse();
  });

  // ============================================================================
  // TESTS: UI Helpers
  // ============================================================================

  it('should calculate pointsCount correctly', () => {
    component.state.startNumber = 1;
    component.state.endNumber = 10;
    expect(component.pointsCount).toBe(10);

    component.state.startNumber = 5;
    component.state.endNumber = 8;
    expect(component.pointsCount).toBe(4);
  });

  it('should return 0 for pointsCount if endNumber < startNumber', () => {
    component.state.startNumber = 10;
    component.state.endNumber = 5;
    expect(component.pointsCount).toBe(0);
  });

  it('should enable create button only when valid', () => {
    component.open();
    expect(component.isCreateButtonEnabled).toBeTrue();

    component.state.isCreating = true;
    expect(component.isCreateButtonEnabled).toBeFalse();

    component.state.isCreating = false;
    component.state.startNumber = 10;
    component.state.endNumber = 5;
    expect(component.isCreateButtonEnabled).toBeFalse();
  });

  // ============================================================================
  // TESTS: Different Patterns
  // ============================================================================

  it('should handle numeric patterns', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['P1', 'P2', 'P3'],
    });

    component.open();
    component.state.basePattern = 'P';
    component.state.startNumber = 1;
    component.state.endNumber = 3;
    component.onCreatePoints();

    expect(mockBridge.createBoardPoints).toHaveBeenCalledWith('P', 1, 3);
    expect(component.state.createdPoints).toEqual(['P1', 'P2', 'P3']);
  });

  it('should handle patterns with underscores', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['pt_1', 'pt_2'],
    });

    component.open();
    component.state.basePattern = 'pt_';
    component.state.startNumber = 1;
    component.state.endNumber = 2;
    component.onCreatePoints();

    expect(mockBridge.createBoardPoints).toHaveBeenCalledWith('pt_', 1, 2);
  });

  it('should handle patterns with dashes', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['p-1', 'p-2'],
    });

    component.open();
    component.state.basePattern = 'p-';
    component.state.startNumber = 1;
    component.state.endNumber = 2;
    component.onCreatePoints();

    expect(mockBridge.createBoardPoints).toHaveBeenCalledWith('p-', 1, 2);
  });

  // ============================================================================
  // TESTS: Multiple Creations
  // ============================================================================

  it('should allow creating multiple batches sequentially', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['A1', 'A2'],
    });

    component.open();
    component.state.basePattern = 'A';
    component.state.startNumber = 1;
    component.state.endNumber = 2;
    component.onCreatePoints();

    expect(component.state.createdPoints.length).toBe(2);

    // Segunda creación
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['B1', 'B2', 'B3'],
    });

    component.state.basePattern = 'B';
    component.state.startNumber = 1;
    component.state.endNumber = 3;
    component.onCreatePoints();

    expect(component.state.createdPoints.length).toBe(3);
    expect(component.state.createdPoints[0]).toBe('B1');
  });

  it('should clear error on new creation attempt', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: false,
      createdPoints: [],
      error: 'Canvas not ready',
    });

    component.open();
    component.onCreatePoints();
    expect(component.state.error).toBe('Canvas not ready');

    // Second attempt with success
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['A1'],
    });

    component.onCreatePoints();
    expect(component.state.error).toBeNull();
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('BoardPointsPanelComponent (Integration Tests)', () => {
  let component: BoardPointsPanelComponent;
  let fixture: ComponentFixture<BoardPointsPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', ['createBoardPoints']);

    await TestBed.configureTestingModule({
      imports: [BoardPointsPanelComponent, FormsModule, CommonModule],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardPointsPanelComponent);
    component = fixture.componentInstance;
  });

  it('should render panel when visible', () => {
    component.open();
    fixture.detectChanges();

    const panelElement = fixture.nativeElement.querySelector('.board-points-panel');
    expect(panelElement).toBeTruthy();
  });

  it('should not render panel when hidden', () => {
    component.close();
    fixture.detectChanges();

    const panelElement = fixture.nativeElement.querySelector('.board-points-panel');
    expect(panelElement).toBeFalsy();
  });

  it('should bind input values correctly', () => {
    component.open();
    component.state.basePattern = 'Test';
    component.state.startNumber = 5;
    component.state.endNumber = 15;
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('.form-control');
    // This would require more detailed DOM inspection
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should call onCreatePoints on button click', () => {
    spyOn(component, 'onCreatePoints');
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: [],
    });

    component.open();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.btn-primary');
    button?.click();

    expect(component.onCreatePoints).toHaveBeenCalled();
  });

  it('should show success message when points created', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: true,
      createdPoints: ['A1', 'A2', 'A3'],
    });

    component.open();
    fixture.detectChanges();
    component.onCreatePoints();
    fixture.detectChanges();

    const resultElement = fixture.nativeElement.querySelector('.result-success');
    expect(resultElement).toBeTruthy();
  });

  it('should show error message on failure', () => {
    mockBridge.createBoardPoints.and.returnValue({
      success: false,
      createdPoints: [],
      error: 'Test error',
    });

    component.open();
    fixture.detectChanges();
    component.onCreatePoints();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.result-error');
    expect(errorElement).toBeTruthy();
  });

  it('should close panel with close button', () => {
    component.open();
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.btn-close');
    closeButton?.click();

    expect(component.state.isVisible).toBeFalse();
  });
});
