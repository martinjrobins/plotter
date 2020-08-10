const defaultAes = ['x', 'y', 'color']

export const geometries = [
  {
    name: 'arc',
    defaultAesthetics: defaultAes,
    options: [
      {
        name: 'innerRadius',
        vegaKey: ['innerRadius'],
        default: null,
        type: 'textBoxNumber',
      },
      {
        name: 'outerRadius',
        vegaKey: ['outerRadius'],
        default: null,
        type: 'textBoxNumber',
      },
    ],
  },
  {
    name: 'area',
    defaultAesthetics: defaultAes,
    options: [],
  },
  { name: 'bar', defaultAesthetics: defaultAes, options: [] },
  { name: 'boxPlot', defaultAesthetics: defaultAes, options: [] },
  { name: 'circle', defaultAesthetics: defaultAes, options: [] },
  { name: 'errorband', defaultAesthetics: defaultAes, options: [] },
  { name: 'errorbar', defaultAesthetics: defaultAes, options: [] },
  { name: 'geoshape', defaultAesthetics: defaultAes, options: [] },
  { name: 'line', defaultAesthetics: defaultAes, options: [] },
  { name: 'point', defaultAesthetics: defaultAes, options: [] },
  { name: 'rect', defaultAesthetics: defaultAes, options: [] },
  { name: 'rule', defaultAesthetics: defaultAes, options: [] },
  { name: 'square', defaultAesthetics: defaultAes, options: [] },
  { name: 'text', defaultAesthetics: defaultAes, options: [] },
  { name: 'tick', defaultAesthetics: defaultAes, options: [] },
  { name: 'trail', defaultAesthetics: defaultAes, options: [] },
]
