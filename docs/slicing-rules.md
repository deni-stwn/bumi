# Aturan Slicing Bumi (FigCraft → React TSX)

Dokumen ini wajib diikuti setiap kali desain Bumi diubah menjadi kode, baik oleh developer maupun AI assistant. Tujuannya hasil slicing yang **semantik, responsif, aksesibel, cepat, dan mudah dirawat**, bukan sekadar mirip di screenshot.

> Slicing = membangun ulang desain sebagai sistem kode. Bukan memotong gambar, bukan menyalin posisi piksel.

---

## 0. Prinsip dasar

1. **FigCraft adalah sumber kebenaran visual, dan hasil harus sama dengan desain** (keputusan klien, 5 Nov 2026). Warna, tipografi, spacing, radius, dan copy diambil dari file FigCraft `/Users/denisetiawan/Downloads/Bumi - Real Estate Agency.figcraft`, halaman **High-Fidelity Design**, dan direplikasi apa adanya, termasuk typo, kontras rendah, dan keanehan per breakpoint yang tercatat di design-notes. Frame acuan: **desktop 1440 px, tablet 768 px, mobile 425 px** (peta frame lengkap di bagian 0a).
2. **Token dulu, komponen kedua, halaman terakhir.** Tidak ada halaman yang dikerjakan sebelum token dan komponen dasarnya siap.
3. **Satu sumber per keputusan.** Nilai desain hanya didefinisikan sekali (di token), lalu dipakai ulang.
4. **Jangan diam-diam "memperbaiki" desain.** Kalau menemukan ketidakkonsistenan (nilai di luar skala token, font berbeda sendiri, spacing ganjil):
   - selisih ≤ 2 px → pakai token terdekat;
   - selisih lebih besar atau menyangkut keputusan visual → tanyakan ke designer.
     Keduanya dicatat di [`docs/design-notes.md`](design-notes.md).
5. **File desain hanya dibaca.** Command FigCraft yang mengubah dokumen hanya dipakai sementara untuk export, langsung di-undo, dan file tidak disimpan.
6. **Kode harus bisa dibaca orang lain.** Nama, struktur, dan pola mengikuti dokumen ini, bukan selera per orang.

### 0a. Peta halaman dan frame

Semua frame ada di halaman **High-Fidelity Design** (id 2806). Nama frame tidak konsisten (lihat design-notes), jadi pakai **id** di tabel ini, bukan nama.

| Halaman                  | Route (usulan)                       | 1440           | 768          | 425          |
| ------------------------ | ------------------------------------ | -------------- | ------------ | ------------ |
| Home                     | `/`                                  | 2807 `Landing` | 10661 `Home` | 11994 `Home` |
| About                    | `/about`                             | 3232           | 3329         | 3404         |
| Properties               | `/properties`                        | 3683           | 3479         | 3880         |
| Properties Searched      | `/properties/search`                 | 5511           | 4701         | 5739         |
| Property Detail          | `/properties/:slug`                  | 5941           | 5108         | 6263         |
| Services                 | `/services`                          | 9349           | 7131         | 10042        |
| Property Management      | `/services/property-management`      | 9507           | 8938         | 11573        |
| Investment Opportunities | `/services/investment-opportunities` | 9685           | 9095         | 11731        |
| Real Estate Consultation | `/services/real-estate-consultation` | 9863 ¹         | 9252 ¹       | 11888 ¹      |
| Resources                | `/resources`                         | 6564           | 7268         | 10179        |
| Mortgage Calculator      | `/resources/mortgage-calculator`     | 6867           | 7527         | 10438        |
| Buyer Guide              | `/resources/buyer-guide`             | 7047           | 7686         | 10598        |
| Selling Guide            | `/resources/selling-guide`           | 8321           | 7749         | 10995        |
| Market Trends            | `/resources/market-trends`           | 8405           | 7812         | 11058        |
| Blog                     | `/blog`                              | 4351           | 4041         | 4901         |
| Blog Detail              | `/blog/:slug`                        | 4579           | 4250         | 5410         |
| Contact                  | `/contact`                           | 6695           | 7378         | 10289        |

