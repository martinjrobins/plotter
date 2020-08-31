export const geometries = [
  {
    name: 'arc',
    defaultAesthetics: ['theta', 'color'],
    text:
      'Arc marks are circular arcs defined by a center point plus angular and radial extents. Arc marks are typically used for radial plots such as pie and donut charts.',
    icon: 'mdi-chart-pie',
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
  {
    name: 'bar',
    text:
      'Bar marks are useful in many visualizations, including bar charts, stacked bar charts, and timelines.',
    icon: 'mdi-chart-histogram',
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
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
  {
    name: 'line',
    text:
      'The line mark represents the data points stored in a field with a line connecting all of these points. Line marks are commonly used to depict trajectories or change over time. Unlike most other marks that represent one data element per mark, one line mark represents multiple data element as a single line, akin to area and trail.',
    icon: 'mdi-chart-line',
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
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
