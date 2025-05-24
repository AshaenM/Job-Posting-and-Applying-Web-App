import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    role: '',
    id: '',
    isLoggedIn: false,
  }),
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`.trim(),
  },
  actions: {
    setName(first, last) {
      this.firstName = first
      this.lastName = last
    },
    setRole(role) {
      this.role = role
    },
    setID(id) {
      this.id = id
    },
    setLoggedIn(status) {
      this.isLoggedIn = status
    },
    // reset action that properly clears persisted data
    reset() {
      this.$reset()
      // Clear the persisted state from storage
      sessionStorage.removeItem('user')
    }
  },
  persist: {
    storage: sessionStorage,
    key: 'user',
    paths: ['firstName', 'lastName', 'role', 'id', 'isLoggedIn'],
    beforeRestore: (ctx) => {
      console.log('About to restore user state', ctx)
    },
    afterRestore: (ctx) => {
      console.log('User state restored', ctx)
    }
  }
})