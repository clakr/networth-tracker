<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "user",
  layout: "user",
});
</script>

<template>
  <h1>user</h1>
</template>
