<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  reactive,
  ref,
  useSanctumClient,
} from "#imports";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import Main from "~/components/Main.vue";
import type { Nullable } from "~/lib/types";
import { Type, type AdminCreateCategoryForm } from "~/lib/types/Category";
import type { LaravelFormErrors } from "~/lib/types/Error";
import capitalizeFirstLetter from "~/lib/utils/capitalizeFirstLetter";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// CREATE CATEGORY
const form = reactive<AdminCreateCategoryForm>({
  name: "",
  type: Type.INCOME,
});

const isPending = ref(false);
const formErrors =
  ref<Nullable<LaravelFormErrors<AdminCreateCategoryForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleCreateCategory() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    const client = useSanctumClient();

    await client("/api/categories", {
      method: "POST",
      body: form,
      onResponseError({ response }) {
        formErrors.value = response._data.errors;
      },
    });

    await navigateTo("/a/categories");
  } catch (error) {
    if (error instanceof Error) httpError.value = error;
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <Main header="Create Category">
    <form class="flex flex-col gap-y-4" @submit.prevent="handleCreateCategory">
      <Field>
        <Label for="name">Name</Label>
        <Input id="name" v-model="form.name" type="text" name="name" required />
        <Errors :error="formErrors?.name" class-name="mt-1" />
      </Field>
      <Field>
        <Label for="type">Type</Label>
        <Select id="type" v-model="form.type" name="type">
          <option v-for="type in Type" :key="type" :value="type">
            {{ capitalizeFirstLetter(type) }}
          </option>
        </Select>
        <Errors :error="formErrors?.type" class-name="mt-1" />
      </Field>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Create Category</Button>
    </form>
  </Main>
</template>
