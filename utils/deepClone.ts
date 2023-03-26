const deepClone = (object: Record<any, any>) => {
  if (typeof object !== "object" || object === null) {
    return object
  }

  const clone: Record<any, any> = Array.isArray(object) ? [] : {}

  Object.keys(object).forEach((key) => {
    clone[key] = deepClone(object[key])
  })

  return clone
}
export default deepClone
