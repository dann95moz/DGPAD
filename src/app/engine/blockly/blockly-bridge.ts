import { Construction } from '../construction/construction';
import { Turtle } from './turtle';

export interface BlocklyProgram {
  id: string;
  xml: string;
  jsCode: string;
}

/**
 * Gestor y puente de ejecución de programas de Blockly en DGPad.
 * Migrado desde BlocklyManager.js
 */
export class BlocklyBridge {
  private construction: Construction;
  private turtle: Turtle;
  private programs: Map<string, BlocklyProgram> = new Map();

  constructor(construction: Construction) {
    this.construction = construction;
    this.turtle = new Turtle(construction);
  }

  getTurtle(): Turtle {
    return this.turtle;
  }

  registerProgram(id: string, xml: string, jsCode: string): void {
    this.programs.set(id, { id, xml, jsCode });
  }

  getProgram(id: string): BlocklyProgram | undefined {
    return this.programs.get(id);
  }

  runProgram(id: string): void {
    const prog = this.programs.get(id);
    if (!prog) return;

    try {
      this.turtle.clear();
      // eslint-disable-next-line no-new-func
      const fn = new Function('turtle', 'cn', prog.jsCode);
      fn(this.turtle, this.construction);
      this.construction.computeAll();
    } catch (e) {
      console.error(`Error running Blockly program "${id}":`, e);
    }
  }

  paint(ctx: CanvasRenderingContext2D): void {
    this.turtle.paint(ctx);
  }
}
