# Panduan Mengubah Konten Website

Selamat! Berikut adalah cara mudah untuk mengubah konten di website portofolio Anda tanpa perlu menyentuh kode yang rumit.

## Lokasi File Konten

Semua teks dan informasi utama website ini terletak di dalam satu file:
`src/data.ts`

## Cara Mengubah Teks

Buka file `src/data.ts` menggunakan editor teks (seperti VS Code atau Notepad++) dan ubah teks yang ada di dalam tanda kutip (`"`).

### Mengubah Data Profil & Kontak
Cari bagian `PROFILE_DATA`.
```javascript
export const PROFILE_DATA = {
  name: "Ubah Nama Anda di Sini",
  jobTitle: "Ubah Jabatan Anda di Sini",
  heroDescription: "Ubah paragraf perkenalan di halaman utama di sini.",
  hobby: "Ubah Hobi di Sini",
  motto: "Ubah Motto di Sini",
  contact: {
    whatsapp: "[https://wa.me/62NOMORHPDISINI](https://wa.me/62NOMORHPDISINI)",
    whatsappDisplay: "Ubah Tampilan Nomor WA di Sini",
    email: "mailto:emailanda@contoh.com",
    emailDisplay: "Ubah Tampilan Email di Sini",
  }
};
```

### Mengubah Daftar Keahlian
Cari bagian `SKILLS_DATA`. Anda bisa mengubah, menambah, atau mengurangi nama keahlian di dalam kurung siku (`[]`).
```javascript
export const SKILLS_DATA = {
  office: ["Word", "Excel", "PowerPoint"],
  design: ["Photoshop", "CorelDRAW"],
  // ... dan seterusnya
};
```

**PENTING:** Setelah selesai mengubah data, simpan file `data.ts` tersebut. Perubahan akan terlihat setelah Anda melakukan proses *build* dan *deploy* ulang website.