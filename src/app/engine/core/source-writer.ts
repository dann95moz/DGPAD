import { MathUtils } from './math-utils';

export interface ISourceConstruction {
  getVarName(name: string): string;
}

/**
 * Generador y serializador de scripts para construcciones geométricas de DGPad.
 * Migrado desde SourceWriter.js
 */
export class SourceWriter {
  private cn: ISourceConstruction;
  private geom = '';
  private style = '';
  private block = '';

  constructor(cn: ISourceConstruction) {
    this.cn = cn;
  }

  getGeom(): string {
    return this.geom.replace(/\u03C0/g, '\\u03C0');
  }

  getStyle(): string {
    return this.style;
  }

  getBlock(): string {
    return this.block;
  }

  geomWrite(withQuotes: boolean, name: string, code: string, ...args: (string | number | boolean | (string | number)[])[]): void {
    const params: string[] = [];
    for (const arg of args) {
      let myarg = withQuotes ? `"${arg}"` : String(arg);
      if (Array.isArray(arg)) {
        myarg = `[${arg.join(',')}]`;
      }
      params.push(myarg);
    }

    const varName = this.cn.getVarName(name);
    const escapedName = MathUtils.leaveAccents(name);

    if (params.length === 0) {
      this.geom += `${varName}=${code}("${escapedName}");\n`;
    } else {
      this.geom += `${varName}=${code}("${escapedName}",${params.join(',')});\n`;
    }
  }

  styleWrite(withQuotes: boolean, name: string, code: string, ...args: (string | number | boolean)[]): void {
    const params: string[] = [];
    for (const arg of args) {
      const myarg = withQuotes ? `"${arg}"` : String(arg);
      params.push(myarg);
    }
    const varName = this.cn.getVarName(name);
    this.style += `${code}(${varName},${params.join(',')});\n`;
  }

  blockWrite(name: string, src: string, code: string): void {
    const varName = this.cn.getVarName(name);
    this.block += `${code}(${varName},${src});\n`;
  }

  getSource(): string {
    return `${this.getGeom()}\n${this.getStyle()}\n${this.getBlock()}`.trim();
  }

  clear(): void {
    this.geom = '';
    this.style = '';
    this.block = '';
  }
}
