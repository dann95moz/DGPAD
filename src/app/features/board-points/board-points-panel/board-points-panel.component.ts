import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DgpadBridgeService } from '../../../core/dgpad-bridge/dgpad-bridge.service';
import {
  validateBoardPointsConfig,
  BoardPointsState,
  BOARD_POINTS_INITIAL_STATE,
  BoardPointsConfig,
} from '../board-points-types';

/**
 * Panel para crear tablero de puntos
 *
 * Permite al usuario crear múltiples puntos rápidamente con nombre automático,
 * acelerando el trabajo en construcciones complejas.
 *
 * @example
 * <app-board-points-panel #panel></app-board-points-panel>
 * <button (click)="panel.open()">Create Board Points</button>
 *
 * @see BoardPointsConfig
 * @see DgpadBridgeService.createBoardPoints()
 */
@Component({
  selector: 'app-board-points-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board-points-panel.component.html',
  styleUrl: './board-points-panel.component.css',
})
export class BoardPointsPanelComponent implements OnInit {
  /** Evento emitido cuando el panel se cierra */
  @Output() closed = new EventEmitter<void>();

  /** Estado actual del panel */
  state: BoardPointsState = { ...BOARD_POINTS_INITIAL_STATE };

  constructor(private readonly bridge: DgpadBridgeService) {}

  ngOnInit(): void {
    // Inicializar con valores por defecto
    this.resetState();
  }

  /**
   * Abrir el panel
   */
  open(): void {
    this.state.isVisible = true;
    this.resetState();
  }

  /**
   * Cerrar el panel
   */
  close(): void {
    this.state.isVisible = false;
    this.closed.emit();
  }

  /**
   * Manejador del botón "Create Points"
   *
   * 1. Valida la configuración
   * 2. Llama al bridge para crear los puntos
   * 3. Actualiza el estado con resultado o error
   */
  onCreatePoints(): void {
    // Limpiar errores previos
    this.state.error = null;
    this.state.createdPoints = [];

    // Validar configuración
    const config: BoardPointsConfig = {
      basePattern: this.state.basePattern,
      startNumber: this.state.startNumber,
      endNumber: this.state.endNumber,
    };

    const validation = validateBoardPointsConfig(config);
    if (validation) {
      this.state.error = validation;
      return;
    }

    // Mostrar loading state
    this.state.isCreating = true;

    try {
      // Llamar al bridge
      const result = this.bridge.createBoardPoints(
        this.state.basePattern,
        this.state.startNumber,
        this.state.endNumber
      );

      if (result && result.success) {
        // Éxito
        this.state.createdPoints = result.createdPoints;
      } else {
        // Error
        this.state.error = result?.error || 'Falló la creación de puntos. Intenta de nuevo.';
      }
    } catch (err) {
      // Excepción
      this.state.error = `Error: ${err instanceof Error ? err.message : 'Error desconocido'}`;
    } finally {
      // Quitar loading state
      this.state.isCreating = false;
    }
  }

  /**
   * Resetear el estado del panel a valores por defecto
   */
  private resetState(): void {
    this.state.createdPoints = [];
    this.state.error = null;
    this.state.basePattern = 'A';
    this.state.startNumber = 1;
    this.state.endNumber = 10;
  }

  /**
   * Obtener el número de puntos a crear
   */
  get pointsCount(): number {
    return Math.max(0, this.state.endNumber - this.state.startNumber + 1);
  }

  /**
   * Verificar si el botón "Create" está habilitado
   */
  get isCreateButtonEnabled(): boolean {
    return !this.state.isCreating && this.pointsCount > 0;
  }
}
