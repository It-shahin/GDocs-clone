import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

type LiveblocksAuthBody = {
  room?: Id<"documents">;
};

const getOrganizationId = (
  sessionOrganizationId: unknown,
  activeOrganizationId: string | null | undefined,
) => {
  if (typeof sessionOrganizationId === "string" && sessionOrganizationId.length > 0) {
    return sessionOrganizationId;
  }

  return activeOrganizationId ?? undefined;
};

const isMemberOfOrganization = async (organizationId: string, userId: string) => {
  const clerk = await clerkClient();
  const membership = await clerk.organizations.getOrganizationMembershipList({
    organizationId,
    userId: [userId],
    limit: 1,
  });

  return membership.totalCount > 0;
};

export async function POST(req: Request) {
  const { orgId, sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = (await req.json()) as LiveblocksAuthBody;

  if (!room) {
    return new Response("Room is required", { status: 400 });
  }

  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  const organizationId = getOrganizationId(sessionClaims.org_id, orgId);

  const isOwner = document.ownerId === user.id;
  const isCurrentOrganizationMember =
    !!(document.organizationId && document.organizationId === organizationId);
  const isDocumentOrganizationMember =
    !!document.organizationId &&
    !isCurrentOrganizationMember &&
    (await isMemberOfOrganization(document.organizationId, user.id));
  const isOrganizationMember =
    isCurrentOrganizationMember || isDocumentOrganizationMember;

  if (!isOwner && !isOrganizationMember) {
    console.log("Liveblocks auth denied", {
      room,
      userId: user.id,
      ownerId: document.ownerId,
      documentOrganizationId: document.organizationId,
      activeOrganizationId: organizationId,
      sessionOrganizationId: sessionClaims.org_id,
      authOrganizationId: orgId,
    });

    return new Response("Unauthorized", { status: 401 });
  }

  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
};
