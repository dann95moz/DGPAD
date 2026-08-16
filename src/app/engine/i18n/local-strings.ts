export type SupportedLang = 'es' | 'en' | 'fr';

export interface LocalStringsDict {
  dot: string;
  comma: string;
  number: (n: number | string) => string;
  number2: (n: string) => string;
  object: Record<string, string>;
  objectFamily: Record<string, string>;
  tooltips: Record<string, string>;
  macros: Record<string, string>;
  properties: Record<string, string>;
  dialogs: Record<string, string>;
}

export const ES_STRINGS: LocalStringsDict = {
  dot: ',',
  comma: ';',
  number: (n) => n.toString().replace('.', ','),
  number2: (n) => n.toString().replace(',', '.'),
  object: {
    point: 'Punto',
    line: 'Recta',
    circle: 'Círculo',
    segment: 'Segmento',
    area: 'Polígono',
    anglebisector: 'Bisectriz',
    circle3pts: 'Circuncírculo',
    locus: 'Lugar',
    midpoint: 'Punto medio',
    parallel: 'Recta paralela',
    perpbisector: 'Mediatriz',
    plumb: 'Recta perpendicular',
    ray: 'Semirrecta',
    syma: 'Simetría axial',
    symc: 'Simetría central',
    list: 'Lista',
    expression: 'Expresión',
    vector: 'Vector',
    angle: 'Ángulo',
  },
  objectFamily: {
    point: 'Puntos',
    line: 'Líneas',
    circle: 'Círculos',
    area: 'Polígonos',
    angle: 'Ángulos',
    expression: 'Expresiones',
    list: 'Listas',
  },
  tooltips: {
    pointer: 'Mover y seleccionar objetos',
    point: 'Crear punto',
    segment: 'Crear segmento entre 2 puntos',
    line: 'Crear recta que pasa por 2 puntos',
    ray: 'Crear semirrecta',
    circle: 'Crear círculo',
    polygon: 'Crear polígono',
    midpoint: 'Punto medio',
    parallel: 'Recta paralela',
    plumb: 'Recta perpendicular',
    perpbisector: 'Mediatriz',
    anglebisector: 'Bisectriz de ángulo',
    circle3pts: 'Círculo por 3 puntos',
    angle: 'Medir ángulo',
    vector: 'Crear vector',
    symc: 'Simetría central',
    syma: 'Simetría axial',
    undo: 'Deshacer',
    redo: 'Rehacer',
    delete: 'Eliminar objeto',
    hide: 'Ocultar o mostrar objeto',
    grid: 'Alternar cuadrícula',
    zoom: 'Restablecer zoom',
  },
  macros: {
    slope: 'Pendiente',
    distance: 'Distancia entre 2 puntos',
    distanceLine: 'Distancia punto-recta',
    RegPolCenter: 'Polígono regular (centro)',
    RegPolSide: 'Polígono regular (lado)',
    repere: 'Referencial 3D',
  },
  properties: {
    color: 'Color',
    size: 'Grosor / Tamaño',
    opacity: 'Opacidad',
    layer: 'Capa',
    fontSize: 'Tamaño de fuente',
    precision: 'Decimales',
    showName: 'Mostrar nombre',
  },
  dialogs: {
    confirm: 'Confirmar',
    alert: 'Aviso',
    prompt: 'Ingresar valor',
    accept: 'Aceptar',
    cancel: 'Cancelar',
    yes: 'Sí',
    no: 'No',
  },
};

export const EN_STRINGS: LocalStringsDict = {
  dot: '.',
  comma: ',',
  number: (n) => n.toString(),
  number2: (n) => n.toString(),
  object: {
    point: 'Point',
    line: 'Line',
    circle: 'Circle',
    segment: 'Segment',
    area: 'Polygon',
    anglebisector: 'Angle bisector',
    circle3pts: 'Circumcircle',
    locus: 'Locus',
    midpoint: 'Midpoint',
    parallel: 'Parallel line',
    perpbisector: 'Perpendicular bisector',
    plumb: 'Perpendicular line',
    ray: 'Ray',
    syma: 'Axial symmetry',
    symc: 'Central symmetry',
    list: 'List',
    expression: 'Expression',
    vector: 'Vector',
    angle: 'Angle',
  },
  objectFamily: {
    point: 'Points',
    line: 'Lines',
    circle: 'Circles',
    area: 'Polygons',
    angle: 'Angles',
    expression: 'Expressions',
    list: 'Lists',
  },
  tooltips: {
    pointer: 'Move and select objects',
    point: 'Create point',
    segment: 'Create segment between 2 points',
    line: 'Create line through 2 points',
    ray: 'Create ray',
    circle: 'Create circle',
    polygon: 'Create polygon',
    midpoint: 'Midpoint',
    parallel: 'Parallel line',
    plumb: 'Perpendicular line',
    perpbisector: 'Perpendicular bisector',
    anglebisector: 'Angle bisector',
    circle3pts: 'Circle through 3 points',
    angle: 'Measure angle',
    vector: 'Create vector',
    symc: 'Central symmetry',
    syma: 'Axial symmetry',
    undo: 'Undo',
    redo: 'Redo',
    delete: 'Delete object',
    hide: 'Hide/show object',
    grid: 'Toggle grid',
    zoom: 'Reset zoom',
  },
  macros: {
    slope: 'Slope',
    distance: 'Distance between 2 points',
    distanceLine: 'Distance point to line',
    RegPolCenter: 'Regular polygon (center)',
    RegPolSide: 'Regular polygon (side)',
    repere: '3D frame',
  },
  properties: {
    color: 'Color',
    size: 'Thickness / Size',
    opacity: 'Opacity',
    layer: 'Layer',
    fontSize: 'Font size',
    precision: 'Precision',
    showName: 'Show name',
  },
  dialogs: {
    confirm: 'Confirm',
    alert: 'Notice',
    prompt: 'Enter value',
    accept: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
  },
};

export class I18nManager {
  private static currentLang: SupportedLang = 'es';
  private static dicts: Record<SupportedLang, LocalStringsDict> = {
    es: ES_STRINGS,
    en: EN_STRINGS,
    fr: EN_STRINGS, // Fallback a EN
  };

  static setLang(lang: SupportedLang): void {
    if (this.dicts[lang]) {
      this.currentLang = lang;
    }
  }

  static getLang(): SupportedLang {
    return this.currentLang;
  }

  static getStrings(): LocalStringsDict {
    return this.dicts[this.currentLang];
  }

  static t(key: string, section: keyof LocalStringsDict = 'object'): string {
    const dict = this.getStrings();
    const sec = dict[section];
    if (typeof sec === 'object' && sec !== null && key in sec) {
      return (sec as Record<string, string>)[key];
    }
    return key;
  }
}