¹ Frame ini bernama `Properties - Invesment Opportunities`, tapi isinya halaman Real Estate Consultation ("Expert Guidance for Every Real Estate Journey").

Halaman **Components** (id 12337): Button 13665, Input 12820, Dropdown 15084, Icons 13964, News 14824, Properties (kartu) 15213, Navbar 14851, Footer 14988. Style guide di halaman yang sama: Color Pallete 12483, Typorgraphy 15244, Grid 12338.

Halaman **Preview**, **Wireframe**, **Draft**, dan **Logo** bukan acuan slicing. Logo hanya dipakai untuk mengambil aset logo.

---

## 1. Stack (tetap, jangan diganti tanpa diskusi)

| Bagian         | Pilihan                                                                                                                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build          | Vite                                                                                                                                                                                                                                                                                          |
| UI             | React 19 + TypeScript (`strict`)                                                                                                                                                                                                                                                              |
| Styling        | Tailwind CSS v4 (token lewat `@theme`)                                                                                                                                                                                                                                                        |
| Routing        | React Router                                                                                                                                                                                                                                                                                  |
| Motion         | GSAP 3 (ScrollTrigger, SplitText, ScrollToPlugin, CustomEase)                                                                                                                                                                                                                                 |
| Font           | Self-host lewat Fontsource: Gloock (`@fontsource/gloock`, 400), Plus Jakarta Sans (`@fontsource-variable/plus-jakarta-sans`), Alexandria (`@fontsource-variable/alexandria`), Afacad (`@fontsource-variable/afacad`). Alexandria dan Afacad hanya di layer yang memakainya (design-notes G3). |
| Utilitas class | `clsx` + `tailwind-merge` lewat helper `cn()`                                                                                                                                                                                                                                                 |
| Kualitas       | oxlint (plugin react, typescript, jsx-a11y, import) + Prettier (+ plugin Tailwind)                                                                                                                                                                                                            |

Tambah dependency baru hanya jika benar-benar perlu, dan catat alasannya di commit. Grafik di Market Trends dibuat sebagai komponen SVG sendiri, tanpa library chart, kecuali diputuskan lain (design-notes MT1).

---

## 2. Alur kerja (urutan wajib)

1. **Audit desain.** Daftar halaman, section, komponen, token, dan aset. Bandingkan frame desktop, tablet, dan mobile untuk tiap halaman.
2. **Token.** `variable.export` (tailwind) ke `design/variables.css` dan `style.list` ke `design/styles.json`, lalu `npm run tokens` untuk men-generate `src/styles/tokens.css`. Di file ini hampir semua token berasal dari **paint style dan text style**; variable hanya 4 (lihat bagian 4).
3. **Komponen dasar** (`src/components/ui`) sesuai komponen di halaman **Components**, lengkap dengan variannya.
4. **Komponen layout** (`src/components/layout`): Navbar, Footer, Container, MobileMenu, NavDropdown.
5. **Section** per halaman (`src/sections/<halaman>`).
6. **Halaman dan routing** (`src/pages`).
7. **QA**: visual, responsif, aksesibilitas, motion, performa (lihat bagian 13).

Kerjakan **satu halaman sampai lulus QA** sebelum pindah ke halaman berikutnya. Urutan usulan: Home → About → Properties → Property Detail → Properties Searched → Services → tiga halaman layanan → Resources → Buyer Guide → Selling Guide → Mortgage Calculator → Market Trends → Blog → Blog Detail → Contact.

---

## 3. Struktur folder dan penamaan

```
src/
  app/            # router, root layout, error boundary
  pages/          # satu file per halaman: HomePage.tsx, AboutPage.tsx, …
  sections/       # section per halaman: sections/home/Hero.tsx, …
    shared/       # section yang dipakai di beberapa halaman (CtaBanner, FaqSection, ServiceFeature, …)
  components/
    ui/           # Button, TextField, Select, Tabs, Pagination, PropertyCard, ArticleCard, …
    layout/       # Navbar, NavDropdown, MobileMenu, Footer, Container
    icons/        # ikon SVG sebagai komponen React
  data/           # konten bertipe: properties.ts, articles.ts, faqs.ts, team.ts, …
  assets/images/  # foto WebP per subjek + index.ts (generated)
  styles/         # tokens.css (generated), globals.css
  lib/            # cn(), textStyles.ts (generated), motion, hook kecil
design/           # export FigCraft: variables.css, styles.json
docs/             # aturan ini, design-notes.md
scripts/          # token, gambar, QA
```

