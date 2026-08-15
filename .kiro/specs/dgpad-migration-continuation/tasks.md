# Implementation Plan: Continuación de Migración DGPad a Angular 19

## Resumen Ejecutivo

Plan de implementación incremental para completar la migración de DGPad de JavaScript legacy a Angular 19. Incluye 8 features críticas organizadas en 11 fases. Estimación total: ~80-100 horas.

**Priorización:**
1. ⭐⭐⭐ Tablero de Puntos (resuelve issue inmediato)
2. ⭐⭐⭐ Herramientas Adicionales (Undo/Redo, Clear)
3. ⭐⭐ Calculadora - Botones Especiales
4. ⭐⭐ Propiedades Avanzadas
5. ⭐ Historial, Macros, Nombres
6. ⭐ Exportación

---

## Fase 1: Preparación e Infraestructura

### Tarea 1.1: Crear Tipos Compartidos del Bridge

**Objetivo:** Definir tipos TypeScript reutilizables para toda la capa de comunicación.

**Descripción:**
Crear archivo `dgpad-bridge-types.ts` en `src/app/core/dgpad-bridge/` con todos los tipos necesarios:
- Tipos de resultados (BoardPointsResult, ConversionResult, etc.)
- Tipos de errores (BridgeError, BridgeErrorCode)
- Tipos de datos (HistorySnapshot, MacroPromptResponse, etc.)
- Tipos de opciones (ExportOptions, PropertyConstraints)

**Subtareas:**
- [x] Crear archivo `dgpad-bridge-types.ts`
- [ ] Definir type BoardPointsRequest, BoardPointsResult
- [ ] Definir type ConversionResult (para calculadora)
- [ ] Definir type HistorySnapshot, HistoryAction
- [ ] Definir type PropertyConstraint, PropertySchema
- [ ] Definir type MacroPromptResponse, MacroExecutionState
- [ ] Definir type ExportFormat, ExportOptions, ExportResult
- [ ] Definir type BridgeError, BridgeErrorCode
- [ ] Exportar todos los tipos en index
- [ ] Agregar JSDoc a todos los tipos

**Dependencias:** Ninguna

**Criterios de Aceptación:**
- [ ] Archivo creado en ubicación correcta
- [ ] Todos los tipos están definidos y exportados
- [ ] Cero errores de TypeScript (strict mode)
- [ ] JSDoc documentado para tipos principales
- [ ] No hay `any` sin tipo explícito

**Etiquetas:** bridge, types, infrastructure

**Tamaño:** M | **Prioridad:** Critical

---

### Tarea 1.2: Extender DgpadBridgeService con Métodos Nuevos

**Objetivo:** Agregar métodos al bridge para todas las 8 features.

**Descripción:**
Extender `DgpadBridgeService` con ~40 métodos nuevos organizados por feature:
- createBoardPoints(), getObjectsList()
- convertExpressionToPoint/List/Function()
- createBlocklyButton(), createExpression(), createExpressionPoints(), etc.
- getHistoryEntries(), saveHistorySnapshot(), openHistoryEntry()
- updateAdvancedProperty(), getPropertyConstraints()
- getMacroCatalog(), startMacro(), getNextMacroPrompt(), completeMacro()
- renameObject(), setNamesVisible()
- exportText(), exportHtmlJs(), exportHtml(), exportResponsive(), exportSvg(), exportPng()

**Subtareas:**
- [ ] Crear método createBoardPoints()
- [ ] Crear método getObjectsList()
- [ ] Crear método convertExpressionToPoint()
- [ ] Crear método convertExpressionToList()
- [ ] Crear método convertExpressionToFunction()
- [ ] Crear métodos para Other Tools (createBlocklyButton, etc.) - 9 métodos
- [ ] Crear método getHistoryEntries()
- [ ] Crear método saveHistorySnapshot()
- [ ] Crear método openHistoryEntry()
- [ ] Crear método updateAdvancedProperty()
- [ ] Crear método getPropertyConstraints()
- [ ] Crear métodos para Macros (getMacroCatalog, etc.) - 5 métodos
- [ ] Crear métodos para Names (renameObject, etc.) - 3 métodos
- [ ] Crear métodos para Export - 6 métodos
- [ ] Agregar error handling a todos los métodos
- [ ] Agregar logging/debugging support

**Dependencias:** 1.1

**Criterios de Aceptación:**
- [ ] Todos los métodos creados según especificación de design.md
- [ ] Cada método tiene validación de iframe disponible
- [ ] Todos los métodos tienen try-catch con logging
- [ ] Métodos retornan tipos correctos (BridgeError en caso de fallo)
- [ ] No hay `any` sin tipo explícito
- [ ] Bridge compila sin errores
- [ ] Métodos tienen JSDoc completo

**Etiquetas:** bridge, backend, critical

**Tamaño:** L | **Prioridad:** Critical

---

### Tarea 1.3: Crear Infraestructura de Testing para Bridge

**Objetivo:** Configurar framework de testing, mocks, y helpers.

