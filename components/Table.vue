<template>
  <div class="overflow-hidden">
    <div class="overflow-auto rounded-lg border border-neutral-200">
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
  </div>
</template>
