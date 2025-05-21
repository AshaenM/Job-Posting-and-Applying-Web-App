import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    role: '',
    id: '',
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
    persist: {
      storage: sessionStorage,
    }
  },
})