**Descripción:**
Crear infraestructura para tests del bridge:
- Mock factory para DgpadBridgeService
- Mock factory para iframe
- Helper para crear TestBed configuration
- Helper para simular operaciones en legacy

**Subtareas:**
- [ ] Crear `testing/bridge-mocks.ts` con mock factories
- [ ] Crear `testing/iframe-mocks.ts` con mock iframe
- [ ] Crear `testing/bridge-test.helpers.ts` con helpers
- [ ] Configurar jasmine-spy para todos los métodos
- [ ] Crear fixture de canvas mock
- [ ] Crear fixture de $CANVAS mock
- [ ] Agregar helpers para property tests (fast-check)

**Dependencias:** 1.1

**Criterios de Aceptación:**
- [ ] Mock factories creadas y funcionales
- [ ] Helpers reducen boilerplate en tests
- [ ] fast-check configurado correctamente
- [ ] Tests pueden generar inputs aleatorios válidos

**Etiquetas:** testing, infrastructure

**Tamaño:** M | **Prioridad:** High

---

### Tarea 1.4: Crear Servicios de Utilidad (File Download, Error Handling)

**Objetivo:** Crear servicios reutilizables para operaciones comunes.

**Descripción:**
- FileDownloadService: Manejo de descargas de archivos (Blob, data-uri)
- ErrorHandlingService: Mostrar errores del bridge a usuario
- NotificationService: Mostrar confirmaciones, mensajes

**Subtareas:**
- [ ] Crear `FileDownloadService` con método download()
- [ ] Crear `ErrorHandlingService` con métodos showError(), showWarning()
- [ ] Crear `NotificationService` con métodos showSuccess(), showInfo()
- [ ] Integrar con Angular Material (si se usa) o componentes custom
- [ ] Tests unitarios para cada servicio

**Dependencias:** Ninguna

**Criterios de Aceptación:**
- [ ] Servicios inyectables (providedIn: 'root')
- [ ] Download funciona con Blobs y strings
- [ ] Errores mostrados en UI clara
- [ ] 80%+ coverage en tests

**Etiquetas:** utilities, services

**Tamaño:** M | **Prioridad:** High

---

### Tarea 1.5: Checkpoint - Infraestructura Completa

**Objetivo:** Validar que infraestructura está lista.

**Descripción:**
- Verificar todos los tipos compilar sin errores
- Ejecutar bridge tests (deberían pasar con mocks)
- Verificar que componentes pueden inyectar servicios
- Revisar que no hay warnings en consola

**Subtareas:**
- [ ] `ng build` sin errores
- [ ] Ejecutar `ng test` - todos los tests nuevos pasan
- [ ] Verificar coverage mínimo 80%
- [ ] Code review de nuevos métodos del bridge
- [ ] Documentar API del bridge en README

**Dependencias:** 1.1, 1.2, 1.3, 1.4

**Criterios de Aceptación:**
- [ ] Build compila sin errores
- [ ] Tests pasan
- [ ] No hay warnings en TypeScript
- [ ] Bridge está listo para ser usado por componentes

**Etiquetas:** checkpoint, validation

**Tamaño:** S | **Prioridad:** Critical

---

## Fase 2: Tablero de Puntos (Board Points) ⭐⭐⭐

### Tarea 2.1: Crear Tipos para Board Points

**Objetivo:** Definir tipos específicos de la feature.

**Subtareas:**
- [ ] Crear `board-points-types.ts`
- [ ] Definir `BoardPointsState` interface
- [ ] Definir `BoardPointsConfig` type
- [ ] Exportar tipos

**Dependencias:** 1.1

**Criterios de Aceptación:**
- [ ] Tipos compilar sin errores
- [ ] Incluyen validación de ranges

**Tamaño:** XS | **Prioridad:** Critical

---

### Tarea 2.2: Crear BoardPointsPanelComponent

**Objetivo:** Implementar componente Angular que muestra UI para crear puntos.

**Descripción:**
Crear componente con:
- Inputs: basePattern (A, P, Point), startNumber, endNumber
- Botón "Create Points"
- Mostrar resultado o error
- Loading state mientras se crea

**Subtareas:**
- [ ] Crear `board-points-panel/` directory
- [ ] Crear `board-points-panel.component.ts` (componente standalone)
- [ ] Crear `board-points-panel.component.html` con form
- [ ] Crear `board-points-panel.component.css` con estilos
- [ ] Inyectar DgpadBridgeService
- [ ] Implementar método onCreatePoints()
- [ ] Implementar error handling
- [ ] Mostrar loading state
- [ ] Mostrar confirmación con nombres creados

**Dependencias:** 1.2, 2.1

**Criterios de Aceptación:**
- [ ] Componente renderiza sin errores
- [ ] Inputs validados (números válidos, range sensato)
- [ ] Botón "Create" llama bridge.createBoardPoints()
- [ ] Loading state mostrado durante creación
- [ ] Resultado mostrado (ej: "Created: P1, P2, P3")
- [ ] Error mostrado si falla

