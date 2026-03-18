# This Billing Me

**This Billing Me** adalah dashboard internal untuk manajemen billing dan invoice. Project ini memungkinkan tim internal untuk membuat, mengelola, dan melacak invoice dengan mudah.

## Fitur

* Dashboard untuk melihat ringkasan invoice dan billing
* Pembuatan dan pengelolaan invoice
* Sorting dan filtering invoice
* Notifikasi status invoice (paid/unpaid)
* Pagination untuk daftar invoice panjang
* Validasi form input dengan `zod`
* State management menggunakan store (misal: `useInvoiceStore`)
* Loading dan empty state yang responsif

## Tantangan Project

Pada project ini, bagian yang menurut saya paling menantang adalah **menggabungkan beberapa query parameter**, khususnya saat membangun fitur **search** dan **filter** pada invoice. Saya memiliki case di mana kedua fitur tersebut harus bekerja secara bersamaan, sehingga hasil yang dikembalikan harus sesuai dengan validasi yang sudah dibuat di API routes.

Selain itu, tantangan berikutnya adalah **menentukan struktur folder dan penamaan file**. Saya perlu menyesuaikan struktur tersebut dengan fitur yang ada agar codebase tetap mudah dibaca, terorganisir, dan lebih mudah di-maintain jika sewaktu-waktu digunakan atau dikembangkan kembali.

## Struktur Project

```plaintext
/app
  /invoices
    page.tsx       # Halaman utama invoice
  layout.tsx       # Layout global aplikasi
/hooks
  /invoices
    useInvoices.ts # Hook untuk fetching invoice
/components
  /shared
    LoadingState.tsx
    EmptyState.tsx
  /feature
    /Invoice
      InvoiceTable.tsx
      InvoiceHeader.tsx
      InvoiceToolbar.tsx
/store
  invoice-store.ts # State management untuk invoice
/lib
  api-response.ts  # Helper response API
/types
  data-types.ts    # Typing data invoice dan customer
```

## Instalasi

1. Clone repository

```bash
git clone <URL_REPOSITORY>
```

2. Install dependencies

```bash
npm install
# atau
yarn install
```

3. Jalankan development server

```bash
npm run dev
# atau
yarn dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## Environtmen Varaibel
```bash
#env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Teknologi yang Digunakan

* [Next.js](https://nextjs.org/) – Framework React untuk aplikasi fullstack
* TypeScript – Typing system untuk JavaScript
* Tailwind CSS – Styling komponen
* TanStack Query – Data fetching dan state management untuk API
* React Hook Form - library untuk mengelola form
* Zod – Validasi schema form

## Cara Contribution

1. Fork repository
2. Buat branch baru: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m "Tambah fitur X"`
4. Push ke branch: `git push origin fitur-baru`
5. Buat Pull Request

## License

MIT License © Syahroni

---
