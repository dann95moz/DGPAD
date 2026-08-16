export interface IEngineTimer {
  start(): void;
  clear(): void;
  isRunnable(): boolean;
  setDelay(delay: number): void;
}

/**
 * Temporizador individual con soporte para cancelación y retardo dinámico.
 * Migrado desde $U.timer en Utils.js
 */
export class EngineTimer<T = any> implements IEngineTimer {
  private delay: number;
  private proc: (param?: T) => void;
  private param?: T;
  private runnable = true;
  private timeoutId: any = null;

  constructor(proc: (param?: T) => void, delay: number, param?: T) {
    this.proc = proc;
    this.delay = delay;
    this.param = param;
  }

  start(): void {
    if (this.runnable) {
      this.timeoutId = setTimeout(() => {
        this.runnable = false;
        this.proc(this.param);
      }, this.delay);
    }
  }

  isRunnable(): boolean {
    return this.runnable;
  }

  clear(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  setDelay(delay: number): void {
    this.clear();
    this.delay = delay;
    this.start();
  }
}

/**
 * Cola de temporizadores secuenciales con retardo incremental.
 * Migrado desde $U.timers en Utils.js
 */
export class EngineTimers {
  private defaultDelay: number;
  private currentDelay = 0;
  private timers: IEngineTimer[] = [];

  constructor(delay = 100) {
    this.defaultDelay = delay;
  }

  push<T>(proc: (param?: T) => void, param?: T): void {
    this.currentDelay += this.defaultDelay;
    this.timers.push(new EngineTimer<T>(proc, this.currentDelay, param));
  }

  start(): void {
    for (const timer of this.timers) {
      timer.start();
    }
  }

  stop(): void {
    for (const timer of this.timers) {
      timer.clear();
    }
  }

  clear(): void {
    this.stop();
    this.currentDelay = 0;
    this.timers = [];
  }
}

/**
 * Medidor de tiempo transcurrido y detección de timeout.
 * Migrado desde $U.TimeOut en Utils.js
 */
export class TimeOutTracker {
  private time = 0;
  private delay: number;
  private callback: () => void;
  private timeoutId: any = null;

  constructor(delay: number, callback: () => void) {
    this.delay = delay;
    this.callback = callback;
  }

  start(): void {
    this.stop();
    this.time = Date.now();
    this.timeoutId = setTimeout(this.callback, this.delay);
  }

  stop(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.time = 0;
  }

  isTimeout(): boolean {
    return Date.now() - this.time > this.delay;
  }
}
