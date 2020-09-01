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
  { name: 'xError', icon: 'mdi-arrow-left-right' },
  {
    name: 'yError',
    icon: 'mdi-arrow-up-down',
  },
  { name: 'xError2', icon: 'mdi-arrow-left-right' },
  { name: 'yError2', icon: 'mdi-arrow-up-down' },

  // Polar Position Channels
  { name: 'theta', icon: 'mdi-angle-acute' },
  { name: 'radius', icon: 'mdi-radius' },
  { name: 'theta2', icon: 'mdi-angle-obtuse' },
  { name: 'radius2', icon: 'mdi-radius-outline' },

  // Geographic Position Channels
  { name: 'longtitude', icon: 'mdi-earth-plus' },
  { name: 'latitude', icon: 'mdi-earth-minus' },
  { name: 'longtitude2', icon: 'mdi-earth-plus' },
  { name: 'latitude2', icon: 'mdi-earth-minus' },

  // Mark Properties Channels
  { name: 'color', icon: 'mdi-water' },
  { name: 'opacity', icon: 'mdi-opacity' },
  { name: 'fillOpacity', icon: 'mdi-format-color-fill' },
  { name: 'strokeOpacity', icon: 'mdi-water-plus-outline' },
  { name: 'strokeWidth', icon: 'mdi-arrow-collapse-vertical' },
  { name: 'strokeDash', icon: 'mdi-dots-horizontal' },
  { name: 'size', icon: 'mdi-chart-bubble' },
  { name: 'angle', icon: 'mdi-angle-right' },
  { name: 'shape', icon: 'mdi-shape' },

  // Text and Tooltip Channels
  { name: 'text', icon: 'mdi-format-text-variant-outline' },
  { name: 'tooltip', icon: 'mdi-tooltip-text' },

  // Hyperlink Channel
  { name: 'href', icon: 'mdi-link' },

  // Description Channel
  { name: 'description', icon: 'mdi-card-text' },

  // Level of Detail Channel
  { name: 'detail', icon: 'mdi-details' },

  // Key Channel
  { name: 'key', icon: 'mdi-key' },

  // Order Channel
  { name: 'order', icon: 'mdi-order-numeric-ascending' },

  // Facet Channels
  { name: 'facet', icon: 'mdi-chart-multiple' },
  { name: 'row', icon: 'mdi-arrow-collapse-right' },
  { name: 'column', icon: 'mdi-arrow-collapse-down' },
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
