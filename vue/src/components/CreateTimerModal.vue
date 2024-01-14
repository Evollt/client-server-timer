<script setup lang="ts">
import { inject } from "vue";
import { ref } from "vue";
import { VueCookies } from "vue-cookies";
// @ts-ignore
import { Timer } from "@/composables/Timer";

const emits = defineEmits(["closeDialog"]);

const timer = ref({
  title: "sdfjojowf",
  hour: "00",
  minute: "00",
  second: "00",
});
const $cookies = inject<VueCookies>("$cookies");

const createTimer = () => {
  Timer.create(timer.value, $cookies);
  emits("closeDialog", false);
};
</script>

<template>
  <v-dialog width="auto">
    <v-card class="mx-auto rounded-shaped" width="500" variant="tonal">
      <v-card-item>
        <div class="dialog-title">
          <h1 class="text-xl">Создать таймер</h1>
          <div class="close-dialog" @click="emits('closeDialog', false)"></div>
        </div>

        <div class="dialog-content">
          <div class="timer-title">
            <v-text-field
              v-model="timer.title"
              label="Введите название таймера"
              variant="outlined"
              density="compact"
            />
          </div>
          <div class="timer">
            <div class="clock">
              <div
                class="clock-hour clock-time"
                contenteditable
                @input="(e: any) => (timer.hour = e.target?.textContent)"
              >
                {{ timer.hour }}
              </div>
              <div class="clock-colon">:</div>
              <div
                class="clock-minute clock-time"
                contenteditable
                @input="(e: any) => (timer.minute = e.target?.textContent)"
              >
                {{ timer.minute }}
              </div>
              <div class="clock-colon">:</div>
              <div
                class="clock-second clock-time"
                contenteditable
                @input="(e: any) => (timer.second = e.target?.textContent)"
              >
                {{ timer.second }}
              </div>
            </div>
          </div>
        </div>
      </v-card-item>

      <v-card-actions class="flex justify-center">
        <v-btn variant="outlined" @click="createTimer"> Создать таймер </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
.close-dialog {
  position: absolute;
  top: 30px;
  right: 20px;
  width: 24px;
  height: 24px;
  opacity: 0.2;
  cursor: pointer;
  transition: opacity ease 0.5s;

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    display: white;
    width: 24px;
    height: 3px;
    background: white;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

.timer-title {
  margin-top: 20px;
}

.timer {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  .clock {
    display: flex;
    gap: 10px;
    &-time {
      cursor: pointer;
    }
    &-hour,
    &-minute,
    &-second,
    &-colon {
      font-size: 50px;
      font-weight: 700;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>
