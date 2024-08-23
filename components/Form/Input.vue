<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <input
    v-model="model"
    class="rounded-md border border-neutral-200 px-3 py-1.5 outline-offset-4 outline-neutral-950"
  />
</template>
