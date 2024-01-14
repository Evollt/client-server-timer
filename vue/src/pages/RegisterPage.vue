<script setup lang="ts">
import { Ref, ref } from "vue";
import { User } from "@/composables/User";
import { IRegister } from "@/types/Register";

const formData: Ref<IRegister> = ref({
  name: "",
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
          v-model="formData.name"
          label="Введите имя"
          variant="outlined"
        />

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
          @click="User.register(formData)"
        >
          Зарегистрироваться
        </v-btn>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
