/**
 * Tipos compartidos para la capa de comunicación entre Angular y DGPad Legacy
 *
 * Este archivo contiene todas las definiciones de tipos TypeScript reutilizables
 * para la comunicación a través del bridge. Proporciona:
 * - Tipos de solicitud/respuesta para operaciones
 * - Tipos de estado para componentes
 * - Tipos de error para manejo centralizado
 * - Restricciones y esquemas de propiedades
 *
 * @see DgpadBridgeService para métodos que utilizan estos tipos
 */

// ============================================================================
// FEATURE 1: TABLERO DE PUNTOS (Board Points)
// ============================================================================

/**
 * Solicitud para crear un tablero de puntos con un patrón base
 *
 * Define los parámetros necesarios para generar una serie de puntos con nombres
 * secuenciales. Útil para crear conjuntos de puntos de prueba o construcciones
 * de referencia.
 *
 * @example
 * // Crear puntos A1, A2, A3, ..., A100
 * const request: BoardPointsRequest = {
 *   basePattern: 'A',
 *   startNumber: 1,
 *   endNumber: 100
 * };
 * // Result: ['A1', 'A2', ..., 'A100']
 *
 * @example
 * // Crear puntos P1 a P50
 * const request: BoardPointsRequest = {
 *   basePattern: 'P',
 *   startNumber: 1,
 *   endNumber: 50
 * };
 * // Result: ['P1', 'P2', ..., 'P50']
 *
 * @see BoardPointsResult para el resultado de esta solicitud
 * @see DgpadBridgeService.createBoardPoints para usar este tipo
 */
export type BoardPointsRequest = {
  /** Patrón base del nombre. Debe ser 'A', 'P', o 'Point'. Este prefijo se concatenará con los números secuenciales */
  basePattern: 'A' | 'P' | 'Point';

  /** Número inicial del rango (ej: 1). Incluido en la secuencia */
  startNumber: number;

  /** Número final del rango (ej: 100). Incluido en la secuencia */
  endNumber: number;
};

/**
 * Resultado de la operación de creación de tablero de puntos
 *
 * Proporciona el listado completo de nombres creados, cantidad de éxito,
 * y mensajes de error si la operación falló.
 *
 * @example
 * // Respuesta exitosa creando 100 puntos
 * const result: BoardPointsResult = {
 *   success: true,
 *   names: ['A1', 'A2', 'A3', ..., 'A100'],
 *   created: 100
 * };
 *
 * @example
 * // Respuesta con error (patrón inválido)
 * const result: BoardPointsResult = {
 *   success: false,
 *   names: [],
 *   created: 0,
 *   error: 'Invalid pattern: must be A, P, or Point'
 * };
 *
 * @example
 * // Respuesta con error (rango inválido)
 * const result: BoardPointsResult = {
 *   success: false,
 *   names: [],
 *   created: 0,
 *   error: 'Invalid range: startNumber (100) greater than endNumber (50)'
 * };
 *
 * @see BoardPointsRequest para los parámetros de solicitud
 * @see DgpadBridgeService.createBoardPoints para usar este tipo
 */
export type BoardPointsResult = {
  /** Lista de nombres de puntos creados exitosamente (ej: ["A1", "A2", "A3", ...]) */
  names: string[];

  /** Cantidad total de puntos creados. Será igual a la diferencia entre endNumber y startNumber + 1 si exitosa */
  created: number;

  /** Indica si la operación de creación fue completada exitosamente sin errores */
  success: boolean;

  /** Mensaje de error descriptivo si la operación falló. Presente solo si success es false */
  error?: string;
};

// ============================================================================
// FEATURE 2: CONVERSIONES DE CALCULADORA
// ============================================================================

/**
 * Resultado de una operación de conversión (expresión → objeto geométrico)
 *
 * Utilizados para convertir expresiones matemáticas de la calculadora en objetos
 * geométricos del canvas. Soporta conversión a:
 * - PointObject (convertExpressionToPoint)
 * - ListObject (convertExpressionToList)
 * - FunctionObject (convertExpressionToFunction)
 *
 * @example
 * // Conversión exitosa a punto: (3, 4)
 * const result: ConversionResult = {
 *   objectName: 'P',
 *   objectType: 'Point',
 *   coordinates: { x: 3, y: 4 },
 *   success: true
 * };
 *
 * @example
 * // Conversión exitosa a función: y = 2x + 1
 * const result: ConversionResult = {
 *   objectName: 'f',
 *   objectType: 'Function',
 *   formula: 'y = 2*x + 1',
 *   success: true
 * };
 *
 * @example
 * // Conversión fallida por sintaxis inválida
 * const result: ConversionResult = {
 *   objectName: undefined,
 *   objectType: '',
 *   success: false,
 *   error: 'Invalid expression syntax: unexpected token'
 * };
 *
 * @see DgpadBridgeService.convertExpressionToPoint
 * @see DgpadBridgeService.convertExpressionToList
 * @see DgpadBridgeService.convertExpressionToFunction
 */
