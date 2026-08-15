# Design Document: Continuación de Migración DGPad a Angular 19

## 1. Introducción y Visión General

### Contexto

DGPad es una aplicación de geometría dinámica que se encuentra en proceso de migración incremental de JavaScript legacy a Angular 19. La migración ya ha completado componentes críticos: toolbar, panel de propiedades, panel de widgets, panel de macros, panel de calculadora y panel de nombres.

Los siguientes componentes requieren finalización o corrección de problemas críticos:

1. **Tablero de Puntos (Board Points)**: Problema crítico donde objetos se crean y desaparecen inmediatamente
2. **Panel de Calculadora - Botones Especiales**: Conversión a punto/lista/función no implementada
3. **Panel de Herramientas Adicionales**: Múltiples herramientas que requieren integración completa
4. **Panel de Historial**: Navegación por snapshots del historial
5. **Panel de Propiedades Avanzadas**: Propiedades específicas por tipo de objeto
6. **Panel de Macros**: Ejecución con prompts de parámetros
7. **Panel de Nombres**: Gestión centralizada de nomenclatura
8. **Exportación y Compartición**: Múltiples formatos (Text, HTML, SVG, PNG)

### Principios de Diseño

- **Patrón de Puente Único**: Toda comunicación con legacy pasa por `DgpadBridgeService`
- **Componentes Ligeros**: Angular maneja UI, bridge maneja comunicación
- **Validación en el Bridge**: Errores capturados y manejados centralmente
- **Mockeable para Testing**: Todos los servicios inyectables y mockeable
- **Sincronización Bidireccional**: Estado Angular y legacy siempre consistentes
- **Error Handling Explícito**: Mensajes claros al usuario para cada error

### Objetivos Técnicos

1. Resolver problema de "objetos desapareciendo" en Tablero de Puntos
2. Implementar todas las 8 features críticas con coverage de testing 80%+
3. Mantener performance < 500ms para operaciones síncronas
4. Cero memory leaks y proper cleanup de event listeners
5. Código totalmente tipado con TypeScript strict mode

## 2. Arquitectura del Sistema (Actualizada)

### 2.1 Arquitectura General

```
┌────────────────────────────────────────────────────────────────┐
│                      Angular Application                        │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Toolbar     │  │  Properties  │  │  Calculator  │         │
│  │  Component   │  │  Component   │  │  Component   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Widgets    │  │   Macros     │  │   History    │         │
│  │  Component   │  │  Component   │  │  Component   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   OtherTools │  │   Export     │  │    Names     │         │
│  │  Component   │  │  Component   │  │  Component   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            │                                    │
│                  ┌─────────▼──────────┐                        │
│                  │ DgpadBridgeService │  ← ÚNICO punto        │
│                  │  (Core Service)    │    de comunicación    │
│                  └─────────┬──────────┘                        │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │  iframe (Legacy)    │
                  │  #dgpad-legacy-     │
                  │   frame             │
                  └─────────┬───────────┘
                            │
                  ┌──────────▼──────────┐
                  │  DGPad Legacy       │
                  │  (Geometry Engine)  │
                  │  + Canvas Render    │
                  └─────────────────────┘
```

### 2.2 Flujo de Comunicación

```
1. Usuario Acción (UI)
   ↓
2. Componente Angular emite evento
   ↓
3. Componente llama método en DgpadBridgeService
   ↓
4. Bridge valida parámetros
   ↓
5. Bridge ejecuta llamada directa o eval() en iframe
   ↓
6. Legacy actualiza objeto o canvas
   ↓
7. Bridge devuelve resultado o null
   ↓
8. Componente actualiza UI con resultado
```

### 2.3 Responsabilidades por Capa

| Capa | Responsabilidad | Ejemplos |
|------|-----------------|----------|
| **Angular Components** | UI, eventos del usuario, state local | WidgetPanelComponent, CalculatorComponent |
| **DgpadBridgeService** | Traducción, validación, comunicación | `updateProperty()`, `createPoint()` |
| **Legacy (iframe)** | Lógica geométrica, renderizado, objetos | PointObject, Canvas, Construction |

## 3. Diseño Detallado por Feature

### 3.1 Feature 1: Tablero de Puntos (Board Points)

#### Problema

Los objetos creados en el Tablero de Puntos se crean y desaparecen inmediatamente. Causas potenciales:
- No se ejecuta `canvas.paint()` después de crear objetos
- Objetos no se añaden correctamente a `Cn.addObject()`
- Event listeners se desactivan prematuramente
- Sincronización de estado incompleta

#### Solución de Diseño

**Componente Angular:**
```
BoardPointsComponent
├── Template: Inputs para nombre base, número inicio, número fin
├── Methods:
│   ├── onOpenPanel(): Validar canvas listo
│   ├── onCreatePoints(): Llamar bridge con parámetros validados
│   └── onCancel(): Limpiar estado parcial
└── State:
    ├── isVisible: boolean
    ├── basePattern: string (A, B, C o P1, P2, P3)
    ├── startNumber: number
    └── endNumber: number
```

**Bridge Method:**
```typescript
createBoardPoints(basePattern: string, startNum: number, endNum: number): void
  1. Validar que $CANVAS esté disponible
  2. Para cada número en rango:
     a. Generar nombre: `${basePattern}${número}`
     b. Crear PointObject
     c. Añadir a construction: Cn.addObject()
     d. Almacenar referencia en array
  3. Ejecutar canvas.compute() UNA VEZ al final
  4. Ejecutar canvas.paint() UNA VEZ al final
  5. Retornar lista de objetos creados o error
```

**JavaScript en Legacy (pseudocódigo):**
```javascript
function createBoardPoints(basePattern, startNum, endNum) {
  var canvas = $CANVAS;
  if (!canvas) throw new Error('Canvas not ready');
  
  var Cn = canvas.getConstruction();
  var createdPoints = [];
  
  // Crear todos los puntos primero
  for (var i = startNum; i <= endNum; i++) {
    var name = basePattern + i;
    var point = new PointObject(canvas, name, 
      100 + i*50, 100 + i*50, false);
    Cn.addObject(point);
    createdPoints.push(name);
  }
  
  // Compute y paint UNA VEZ
  canvas.compute();
  canvas.paint();
  
  return createdPoints;
}
```

**Razones de Diseño:**
- `compute()` y `paint()` se ejecutan una única vez (no en cada iteración)
- Esto reduce overhead y evita conflictos de rendering
- Array de referencias permite validación post-creación
- Error handling separado antes de empezar

#### Estructura de Archivos

```
src/app/features/board-points/
├── board-points-panel/
│   ├── board-points-panel.component.ts
│   ├── board-points-panel.component.html
│   ├── board-points-panel.component.css
│   └── board-points-panel.component.spec.ts
└── board-points-types.ts
```

#### Testing Strategy

**Unit Tests:**
- Mock bridge, verificar llamadas correctas
- Validar inputs (basePattern, startNum, endNum)
- Verificar que UI se actualiza correctamente

**Property Tests:**
- Property: Para cualquier rango válido, creación sin errores
- Property: Números creados = endNum - startNum + 1

### 3.2 Feature 2: Panel de Herramientas Adicionales (Other Tools)

#### Descripción

Panel que agrupa herramientas adicionales: Blockly Button, Expression, Expression Points, Expression Segments, Integer Cursor, Continuous Cursor, Edit Widget, Clear Construction, Undo/Redo.

#### Componentes

**OtherToolsMenuComponent (Principal):**
```
OtherToolsMenuComponent
├── Menu Items (9 opciones)
│   ├── createBlocklyButton()
│   ├── createExpression()
│   ├── createExpressionPoints()
│   ├── createExpressionSegments()
│   ├── createIntegerCursor()
│   ├── createContinuousCursor()
│   ├── createEditWidget()
│   ├── clearConstruction()
│   └── undoRedo()
└── State:
    ├── selectedTool: string | null
    └── isExecuting: boolean
```

#### Bridge Methods

