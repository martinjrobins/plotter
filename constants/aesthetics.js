export const aesthetics = [
  {
    name: 'x',
    text:
      'X coordinates of the marks, or width of horizontal "bar" and "area" without specified x2 or width.',
  },
  {
    name: 'y',
    text:
      'Y coordinates of the marks, or height of vertical "bar" and "area" without specified y2 or height.',
  },
  {
    name: 'x2',
    text: 'X2 coordinates for ranged "area", "bar", "rect", and "rule".',
  },
  {
    name: 'y2',
    text: 'Y2 coordinates for ranged "area", "bar", "rect", and "rule".',
  },
  { name: 'xError' },
  { name: 'yError' },
  { name: 'xError2' },
  { name: 'yError2' },

  // Polar Position Channels
  { name: 'theta' },
  { name: 'radius' },
  { name: 'theta2' },
  { name: 'radius2' },

  // Geographic Position Channels
  { name: 'longtitude' },
  { name: 'latitude' },
  { name: 'longtitude2' },
  { name: 'latitude2' },

  // Mark Properties Channels
  { name: 'color' },
  { name: 'opacity' },
  { name: 'fillOpacity' },
  { name: 'strokeOpacity' },
  { name: 'strokeWidth' },
  { name: 'strokeDash' },
  { name: 'size' },
  { name: 'angle' },
  { name: 'shape' },

  // Text and Tooltip Channels
  { name: 'text' },
  { name: 'tooltip' },

  // Hyperlink Channel
  { name: 'href' },

  // Description Channel
  { name: 'description' },

  // Level of Detail Channel
  { name: 'detail' },

  // Key Channel
  { name: 'key' },

  // Order Channel
  { name: 'order' },

  // Facet Channels
  { name: 'facet' },
  { name: 'row' },
  { name: 'column' },
]
export const aestheticsToScalesMapping = {
  x: 'x',
  y: 'y',
  color: 'color',
}

export const columnProperties = [
  {
    name: 'type',
    hint:
      'The type of measurement ("quantitative", "temporal", "ordinal", or "nominal") for the encoded field or constant value (datum). It can also be a "geojson" type for encoding ‘geoshape’.',
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
    options: { linear: 'linear scale', log: 'log scale' },
    optional: true,
  },
  {
    name: 'calculate',
    hint: '',
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
