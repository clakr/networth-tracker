<template>
  <div class="relative overflow-auto rounded-lg border border-neutral-200">
    <table class="w-full">
      <thead>
        <tr>
          <slot name="thead" />
        </tr>
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>
