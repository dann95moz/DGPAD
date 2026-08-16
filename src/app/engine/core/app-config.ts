/**
 * Configuración global del entorno de ejecución de DGPad.
 * Migrado desde DGPad.js y Utils.js
 */
export class AppConfig {
  static readonly isTouchDevice: boolean =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

  static scale = 1;
  static isApplication = false;
  static isIOSApplication = false;
  static echoSource = false;

  static getLanguage(): string {
    if (typeof navigator !== 'undefined') {
      const code = navigator.language || (navigator as any).userLanguage || 'es';
      return code.toUpperCase().split('-')[0];
    }
    return 'ES';
  }
}
