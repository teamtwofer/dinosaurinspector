import { action, observable } from 'mobx';
import { IFlashMessage } from '../../types/flash-messages';

export class FlashMessageStore {
  @observable messages: IFlashMessage[] = [];

  @action.bound
  removeMessage(id: number) {
    this.messages.splice(id, 1);
  }

  @action.bound
  addMessages(...flashMessages: IFlashMessage[]) {
    this.messages.push(...flashMessages);
  }
}

export const flashMessageStore = new FlashMessageStore();
