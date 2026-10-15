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
    let offset = 0;
    let isMember = false;
    while (!isMember) {
      const memberships = await clerk.users.getOrganizationMembershipList({
        userId,
        limit: 100,
        offset,
      });
      isMember = memberships.data.some((entry) => entry.organization.id === organizationId);
      offset += memberships.data.length;
      if (memberships.data.length === 0 || offset >= memberships.totalCount) break;
    }
    if (!isMember) return [];
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
