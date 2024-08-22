<script setup lang="ts">
import Button from "~/components/Button.vue";
</script>

<template>
  <div class="grid min-h-svh grid-rows-[auto_1fr] text-neutral-950">
    <Navbar class-name="flex justify-end">
      <Button variant="link" to="/">Login</Button>
      <Button variant="link" to="/register">Register</Button>
    </Navbar>
    <slot />
  </div>
</template>
