<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  ref,
  useLazyAsyncData,
  useRoute,
  useSanctumClient,
} from "#imports";
import Button from "~/components/Button.vue";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import type { Nullable, Resource } from "~/lib/types";
import type { LaravelFormErrors } from "~/lib/types/Error";
import { Role, type AdminUpdateUserForm, type User } from "~/lib/types/User";
import capitalizeFirstLetter from "~/lib/utils/capitalizeFirstLetter";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET USER
const route = useRoute();
const userId = route.params.id;

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
} = await useLazyAsyncData<Resource<User>>(`users:${userId}`, () =>
  client(`/api/users/${userId}`),
);

// EDIT USER
const isPending = ref(false);
const formErrors = ref<Nullable<LaravelFormErrors<AdminUpdateUserForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleUpdateUser() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    await client(`/api/users/${userId}`, {
      method: "PATCH",
      body: {
        name: response.value?.data.name,
        email: response.value?.data.email,
        role: response.value?.data.role,
      },
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
  <Main :header="`Edit User #${userId}`">
    <span v-if="status === 'pending'">loading...</span>
    <span v-else-if="status === 'error'">{{ error }}</span>
    <form
      v-else-if="status === 'success' && response"
      class="flex flex-col gap-y-4"
      @submit.prevent="handleUpdateUser"
    >
      <Field>
        <Label for="name">Name</Label>
        <Input
          id="name"
          v-model="response.data.name"
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
          v-model="response.data.email"
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
        <Select id="role" v-model="response.data.role" name="role" required>
          <option v-for="role in Role" :key="role" :value="role">
            {{ capitalizeFirstLetter(role) }}
          </option>
        </Select>
        <Errors :error="formErrors?.role" class-name="mt-1" />
      </Field>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Update User</Button>
    </form>
  </Main>
</template>