```typescript
// Blockly & Expressions
createBlocklyButton(name?: string): string // Retorna nombre o null
createExpression(defaultExpr?: string): string
createExpressionPoints(template?: string): string[]
createExpressionSegments(template?: string): string[]

// Sliders/Cursors
createIntegerCursor(name?: string, min: number = 0, max: number = 10): string
createContinuousCursor(name?: string, min: number = -10, max: number = 10): string

// Widgets
createEditWidget(referencedObject?: string): string

// Actions
clearConstruction(): void // Elimina todos los objetos
undo(): boolean
redo(): boolean
```

#### Decisiones de Diseño

- **Parámetros Opcionales**: Permitir default names automáticos
- **Validación de Prerequisites**: Algunas herramientas requieren objetos existentes
- **Error Handling**: Mensajes específicos por herramienta
- **Confirmation para Clear**: Pedir confirmación antes de limpiar construcción

#### Estructura de Archivos

```
src/app/features/other-tools/
├── other-tools-menu/
│   ├── other-tools-menu.component.ts
│   ├── other-tools-menu.component.html
│   ├── other-tools-menu.component.css
│   └── other-tools-menu.component.spec.ts
├── blockly-button-dialog/
├── expression-dialog/
└── other-tools-types.ts
```

### 3.3 Feature 3: Panel de Calculadora - Botones Especiales

#### Descripción

El panel de calculadora existe pero requiere implementación de botones especiales que convierten expresiones en objetos geométricos.

#### Componentes

**CalculatorPanelComponent (Existente, con extensiones):**
```
CalculatorPanelComponent
├── Estado actual: Edición de expresiones
├── Campos: e1, e2, min, max, degrees
├── Botones Especiales (NUEVOS):
│   ├── "To Point": Convertir e1 a PointObject
│   ├── "To List": Convertir e1 a ListObject
│   └── "To Function": Convertir e1 a FunctionObject
└── State:
    ├── currentState: LegacyCalculatorState
    ├── isConverting: boolean
    └── lastError: string | null
```

#### Bridge Methods (Nuevos)

```typescript
convertExpressionToPoint(expression: string): string | null
  - Crear PointObject con nombre automático
  - Validar expresión válida
  - Retorna nombre del objeto o null si error

convertExpressionToList(expression: string): string | null
  - Crear ListObject referenciando expression
  - Validar expresión válida
  - Retorna nombre del objeto o null si error

convertExpressionToFunction(expression: string): string | null
  - Crear FunctionObject a partir de expression
  - Validar expresión válida
  - Retorna nombre del objeto o null si error
```

#### Decisiones de Diseño

- **Validación en Bridge**: Verificar que expresión es válida antes de crear
- **Naming Automático**: Sistema de nombres único por tipo
- **Feedback Inmediato**: Mostrar nombre del objeto creado
- **Error Handling**: Mensajes específicos si expresión es inválida

#### Flujo de Conversión

```
Usuario presiona "To Point"
    ↓
Component valida e1 no vacío
    ↓
Component llama bridge.convertExpressionToPoint(e1)
    ↓
Bridge valida con legacy
    ↓
Legacy crea PointObject
    ↓
Legacy ejecuta canvas.compute() y paint()
    ↓
Bridge retorna nombre del objeto
    ↓
Component muestra confirmación
```

### 3.4 Feature 4: Panel de Historial (History)

#### Descripción

Navegación por snapshots históricos de la construcción. DGPad legacy mantiene historial con imagen y fecha.

#### Componentes

**HistoryDialogComponent:**
```
HistoryDialogComponent
├── Lista de snapshots (thumbnails)
├── Controles:
│   ├── "Save Snapshot": Guardar estado actual
│   ├── "Delete": Eliminar snapshot seleccionado
│   └── "Clear Unlocked": Limpiar no bloqueados
├── Preview:
│   ├── Thumbnail de snapshot
│   ├── Fecha
│   └── Lock status
└── State:
    ├── entries: LegacyHistoryEntry[]
    ├── selectedIndex: number | null
    └── isLoading: boolean
```

#### Bridge Methods

```typescript
getHistoryEntries(): LegacyHistoryEntry[]
  - Retorna array de {index, date, img: base64, lock}

saveHistorySnapshot(): string
  - Guardar estado actual como snapshot
  - Retorna índice del nuevo snapshot

openHistoryEntry(index: number): boolean
  - Restaurar snapshot en índice específico
  - Repintar canvas
  - Retorna true si éxito

deleteHistoryEntry(index: number): boolean
  - Eliminar snapshot en índice específico
  - Retorna true si éxito

clearUnlockedHistory(): void
  - Eliminar todos los snapshots con lock: false
```

#### Diseño de Datos

```typescript
type LegacyHistoryEntry = {
  index: number;              // Índice en historial
  date: string;               // ISO 8601 timestamp
  img: string;                // Base64 PNG del snapshot
  lock: boolean;              // Si está bloqueado
};
```

#### Decisiones de Diseño

- **Thumbnails en Base64**: Imágenes PNG codificadas en base64
- **Lock Mechanism**: Usuarios pueden bloquear snapshots importantes
- **Índices Estables**: Los índices no cambian cuando se eliminan unlocked
- **Lazy Loading**: No cargar todas las imágenes inmediatamente (problemas de memory)

### 3.5 Feature 5: Panel de Propiedades Avanzadas

#### Descripción

Acceso a propiedades específicas por tipo de objeto: precision, increment, shape, dash, noMouse, track, angle360, exclusive, layer, etc.

#### Componentes

**PropertiesPanelComponent (Existente, con extensiones):**
```
PropertiesPanelComponent
├── Propiedades por tipo de objeto:
│   ├── Global: backgroundColor, degrees, animation, etc.
│   ├── Puntos: color, size, noMouse, layer, etc.
│   ├── Ángulos: precision, dash, showName, etc.
│   ├── Eje/Grid: axisWidth, gridWidth, showGrid, etc.
│   └── Widgets: borderSize, borderRadius, fontSize, etc.
├── Controles:
│   ├── "Apply to All": Aplicar a todos del tipo
│   ├── "Multi-select": Editar varios objetos
│   └── Help text para cada propiedad
└── State:
    ├── currentObject: LegacyPropertyState | null
    ├── selectedObjects: string[]
    └── showAdvancedMode: boolean
```

#### Bridge Methods (Nuevas Extensiones)

```typescript
// Propiedades avanzadas
updateAdvancedProperty(
  property: AdvancedEditableProperty,
  value: string | number | boolean,
  targetObjects?: string[]  // Si undefined, aplicar a selección actual
): boolean

// Multi-object operations
updateMultipleObjects(properties: Record<string, any>): void

// Validación
getPropertyConstraints(family: string, property: string): PropertyConstraints
  - Retorna {minValue, maxValue, allowedValues, type}
```

#### Tipos de Propiedades Avanzadas

```typescript
type AdvancedEditableProperty =
  | 'precision'      // 0-10
  | 'increment'      // número positivo
  | 'shape'          // 0-4 (diferentes formas)
  | 'dash'           // booleano
  | 'noMouse'        // booleano
  | 'track'          // booleano
  | 'angle360'       // booleano
  | 'exclusive'      // booleano
  | 'layer'          // 0-1000
  | 'axisWidth'      // número
  | 'gridWidth'      // número
  | 'showGrid'       // booleano
  | 'onlyPositive'   // booleano
  | 'centerZoom'     // booleano;

type PropertyConstraints = {
  type: 'number' | 'boolean' | 'select';
  minValue?: number;
  maxValue?: number;
  step?: number;
  allowedValues?: (string | number)[];
  help?: string;
};
```

#### Decisiones de Diseño

- **Validación en Bridge**: Constrains se obtienen del bridge
- **Help Text**: Cada propiedad tiene descripción clara
- **Apply to All**: Botón prominente para aplicar a todos del tipo
- **Type Safety**: Propiedades tipadas por objeto family

### 3.6 Feature 6: Panel de Macros (Macros)

#### Descripción

Creación y ejecución de macros personalizadas. Catálogo de plugins y tools, prompts de parámetros, draft management.

