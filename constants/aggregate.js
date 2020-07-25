export const aggregateOps = {
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
}
