import { defineStore, type _GettersTree } from 'pinia';
interface InterfaceState {
  isLoading: boolean;
  isLoggedIn: boolean;
}
interface InterfaceActions {
  setIsLoading: (payload: boolean) => void;
  setIsLoggedIn: (payload: boolean) => void;
}

export const useInterfaceStore = defineStore<
  string,
  InterfaceState,
  _GettersTree<InterfaceState>,
  InterfaceActions
>('interfaceStore', {
  state: () => ({
    isLoading: false,
    isLoggedIn: false
  }),
  actions: {
    setIsLoading(payload: boolean) {
      this.isLoading = payload;
    },
    setIsLoggedIn(payload: boolean) {
      this.isLoggedIn = payload;
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    }
  }
});
