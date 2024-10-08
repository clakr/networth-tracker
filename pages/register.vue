<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  useSanctumClient,
  useSanctumUser,
} from "#imports";
import { reactive, ref } from "vue";
import Button from "~/components/Button.vue";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import { authRedirects } from "~/lib/constants";
import type { Nullable } from "~/lib/types";
import type { UserRegisterForm } from "~/lib/types/Auth";
import type { LaravelFormErrors } from "~/lib/types/Error";
import type { User } from "~/lib/types/User";

definePageMeta({
  middleware: "guest",
  layout: "guest",
});

// REGISTER USER
const form = reactive<UserRegisterForm>({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const isPending = ref(false);
const formErrors = ref<Nullable<LaravelFormErrors<UserRegisterForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleRegisterUser() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    const client = useSanctumClient();
    const user = useSanctumUser<User>();

    await client("/register", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      },
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
      @submit.prevent="handleRegisterUser"
    >
      <section>
        <h1 class="text-2xl font-bold">Register</h1>
        <p class="text-neutral-950/75">Create a new account to get started.</p>
      </section>
      <section class="flex flex-col gap-y-4">
        <Field>
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="John Doe"
            required
          />
          <Errors :error="formErrors?.name" class-name="mt-1" />
        </Field>
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
        <div class="grid grid-cols-2 gap-2">
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
          </Field>
          <Field>
            <Label for="passwordConfirmation">Confirm Password</Label>
            <Input
              id="passwordConfirmation"
              v-model="form.passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              autocomplete="current-password"
              placeholder="********"
              required
            />
          </Field>
          <Errors :error="formErrors?.password" class-name="col-span-2" />
        </div>
      </section>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Register</Button>
    </form>
  </main>
</template>
