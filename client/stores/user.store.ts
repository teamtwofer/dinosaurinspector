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
    async loadUser(token: string) {
      this.isLoading = true;
      const rawUser = await fetch('/api/user', {
        headers: {
          'x-access-token': token,
        },
      }).then(r => r.json());
      this.updateUser(rawUser);
    },

    updateUser(rawUser: any) {
      this.user = rawUser;
      this.isLoading = false;
    },
  }
);

export type UserStore = typeof UserStore.Type;
