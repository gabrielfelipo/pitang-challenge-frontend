export function arrayOfObjectsFromEnum(
  enumObj: any
): { name: string; value: string }[] {
  const keys = Object.keys(enumObj)

  const enumValues = keys
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      name: key,
      value: enumObj[key],
    }))

  return enumValues
}
