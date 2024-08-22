<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{ className?: string }>();

const classes = computed(() =>
  twMerge("border-r p-4 bg-neutral-100", props.className),
);
</script>

<template>
  <aside :class="classes"><slot /></aside>
</template>
