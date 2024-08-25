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
import type { User } from "~/lib/types/User";
import capitalizeFirstLetter from "~/lib/utils/capitalizeFirstLetter";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});

// GET USERS
const route = useRoute();
const page = computed(() => route.query.page ?? 1);

const client = useSanctumClient();

const {
  status,
  error,
  data: response,
  refresh,
} = await useLazyAsyncData<Paginate<User[]>>(
  async () => client("/api/users", { params: { page: page.value } }),
  { watch: [page] },
);

// DELETE USER
async function handleDeleteUser(id: User["id"]) {
  await client(`/api/users/${id}`, { method: "delete" });
  await refresh();
}
</script>

<template>
  <Main header="Users">
    <header class="flex justify-end">
      <Button class-name="flex gap-x-2 items-center" to="/a/users/create">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="size-5"
        >
          <path
            fill="currentColor"
            d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
          />
        </svg>
        Add User
      </Button>
    </header>
    <Table>
      <template #thead>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Email Verified</th>
        <th>Role</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Actions</th>
      </template>
      <template #tbody>
        <tr v-if="status === 'pending'">
          <td colspan="8" class="text-center">loading...</td>
        </tr>
        <tr v-else-if="status === 'error'">
          <td colspan="8" class="text-center">{{ error }}</td>
        </tr>
        <tr v-for="user in response?.data" v-else :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.emailVerifiedAt }}</td>
          <td>{{ capitalizeFirstLetter(user.role) }}</td>
          <td>{{ user.createdAt }}</td>
          <td>{{ user.updatedAt }}</td>
          <td>
            <div class="flex gap-x-2">
              <Button variant="icon">
                <span class="sr-only">Edit User</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </Button>
              <Button variant="icon" @click="handleDeleteUser(user.id)">
                <span class="sr-only">Delete User</span>
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
      :from="response.meta.from"
      :to="response.meta.to"
      :total="response.meta.total"
      :current-page="response.meta.current_page"
      :last-page="response.meta.last_page"
    />
  </Main>
</template>
