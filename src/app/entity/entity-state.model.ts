export default interface EntityState<T> {
  entity: T;
  loading: boolean;
  error: string | null;
}
