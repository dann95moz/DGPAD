import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacroPanelComponent } from './macro-panel.component';
import {
  DgpadBridgeService,
  LegacyActiveMacro,
  LegacyMacroCatalog,
  LegacyMacroDraft,
} from '../../../core/dgpad-bridge/dgpad-bridge.service';

describe('MacroPanelComponent', () => {
  let component: MacroPanelComponent;
  let fixture: ComponentFixture<MacroPanelComponent>;
  let mockBridge: jasmine.SpyObj<DgpadBridgeService>;

  const mockCatalog: LegacyMacroCatalog = {
    plugins: [
      { key: 'p1', name: 'Triángulos/Equilátero' },
      { key: 'p2', name: 'Triángulos/Isósceles' },
      { key: 'p3', name: 'Circunferencias/Circuncírculo' },
      { key: 'p4', name: 'MacroSimple' },
    ],
    tools: [{ key: 't1', name: 'Herramienta 1' }],
  };

  const mockDraft: LegacyMacroDraft = {
    params: ['A', 'B'],
    targets: ['C'],
  };

  const mockActiveMacro: LegacyActiveMacro = {
    key: 'p1',
    name: 'Triángulo equilátero',
    prompt: '1/2 - Primer punto',
    types: ['point', 'point'],
  };

  beforeEach(async () => {
    mockBridge = jasmine.createSpyObj('DgpadBridgeService', [
      'getMacroCatalog',
      'getMacroDraft',
      'getActiveMacro',
      'startMacro',
      'saveMacroDraft',
    ]);

    mockBridge.getMacroCatalog.and.callFake(() => ({ ...mockCatalog }));
    mockBridge.getMacroDraft.and.callFake(() => ({ ...mockDraft }));
    mockBridge.getActiveMacro.and.callFake(() => mockActiveMacro);

    await TestBed.configureTestingModule({
      imports: [MacroPanelComponent],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(MacroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and load catalog and active macro', () => {
    component.open();
    expect(component.visible).toBeTrue();
    expect(mockBridge.getMacroCatalog).toHaveBeenCalled();
    expect(mockBridge.getMacroDraft).toHaveBeenCalled();
    expect(mockBridge.getActiveMacro).toHaveBeenCalled();
    expect(component.catalog).toEqual(mockCatalog);
    expect(component.draft).toEqual(mockDraft);
    expect(component.activeMacro).toEqual(mockActiveMacro);
  });

  it('should group plugin items correctly', () => {
    component.open();
    const groups = component.pluginGroups;
    expect(groups.length).toBe(3);
    expect(groups[0].name).toBe('Triángulos');
    expect(groups[0].items.length).toBe(2);
    expect(groups[1].name).toBe('Circunferencias');
    expect(groups[2].name).toBe('Otras');
  });

  it('should toggle group expansion', () => {
    expect(component.expanded.has('Triángulos')).toBeFalse();
    component.toggleGroup('Triángulos');
    expect(component.expanded.has('Triángulos')).toBeTrue();
    component.toggleGroup('Triángulos');
    expect(component.expanded.has('Triángulos')).toBeFalse();
  });

  it('should execute macro item and start macro in bridge', () => {
    component.execute({ key: 'p1', name: 'Triángulos/Equilátero' });
    expect(mockBridge.startMacro).toHaveBeenCalledWith('p1');
    expect(mockBridge.getActiveMacro).toHaveBeenCalled();
  });

  it('should save draft with valid name', () => {
    component.open();
    component.macroName = 'Mi Nueva Macro';
    component.saveDraft();

    expect(mockBridge.saveMacroDraft).toHaveBeenCalledWith('Mi Nueva Macro');
    expect(component.macroName).toBe('Macro sin título');
  });

  it('should not save draft with empty name', () => {
    component.macroName = '   ';
    component.saveDraft();
    expect(mockBridge.saveMacroDraft).not.toHaveBeenCalled();
  });

  it('should display short name without category path', () => {
    expect(component.displayName({ key: 'p1', name: 'Triángulos/Equilátero' })).toBe('Equilátero');
    expect(component.displayName({ key: 'p4', name: 'MacroSimple' })).toBe('MacroSimple');
  });

  it('should generate human-friendly requirements message', () => {
    const msg = component.requirementsMessage(mockActiveMacro);
    expect(msg).toContain('dos puntos');
    expect(msg).toContain('vértices del triángulo');
  });

  it('should generate selection message from prompt', () => {
    expect(component.selectionMessage('1/2 - Primer punto?')).toBe('Selecciona ahora el primero.');
    expect(component.selectionMessage('2/2 - Segundo punto')).toBe('Selecciona ahora el segundo.');
    expect(component.selectionMessage('Mensaje directo')).toBe('Mensaje directo');
  });

  it('should handle legacy window messages for macros', () => {
    component.open();
    const event = new MessageEvent('message', {
      origin: window.location.origin,
      data: { type: 'dgpad-macro-progress' },
    });

    component.handleLegacyMessage(event);
    expect(mockBridge.getMacroCatalog).toHaveBeenCalled();
  });
});
