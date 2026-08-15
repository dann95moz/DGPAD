/**
 * Preferencias visuales y de renderizado del motor geométrico.
 * Migrado desde $P
 */
export interface EnginePreferences {
  background: {
    color: string;
  };
  color: {
    hilite: string;
    selected: string;
    point: string;
    list: string;
    segment: string;
    vector: string;
    line: string;
    circle: string;
    area: string;
    ray: string;
    angle: string;
    fixedangle: string;
    quadric: string;
    point_free: string;
    point_on: string;
    point_inter: string;
    point_fixed: string;
  };
  opacity: {
    point: number;
    area: number;
    vector: number;
    blockly_button: number;
  };
  grid: {
    limitinf: number;
    font: string;
    fontsize: number;
    smalltick: number;
    longtick: number;
    grid_color: string;
    grid_linewidth: number;
    tick_linewidth: number;
    axis_linewidth: number;
  };
  size: {
    marginwidth: number;
    marginheight: number;
    touchfactor: number;
    point: number;
    list: number;
    pointborder: number;
    line: number;
    angle: number;
    fixedangle: number;
    expression: number;
    expression_cursor: number;
    dash: number[];
    partiallines: number;
    vectorhead: number;
    blockly_button: number;
  };
  fontsize: {
    point: number;
    segment: number;
    angle: number;
    fixedangle: number;
    expression: number;
    blockly_button: number;
  };
  font: string;
  fontmargin: number;
}

export const DEFAULT_ENGINE_PREFERENCES: EnginePreferences = {
  background: {
    color: '#F8F8F8',
  },
  color: {
    hilite: '#ffbb00',
    selected: '#FF0000',
    point: 'rgb(0,0,178)',
    list: 'rgb(0,0,178)',
    segment: '#006633',
    vector: '#006633',
    line: '#780013',
    circle: '#CC66CC',
    area: '#006633',
    ray: '#993300',
    angle: '#006633',
    fixedangle: '#006633',
    quadric: '#00ADFF',
    point_free: 'rgba(255,255,255,1)',
    point_on: 'rgba(255,255,255,1)',
    point_inter: '#ccc',
    point_fixed: '#ccc',
  },
  opacity: {
    point: 0,
    area: 0.2,
    vector: 0.2,
    blockly_button: 0.1,
  },
  grid: {
    limitinf: 15,
    font: 'Verdana',
    fontsize: 18,
    smalltick: 5,
    longtick: 10,
    grid_color: '#111111',
    grid_linewidth: 0.1,
    tick_linewidth: 1,
    axis_linewidth: 1,
  },
  size: {
    marginwidth: 0,
    marginheight: 0,
    touchfactor: 1,
    point: 6,
    list: 1,
    pointborder: 2,
    line: 1,
    angle: 4,
    fixedangle: 1,
    expression: 7,
    expression_cursor: 10,
    dash: [6, 10],
    partiallines: 100,
    vectorhead: 20,
    blockly_button: 3,
  },
  fontsize: {
    point: 30,
    segment: 24,
    angle: 24,
    fixedangle: 24,
    expression: 24,
    blockly_button: 24,
  },
  font: 'Verdana',
  fontmargin: 5,
};
