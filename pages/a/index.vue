<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "admin",
  layout: "admin",
});
</script>

<template>
  <Main header="Admin"> </Main>
</template>
