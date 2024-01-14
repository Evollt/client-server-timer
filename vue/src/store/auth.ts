import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import type { IUser } from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<IUser> = ref({
    id: 1,
    name: '',
    email: '',
    token: ''
  })

  return {
    user
  }
})
