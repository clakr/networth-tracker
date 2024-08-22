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
    class="grid min-h-svh grid-cols-[theme(spacing.64)_1fr] grid-rows-[auto_1fr] bg-neutral-50 text-neutral-950"
  >
    <Navbar class-name="flex justify-end col-span-2">
      <Button :disabled="isPending" @click="handleLogoutUser">Logout</Button>
    </Navbar>
    <Aside class-name="flex flex-col ">
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
    </Aside>
    <slot />
  </div>
</template>
