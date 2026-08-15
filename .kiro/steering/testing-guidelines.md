# Guía de Pruebas para Migración Angular

## Visión General

Este documento establece los requisitos de testing para la migración de DGPad a Angular.

## Niveles de Testing

### 1. Unit Testing

#### Bridge Service

```typescript
// dgpad-bridge.service.spec.ts
describe('DgpadBridgeService', () => {
  let service: DgpadBridgeService;
  let mockIframe: HTMLIFrameElement;
  let mockBridge: LegacyBridge;

  beforeEach(() => {
    mockBridge = {
      getPropertyState: jasmine.createSpy('getPropertyState'),
      updateProperty: jasmine.createSpy('updateProperty'),
    };

    mockIframe = {
      contentWindow: { dgpadBridge: mockBridge } as Window,
    } as HTMLIFrameElement;

    spyOn(document, 'getElementById').and.returnValue(mockIframe);
    service = new DgpadBridgeService();
  });

  it('should get property state', () => {
    const expected = { name: 'test', color: '#fff' };
    mockBridge.getPropertyState.and.returnValue(expected);

    const result = service.getPropertyState();

    expect(result).toEqual(expected);
    expect(mockBridge.getPropertyState).toHaveBeenCalled();
  });

  it('should return null when bridge not available', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    service = new DgpadBridgeService();

    const result = service.getPropertyState();

    expect(result).toBeNull();
  });
});
```

#### Components

```typescript
// widget-panel.component.spec.ts
describe('WidgetPanelComponent', () => {
  let component: WidgetPanelComponent;
  let fixture: ComponentFixture<WidgetPanelComponent>;
  let mockBridge = jasmine.createSpyObj('Bridge', ['getWidgetState', 'updateWidgetProperty']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WidgetPanelComponent, FormsModule, CommonModule],
      providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
    });

    fixture = TestBed.createComponent(WidgetPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load selection when opened', () => {
    const state: LegacyWidgetState = {
      color: '#fff', opacity: 0.5, borderSize: 2,
      borderRadius: 10, precision: 4, fontSize: 3,
      fixPosition: false, fixSize: false
    };
    mockBridge.getWidgetState.and.returnValue(state);

    component.open();

    expect(component.visible).toBeTrue();
    expect(component.state).toEqual(state);
  });

  it('should call bridge when updating property', () => {
    component.open();
    component.hasSelection = true;
    component.state = { ...component.defaultState() };

    component.update('color', '#ff0000');

    expect(mockBridge.updateWidgetProperty).toHaveBeenCalledWith('color', '#ff0000');
  });
});
```

### 2. Integration Testing

#### End-to-End Flow

```typescript
// property-flow.spec.ts
it('should update property end-to-end', () => {
  // 1. Component calls bridge
  component.updateColor('#ff0000');
  
  // 2. Bridge updates legacy
  expect(mockBridge.updateProperty).toHaveBeenCalledWith(
    'color', '#ff0000', false
  );
  
  // 3. Legacy should recompute and repaint
  // (Verified in manual tests)
});
```

#### Message Event Flow

```typescript
// calculator-state.spec.ts
it('should refresh when receiving calculator state message', () => {
  component.open();
  
  const mockState: LegacyCalculatorState = {
    editing: true, e1: '2+2', e1Label: 'Expression',
    e2: '', e2Label: '', min: '', max: '',
    showE2: false, showMin: false, showMax: false, degrees: false
  };
  
  component.state = mockState;
  component.refresh();
  
  expect(component.state).toEqual(mockState);
});
```

### 3. Manual Testing

#### Checklist por Feature

Cada feature migrada debe pasar:

- [ ] **UI básica**
  - [ ] Componente renderiza
  - [ ] Eventos de usuario funcionan (click, input)
  - [ ] Estados visuales correctos (loading, error, success)

- [ ] **Integración bridge**
  - [ ] Llamadas al bridge se hacen correctamente
  - [ ] Respuestas se procesan
  - [ ] Errores se manejan

- [ ] **Comunicación iframe**
  - [ ] postMessage funciona (si aplica)
  - [ ] Eventos se reciben
  - [ ] Timing es correcto

- [ ] **DGPad legacy**
  - [ ] Objeto creado/actualizado
  - [ ] Canvas se repinta
  - [ ] Propiedades persisten

- [ ] **End-to-end**
  - [ ] Flujo completo funciona
  - [ ] No hay errores en consola
  - [ ] No hay memory leaks

