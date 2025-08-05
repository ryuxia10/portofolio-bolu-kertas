// Lokasi file: src/components/NewPortfolioSection.tsx

import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import PortfolioDetailDialog from "./PortfolioDetailDialog";
import { Button } from "./ui/button";
import { FileIcon } from "./ui/FileIcon";
import "./ScrollStack.css";

const portfolioItems = [
  {
    id: 1,
    category: "Modul Pelatihan",
    title: "Mastering Rumus Excel",
    description: "Panduan lengkap dari dasar hingga mahir untuk menguasai fungsi dan rumus paling berguna di Microsoft Excel.",
    bgColor: "bg-[#BDE0FE]",
    details: {
      file: "/files/materi-excel.xlsx",
      slides: [
        { title: "Materi Siap Unduh", description: "File Excel berisi semua contoh rumus, tabel, dan latihan studi kasus.", content: <FileIcon title="excel" /> },
        { title: "Fitur Unggulan", description: "Mencakup VLOOKUP, HLOOKUP, PivotTable, dan fungsi IF bercabang.", content: <img src="https://picsum.photos/200/150?random=1" alt="preview" className="rounded-lg" /> },
      ]
    }
  },
  {
    id: 2,
    category: "Workshop Interaktif",
    title: "Desain Presentasi Efektif",
    description: "Teknik merancang slide PowerPoint yang tidak hanya indah secara visual, tetapi juga mampu menyampaikan pesan dengan kuat.",
    bgColor: "bg-[#FFD1E3]",
    details: {
      file: "/files/materi-powerpoint.pptx",
      slides: [
        { title: "Template Premium", description: "Dapatkan file template PowerPoint eksklusif yang bisa langsung digunakan.", content: <FileIcon title="powerpoint" /> },
        { title: "Studi Kasus", description: "Menganalisis presentasi dari perusahaan-perusahaan terkemuka.", content: <img src="https://picsum.photos/200/150?random=3" alt="preview" className="rounded-lg" /> },
      ]
    }
  },
  {
    id: 3,
    category: "E-Book & Panduan",
    title: "Tips Cepat Microsoft Word",
    description: "Kumpulan trik dan jalan pintas untuk meningkatkan produktivitas dan efisiensi saat bekerja dengan dokumen.",
    bgColor: "bg-[#FFFACD]",
    details: {
      file: "/files/materi-word.docx",
      slides: [
        { title: "E-Book Siap Unduh", description: "Panduan praktis dalam format DOCX yang mudah dibaca dan diikuti.", content: <FileIcon title="word" /> },
      ]
    }
  },
];

const NewPortfolioSection = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDetailClick = (item: (typeof portfolioItems)[0]) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section id="gallery-section" className="w-full bg-[#FDF6E3]">
        <div className="max-w-4xl mx-auto px-4 text-center pt-20 pb-10">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 tracking-tighter">Galeri Materi Ajar</h2>
        </div>
        <ScrollStack rotationAmount={-5} itemDistance={10} baseScale={0.9} itemScale={0.02}>
          {portfolioItems.map((item) => (
            <ScrollStackItem key={item.id} itemClassName={`p-8 md:p-12 flex flex-col justify-between h-[60vh] ${item.bgColor}`}>
              <div>
                <p className="text-lg font-bold text-gray-700">{item.category}</p>
                <h3 className="text-3xl md:text-5xl font-black text-gray-900 mt-2">{item.title}</h3>
                <p className="text-base md:text-xl text-gray-800 mt-4 max-w-md">{item.description}</p>
              </div>
              <div className="self-end mt-4">
                <Button 
                  onClick={() => handleDetailClick(item)}
                  className="font-bold text-lg bg-white text-gray-900 py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition-colors h-auto"
                >
                  Lihat Detail
                </Button>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <PortfolioDetailDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} item={selectedItem} />
    </>
  );
};

export default NewPortfolioSection;