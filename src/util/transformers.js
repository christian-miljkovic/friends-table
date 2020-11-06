import camelCase from 'lodash/camelCase'
import isPlainObject from 'lodash/isPlainObject'

export const convertToCamelCase = (object) => {
  if (Array.isArray(object)) {
    return object.map((value) => convertToCamelCase(value))
  }
  if (isPlainObject(object)) {
    return Object.keys(object).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: convertToCamelCase(object[key]),
      }),
      {},
    )
  }
  return object
}
