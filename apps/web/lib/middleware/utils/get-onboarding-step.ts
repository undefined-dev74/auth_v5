import { redis } from "@/lib/upstash";
import type { User } from "@prisma/client";

export async function getOnboardingStep(user: User) {
  return await redis.get(`onboarding-step:${user.id}`);
}
