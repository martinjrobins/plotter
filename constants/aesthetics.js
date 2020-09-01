export const aesthetics = [
  {
    name: 'x',
    icon: 'mdi-arrow-right',
    text:
      'X coordinates of the marks, or width of horizontal "bar" and "area" without specified x2 or width.',
  },
  {
    name: 'y',
    icon: 'mdi-arrow-up',
    text:
      'Y coordinates of the marks, or height of vertical "bar" and "area" without specified y2 or height.',
  },
  {
    name: 'x2',
    icon: 'mdi-arrow-left',
    text: 'X2 coordinates for ranged "area", "bar", "rect", and "rule".',
  },
  {
    name: 'y2',
    icon: 'mdi-arrow-down',
    text: 'Y2 coordinates for ranged "area", "bar", "rect", and "rule".',
  },
  {
    name: 'xError',
    icon: 'mdi-arrow-left-right',
    text: 'For errorbar, specifies error values extended from the center x',
  },
  {
    name: 'yError',
    icon: 'mdi-arrow-up-down',
    text: 'For errorbar, specifies error values extended from the center y',
  },
  {
    name: 'xError2',
    icon: 'mdi-arrow-left-right',
    text: 'For errorbar, specifies error values extended from the center x',
  },
  {
    name: 'yError2',
    icon: 'mdi-arrow-up-down',
    text: 'For errorbar, specifies error values extended from the center y',
  },

  // Polar Position Channels
  {
    name: 'theta',
    icon: 'mdi-angle-acute',
    text:
      'For arc marks, the arc length in radians if theta2 is not specified, otherwise the start arc angle. For text marks, polar coordinate angle in radians.',
  },
  {
    name: 'radius',
    icon: 'mdi-radius',
    text: 'The outer radius in pixels of arc marks.',
  },
  {
    name: 'theta2',
    icon: 'mdi-angle-obtuse',
    text:
      'The end angle of arc marks in radians. A value of 0 indicates up or “north”, increasing values proceed clockwise.',
  },
  {
    name: 'radius2',
    icon: 'mdi-radius-outline',
    text: 'The inner radius in pixels of arc marks.',
  },

  // Geographic Position Channels
  {
    name: 'longtitude',
    icon: 'mdi-earth-plus',
    text: 'Longitude position of geographically projected marks.',
  },

  {
    name: 'latitude',
    icon: 'mdi-earth-minus',
    text: 'Latitude position of geographically projected marks.',
  },
  {
    name: 'longtitude2',
    icon: 'mdi-earth-plus',
    text:
      'Longitude-2 position for geographically projected ranged "area", "bar", "rect", and "rule".',
  },
  {
    name: 'latitude2',
    icon: 'mdi-earth-minus',
    text:
      'Latitude-2 position for geographically projected ranged "area", "bar", "rect", and "rule".',
  },

  // Mark Properties Channels
  {
    name: 'color',
    icon: 'mdi-water',
    text:
      'Color of the marks – either fill or stroke color based on the filled property of mark definition.',
  },
  { name: 'opacity', icon: 'mdi-opacity', text: 'Opacity of the marks.' },
  {
    name: 'fill',
    icon: 'mdi-format-color-fill',
    text:
      'Fill color of the marks. Default value: If undefined, the default color depends on mark config’s color property.',
  },
  {
    name: 'fillOpacity',
    icon: 'mdi-format-color-fill',
    text: 'Fill opacity of the marks.',
  },
  {
    name: 'strokeOpacity',
    icon: 'mdi-water-plus-outline',
    text: 'Stroke opacity of the marks.',
  },

  {
    name: 'strokeWidth',
    icon: 'mdi-arrow-collapse-vertical',
    text: 'Stroke width of the marks.',
  },
  {
    name: 'strokeDash',
    icon: 'mdi-dots-horizontal',
    text: 'Stroke dash of the marks.',
  },
  {
    name: 'size',
    icon: 'mdi-chart-bubble',
    text:
      'Size of the mark. For "point", "square" and "circle", – the symbol size, or pixel area of the mark. For "bar" and "tick" – the bar and tick’s size. For "text" – the text’s font size.',
  },
  {
    name: 'angle',
    icon: 'mdi-angle-right',
    text: 'Rotation angle of point and text marks.',
  },
  {
    name: 'shape',
    icon: 'mdi-shape',
    text:
      'Shape of the mark, "circle", "square", "cross" etc. See vega-lite docs for complete list. For geoshape marks it should be a field definition of the geojson data',
  },

  // Text and Tooltip Channels
  {
    name: 'text',
    icon: 'mdi-format-text-variant-outline',
    text: 'Text of the text mark.',
  },
  {
    name: 'tooltip',
    icon: 'mdi-tooltip-text',
    text: 'The tooltip text to show upon mouse hover.',
  },

  // Hyperlink Channel
  { name: 'href', icon: 'mdi-link', text: 'A URL to load upon mouse click.' },

  // Level of Detail Channel
  {
    name: 'detail',
    icon: 'mdi-details',
    text:
      'Additional levels of detail for grouping data in aggregate views and in line, trail, and area marks without mapping data to a specific visual channel.',
  },

  // Order Channel
  {
    name: 'order',
    icon: 'mdi-order-numeric-ascending',
    text:
      'Order of the marks. Stacked marks: stack order. Line and trail marks: order of data points in the lines. Otherwise, this order channel encodes layer order of the marks.',
  },

  // Facet Channels
  {
    name: 'facet',
    icon: 'mdi-chart-multiple',
    text:
      'A field definition for the (flexible) facet of trellis plots. If either row or column is specified, this channel will be ignored.',
  },
  {
    name: 'row',
    icon: 'mdi-arrow-collapse-right',
    text: 'A field definition for the vertical facet of trellis plots.',
  },

  {
    name: 'column',
    icon: 'mdi-arrow-collapse-down',
    text: 'A field definition for the horizontal facet of trellis plots.',
  },
]
export const aestheticsToScalesMapping = {
  x: 'x',
  y: 'y',
  color: 'color',
}

