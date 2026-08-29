"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const getOrganizationId = (
  sessionOrganizationId: unknown,
  activeOrganizationId: string | null | undefined,
) => {
  if (typeof sessionOrganizationId === "string" && sessionOrganizationId.length > 0) {
    return sessionOrganizationId;
  }

  return activeOrganizationId ?? undefined;
};

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
};

export async function getUsers(documentOrganizationId?: string) {
  const { orgId, sessionClaims, userId } = await auth();

  if (!userId) {
    return [];
  }

  const clerk = await clerkClient();
  const activeOrganizationId = getOrganizationId(sessionClaims?.org_id, orgId);
  const organizationId = documentOrganizationId ?? activeOrganizationId;

  if (!organizationId) {
    return [];
  }

  if (organizationId !== activeOrganizationId) {
    const membership = await clerk.organizations.getOrganizationMembershipList({
      organizationId,
      userId: [userId],
      limit: 1,
    });

    if (membership.totalCount === 0) {
      return [];
    }
  }

  const response = await clerk.users.getUserList({
    organizationId: [organizationId],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
    color: "",
  }));

  return users;
}
