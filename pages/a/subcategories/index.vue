<script setup lang="ts">
import {
  computed,
  definePageMeta,
  useLazyAsyncData,
  useRoute,
  useSanctumClient,
} from "#imports";
import Main from "~/components/Main.vue";
import Pagination from "~/components/Pagination.vue";
import Table from "~/components/Table.vue";
import type { Paginate } from "~/lib/types";
import type { Category } from "~/lib/types/Category";
import type { SubCategory } from "~/lib/types/SubCategory";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET SUBCATEGORIES
const route = useRoute();
const page = computed(() => route.query.page ?? 1);

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
  refresh,
} = await useLazyAsyncData<Paginate<(SubCategory & { category: Category })[]>>(
  async () => client("/api/subcategories", { params: { page: page.value } }),
  { watch: [page] },
);

// DELETE SUBCATEGORY
async function handleDeleteSubCategory(id: SubCategory["id"]) {
  await client(`/api/subcategories/${id}`, { method: "delete" });
  await refresh();
}
</script>

<template>
  <Main header="Subcategories">
    <header class="flex justify-end">
      <Button
        class-name="flex gap-x-2 items-center"
        to="/a/subcategories/create"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="size-5"
        >
          <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
        </svg>
        Add Subcategory
      </Button>
    </header>
    <Table>
      <template #thead>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Created</th>
        <th>Updated</th>
        <th></th>
      </template>
      <template #tbody>
        <tr v-if="status === 'pending'">
          <td colspan="6" class="text-center">loading...</td>
        </tr>
        <tr v-else-if="status === 'error'">
          <td colspan="6" class="text-center">{{ error }}</td>
        </tr>
        <tr v-for="subCategory in response?.data" v-else :key="subCategory.id">
          <td>{{ subCategory.id }}</td>
          <td>{{ subCategory.name }}</td>
          <td>{{ subCategory.category.name }}</td>
          <td>{{ subCategory.createdAt }}</td>
          <td>{{ subCategory.updatedAt }}</td>
          <td>
            <div class="flex gap-x-2">
              <Button
                variant="icon"
                :to="`/a/subcategories/${subCategory.id}/edit`"
              >
                <span class="sr-only">Edit Subcategory</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </Button>
              <Button
                variant="icon"
                @click="handleDeleteSubCategory(subCategory.id)"
              >
                <span class="sr-only">Delete Subcategory</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                  />
                </svg>
              </Button>
            </div>
          </td>
        </tr>
      </template>
    </Table>
    <Pagination
      v-if="response"
      for="category"
      :from="response.meta.from"
      :to="response.meta.to"
      :total="response.meta.total"
      :current-page="response.meta.current_page"
      :last-page="response.meta.last_page"
    />
  </Main>
</template>