export type ConversionResult = {
  /** Nombre del objeto creado (ej: "a", "list_1", "f"). Indefinido si la conversión falló */
  objectName?: string;

  /** Tipo de objeto geométrico creado (ej: "Point", "List", "Function", "Segment"). Vacío si falló */
  objectType: string;

  /** Coordenadas u otros datos del objeto. Su estructura depende del objectType (Point tiene x,y; Function tiene formula, etc.) */
  coordinates?: any;

  /** Indica si la conversión fue completada exitosamente sin errores */
  success: boolean;

  /** Mensaje de error descriptivo si la conversión falló. Presente solo si success es false */
  error?: string;
};

// ============================================================================
// FEATURE 2B: HERRAMIENTAS ADICIONALES (Other Tools)
// ============================================================================

/**
 * Resultado de la ejecución de una herramienta
 *
 * Retornado después de ejecutar herramientas especiales como:
 * - Crear Blockly Button
 * - Crear Expression Points/Segments
 * - Crear Cursores (Integer o Continuous)
 * - Edit Widget
 *
 * @example
 * // Ejecución exitosa de creación de cursor
 * const result: ToolExecutionResult = {
 *   success: true,
 *   message: 'Integer cursor created successfully',
 *   createdObjects: ['n']
 * };
 *
 * @example
 * // Ejecución exitosa de múltiples objetos
 * const result: ToolExecutionResult = {
 *   success: true,
 *   message: 'Expression points created',
 *   createdObjects: ['P1', 'P2', 'P3']
 * };
 *
 * @example
 * // Ejecución fallida
 * const result: ToolExecutionResult = {
 *   success: false,
 *   message: 'Error executing tool',
 *   error: 'Invalid cursor range: min >= max'
 * };
 *
 * @see CursorConfig para configuración de cursores
 * @see DgpadBridgeService para métodos que retornan este tipo
 */
export type ToolExecutionResult = {
  /** Indica si la herramienta se ejecutó correctamente sin errores */
  success: boolean;

  /** Mensaje informativo o de confirmación legible para el usuario */
  message: string;

  /** Lista de nombres de objetos creados por la herramienta (ej: ["P1", "slider_1", "f"]). Presente solo si la creación fue exitosa */
  createdObjects?: string[];

  /** Mensaje de error descriptivo si la ejecución falló. Presente solo si success es false */
  error?: string;
};

/**
 * Configuración para crear un cursor (slider) en el canvas
 *
 * Define los parámetros necesarios para crear un cursor interactivo que permite
 * al usuario variar un valor dentro de un rango específico. Se utiliza tanto para
 * cursores enteros (que avanzan de 1 en 1) como continuos (valores decimales).
 *
 * @example
 * // Cursor entero de 1 a 10 (paso 1)
 * const config: CursorConfig = {
 *   name: 'n',
 *   minValue: 1,
 *   maxValue: 10,
 *   increment: 1
 * };
 *
 * @example
 * // Cursor continuo de 0 a 1 (para opacidad)
 * const config: CursorConfig = {
 *   name: 'opacity',
 *   minValue: 0,
 *   maxValue: 1
 *   // increment no es necesario para cursores continuos
 * };
 *
 * @example
 * // Cursor entero con rango grande
 * const config: CursorConfig = {
 *   minValue: 0,
 *   maxValue: 360,
 *   increment: 5
 * };
 *
 * @see ToolExecutionResult para el resultado de crear un cursor
 * @see DgpadBridgeService.createIntegerCursor
 * @see DgpadBridgeService.createContinuousCursor
 */
export type CursorConfig = {
  /** Nombre del cursor en la construcción (ej: "n", "m", "slider_1"). Opcional - puede ser auto-generado */
  name?: string;

  /** Valor mínimo del rango del cursor. El cursor no podrá tomar valores menores a este */
  minValue: number;

  /** Valor máximo del rango del cursor. El cursor no podrá tomar valores mayores a este */
  maxValue: number;

  /** Incremento entre valores consecutivos (solo para cursores enteros, default: 1). Para cursores continuos, omitir o usar undefined */
  increment?: number;
};

// ============================================================================
// FEATURE 4: HISTORIAL (History)
// ============================================================================

