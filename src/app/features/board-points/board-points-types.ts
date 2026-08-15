/**
 * Tipos para la feature de Tablero de Puntos (Board Points)
 *
 * Feature que permite crear múltiples puntos rápidamente con nombre automático,
 * para acelerar el trabajo en construcciones complejas que requieren muchos puntos.
 */

/**
 * Estado del panel de Tablero de Puntos
 */
export type BoardPointsState = {
  /** Panel está visible */
  isVisible: boolean;
  /** Operación de creación en progreso */
  isCreating: boolean;
  /** Patrón base del nombre (ej: "A", "P", "Punto") */
  basePattern: string;
  /** Número inicial del rango (inclusive) */
  startNumber: number;
  /** Número final del rango (inclusive) */
  endNumber: number;
  /** Nombres de puntos creados */
  createdPoints: string[];
  /** Mensaje de error si la creación falló */
  error: string | null;
};

/**
 * Configuración para crear un conjunto de puntos
 */
export type BoardPointsConfig = {
  /** Patrón base del nombre (ej: "A", "P", "Punto") */
  basePattern: string;
  /** Número inicial del rango (inclusive) */
  startNumber: number;
  /** Número final del rango (inclusive) */
  endNumber: number;
};

/**
 * Resultado de la operación de crear puntos
 */
export type BoardPointsResult = {
  /** Operación completada exitosamente */
  success: boolean;
  /** Nombres de puntos creados */
  createdPoints: string[];
  /** Mensaje de error si falló */
  error?: string;
};

/**
 * Validar configuración de Board Points
 *
 * @param config Configuración a validar
 * @returns Mensaje de error o null si válida
 *
 * @example
 * const error = validateBoardPointsConfig({
 *   basePattern: 'A',
 *   startNumber: 1,
 *   endNumber: 10
 * });
 * if (error) console.error(error);
 */
export const validateBoardPointsConfig = (config: BoardPointsConfig): string | null => {
  // Validar que el patrón no esté vacío
  if (!config.basePattern || config.basePattern.trim().length === 0) {
    return 'El patrón base no puede estar vacío';
  }

  // Validar que el patrón sea válido (solo letras, números y guiones)
  if (!/^[a-zA-Z0-9_-]+$/.test(config.basePattern)) {
    return 'El patrón base solo puede contener letras, números, guiones y guiones bajos';
  }

  // Validar que el número inicial sea no negativo
  if (config.startNumber < 0) {
    return 'El número inicial debe ser no negativo';
  }

  // Validar que el número final sea mayor o igual que el inicial
  if (config.endNumber < config.startNumber) {
    return 'El número final debe ser mayor o igual que el número inicial';
  }

  // Validar que no se intente crear demasiados puntos a la vez
  const count = config.endNumber - config.startNumber + 1;
  if (count > 1000) {
    return 'No se pueden crear más de 1000 puntos a la vez. Límite recomendado: 100';
  }

  return null;
};

/**
 * Estado inicial para el panel de Board Points
 */
export const BOARD_POINTS_INITIAL_STATE: BoardPointsState = {
  isVisible: false,
  isCreating: false,
  basePattern: 'A',
  startNumber: 1,
  endNumber: 10,
  createdPoints: [],
  error: null,
};
