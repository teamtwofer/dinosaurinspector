export interface ICrud<FullType, PartialType, AllType = undefined> {
  add(entity: PartialType): Promise<FullType>;
  getAll(entity: AllType): Promise<FullType[]>;
  get(id: number): Promise<FullType | undefined>;
  update(entity: FullType): Promise<FullType>;
  remove(entity: FullType): Promise<FullType>;
}