/**
 * Snapshot del historial de la construcción
 *
 * Contiene una fotografía del estado completo de la construcción en un momento
 * específico, incluyendo una imagen en miniatura para vista previa. Los snapshots
 * pueden ser bloqueados para protegerlos del borrado accidental.
 *
 * @example
 * // Snapshot normal recién guardado
 * const snapshot: HistorySnapshot = {
 *   id: 'snap_001',
 *   timestamp: new Date('2024-01-15T10:30:00Z'),
 *   thumbnail: new Blob([...pngData...], { type: 'image/png' }),
 *   locked: false
 * };
 *
 * @example
 * // Snapshot bloqueado (protegido)
 * const lockedSnapshot: HistorySnapshot = {
 *   id: 'snap_002',
 *   timestamp: new Date('2024-01-15T11:00:00Z'),
 *   thumbnail: new Blob([...pngData...], { type: 'image/png' }),
 *   locked: true
 * };
 *
 * @example
 * // Snapshot sin thumbnail (puede no estar disponible en algunas situaciones)
 * const minimalSnapshot: HistorySnapshot = {
 *   id: 'snap_003',
 *   timestamp: new Date('2024-01-15T12:00:00Z'),
 *   locked: false
 * };
 *
 * @see HistoryAction para acciones realizadas sobre snapshots
 * @see DgpadBridgeService.saveHistorySnapshot
 * @see DgpadBridgeService.getHistoryEntries
 */
export type HistorySnapshot = {
  /** Identificador único del snapshot. Se utiliza para referencias en operaciones posteriores */
  id: string;

  /** Timestamp de cuándo se guardó este snapshot. Permite ordenar y comparar snapshots en el tiempo */
  timestamp: Date;

  /** Imagen en miniatura en formato PNG como Blob para vista previa visual. Puede estar ausente en snapshots antiguos o sin datos visuales */
  thumbnail?: Blob;

  /** Indica si este snapshot está bloqueado (protegido de eliminación). Los snapshots bloqueados deben confirmarse antes de ser borrados */
  locked: boolean;
};

/**
 * Acción posible sobre snapshots del historial
 *
 * Define los tipos de operaciones que se pueden realizar en el historial y proporciona
 * registro de auditoría de cambios. Cada acción se registra con timestamp para trazabilidad.
 *
 * @example
 * // Acción de guardar nuevo snapshot
 * const action: HistoryAction = {
 *   type: 'save',
 *   snapshotId: 'snap_001',
 *   timestamp: new Date('2024-01-15T10:30:00Z')
 * };
 *
 * @example
 * // Acción de restaurar un snapshot anterior
 * const action: HistoryAction = {
 *   type: 'restore',
 *   snapshotId: 'snap_001',
 *   timestamp: new Date('2024-01-15T14:00:00Z')
 * };
 *
 * @example
 * // Acción de bloquear un snapshot
 * const action: HistoryAction = {
 *   type: 'lock',
 *   snapshotId: 'snap_001',
 *   timestamp: new Date('2024-01-15T15:30:00Z')
 * };
 *
 * @see HistorySnapshot para información del snapshot
 * @see DgpadBridgeService.saveHistorySnapshot
 */
export type HistoryAction = {
  /** Tipo de acción realizada: 'save' (nuevo snapshot), 'restore' (volver a anterior), 'delete' (eliminar), o 'lock' (proteger) */
  type: 'save' | 'restore' | 'delete' | 'lock';

  /** ID del snapshot que fue afectado por esta acción */
  snapshotId: string;

  /** Timestamp exacto de cuándo se realizó la acción */
  timestamp: Date;
};

// ============================================================================
// FEATURE 5: PROPIEDADES AVANZADAS
// ============================================================================

/**
 * Restricción o validación para una propiedad editable
 *
 * Define límites numéricos, valores permitidos, o tipos de objetos compatibles
 * para propiedades específicas según el tipo de objeto. Se utiliza para validar
 * entrada de usuario y documentar rangos válidos.
 *
 * @example
 * // Restricción numérica con rango (opacidad 0-100)
 * const constraint: PropertyConstraint = {
 *   min: 0,
 *   max: 100
 * };
 *
 * @example
 * // Restricción con valores permitidos (tipo de línea)
 * const constraint: PropertyConstraint = {
 *   enum: ['solid', 'dashed', 'dotted', 'double']
 * };
 *
 * @example
 * // Restricción de tipos permitidos (para referencias de objetos)
 * const constraint: PropertyConstraint = {
 *   allowedTypes: ['Point', 'Line', 'Segment', 'Circle']
 * };
 *
 * @example
 * // Restricción combinada (rango numérico con valores especiales)
 * const constraint: PropertyConstraint = {
 *   min: 0,
 *   max: 360,
 *   enum: undefined
 * };
 *
 * @see PropertySchema para mapeo de propiedades a restricciones
 * @see DgpadBridgeService.getPropertyConstraints
 */
export type PropertyConstraint = {
  /** Valor mínimo permitido para propiedades numéricas. Valores menores serán rechazados o ajustados */
  min?: number;

  /** Valor máximo permitido para propiedades numéricas. Valores mayores serán rechazados o ajustados */
  max?: number;

  /** Lista de valores permitidos enumerados. Si se define, solo estos valores son válidos */
  enum?: string[];

  /** Tipos de objetos permitidos para propiedades que referencian otros objetos (ej: "Point", "Line"). Si se define, solo estos tipos son válidos */
  allowedTypes?: string[];
};