**Tamaño:** M | **Prioridad:** Critical

---

### Tarea 2.3: Implementar Bridge Method createBoardPoints()

**Objetivo:** Implementar lógica de creación de puntos en legacy.

**Descripción:**
Implementar método que:
1. Valida que canvas está listo
2. Para cada número en rango: crear PointObject con nombre automático
3. Agregar todos a construction
4. Ejecutar compute() UNA VEZ
5. Ejecutar paint() UNA VEZ
6. Retornar lista de nombres creados

**Subtareas:**
- [ ] Crear script JavaScript para createBoardPoints() en legacy-host.html
- [ ] Implementar generación automática de nombres
- [ ] Implementar adición a construction
- [ ] Implementar compute() y paint() una sola vez
- [ ] Agregar error handling
- [ ] Integrar en bridge service

**Dependencias:** 1.2

**Criterios de Aceptación:**
- [ ] Script creado en legacy-host.html
- [ ] Bridge method retorna array de nombres
- [ ] Bridge method retorna error si canvas no listo
- [ ] compute() y paint() se llaman UNA VEZ
- [ ] Puntos permanecen visibles en canvas

**Tamaño:** M | **Prioridad:** Critical

---

### Tarea 2.4: Tests Unitarios para Board Points Component

**Objetivo:** Cobertura 80%+ del componente.

**Subtareas:**
- [ ] Crear `board-points-panel.component.spec.ts`
- [ ] Mock DgpadBridgeService
- [ ] Test: Componente se crea sin errores
- [ ] Test: Validación de inputs
- [ ] Test: Click "Create" llama bridge
- [ ] Test: Error handling
- [ ] Test: Loading state mostrado
- [ ] Test: Resultado mostrado

**Dependencias:** 2.2, 1.3

**Criterios de Aceptación:**
- [ ] 80%+ coverage
- [ ] Todos los tests pasan
- [ ] Mocks funcionan correctamente

**Tamaño:** M | **Prioridad:** High

---

### Tarea 2.5: Tests de Bridge Method createBoardPoints()

**Objetivo:** Validar que el método funciona correctamente.

**Subtareas:**
- [ ] Crear tests en `dgpad-bridge.service.spec.ts`
- [ ] Test: Retorna array vacío si canvas no listo
- [ ] Test: Retorna N puntos cuando exitoso
- [ ] Test: Nombres únicos generados
- [ ] Test: compute() y paint() se llaman una vez

**Dependencias:** 2.3, 1.3

**Criterios de Aceptación:**
- [ ] 90%+ coverage del método
- [ ] Todos los tests pasan

**Tamaño:** M | **Prioridad:** High

---

### Tarea 2.6: Property Test - Board Points Completitud

**Objetivo:** Verificar property: creación siempre retorna N puntos.

**Descripción:**
Property test usando fast-check:
```
For any valid range [startNum, endNum],
createBoardPoints retorna exactamente (endNum - startNum + 1) nombres únicos
```

**Subtareas:**
- [ ] Crear property test en spec file
- [ ] Generar ranges aleatorios válidos
- [ ] Verificar length del resultado
- [ ] Verificar que todos son únicos
- [ ] Ejecutar 100+ iteraciones

**Dependencias:** 2.3, 1.3

**Criterios de Aceptación:**
- [ ] Property test pasa 100+ iteraciones
- [ ] Genera inputs aleatorios significativos

**Tamaño:** M | **Prioridad:** High

---

### Tarea 2.7: Integration Test - Board Points E2E

**Objetivo:** Probar flujo completo Component → Bridge → Legacy.

**Subtareas:**
- [ ] Crear integration test
- [ ] Component llama bridge
- [ ] Bridge ejecuta script en legacy
- [ ] Puntos creados en canvas
- [ ] Nombres únicos verificados

**Dependencias:** 2.2, 2.3, 1.3

**Criterios de Aceptación:**
- [ ] Test pasa con canvas mock
- [ ] Verifica comunicación completa

**Tamaño:** M | **Prioridad:** High

---

### Tarea 2.8: Manual Testing - Board Points en Chrome

**Objetivo:** Verificar funcionamiento real en navegador.

**Checklist:**
- [ ] Abrir aplicación en Chrome
- [ ] Navegar a Board Points panel
- [ ] Crear 10 puntos con patrón "A"
- [ ] Verificar puntos visibles en canvas
- [ ] Verificar nombres: A1, A2, ..., A10
- [ ] Crear 5 puntos más con patrón "P"
- [ ] Verificar no hay errores en consola
- [ ] Verificar no hay memory leaks
- [ ] Crear 100 puntos y verificar performance aceptable

**Dependencias:** 2.2, 2.3

**Criterios de Aceptación:**
- [ ] Puntos se crean sin errores
- [ ] Puntos permanecen visibles
- [ ] Nombres son correctos
- [ ] Sin errores de consola
- [ ] Performance < 500ms para 100 puntos

**Tamaño:** S | **Prioridad:** Critical

