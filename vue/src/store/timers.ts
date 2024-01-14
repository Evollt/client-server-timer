import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import type { ITimer } from '@/types/Timer'

export const useTimersStore = defineStore('timers', () => {
  const timers: Ref<ITimer[]> = ref([]);

  return {
    timers
  }
})
