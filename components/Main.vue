<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  className?: string;
  header: string;
}>();

const classes = computed(() =>
  twMerge("p-4 flex flex-col gap-y-4", props.className),
);
</script>

<template>
  <main :class="classes">
    <h1 class="text-3xl font-bold">{{ props.header }}</h1>
    <slot />
  </main>
</template>
