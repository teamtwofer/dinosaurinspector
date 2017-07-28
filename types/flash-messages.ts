export enum FlashMessageType {
  Success,
  Failure,
  Warning,
}

export interface IFlashMessage {
  type: FlashMessageType;
  content: string | null;
}
