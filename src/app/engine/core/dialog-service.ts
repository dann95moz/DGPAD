/**
 * Servicio de diálogos nativos y accesibilidad de audio/voz.
 * Migrado desde $U.alert, $U.confirm, $U.prompt en Utils.js y DGPad.js
 */
export class DialogService {
  /**
   * Muestra un aviso al usuario y opcionalmente sintetiza la voz
   */
  static alert(text: string, speaker = false): Promise<void> {
    if (speaker && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Error al reproducir voz:', err);
      }
    }

    if (typeof window !== 'undefined') {
      window.alert(text);
    }
    return Promise.resolve();
  }

  /**
   * Muestra una confirmación Sí/No con soporte opcional de lectura de voz
   */
  static confirm(text: string, speaker = false): Promise<boolean> {
    if (speaker && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Error al reproducir voz:', err);
      }
    }

    const result = typeof window !== 'undefined' ? window.confirm(text) : true;
    return Promise.resolve(result);
  }

  /**
   * Solicita un texto o valor al usuario
   */
  static prompt(message: string, defaultValue = ''): Promise<string | null> {
    const result = typeof window !== 'undefined' ? window.prompt(message, defaultValue) : defaultValue;
    return Promise.resolve(result);
  }
}
