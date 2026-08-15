/**
 * Utilidades matemáticas y de cálculo geométrico.
 * Migrado desde $U en Utils.js
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface ArcParams {
  centerX: number;
  centerY: number;
  startAngle: number;
  endAngle: number;
  trigo: boolean;
  aoc: number;
}

export interface AngleParams {
  startAngle: number;
  endAngle: number;
  trigo: boolean;
  aoc: number;
  aoc180: number;
}

export class MathUtils {
  static readonly DOUBLE_PI = 2 * Math.PI;
  static readonly HALF_PI = Math.PI / 2;

  /**
   * Distancia euclidiana entre dos puntos con métodos getX() e getY()
   */
  static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Ángulo trigonométrico en rango [0, 2π)
   */
  static angleH(x: number, y: number): number {
    if (y < 0) {
      return Math.atan2(-y, x);
    }
    return Math.atan2(-y, x) + MathUtils.DOUBLE_PI;
  }

  /**
   * Compara si dos números flotantes son aproximadamente iguales
   */
  static approximatelyEqual(a: number, b: number, epsilon = 1e-10): boolean {
    return Math.abs(a - b) < epsilon;
  }

  /**
   * Vector unitario normalizado de A a B
   */
  static normalize(xA: number, yA: number, xB: number, yB: number): Point2D {
    const len = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
    if (len === 0) {
      return { x: 0, y: 0 };
    }
    return { x: (xB - xA) / len, y: (yB - yA) / len };
  }

  /**
   * Calcula los puntos de intersección de una recta con los bordes de la pantalla
   */
  static computeBorderPoints(
    xA: number,
    yA: number,
    dx: number,
    dy: number,
    width: number,
    height: number,
  ): [number, number, number, number] {
    const l = width + height + Math.abs(xA) + Math.abs(yA);
    return [xA - l * dx, yA - l * dy, xA + l * dx, yA + l * dy];
  }

  /**
   * Radio de circunferencia definida por dos puntos
   */
  static computeRay(xA: number, yA: number, xB: number, yB: number): number {
    const x = xB - xA;
    const y = yB - yA;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Centro del círculo que pasa por 3 puntos A, B, C
   */
  static computeCenter(
    xA: number,
    yA: number,
    xB: number,
    yB: number,
    xC: number,
    yC: number,
  ): [number, number] {
    const xAC = xC - xA;
    const xCB = xB - xC;
    const xBA = xA - xB;
    const yAC = yC - yA;
    const yCB = yB - yC;
    const yBA = yA - yB;

    const d = 2 * (xB * yAC + xC * yBA + xA * yCB);
    if (d === 0) {
      return [xA, yA];
    }

    const x = (xB * xB * yAC + xC * xC * yBA + xA * xA * yCB - yAC * yBA * yCB) / d;
    const y = (xAC * xBA * xCB - xCB * yA * yA - xAC * yB * yB - xBA * yC * yC) / d;
    return [x, y];
  }

  /**
   * Parámetros para trazar un arco de 3 puntos
   */
  static computeArcParams(
    xA: number,
    yA: number,
    xB: number,
    yB: number,
    xC: number,
    yC: number,
  ): ArcParams {
    const [xO, yO] = MathUtils.computeCenter(xA, yA, xB, yB, xC, yC);
    const startAngle = MathUtils.angleH(xA - xO, yA - yO);
    const endAngle = MathUtils.angleH(xC - xO, yC - yO);

    const xBA = xA - xB;
    const yBA = yA - yB;
    const xCB = xB - xC;
    const yCB = yB - yC;

    const trigo = xBA * yCB < yBA * xCB;
    let aoc = trigo
      ? endAngle - startAngle
      : MathUtils.DOUBLE_PI - endAngle + startAngle;

    aoc += ((aoc < 0 ? 1 : 0) - (aoc > MathUtils.DOUBLE_PI ? 1 : 0)) * MathUtils.DOUBLE_PI;

    return {
      centerX: xO,
      centerY: yO,
      startAngle,
      endAngle,
      trigo,
      aoc,
    };
  }

  /**
   * Parámetros para trazar un ángulo entre 3 puntos (A, O, C donde O es vértice)
   */
  static computeAngleParams(
    xA: number,
    yA: number,
    xO: number,
    yO: number,
    xC: number,
    yC: number,
  ): AngleParams {
    const xOA = xA - xO;
    const yOA = yA - yO;
    const xOC = xC - xO;
    const yOC = yC - yO;

    const startAngle = MathUtils.angleH(xOA, yOA);
    const endAngle = MathUtils.angleH(xOC, yOC);
    const trigo = xOA * yOC < yOA * xOC;

    let aoc = endAngle - startAngle;
    aoc += ((aoc < 0 ? 1 : 0) - (aoc > MathUtils.DOUBLE_PI ? 1 : 0)) * MathUtils.DOUBLE_PI;

    const aoc180 = aoc > Math.PI ? MathUtils.DOUBLE_PI - aoc : aoc;

    return {
      startAngle,
      endAngle,
      trigo,
      aoc,
      aoc180,
    };
  }

  /**
   * Verifica si el cursor (xM, yM) está cerca de un punto (xA, yA) con tolerancia d
   */
  static isNearToPoint(xA: number, yA: number, xM: number, yM: number, d: number): boolean {
    if (isNaN(xA + yA + xM + yM)) return false;
    const dx = xM - xA;
    const dy = yM - yA;
    return dx * dx + dy * dy < d * d;
  }

  /**
   * Verifica si el cursor está cerca de un segmento AB
   */
  static isNearToSegment(
    xA: number,
    yA: number,
    xB: number,
    yB: number,
    xM: number,
    yM: number,
    d: number,
  ): boolean {
    if (isNaN(xA + yA + xB + yB)) return false;
    const a = xM * (yB - yA) + xB * (yA - yM) + xA * (yM - yB);
    const xab = xB - xA;
    const yab = yB - yA;
    const dab = xab * xab + yab * yab;
    if (dab < 1e-13) return false;

    const mh2 = (a * a) / dab;
    if (mh2 > d * d) return false;

    const mamb = (xA - xM) * (xB - xM) + (yA - yM) * (yB - yM);
    if (mamb > mh2) return false;

    return true;
  }

  /**
   * Verifica si el cursor está cerca de una semirrecta que nace en A pasando por B
   */
  static isNearToRay(
    xA: number,
    yA: number,
    xB: number,
    yB: number,
    xM: number,
    yM: number,
    d: number,
  ): boolean {
    if (isNaN(xA + yA + xB + yB)) return false;
    const a = xM * (yB - yA) + xB * (yA - yM) + xA * (yM - yB);
    const xab = xB - xA;
    const yab = yB - yA;
    const dab = xab * xab + yab * yab;
    if (dab < 1e-13) return false;
    const mh2 = (a * a) / dab;
    if (mh2 > d * d) return false;
    const mamb = (xA - xM) * (xB - xM) + (yA - yM) * (yB - yM);
    if (mamb > mh2) {
      const ma2 = (xA - xM) * (xA - xM) + (yA - yM) * (yA - yM);
      const mb2 = (xB - xM) * (xB - xM) + (yB - yM) * (yB - yM);
      if (ma2 < mb2) return false;
    }
    return true;
  }

  /**
   * Verifica si el cursor está cerca de una recta infinita
   */
  static isNearToLine(
    xA: number,
    yA: number,
    dx: number,
    dy: number,
    xM: number,
    yM: number,
    d: number,
  ): boolean {
    if (isNaN(xA + yA + dx + dy)) return false;
    const a = dy * (xM - xA) + dx * (yA - yM);
    const mh2 = (a * a) / (dx * dx + dy * dy);
    return mh2 < d * d;
  }

  /**
   * Verifica si el cursor está cerca de la circunferencia de centro (xA, yA) y radio r
   */
  static isNearToCircle(
    xA: number,
    yA: number,
    r: number,
    xM: number,
    yM: number,
    d: number,
  ): boolean {
    if (isNaN(xA + yA + r)) return false;
    const x = xM - xA;
    const y = yM - yA;
    return Math.abs(x * x + y * y - r * r - d * d) < 2 * d * r;
  }

  /**
   * Proyección ortogonal de un punto (x, y) sobre la recta que pasa por (xA, yA) con vector director (dx, dy)
   */
  static projectXY(xA: number, yA: number, dx: number, dy: number, x: number, y: number): [number, number] {
    const d2 = dx * dx + dy * dy;
    if (d2 === 0) return [xA, yA];
    const u = ((x - xA) * dx + (y - yA) * dy) / d2;
    return [xA + u * dx, yA + u * dy];
  }

  /**
   * Intersección exacta entre dos rectas infinitas
   */
  static intersectLines(
    x1: number,
    y1: number,
    dx1: number,
    dy1: number,
    x2: number,
    y2: number,
    dx2: number,
    dy2: number,
  ): Point2D | null {
    const det = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(det) < 1e-12) return null; // Paralelas o coincidentes

    const t = ((x2 - x1) * dy2 - (y2 - y1) * dx2) / det;
    return {
      x: x1 + t * dx1,
      y: y1 + t * dy1,
    };
  }

  /**
   * Intersección entre una recta y una circunferencia
   */
  static intersectLineCircle(
    xL: number,
    yL: number,
    ndx: number,
    ndy: number,
    xC: number,
    yC: number,
    r: number,
  ): [Point2D, Point2D] | null {
    const d = (xC - xL) * ndy - (yC - yL) * ndx;
    const h2 = r * r - d * d;
    if (h2 < 0) return null; // No hay intersección

    const projX = xC - d * ndy;
    const projY = yC + d * ndx;
    const h = Math.sqrt(Math.max(0, h2));

    return [
      { x: projX - h * ndx, y: projY - h * ndy },
      { x: projX + h * ndx, y: projY + h * ndy },
    ];
  }

  /**
   * Intersección entre dos circunferencias
   */
  static intersectCircles(
    xC1: number,
    yC1: number,
    r1: number,
    xC2: number,
    yC2: number,
    r2: number,
  ): [Point2D, Point2D] | null {
    const dx = xC2 - xC1;
    const dy = yC2 - yC1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > r1 + r2 || dist < Math.abs(r1 - r2) || dist === 0) {
      return null;
    }

    const l = (dist * dist + r1 * r1 - r2 * r2) / (2 * dist);
    const h2 = r1 * r1 - l * l;
    if (h2 < 0) return null;

    const ndx = dx / dist;
    const ndy = dy / dist;
    const midX = xC1 + l * ndx;
    const midY = yC1 + l * ndy;
    const h = Math.sqrt(Math.max(0, h2));

    return [
      { x: midX - h * ndy, y: midY + h * ndx },
      { x: midX + h * ndy, y: midY - h * ndx },
    ];
  }

  /**
   * Determina si un punto (xM, yM) está contenido en el arco entre fromAngle y toAngle
   */
  static ptOnArc(xO: number, yO: number, xM: number, yM: number, fromAngle: number, toAngle: number, trigo: boolean): boolean {
    const m = MathUtils.angleH(xM - xO, yM - yO);
    let ea = trigo ? toAngle - fromAngle : MathUtils.DOUBLE_PI - toAngle + fromAngle;
    if (ea > MathUtils.DOUBLE_PI) ea -= MathUtils.DOUBLE_PI;
    if (ea < 0) ea += MathUtils.DOUBLE_PI;

    let em = trigo ? m - fromAngle : MathUtils.DOUBLE_PI - toAngle + m;
    if (em > MathUtils.DOUBLE_PI) em -= MathUtils.DOUBLE_PI;
    if (em < 0) em += MathUtils.DOUBLE_PI;

    return em < ea;
  }

  /**
   * Determina si el puntero está cerca del arco circular
   */
  static isNearToArc(
    xO: number,
    yO: number,
    aoc: number,
    fromAngle: number,
    toAngle: number,
    trigo: boolean,
    r: number,
    xM: number,
    yM: number,
    d: number,
  ): boolean {
    if (isNaN(xO + yO + r)) return false;
    const x = xM - xO;
    const y = yM - yO;
    if (Math.abs(x * x + y * y - r * r - d * d) > 2 * d * r) return false;

    const m = MathUtils.angleH(xM - xO, yM - yO);
    let gom = trigo ? m - fromAngle : MathUtils.DOUBLE_PI - toAngle + m;
    gom += ((gom < 0 ? 1 : 0) - (gom > MathUtils.DOUBLE_PI ? 1 : 0)) * MathUtils.DOUBLE_PI;

    return gom <= aoc;
  }

  /**
   * Convierte color HEX a componentes RGB
   */
  static hexToRGB(hex: string): { r: number; g: number; b: number } {
    if (hex.charAt(0) === '#') {
      const cut = hex.substring(1, 7);
      return {
        r: parseInt(cut.substring(0, 2), 16) || 0,
        g: parseInt(cut.substring(2, 4), 16) || 0,
        b: parseInt(cut.substring(4, 6), 16) || 0,
      };
    }
    return { r: 0, g: 0, b: 0 };
  }

  /**
   * Convierte color HEX a HSV (Hue, Saturation, Value)
   */
  static hexToHSV(hex: string): { h: number; s: number; v: number } {
    const rgb = MathUtils.hexToRGB(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    const s = max === 0 ? 0 : diff / max;
    const v = max;

    if (diff !== 0) {
      if (max === r) {
        h = (g - b) / diff + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / diff + 2;
      } else {
        h = (r - g) / diff + 4;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }

  /**
   * Formatea un arreglo numérico o anidado en representación textual
   */
  static parseArray(arr: unknown, prec?: number): string {
    if (Array.isArray(arr)) {
      const elts = arr.map((item) => MathUtils.parseArray(item, prec));
      return `[${elts.join(', ')}]`;
    }
    if (typeof arr === 'number') {
      if (isNaN(arr)) return '???';
      return prec ? (Math.round(arr * prec) / prec).toString() : arr.toString();
    }
    return String(arr);
  }

  /**
   * Extrae el delta de rotación de rueda del ratón normalizado
   */
  static extractDelta(e: WheelEvent): number {
    if (e.deltaY) return -e.deltaY;
    return 0;
  }

  /**
   * Codifica un string a UTF-8
   */
  static utf8Encode(str: string): string {
    return unescape(encodeURIComponent(str));
  }

  /**
   * Limpia acentos y caracteres especiales de nombres de objetos
   */
  static leaveAccents(str: string): string {
    if (!str) return '';
    return str.replace(/[^\w\d_]/g, '');
  }

  /**
   * Verifica si una estructura representa un punto [x, y]
   */
  static isPoint(val: unknown): val is [number, number] {
    return Array.isArray(val) && (val.length === 2 || val.length === 3) && !isNaN(val[0]) && !isNaN(val[1]);
  }

  /**
   * Extrae las variables matemáticas utilizadas en una expresión (ej: 'x', 'y', 't')
   */
  static getVars(expr: string): string[] {
    const vars: string[] = [];
    for (const v of ['x', 'y', 'z', 't']) {
      if (new RegExp(`(\\W|^)${v}([^\\(]|$)`).test(expr)) {
        vars.push(v);
      }
    }
    return vars;
  }
}

