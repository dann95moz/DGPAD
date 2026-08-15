/**
 * Evaluador y simplificador simbólico de expresiones algebraicas.
 * Migrado desde SymbolicCompute.js
 */
export class SymbolicCompute {
  static isNum(str: string): boolean {
    return /^\d+(\.\d+)?$/.test(str);
  }

  static isVar(str: string): boolean {
    return /^[xyzt]$/.test(str);
  }

  static evaluate(expr: string, context: Record<string, number> = {}): number {
    if (!expr) return NaN;

    try {
      let sanitized = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/pi|π/gi, 'Math.PI')
        .replace(/\^/g, '**');

      for (const [key, val] of Object.entries(context)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        sanitized = sanitized.replace(regex, String(val));
      }

      // eslint-disable-next-line no-new-func
      const fn = new Function(`return (${sanitized});`);
      const res = fn();
      return typeof res === 'number' ? res : NaN;
    } catch {
      return NaN;
    }
  }

  static simplify(expr: string): string {
    if (!expr) return '';
    return expr.trim().replace(/\s+/g, '');
  }
}