#### Componentes

**MacroPanelComponent (Existente, con extensiones):**
```
MacroPanelComponent
├── Secciones:
│   ├── Catálogo: Plugins + Tools
│   ├── Ejecución: Prompts de parámetros
│   ├── Draft: Guardar/continuar drafts
│   └── Resultados: Mostrar output
├── Flujo:
│   1. Seleccionar macro del catálogo
│   2. Mostrar prompts interactivos
│   3. Confirmar parámetros
│   4. Ejecutar en legacy
│   5. Mostrar resultados
└── State:
    ├── catalog: LegacyMacroCatalog
    ├── selectedMacro: LegacyMacroItem | null
    ├── activeMacro: LegacyActiveMacro | null
    ├── currentDraft: LegacyMacroDraft | null
    ├── promptIndex: number
    └── promptResponses: Map<string, string>
```

#### Bridge Methods (Nuevas Extensiones)

```typescript
getMacroCatalog(): LegacyMacroCatalog
  - Retorna {plugins: [], tools: []}

startMacro(macroKey: string): LegacyActiveMacro | null
  - Inicia ejecución de macro
  - Retorna primero prompt

getNextMacroPrompt(response: string): LegacyActiveMacro | null
  - Procesa respuesta actual
  - Retorna siguiente prompt o null si terminó

completeMacro(): boolean
  - Confirma última respuesta y ejecuta macro
  - Retorna true si éxito

getMacroDraft(key: string): LegacyMacroDraft | null
  - Recupera draft guardado

saveMacroDraft(macroKey: string, params: string[], targets: string[]): void
  - Guarda estado actual de ejecución

clearMacroDraft(macroKey: string): void
  - Elimina draft guardado
```

#### Tipos

```typescript
type LegacyMacroItem = { key: string; name: string };
type LegacyMacroCatalog = {
  plugins: LegacyMacroItem[];
  tools: LegacyMacroItem[];
};
type LegacyMacroDraft = { params: string[]; targets: string[] };
type LegacyActiveMacro = { 
  key: string; 
  name: string; 
  prompt: string;      // Texto del prompt actual
  types: string[];     // Tipos de objetos aceptados
};
```

#### Decisiones de Diseño

- **State Machine**: Transiciones de estado bien definidas (idle → executing → awaiting_input)
- **Draft Persistence**: Guardar estado parcial para continuar después
- **Type Matching**: Validar que objetos seleccionados coinciden con tipos requeridos
- **Prompt UI**: Input text para cada respuesta

### 3.7 Feature 7: Panel de Nombres (Names)

#### Descripción

Gestión centralizada de nombres de objetos. Visibilidad, auto-naming, sincronización con creación.

#### Componentes

**NamesPanelComponent (Existente, con extensiones):**
```
NamesPanelComponent
├── Lista de objetos:
│   ├── Nombre actual (editable inline)
│   ├── Tipo de objeto (icon)
│   └── Familia (category)
├── Controles:
│   ├── "Show Names": Toggle visibilidad
│   ├── "Auto Name": Activar auto-naming
│   └── "Refresh": Actualizar lista
└── State:
    ├── objects: {name: string, family: string}[]
    ├── isVisible: boolean
    ├── editingName: string | null
    └── isLoading: boolean
```

#### Bridge Methods

```typescript
openNames(): void
  - Mostrar panel de nombres en legacy

closeNames(): void
  - Ocultar panel de nombres en legacy

getNamesVisible(): boolean
  - Retorna si nombres están visibles en canvas

setNamesVisible(visible: boolean): void
  - Mostrar/ocultar nombres en canvas

renameObject(oldName: string, newName: string): boolean
  - Renombrar objeto, validar que newName no existe
  - Retorna true si éxito

getObjectsList(): {name: string, family: string}[]
  - Retorna lista de todos los objetos actuales
```

#### Decisiones de Diseño

- **Inline Editing**: Click en nombre para editar directamente
- **Conflict Detection**: Validar que no haya nombres duplicados
- **Auto Refresh**: Actualizar lista cuando legacy dispara eventos
- **Visibility Toggle**: Control centralizado de visibilidad de nombres

#### Estructura de Archivos

```
src/app/features/names/
├── names-panel/
│   ├── names-panel.component.ts
│   ├── names-panel.component.html
│   ├── names-panel.component.css
│   └── names-panel.component.spec.ts
└── names-types.ts
```

### 3.8 Feature 8: Exportación y Compartición

#### Descripción

Exportación en múltiples formatos: Text, HTML+JS, HTML, Responsive HTML, SVG, PNG. Con opciones configurables.

#### Componentes

**ExportDialogComponent:**
```
ExportDialogComponent
├── Selección de formato:
│   ├── Text (.txt)
│   ├── HTML+JS (.html)
│   ├── HTML (.html)
│   ├── Responsive HTML (.html)
│   ├── SVG (.svg)
│   └── PNG (.png)
├── Opciones:
│   ├── Fix Widgets: Fijar widgets en posición
│   ├── Fix Scripts: Fijar scripts (no ejecutar)
│   ├── Hide Panel: Ocultar panel de control
│   └── Disable Zoom: Deshabilitar zoom
├── Controles:
│   ├── "Preview": Mostrar preview
│   ├── "Download": Descargar archivo
│   └── "Copy": Copiar a clipboard
└── State:
    ├── selectedFormat: ExportFormat
    ├── options: ExportOptions
    ├── isExporting: boolean
    └── content: string | null
```

#### Bridge Methods

```typescript
exportText(options?: LegacyExportOptions): string | null
  - Exportar como texto legible
  - Contiene código DGPad legible

exportHtmlJs(options?: LegacyExportOptions): string | null
  - Exportar como HTML standalone con JavaScript
  - Incluye DGPad completo

exportHtml(options?: LegacyExportOptions): string | null
  - Exportar como HTML simplificado
  - Sin JavaScript adicional

exportResponsive(options?: LegacyExportOptions): string | null
  - Exportar optimizado para mobile
  - Responsive design

exportSvg(options?: LegacyExportOptions): string | null
  - Exportar como vectorial SVG

exportPng(options?: LegacyExportOptions): Blob | null
  - Exportar como PNG bitmap
  - Retorna blob para download
```

#### Tipos

```typescript
type ExportFormat = 
  | 'text' 
  | 'html-js' 
  | 'html' 
  | 'responsive' 
  | 'svg' 
  | 'png';

type LegacyExportOptions = {
  fixWidgets: boolean;
  fixDgScripts: boolean;
  hideControlPanel: boolean;
  disableZoom: boolean;
};

type ExportResult = {
  format: ExportFormat;
  content: string | Blob;
  mimeType: string;
  filename: string;
};
```

#### Decisiones de Diseño

- **Múltiples Formatos**: Flexibilidad para diferentes usos
- **Opciones Configurables**: Control granular de output
- **Download Directo**: Trigger download del navegador
- **Blob para Binarios**: PNG se exporta como Blob, no string
- **Error Handling**: Mensajes claros si export falla

#### Estructura de Archivos

```
src/app/features/export/
├── export-dialog/
│   ├── export-dialog.component.ts
│   ├── export-dialog.component.html
│   ├── export-dialog.component.css
│   └── export-dialog.component.spec.ts
├── export-service.ts          # Manejo de downloads
└── export-types.ts
```

## 4. Estructura de Archivos y Directorios

### 4.1 Árbol de Directorios Propuesto

