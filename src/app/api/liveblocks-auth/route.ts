import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { userId, orgId, sessionClaims } = await auth();
  if (!userId || !sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  const organizationId = (sessionClaims.organization_id ?? sessionClaims.org_id ?? orgId) as
    | string
    | undefined;

  const isOwner = document.ownerId === userId;
  let isOrganizationMember = 
    !!(document.organizationId && document.organizationId === organizationId);

  if (!isOrganizationMember && document.organizationId) {
    const clerk = await clerkClient();
    const memberships = await clerk.organizations.getOrganizationMembershipList({
      organizationId: document.organizationId,
    });

    isOrganizationMember = memberships.data.some(
      (membership) => membership.publicUserData?.userId === userId
    );
  }

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 });
  }

  const name = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Anonymous";
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name,
      avatar: user?.imageUrl,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
};
