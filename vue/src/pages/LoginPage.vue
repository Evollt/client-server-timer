<script setup lang="ts">
import { Ref, ref } from "vue";
import { ILogin } from "@/types/Login";
import { User } from "@/composables/User";

const formData: Ref<ILogin> = ref({
  email: "",
  password: "",
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="login-card">
      <h1 class="text-3xl text-center mb-3.5">Левикофф таймер</h1>
      <form @submit.prevent>
        <v-text-field
          v-model="formData.email"
          label="Введите email"
          variant="outlined"
        />
        <v-text-field
          v-model="formData.password"
          label="Введите пароль"
          variant="outlined"
          type="password"
        />

        <v-btn
          variant="outlined"
          class="w-full"
          size="x-large"
          @click="User.create(formData)"
        >
          Войти
        </v-btn>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
