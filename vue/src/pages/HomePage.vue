<script setup lang="ts">
// @ts-ignore
import Header from "@/components/Header.vue";
// @ts-ignore
import MyHr from "@/components/UI/MyHr.vue";
// @ts-ignore
import CreateTimerModal from "@/components/CreateTimerModal.vue";
// @ts-ignore
import { useTimersStore } from "@/store/timers";
import { onMounted, ref, inject } from "vue";
// @ts-ignore
import { Timer } from "@/composables/Timer";
import { VueCookies } from "vue-cookies";
import { watch } from "vue";
import { Ref } from "vue";
// @ts-ignore
import { ITimer } from "@/types/Timer";
// @ts-ignore
import TimerComponent from "@/components/Timer.vue";

const dialog = ref(false);
const timersStore = useTimersStore();
const $cookies = inject<VueCookies>("$cookies");
const timers: Ref<ITimer[]> = ref([]);

onMounted(() => {
  Timer.getAll($cookies);
});

function subtractTimes(time1: any, time2: any) {
  var parts1 = time1.split(":");
  var parts2 = time2.split(":");

  var seconds1 =
    parseInt(parts1[0]) * 3600 + parseInt(parts1[1]) * 60 + parseInt(parts1[2]);
  var seconds2 =
    parseInt(parts2[0]) * 3600 + parseInt(parts2[1]) * 60 + parseInt(parts2[2]);

  var differenceSeconds = seconds1 - seconds2;

  var hours = Math.floor(differenceSeconds / 3600);
  var remainingSeconds = differenceSeconds % 3600;
  var minutes = Math.floor(remainingSeconds / 60);
  var remainingSecondsFinal = remainingSeconds % 60;

  var formattedResult =
    padWithZero(hours) +
    ":" +
    padWithZero(minutes) +
    ":" +
    padWithZero(remainingSecondsFinal);

  return formattedResult;
}

function padWithZero(number: number) {
  return number < 10 ? "0" + number : number;
}

watch(
  () => timersStore.timers,
  (value) => {
    timers.value = [];
    value.forEach((item) => {
      let time = new Date();
      let currentTime = new Date();
      let stopTime = new Date();

      // @ts-ignore
      let currentTimeArray = item.current_time.split(":");
      let timeArray = item.time.split(":");
      // @ts-ignore
      let stopTimeArray = item.stoptime.split(":");

      //@ts-ignore
      time.setHours(timeArray[0], timeArray[1], timeArray[2]);
      // @ts-ignore
      currentTime.setHours(
        // @ts-ignore
        currentTimeArray[0],
        currentTimeArray[1],
        currentTimeArray[2]
      );
      // @ts-ignore
      stopTime.setHours(stopTimeArray[0], stopTimeArray[1], stopTimeArray[2]);

      if (stopTime > currentTime) {
        var result = subtractTimes(item.stoptime, item.current_time);

        timers.value.push({
          id: item.id,
          title: item.title,
          time: result,
          stoptime: item.stoptime,
        });
      }
    });
  }
);
</script>

<template>
  <div>
    <Header />
    <div class="content mx-auto container mt-5">
      <div class="timers" v-if="timers.length">
        <div class="timer" v-for="timer in timers">
          <TimerComponent :time="timer.time" />
          <div class="clock-control">
            <div class="clock-control__center">
              <i
                class="clock-control__icons fa-solid fa-stop"
                @click="Timer.delete(timer.id, $cookies)"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="not-found" v-else>У вас пока нет таймеров</div>
      <MyHr />
      <div class="create-timer">
        <CreateTimerModal
          v-model="dialog"
          @close-dialog="(e) => (dialog = e)"
        />
        <v-btn variant="outlined" @click="dialog = true" size="x-large">
          Создать таймер
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
.content {
  .timers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    .timer {
      background-color: $secondColor;
      padding: 10px;
      border-radius: 10px;
      .clock-control {
        display: flex;
        justify-content: center;

        &__icons {
          line-height: normal !important;
        }
        &__center {
          i {
            font-size: 60px;
          }
        }
      }
    }
  }
}

.not-found {
  font-size: 30px;
  display: flex;
  justify-content: center;
}
</style>
