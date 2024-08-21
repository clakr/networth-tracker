<script setup lang="ts">
import {
  loginRedirects,
  navigateTo,
  reactive,
  useSanctumAuth,
  useHead,
} from "#imports";
import type { User } from "~/utils/types/User";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Button from "~/components/Button.vue";

useHead({
  bodyAttrs: {
    class: "grid min-h-screen place-content-center text-neutral-950",
  },
});

const form = reactive({
  email: "",
  password: "",
});

const { login, user } = useSanctumAuth<User>();

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
  <form
    class="flex w-full max-w-[calc(100vw-3rem)] flex-col gap-y-8 rounded-lg border p-6"
    @submit.prevent="handleLogin"
  >
    <section>
      <h1 class="text-2xl font-bold">Login</h1>
      <p class="text-neutral-950/75">
        Enter your email and password to sign in to your account
      </p>
    </section>
    <section class="flex flex-col gap-y-4">
      <Field>
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="test@example.com"
        />
      </Field>
      <Field>
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="form.password"
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="********"
        />
      </Field>
    </section>
    <Button>Login</Button>
  </form>
</template>
