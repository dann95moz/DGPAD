# DGPad - Migración a Angular 19

Migración progresiva e incremental de DGPad (software de geometría dinámica) desde su base de código JavaScript legacy hacia una arquitectura moderna con **Angular 19** y componentes standalone.

---

## 🚀 Arquitectura del Proyecto

La aplicación utiliza un patrón de arquitectura híbrida desacoplada mediante un servicio central de puente (**Bridge Pattern**):

```
┌────────────────────────────────────────────────────────┐
│                   Angular 19 UI Layer                  │
│                                                        │
│  [Toolbar] ── [EditorPage] ── [Paneles Flotantes]      │
│     │              │                  │                │
│     └─── BoardPointsPanel             └── HistoryDialog│
│     └─── CalculatorPanel (Conversions)└── ExportDialog │
│     └─── PropertiesPanel (Global/Axis)└── NamesPanel   │
│     └─── MacroPanel                   └── WidgetPanel  │
│     └─── OtherToolsMenu               └── TextualConst.│
└──────────────────────────┬─────────────────────────────┘
                           │
                 ┌─────────▼──────────┐
                 │ DgpadBridgeService │  (Capa de comunicación)
                 └─────────┬──────────┘
                           │
                 ┌─────────▼──────────┐
                 │    Legacy Host     │  (dgpad-legacy-host.html)
                 │  Geometry Engine   │
                 │   + HTML5 Canvas   │
                 └────────────────────┘
```

---

## 📦 Features Migradas

1. **Tablero de Puntos (`board-points`)**: Creación por lotes de secuencias de puntos con nombres automáticos (`A1..An`, `P1..Pn`), optimizado con un único ciclo de `compute()` y `paint()` para garantizar persistencia y visibilidad en el canvas.
2. **Calculadora con Botones Especiales (`calculator`)**: Edición matemática y conversión directa de expresiones a objetos geométricos (`→ Punto`, `→ Lista`, `→ Función`).
3. **Herramientas Adicionales (`other-tools`)**: Botón Blockly, Expresiones, Cursors enteros/continuos, Widget de edición, Limpieza de construcción, Deshacer/Rehacer.
4. **Historial (`history`)**: Navegación por snapshots históricos, miniaturas, guardado manual y auto-guardado programado.
5. **Propiedades Avanzadas (`properties`)**: Edición de propiedades de objetos seleccionados (color, opacidad, tamaño, capa, precisión, incremento, traza, inercia), propiedades globales y configuración de cuadrícula/ejes, con soporte "Aplicar a todos".
6. **Macros (`macros`)**: Catálogo interactivo de plugins y herramientas agrupadas por categoría, con guía de requisitos y ejecución por pasos.
7. **Nombres (`names`)**: Teclado alfabético (latino y griego con modificadores) para asignación rápida de nombres con detección y omisión de colisiones.
8. **Exportación (`export`)**: Exportación en formatos Texto (.txt), HTML+JS, HTML, Responsive HTML, SVG vectorial y PNG.
9. **Construcción Textual (`textual-construction`)**: Intérprete y constructor de figuras geométricas por texto (puntos, rectas, segmentos y puntos medios).

---

## 🛠️ Comandos de Desarrollo

### Servidor de Desarrollo
```bash
npm start
```
Abre la aplicación en `http://localhost:4200/`.

### Compilación para Producción
```bash
npm run build
```
Genera el bundle optimizado en `dist/dgpad-angular/`.

### Pruebas Unitarias
```bash
npm test
```

