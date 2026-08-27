"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();


  return (
    <LiveblocksProvider publicApiKey={"pk_dev__Nn7XYnqEGM6KEfTjmc3T7u2u-CSXVhuYJpCjHZJFl4YY87TU9CA69og0WJf_CnL"}>
      <RoomProvider id={params.documentsId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
