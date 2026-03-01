# Article Portal — Frontend

Next.js 14 frontend untuk Article Portal API (Go backend).

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)

## Setup

```bash
# Install dependencies
npm install

# Copy env file dan sesuaikan
cp .env.local.example .env.local

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080   # URL backend Go Anda
NEXT_PUBLIC_API_KEY=your_api_key_here       # API Key (untuk /health endpoint)
```

## Fitur

### Dashboard (`/dashboard`)
- **All Posts** — Tabel artikel dengan tabs Published, Drafts, Trashed
- Setiap tab menampilkan daftar artikel dengan kolom: Title, Category, Action
- Tombol **Edit** (ikon pensil) → navigasi ke halaman edit
- Tombol **Trash** (ikon tong sampah) → pindah artikel ke tab Trashed
- Di tab Trashed: tombol Restore (ke draft) dan Delete permanent

### Add New (`/dashboard/new`)
- Form dengan field: Title, Category (dropdown), Content (textarea)
- Tombol **Publish** → kirim dengan `status: "published"`
- Tombol **Save as Draft** → kirim dengan `status: "draft"`

### Edit (`/dashboard/edit/[id]`)
- Form pre-filled dengan data artikel yang ada
- Tombol **Publish** dan **Save as Draft** untuk update status

### Preview (`/preview`)
- Blog grid menampilkan artikel dengan status "published"
- Pagination (6 artikel per halaman)
- Klik artikel → halaman detail `/preview/[id]`

## Struktur API yang digunakan

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/v1/article` | Ambil semua artikel |
| POST | `/api/v1/article` | Buat artikel baru |
| GET | `/api/v1/article/:id` | Ambil artikel by ID |
| PUT | `/api/v1/article/:id` | Update artikel |
| DELETE | `/api/v1/article/:id` | Hapus artikel |

## Catatan
- Field `status` pada model artikel harus ada di backend: `"published"`, `"draft"`, atau `"trashed"`
- Pastikan backend mengaktifkan CORS (sudah ada `middlewares.CORS` di backend)
