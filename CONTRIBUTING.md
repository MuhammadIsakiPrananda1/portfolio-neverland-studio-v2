# Kontribusi

Terima kasih telah mempertimbangkan untuk berkontribusi pada proyek Neverland Studio!

## Kode Etik

Dengan berpartisipasi dalam proyek ini, Anda diharapkan untuk menjunjung tinggi kode etik kami. Harap baca dan patuhi aturan berikut:

1. **Hormati** - Semua kontribusi harus bersifat konstruktif dan menghormati
2. **Inklusi** - Kami welcome semua orang terlepas dari latar belakang
3. **Kualitas** - Kode yang dihasilkan harus memenuhi standar kualitas kami

## Cara Berkontribusi

### Pelaporan Bug

1. Cari apakah bug sudah pernah dilaporkan
2. Jika belum, buat issue baru dengan format:
   - **Title**: Deskripsi singkat bug
   - **Description**: Penjelasan detail
   - **Steps to Reproduce**: Langkah-langkah mereproduksi
   - **Expected Behavior**: Hasil yang diharapkan
   - **Actual Behavior**: Hasil aktual
   - **Screenshots**: Screenshot jika ada

### Request Fitur

1. Cari apakah fitur sudah pernah diminta
2. Jika belum, buat issue baru dengan format:
   - **Title**: Nama fitur
   - **Description**: Penjelasan detail fitur
   - **Use Case**: Kasus penggunaan
   - **Alternatives**: Alternatif yang dipertimbangkan

### Pull Request

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add: AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Standar Kode

#### Frontend (React/TypeScript)

```typescript
// Gunakan functional components
const Component: React.FC<Props> = ({ title }) => {
  return <div>{title}</div>
}

// Gunakan TypeScript strict mode
interface Props {
  title: string
  onClick?: () => void
}
```

#### Backend (Laravel)

```php
// Gunakan controller untuk logic
public function index(Request $request)
{
    return response()->json([
        'data' => $request->user()
    ]);
}

// Validasi dengan Form Request
public function store(StoreProjectRequest $request)
{
    $project = Project::create($request->validated());
    return response()->json($project, 201);
}
```

### Proses Review

1. Maintainer akan mereview PR dalam 1-3 hari
2. Mohon respond terhadap feedback
3. Setelah approved, PR akan di-merge

### Prioritas Kontribusi

Kami sangat membutuhkan kontribusi di area:
- Documentation
- Bug fixes
- Performance optimization
- Security improvements
- New features

## Pertanyaan?

Jika ada pertanyaan, hubungi kami di Arlianto032@gmail.com
