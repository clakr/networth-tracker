<script setup lang="ts">
import {
  definePageMeta,
  navigateTo,
  ref,
  useLazyAsyncData,
  useRoute,
  useSanctumClient,
} from "#imports";
import Errors from "~/components/Form/Errors.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import type { Nullable, Resource } from "~/lib/types";
import type { Category } from "~/lib/types/Category";
import type { LaravelFormErrors } from "~/lib/types/Error";
import type {
  AdminUpdateSubCategoryForm,
  SubCategory,
} from "~/lib/types/SubCategory";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET CATEGORIES AND SUBCATEGORY
const route = useRoute();
const subCategoryId = route.params.id;

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
} = await useLazyAsyncData<
  [Resource<Category[]>, Resource<SubCategory & { category: Category }>]
>(() =>
  Promise.all([
    client("/api/categories/all"),
    client(`/api/subcategories/${subCategoryId}`),
  ]),
);

// EDIT SUBCATEGORY
const isPending = ref(false);
const formErrors =
  ref<Nullable<LaravelFormErrors<AdminUpdateSubCategoryForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleUpdateSubCategory() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    await client(`/api/subcategories/${subCategoryId}`, {
      method: "PATCH",
      body: {
        name: response.value?.[1].data.name,
        category_id: response.value?.[1].data.category.id,
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
  <Main :header="`Edit Subcategory #${subCategoryId}`">
    <span v-if="status === 'pending'">loading...</span>
    <span v-else-if="status === 'error'">{{ error }}</span>
    <form
      v-else-if="status === 'success' && response"
      class="flex flex-col gap-y-4"
      @submit.prevent="handleUpdateSubCategory"
    >
      <Field>
        <Label for="name">Name</Label>
        <Input
          id="name"
          v-model="response[1].data.name"
          type="text"
          name="name"
          required
        />
        <Errors :error="formErrors?.name" class-name="mt-1" />
      </Field>
      <Field>
        <Label for="category">Category</Label>
        <Select
          id="category"
          v-model="response[1].data.category.id"
          name="category"
          required
        >
          <option
            v-for="category in response[0].data"
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
      <Button :disabled="isPending">Update Subcategory</Button>
    </form>
  </Main>
</template>
