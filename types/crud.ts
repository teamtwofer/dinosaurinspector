export interface ICrud<FullType, PartialType> {
  seed(): Promise<FullType> | Promise<FullType[]>;
  add(entity: PartialType): Promise<FullType>;
  getAll(): Promise<FullType[]>;
  get(id: number): Promise<FullType | undefined>;
  update(entity: FullType): Promise<FullType>;
  remove(entity: FullType): Promise<FullType>;
}
