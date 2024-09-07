<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  reactive,
  ref,
  useLazyAsyncData,
  useSanctumClient,
} from "#imports";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import Main from "~/components/Main.vue";
import type { Nullable, Resource } from "~/lib/types";
import type { LaravelFormErrors } from "~/lib/types/Error";
import type {
  AdminCreateSubCategoryForm,
  SubCategory,
} from "~/lib/types/SubCategory";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET ALL CATEGORIES
const client = useSanctumClient();

const {
  status,
  error,
  data: response,
} = await useLazyAsyncData<Resource<SubCategory[]>>(() =>
  client("/api/categories/all"),
);

// CREATE SUBCATEGORY
const form = reactive<AdminCreateSubCategoryForm>({
  name: "",
  categoryId: 0,
});

const isPending = ref(false);
const formErrors =
  ref<Nullable<LaravelFormErrors<AdminCreateSubCategoryForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleCreateSubcategory() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    const client = useSanctumClient();

    await client("/api/subcategories", {
      method: "POST",
      body: {
        ...form,
        category_id: form.categoryId,
      },
      onResponseError({ response }) {
        formErrors.value = response._data.errors;
      },
    });

    await navigateTo("/a/subcategories");
  } catch (error) {
    if (error instanceof Error) httpError.value = error;
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <Main header="Create Subcategory">
    <form
      class="flex flex-col gap-y-4"
      @submit.prevent="handleCreateSubcategory"
    >
      <Field>
        <Label for="name">Name</Label>
        <Input id="name" v-model="form.name" type="text" name="name" required />
        <Errors :error="formErrors?.name" class-name="mt-1" />
      </Field>
      <span v-if="status === 'idle'">loading...</span>
      <span v-else-if="status === 'error'">{{ error }}</span>
      <Field v-else>
        <Label for="category">Category</Label>
        <Select
          id="category"
          v-model="form.categoryId"
          name="category"
          required
        >
          <option
            v-for="category in response?.data"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </Select>
        <Errors :error="formErrors?.categoryId" class-name="mt-1" />
      </Field>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Create Subcategory</Button>
    </form>
  </Main>
</template>
