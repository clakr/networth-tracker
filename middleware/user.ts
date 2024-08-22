import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { authRedirects, useSanctumAuth } from "#imports";
import type { User } from "~/utils/types/User";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, user } = useSanctumAuth<User>();

  if (isAuthenticated.value && user.value?.role === "user") return;

  if (isAuthenticated.value && user.value?.role === "admin")
    return navigateTo(authRedirects.admin, { replace: true });

  return navigateTo("/", { replace: true });
});
