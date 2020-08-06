export const aestheticsNames = [
  'x',
  'y',
  'x2',
  'y2',
  'xError',
  'yError',
  'xError2',
  'yError2',

  // Polar Position Channels
  'theta',
  'radius',
  'theta2',
  'radius2',

  // Geographic Position Channels
  'longtitude',
  'latitude',
  'longtitude2',
  'latitude2',

  // Mark Properties Channels
  'color',
  'opacity',
  'fillOpacity',
  'strokeOpacity',
  'strokeWidth',
  'strokeDash',
  'size',
  'angle',
  'shape',

  // Text and Tooltip Channels
  'text',
  'tooltip',

  // Hyperlink Channel
  'href',

  // Description Channel
  'description',

  // Level of Detail Channel
  'detail',

  // Key Channel
  'key',

  // Order Channel
  'order',

  // Facet Channels
  'facet',
  'row',
  'column',
]
export const aestheticsToScalesMapping = {
  x: 'x',
  y: 'y',
  color: 'color',
}
export const columnTypes = ['quantitative', 'temporal', 'ordinal', 'nominal']

export const columnProperties = {
  type: {
    default: 'quantitative',
  },
  aggregate: {
    default: null,
  },
  bin: {
    value: { default: false },
    maxbins: { default: null },
  },
  title: { default: '' },
  scale: {
    domain: { default: null },
    type: { default: null },
  },
  calculate: { default: '', transform: 'calculate' },
}
