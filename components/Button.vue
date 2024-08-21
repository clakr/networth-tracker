<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{ to?: string; className?: string }>();

const classes = computed(() =>
  twMerge(
    "rounded bg-neutral-950 px-4 py-2 font-medium text-neutral-50 outline-offset-2 outline-neutral-950 disabled:cursor-not-allowed disabled:opacity-75",
    props.className,
  ),
);
</script>

<template>
  <NuxtLink v-if="props.to" :to="props.to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>
