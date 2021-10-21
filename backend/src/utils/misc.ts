export function dropUndefined<ObjType extends Record<string, any>>(obj: ObjType): Partial<ObjType> {
  const newObject: Partial<ObjType> = {};

  Object.entries(obj).forEach(([key, value]: [keyof ObjType, any]) => {
    if (typeof value !== 'undefined') {
      newObject[key] = value;
    }
  });

  return newObject;
}
