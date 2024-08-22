<script setup lang="ts">
import { ref, useSanctumAuth } from "#imports";
import Button from "~/components/Button.vue";

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
  <div class="grid min-h-svh grid-rows-[auto_1fr] text-neutral-950">
    <Navbar class-name="flex justify-end">
      <Button :disabled="isPending" @click="handleLogoutUser">Logout</Button>
    </Navbar>
    <slot />
  </div>
</template>
