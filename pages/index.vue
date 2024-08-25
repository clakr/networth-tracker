<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  reactive,
  ref,
  useSanctumClient,
  useSanctumUser,
} from "#imports";
import Button from "~/components/Button.vue";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import { authRedirects } from "~/utils/constants";
import type { Nullable } from "~/utils/types";
import type { UserLoginForm } from "~/utils/types/Auth";
import type { LaravelFormErrors } from "~/utils/types/Error";
import type { User } from "~/utils/types/User";

definePageMeta({
  middleware: "guest",
  layout: "guest",
});

// LOGIN USER
const form = reactive<UserLoginForm>({
  email: "",
  password: "",
});

const isPending = ref(false);
const formErrors = ref<Nullable<LaravelFormErrors>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleLoginUser() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    const client = useSanctumClient();
    const user = useSanctumUser<User>();

    await client("/login", {
      method: "POST",
      body: form,
      onResponseError({ response }) {
        formErrors.value = response._data.errors;
      },
    });

    user.value = await client("/api/user");
    if (!user.value) throw new Error("User not found");

    await navigateTo(authRedirects[user.value.role], { replace: true });
  } catch (error) {
    if (error instanceof Error) httpError.value = error;
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <main class="grid place-content-center">
    <form
      class="flex w-[500px] flex-col gap-y-8 rounded-lg border border-neutral-200 p-6"
      @submit.prevent="handleLoginUser"
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
            placeholder="johndoe@example.com"
            required
          />
          <Errors :error="formErrors?.email" class-name="mt-1" />
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
            required
          />
          <Errors :error="formErrors?.password" class-name="mt-1" />
        </Field>
      </section>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Login</Button>
    </form>
  </main>
</template>
