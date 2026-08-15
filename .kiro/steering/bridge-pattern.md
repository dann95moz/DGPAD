# Patrón de Puente: DgpadBridgeService

## Propósito

`DgpadBridgeService` es el único punto de comunicación entre Angular y DGPad legacy. Actúa como adaptador que traduce llamadas de alto nivel a código JavaScript legacy.

## Arquitectura

```
┌─────────────────┐
│  Angular UI     │
│  Components     │
└────────┬────────┘
         │
         │ 1. Llamada al bridge
         ▼
┌─────────────────────────────┐
│ DgpadBridgeService          │
│ - Traducción de tipos       │
│ - Validación                │
│ - Manejo de errores         │
└──────────┬──────────────────┘
           │
           │ 2. postMessage o eval
           ▼
┌─────────────────────────────┐
│ iframe dgpad-legacy         │
│ - window.dgpadBridge        │
│ - $CANVAS                   │
│ - Lógica geométrica         │
└─────────────────────────────┘
```

## Estructura del Bridge

### 1. Definición del puente

```typescript
type LegacyBridge = {
  setMode?: (mode: number) => void;
  openProperties?: () => void;
  getPropertyState?: () => LegacyPropertyState | null;
  // ... resto de métodos
};
```

### 2. Tipos de datos

```typescript
// Legacy (del iframe)
export type LegacyPropertyState = {
  name: string;
  code: string;
  color: string;
  // ...
};

// Angular (tipos sanitizados)
export type EditableProperty = 
  | 'name' 
  | 'color' 
  | 'opacity'
  // ...
```

### 3. Servicios públicos

```typescript
@Injectable({ providedIn: 'root' })
export class DgpadBridgeService {
  getPropertyState(): LegacyPropertyState | null {
    return this.getLegacyBridge()?.getPropertyState?.() ?? null;
  }

  updateProperty(property, value, applyAll = false): void {
    this.getLegacyBridge()?.updateProperty?.(property, value, applyAll);
  }
}
```

## Métodos del Bridge

### Getters (sin副作用)

```typescript
// ✅ Getters puros
getPropertyState(): LegacyPropertyState | null
getGlobalPropertyState(): LegacyGlobalPropertyState | null
getCalculatorState(): LegacyCalculatorState | null
getHistoryEntries(): LegacyHistoryEntry[]
getUsedNames(): string[]
```

### Setters (con efectos)

```typescript
// ✅ Setters con efectos secundarios
updateProperty(property, value, applyAll): void
setCalculatorDegrees(value): void
saveHistorySnapshot(): void
createWidget(options): void
```

### Acciones (sin retorno)

```typescript
// ✅ Acciones que modifican estado
openNames(): void
closeNames(): void
toggleGrid(): boolean
createAnyPoint(name): void
```

## Convenciones de Implementación

### 1. Validación de existencia

```typescript
getPropertyState(): LegacyPropertyState | null {
  const bridge = this.getLegacyBridge();
  return bridge?.getPropertyState?.() ?? null;
}
```

### 2. Validación de iframe

```typescript
private getLegacyBridge(): LegacyBridge | undefined {
  const frame = document.getElementById('dgpad-legacy-frame') as HTMLIFrameElement | null;
  return frame?.contentWindow?.dgpadBridge;
}
```

### 3. Manejo de errors

```typescript
// ✅ No lanzar exceptions sin contexto
createAnyPoint(name: string): void {
  try {
    this.runLegacyScript(`...`);
  } catch (error) {
    console.error('Failed to create point:', error);
    // Mostrar alerta o notificación
  }
}
```

### 4. Funciones complejas

```typescript
// ✅ Código legacy en strings separados
createExpressionPoints(): void {
  this.runLegacyScript(`
    var canvas = $CANVAS;
    var Cn = canvas.getConstruction();
    // ... lógica compleja
  `);
}
```

## Métodos con Código Legacy

### Pattern: runLegacyScript

```typescript
private runLegacyScript(script: string): unknown {
  const win = this.getLegacyWindow();
  return win?.eval?.call(win, script);
}
```

### Pattern: export methods

```typescript
exportText(options): void {
  const content = this.getLegacyBridge()?.exportText?.(options);
  if (!content) {
    console.error('DGPad no devolvió texto');
    return;
  }
  this.downloadTextFile(content, 'dgpad-export.txt');
}
```

## State Management

### Bridge State

```typescript
// El bridge MANTIENE estado (referencias a iframe)
// Pero NO debe mutar estado de la UI
private iframeReference: HTMLIFrameElement | null = null;
```

### UI State

```typescript
// La UI debe ser stateless o gestionada por Angular
// El bridge solo proporciona datos
@Component({...})
export class PropertiesPanelComponent {
  state: PropertyState | null = null;
  
  refresh() {
    this.state = this.bridge.getPropertyState();
  }
}
```

## Communication Flow Examples

### 1. Apertura de diálogo

```
Component.click() → Bridge.openNames() → iframe.eval() → $CANVAS.namesManager.show()
```

### 2. Actualización de propiedad

```
Component.change() → Bridge.updateProperty() → iframe.eval() → obj.setColor()
```

### 3. Exportación

```
Component.export() → Bridge.exportText() → iframe.eval() → downloadFile()
```

## Testing del Bridge

### Mock del iframe

```typescript
describe('DgpadBridgeService', () => {
  let service: DgpadBridgeService;
  
  beforeEach(() => {
    // Mockear iframe
    const mockIframe = {
      contentWindow: {
        dgpadBridge: {
          getPropertyState: () => ({ name: 'test', color: '#fff' })
        }
      }
    } as HTMLIFrameElement;
    
    spyOn(document, 'getElementById').and.returnValue(mockIframe);
    service = new DgpadBridgeService();
  });
});
```

### Integration test

```typescript
it('should update property correctly', () => {
  const mockBridge = jasmine.createSpyObj('bridge', ['updateProperty']);
  
  // Probar flujo completo
  service.updateProperty('color', '#ff0000');
});
```

## Errores Comunes

### ❌ Acceso directo al iframe

```typescript
// MAL
const iframe = document.getElementById('dgpad-legacy-frame');
iframe.contentWindow.eval('...');
```

### ❌ Lógica duplicada

```typescript
// MAL - Duplicar lógica de validación
if (!bridge?.getPropertyState) { throw... }
```

### ❌ No manejar null

```typescript
// MAL
const state = bridge.getPropertyState();
state.name; // ¡Error si es null!
```

### ✅ Correcto

```typescript
const state = bridge.getPropertyState();
if (!state) { return; }
console.log(state.name);
```

## Referencias

- Código legacy: `public/dgpad-legacy-host.html`
- Bridge service: `src/app/core/dgpad-bridge/dgpad-bridge.service.ts`
