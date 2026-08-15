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
}
