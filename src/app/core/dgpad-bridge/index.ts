/**
 * DGPad Bridge Module - Public API
 *
 * Punto de acceso centralizado para la comunicación entre Angular y DGPad Legacy.
 * Exporta todos los tipos, interfaces y servicios necesarios.
 *
 * @example
 * // Importar tipos específicos
 * import { BoardPointsRequest, ExportOptions, DgpadBridgeService } from '@app/core/dgpad-bridge';
 *
 * @example
 * // Inyectar el servicio en un componente
 * constructor(private readonly bridge: DgpadBridgeService) {}
 */

// ============================================================================
// EXPORTACIONES DE TIPOS
// ============================================================================

// Feature 1: Board Points
export type { BoardPointsRequest, BoardPointsResult } from './dgpad-bridge-types';

// Feature 2: Conversiones
export type { ConversionResult } from './dgpad-bridge-types';

// Feature 2B: Herramientas Adicionales
export type { ToolExecutionResult, CursorConfig } from './dgpad-bridge-types';

// Feature 4: Historial
export type { HistorySnapshot, HistoryAction } from './dgpad-bridge-types';

// Feature 5: Propiedades Avanzadas
export type {
  PropertyConstraint,
  PropertySchema,
  AdvancedEditableProperty,
} from './dgpad-bridge-types';

// Feature 6: Macros
export type {
  MacroPromptResponse,
  MacroExecutionState,
  MacroDraft,
  MacroItem,
  MacroCatalog,
  ActiveMacro,
} from './dgpad-bridge-types';

// Feature 8: Exportación
export type { ExportFormat, ExportOptions, ExportResult } from './dgpad-bridge-types';

// Feature 7: Nombres
export type { ObjectNameInfo } from './dgpad-bridge-types';

// Manejo de Errores
export type { BridgeErrorCode, BridgeError } from './dgpad-bridge-types';

// ============================================================================
// EXPORTACIONES DE SERVICIOS
// ============================================================================

export { DgpadBridgeService } from './dgpad-bridge.service';
