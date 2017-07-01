export interface IForm<T> {
  readonly value: T;
  error: string;
  updateError(errorMessage: string): void;
}
