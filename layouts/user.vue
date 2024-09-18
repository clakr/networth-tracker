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
      <Link to="/u">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
          />
        </svg>
        Home
      </Link>
    </Aside>
    <slot />
  </div>
</template>
