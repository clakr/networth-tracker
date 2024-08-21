<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  className?: string;
}>();

const classes = computed(() =>
  twMerge("flex flex-col gap-y-1", props.className),
);
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
