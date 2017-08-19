import { lang } from '../lang';

export function cook<Entity extends object, CookingKeys extends keyof Entity>(
  name: string,
  entity: Entity,
  rawEntity: Record<keyof Pick<Entity, any>, any>,
  requiredKeys: Array<keyof Entity>,
  complexKeys?: Record<
    keyof Pick<Entity, CookingKeys>,
    (v: string) => Entity[CookingKeys]
  >
): Entity {
  for (const key of requiredKeys) {
    if (!rawEntity[key]) {
      throw new TypeError(lang.COOKING_ERROR(name, key));
    }
  }
  Object.assign(entity, rawEntity);

  if (complexKeys) {
    for (const subCooker of Object.keys(complexKeys) as Array<keyof Entity>) {
      const subCookerValue = rawEntity[subCooker];
      const cookerFunction = complexKeys[subCooker];
      const value = subCookerValue ? cookerFunction(subCookerValue) : null;
      entity[subCooker] = value;
    }
  }

  return entity;
}

export const dateCooker = (v: string) => new Date(v);
