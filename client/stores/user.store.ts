import { types } from 'mobx-state-tree';
// tslint:disable-next-line:variable-name
export const User = types.model('User', {
  email: types.string,
  id: types.identifier(types.number),
  name: types.string,
});
export type User = typeof User.Type;

// tslint:disable-next-line:variable-name
export const UserStore = types.model(
  'UserStore',
  {
    isLoading: true,
    user: types.maybe(User),
    get currentUser(): User | null {
      return !this.isLoading && this.user ? this.user : null;
    },
  },
  {
    async loadUser() {
      this.isLoading = true;
      const rawUser = await fetch('/api/user/5').then(r => r.json());
      this.updateUser(rawUser);
    },

    updateUser(rawUser: any) {
      this.user = rawUser;
      this.isLoading = false;
    },

    afterCreate() {
      this.loadUser();
    },
  }
);

export type UserStore = typeof UserStore.Type;
