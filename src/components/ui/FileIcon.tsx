import { FileText, Presentation } from "lucide-react";

export const FileIcon = ({ title }: { title: string }) => {
  if (title.toLowerCase().includes("excel")) return <div className="w-24 h-24 bg-green-200 text-green-700 flex items-center justify-center rounded-lg"><FileText size={48} /></div>;
  if (title.toLowerCase().includes("powerpoint")) return <div className="w-24 h-24 bg-orange-200 text-orange-700 flex items-center justify-center rounded-lg"><Presentation size={48} /></div>;
  if (title.toLowerCase().includes("word")) return <div className="w-24 h-24 bg-blue-200 text-blue-700 flex items-center justify-center rounded-lg"><FileText size={48} /></div>;
  return <div className="w-24 h-24 bg-gray-200 text-gray-700 flex items-center justify-center rounded-lg"><FileText size={48} /></div>;
};