/**
 * Esquema de propiedades para un tipo de objeto específico
 *
 * Mapeo (diccionario) que define las restricciones de validación para cada
 * propiedad editable de un tipo de objeto. Se utiliza para validar entrada de
 * usuario y documentar propiedades válidas para cada tipo.
 *
 * @example
 * // Esquema para objeto Point
 * const schema: PropertySchema = {
 *   color: { enum: ['red', 'blue', 'green', 'black', 'white'] },
 *   opacity: { min: 0, max: 1 },
 *   size: { min: 1, max: 20 },
 *   visible: {},
 *   name: {}
 * };
 *
 * @example
 * // Esquema para objeto Line
 * const schema: PropertySchema = {
 *   color: { enum: ['red', 'blue', 'green'] },
 *   lineWidth: { min: 1, max: 10 },
 *   lineStyle: { enum: ['solid', 'dashed', 'dotted'] },
 *   visible: {}
 * };
 *
 * @example
 * // Esquema para objeto Cursor
 * const schema: PropertySchema = {
 *   name: {},
 *   minValue: {},
 *   maxValue: {},
 *   increment: { min: 0 },
 *   value: {}
 * };
 *
 * @see PropertyConstraint para descripción de restricciones individuales
 * @see DgpadBridgeService.getPropertySchema
 */
export type PropertySchema = {
  /**
   * Mapeo de nombre de propiedad a su restricción/validación.
   * Cada clave es el nombre de una propiedad, cada valor define cómo validarla.
   * Una restricción vacía {} significa que la propiedad es válida sin restricciones específicas.
   */
  [propertyName: string]: PropertyConstraint;
};

// ============================================================================
// FEATURE 6: MACROS
// ============================================================================

/**
 * Respuesta a un prompt de entrada en la ejecución de macro
 *
 * Captura una pregunta interactiva presentada al usuario durante la ejecución
 * de una macro. Define el tipo de respuesta esperada y opciones disponibles.
 *
 * @example
 * // Prompt de selección de puntos existentes
 * const response: MacroPromptResponse = {
 *   prompt: 'Select two points to create a line',
 *   inputType: 'select',
 *   options: ['A', 'B', 'C', 'D'],
 *   required: true
 * };
 *
 * @example
 * // Prompt de entrada de nombre de objeto
 * const response: MacroPromptResponse = {
 *   prompt: 'Enter the name for the new point',
 *   inputType: 'text',
 *   required: true
 * };
 *
 * @example
 * // Prompt de entrada de parámetro numérico (opcional)
 * const response: MacroPromptResponse = {
 *   prompt: 'Enter the radius (leave empty for default)',
 *   inputType: 'number',
 *   required: false
 * };
 *
 * @example
 * // Prompt de selección con valor por defecto
 * const response: MacroPromptResponse = {
 *   prompt: 'Select line style',
 *   inputType: 'select',
 *   options: ['solid', 'dashed', 'dotted'],
 *   required: false
 * };
 *
 * @see MacroExecutionState para estado global de ejecución
 * @see ActiveMacro para macro activa con prompt actual
 * @see DgpadBridgeService.executeMacro
 */
export type MacroPromptResponse = {
  /** Texto del prompt mostrado al usuario. Debe ser claro y descriptivo */
  prompt: string;

  /** Tipo de entrada esperada: 'text' (cadena), 'number' (valor numérico), o 'select' (selección de opciones) */
  inputType: 'text' | 'number' | 'select';

  /** Opciones disponibles cuando inputType es 'select'. Ignorado para otros tipos */
  options?: string[];

  /** Indica si esta entrada es obligatoria. Si false, permite continuar sin respuesta */
  required: boolean;
};

/**
 * Estado de ejecución de una macro
 *
 * Máquina de estados que representa el ciclo de vida completo de una ejecución
 * de macro, incluyendo pasos, respuestas del usuario, y estado actual.
 *
 * Ciclo de vida típico:
 * - idle → executing → awaiting_input → executing → completed
 * - En cualquier momento: → error (si ocurre un problema)
 *
 * @example
 * // Macro iniciando, paso 1 de 3
 * const state: MacroExecutionState = {
 *   macroId: 'create-triangle',
 *   step: 1,
 *   totalSteps: 3,
 *   responses: {}
 * };
 *
 * @example
 * // Macro esperando entrada en el paso 2
 * const state: MacroExecutionState = {
 *   macroId: 'create-triangle',
 *   step: 2,
 *   totalSteps: 3,
 *   responses: { 'step1_point': 'A' }
 * };
 *
 * @example
 * // Macro completada con todas las respuestas
 * const state: MacroExecutionState = {
 *   macroId: 'create-triangle',
 *   step: 3,
 *   totalSteps: 3,
 *   responses: {
 *     'step1_point': 'A',
 *     'step2_point': 'B',
 *     'step3_point': 'C'
 *   }
 * };
 *
 * @see MacroPromptResponse para prompts individuales
 * @see MacroDraft para guardar estado parcial
 * @see DgpadBridgeService.executeMacro
 */