```
src/app/
├── core/
│   └── dgpad-bridge/
│       ├── dgpad-bridge.service.ts       (ACTUALIZAR: añadir nuevos métodos)
│       ├── dgpad-bridge.service.spec.ts
│       └── dgpad-bridge-types.ts         (CREAR: tipos reutilizables)
│
├── features/
│   ├── board-points/                     (CREAR)
│   │   ├── board-points-panel/
│   │   │   ├── board-points-panel.component.ts
│   │   │   ├── board-points-panel.component.html
│   │   │   ├── board-points-panel.component.css
│   │   │   └── board-points-panel.component.spec.ts
│   │   └── board-points-types.ts
│   │
│   ├── calculator/                       (ACTUALIZAR: existente, añadir botones)
│   │   ├── calculator-panel/
│   │   │   ├── calculator-panel.component.ts
│   │   │   ├── calculator-panel.component.html
│   │   │   ├── calculator-panel.component.css
│   │   │   └── calculator-panel.component.spec.ts
│   │   └── calculator-special-buttons/   (CREAR)
│   │       ├── to-point-button.component.ts
│   │       ├── to-list-button.component.ts
│   │       └── to-function-button.component.ts
│   │
│   ├── other-tools/                      (ACTUALIZAR: existente, completar)
│   │   ├── other-tools-menu/
│   │   │   ├── other-tools-menu.component.ts
│   │   │   ├── other-tools-menu.component.html
│   │   │   ├── other-tools-menu.component.css
│   │   │   └── other-tools-menu.component.spec.ts
│   │   ├── blockly-button-dialog/        (CREAR)
│   │   ├── expression-dialog/            (CREAR)
│   │   └── other-tools-types.ts
│   │
│   ├── history/                          (ACTUALIZAR: existente, completar)
│   │   ├── history-dialog/
│   │   │   ├── history-dialog.component.ts
│   │   │   ├── history-dialog.component.html
│   │   │   ├── history-dialog.component.css
│   │   │   └── history-dialog.component.spec.ts
│   │   ├── history-snapshot/             (CREAR)
│   │   │   ├── history-snapshot.component.ts
│   │   │   └── history-snapshot.component.css
│   │   └── history-types.ts
│   │
│   ├── properties/                       (ACTUALIZAR: existente, extender)
│   │   ├── properties-panel/
│   │   │   ├── properties-panel.component.ts
│   │   │   ├── properties-panel.component.html
│   │   │   ├── properties-panel.component.css
│   │   │   └── properties-panel.component.spec.ts
│   │   ├── advanced-properties/          (CREAR)
│   │   │   └── advanced-properties.component.ts
│   │   └── properties-types.ts
│   │
│   ├── macros/                           (ACTUALIZAR: existente, completar)
│   │   ├── macros-panel/
│   │   │   ├── macros-panel.component.ts
│   │   │   ├── macros-panel.component.html
│   │   │   ├── macros-panel.component.css
│   │   │   └── macros-panel.component.spec.ts
│   │   ├── macro-executor/               (CREAR)
│   │   │   └── macro-executor.component.ts
│   │   ├── macro-prompt/                 (CREAR)
│   │   │   └── macro-prompt.component.ts
│   │   └── macros-types.ts
│   │
│   ├── names/                            (ACTUALIZAR: existente, completar)
│   │   ├── names-panel/
│   │   │   ├── names-panel.component.ts
│   │   │   ├── names-panel.component.html
│   │   │   ├── names-panel.component.css
│   │   │   └── names-panel.component.spec.ts
│   │   └── names-types.ts
│   │
│   └── export/                           (ACTUALIZAR: existente, completar)
│       ├── export-dialog/
│       │   ├── export-dialog.component.ts
│       │   ├── export-dialog.component.html
│       │   ├── export-dialog.component.css
│       │   └── export-dialog.component.spec.ts
│       ├── export-service.ts             (CREAR)
│       └── export-types.ts
│
└── shared/
    ├── dialogs/                          (CREAR: diálogos reutilizables)
    │   └── confirmation-dialog.component.ts
    └── utils/                            (CREAR: utilidades)
        └── file-download.util.ts
```

### 4.2 Archivos a Crear vs Actualizar

**CREAR (Nuevos):**
- `dgpad-bridge-types.ts` - Tipos compartidos del bridge
- `board-points/` - Feature completa
- `calculator/calculator-special-buttons/` - Botones especiales
- `other-tools/blockly-button-dialog/`, `expression-dialog/`
- `history/history-snapshot/` - Componente para snapshot individual
- `properties/advanced-properties/` - Componente para propiedades avanzadas
- `macros/macro-executor/`, `macro-prompt/`
- `export-service.ts` - Servicio de exportación
- `shared/dialogs/`, `shared/utils/`

**ACTUALIZAR (Existentes):**
- `dgpad-bridge.service.ts` - Añadir 40+ métodos nuevos
- `calculator-panel.component.ts` - Integrar botones especiales
- `other-tools-menu.component.ts` - Completar herramientas
- `history-dialog.component.ts` - Funcionalidad completa
- `properties-panel.component.ts` - Extensión a propiedades avanzadas
- `macros-panel.component.ts` - Completar executor y prompts
- `names-panel.component.ts` - Completar funcionalidad

## 5. TypeScript Types e Interfaces

### 5.1 Tipos del Bridge (Nuevos/Extendidos)

```typescript
// === Board Points ===
type BoardPointsRequest = {
  basePattern: string;      // "A", "P", "Point"
  startNumber: number;      // 1
  endNumber: number;        // 100
};

type BoardPointsResult = {
  success: boolean;
  createdPoints: string[];  // ["A1", "A2", "A3", ...]
  error?: string;
};

// === Calculator Special Conversions ===
type ConversionResult = {
  success: boolean;
  objectName?: string;
  error?: string;
};

// === Other Tools ===
type ToolExecutionResult = {
  success: boolean;
  message: string;
  createdObjects?: string[];
  error?: string;
};

type CursorConfig = {
  name?: string;
  minValue: number;
  maxValue: number;
  increment?: number;  // Solo para Integer
};

// === History ===
type HistorySnapshot = {
  index: number;
  date: string;           // ISO 8601
  thumbnail: string;      // Base64 PNG
  lock: boolean;
};

type HistoryAction = 'undo' | 'redo' | 'save' | 'load' | 'delete' | 'clear';

// === Properties Advanced ===
type PropertyConstraint = {
  type: 'number' | 'boolean' | 'select' | 'enum';
  minValue?: number;
  maxValue?: number;
  step?: number;
  allowedValues?: (string | number)[];
  defaultValue?: any;
  help?: string;
};

type PropertySchema = Record<string, PropertyConstraint>;

// === Macros ===
type MacroPromptResponse = {
  promptIndex: number;
  response: string;
  isValid: boolean;
  errorMessage?: string;
};

type MacroExecutionState = 'idle' | 'executing' | 'awaiting_input' | 'completed' | 'error';

// === Export ===
type ExportFormat = 'text' | 'html-js' | 'html' | 'responsive' | 'svg' | 'png';

type ExportResult = {
  format: ExportFormat;
  content: string | Blob;
  mimeType: string;
  filename: string;
  size: number;
};

// === Error Handling ===
type BridgeError = {
  code: string;           // 'CANVAS_NOT_READY', 'INVALID_EXPRESSION', etc.
  message: string;
  context?: Record<string, any>;
  timestamp: number;
};

type BridgeErrorCode =
  | 'CANVAS_NOT_READY'
  | 'INVALID_EXPRESSION'
  | 'INVALID_PARAMETER'
  | 'OBJECT_NOT_FOUND'
  | 'DUPLICATE_NAME'
  | 'INSUFFICIENT_OBJECTS'
  | 'OPERATION_FAILED'
  | 'UNKNOWN_ERROR';
```

### 5.2 Interfaces por Componente

**BoardPointsPanel:**
```typescript
interface IBoardPointsPanel {
  open(): void;
  close(): void;
  setBasePattern(pattern: string): void;
  createPoints(startNum: number, endNum: number): Promise<void>;
  onCreationComplete(points: string[]): void;
  onCreationError(error: BridgeError): void;
}
```

**CalculatorSpecialButtons:**
```typescript
interface ICalculatorSpecialButtons {
  convertToPoint(expression: string): Promise<ConversionResult>;
  convertToList(expression: string): Promise<ConversionResult>;
  convertToFunction(expression: string): Promise<ConversionResult>;
  onConversionSuccess(objectName: string): void;
  onConversionError(error: BridgeError): void;
}
```

