# Comunicación con iframe (DGPad Legacy)

## Contexto

DGPad legacy corre en un iframe (`#dgpad-legacy-frame`) y se comunica con Angular mediante `postMessage` y llamadas directas a funciones JS.

## Estructura del Iframe

```html
<iframe
  id="dgpad-legacy-frame"
  src="/dgpad-legacy-host.html"
  frameborder="0"
></iframe>
```

## dgpad-legacy-host.html

Este archivo es el punto de entrada al legacy. Exponer la API de DGPad a Angular:

### Bridge Object

```javascript
window.dgpadBridge = {
  // Modos
  setMode: function(mode) { ... },
  
  // Propiedades
  getPropertyState: function() { ... },
  getGlobalPropertyState: function() { ... },
  
  // Actualizaciones
  updateProperty: function(property, value, applyAll) { ... },
  
  // Acciones
  openNames: function() { ... },
  closeNames: function() { ... },
  
  // Exportación
  exportText: function(options) { ... },
  
  // Historial
  saveHistorySnapshot: function() { ... },
  getHistoryEntries: function() { ... },
  
  // etc.
};
```

### withCanvas Helper

```javascript
function withCanvas(callback) {
  if (!window.$CANVAS) {
    console.error('DGPad todavía no está listo');
    return;
  }
  callback(window.$CANVAS);
}
```

## Comunicación Bidireccional

### Angular → Legacy

#### 1. Llamada directa (síncrona)

```typescript
// Bridge
bridge.setMode?.(1);
bridge.updateProperty?.('color', '#ff0000');
```

#### 2. Código JS eval (complex operations)

```typescript
// Bridge
runLegacyScript(`
  var canvas = $CANVAS;
  var obj = canvas.getConstruction().find("A");
  if (obj) obj.setColor(new Color(255, 0, 0));
  canvas.paint();
`);
```

#### 3. postMessage (asíncrona)

```typescript
// Angular → iframe
frame.contentWindow.postMessage({ action: 'get_SVG' }, '*');

// iframe → Angular
window.addEventListener('message', (event) => {
  if (event.data.startsWith('<?xml')) {
    handleSVG(event.data);
  }
});
```

### Legacy → Angular

#### postMessage

```javascript
// DGPad legacy
window.parent.postMessage({
  type: 'dgpad-widget-selection',
  selected: true
}, '*');
```

```typescript
// Angular Component
@HostListener('window:message', ['$event'])
handleMessage(event: MessageEvent) {
  if (event.data?.type === 'dgpad-widget-selection') {
    this.refresh();
  }
}
```

## Protocolos de Comunicación

### Protocolo 1: Get State

```
Angular: bridge.getPropertyState()
    ↓
Bridge: bridge.getPropertyState?.()
    ↓
iframe: canvas.propertiesManager.getCurrentObject()
    ↓
Response: { name, color, opacity, ... }
```

### Protocolo 2: Update Property

```
Angular: bridge.updateProperty('color', '#ff0000')
    ↓
Bridge: bridge.updateProperty?.('color', '#ff0000', false)
    ↓
iframe: obj.setColor(new Color(255, 0, 0))
    ↓
iframe: canvas.computeAll(); canvas.paint();
```

### Protocolo 3: Complex Operation

```
Angular: bridge.createAnyPoint('A')
    ↓
Bridge: runLegacyScript(`...new PointObject(...)`).
    ↓
iframe: eval(script) → PointObject created
    ↓
iframe: canvas.addObject(); canvas.compute(); canvas.paint();
```

### Protocolo 4: Event Notification

```
DGPad: user selects widget
    ↓
iframe: postMessage({ type: 'dgpad-widget-selection' })
    ↓
Angular: @HostListener('window:message')
    ↓
Component: refresh state
```

## Seguridad

### 1. Origin Validation

```typescript
@HostListener('window:message', ['$event'])
handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) {
    return; // Ignorar mensajes de otros origins
  }
  // Procesar
}
```

### 2. Type Checking

```typescript
if (typeof event.data === 'object' && event.data?.type) {
  switch (event.data.type) {
    case 'dgpad-widget-selection': this.handleWidgetSelection(event.data); break;
    case 'dgpad-calculator-state': this.handleCalculatorState(event.data); break;
  }
}
```

### 3. Error Handling

