<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

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
