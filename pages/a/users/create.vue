<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  reactive,
  ref,
  useSanctumClient,
} from "#imports";
import Button from "~/components/Button.vue";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import Main from "~/components/Main.vue";
import type { Nullable } from "~/lib/types";
import type { LaravelFormErrors } from "~/lib/types/Error";
import { Role, type AdminCreateUserForm } from "~/lib/types/User";
import capitalizeFirstLetter from "~/lib/utils/capitalizeFirstLetter";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// CREATE USER
const form = reactive<AdminCreateUserForm>({
  name: "",
  email: "",
  role: Role.USER,
});

const isPending = ref(false);
const formErrors = ref<Nullable<LaravelFormErrors<AdminCreateUserForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleCreateUser() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    const client = useSanctumClient();

    await client("/api/users", {
      method: "POST",
      body: form,
      onResponseError({ response }) {
        formErrors.value = response._data.errors;
      },
    });

    await navigateTo("/a/users");
  } catch (error) {
    if (error instanceof Error) httpError.value = error;
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <Main header="Create User">
    <form class="flex flex-col gap-y-4" @submit.prevent="handleCreateUser">
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
      <Field>
        <Label for="role">Role</Label>
        <Select id="role" v-model="form.role" name="role">
          <option v-for="role in Role" :key="role" :value="role">
            {{ capitalizeFirstLetter(role) }}
          </option>
        </Select>
        <Errors :error="formErrors?.role" class-name="mt-1" />
      </Field>
      <Button :disabled="isPending">Create User</Button>
    </form>
  </Main>
</template>
