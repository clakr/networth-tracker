<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const model = defineModel<string>();

const props = defineProps<{
  className?: string;
}>();

const classes = computed(() =>
  twMerge(
    "border border-neutral-200 outline-neutral-950 outline-offset-4 outline-2 px-3 py-1.5 rounded-md",
    props.className,
  ),
);
</script>

<template>
  <select v-model="model" :class="classes">
    <slot />
  </select>
</template>