export type MacroExecutionState = {
  /** Identificador único de la macro siendo ejecutada (ej: "create-triangle", "perpendicular-bisector") */
  macroId: string;

  /** Número del paso actual (1-indexed). Aumenta conforme la macro avanza */
  step: number;

  /** Total de pasos en esta macro. Permite mostrar progreso (ej: "Paso 2 de 5") */
  totalSteps: number;

  /** Diccionario de respuestas proporcionadas por el usuario hasta ahora. Las claves son identificadores de prompts, los valores son las respuestas */
  responses: Record<string, any>;
};

/**
 * Draft (borrador) de una ejecución de macro
 *
 * Permite guardar el estado parcial de una macro para continuar después,
 * similar a guardar un "checkpoint" en un juego. Útil para macros complejas
 * que toman múltiples pasos completar.
 *
 * @example
 * // Macro parcialmente completada: 2 puntos seleccionados, 3 pasos completados
 * const draft: MacroDraft = {
 *   params: ['A', 'B'],
 *   targets: ['Triangle_1']
 * };
 *
 * @example
 * // Draft vacío al inicio
 * const draft: MacroDraft = {
 *   params: [],
 *   targets: []
 * };
 *
 * @example
 * // Draft con múltiples parámetros
 * const draft: MacroDraft = {
 *   params: ['Point_A', '5', 'solid'],
 *   targets: ['Object_1', 'Object_2']
 * };
 *
 * @see MacroExecutionState para estado global durante ejecución
 * @see DgpadBridgeService.saveMacroDraft
 * @see DgpadBridgeService.restoreMacroDraft
 */
export type MacroDraft = {
  /** Lista de parámetros/respuestas proporcionadas hasta ahora en la ejecución. Se construye conforme el usuario responde prompts */
  params: string[];

  /** Lista de nombres de objetos seleccionados como targets o inputs. Necesarios para completar la macro */
  targets: string[];
};

// ============================================================================
// FEATURE 8: EXPORTACIÓN
// ============================================================================

/**
 * Formato de exportación disponible
 *
 * Define los formatos soportados para exportar construcciones de DGPad
 * en diferentes medios y con diferentes niveles de interactividad:
 *
 * - `text`: Representación en texto plano de la construcción (.txt)
 * - `html-js`: HTML con JavaScript interactivo que permite manipular la construcción (.html)
 * - `html`: HTML estático sin interactividad, solo para visualización (.html)
 * - `responsive`: HTML responsive que se adapta a dispositivos móviles (.html)
 * - `svg`: Gráficos vectoriales escalables sin interactividad (.svg)
 * - `png`: Imagen rasterizada fija en PNG 2D (.png)
 *
 * @example
 * // Exportar como texto plano para documentación
 * const format: ExportFormat = 'text';
 *
 * @example
 * // Exportar como imagen PNG para incrustar en presentaciones
 * const format: ExportFormat = 'png';
 *
 * @example
 * // Exportar como HTML interactivo para compartir en web
 * const format: ExportFormat = 'html-js';
 *
 * @example
 * // Exportar como SVG escalable para imprimir
 * const format: ExportFormat = 'svg';
 *
 * @see ExportOptions para opciones de configuración
 * @see ExportResult para resultado de exportación
 * @see DgpadBridgeService.export
 */
export type ExportFormat = 'text' | 'html-js' | 'html' | 'responsive' | 'svg' | 'png';

/**
 * Opciones de configuración para operaciones de exportación
 *
 * Controla el comportamiento, nivel de interactividad, y características
 * incluidas en la exportación. Estas opciones afectan qué funcionalidades
 * estarán disponibles en la construcción exportada.
 *
 * @example
 * // Exportación segura: widgets fijos, scripts deshabilitados, panel oculto
 * const options: ExportOptions = {
 *   fixWidgets: true,
 *   fixDgScripts: true,
 *   hideControlPanel: true,
 *   disableZoom: true
 * };
 *
 * @example
 * // Exportación interactiva: usuario puede manipular, zoom habilitado
 * const options: ExportOptions = {
 *   fixWidgets: false,
 *   fixDgScripts: false,
 *   hideControlPanel: false,
 *   disableZoom: false
 * };
 *
 * @example
 * // Exportación con widgets móviles pero scripts bloqueados
 * const options: ExportOptions = {
 *   fixWidgets: false,
 *   fixDgScripts: true,
 *   hideControlPanel: true,
 *   disableZoom: false
 * };
 *
 * @see ExportFormat para tipos de formato disponibles
 * @see ExportResult para resultado de exportación
 * @see DgpadBridgeService.export
 */