---

### Tarea 2.9: Documentation - Board Points

**Objetivo:** Documentar la feature.

**Subtareas:**
- [ ] Agregar JSDoc al componente
- [ ] Agregar JSDoc a bridge methods
- [ ] Actualizar README con ejemplo de uso
- [ ] Documentar qué problema resuelve

**Dependencias:** 2.2, 2.3

**Criterios de Aceptación:**
- [ ] README actualizado
- [ ] JSDoc completo

**Tamaño:** S | **Prioridad:** Medium

---

## Fase 3: Herramientas Adicionales (Other Tools)

### Tarea 3.1: Crear Tipos para Other Tools

**Objetivo:** Definir tipos para las 9 herramientas.

**Subtareas:**
- [ ] Crear `other-tools-types.ts`
- [ ] Definir enums de herramientas
- [ ] Definir tipos de configuración por herramienta

**Dependencias:** 1.1

**Tamaño:** S | **Prioridad:** High

---

### Tarea 3.2: Crear OtherToolsMenuComponent

**Objetivo:** UI con menú de 9 herramientas.

**Descripción:**
Componente con:
- 9 botones/items (Blockly, Expression, etc.)
- Click en cada uno llama método específico del bridge
- Loading y error states
- Confirmation para Clear Construction

**Subtareas:**
- [ ] Crear componente standalone
- [ ] Template HTML con 9 opciones
- [ ] Estilos CSS
- [ ] Inyectar bridge service
- [ ] Implementar onSelectTool()
- [ ] Implementar confirmación para Clear

**Dependencias:** 1.2, 3.1

**Criterios de Aceptación:**
- [ ] 9 herramientas accesibles
- [ ] Click llama bridge correctamente
- [ ] Clear pide confirmación
- [ ] Error handling

**Tamaño:** M | **Prioridad:** High

---

### Tarea 3.3: Implementar Bridge Methods - Other Tools (9 métodos)

**Objetivo:** Scripts en legacy para cada herramienta.

**Subtareas:**
- [ ] Crear createBlocklyButton()
- [ ] Crear createExpression()
- [ ] Crear createExpressionPoints()
- [ ] Crear createExpressionSegments()
- [ ] Crear createIntegerCursor()
- [ ] Crear createContinuousCursor()
- [ ] Crear createEditWidget()
- [ ] Crear clearConstruction() con confirmación
- [ ] Crear undo() y redo()
- [ ] Agregar error handling a todos

**Dependencias:** 1.2

**Criterios de Aceptación:**
- [ ] Todos los métodos creados
- [ ] Cada uno retorna resultado tipado
- [ ] clearConstruction() pide confirmación

**Tamaño:** L | **Prioridad:** High

---

### Tarea 3.4: Tests Unitarios - Other Tools

**Subtareas:**
- [ ] Component tests (mock bridge)
- [ ] Bridge method tests (cada herramienta)
- [ ] Tests de error handling

**Dependencias:** 3.2, 3.3, 1.3

**Criterios de Aceptación:**
- [ ] 80%+ coverage en componente
- [ ] 90%+ coverage en bridge methods

**Tamaño:** M | **Prioridad:** High

---

### Tarea 3.5: Property Tests - Other Tools

**Objetivo:** Universal properties para operaciones.

**Subtareas:**
- [ ] Property: Undo/Redo es reversible (undo ≠ estado original siempre)
- [ ] Property: Clear Construction elimina TODOS los objetos
- [ ] Property: Crear herramienta exitosamente retorna objeto

**Dependencias:** 3.3, 1.3

**Tamaño:** M | **Prioridad:** High

---

### Tarea 3.6: Manual Testing - Other Tools

**Checklist:**
- [ ] Crear Blockly Button
- [ ] Crear Expression
- [ ] Crear Integer Cursor
- [ ] Create/Edit Widget
- [ ] Undo/Redo múltiples veces
- [ ] Clear Construction y verificar vacío
- [ ] Sin errores en consola

**Dependencias:** 3.2, 3.3

**Tamaño:** M | **Prioridad:** High

---

## Fase 4: Calculadora - Botones Especiales

### Tarea 4.1: Crear Componentes para Botones Especiales

**Objetivo:** UI para convertir expresiones.

**Descripción:**
3 botones mini-components:
- To Point Button
- To List Button
- To Function Button

Cada uno: click → llamar bridge → mostrar resultado

**Subtareas:**
- [ ] Crear `to-point-button.component.ts`
- [ ] Crear `to-list-button.component.ts`
- [ ] Crear `to-function-button.component.ts`
- [ ] Templates para cada botón
- [ ] Integrar en CalculatorPanelComponent

**Dependencias:** 1.2

**Criterios de Aceptación:**
- [ ] Botones renderizados
- [ ] Click llama bridge
- [ ] Resultado mostrado

**Tamaño:** M | **Prioridad:** High

---

### Tarea 4.2: Implementar Bridge Methods - Conversiones

**Objetivo:** Scripts para convertir expresiones en objetos.

