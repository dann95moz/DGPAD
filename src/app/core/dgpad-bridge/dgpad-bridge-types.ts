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
 * @example
 * // Crear puntos A1, A2, A3, ..., A100
 * const request: BoardPointsRequest = {
 *   basePattern: 'A',
 *   startNumber: 1,
 *   endNumber: 100
 * };
 */
export type BoardPointsRequest = {
  /** Patrón base del nombre (ej: "A", "P", "Point") */
  basePattern: string;

  /** Número inicial del rango (ej: 1) */
  startNumber: number;

  /** Número final del rango (ej: 100) */
  endNumber: number;
};

/**
 * Resultado de la operación de creación de tablero de puntos
 *
 * @example
 * // Respuesta exitosa
 * const result: BoardPointsResult = {
 *   success: true,
 *   createdPoints: ['A1', 'A2', 'A3', ..., 'A100']
 * };
 */
export type BoardPointsResult = {
  /** Indica si la operación fue exitosa */
  success: boolean;

  /** Lista de nombres de puntos creados (ej: ["A1", "A2", ...]) */
  createdPoints: string[];

  /** Mensaje de error si la operación falló */
  error?: string;
};

// ============================================================================
// FEATURE 2: CONVERSIONES DE CALCULADORA
// ============================================================================

/**
 * Resultado de una operación de conversión (expresión → objeto geométrico)
 *
 * Utilizado para convertir expresiones matemáticas en:
 * - PointObject (convertExpressionToPoint)
 * - ListObject (convertExpressionToList)
 * - FunctionObject (convertExpressionToFunction)
 */
export type ConversionResult = {
  /** Indica si la conversión fue exitosa */
  success: boolean;

  /** Nombre del objeto creado (ej: "a", "list_1", "f") */
  objectName?: string;

  /** Mensaje de error si la conversión falló */
  error?: string;
};

// ============================================================================
// FEATURE 2B: HERRAMIENTAS ADICIONALES (Other Tools)
// ============================================================================

/**
 * Resultado de la ejecución de una herramienta
 *
 * Utilizado para crear:
 * - Blockly Button
 * - Expression Points/Segments
 * - Cursores (Integer/Continuous)
 * - Edit Widget
 */
export type ToolExecutionResult = {
  /** Indica si la herramienta se ejecutó correctamente */
  success: boolean;

  /** Mensaje informativo o confirmación */
  message: string;

  /** Lista de objetos creados por la herramienta */
  createdObjects?: string[];

  /** Mensaje de error si la operación falló */
  error?: string;
};

/**
 * Configuración para crear un cursor (slider)
 *
 * Se utiliza tanto para cursores enteros como continuos
 */
export type CursorConfig = {
  /** Nombre del cursor (ej: "n", "m", "slider_1") */
  name?: string;

  /** Valor mínimo del rango */
  minValue: number;

  /** Valor máximo del rango */
  maxValue: number;

  /** Incremento (solo para cursores enteros, default: 1) */
  increment?: number;
};

// ============================================================================
// FEATURE 4: HISTORIAL (History)
// ============================================================================

/**
 * Snapshot del historial de la construcción
 *
 * Contiene una fotografía del estado de la construcción en un momento específico
 */
export type HistorySnapshot = {
  /** Índice único del snapshot en el historial */
  index: number;

  /** Timestamp ISO 8601 de cuándo se guardó */
  date: string;

  /** Imagen en miniatura como base64 PNG */
  thumbnail: string;

  /** Indica si este snapshot está bloqueado (protegido de borrado) */
  lock: boolean;
};

/**
 * Tipo de acción posible en el historial
 */
export type HistoryAction = 'undo' | 'redo' | 'save' | 'load' | 'delete' | 'clear';

// ============================================================================
// FEATURE 5: PROPIEDADES AVANZADAS
// ============================================================================

/**
 * Restricción o validación para una propiedad editable
 *
 * Define límites y validación para propiedades específicas por tipo de objeto
 */
export type PropertyConstraint = {
  /** Tipo de datos de la propiedad */
  type: 'number' | 'boolean' | 'select' | 'enum';

  /** Valor mínimo (para tipo 'number') */
  minValue?: number;

  /** Valor máximo (para tipo 'number') */
  maxValue?: number;

  /** Paso/incremento (para tipo 'number', default: 1) */
  step?: number;

  /** Valores permitidos (para tipo 'select' o 'enum') */
  allowedValues?: (string | number)[];

  /** Valor por defecto si no se especifica */
  defaultValue?: unknown;

  /** Texto de ayuda para el usuario */
  help?: string;
};

/**
 * Esquema de propiedades para un tipo de objeto específico
 *
 * Mapeo de nombre de propiedad a su restricción/validación
 */