export type ExportOptions = {
  /** Fijar posición de widgets en la exportación (no permitir al usuario arrastrarlos). Bloquea la recolocación de sliders, botones, etc. */
  fixWidgets: boolean;

  /** Fijar scripts de DGPad (no permitir ejecución o modificación en la exportación). Desactiva Blockly y ejecución de macros */
  fixDgScripts: boolean;

  /** Ocultar panel de control en la exportación. Desactiva menús, herramientas, y controles */
  hideControlPanel: boolean;

  /** Deshabilitar zoom en la exportación. Previene que el usuario haga zoom in/out en la construcción */
  disableZoom: boolean;
};

/**
 * Resultado de una operación de exportación
 *
 * Contiene el contenido exportado en el formato solicitado, junto con
 * metadatos necesarios para descargar, procesar, o mostrar el archivo.
 * El contenido puede ser texto (string) o datos binarios (Blob).
 *
 * @example
 * // Resultado de exportación como texto plano
 * const result: ExportResult = {
 *   format: 'text',
 *   content: 'Point A = (2, 3)\\nPoint B = (5, 7)\\nLine AB',
 *   mimeType: 'text/plain',
 *   filename: 'construction.txt',
 *   size: 1024
 * };
 *
 * @example
 * // Resultado de exportación como PNG (imagen binaria)
 * const result: ExportResult = {
 *   format: 'png',
 *   content: new Blob([...bytes PNG...], { type: 'image/png' }),
 *   mimeType: 'image/png',
 *   filename: 'construction.png',
 *   size: 45632
 * };
 *
 * @example
 * // Resultado de exportación como HTML interactivo
 * const result: ExportResult = {
 *   format: 'html-js',
 *   content: '<!DOCTYPE html>\\n<html>\\n<body>...</body>\\n</html>',
 *   mimeType: 'text/html',
 *   filename: 'construction-interactive.html',
 *   size: 8192
 * };
 *
 * @example
 * // Resultado de exportación como SVG vectorial
 * const result: ExportResult = {
 *   format: 'svg',
 *   content: '<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">...</svg>',
 *   mimeType: 'image/svg+xml',
 *   filename: 'construction.svg',
 *   size: 4096
 * };
 *
 * @see ExportFormat para formatos disponibles
 * @see ExportOptions para opciones de configuración
 * @see DgpadBridgeService.export
 */
export type ExportResult = {
  /** Formato de exportación utilizado. Indica el tipo de contenido en el resultado */
  format: ExportFormat;

  /** Contenido exportado. Es un string para formatos texto/markup (text, html, html-js, svg), o un Blob para formatos binarios (png) */
  content: string | Blob;

  /** MIME type del contenido para envío correcto al cliente. Ejemplos: "text/plain", "text/html", "image/png", "image/svg+xml" */
  mimeType: string;

  /** Nombre de archivo sugerido para descarga, incluyendo extensión apropiada (ej: "my-construction.html", "diagram.png") */
  filename: string;

  /** Tamaño en bytes del contenido exportado. Se puede usar para mostrar progreso de descarga o validar integridad */
  size: number;
};

// ============================================================================
// FEATURE 7: NOMBRES (Names)
// ============================================================================

/**
 * Información de un objeto en la lista de nombres
 *
 * Proporciona información básica sobre un objeto en la construcción,
 * utilizado principalmente en el panel de nombres para mostrar todos
 * los objetos disponibles.
 *
 * @example
 * // Punto A
 * const info: ObjectNameInfo = {
 *   name: 'A',
 *   family: 'Point'
 * };
 *
 * @example
 * // Línea que conecta dos puntos
 * const info: ObjectNameInfo = {
 *   name: 'AB',
 *   family: 'Line'
 * };
 *
 * @example
 * // Círculo con nombre descriptivo
 * const info: ObjectNameInfo = {
 *   name: 'circumcircle',
 *   family: 'Circle'
 * };
 *
 * @see DgpadBridgeService.getUsedNames
 * @see DgpadBridgeService.getObjectFamily
 */
export type ObjectNameInfo = {
  /** Nombre actual del objeto en la construcción (ej: "A", "line_1", "circle_ABC") */
  name: string;

  /** Familia/tipo del objeto (ej: "Point", "Line", "Circle", "Segment", "Angle", "Polygon"). Define qué propiedades y operaciones son válidas */
  family: string;
};

// ============================================================================
// MANEJO DE ERRORES
// ============================================================================