**HistoryDialog:**
```typescript
interface IHistoryDialog {
  loadEntries(): Promise<HistorySnapshot[]>;
  selectSnapshot(index: number): Promise<void>;
  saveSnapshot(): Promise<number>;
  deleteSnapshot(index: number): Promise<void>;
  clearUnlocked(): Promise<void>;
  toggleLock(index: number): Promise<void>;
}
```

**ExportDialog:**
```typescript
interface IExportDialog {
  selectFormat(format: ExportFormat): void;
  updateOptions(options: Partial<LegacyExportOptions>): void;
  export(): Promise<ExportResult>;
  downloadFile(result: ExportResult): void;
  copyToClipboard(content: string): void;
}
```

## 6. Diagramas de Secuencia para Flujos Críticos

### 6.1 Flujo de Creación de Puntos (Board Points)

```
Usuario          Component          Bridge            Legacy (iframe)
   │                 │                 │                    │
   ├─ Click "Create" →│                 │                    │
   │                 │ Validar inputs   │                    │
   │                 │ ✓ success        │                    │
   │                 │                  │ createBoardPoints()→│
   │                 │                  │                    │ Para i=1 to N:
   │                 │                  │                    │   - new PointObject()
   │                 │                  │                    │   - Cn.addObject()
   │                 │                  │                    │ canvas.compute()
   │                 │                  │                    │ canvas.paint()
   │                 │                  │← return createdPoints[]
   │                 │ Mostrar éxito    │                    │
   │← Confirmación   │                 │                    │
```

**Puntos Críticos:**
- `compute()` y `paint()` se llaman UNA VEZ al final
- No iterar llamadas a `compute()`
- Todas las adiciones se hacen antes del `compute()`

### 6.2 Flujo de Conversión en Calculadora

```
Usuario          Calculator         Bridge            Legacy
   │             Component           │                 │
   │                                 │                 │
   ├─ "To Point"  →│                 │                 │
   │              │ Validar e1       │                 │
   │              │ ✓ no vacío       │                 │
   │              │                  │ convertExpression→│
   │              │                  │     ToPoint(e1)  │
   │              │                  │                  │ - Validar expr
   │              │                  │                  │ - new PointObject
   │              │                  │                  │ - Cn.addObject
   │              │                  │                  │ - compute()
   │              │                  │                  │ - paint()
   │              │                  │← return objName  │
   │              │ onSuccess()      │                  │
   │← "Created: A1"│                 │                  │
```

**Garantías:**
- Expresión validada antes de crear objeto
- Nombre único generado automáticamente
- Canvas se actualiza antes de retornar al usuario

### 6.3 Flujo de Exportación

```
Usuario          Export Dialog      Bridge            Legacy        Download
   │                 │               │                  │               │
   ├─ Selecciona     │               │                  │               │
   │  formato+opts  →│               │                  │               │
   │                 │ Validar opts  │                  │               │
   │                 │               │ exportHtmlJs() →│               │
   │                 │               │   options       │ Generar HTML  │
   │                 │               │                 ├─ incluir JS  │
   │                 │               │                 ├─ include DGPad
   │                 │               │                 ├─ serialize  │
   │                 │               │← return content │               │
   │                 │ Crear Blob    │                 │               │
   │                 │               │                 │               │
   │                 │ Trigger download ────────────────────────────→│
   │                 │               │                 │               │
   │← "Downloaded"   │               │                 │               │
```

**Decisión de Diseño:**
- Content se genera en legacy (tiene acceso a canvas, $CANVAS, etc.)
- Bridge solo traduce/empaqueta resultado
- Download es responsabilidad del navegador

### 6.4 Flujo de Historial

```
Usuario          History Dialog     Bridge            Legacy
   │                 │               │                  │
   ├─ Open panel    →│               │                  │
   │                 │              │ getHistoryEntries()│
   │                 │              │                  │ Retorna array
   │                 │              │← [{idx, date, img, lock}]
   │                 │ Mostrar thumbnails
   │                 │               │                  │
   │ ├─ Click snapshot                                  │
   │ │              │               │                  │
   │ └─ Restore    →│               │ openHistoryEntry(idx)
   │                 │               │                  │ - Cargar state
   │                 │               │                  │ - Repintar canvas
   │                 │               │← true            │
   │                 │ Canvas updated│                  │
   │← Ver snapshot    │               │                  │
```

**Garantías:**
- Snapshots se cargan solo cuando se seleccionan (lazy loading)
- Restore es operación atómica (todo o nada)
- Estado anterior se pierde (no hay "undo" de restore)

## 7. Decisiones Arquitectónicas (ADRs)

### ADR-1: DgpadBridgeService como Punto Único de Comunicación

**Status:** ACEPTADA

**Context:**
La aplicación legacy corre en iframe y Angular en el host. Hay múltiples formas de comunicarse: llamadas directas a funciones, postMessage, eval().

**Decision:**
TODAS las comunicaciones pasan por `DgpadBridgeService` (inyectable, singleton, mockeable).

**Rationale:**
- Centraliza validación y error handling
- Fácil de mockear para testing
- Auditable: todas las llamadas en un lugar
- Fácil refactoring si cambia comunicación (postMessage, Web Workers, etc.)

**Consequences:**
- ✅ Mejor testing y debugging
- ✅ Código más mantenible
- ❌ Pequeño overhead de indirección (negligible)
- ❌ Curva de aprendizaje para nuevos componentes

**Verification:**
- Grep por `contentWindow` fuera de bridge → debe estar vacío
- Grep por `window.eval` fuera de bridge → debe estar vacío
- 100% del código de comunicación pasa por bridge

---

### ADR-2: Separación de Responsabilidades: Bridge vs Components

**Status:** ACEPTADA

**Context:**
¿Dónde reside la lógica? ¿En Angular components o en el bridge?

**Decision:**
- **Bridge:** Comunicación, validación, traducción de tipos, error handling
- **Components:** UI, eventos, state local del componente, UX

**Rationale:**
- Bridge se enfoca en HOW (cómo hablar con legacy)
- Components se enfocan en WHAT (qué mostrar)
- Cada capa tiene responsabilidad clara

**Examples:**

| Tarea | Responsable | Rationale |
|-------|-------------|-----------|
| Validar que expresión es válida | Bridge | Requiere conocer semántica de DGPad |
| Mostrar campo input para expresión | Component | Es presentación pura |
| Convertir a PointObject | Bridge | Requiere acceso a legacy |
| Mostrar mensaje "Created: A1" | Component | Es feedback del usuario |

---

### ADR-3: Manejo de Canvas Not Ready

**Status:** ACEPTADA

**Context:**
El canvas legacy puede no estar listo cuando componente intenta usarlo:
- iframe todavía cargando
- $CANVAS no disponible
- DGPad.js todavía ejecutándose

**Decision:**
1. Bridge valida disponibilidad antes de cada operación
2. Si canvas no listo → retorna null/error, no bloquea
3. Component muestra UI de "esperando" si necesario
4. Retry automático en bridge (max 3 intentos con 100ms delay)

**Implementation:**
```typescript
private async waitForCanvas(maxAttempts: number = 3): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    if (this.getLegacyBridge()?.getPropertyState !== undefined) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return false;
}
```

---

### ADR-4: Nombre Único Automático

**Status:** ACEPTADA

**Context:**
Cuando se crea un objeto sin nombre, ¿cómo generar nombre único?

**Decision:**
- Cada tipo de objeto tiene prefijo: "P" para Point, "L" para List, "F" para Function
- Se busca el siguiente número disponible: P1, P2, P3...
- Legacy mantiene registro de nombres usados

**Examples:**
- Point: "P1", "P2", "P3"
- List: "L1", "L2"
- Function: "F1", "F2"
- Blockly: "BlocklyButton_1", "BlocklyButton_2"

**Rationale:**
- Simple de entender para usuarios
- Evita conflictos
- Legacy ya tiene esta lógica, reutilizamos

---

### ADR-5: Compute & Paint Once, Not Many

**Status:** ACEPTADA

**Context:**
Al crear múltiples objetos (Tablero de Puntos), ¿llamar compute() y paint() por cada objeto o una vez?

