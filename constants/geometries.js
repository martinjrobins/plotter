export const geometries = [
  {
    name: 'arc',
    defaultAesthetics: ['theta', 'color'],
    text:
      'Arc marks are circular arcs defined by a center point plus angular and radial extents. Arc marks are typically used for radial plots such as pie and donut charts.',
    icon: 'mdi-chart-arc',
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
    icon: 'mdi-chart-areaspline',
    text:
      'area represent multiple data element as a single area shape. Area marks are often used to show change over time, using either a single area or stacked areas.',
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
  {
    name: 'bar',
    text:
      'Bar marks are useful in many visualizations, including bar charts, stacked bar charts, and timelines.',
    icon: 'mdi-chart-bar',
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
  {
    name: 'boxPlot',
    icon: 'mdi-chart-timeline',
    text:
      'A box plot summarizes a distribution of quantitative values using a set of summary statistics. The median tick in the box represents the median. The lower and upper parts of the box represent the first and third quartile respectively.',
    defaultAesthetics: ['x', 'y', 'color'],
    options: [],
  },
  {
    name: 'circle',
    icon: 'mdi-chart-scatter-plot',
    text:
      'circle mark is similar to point mark, except that (1) the shape value is always set to circle (2) they are filled by default.',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  {
    name: 'errorband',
    icon: 'mdi-chart-gantt',
    text:
      'An error band summarizes an error range of quantitative values using a set of summary statistics, representing by area. Error band in Vega-Lite can either be used to aggregate raw data or directly visualize aggregated data.',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'errorbar',
    icon: 'mdi-chart-gantt',
    text:
      'An error bar summarizes an error range of quantitative values using a set of summary statistics, representing by rules (and optional end ticks).',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'geoshape',
    icon: 'mdi-earth',
    text:
      'Represents an arbitrary shapes whose geometry is determined by specified TopoJSON/GeoJSON shape data that is projected from geographical coordinates to pixels.',
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
    text:
      'point mark represents each data point with a symbol. Point marks are commonly used in visualizations like scatterplots.',
    icon: 'mdi-chart-scatter-plot',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  {
    name: 'rect',
    icon: 'mdi-rectangle',
    text: 'The rect mark represents an arbitrary rectangle.',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  {
    name: 'rule',
    icon: 'mdi-segment',
    text:
      'The rule mark represents each data point as a line segment. It can be used in two ways. First, as a line segment that spans the complete width or height of a view. Second, a rule can be used to draw a line segment between two positions.',
    defaultAesthetics: ['x', 'y', 'color', 'x2', 'y2'],
    options: [],
  },
  {
    name: 'square',
    text:
      'square marks is similar to point mark, except that (1) the shape value is always set to square (2) they are filled by default',
    icon: 'mdi-square',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
  {
    name: 'text',
    icon: 'mdi-format-color-text',
    text:
      'text mark represents each data point with a text instead of a point.',
    defaultAesthetics: ['text', 'x', 'y', 'color'],
    options: [],
  },
  {
    name: 'tick',
    icon: 'mdi-segment',
    text:
      'The tick mark represents each data point as a short line. This is a useful mark for displaying the distribution of values in a field.',
    defaultAesthetics: ['x', 'y'],
    options: [],
  },
  {
    name: 'trail',
    text:
      'the trail mark represents the data points stored in a field with a line connecting all of these points. Trail is similar to the line mark but a trail can have variable widths determined by backing data.',
    icon: 'mdi-chart-line-stacked',
    defaultAesthetics: ['x', 'y', 'size', 'color'],
    options: [],
  },
]
