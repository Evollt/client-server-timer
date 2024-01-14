<template>
  <div class="clock">
    <div>
      {{ timerValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  time: string;
}>();

const timerValue = ref("00:00:00");

const startTimer = (time: string) => {
  let totalSeconds = calculateTotalSeconds(time);

  const intervalId = setInterval(() => {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedResult =
      padWithZero(hours) +
      ":" +
      padWithZero(minutes) +
      ":" +
      padWithZero(seconds);
    timerValue.value = formattedResult;

    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(intervalId);
      timerValue.value = "00:00:00";
    }
  }, 1000);
};

const calculateTotalSeconds = (time: string) => {
  const parts = time.split(":");
  return (
    parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  );
};

const padWithZero = (number: number) => {
  return number < 10 ? "0" + number : number;
};

startTimer(props.time);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.clock {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  div {
    font-size: 50px;
    width: 100%;
    font-weight: 700;
    background-color: $mainColor;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
