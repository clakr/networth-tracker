<script setup lang="ts">
import {
  computed,
  definePageMeta,
  useLazyAsyncData,
  useRoute,
  useSanctumClient,
} from "#imports";
import Button from "~/components/Button.vue";
import Main from "~/components/Main.vue";
import Pagination from "~/components/Pagination.vue";
import Table from "~/components/Table.vue";
import type { Paginate } from "~/lib/types";
import type { Category } from "~/lib/types/Category";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET CATEGORIES
const route = useRoute();
const page = computed(() => route.query.page ?? 1);

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
  refresh,
} = await useLazyAsyncData<Paginate<Category[]>>(
  async () => client("/api/categories", { params: { page: page.value } }),
  { watch: [page] },
);

// DELETE CATEGORY
async function handleDeleteCategory(id: Category["id"]) {
  await client(`/api/categories/${id}`, { method: "delete" });
  await refresh();
}
</script>

<template>
  <Main header="Categories">
    <header class="flex justify-end">
      <Button class-name="flex gap-x-2 items-center" to="/a/categories/create">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="size-5"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6"
          />
        </svg>
        Add Category
      </Button>
    </header>
    <Table>
      <template #thead>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
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
        <tr v-for="category in response?.data" v-else :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.type }}</td>
          <td>{{ category.createdAt }}</td>
          <td>{{ category.updatedAt }}</td>
          <td>
            <div class="flex gap-x-2">
              <Button variant="icon" :to="`/a/categories/${category.id}/edit`">
                <span class="sr-only">Edit Category</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </Button>
              <Button variant="icon" @click="handleDeleteCategory(category.id)">
                <span class="sr-only">Delete Category</span>
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
