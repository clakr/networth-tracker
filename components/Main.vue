<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  className?: string;
}>();

const classes = computed(() => twMerge("p-4", props.className));
</script>

<template>
  <main :class="classes"><slot /></main>
</template>
