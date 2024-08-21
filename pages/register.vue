<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  useSanctumClient,
  useSanctumUser,
} from "#imports";
import { reactive, ref } from "vue";
import Button from "~/components/Button.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import { authRedirects } from "~/utils/constants";
import type { User } from "~/utils/types/User";

definePageMeta({
  layout: "guest",
});

// REGISTER USER
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const isPending = ref(false);

async function handleRegisterUser(event: Event) {
  try {
    isPending.value = true;

    const client = useSanctumClient();
    const user = useSanctumUser<User>();

    const formData = new FormData(event.target as HTMLFormElement);
    const { firstName, lastName, email, password, passwordConfirmation } =
      Object.fromEntries(formData);

    await client("/register", {
      method: "POST",
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
      async onResponse({ response }) {
        if (!response.ok) throw new Error("Error: Register User");

        user.value = await client("/api/user");
        if (!user.value) throw new Error("User not found");

        await navigateTo(authRedirects[user.value.role]);
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <main class="grid place-content-center">
    <form
      class="flex w-[500px] flex-col gap-y-8 rounded-lg border p-6"
      @submit.prevent="handleRegisterUser"
    >
      <section>
        <h1 class="text-2xl font-bold">Register</h1>
        <p class="text-neutral-950/75">Create a new account to get started.</p>
      </section>
      <section class="flex flex-col gap-y-4">
        <div class="flex gap-x-4">
          <Field class-name="grow">
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              v-model="form.firstName"
              type="text"
              name="firstName"
              autocomplete="given-name"
              placeholder="John"
            />
          </Field>
          <Field class-name="grow">
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              v-model="form.lastName"
              type="text"
              name="lastName"
              autocomplete="family-name"
              placeholder="Doe"
            />
          </Field>
        </div>
        <Field>
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="johndoe@example.com"
          />
        </Field>
        <div class="flex gap-x-4">
          <Field class-name="grow">
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
          <Field class-name="grow">
            <Label for="passwordConfirmation">Confirm Password</Label>
            <Input
              id="passwordConfirmation"
              v-model="form.passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              autocomplete="current-password"
              placeholder="********"
            />
          </Field>
        </div>
      </section>
      <Button :disabled="isPending">Register</Button>
    </form>
  </main>
</template>
