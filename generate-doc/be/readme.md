# 📄 **Generate Document API**  

Dibuat oleh **devnolife**

## 📌 **Deskripsi**  

Generate Document API adalah aplikasi berbasis Node.js yang memungkinkan pengguna untuk menghasilkan dokumen berdasarkan template yang telah ditentukan. Aplikasi ini menggunakan **Express.js** sebagai server, **Prisma** untuk interaksi database, dan **Docxtemplater** untuk pembuatan dokumen.

---

## 🏗️ **Struktur Proyek**

```
.env
.gitignore
api/
  index.js
auth/
  index.js
controllers/
  index.js
package.json
prisma/
  index.js
  schema.prisma
  seed.js
public/
  output/
    undefined.docx
readme.md
routes/
  index.js
server.js
services/
  fields.js
  index.js
session/
  index.js
templates/
  kkp.docx
  output/
    1731856602497.docx
  qr-code/
test/
utils/
  generate-date.js
  generate-document.js
  generate-fields.js
  generate-qrcode.js
```

---

## 🚀 **Instalasi**

Ikuti langkah-langkah berikut untuk menjalankan proyek ini:

### 1️⃣ Clone Repository  

```bash
git clone https://github.com/devnolife/generate-document-api.git
cd generate-document-api
```

### 2️⃣ Instalasi Dependencies  

Instal semua package yang diperlukan untuk menjalankan proyek:  

```bash
npm install express prisma docxtemplater form-data moment qrcode dotenv
```

### 3️⃣ Konfigurasi Variabel Lingkungan  

Buat file `.env` di direktori root, lalu tambahkan variabel lingkungan seperti contoh berikut:  

```env
DATABASE_URL=your_database_url
```

### 4️⃣ Migrasi Database  

Jalankan migrasi Prisma dan seed database:  

```bash
npx prisma migrate dev
npm run seed
```

### 5️⃣ Jalankan Server  

```bash
npm run dev
```

Server akan berjalan di **<http://localhost:8000>**.

---

## 📋 **Endpoint API**

### 🔹 **Generate Dokumen**  

- **URL**: `/api/generate-document/:type`  
- **Metode**: `POST`  
- **Deskripsi**: Menghasilkan dokumen berdasarkan tipe dan data yang diberikan.  

#### **Request Body**  

```json
{
  "type": "kkp",
  "data": {
    "kepada": "John Doe",
    "tempat_tujuan": "Some Place",
    "nama_prodi": "Computer Science",
    "tanggal_hijriyah": "1442/10/01",
    "tanggal_masehi": "2021-05-13",
    "tableData": [
      { "field1": "value1", "field2": "value2" }
    ]
  }
}
```

#### **Response**  

```json
{
  "filePath": "path/to/generated/document.docx",
  "no_surat": "12345",
  "message": "Dokumen KKP berhasil diupload"
}
```

---

## 🛠️ **Detail Proyek**

### 🔧 **Dependencies**

- **Express.js**: Framework web untuk Node.js.  
- **Prisma**: ORM generasi berikutnya untuk Node.js & TypeScript.  
- **Docxtemplater**: Library untuk membuat dokumen .docx dari template.  
- **Form-Data**: Modul untuk membuat stream "multipart/form-data".  
- **Moment.js**: Library untuk parsing, validasi, manipulasi, dan format tanggal.  
- **QRCode**: Library untuk membuat QR code.  
- **dotenv**: Library untuk mengelola variabel lingkungan.

### 🔑 **Scripts**

- `npm run dev`: Menjalankan server dalam mode pengembangan.  
- `npm run seed`: Mengisi database dengan data awal.  

### 🗂️ **Schema Database**  

Database schema didefinisikan di `prisma/schema.prisma`, mencakup model berikut:  

- **documents**: Representasi tipe dokumen dengan field terkait.  
- **document_fields**: Representasi field yang berhubungan dengan dokumen.

---

## 🔍 **Utilitas**

- **`generate-date.js`**: Mengelola pembuatan dan format tanggal.  
- **`generate-document.js`**: Logika pembuatan dokumen menggunakan Docxtemplater.  
- **`generate-fields.js`**: Logika untuk menghasilkan data field dokumen.  
- **`generate-qrcode.js`**: Logika untuk membuat QR code.

---

## 🤝 **Kontribusi**

Kontribusi sangat diterima! Silakan buat issue atau pull request untuk perubahan besar. Diskusikan terlebih dahulu melalui issue jika ada perubahan besar yang ingin diajukan.

---

## 📜 **Lisensi**  

Proyek ini dilisensikan di bawah **ISC License**.