**Subtareas:**
- [ ] Crear convertExpressionToPoint()
- [ ] Crear convertExpressionToList()
- [ ] Crear convertExpressionToFunction()
- [ ] Validar expresión antes de convertir
- [ ] Generar nombres únicos
- [ ] Agregar error handling

**Dependencias:** 1.2

**Criterios de Aceptación:**
- [ ] Métodos convierten exitosamente
- [ ] Nombres únicos generados
- [ ] Error si expresión inválida

**Tamaño:** M | **Prioridad:** High

---

### Tarea 4.3: Tests - Conversiones

**Subtareas:**
- [ ] Component tests para botones
- [ ] Bridge method tests para conversiones
- [ ] Property tests: expresiones válidas → objeto no null
- [ ] Property tests: nombres únicos

**Dependencias:** 4.1, 4.2, 1.3

**Tamaño:** M | **Prioridad:** High

---

### Tarea 4.4: Manual Testing - Conversiones

**Checklist:**
- [ ] Escribir expresión "2+2"
- [ ] Click "To Point" → verifica punto creado
- [ ] Expresión "sin(x)" → To Function
- [ ] Error si expresión vacía
- [ ] Sin errores en consola

**Dependencias:** 4.1, 4.2

**Tamaño:** S | **Prioridad:** High

---

## Fase 5: Panel de Historial

### Tarea 5.1: Crear Componentes de Historial

**Objetivo:** UI para historial con thumbnails.

**Subtareas:**
- [ ] Crear HistoryDialogComponent
- [ ] Crear HistorySnapshotComponent (item individual)
- [ ] Template para lista de snapshots
- [ ] Mostrar thumbnails (lazy load)
- [ ] Mostrar fecha, lock status

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 5.2: Implementar Bridge Methods - Historial

**Objetivo:** Scripts para manejo de snapshots.

**Subtareas:**
- [ ] Crear getHistoryEntries()
- [ ] Crear saveHistorySnapshot()
- [ ] Crear openHistoryEntry()
- [ ] Crear deleteHistoryEntry()
- [ ] Crear clearUnlockedHistory()
- [ ] Implementar lock/unlock

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 5.3: Tests - Historial

**Subtareas:**
- [ ] Component tests
- [ ] Bridge method tests
- [ ] Property tests: restore es idempotente

**Dependencias:** 5.1, 5.2, 1.3

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 5.4: Manual Testing - Historial

**Checklist:**
- [ ] Crear snapshot
- [ ] Crear objeto
- [ ] Crear otro snapshot
- [ ] Restaurar a snapshot 1
- [ ] Verificar estado restaurado
- [ ] Delete snapshot
- [ ] Clear unlocked

**Dependencias:** 5.1, 5.2

**Tamaño:** S | **Prioridad:** Medium

---

## Fase 6: Panel de Propiedades Avanzadas

### Tarea 6.1: Crear Componente Advanced Properties

**Objetivo:** UI para editar propiedades avanzadas.

**Subtareas:**
- [ ] Crear AdvancedPropertiesComponent
- [ ] Template con inputs para cada propiedad
- [ ] Help text para cada propiedad
- [ ] "Apply to All" button
- [ ] Integrar en PropertiesPanelComponent

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 6.2: Implementar Bridge Methods - Propiedades

**Objetivo:** Scripts para editar propiedades avanzadas.

**Subtareas:**
- [ ] Crear updateAdvancedProperty()
- [ ] Crear getPropertyConstraints()
- [ ] Crear updateMultipleObjects()
- [ ] Validar values según constraints

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 6.3: Tests - Propiedades

**Subtareas:**
- [ ] Component tests
- [ ] Bridge method tests
- [ ] Property tests: round-trip (actualizar y releer)

**Dependencias:** 6.1, 6.2, 1.3

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 6.4: Manual Testing - Propiedades

**Checklist:**
- [ ] Seleccionar objeto
- [ ] Modificar propiedad avanzada
- [ ] Verificar se aplica inmediatamente
- [ ] Apply to All aplica a múltiples
- [ ] Error si propiedad no compatible

**Dependencias:** 6.1, 6.2

**Tamaño:** S | **Prioridad:** Medium

---

## Fase 7: Panel de Macros

### Tarea 7.1: Crear Componentes de Macros

**Objetivo:** UI para catálogo y ejecución de macros.

**Subtareas:**
- [ ] Crear MacroPanelComponent
- [ ] Crear MacroExecutorComponent
- [ ] Crear MacroPromptComponent
- [ ] Template para catálogo
- [ ] Template para ejecución

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Low

---

### Tarea 7.2: Implementar Bridge Methods - Macros

**Objetivo:** Scripts para catálogo y ejecución.

**Subtareas:**
- [ ] Crear getMacroCatalog()
- [ ] Crear startMacro()
- [ ] Crear getNextMacroPrompt()
- [ ] Crear completeMacro()
- [ ] Crear saveMacroDraft()
- [ ] Crear getMacroDraft()

