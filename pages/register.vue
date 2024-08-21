<script setup lang="ts">
import Button from "~/components/Button.vue";
import Field from "~/components/Form/Field.vue";
import Input from "~/components/Form/Input.vue";
import Label from "~/components/Form/Label.vue";
</script>

<template>
  <main class="grid min-h-screen place-content-center text-neutral-950">
    <form class="flex w-[500px] flex-col gap-y-8 rounded-lg border p-6">
      <section>
        <h1 class="text-2xl font-bold">Register</h1>
        <p class="text-neutral-950/75">Create a new account to get started.</p>
      </section>
      <section class="flex flex-col gap-y-4">
        <div class="flex gap-x-4">
          <Field class-name="grow">
            <Label for="given-name">First Name</Label>
            <Input
              id="given-name"
              type="text"
              name="given-name"
              autocomplete="given-name"
              placeholder="John"
            />
          </Field>
          <Field class-name="grow">
            <Label for="family-name">Last Name</Label>
            <Input
              id="family-name"
              type="text"
              name="family-name"
              autocomplete="family-name"
              placeholder="Doe"
            />
          </Field>
        </div>
        <Field>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="johndoe@example.com"
          />
        </Field>
        <Field>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            autocomplete="password"
            placeholder="********"
          />
        </Field>
      </section>
      <Button>Register</Button>
    </form>
  </main>
</template>
