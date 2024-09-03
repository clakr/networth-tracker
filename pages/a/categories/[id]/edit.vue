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
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
import Select from "~/components/Form/Select.vue";
import Main from "~/components/Main.vue";
import type { Nullable, Resource } from "~/lib/types";
import {
  Type,
  type AdminUpdateCategoryForm,
  type Category,
} from "~/lib/types/Category";
import type { LaravelFormErrors } from "~/lib/types/Error";
import capitalizeFirstLetter from "~/lib/utils/capitalizeFirstLetter";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET CATEGORY
const route = useRoute();
const categoryId = route.params.id;

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
} = await useLazyAsyncData<Resource<Category>>(`categories:${categoryId}`, () =>
  client(`/api/categories/${categoryId}`),
);

// EDIT CATEGORY
const isPending = ref(false);
const formErrors =
  ref<Nullable<LaravelFormErrors<AdminUpdateCategoryForm>>>(null);
const httpError = ref<Nullable<Error>>(null);

async function handleUpdateCategory() {
  try {
    isPending.value = true;
    formErrors.value = null;
    httpError.value = null;

    await client(`/api/categories/${categoryId}`, {
      method: "PATCH",
      body: {
        name: response.value?.data.name,
        type: response.value?.data.type,
      },
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
  <Main :header="`Edit Category #${categoryId}`">
    <span v-if="status === 'pending'">loading...</span>
    <span v-else-if="status === 'error'">{{ error }}</span>
    <form
      v-else-if="status === 'success' && response"
      class="flex flex-col gap-y-4"
      @submit.prevent="handleUpdateCategory"
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
        <Label for="type">Type</Label>
        <Select id="type" v-model="response.data.type" name="type">
          <option v-for="type in Type" :key="type" :value="type">
            {{ capitalizeFirstLetter(type) }}
          </option>
        </Select>
        <Errors :error="formErrors?.type" class-name="mt-1" />
      </Field>
      <span v-if="!formErrors && httpError">
        {{ httpError }}
      </span>
      <Button :disabled="isPending">Update Category</Button>
    </form>
  </Main>
</template>
