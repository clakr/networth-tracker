<script setup lang="ts">
import { navigateTo } from "#app";
import { computed } from "vue";

const props = defineProps<{
  from: number;
  to: number;
  total: number;
  currentPage: number;
  lastPage: number;
}>();

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.lastPage);

async function handleGoToPreviousPage() {
  if (isFirstPage.value) return;
  await navigateTo({ query: { page: props.currentPage - 1 } });
}

async function handleGoToNextPage() {
  if (isLastPage.value) return;
  await navigateTo({ query: { page: props.currentPage + 1 } });
}
</script>

<template>
  <footer class="flex justify-between">
    <div class="flex items-center text-sm text-neutral-950/75">
      Showing {{ props.from }} to {{ props.to }} of {{ props.total }} Users
    </div>
    <div class="flex gap-x-2">
      <Button
        variant="icon"
        :disabled="isFirstPage"
        @click="handleGoToPreviousPage"
      >
        <span class="sr-only">Previous Listing of Users</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"
          />
        </svg>
      </Button>
      <Button variant="icon" :disabled="isLastPage" @click="handleGoToNextPage">
        <span class="sr-only">Next Listing of Users</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"
          />
        </svg>
      </Button>
    </div>
  </footer>
</template>
