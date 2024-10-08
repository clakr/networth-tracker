<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

type Variant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "icon";

const props = withDefaults(
  defineProps<{
    to?: string;
    className?: string;
    variant?: Variant;
  }>(),
  {
    to: undefined,
    className: undefined,
    variant: "primary",
  },
);

const variantDefaultClasses: Record<Variant, string> = {
  primary:
    "bg-neutral-950 text-neutral-50 hover:opacity-85 px-3 py-2.5 disabled:opacity-75",
  secondary: "",
  destructive: "",
  outline: "",
  ghost: "",
  link: "hover:underline underline-offset-2 py-1 px-2",
  icon: "border p-3 [&>svg]:size-4 border-neutral-200 hover:bg-neutral-200/50 disabled:opacity-50",
};

const classes = computed(() =>
  twMerge(
    "outline-offset-4 outline-neutral-950 disabled:cursor-not-allowed font-medium text-sm rounded-md whitespace-nowrap",
    variantDefaultClasses[props.variant],
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