/**
 * Código de error del bridge
 *
 * Enumera los tipos específicos de errores que pueden ocurrir durante
 * operaciones del bridge. Se utiliza para clasificar y manejar errores
 * de forma diferenciada según el tipo.
 *
 * Códigos definidos:
 * - `CANVAS_NOT_READY`: Canvas de DGPad no está inicializado o accesible
 * - `INVALID_EXPRESSION`: Expresión matemática tiene sintaxis inválida
 * - `INVALID_PARAMETER`: Parámetro pasado a una función no es válido
 * - `OBJECT_NOT_FOUND`: Objeto referenciado no existe en la construcción
 * - `DUPLICATE_NAME`: Nombre ya existe para otro objeto
 * - `INSUFFICIENT_OBJECTS`: No hay suficientes objetos para la operación
 * - `OPERATION_FAILED`: Operación falló por razón desconocida
 * - `UNKNOWN_ERROR`: Error no clasificado en ninguna categoría
 *
 * @example
 * // Usuario intenta referenciar un punto que no existe
 * const code: BridgeErrorCode = 'OBJECT_NOT_FOUND';
 *
 * @example
 * // Usuario escribe una expresión matemática mal formada
 * const code: BridgeErrorCode = 'INVALID_EXPRESSION';
 *
 * @see BridgeError para la estructura completa de error
 * @see DgpadBridgeService para métodos que pueden lanzar estos errores
 */
export type BridgeErrorCode =
  | 'CANVAS_NOT_READY'        // Canvas de DGPad no está inicializado
  | 'INVALID_EXPRESSION'      // Expresión matemática inválida
  | 'INVALID_PARAMETER'       // Parámetro inválido
  | 'OBJECT_NOT_FOUND'        // Objeto referenciado no existe
  | 'DUPLICATE_NAME'          // Nombre ya existe
  | 'INSUFFICIENT_OBJECTS'    // No hay suficientes objetos para la operación
  | 'OPERATION_FAILED'        // Operación fallida por razón desconocida
  | 'UNKNOWN_ERROR';          // Error no clasificado

/**
 * Información de error del bridge
 *
 * Proporciona contexto detallado sobre qué salió mal en una operación,
 * incluyendo clasificación del error, mensaje legible, y datos contextales.
 * Utilizado para logging, debugging, y presentación de errores al usuario.
 *
 * @example
 * // Error: punto no encontrado al intentar mover
 * const error: BridgeError = {
 *   code: 'OBJECT_NOT_FOUND',
 *   message: 'Point "X" not found in construction',
 *   context: { attemptedObject: 'X' },
 *   timestamp: 1705317600000
 * };
 *
 * @example
 * // Error: expresión matemática inválida
 * const error: BridgeError = {
 *   code: 'INVALID_EXPRESSION',
 *   message: 'Syntax error in expression: unexpected token "+"',
 *   context: { expression: '2 + + 3', position: 5 },
 *   timestamp: 1705317600000
 * };
 *
 * @example
 * // Error: parámetro fuera de rango
 * const error: BridgeError = {
 *   code: 'INVALID_PARAMETER',
 *   message: 'Parameter value out of range',
 *   context: { parameter: 'opacity', value: 1.5, min: 0, max: 1 },
 *   timestamp: 1705317600000
 * };
 *
 * @see BridgeErrorCode para códigos de error disponibles
 * @see DgpadBridgeService para métodos que pueden generar estos errores
 */
export type BridgeError = {
  /** Código de error específico para clasificación y manejo diferenciado */
  code: BridgeErrorCode;

  /** Mensaje de error legible para el usuario, explicando qué salió mal de forma clara */
  message: string;

  /** Contexto adicional con datos relevantes (valores, IDs de objeto, posiciones, etc.). Útil para debugging y logging */
  context?: Record<string, unknown>;

  /** Timestamp en milisegundos cuando ocurrió el error (desde epoch). Permite ordenar y filtrar errores en logs */
  timestamp: number;
};

// ============================================================================
// TIPOS DE OPCIONES PARA OPERACIONES
// ============================================================================

// (ExportOptions defined above in FEATURE 8: EXPORTACIÓN)

// ============================================================================
// TIPOS PARA PROPIEDADES AVANZADAS
// ============================================================================

/**
 * Propiedad editable avanzada (específica por tipo de objeto)
 *
 * Extensión de propiedades básicas que se aplican a tipos específicos de objetos.
 * Estas propiedades permiten control fino sobre el comportamiento y apariencia
 * de objetos geométricos en DGPad.
 *
 * Propiedades:
 * - `precision`: Número de decimales para cálculos (ej: 2, 4, 6)
 * - `increment`: Incremento de un cursor (ej: 0.1, 1, 5)
 * - `shape`: Forma del punto: 0=círculo, 1=cruz, 2=triángulo, 3=cuadrado, 4=diamante
 * - `dash`: Estilo de línea: 0=sólida, 1=punteada, 2=discontinua
 * - `noMouse`: Si true, el objeto no responde a clicks del mouse
 * - `track`: Si true, sigue al cursor del mouse
 * - `angle360`: Si true, ángulo mostrado de 0-360°, si false de -180° a 180°
 * - `exclusive`: Si true, solo este objeto puede ser seleccionado
 * - `layer`: Capa de renderizado (0-1000, mayor = arriba)
 * - `axisWidth`: Ancho de los ejes en píxeles
 * - `gridWidth`: Ancho de las celdas de cuadrícula en píxeles
 * - `showGrid`: Si true, mostrar cuadrícula
 * - `onlyPositive`: Si true, solo mostrar valores positivos
 * - `centerZoom`: Si true, zoom centrado en punto, si false zoom en esquina
 *
 * @example
 * // Propiedad de precisión
 * const prop: AdvancedEditableProperty = 'precision';
 *
 * @example
 * // Propiedad de forma de punto
 * const prop: AdvancedEditableProperty = 'shape';
 *
 * @see PropertySchema para esquema de propiedades
 * @see DgpadBridgeService.updateAdvancedProperty
 */