**Dependencias:** 1.2

**Tamaño:** M | **Prioridad:** Low

---

### Tarea 7.3: Tests - Macros

**Subtareas:**
- [ ] Component tests
- [ ] Bridge method tests
- [ ] State machine tests (transiciones válidas)

**Dependencias:** 7.1, 7.2, 1.3

**Tamaño:** M | **Prioridad:** Low

---

## Fase 8: Panel de Nombres

### Tarea 8.1: Crear NamesPanelComponent

**Objetivo:** UI para gestión de nombres.

**Subtareas:**
- [ ] Crear componente standalone
- [ ] Template con lista de objetos
- [ ] Inline editing de nombres
- [ ] Toggle visibilidad

**Dependencias:** 1.2

**Tamaño:** S | **Prioridad:** Low

---

### Tarea 8.2: Implementar Bridge Methods - Nombres

**Objetivo:** Scripts para gestión de nombres.

**Subtareas:**
- [ ] Crear renameObject()
- [ ] Crear setNamesVisible()
- [ ] Crear getObjectsList()
- [ ] Validar nombres no duplicados

**Dependencias:** 1.2

**Tamaño:** S | **Prioridad:** Low

---

### Tarea 8.3: Tests - Nombres

**Subtareas:**
- [ ] Component tests
- [ ] Bridge method tests

**Dependencias:** 8.1, 8.2, 1.3

**Tamaño:** S | **Prioridad:** Low

---

## Fase 9: Exportación y Compartición

### Tarea 9.1: Crear ExportDialogComponent

**Objetivo:** UI para selección de formato y opciones.

**Subtareas:**
- [ ] Crear componente dialog
- [ ] Radio buttons para 6 formatos
- [ ] Checkboxes para opciones
- [ ] Preview button
- [ ] Download button

**Dependencias:** 1.2, 1.4

**Tamaño:** M | **Prioridad:** Low

---

### Tarea 9.2: Implementar Bridge Methods - Exportación

**Objetivo:** Scripts para exportación.

**Subtareas:**
- [ ] Crear exportText()
- [ ] Crear exportHtmlJs()
- [ ] Crear exportHtml()
- [ ] Crear exportResponsive()
- [ ] Crear exportSvg()
- [ ] Crear exportPng()
- [ ] Agregar opciones a cada uno

**Dependencias:** 1.2

**Tamaño:** L | **Prioridad:** Low

---

### Tarea 9.3: Crear ExportService

**Objetivo:** Servicio para manejo de descargas.

**Subtareas:**
- [ ] Crear FileDownloadService (si no existe)
- [ ] Método para descargar string como archivo
- [ ] Método para descargar Blob
- [ ] Generar filenames correctos

**Dependencias:** 1.4

**Tamaño:** S | **Prioridad:** Low

---

### Tarea 9.4: Tests - Exportación

**Subtareas:**
- [ ] Component tests
- [ ] Bridge method tests (cada formato)
- [ ] Property tests: contenido es válido

**Dependencias:** 9.1, 9.2, 1.3

**Tamaño:** M | **Prioridad:** Low

---

### Tarea 9.5: Manual Testing - Exportación

**Checklist:**
- [ ] Exportar como Text
- [ ] Exportar como HTML+JS
- [ ] Exportar como SVG
- [ ] Exportar como PNG
- [ ] Verificar filenames correctos
- [ ] Verificar contenido válido

**Dependencias:** 9.1, 9.2

**Tamaño:** M | **Prioridad:** Low

---

## Fase 10: Validación Global y QA

### Tarea 10.1: Ejecutar Todos los Tests

**Objetivo:** Verificar que todos los tests pasan.

**Checklist:**
- [ ] `ng test` - todos los tests unitarios pasan
- [ ] Coverage mínimo 80% en componentes
- [ ] Coverage mínimo 90% en bridge
- [ ] Property tests ejecutan 100+ iteraciones cada uno

**Dependencias:** Todas las tareas de testing

**Tamaño:** M | **Prioridad:** Critical

---

### Taska 10.2: Verificar Performance

**Objetivo:** Asegurar que aplicación funciona rápido.

**Checklist:**
- [ ] First Contentful Paint < 1s
- [ ] Time to Interactive < 3s
- [ ] Canvas paint smooth (> 30fps)
- [ ] Memory < 100MB
- [ ] No memory leaks (event listeners limpios)
- [ ] Operaciones síncronas < 500ms

**Dependencias:** 2.8, 3.6, 4.4, 5.4, 6.4

**Tamaño:** M | **Prioridad:** Critical

---

### Tarea 10.3: Verificar No Hay Errores de Consola

**Objective:** Aplicación limpia.

**Checklist:**
- [ ] No hay exceptions en consola
- [ ] No hay warnings sin importancia
- [ ] No hay logs de debug en producción

**Dependencias:** Todas las tareas

**Tamaño:** S | **Prioridad:** High

---

### Tarea 10.4: Validación de Accesibilidad

**Objetivo:** WCAG 2.1 AA para componentes críticos.

