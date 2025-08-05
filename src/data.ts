// Lokasi file: src/data.ts

export const PROFILE_DATA = {
  name: "Bolu Kertas",
  jobTitle: "Pengajar Aplikasi Perkantoran",
  heroDescription: "Saya mengubah ide-ide kreatif menjadi pengalaman digital yang hidup dan menyenangkan. Selamat datang di taman bermain digital saya.",
  hobby: "Mencari Tujuan",
  motto: "To be Ambitious, learn³!",
  contact: {
    whatsapp: "https://wa.me/628123456789",
    whatsappDisplay: "0812-3456-789",
    email: "mailto:bolukertas@gmail.com",
    emailDisplay: "bolukertas@gmail.com",
  }
};

const createSkill = (name: string) => ({
  name,
  rating: Math.floor(Math.random() * 3) + 3, // Acak antara 3 dan 5
});

export const SKILLS_DATA = {
  office: ["Word", "Excel", "PowerPoint"].map(createSkill),
  design: ["Photoshop", "CorelDRAW"].map(createSkill),
  coding: ["Python", "PHP", "C++", "JavaScript"].map(createSkill),
  languages: ["Agama Islam", "B. Indonesia", "B. Inggris", "B. Arab"].map(createSkill),
};