```typescript
try {
  const result = bridge.getPropertyState?.();
  if (result === undefined) {
    console.warn('bridge.getPropertyState no está definida');
  }
} catch (error) {
  console.error('Error getting property state:', error);
}
```

## Timing y Lifecycle

### iframe onload

```typescript
iframe.onload = () => {
  // El bridge ya está disponible
  const bridge = iframe.contentWindow?.dgpadBridge;
  if (bridge) {
    console.log('Bridge ready');
  }
};
```

### Wait for $CANVAS

```javascript
// DGPad legacy-host.html
function withCanvas(callback) {
  if (!window.$CANVAS) {
    setTimeout(() => withCanvas(callback), 100);
    return;
  }
  callback(window.$CANVAS);
}
```

### Initialization Order

```
1. Angular bootstraps
2. iframe loads /dgpad-legacy-host.html
3. DGPad loads (DGPad.js)
4. window.dgpadBridge created
5. Angular component mounts
6. Component calls bridge methods
```

## Debugging

### Console Logging

```typescript
// Bridge
private logCall(method: string, args: any[] = []) {
  console.log(`[Bridge] ${method}()`, args);
}

getPropertyState() {
  this.logCall('getPropertyState');
  return this.getLegacyBridge()?.getPropertyState?.();
}
```

### Verify iframe availability

```typescript
getLegacyBridge(): LegacyBridge | undefined {
  const frame = document.getElementById('dgpad-legacy-frame');
  if (!frame?.contentWindow) {
    console.error('[Bridge] iframe not found');
    return undefined;
  }
  
  if (!frame.contentWindow.dgpadBridge) {
    console.error('[Bridge] dgpadBridge not available');
    return undefined;
  }
  
  return frame.contentWindow.dgpadBridge;
}
```

## Common Patterns

### Pattern 1: State polling

```typescript
@HostListener('window:message', ['$event'])
handleMessage(event: MessageEvent) {
  if (event.data?.type === 'dgpad-calculator-state') {
    this.refresh(); // Poll state from bridge
  }
}

refresh(): void {
  this.state = this.bridge.getCalculatorState();
}
```

### Pattern 2: Batch operations

```typescript
updateMultipleProperties(updates: Record<string, any>): void {
  Object.entries(updates).forEach(([prop, value]) => {
    this.bridge.updateProperty(prop as any, value);
  });
}
```

### Pattern 3: Debounce rapid updates

```typescript
private updateSubject = new Subject<UpdateEvent>();
private subscription = this.updateSubject.pipe(
  debounceTime(100)
).subscribe(({ prop, value }) => {
  this.bridge.updateProperty(prop, value);
});

updateProperty(prop: string, value: any): void {
  this.updateSubject.next({ prop, value });
}
```

### Pattern 4: Promise-based bridge

```typescript
// Wrapper around legacy bridge
class BridgeWrapper {
  getPropertyState(): Promise<PropertyState | null> {
    return new Promise((resolve) => {
      const state = this.bridge.getPropertyState?.();
      resolve(state ?? null);
    });
  }
}
```

## Error Cases

### Case 1: iframe not loaded

```
Error: iframe contentWindow is null
Solution: Wait for iframe.onload before calling bridge
```

### Case 2: Bridge not ready

```
Error: dgpadBridge is undefined
Solution: Implement retry logic or show loading state
```

### Case 3: Canvas not ready

```
Error: $CANVAS is undefined
Solution: Use withCanvas helper in legacy-host.html
```

### Case 4: Legacy function not found

```
Error: canvas某种function is not a function
Solution: Check version compatibility, add fallback
```

## Best Practices

### ✅ Do

- Validate iframe before use
- Check bridge methods exist before calling
- Handle null/undefined responses
- Use postMessage for async operations
- Listen for events with @HostListener
- Log errors for debugging

### ❌ Don't

- Access iframe directly from components
- Call bridge methods before iframe loads
- Assume bridge methods exist (use ?. optional chaining)
- Forget to remove event listeners
- Log sensitive data
- Block UI thread waiting for legacy

## Reference

- Host file: `public/dgpad-legacy-host.html`
- Bridge service: `src/app/core/dgpad-bridge/dgpad-bridge.service.ts`
- Legacy scripts: `public/dgpad-legacy/scripts/`