**Checklist:**
- [ ] Keyboard navigation funciona
- [ ] Color contrast suficiente
- [ ] Alt text en imágenes
- [ ] ARIA labels en elementos interactivos

**Dependencias:** 2.2, 3.2, 4.1, 5.1, 6.1, 9.1

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 10.5: Validación TypeScript Strict Mode

**Objetivo:** Cero `any` sin tipo explícito.

**Checklist:**
- [ ] `ng build --strict` compila sin errores
- [ ] No hay implicit `any`
- [ ] Todos los tipos bien definidos

**Dependencias:** Todas las tareas

**Tamaño:** S | **Prioridad:** High

---

### Tarea 10.6: Code Review Completa

**Objetivo:** Revisar código antes de merge.

**Checklist:**
- [ ] Código sigue Angular Style Guide
- [ ] Componentes son ligeros (lógica en services)
- [ ] Bridge es punto único de comunicación
- [ ] Error handling es consistente
- [ ] Tests son exhaustivos

**Dependencias:** Todas las tareas

**Tamaño:** L | **Prioridad:** Critical

---

## Fase 11: Documentación y Cleanup

### Tarea 11.1: Actualizar README

**Objetivo:** Documentar features implementadas.

**Subtareas:**
- [ ] Agregar sección "Features Implemented"
- [ ] Listar las 8 features completadas
- [ ] Agregar ejemplos de uso para features principales
- [ ] Documentar qué problemas resuelven

**Dependencias:** Todas las tareas de features

**Tamaño:** M | **Prioridad:** Medium

---

### Taska 11.2: Crear Developer Guide

**Objetivo:** Documentar cómo extender el sistema.

**Subtareas:**
- [ ] Documentar patrón de puente (DgpadBridgeService)
- [ ] Documentar cómo agregar nuevo método al bridge
- [ ] Documentar cómo crear nuevo componente
- [ ] Documentar estructura de tipos
- [ ] Ejemplos de código

**Dependencias:** Todas las tareas

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 11.3: Crear Architecture Decision Records (ADRs)

**Objetivo:** Documentar decisiones importantes.

**Subtareas:**
- [ ] ADR-1: Por qué DgpadBridgeService es punto único
- [ ] ADR-2: Separación de responsabilidades
- [ ] ADR-3: Manejo de canvas not ready
- [ ] ADR-4: Naming automático
- [ ] ADR-5: Compute & Paint una vez
- [ ] ADR-6: Validación en bridge
- [ ] ADR-7: Property-based testing

**Dependencias:** Todas las tareas

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 11.4: Actualizar JSDoc en Código

**Objetivo:** Asegurar documentación completa de métodos públicos.

**Checklist:**
- [ ] Todos los métodos del bridge tienen JSDoc
- [ ] Todos los componentes tienen descripción
- [ ] Todas las interfaces tienen descripción
- [ ] Ejemplos de uso en métodos principales

**Dependencias:** Todas las tareas

**Tamaño:** M | **Prioridad:** Medium

---

### Tarea 11.5: Cleanup de Código Temporal

**Objetivo:** Remover código de debug y temporal.

**Checklist:**
- [ ] Remover console.log() de debug
- [ ] Remover código comentado
- [ ] Remover archivos temporales (*.tmp, *.backup)
- [ ] Organizar imports alfabéticamente
- [ ] Remover dependencias no usadas

**Dependencias:** 10.6

**Tamaño:** S | **Prioridad:** Medium

---

### Tarea 11.6: Crear Changelog

**Objetivo:** Documentar cambios realizados.

**Subtareas:**
- [ ] Crear CHANGELOG.md
- [ ] Listar features implementadas
- [ ] Listar bug fixes
- [ ] Listar breaking changes (si aplica)
- [ ] Listar fecha de release

**Dependencias:** Todas las tareas

**Tamaño:** S | **Prioridad:** Low

---

### Tarea 11.7: Final Checkpoint - Entregables Completos

**Objetivo:** Verificar que todo está listo para production.

**Checklist:**
- [ ] Todos los tests pasan
- [ ] Performance aceptable
- [ ] No hay errores de consola
- [ ] Código limpio y documentado
- [ ] README actualizado
- [ ] Developer Guide completo
- [ ] ADRs documentados
- [ ] Changelog incluido
- [ ] Build compila sin warnings
- [ ] Code review aprobado

**Dependencias:** Todas las tareas

**Criterios de Aceptación:**
- [ ] Feature completamente implementada
- [ ] Código listo para merge a main
- [ ] Documentación completa

**Tamaño:** M | **Prioridad:** Critical

---

## Task Dependency Graph

Este grafo define el orden de ejecución. Las tareas en la misma onda pueden ejecutarse en paralelo.

