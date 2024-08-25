<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{ className?: string }>();

const classes = computed(() =>
  twMerge("border-b p-4 border-neutral-200 bg-neutral-50", props.className),
);
</script>

<template>
  <nav :class="classes">
    <slot />
  </nav>
</template>