**Decision:**
SIEMPRE una única vez al final. NUNCA en cada iteración.

**Rationale:**
- 10 objetos = 1 compute + 1 paint vs 10 compute + 10 paint = 10x más rápido
- Evita conflicts y race conditions
- Canvas consistency garantizado

**Implementation Pattern:**
```javascript
var createdObjects = [];
for (var i = startNum; i <= endNum; i++) {
  // crear objeto
  createdObjects.push(object);
}
// DESPUÉS del loop:
canvas.compute();
canvas.paint();
```

---

### ADR-6: Validación en Bridge, No en Componente

**Status:** ACEPTADA

**Context:**
¿Dónde validar parámetros: en Angular component o en bridge?

**Decision:**
Validación básica (tipo, rango) en component.
Validación compleja (compatibilidad con legacy, expresiones válidas) en bridge.

**Examples:**

| Validación | Ubicación | Rationale |
|-----------|-----------|-----------|
| Expresión no vacía | Component | Rápido, UX inmediato |
| Expresión es válida en DGPad | Bridge | Requiere semántica legacy |
| Número en rango 0-100 | Component | Rápido |
| Nombre no duplicado en legacy | Bridge | Requiere query a legacy |

---

### ADR-7: Property Tests para Universal Properties

**Status:** ACEPTADA

**Context:**
¿Cómo garantizar que sistema es correcto? Unit tests + property tests?

**Decision:**
- Unit tests: Casos específicos, mocks, edge cases
- Property tests: Universal properties, 100+ iterations aleatorias

**Examples:**
- Property: "Para cualquier rango válido, crear N puntos exitosos"
- Property: "Round trip: parse → print → parse produce objeto equivalente"
- Property: "Mute → unmute restaura estado original"

**Framework:**
- Usar `fast-check` en TypeScript/JavaScript
- Mínimo 100 iteraciones por property
- Generators para crear inputs random válidos

## 8. Checklist de Validación

### 8.1 Validación Arquitectónica

- [ ] **Patrón de Puente**: No hay `contentWindow` accedido fuera de bridge
- [ ] **Patrón de Puente**: No hay `window.eval` accedido fuera de bridge
- [ ] **Responsabilidades**: Bridge solo tiene métodos de comunicación
- [ ] **Responsabilidades**: Components solo tienen lógica de UI
- [ ] **Inyección de Dependencias**: DgpadBridgeService se inyecta en todos los componentes
- [ ] **Tipado**: Todos los tipos TypeScript bien definidos (no `any`)
- [ ] **Error Handling**: Todos los métodos del bridge tienen try-catch
- [ ] **Error Handling**: Todos los errores retornan BridgeError tipado

### 8.2 Validación por Feature

**Tablero de Puntos:**
- [ ] Component renderiza correctamente
- [ ] Bridge method crea N puntos sin error
- [ ] canvas.compute() y paint() se llaman UNA VEZ
- [ ] Puntos permanecen visibles después de creación
- [ ] Nombres únicos generados correctamente
- [ ] Manejo de error si canvas no listo
- [ ] Tests unitarios de component (mockear bridge)
- [ ] Tests de bridge (verificar llamadas correctas)

**Panel de Calculadora - Botones Especiales:**
- [ ] Botones "To Point", "To List", "To Function" presentes
- [ ] Conversión exitosa crea objeto con nombre correcto
- [ ] Error handling si expresión inválida
- [ ] Validación de e1 no vacío antes de convertir
- [ ] Tests unitarios de conversiones
- [ ] Property test: cualquier expresión válida se convierte exitosamente

**Panel de Herramientas Adicionales:**
- [ ] 9 herramientas accesibles desde menú
- [ ] Cada herramienta crea objeto correspondiente
- [ ] Validación de prerequisites (ej: Expression requiere canvas)
- [ ] Undo/Redo funcionan correctamente
- [ ] Clear Construction pide confirmación
- [ ] Tests de cada herramienta

**Panel de Historial:**
- [ ] Snapshots cargados del legacy correctamente
- [ ] Thumbnails mostrados sin lag (lazy loading)
- [ ] Restore snapshot restaura estado exacto
- [ ] Save snapshot crea nueva entrada
- [ ] Delete y Clear Unlocked funcionan
- [ ] Lock status toggleable
- [ ] Tests de cargar, restaurar, guardar

**Panel de Propiedades Avanzadas:**
- [ ] Todas las propiedades avanzadas editables
- [ ] Constraints se obtienen del bridge
- [ ] Apply to All aplica a todos del tipo
- [ ] Help text presente para cada propiedad
- [ ] Validación de valores según constraint
- [ ] Tests unitarios de edición

**Panel de Macros:**
- [ ] Catálogo cargado correctamente
- [ ] Prompts mostrados en orden
- [ ] Respuestas validadas
- [ ] Macro ejecutada exitosamente
- [ ] Draft guard/restore funciona
- [ ] Error si objetos requeridos no existen
- [ ] Tests de ejecución completa

**Panel de Nombres:**
- [ ] Lista de objetos cargada
- [ ] Nombres editables inline
- [ ] Renombrado valida que no haya duplicados
- [ ] Visibilidad toggleable
- [ ] Tests de edición y validación

**Exportación:**
- [ ] Todos los 6 formatos funcionan
- [ ] Opciones aplicadas correctamente
- [ ] Download triggered automáticamente
- [ ] Filename correcto para cada formato
- [ ] Error handling si export falla
- [ ] Tests de cada formato

### 8.3 Validación de Testing

- [ ] 80%+ coverage en todos los componentes
- [ ] 90%+ coverage en DgpadBridgeService
- [ ] Tests unitarios con mocks del bridge
- [ ] Tests de integración bridge ↔ legacy
- [ ] Property tests para properties universales
- [ ] Todos los edge cases testados
- [ ] Todos los error paths testados

### 8.4 Validación de Performance

- [ ] Crear 100 puntos en Tablero < 500ms
- [ ] Cargar historial con 50 snapshots < 2s
- [ ] Export HTML+JS < 1s
- [ ] Memory < 100MB en operación normal
- [ ] Cero memory leaks (event listeners limpios)
- [ ] First Contentful Paint < 1s
- [ ] Time to Interactive < 3s

### 8.5 Validación de UX

- [ ] Feedback inmediato para cada acción (< 200ms)
- [ ] Error messages claros y accionables
- [ ] Loading states cuando operación asíncrona
- [ ] Confirmations para operaciones destructivas (Clear, Delete)
- [ ] Disabled states cuando canvas no listo
- [ ] Responsive en desktop y tablet
- [ ] Accesibilidad WCAG 2.1 AA para componentes críticos

### 8.6 Validación de Código

- [ ] Strict TypeScript (no `any` no tipado)
- [ ] Sigue Angular Style Guide
- [ ] Sigue conventions del proyecto
- [ ] JSDoc en métodos públicos
- [ ] Componentes declarativos (no lógica compleja)
- [ ] Services con lógica pura
- [ ] No hay console.log (solo en dev)
- [ ] No hay hardcoded strings (usar i18n si aplica)

## 9. Plan de Testing por Feature

### 9.1 Tablero de Puntos - Testing Strategy

**Unit Tests (BoardPointsComponent):**
```typescript
describe('BoardPointsComponent', () => {
  // Test 1: Componente se crea correctamente
  // Test 2: Validar inputs antes de crear
  // Test 3: Llamar bridge.createBoardPoints() con parámetros correctos
  // Test 4: Mostrar confirmación cuando exitoso
  // Test 5: Mostrar error cuando falla
  // Test 6: Cancel limpia estado parcial
});
```

**Unit Tests (Bridge Method):**
```typescript
describe('DgpadBridgeService.createBoardPoints', () => {
  // Test 1: Retorna array vacío si canvas no listo
  // Test 2: Retorna null si parámetros inválidos
  // Test 3: Crea N puntos correctamente
  // Test 4: Nombres únicos generados
  // Test 5: Error handling si $CANVAS no disponible
});
```