```json
{
  "waves": [
    {
      "id": 0,
      "description": "Infraestructura Base",
      "tasks": ["1.1", "1.4"]
    },
    {
      "id": 1,
      "description": "Extensión del Bridge",
      "tasks": ["1.2"]
    },
    {
      "id": 2,
      "description": "Infraestructura de Testing",
      "tasks": ["1.3"]
    },
    {
      "id": 3,
      "description": "Checkpoint - Infraestructura",
      "tasks": ["1.5"]
    },
    {
      "id": 4,
      "description": "Board Points - Tipos y Component",
      "tasks": ["2.1", "2.2"]
    },
    {
      "id": 5,
      "description": "Board Points - Bridge Implementation",
      "tasks": ["2.3"]
    },
    {
      "id": 6,
      "description": "Board Points - Testing",
      "tasks": ["2.4", "2.5", "2.6", "2.7"]
    },
    {
      "id": 7,
      "description": "Board Points - Manual Testing & Docs",
      "tasks": ["2.8", "2.9"]
    },
    {
      "id": 8,
      "description": "Other Tools - Tipos y Component",
      "tasks": ["3.1", "3.2"]
    },
    {
      "id": 9,
      "description": "Other Tools - Bridge Methods",
      "tasks": ["3.3"]
    },
    {
      "id": 10,
      "description": "Other Tools - Testing",
      "tasks": ["3.4", "3.5", "3.6"]
    },
    {
      "id": 11,
      "description": "Calculator - Componentes y Bridge",
      "tasks": ["4.1", "4.2"]
    },
    {
      "id": 12,
      "description": "Calculator - Testing",
      "tasks": ["4.3", "4.4"]
    },
    {
      "id": 13,
      "description": "History - Componentes y Bridge",
      "tasks": ["5.1", "5.2"]
    },
    {
      "id": 14,
      "description": "History - Testing",
      "tasks": ["5.3", "5.4"]
    },
    {
      "id": 15,
      "description": "Properties - Componentes y Bridge",
      "tasks": ["6.1", "6.2"]
    },
    {
      "id": 16,
      "description": "Properties - Testing",
      "tasks": ["6.3", "6.4"]
    },
    {
      "id": 17,
      "description": "Macros - Componentes y Bridge",
      "tasks": ["7.1", "7.2"]
    },
    {
      "id": 18,
      "description": "Macros - Testing",
      "tasks": ["7.3"]
    },
    {
      "id": 19,
      "description": "Names - Componentes y Bridge",
      "tasks": ["8.1", "8.2"]
    },
    {
      "id": 20,
      "description": "Names - Testing",
      "tasks": ["8.3"]
    },
    {
      "id": 21,
      "description": "Export - Componentes y Bridge",
      "tasks": ["9.1", "9.2", "9.3"]
    },
    {
      "id": 22,
      "description": "Export - Testing",
      "tasks": ["9.4", "9.5"]
    },
    {
      "id": 23,
      "description": "Validación Global",
      "tasks": ["10.1", "10.2", "10.3"]
    },
    {
      "id": 24,
      "description": "Validación Código y Review",
      "tasks": ["10.4", "10.5", "10.6"]
    },
    {
      "id": 25,
      "description": "Documentación",
      "tasks": ["11.1", "11.2", "11.3", "11.4"]
    },
    {
      "id": 26,
      "description": "Cleanup y Finales",
      "tasks": ["11.5", "11.6", "11.7"]
    }
  ]
}
```

---

## Resumen de Tareas por Fase

| Fase | Nombre | Tareas | Prioridad |
|------|--------|--------|-----------|
| 1 | Preparación | 5 | Critical |
| 2 | Board Points | 9 | Critical |
| 3 | Other Tools | 6 | High |
| 4 | Calculator Special | 4 | High |
| 5 | History | 4 | Medium |
| 6 | Properties Avanzadas | 4 | Medium |
| 7 | Macros | 3 | Low |
| 8 | Names | 3 | Low |
| 9 | Export | 5 | Low |
| 10 | Validación Global | 6 | Critical |
| 11 | Documentación | 7 | Medium |
| **TOTAL** | | **56** | |

---

## Estimación de Esfuerzo

| Fase | Horas |
|------|-------|
| 1 - Preparación | 8 |
| 2 - Board Points | 12 |
| 3 - Other Tools | 10 |
| 4 - Calculator | 8 |
| 5 - History | 8 |
| 6 - Properties | 8 |
| 7 - Macros | 6 |
| 8 - Names | 4 |
| 9 - Export | 10 |
| 10 - Validación | 12 |
| 11 - Documentación | 8 |
| **TOTAL** | **94 horas** |

Estimación: 2-3 sprints de 2 semanas (10-15 horas/semana)

---

## Criterios de Éxito Global

- ✅ Todas las 8 features implementadas
- ✅ 80%+ coverage en componentes
- ✅ 90%+ coverage en bridge service
- ✅ Cero errores de consola
- ✅ Performance < 500ms para operaciones síncronas
- ✅ No memory leaks
- ✅ Todos los tests pasan (unit + property + integration)
- ✅ Código documentado
- ✅ Manual testing completado en Chrome
- ✅ Code review aprobado
- ✅ README y Developer Guide actualizados
