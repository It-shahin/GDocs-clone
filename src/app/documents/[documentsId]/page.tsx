import { Editor } from "./editor";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string}>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps)=> {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
        <Editor />
    </div>
  )
}

export default DocumentIdPage