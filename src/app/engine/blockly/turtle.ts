import { Construction } from '../construction/construction';
import { PointObject } from '../objects/point-object';

export interface TurtlePosition {
  x: number;
  y: number;
  angle: number; // en radianes
}

/**
 * Tortuga de dibujo Logo (Turtle Graphics) integrada en el canvas geométrico.
 * Migrado desde TurtleObject.js
 */
export class Turtle {
  private construction: Construction;
  private x = 0;
  private y = 0;
  private heading = 0; // Ángulo en radianes (0 = derecha)
  private penDown = true;
  private visible = true;
  private color = '#008800';
  private penSize = 2;
  private path: { x1: number; y1: number; x2: number; y2: number; color: string; size: number }[] = [];

  constructor(construction: Construction, startX = 0, startY = 0) {
    this.construction = construction;
    this.x = startX;
    this.y = startY;
  }

  forward(distance: number): void {
    const cs = this.construction.getCoordsSystem();
    const pixelDist = cs.l(distance);
    const newX = this.x + Math.cos(this.heading) * pixelDist;
    const newY = this.y - Math.sin(this.heading) * pixelDist;

    if (this.penDown) {
      this.path.push({
        x1: this.x,
        y1: this.y,
        x2: newX,
        y2: newY,
        color: this.color,
        size: this.penSize,
      });
    }

    this.x = newX;
    this.y = newY;
  }

  backward(distance: number): void {
    this.forward(-distance);
  }

  turnRight(degrees: number): void {
    this.heading -= (degrees * Math.PI) / 180;
  }

  turnLeft(degrees: number): void {
    this.heading += (degrees * Math.PI) / 180;
  }

  setHeading(degrees: number): void {
    this.heading = (degrees * Math.PI) / 180;
  }

  penUp(): void {
    this.penDown = false;
  }

  penDownAction(): void {
    this.penDown = true;
  }

  setColor(c: string): void {
    this.color = c;
  }

  setPenSize(s: number): void {
    this.penSize = s;
  }

  setPosition(mathX: number, mathY: number): void {
    const cs = this.construction.getCoordsSystem();
    this.x = cs.px(mathX);
    this.y = cs.py(mathY);
  }

  clear(): void {
    this.path = [];
  }

  reset(mathX = 0, mathY = 0): void {
    this.clear();
    this.setPosition(mathX, mathY);
    this.heading = 0;
    this.penDown = true;
  }

  setVisible(val: boolean): void {
    this.visible = val;
  }

  isVisible(): boolean {
    return this.visible;
  }

  paint(ctx: CanvasRenderingContext2D): void {
    // Dibujar trazos realizados
    for (const seg of this.path) {
      ctx.save();
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = seg.size;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();
      ctx.restore();
    }

    // Dibujar icono de la tortuga (triángulo orientado)
    if (this.visible) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(-this.heading);

      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-8, -7);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }
}