#### Herramientas de Debugging

```typescript
// Bridge - Logging
private log(method: string, args: any[] = [], result?: any) {
  console.log(
    `[Bridge] ${method}(${args.map(a => JSON.stringify(a)).join(', ')})`,
    result !== undefined ? `→ ${JSON.stringify(result)}` : ''
  );
}

getPropertyState() {
  this.log('getPropertyState');
  const result = this.getLegacyBridge()?.getPropertyState?.();
  this.log('getPropertyState', [], result);
  return result;
}
```

## Categorías de Feature

### Feature Type 1: Simple State Display

**Ejemplos:** Widget panel, calculator panel

**Testing:**
- [ ] Estado inicial
- [ ] Actualización de estado
- [ ] Manejo de null/undefined
- [ ] Eventos de usuario

### Feature Type 2: Actions with Side Effects

**Ejemplos:** Open names, toggle grid, create object

**Testing:**
- [ ] Acción se ejecuta
- [ ] Legacy recibe comando
- [ ] Estado cambia
- [ ] Canvas se actualiza

### Feature Type 3: Complex Operations

**Ejemplos:** Exportación, historial

**Testing:**
- [ ] Datos se generan correctamente
- [ ] Formatos son válidos
- [ ] Download funciona
- [ ] Errores se manejan

### Feature Type 4: Event-Driven

**Ejemplos:** Names panel, calculator state updates

**Testing:**
- [ ] Eventos se reciben
- [ ] State se actualiza
- [ ] UI se re-renderiza
- [ ] Origin validation

## Tooling

### Test Framework

- **Jasmine** para unit tests
- **Karma** como test runner
- **Chrome** como browser

### Commands

```bash
# Run all tests
ng test

# Run specific file
ng test --include src/app/core/dgpad-bridge/dgpad-bridge.service.spec.ts

# Watch mode
ng test --watch

# Coverage
ng test --code-coverage
```

### Coverage Requirements

- **Bridge service**: 90%+
- **Components**: 80%+
- **Feature modules**: 70%+

## Common Testing Patterns

### Pattern 1: Mock Bridge

```typescript
beforeEach(() => {
  const mockBridge = {
    getPropertyState: jasmine.createSpy('getPropertyState').and.returnValue(null),
    updateProperty: jasmine.createSpy('updateProperty'),
  };
  
  TestBed.configureTestingModule({
    providers: [{ provide: DgpadBridgeService, useValue: mockBridge }],
  });
});
```

### Pattern 2: Mock Iframe

```typescript
beforeEach(() => {
  const mockIframe = {
    contentWindow: {
      dgpadBridge: mockBridge,
      eval: (code: string) => eval(code),
    } as Window,
    addEventListener: jasmine.createSpy('addEventListener'),
    removeEventListener: jasmine.createSpy('removeEventListener'),
  } as HTMLIFrameElement;

  spyOn(document, 'getElementById').and.returnValue(mockIframe);
});
```

### Pattern 3: Mock postMessage

```typescript
it('should handle message event', () => {
  const event: MessageEvent = {
    data: { type: 'dgpad-widget-selection', selected: true },
    origin: window.location.origin,
    source: window,
    ports: [],
  } as MessageEvent;

  component.handleMessage(event);

  expect(component.hasSelection).toBeTrue();
});
```

### Pattern 4: Async Testing

```typescript
it('should refresh after delay', (done) => {
  component.refresh();
  
  setTimeout(() => {
    expect(component.state).not.toBeNull();
    done();
  }, 100);
});
```

## Regression Testing

### Before Migration

Capturear:
- [ ] Screenshots de UI
- [ ] Listado de features
- [ ] Flujos manuales documentados

### After Migration

Verificar:
- [ ] Mismos resultados
- [ ] Mismo comportamiento
- [ ] No hay regresiones

## Performance Testing

### Manual Checks

- [ ] No hay lag en UI
- [ ] Canvas paint es suave
- [ ] Memory no crece sin control
- [ ] Event listeners se limpian

### Metrics

- First Contentful Paint: < 1s
- Time to Interactive: < 3s
- Memory: < 100MB
- No memory leaks after 10min de uso

## Continuous Testing

### CI/CD

```yaml
# .github/workflows/test.yml
name: Angular Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:headless
```

## Reference

- Angular Testing Guide: https://angular.io/guide/testing
- Jasmine Docs: https://jasmine.github.io/
- Angular Karma: https://angular.io/cli/test
