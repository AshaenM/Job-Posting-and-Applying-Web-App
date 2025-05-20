import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    role: '',
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
    persist: {
      storage: sessionStorage,
    }
  },
})
