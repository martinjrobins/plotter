export const geometries = [
  {
    name: 'arc',
    defaultAesthetics: ['theta', 'color'],
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
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
  { name: 'bar', defaultAesthetics: ['x', 'y', 'color'], options: [] },
  { name: 'boxPlot', defaultAesthetics: ['x', 'y', 'color'], options: [] },
  {
    name: 'circle',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  {
    name: 'errorband',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'errorbar',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'geoshape',
    defaultAesthetics: ['shape', 'color'],
    options: [
      {
        name: 'filled',
        vegaKey: ['filled'],
        default: false,
        type: 'checkBox',
      },
      {
        name: 'strokeWidth',
        vegaKey: ['outerRadius'],
        default: 1,
        type: 'textBoxNumber',
      },
    ],
  },
  { name: 'line', defaultAesthetics: ['x', 'y', 'color'], options: [] },
  {
    name: 'point',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  { name: 'rect', defaultAesthetics: ['x', 'y', 'size', 'color'], options: [] },
  {
    name: 'rule',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'square',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  { name: 'text', defaultAesthetics: ['text', 'x', 'y', 'color'], options: [] },
  { name: 'tick', defaultAesthetics: ['x', 'y'], options: [] },
  {
    name: 'trail',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
]
