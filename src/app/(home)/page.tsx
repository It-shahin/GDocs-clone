"use client";


import { useAuth } from "@clerk/nextjs";
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

const Home = () => {
  const [search] = useSearchParam();
  const { orgId } = useAuth();
  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.get, { 
    search, 
    organizationId: orgId ?? undefined,
  }, { initialNumItems: 5 });


  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery organizationId={orgId ?? undefined} />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  )
}

export default Home