- **Komponen**: PascalCase, satu komponen utama per file, `export function NamaKomponen`. Tidak ada default export, kecuali halaman yang di-lazy-load.
- **Nama mengikuti layer desain**, dibersihkan. Section mengikuti nama layer tanpa kata "Section" (`Testimonials Section` → `Testimonials.tsx`). Nama layer desktop dan tablet/mobile di Home berbeda; pakai nama tablet/mobile yang lebih deskriptif (`Consultation Section`, `Vision Section`, `Insights Section`, `Stories Section`).
- **Typo di nama desain tidak dibawa ke kode** (`Mortage` → `Mortgage`, `Invesment` → `Investment`). Nama token generated tetap mengikuti desain (lihat bagian 4).
- **File non-komponen**: camelCase. **Aset**: kebab-case deskriptif (`hero-apartment-corner.webp`, bukan `image-123.png`).

---

## 4. Token dan styling

- **Warna**: komponen hanya memakai token dari paint style (`Gray/500` → `text-gray-500`, `Black Variable/40` → `bg-black-variable-40`). Desain tidak punya lapisan semantik; jangan menambah alias tanpa keputusan. **Dilarang menulis hex di komponen.** Desain hampir seluruhnya monokrom (#111111, #3D3D3D, #888888, #B0B0B0, #D1D1D1, #E7E7E7, putih); hijau dan oranye hanya di grafik Market Trends.
- **Variable**: hanya 4. `Corner-mode` (mode Squere/Rounded: S 4, M 8, L 16) menjadi token radius; `Color/Shade/Shade-01` (#050810) ada di koleksi `Variant` yang salah tempat. Pemakaiannya diverifikasi di fase 2.
- **Leading trim**: 91 % teks desain memakai trim cap-height, jadi `globals.css` memasang `text-box: trim-both cap alphabetic` pada elemen teks. Text style harus dipasang di elemen **block** (atau flex item) yang memuat teksnya sendiri; teks yang berdampingan dengan ikon di dalam flex row dibungkus `<span>` (teks telanjang di flex container tidak ter-trim); text style di inline `<a>`/`<span>` di dalam `<li>`/`<p>` membuat trim memakai font induk sehingga baris saling menimpa. Input dan select memakai `py-2 -my-2` agar descender tidak terpotong. Layer yang tidak di-trim di desain memakai `text-box-none`.
- **Metrik teks FigCraft**: line height persen dibulatkan ke piksel (token sudah memakai nilai bulat, G24); kata yang lebih lebar dari kotaknya dipotong di tengah kata (`overflow-wrap: break-word` global, G23); garis pemisah tidak memakan ruang (`hr` bernet 0 px, G25). Jangan menambah padding untuk mengejar selisih sub-piksel; cari dulu penyebabnya.
- **Tipografi**: text style desain menjadi utility `text-<nama>` (ukuran, line-height, tracking, weight sekaligus), mis. `Header/XL` → `text-header-xl`, `Body/SM/Regular` → `text-body-sm-regular`. Heading memakai Gloock (`font-gloock`), body memakai Plus Jakarta Sans (`--font-sans`). Jangan menulis `font-size`, `line-height`, dan `letter-spacing` manual.
- **Display fluid**: teks raksasa yang mengisi lebar layar ("Lets Talk!" di footer, 298.67 / 158 / 87.47 px; "Ready to …" di CTA) dibuat dengan `clamp()` berbasis lebar viewport di `globals.css` sebagai satu token per pola, bukan angka di komponen. Dicatat di design-notes.
- **Spacing dan radius**: skala Tailwind 4 px (`gap-25` = 100 px, `py-50` = 200 px, `gap-2.5` = 10 px). Nilai desain yang umum: padding section 100 dan 200, gap 10, 16, 24, 40, 70, 80, 100, 200. Arbitrary value (`p-[13px]`) dilarang, kecuali nilainya memang ada di desain dan dicatat di `design-notes.md`.
- **Auto layout = flex/grid + `gap`.** Padding frame menjadi padding elemen. Hindari `absolute`, kecuali untuk overlay dekoratif (teks di atas foto hero, "Lets Talk!" di atas foto footer, tombol di atas heading CTA).
- **Grid** (layout grid frame desktop): 12 kolom, gutter 20 px, margin 20 px. **Konten dimulai di kolom 2** dan berakhir di margin kanan; kolom 1 hanya untuk logo di navbar. Di 1440 offset kiri = 20 + 1 kolom + 20 = 138.33 px; di 768 desain memakai 84 px dan kode ikut 84 px. Di mobile konten penuh dengan margin 20 px. `Container` punya dua mode: `inset` (mulai kolom 2, default untuk konten) dan `full` (margin 20 px kiri-kanan, untuk navbar dan footer). Grid style `Tablet` dan `Mobile` diverifikasi di fase 2. Selalu bungkus konten dengan `Container`. Background boleh full-bleed.
- **Varian komponen** memakai object map bertipe, digabung dengan `cn()`. Tidak boleh merangkai string class dengan kondisi bersarang.
- **Tidak ada inline `style`**, kecuali untuk nilai yang benar-benar dinamis (progress slider, tinggi bar grafik).

---

## 5. Komponen

- **Props mengikuti properti varian desain** (`inspect.componentCode`):

  | Desain                                    | Props                                           |
  | ----------------------------------------- | ----------------------------------------------- |
  | `Style` (Button: fill / outline / nofill) | `variant`: `fill` \| `outline` \| `ghost`       |
  | `Size` / `size`                           | `size`: `lg` \| `md` \| `sm`                    |
  | `Mode` / `mode` (light / dark)            | `tone`: `light` \| `dark` (dark = di atas foto) |
  | `Type` (Input: Default / with Dropdown)   | `suffix` (slot select, mis. "Year")             |
  | `Type` (Dropdown: Underlined / Noline)    | `underline`: boolean                            |
  | `Variant` (Navbar: white / black)         | `tone`: `onImage` \| `onLight`                  |
  | `Property 1` (News: large / small)        | `variant`: `feature` \| `compact`               |
  | `Screensize` / `ScreenSize`               | dibuat responsif dengan CSS, bukan prop         |

  `State` (regular, hover, disable(d), inputed, active) adalah **state CSS** (`hover:`, `focus-visible:`, `disabled:`, `:placeholder-shown`, `aria-*`), bukan prop. Pengecualian: error menjadi `invalid`, yang juga mengisi `aria-invalid` (desain belum punya state error, lihat design-notes G9).

- **Link untuk navigasi, button untuk aksi.** Sediakan `Button` (`<button>`) dan `ButtonLink` (`<Link>`/`<a>`) dengan tampilan yang sama. Mayoritas CTA di halaman ("Learn More", "Contact Us Now", "Get Started") adalah link.
- Komponen `ui` **tidak berisi teks hardcode**. Semua teks lewat props atau `children`.
- Teruskan `className` dan props native (`ComponentProps<'button'>`, dll.).
- **Tidak ada `any`.** Data punya tipe.
- Komponen idealnya ≤ ~150 baris. Kalau lebih, pecah.
- **Pola berulang yang dijadikan komponen** walau bukan komponen di desain: `SlashList` (deret link dipisah garis miring, dipakai di navbar, tab filter, footer sosial, share), `CtaBanner` ("Ready to …"), `ServiceFeature` (teks + 3 foto + daftar poin), `FaqSection`, `GuideSection` (Buyer/Selling Guide), `CarouselControls`, `Pagination`, `SectionDivider`.

---

## 6. Konten dan data

- **Daftar atau koleksi** (properti, artikel, testimoni, tim, partner, layanan, FAQ, fasilitas, spesifikasi, resource, link navbar/footer) wajib berasal dari `src/data/*.ts` yang bertipe, lalu di-render dengan `map`.
- Copy satu kali pakai (heading section) boleh inline.
- **Copy disalin persis dari desain per breakpoint**, termasuk tanda baca, spasi, dan typo (design-notes G7). Kalau copy berbeda antar breakpoint ("Lets Talk!" vs "Lets Talk !"), kode menampilkan versi masing-masing breakpoint. Kapitalisasi visual dibuat dengan CSS (`uppercase`), bukan diketik (mis. menu footer HOME, ABOUT).
- Placeholder dari desain (lorem ipsum, "Villa House", "John Doe", harga, data fasilitas berbahasa Indonesia) tetap dipakai, tapi ditandai `// placeholder`.
- Tidak ada backend. Pencarian, filter, pagination, dan kalkulator berjalan di klien atas data statis. Form kontak dan "Download Result" menunggu keputusan (design-notes G11).

---

## 7. Aset

- **Foto**: export layer yang hanya berisi image fill, jangan render frame yang punya teks di atasnya (prosedur di `references/figcraft.md` skill). Konversi ke **WebP** q≈78 dalam `<nama>-sm.webp` (800 px) dan `<nama>-lg.webp` (≤1600 px), disimpan **per subjek** (`hero/`, `properties/`, `team/`, `articles/`, `services/`, `footer/`). Lalu jalankan `npm run images` untuk men-generate `src/assets/images/index.ts` (`src`, `srcSet`, `width`, `height`).
- **Penyesuaian gambar** (exposure, contrast, saturation) ikut terpanggang di export. Foto sama tanpa penyesuaian disimpan sebagai file terpisah. Foto hitam-putih di halaman layanan diperiksa: filter di fill atau foto aslinya memang B/W.
- **Ikon dan logo**: SVG yang dibersihkan, jadi komponen React di `src/components/icons/` dengan `currentColor`. Hanya ikon yang dipakai (set `Icons` berisi 160+ ikon). Logo mark Bumi dan logo partner (Xarse Contractor, Zampey, Flows Properties, Pines Real Estate) juga SVG. Ikon dekoratif diberi `aria-hidden`.
- **Dilarang** meng-export teks, tombol, card, form, grafik, atau section sebagai gambar.
- Setiap `<img>` wajib punya `width`, `height`, `alt` yang bermakna (atau `alt=""` untuk dekoratif), dan `loading="lazy"` kecuali gambar hero (`fetchPriority="high"`).

---

## 8. Responsif

- **Mobile-first.** Style dasar untuk mobile, lalu breakpoint ke atas.
- Acuan desain: mobile 425 px, tablet 768 px, desktop 1440 px. Breakpoint: `sm` 640, `md` 768 (layout tablet), `lg` 1024 (layout desktop), `xl` 1280, `2xl` 1440.
- Rentang di antara frame acuan diinterpolasi dengan rapi; layout tidak boleh pecah.
- Bagian padat boleh baru memakai layout desktop penuh di `xl` kalau `lg` terlalu sempit: deret link navbar, search bar 4 dropdown di hero, baris logo partner, kartu Insights. Catat di `design-notes.md`.
- Deret yang di mobile melebihi lebar layar (tab filter properti, logo partner, kartu tim, kartu artikel) menjadi **scroll horizontal dengan scroll-snap**, bukan dipotong.
- **Lebar uji wajib**: 360, 425, 768, 1024, 1280, 1440, 1920. Tidak boleh ada horizontal scroll pada halaman.
- Ukuran tipografi mobile mengikuti frame mobile, bukan versi desktop yang dikecilkan.
- Di atas 1440 px, konten tetap terpusat (`max-w-frame`); background dan foto full-bleed tetap penuh.

---

## 9. Semantik dan aksesibilitas (WCAG 2.2 AA)

- Landmark `header`, `nav`, `main`, `footer`. **Satu `h1` per halaman**, level heading tidak melompat.
- Elemen native: `button`, `a`, `input`, `select`, `label`, `ul`/`li`, `table` (spesifikasi properti), `dl` (hasil kalkulator).
- **Pola interaktif**: dropdown navbar (`aria-expanded`, `aria-controls`, `Esc` menutup), accordion FAQ (tombol `aria-expanded` + panel ber-`id`), tab (`tablist`/`tab`/`tabpanel`, tombol panah) untuk filter properti dan Market Trends, carousel (tombol prev/next berlabel, region `aria-roledescription="carousel"`, tidak auto-play), menu mobile (dialog, kunci scroll, fokus terjaga, `Esc`), pagination (`nav` + `aria-current="page"`).
- **Fokus terlihat jelas** di semua elemen interaktif. Target sentuh minimal 44×44 px di mobile (tombol carousel dan pagination di desain lebih kecil: area klik diperbesar tanpa mengubah tampilan).
- **Kontras** mengikuti desain (design-notes G4). Teks abu-abu muda yang tidak lolos AA adalah pengecualian yang diketahui: `qa:a11y` mengecualikan aturan `color-contrast` hanya untuk elemen tersebut, dan semua aturan lain tetap wajib lulus.
- **Form**: setiap input punya `label` (placeholder bukan label); error terhubung lewat `aria-describedby`.
- Grafik Market Trends punya ringkasan teks atau tabel data yang bisa dibaca screen reader.
- **Motion** menghormati `prefers-reduced-motion`.

---

## 10. Interaksi dan motion

### Interaksi

- State hover, active, focus, disabled diambil dari varian desain. Transisi 150–250 ms `ease-out`; hover tidak menggeser layout. Button outline saat hover menjadi fill (#111111); fill saat hover menjadi #3D3D3D; nofill saat hover diberi garis bawah.
- Komponen interaktif di desain ini:
  - Navbar: dropdown Properties, Services, Resources (state terbuka belum didesain); menu mobile "Menu" (state terbuka belum didesain).
  - Search hero: 4 select (Category, Type, City, Price) + tombol cari di desktop; satu input "Search Place" + tombol cari di tablet/mobile. Halaman hasil: tombol filter di mobile.
  - Tab filter properti (All / Residential / Commercial / Vacational).
  - Carousel: Insights (Home), testimoni dengan progress bar (Home), Popular Article (Blog), kartu tim (About tablet/mobile).
  - Accordion FAQ (tiga halaman layanan).
  - Pagination (Properties Searched, Blog).
  - Form kontak; kalkulator KPR (hitung, hasil, Download Result).
  - Market Trends: tab (Highlight, Market Definition, Market Structure, Reports, Methodology), navigasi Overview dengan scrollspy, tombol Download dan Share, grafik bar, stacked bar, dan garis.
  - Blog Detail: Table of Content dengan scrollspy, link share.

### Motion (GSAP)

Semua animasi masuk lewat satu hook, `src/lib/useRevealMotion.ts`, yang dipasang sekali di layout. Komponen **tidak** menulis kode GSAP sendiri; cukup atribut `data-reveal`:

| Nilai      | Efek                                          | Dipakai untuk                               |
| ---------- | --------------------------------------------- | ------------------------------------------- |
| `lines`    | Baris teks naik dari balik mask (SplitText)   | H1, H2, pernyataan besar                    |
| `up`       | Fade dan naik 24 px                           | Paragraf, tombol, gambar lepas, form        |
| `fade`     | Opacity saja                                  | Navbar, baris logo partner                  |
| `stagger`  | Setiap anak langsung fade dan naik bergiliran | Grid kartu properti, daftar layanan, FAQ    |
| `media`    | Fade, `img` di dalamnya turun dari zoom 12 %  | Kartu foto ber-`overflow-hidden`            |
| `bars`     | Setiap `[data-bar]` naik dengan clip-path     | Grafik bar Market Trends                    |
| `count`    | Angka pertama dihitung naik dari 0            | Nilai statistik Market Trends (bukan tahun) |
| `wordmark` | Anak naik dari balik tepi bawah elemen        | "Lets Talk!" di footer                      |

Aturan:

1. **Hanya opacity dan transform** (plus clip-path untuk `bars`), sehingga tinggi halaman tidak berubah.
2. **Inline style dibersihkan** (`clearProps`) setelah animasi, supaya hover CSS tetap bekerja.
3. **Tidak memakai `visibility`**: konten yang belum muncul tetap bisa dicapai keyboard.
4. **`prefers-reduced-motion: reduce`** dan tanpa JS: tidak ada yang disembunyikan.
5. Elemen yang sudah terlihat saat halaman dibuka diputar berurutan sesuai DOM (jeda 80 ms).
6. **Easing**: `house` (0.76, 0, 0.24, 1) untuk zoom, bar, dan objek yang bergerak; `house-out` (0.16, 1, 0.3, 1) untuk entrance. Brand Bumi tidak punya kurva sendiri.
7. Setiap reveal berjalan sekali. Saat pindah route, animasi dan SplitText di-revert lalu dibuat ulang.
8. Jangan menumpuk reveal: elemen di dalam `up`/`stagger` dilewati, kecuali `count` dan `bars`.
9. Jangan memakai `<br className="max-lg:hidden">` di teks yang di-split; pakai `<span className="lg:block">`.
10. Tautan `#id` (Table of Content, Overview Market Trends) meluncur lewat `useSmoothAnchors` (ScrollToPlugin) dan berhenti di `scroll-margin-top`.

---

## 11. Performa dan SEO

- Target Lighthouse (mobile) ≥ 90 untuk keempat kategori.
- Setiap halaman di-lazy-load per route. GSAP dan React dipisah ke chunk sendiri.
- Font self-host, hanya weight yang dipakai (Gloock 400; Plus Jakarta Sans variable). Gambar hero ≤ ~250 KB.
- Foto footer ("Lets Talk!") muncul di semua halaman: satu file, `loading="lazy"`.
- Setiap halaman punya `<title>` dan `<meta name="description">` sendiri.

---

## 12. Kualitas kode

- TypeScript `strict`, tanpa `any`, tanpa `@ts-ignore`.
- `npm run lint` 0 error, `npm run build` lulus, Prettier sudah dijalankan.
- Tidak ada `console.log`, kode mati, atau file tak terpakai.
- Komentar menjelaskan **alasan**. Commit memakai Conventional Commits.

---

## 13. Definition of Done per halaman

- [ ] **Visual desktop**: dibandingkan berdampingan dengan render frame FigCraft 1440 px pada 1×. Selisih layout ≤ 2 px; warna dan tipografi persis; tinggi halaman mendekati tinggi frame.
- [ ] **Visual tablet dan mobile**: sama, di lebar 768 px dan 425 px.
- [ ] Semua state interaktif (hover, focus, active, open, error) ada.
- [ ] Lolos semua lebar uji tanpa horizontal scroll (`scrollWidth` = lebar viewport).
- [ ] Bisa dipakai penuh dengan keyboard, fokus terlihat.
- [ ] Heading berurutan, landmark ada, semua gambar punya `alt`.
- [ ] `data-reveal` terpasang dan `npm run qa:motion` lulus.
- [ ] `npm run qa:a11y` lulus (pelanggaran kontras dari design-notes G4 adalah pengecualian yang diketahui).
- [ ] Tidak ada error atau warning di console.
- [ ] `npm run lint` dan `npm run build` lulus.
- [ ] Temuan desain sudah dicatat di `docs/design-notes.md`.

### Cara QA visual

- Render frame FigCraft: `export {ids: [frame], format: "png", scale: 1}` (id dari bagian 0a).
- Screenshot halaman: `npm run qa:shot -- <url> <lebar> <out.png>`. Pakai emulasi device lewat CDP, karena Chrome headless tidak bisa di bawah ~500 px dengan `--window-size`.
- Susun berdampingan per potongan, lalu cek posisi, ukuran, dan warna. Catat `scrollWidth` di setiap lebar uji.

## 14. Anti-pattern

- Layout `position: absolute` dengan koordinat dari desain.
- Menyalin output `inspect.code` apa adanya (div soup, hex, px mentah).
- Hex, ukuran font, atau spacing hardcode di komponen.
- Teks atau UI yang di-export sebagai gambar, termasuk foto yang teksnya ikut terpanggang dan grafik.
- `<div onClick>` sebagai pengganti `button` atau `a`.
- Copy-paste section yang hampir sama alih-alih membuat komponen (CTA "Ready to …", blok layanan, FAQ, section panduan).
- Mengerjakan halaman baru sebelum halaman sebelumnya lulus Definition of Done.
- Mengubah desain (di kode atau di file FigCraft) tanpa mencatat atau menanyakannya.
