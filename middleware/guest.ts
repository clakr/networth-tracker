import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { authRedirects, useSanctumAuth } from "#imports";
import type { User } from "~/utils/types/User";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, user } = useSanctumAuth<User>();

  if (!isAuthenticated.value) return;
  if (!user.value) throw new Error("User not found!");

  return navigateTo(authRedirects[user.value.role], { replace: true });
});
