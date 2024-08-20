<script setup lang="ts">
import { loginRedirects, navigateTo, reactive, useSanctumAuth } from "#imports";

import type { User } from "~/utils/types/User";

const { login, user } = useSanctumAuth<User>();

const form = reactive({
  email: "test@admin.com",
  password: "password",
});

async function handleLogin(event: Event) {
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const credentials = Object.fromEntries(formData);

    await login(credentials);

    if (!user.value) throw new Error("User not found");

    await navigateTo(loginRedirects[user.value.role]);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="current-password"
      />
    </div>
    <button>Login</button>
  </form>
</template>
