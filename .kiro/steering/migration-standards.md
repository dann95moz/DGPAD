# Estándares de Migración a Angular

## Visión General

Este documento establece los estándares para la migración progresiva de DGPad de JavaScript legado a Angular 19.

## Principios Fundamentales

### 1. Migración Incremental

- **NUNCA** reescribir todo de una vez
- Migrar feature por feature, componente por componente
- Mantener compatibilidad total durante todo el proceso
- Cada PR debe dejar la aplicación en estado funcional

### 2. Patrón de Puente (Bridge Pattern)

Todas las comunicaciones entre Angular y DGPad legacy deben pasar por `DgpadBridgeService`:

```
Angular Component → DgpadBridgeService → iframe (DGPad legacy) → Bridge
```

- **NUNCA** acceder directamente al iframe desde componentes
- **NUNCA** usar `window.eval` directamente fuera del bridge
- Mantener toda la lógica de comunicación encapsulada en el bridge

### 3. Separación de Responsabilidades

- **Components Angular**: UI y eventos
- **DgpadBridgeService**: Comunicación y traducción
- **DGPad legacy**: Lógica geométrica y renderizado

## Estructura de Archivos

### Ruta de Componentes

```
src/app/features/[feature-name]/
├── [feature]-panel/              # Componente principal
│   ├── [feature]-panel.component.ts
│   ├── [feature]-panel.component.html
│   ├── [feature]-panel.component.css
│   └── [feature]-panel.component.html
├── [feature]-dialog/             # Diálogos (si aplica)
│   └── ...
└── [feature]-types.ts            # Types definitivos
```

### Ruta de Servicios

```
src/app/core/dgpad-bridge/
└── dgpad-bridge.service.ts       # UNICO punto de comunicación
```

## Estilos de Código

### Componentes Angular

```typescript
// ✅ Correcto: Componente ligero, delega al bridge
@Component({
  selector: 'app-widget-panel',
  template: `...`
})
export class WidgetPanelComponent {
  constructor(private readonly bridge: DgpadBridgeService) {}

  updateProperty(property, value) {
    this.bridge.updateWidgetProperty(property, value);
  }
}
```

```typescript
// ❌ Incorrecto: Lógica de comunicación en el componente
@Component({...})
export class WidgetPanelComponent {
  updateProperty(property, value) {
    const iframe = document.getElementById('dgpad-legacy-frame');
    iframe.contentWindow.eval(`...`); // NUNCA
  }
}
```

### Tipos TypeScript

```typescript
// ✅ Definir tipos en el bridge
export type LegacyWidgetState = {
  color: string;
  opacity: number;
  borderSize: number;
  // ...
};
```

### Manejo de Errores

```typescript
// ✅ Validar antes de llamar al bridge
openWidgetPanel(): void {
  if (!this.bridge.getWidgetState()) {
    console.warn('No hay widget seleccionado');
    return;
  }
  this.visible = true;
}
```

## Pruebas

### Unitarias

- Todo servicio del bridge debe tener tests
- Tests deben cubrir casos de éxito y error
- Mockear el iframe cuando sea necesario

### Integración

- Probar comunicación completa: Componente → Bridge → iframe
- Verificar que el estado se sincronice correctamente
- Probar conversión de tipos

### Manuales

Antes de mergear:
1. Probar en navegador (Chrome)
2. Verificar no hay errores en consola
3. Probar operaciones básicas (crear, mover, editar)
4. Verificar exportación funciona

## Checklist de Migración

Antes de considerar una feature migrada:

- [ ] Componente Angular funcional
- [ ] Bridge service implementado
- [ ] Tests unitarios pasando
- [ ] Probado manualmente en navegador
- [ ] Documentación actualizada
- [ ] No hay warnings en consola
- [ ] No hay memory leaks (event listeners limpios)

## Convenciones de Nombres

| Contexto | Prefijo | Sufijo | Ejemplo |
|----------|---------|--------|---------|
| Componente Panel | `app-` | `-panel` | `app-widget-panel` |
| Componente Dialog | `app-` | `-dialog` | `app-export-dialog` |
| Interface Legacy | `Legacy` | `State` | `LegacyWidgetState` |
| Interface Angular | (ninguno) | `State` | `WidgetState` |
| Service | (ninguno) | `Service` | `DgpadBridgeService` |

## Referencias

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Naming Conventions](https://typescript-eslint.io/rules/naming-convention/)
- Código legacy: `public/dgpad-legacy/scripts/`
