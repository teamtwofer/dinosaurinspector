export interface IForm<T> {
  isLoading: boolean;
  isSuccess: boolean;
  readonly value: T;
  error: string;
  updateError(errorMessage: string): void;
  succeed(): void;
  load(): void;
}
