import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSanctumAuth } from "#imports";
import { authRedirects } from "~/lib/constants";
import type { User } from "~/lib/types/User";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, user } = useSanctumAuth<User>();

  if (isAuthenticated.value && user.value?.role === "user") return;

  if (isAuthenticated.value && user.value?.role === "admin")
    return navigateTo(authRedirects.admin, { replace: true });

  return navigateTo("/", { replace: true });
});
