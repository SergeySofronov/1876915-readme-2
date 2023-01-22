export interface CRUDRepositoryInterface<Entity, Id, ReturnType> {
  findById(id: Id): Promise<ReturnType | null>;
  create(item: Entity, id?:Id): Promise<ReturnType>;
  update(id: Id, item: Partial<Entity>): Promise<ReturnType>;
  destroy(id: Id, ids:Id[]): Promise<void>;
}