export const columnProperties = [
  {
    name: 'type',
    hint: 'The type of measurement for the field.',
    default: 'quantitative',
    optional: false,
    showInColumns: true,
    type: 'select',
    options: {
      quantitative: 'numerical',
      temporal: 'date/time',
      ordinal: 'ordinal',
      nominal: 'nominal',
      geojson: 'geographical',
    },
    vegaKey: ['type'],
  },
  {
    name: 'aggregate',
    hint:
      'used to compute aggregate summary statistics (e.g., median, min, max) over groups of data',
    default: null,
    showInColumns: false,
    type: 'select',
    vegaKey: ['aggregate'],
    options: {
      count:
        'The total count of data objects in the group. Note: ‘count’ operates directly on the input objects and return the same value regardless of the provided field.',
      valid: 'The count of field values that are not null, undefined or NaN.',
      values:
        'A list of data objects in the group. missing	The count of null or undefined field values.',
      distinct: 'The count of distinct field values.',
      sum: 'The sum of field values.',
      product: 'The product of field values.',
      mean: 'The mean (average) field value.',
      average: 'The mean (average) field value. Identical to mean.',
      variance: 'The sample variance of field values.',
      variancep: 'The population variance of field values.',
      stdev: 'The sample standard deviation of field values.',
      stdevp: 'The population standard deviation of field values.',
      stderr: 'The standard error of field values.',
      median: 'The median field value.',
      q1: 'The lower quartile boundary of field values.',
      q3: 'The upper quartile boundary of field values.',
      ci0:
        'The lower boundary of the bootstrapped 95% confidence interval of the mean field value.',
      ci1:
        'The upper boundary of the bootstrapped 95% confidence interval of the mean field value.',
      min: 'The minimum field value.',
      max: 'The maximum field value.',
      argmin:
        'An input data object containing the minimum field value. Note: When used inside encoding, argmin must be specified as an object.',
      argmax:
        'An input data object containing the maximum field value. Note: When used inside encoding, argmax must be specified as an object.',
    },
    optional: true,
  },
  {
    name: 'stack',
    default: null,
    type: 'parent',
    showInColumns: false,
    vegaKey: ['stack'],
    options: {
      zero:
        'stacking with baseline offset at zero value of the scale (for creating typical stacked bar and area chart).',
      normalize:
        'stacking with normalized domain (for creating normalized stacked bar and area charts.',
      center: 'stacking with center baseline (for streamgraph).',
      false: 'No-stacking. This will produce layered bar and area chart.',
    },
    optional: true,
  },
  {
    name: 'bin',
    hint:
      'Binning discretizes numeric values into a set of bins. A common use case is to create a histogram.',
    vegaKey: ['bin'],
    default: false,
    showInColumns: false,
    type: 'checkBox',
    optional: false,
  },
  {
    name: 'maxbins',
    hint: 'Maximum number of bins.',
    vegaKey: ['bin', 'maxbins'],
    showInColumns: false,
    default: null,
    type: 'textBoxNumber',
    optional: true,
  },
  {
    name: 'title',
    hint: 'text used for axis label, legend etc.',
    vegaKey: ['title'],
    showInColumns: false,
    default: '',
    optional: false,
    type: 'textBox',
  },
  {
    name: 'scale',
    hint: 'only valid for quantitative fields',
    type: 'select',
    showInColumns: false,
    vegaKey: ['scale', 'type'],
    options: {
      linear: 'linear scale (quantitative data only)',
      log: 'log scale (quantitative data only)',
    },
    optional: true,
  },
  {
    name: 'calculate',
    hint: 'for example: "2*datum.fieldName"',
    default: '',
    vegaKey: ['calculate'],
    showInColumns: false,
    transform: 'calculate',
    optional: true,
    type: 'textBox',
  },
  {
    name: 'timeUnit',
    type: 'select',
    showInColumns: false,
    vegaKey: ['timeUnit'],
    options: {
      year: 'Gregorian calendar years.',
      quarter:
        'Three-month intervals, starting in one of January, April, July, and October.',
      month: 'Calendar months (January, February, etc.).',
      date: 'Calendar day of the month (January 1, January 2, etc.).',
      week:
        'Sunday-based weeks. Days before the first Sunday of the year are considered to be in week 0, the first Sunday of the year is the start of week 1, the second Sunday week 2, etc..',
      day: 'Day of the week (Sunday, Monday, etc.).',
      dayofyear: 'Day of the year (1, 2, …, 365, etc.).',
      hours: 'Hours of the day (12:00am, 1:00am, etc.).',
      minutes: 'Minutes in an hour (12:00, 12:01, etc.).',
      seconds: 'Seconds in a minute (12:00:00, 12:00:01, etc.).',
      milliseconds: 'Milliseconds in a second.',
    },
    optional: true,
  },
]
