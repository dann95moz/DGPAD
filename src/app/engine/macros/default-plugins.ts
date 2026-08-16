import { Construction } from '../construction/construction';
import { ExpressionObject } from '../objects/expression-object';
import { PointObject } from '../objects/point-object';
import { TwoPointsLineObject } from '../objects/line-object';
import { MacroDefinition } from './macro';

/**
 * Catálogo de macros y extensiones integradas por defecto en DGPad.
 * Migrado desde plug-ins.js
 */
export const DEFAULT_PLUGINS: MacroDefinition[] = [
  {
    id: 'slope',
    name: 'Pendiente',
    description: 'Calcula la pendiente de una recta dada',
    parameters: ['line'],
    exec: (construction: Construction, inputs) => {
      const r1 = inputs[0] as TwoPointsLineObject;
      const exprName = construction.getUnusedName('Pendiente', null as any);
      const dy = r1.getDY ? r1.getDY() : 0;
      const dx = r1.getDX ? r1.getDX() : 1;
      const slopeVal = dx !== 0 ? (-dy / dx).toFixed(2) : '∞';

      const expr = new ExpressionObject(
        construction,
        exprName,
        `m = ${slopeVal}`,
        150,
        150,
      );
      construction.addObject(expr);
      construction.computeAll();
      return [expr];
    },
  },
  {
    id: 'distance',
    name: 'Distancia',
    description: 'Calcula la distancia euclidiana entre 2 puntos',
    parameters: ['point', 'point'],
    exec: (construction: Construction, inputs) => {
      const p1 = inputs[0] as PointObject;
      const p2 = inputs[1] as PointObject;
      const exprName = construction.getUnusedName('Dist', null as any);
      const d = Math.sqrt(
        (p2.getX() - p1.getX()) ** 2 + (p2.getY() - p1.getY()) ** 2,
      ).toFixed(2);

      const expr = new ExpressionObject(
        construction,
        exprName,
        `d(${p1.getName()}, ${p2.getName()}) = ${d}`,
        (p1.getX() + p2.getX()) / 2,
        (p1.getY() + p2.getY()) / 2 - 20,
      );
      construction.addObject(expr);
      construction.computeAll();
      return [expr];
    },
  },
  {
    id: 'RegPolCenter',
    name: 'Polígono Regular (Centro)',
    description: 'Construye los vértices de un polígono regular dado centro, vértice inicial y número de lados',
    parameters: ['point', 'point', 'expression'],
    exec: (construction: Construction, inputs) => {
      const center = inputs[0] as PointObject;
      const vertex = inputs[1] as PointObject;
      const sides = Math.max(3, Math.round((inputs[2] as ExpressionObject).getValue() || 5));

      const cx = center.getX();
      const cy = center.getY();
      const vx = vertex.getX();
      const vy = vertex.getY();
      const r = Math.sqrt((vx - cx) ** 2 + (vy - cy) ** 2);
      const baseAngle = Math.atan2(vy - cy, vx - cx);

      const created: PointObject[] = [vertex];
      for (let i = 1; i < sides; i++) {
        const theta = baseAngle + (2 * Math.PI * i) / sides;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        const pt = new PointObject(
          construction,
          construction.getUnusedName('P', null as any),
          x,
          y,
        );
        construction.addObject(pt);
        created.push(pt);
      }

      construction.computeAll();
      return created;
    },
  },
];