export type PropertySchema = Record<string, PropertyConstraint>;

// ============================================================================
// FEATURE 6: MACROS
// ============================================================================

/**
 * Respuesta a un prompt de entrada en la ejecución de macro
 */
export type MacroPromptResponse = {
  /** Índice del prompt actual en la secuencia */
  promptIndex: number;

  /** Respuesta proporcionada por el usuario */
  response: string;

  /** Indica si la respuesta es válida */
  isValid: boolean;

  /** Mensaje de error si la respuesta no es válida */
  errorMessage?: string;
};

/**
 * Estado de ejecución de una macro
 *
 * Utilizado para rastrear la máquina de estados de ejecución de macros
 */
export type MacroExecutionState = 'idle' | 'executing' | 'awaiting_input' | 'completed' | 'error';

/**
 * Draft (borrador) de una ejecución de macro
 *
 * Permite guardar el estado parcial de una macro para continuar después
 */
export type MacroDraft = {
  /** Parámetros/respuestas proporcionadas hasta ahora */
  params: string[];

  /** Objetos seleccionados como targets */
  targets: string[];
};

// ============================================================================
// FEATURE 8: EXPORTACIÓN
// ============================================================================

/**
 * Formato de exportación disponible
 */
export type ExportFormat = 'text' | 'html-js' | 'html' | 'responsive' | 'svg' | 'png';

/**
 * Resultado de una operación de exportación
 *
 * Contiene el contenido exportado y metadatos para descarga
 */
export type ExportResult = {
  /** Formato de exportación utilizado */
  format: ExportFormat;

  /** Contenido exportado (string para formatos texto, Blob para binarios) */
  content: string | Blob;

  /** MIME type del contenido (ej: "text/plain", "image/png") */
  mimeType: string;

  /** Nombre de archivo sugerido para descarga */
  filename: string;

  /** Tamaño en bytes del contenido */
  size: number;
};

// ============================================================================
// FEATURE 7: NOMBRES (Names)
// ============================================================================

/**
 * Información de un objeto en la lista de nombres
 */
export type ObjectNameInfo = {
  /** Nombre actual del objeto */
  name: string;

  /** Familia/tipo del objeto (ej: "Point", "Line", "Circle") */
  family: string;
};

// ============================================================================
// MANEJO DE ERRORES
// ============================================================================

/**
 * Código de error del bridge
 *
 * Identifica el tipo específico de error que ocurrió
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
 * Proporciona contexto detallado sobre qué salió mal en una operación
 */
export type BridgeError = {
  /** Código de error específico para clasificación */
  code: BridgeErrorCode;

  /** Mensaje de error legible para el usuario */
  message: string;

  /** Contexto adicional (valores, IDs de objeto, etc.) */
  context?: Record<string, unknown>;

  /** Timestamp en milisegundos cuando ocurrió el error */
  timestamp: number;
};

// ============================================================================
// TIPOS DE OPCIONES PARA OPERACIONES
// ============================================================================

/**
 * Opciones para operaciones de exportación
 *
 * Controla el comportamiento de la exportación (qué incluir, cómo formatear, etc.)
 */
export type ExportOptions = {
  /** Fijar posición de widgets en la exportación */
  fixWidgets: boolean;

  /** Fijar scripts de DGPad (no permitir ejecución) */
  fixDgScripts: boolean;

  /** Ocultar panel de control en la exportación */
  hideControlPanel: boolean;

  /** Deshabilitar zoom en la exportación */
  disableZoom: boolean;
};

// ============================================================================
// TIPOS PARA PROPIEDADES AVANZADAS
// ============================================================================

/**
 * Propiedad editable avanzada (específica por tipo de objeto)
 *
 * Extensión de propiedades básicas para tipos específicos
 */
export type AdvancedEditableProperty =
  | 'precision'       // Precisión de cálculo
  | 'increment'       // Incremento de cursor
  | 'shape'           // Forma del punto (0-4)
  | 'dash'            // Línea discontinua
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
 */
export type MacroItem = {
  /** Identificador único de la macro */
  key: string;

  /** Nombre legible de la macro */
  name: string;
};

/**
 * Catálogo de macros disponibles
 */
export type MacroCatalog = {
  /** Lista de plugins disponibles */
  plugins: MacroItem[];

  /** Lista de tools disponibles */
  tools: MacroItem[];
};

/**
 * Macro activa con prompt actual
 */
export type ActiveMacro = {
  /** Identificador único de la macro */
  key: string;

  /** Nombre legible de la macro */
  name: string;

  /** Texto del prompt actual */
  prompt: string;

  /** Tipos de objetos aceptados como respuesta */
  types: string[];
};
