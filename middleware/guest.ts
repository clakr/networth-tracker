import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSanctumAuth } from "#imports";
import { authRedirects } from "~/lib/constants";
import type { User } from "~/lib/types/User";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, user } = useSanctumAuth<User>();

  if (!isAuthenticated.value) return;
  if (!user.value) throw new Error("User not found!");

  return navigateTo(authRedirects[user.value.role], { replace: true });
});
