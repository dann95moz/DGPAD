import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { DgpadBridgeService } from '../../core/dgpad-bridge/dgpad-bridge.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', [
      'setMode',
      'closeProperties',
      'toggleGrid',
      'resetZoom',
      'undo',
      'redo',
      'getUsedNames',
      'openConstructionProtocol',
      'duplicateFigure',
      'openFile',
      'saveFile',
      'createBlocklyButton',
      'createExpression',
      'createExpressionPoints',
      'createExpressionSegments',
      'createBoardPoints',
      'createIntegerCursor',
      'createContinuousCursor',
      'createEditWidget',
      'clearConstruction',
      'createAnyPoint',
      'createLine',
      'createSegment',
      'getMacroCatalog',
      'getCalculatorState',
      'getPropertyState',
      'getGlobalPropertyState',
      'getAxisPropertyState',
      'getWidgetState',
    ]);

    mockBridge.getUsedNames.and.returnValue([]);
    mockBridge.toggleGrid.and.returnValue(true);
    mockBridge.getMacroCatalog.and.returnValue({ plugins: [], tools: [] });
    mockBridge.getCalculatorState.and.returnValue(null);
    mockBridge.getPropertyState.and.returnValue(null);
    mockBridge.getGlobalPropertyState.and.returnValue(null);
    mockBridge.getAxisPropertyState.and.returnValue(null);
    mockBridge.getWidgetState.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the toolbar component', () => {
    expect(component).toBeTruthy();
  });

  describe('Mode Toggles', () => {
    it('should toggle construction mode', () => {
      component.constructionEnabled = true;
      component.toggleConstruction();
      expect(component.constructionEnabled).toBeFalse();
      expect(mockBridge.setMode).toHaveBeenCalledWith('move');

      component.toggleConstruction();
      expect(component.constructionEnabled).toBeTrue();
      expect(mockBridge.setMode).toHaveBeenCalledWith('build');
    });

    it('should toggle hide mode', () => {
      component.toggleHide();
      expect(component.hideEnabled).toBeTrue();
      expect(component.constructionEnabled).toBeFalse();
      expect(mockBridge.setMode).toHaveBeenCalledWith('hide');
    });

    it('should toggle delete mode', () => {
      component.toggleDelete();
      expect(component.deleteEnabled).toBeTrue();
      expect(component.constructionEnabled).toBeFalse();
      expect(mockBridge.setMode).toHaveBeenCalledWith('delete');
    });

    it('should toggle macro mode', () => {
      component.macroEnabled = false;
      component.toggleMacro();
      expect(component.macroEnabled).toBeTrue();
      expect(mockBridge.setMode).toHaveBeenCalledWith('macro');

      component.toggleMacro();
      expect(component.macroEnabled).toBeFalse();
      expect(mockBridge.setMode).toHaveBeenCalledWith('move');
    });

    it('should toggle calculator mode', () => {
      component.calcEnabled = false;
      component.toggleCalc();
      expect(component.calcEnabled).toBeTrue();
      expect(mockBridge.setMode).toHaveBeenCalledWith('calc');

      component.toggleCalc();
      expect(component.calcEnabled).toBeFalse();
      expect(mockBridge.setMode).toHaveBeenCalledWith('move');
    });

    it('should toggle grid and reset zoom', () => {
      component.toggleGrid();
      expect(mockBridge.toggleGrid).toHaveBeenCalled();
      expect(component.gridEnabled).toBeTrue();

      component.resetZoom();
      expect(mockBridge.resetZoom).toHaveBeenCalled();
    });

    it('should execute undo and redo', () => {
      component.undo();
      expect(mockBridge.undo).toHaveBeenCalled();

      component.redo();
      expect(mockBridge.redo).toHaveBeenCalled();
    });
  });

  describe('Events and Dialogs', () => {
    it('should emit historyRequested on openHistory', () => {
      spyOn(component.historyRequested, 'emit');
      component.openHistory();
      expect(component.historyRequested.emit).toHaveBeenCalled();
      expect(component.historyEnabled).toBeTrue();
    });

    it('should emit exportRequested on openExport', () => {
      spyOn(component.exportRequested, 'emit');
      component.openExport();
      expect(component.exportRequested.emit).toHaveBeenCalled();
      expect(component.exportEnabled).toBeTrue();
    });

    it('should toggle other tools menu', () => {
      component.otherToolsEnabled = false;
      component.toggleOtherTools();
      expect(component.otherToolsEnabled).toBeTrue();

      component.toggleOtherTools();
      expect(component.otherToolsEnabled).toBeFalse();
    });
  });

  describe('Other Tools Actions', () => {
    it('should handle blockly button action', () => {
      component.handleOtherToolSelected('blockly_button');
      expect(mockBridge.createBlocklyButton).toHaveBeenCalled();
      expect(component.otherToolsEnabled).toBeFalse();
    });

    it('should handle expression actions', () => {
      component.handleOtherToolSelected('expression');
      expect(mockBridge.createExpression).toHaveBeenCalled();

      component.handleOtherToolSelected('expression_points');
      expect(mockBridge.createExpressionPoints).toHaveBeenCalled();

      component.handleOtherToolSelected('expression_segments');
      expect(mockBridge.createExpressionSegments).toHaveBeenCalled();
    });

    it('should handle cursor actions', () => {
      component.handleOtherToolSelected('integer_cursor');
      expect(mockBridge.createIntegerCursor).toHaveBeenCalled();

      component.handleOtherToolSelected('continuous_cursor');
      expect(mockBridge.createContinuousCursor).toHaveBeenCalled();
    });

    it('should handle board_points action', () => {
      component.handleOtherToolSelected('board_points');
      expect(component.otherToolsEnabled).toBeFalse();
    });
  });

  describe('Textual Construction', () => {
    it('should parse and execute point, line, and segment instructions', () => {
      const text = [
        'A: Punto cualquiera',
        'B: Punto cualquiera',
        'd: recta AB',
        's: segmento AB',
      ].join('\n');

      component.handleTextualConstructionBuildRequested(text);

      expect(mockBridge.clearConstruction).toHaveBeenCalled();
      expect(mockBridge.createAnyPoint).toHaveBeenCalledWith('A');
      expect(mockBridge.createAnyPoint).toHaveBeenCalledWith('B');
      expect(mockBridge.createLine).toHaveBeenCalledWith('d', 'A', 'B');
      expect(mockBridge.createSegment).toHaveBeenCalledWith('s', 'A', 'B');
    });

    it('should show alert on invalid syntax', () => {
      spyOn(window, 'alert');
      component.handleTextualConstructionBuildRequested('invalid instruction');
      expect(window.alert).toHaveBeenCalled();
    });
  });
});