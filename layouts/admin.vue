<script setup lang="ts">
import { ref, useSanctumAuth } from "#imports";
import Aside from "~/components/Aside.vue";
import Button from "~/components/Button.vue";
import Link from "~/components/Link.vue";
import Navbar from "~/components/Navbar.vue";

// LOGOUT USER
const isPending = ref(false);

async function handleLogoutUser() {
  try {
    isPending.value = true;

    const { logout } = useSanctumAuth();

    await logout();
  } catch (error) {
    console.error(error);
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <div
    class="grid min-h-svh grid-cols-[theme(spacing.64)_calc(100vw-theme(spacing.64))] grid-rows-[auto_1fr] bg-neutral-50 text-neutral-950"
  >
    <Navbar class-name="flex justify-end col-span-2">
      <Button :disabled="isPending" @click="handleLogoutUser">Logout</Button>
    </Navbar>
    <Aside class-name="flex flex-col">
      <Link to="/a">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
          />
        </svg>
        Home
      </Link>
      <Link to="/a/users">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"
          />
        </svg>
        Users
      </Link>
      <Link to="/a/categories">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
          />
        </svg>
        Categories
      </Link>
      <Link to="/a/subcategories">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2 2 0 0 0-2-2m-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M9 2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M8 26a2 2 0 1 1-2-2a2 2 0 0 1 2 2M3 10V4h6l.002 6z"
          />
        </svg>
        Subcategories
      </Link>
    </Aside>
    <slot />
  </div>
</template>