export type AdvancedEditableProperty =
  | 'precision'       // Precisión de cálculo (decimales)
  | 'increment'       // Incremento de cursor
  | 'shape'           // Forma del punto (0-4)
  | 'dash'            // Línea discontinua (0=sólida, 1=punteada, 2=discontinua)
  | 'noMouse'         // No responde a mouse
  | 'track'           // Seguimiento del movimiento
  | 'angle360'        // Ángulo 360 grados
  | 'exclusive'       // Modo exclusivo
  | 'layer'           // Capa (0-1000)
  | 'axisWidth'       // Ancho del eje
  | 'gridWidth'       // Ancho de cuadrícula
  | 'showGrid'        // Mostrar cuadrícula
  | 'onlyPositive'    // Solo valores positivos
  | 'centerZoom';     // Zoom centrado

// ============================================================================
// TIPOS PARA MACROS
// ============================================================================

/**
 * Item de macro (plugin o tool)
 *
 * Representa una macro individual en el catálogo de macros disponibles.
 * Puede ser un plugin (extensión) o una herramienta (tool) predefinida.
 *
 * @example
 * // Macro para crear un triángulo equilátero
 * const item: MacroItem = {
 *   key: 'equilateral-triangle',
 *   name: 'Equilateral Triangle'
 * };
 *
 * @example
 * // Macro para bisectriz perpendicular
 * const item: MacroItem = {
 *   key: 'perpendicular-bisector',
 *   name: 'Perpendicular Bisector'
 * };
 *
 * @see MacroCatalog para catálogo de macros disponibles
 * @see ActiveMacro para macro actualmente siendo ejecutada
 */
export type MacroItem = {
  /** Identificador único de la macro (kebab-case). Se usa para referencias internas y en logs */
  key: string;

  /** Nombre legible de la macro mostrado en la UI al usuario */
  name: string;
};

/**
 * Catálogo de macros disponibles
 *
 * Proporciona el listado completo de todas las macros disponibles para
 * ejecutar, separadas por categoría (plugins y tools).
 *
 * @example
 * // Catálogo típico
 * const catalog: MacroCatalog = {
 *   plugins: [
 *     { key: 'equilateral-triangle', name: 'Equilateral Triangle' },
 *     { key: 'isosceles-triangle', name: 'Isosceles Triangle' }
 *   ],
 *   tools: [
 *     { key: 'perpendicular-bisector', name: 'Perpendicular Bisector' },
 *     { key: 'angle-bisector', name: 'Angle Bisector' }
 *   ]
 * };
 *
 * @see MacroItem para estructura de cada item
 * @see ActiveMacro para macro en ejecución
 * @see DgpadBridgeService.getMacroCatalog
 */
export type MacroCatalog = {
  /** Lista de plugins disponibles (extensiones de funcionalidad) */
  plugins: MacroItem[];

  /** Lista de tools disponibles (herramientas predefinidas) */
  tools: MacroItem[];
};

/**
 * Macro activa con prompt actual
 *
 * Representa la macro que está siendo ejecutada en este momento,
 * incluyendo el prompt actual que requiere respuesta del usuario.
 *
 * @example
 * // Macro pidiendo selección de dos puntos
 * const activeMacro: ActiveMacro = {
 *   key: 'equilateral-triangle',
 *   name: 'Equilateral Triangle',
 *   prompt: 'Select the first vertex (point A)',
 *   types: ['Point']
 * };
 *
 * @example
 * // Macro pidiendo selección entre objetos múltiples
 * const activeMacro: ActiveMacro = {
 *   key: 'perpendicular-bisector',
 *   name: 'Perpendicular Bisector',
 *   prompt: 'Select a segment or two points',
 *   types: ['Point', 'Segment']
 * };
 *
 * @see MacroExecutionState para estado global de ejecución
 * @see MacroItem para estructura de la macro
 * @see DgpadBridgeService.getCurrentActiveMacro
 */
export type ActiveMacro = {
  /** Identificador único de la macro en ejecución */
  key: string;

  /** Nombre legible de la macro mostrado al usuario */
  name: string;

  /** Texto del prompt/pregunta actual presentado al usuario */
  prompt: string;

  /** Tipos de objetos aceptados como respuesta válida a este prompt (ej: ['Point', 'Line']) */
  types: string[];
};