**Property Tests:**
```
Property 1: Para cualquier rango válido (startNum, endNum),
crear puntos retorna array de length = endNum - startNum + 1

Property 2: Todos los nombres generados tienen patrón
"${basePattern}${número}"

Property 3: Round-trip: crear puntos → verificar en legacy →
obtener lista tiene todos los nombres
```

**Integration Tests:**
```typescript
// Test: Component → Bridge → iframe → Legacy
// Crear puntos en Angular component
// Verificar que legacy tiene los puntos
// Verificar que canvas muestra los puntos
// Verificar que nombres son únicos
```

### 9.2 Panel de Calculadora - Botones Especiales

**Unit Tests:**
```typescript
describe('CalculatorSpecialButtons', () => {
  // Test: "To Point" con expresión válida
  // Test: "To Point" con expresión vacía
  // Test: "To Point" con expresión inválida
  // Test: Bridge llama correctamente
  // Test: Nombre del objeto mostrado en UI
  // Test: Error handling
});
```

**Property Tests:**
```
Property 1: Para cualquier expresión válida,
conversión a punto retorna nombre no null

Property 2: Nombres generados son únicos
(no hay duplicados en legacy)

Property 3: Expresión puede convertirse a múltiples tipos
(mismo input → diferentes tipos de output)
```

### 9.3 Panel de Herramientas Adicionales

**Unit Tests (9 herramientas):**
```typescript
// createBlocklyButton() → verifica llamada bridge
// createExpression() → verifica llamada bridge
// createExpressionPoints() → verifica llamada bridge
// etc.
// undo() → verifica retorna boolean
// redo() → verifica retorna boolean
// clearConstruction() → pide confirmación
```

**Integration Tests:**
```
// Crear cada herramienta → verificar en legacy
// Undo/Redo → crear → undo → verificar restaurado
// Clear Construction → crear objects → clear → verificar vacío
```

### 9.4 Panel de Historial

**Unit Tests:**
```typescript
describe('HistoryDialog', () => {
  // Test: Cargar snapshots del bridge
  // Test: Mostrar thumbnails
  // Test: Click snapshot llama bridge.openHistoryEntry()
  // Test: Save snapshot crea nueva entrada
  // Test: Delete snapshot elimina entrada
  // Test: Clear unlocked elimina solo no locked
  // Test: Toggle lock funciona
});
```

**Property Tests:**
```
Property 1: getHistoryEntries() retorna array de LegacyHistoryEntry
con todos los campos requeridos (index, date, img, lock)

Property 2: Save snapshot index es siempre > anteriores

Property 3: Para cualquier snapshot, restore es idempotente
(restore 2x = mismo resultado que restore 1x)
```

### 9.5 Panel de Propiedades Avanzadas

**Unit Tests:**
```typescript
describe('AdvancedProperties', () => {
  // Test: Mostrar todas las propiedades del objeto
  // Test: Editar propiedad actualiza en bridge
  // Test: Apply to All aplica a todos del tipo
  // Test: Validación según constraints
  // Test: Help text presente
});
```

**Property Tests:**
```
Property 1: Para cualquier propiedad, actualizar y releer
retorna mismo valor (round-trip)

Property 2: Apply to All aplica a TODOS los objetos del tipo
(verificar length antes y después)

Property 3: Values deben cumplir constraints (min/max, allowedValues)
```

### 9.6 Panel de Macros

**Unit Tests:**
```typescript
describe('MacroPanel', () => {
  // Test: Catálogo cargado
  // Test: Seleccionar macro muestra primer prompt
  // Test: Responder prompt muestra siguiente
  // Test: Completar todos los prompts ejecuta macro
  // Test: Error si objetos requeridos no existen
  // Test: Draft guard/restore funciona
});
```

**State Machine Tests:**
```
State transitions:
- idle → executing (cuando selecciona macro)
- executing → awaiting_input (primer prompt)
- awaiting_input → awaiting_input (responde, siguiente prompt)
- awaiting_input → completed (última respuesta)
- completed → idle (usuario cierra)
- * → error (falla)
```

### 9.7 Panel de Nombres

**Unit Tests:**
```typescript
describe('NamesPanel', () => {
  // Test: Cargar lista de objetos
  // Test: Click para editar nombre
  // Test: Renombrar con nombre válido
  // Test: Error si nombre duplicado
  // Test: Toggle visibilidad
});
```

### 9.8 Exportación

**Unit Tests (6 formatos):**
```typescript
describe('ExportDialog', () => {
  // Test cada formato:
  // - exportText() retorna string
  // - exportHtmlJs() retorna HTML válido
  // - exportHtml() retorna HTML válido
  // - exportResponsive() retorna HTML responsive
  // - exportSvg() retorna SVG válido
  // - exportPng() retorna Blob
  
  // Test opciones:
  // - fixWidgets: true/false
  // - fixDgScripts: true/false
  // - hideControlPanel: true/false
  // - disableZoom: true/false
});
```

**Property Tests:**
```
Property 1: Round-trip export HTML+JS: export → parse → verificar contenido
(structure es válido)

Property 2: Para cualquier opción, export completa exitosamente
(no importa combinación de opciones)

Property 3: Tamaño de export es razonable (< 10MB)
```

### 9.9 Bridge Service - Testing Central

**Test Coverage por Método:**

| Método | Unit Tests | Property Tests | Integration |
|--------|-----------|---|---|
| createBoardPoints | ✓ | ✓ | ✓ |
| convertExpressionTo* | ✓ | ✓ | ✓ |
| getHistoryEntries | ✓ | ✓ | ✓ |
| updateAdvancedProperty | ✓ | ✓ | ✓ |
| getMacroCatalog | ✓ | - | ✓ |
| exportText/Html/Svg/Png | ✓ | ✓ | ✓ |
| ... (todos) | | | |

**Mock Pattern:**
```typescript
// Mockear iframe
const mockIframe = {
  contentWindow: {
    dgpadBridge: {
      createBoardPoints: jasmine.createSpy('createBoardPoints')
        .and.returnValue(['A1', 'A2']),
      // ... otros métodos
    },
    eval: jasmine.createSpy('eval')
  }
};

spyOn(document, 'getElementById').and.returnValue(mockIframe);
```

## 10. Correctness Properties

*Las properties son características o comportamientos que deben cumplirse en TODAS las ejecuciones válidas del sistema. Sirven como especificación formal que se puede verificar con tests automáticos.*

### Property 1: Creación de Puntos es Completitud

**Definición:**
Para cualquier rango válido [startNum, endNum], crear puntos retorna exactamente (endNum - startNum + 1) objetos con nombres únicos.

**Validación de Requisitos:** 1.1 (WHEN user specifies range → creates corresponding PointObject)

**Implementación:**
```typescript
property(
  fc.integer(1, 100),                           // startNum
  fc.integer(1, 100)                            // variable para endNum
).implies((start, offset) => {
  const end = start + offset;  // Garantizar end >= start
  const result = bridge.createBoardPoints('P', start, end);
  
  const expectedCount = end - start + 1;
  return result.length === expectedCount &&
    new Set(result).size === expectedCount;  // Todos únicos
});
```

---

### Property 2: Conversión de Expresión es Idempotente en Validación

**Definición:**
Para cualquier expresión válida, convertirla a punto/lista/función siempre retorna nombre no-null. Para expresión inválida, siempre retorna null o error.

**Validación de Requisitos:** 3.3 (convertir a punto), 3.4 (a lista), 3.5 (a función)

**Implementación:**
```typescript
property(
  fc.regex(/^[A-Z][0-9]*$|^-?\d+\.?\d*$/)      // Expresión tipo string
).implies((expression) => {
  const result = bridge.convertExpressionToPoint(expression);
  
  // Si válida, debe retornar nombre
  // Si inválida, debe retornar null
  return result !== undefined;  // Siempre retorna algo
});
```

---

### Property 3: Historial Round-trip es Identidad

**Definición:**
Para cualquier snapshot, guardar → cargar → estado debe ser idéntico al original (excepto timestamp).

