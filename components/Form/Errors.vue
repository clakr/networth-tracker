<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  error: string[] | undefined;
  className?: string;
}>();

const classes = computed(() =>
  twMerge("ms-2 list-inside list-disc text-sm text-red-500", props.className),
);
</script>

<template>
  <ul v-if="props.error" :class="classes">
    <li v-for="(e, index) in props.error" :key="index">
      {{ e }}
    </li>
  </ul>
</template>