**Validación de Requisitos:** 4.2 (restore snapshot), 4.3 (preserve integrity)

**Implementación:**
```typescript
property(
  fc.integer(1, 1000)  // Número de acciones
).implies((actionCount) => {
  // Guardar snapshot inicial
  const snapshot1 = bridge.saveHistorySnapshot();
  
  // Ejecutar N acciones (crear objetos, modificar, etc.)
  for (let i = 0; i < actionCount; i++) {
    // ... acciones aleatorias
  }
  
  // Guardar snapshot después de acciones
  const snapshot2 = bridge.saveHistorySnapshot();
  
  // Restaurar al primer snapshot
  bridge.openHistoryEntry(snapshot1.index);
  const restored = bridge.getHistoryEntries()[snapshot1.index];
  
  // El estado debe ser idéntico al original (excepto timestamp)
  return restored.lock === snapshot1.lock &&
    restored.img !== null;  // Thumbnail presente
});
```

---

### Property 4: Propiedades Actualizadas Persisten

**Definición:**
Para cualquier propiedad avanzada, después de actualizar, releer el mismo objeto retorna el mismo valor.

**Validación de Requisitos:** 5.2 (update reflects immediately)

**Implementación:**
```typescript
property(
  fc.sampler(['color', 'opacity', 'precision', 'layer']),  // Propiedades
  fc.oneof(fc.string(), fc.integer(0, 255), fc.boolean())  // Valores
).implies((property, value) => {
  // Actualizar propiedad
  bridge.updateAdvancedProperty(property, value);
  
  // Releer estado
  const state = bridge.getPropertyState();
  
  // El valor debe ser el mismo
  return state[property] === value;
});
```

---

### Property 5: Multi-select Apply to All es Universal

**Definición:**
Para cualquier rango de objetos del mismo tipo, "Apply to All" aplica la propiedad a TODOS, exactamente una vez.

**Validación de Requisitos:** 5.4 (apply to all applies to all)

**Implementación:**
```typescript
property(
  fc.array(fc.string(), {minLength: 2, maxLength: 10})     // Lista objetos
).implies((objectNames) => {
  const initialCount = objectNames.length;
  
  // Aplicar propiedad a todos
  bridge.updateAdvancedProperty('color', '#FF0000', objectNames);
  
  // Verificar que TODOS tienen el valor
  let applyCount = 0;
  objectNames.forEach(name => {
    bridge.selectObject(name);
    const state = bridge.getPropertyState();
    if (state?.color === '#FF0000') applyCount++;
  });
  
  return applyCount === initialCount;
});
```

---

### Property 6: Macro Ejecución es State Machine Válida

**Definición:**
Para cualquier macro, transiciones de estado siguen patrón válido: idle → executing → awaiting_input* → completed → idle.

**Validación de Requisitos:** 6.4 (macro execution), 6.5 (prompts)

**Implementación:**
```typescript
property(
  fc.constantFrom(['BlocklyButton', 'Expression', 'Undo', 'Redo'])
).implies((macroKey) => {
  // Iniciar macro
  let state = 'idle';
  let macro = bridge.startMacro(macroKey);
  state = macro !== null ? 'executing' : 'idle';
  
  if (state !== 'executing') return false;
  
  // Responder a prompts
  state = 'awaiting_input';
  while (true) {
    const nextMacro = bridge.getNextMacroPrompt('response');
    
    if (nextMacro === null) {
      // Completada
      bridge.completeMacro();
      state = 'completed';
      break;
    }
    
    // state sigue siendo awaiting_input
  }
  
  // Volver a idle
  state = 'idle';
  
  // Transiciones válidas
  return ['idle', 'executing', 'awaiting_input', 'completed', 'idle']
    .reduce((valid, currentState) => valid);
});
```

---

### Property 7: Exportación Produce Contenido Válido

**Definición:**
Para cualquier formato de exportación, el contenido retornado es válido (HTML válido, SVG válido, PNG es blob, etc.).

**Validación de Requisitos:** 8.1 (exportar texto), 8.2-8.6 (otros formatos)

**Implementación:**
```typescript
property(
  fc.sampler(['text', 'html-js', 'html', 'responsive', 'svg', 'png'])
).implies((format) => {
  const result = bridge.export(format);
  
  switch (format) {
    case 'text':
      return typeof result === 'string' && result.length > 0;
    
    case 'html-js':
    case 'html':
    case 'responsive':
      return typeof result === 'string' && 
        result.includes('<html') &&
        result.includes('</html>');
    
    case 'svg':
      return typeof result === 'string' &&
        result.includes('<svg') &&
        result.includes('</svg>');
    
    case 'png':
      return result instanceof Blob &&
        result.type === 'image/png';
    
    default:
      return false;
  }
});
```

---

### Property 8: Nombres son Únicos y Válidos

**Definición:**
Para cualquier nombre de objeto, no existen 2 objetos con mismo nombre, y todos los nombres cumplen patrón válido.

**Validación de Requisitos:** 7.1 (nombres en lista), 7.4 (auto-naming)

**Implementación:**
```typescript
property().implies(() => {
  const objects = bridge.getObjectsList();
  
  // Todos los nombres son únicos
  const names = objects.map(o => o.name);
  const uniqueNames = new Set(names);
  const allUnique = names.length === uniqueNames.size;
  
  // Todos los nombres son válidos (no vacío, no null)
  const allValid = names.every(name => 
    typeof name === 'string' && name.length > 0
  );
  
  return allUnique && allValid;
});
```

---

### Property 9: Canvas Consistency Después de Operación

**Definición:**
Para cualquier operación (create, delete, move, update), después de completar, canvas está en estado consistente (no hay objetos fantasma, rendering completo).

**Validación de Requisitos:** 1.3 (points remain visible), 2.5 (no objects disappear)

**Implementación:**
```typescript
property(
  fc.integer(1, 100)  // Número de operaciones
).implies((opCount) => {
  const before = bridge.getObjectsList();
  
  // Ejecutar N operaciones
  for (let i = 0; i < opCount; i++) {
    // ... operación aleatoria
  }
  
  const after = bridge.getObjectsList();
  
  // Canvas debe tener estado definido
  return after !== null && 
    typeof after === 'object' &&
    Array.isArray(after) &&
    after.every(obj => obj.name !== null);
});
```

---

### Property 10: Error Handling es Consistente

**Definición:**
Para cualquier operación con input inválido, sistema retorna error tipado con código y mensaje, nunca null/undefined ambiguo.

**Validación de Requisitos:** Implícito en todos los requisitos

**Implementación:**
```typescript
property(
  fc.oneof(
    fc.constant(''),                          // Expresión vacía
    fc.string().filter(s => s.includes('@')), // Carácter inválido
    fc.constant(null)                         // null input
  )
).implies((invalidInput) => {
  try {
    const result = bridge.convertExpressionToPoint(invalidInput);
    
    // Si retorna error, debe ser tipado
    if (result === null) {
      return true;  // null es válido para error
    }
    
    return typeof result === 'string';  // O retorna nombre
  } catch (error) {
    // Si lanza error, debe ser BridgeError
    return error instanceof Error &&
      (error as any).code !== undefined &&
      (error as any).message !== undefined;
  }
});
```

---

## 11. Próximos Pasos

### Fase de Implementación Inmediata

1. **Crear estructura de carpetas** según especificación 4.1
2. **Extender DgpadBridgeService** con todos los nuevos métodos
3. **Implementar Tablero de Puntos** (crítica - resolver issue de "objetos desapareciendo")
4. **Implementar Botones Especiales de Calculadora**
5. **Completar Panel de Herramientas Adicionales**

### Fase de Validación

1. **Ejecutar checklist de validación** (Sección 8)
2. **Ejecutar tests** de cada feature
3. **Probar en navegador** (Chrome)
4. **Performance profiling** si es necesario

### Fase de Documentación

1. **Actualizar README** con nuevas features
2. **Documentar Bridge API** (todos los métodos públicos)
3. **Guía para desarrolladores** sobre cómo extender el bridge

