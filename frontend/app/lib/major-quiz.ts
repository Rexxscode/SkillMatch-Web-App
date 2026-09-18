import { api, BACKEND_ENDPOINTS } from "./api";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: "basic" | "intermediate" | "advanced" | "expert";
  skill: string;
}
const rplQuiz: QuizQuestion[] = [
  // ── HTML/CSS (rpl-01 ─ rpl-10) ──────────────────────────────────────────
  {
    id: "rpl-01",
    question: "Tag HTML apa yang digunakan untuk membuat paragraf teks?",
    options: ["<div>", "<p>", "<span>", "<text>", "<para>"],
    correct: 1,
    difficulty: "basic",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-02",
    question: "Apa kepanjangan dari CSS?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
      "Computer Style Sheet",
      "Cascading Syntax Styling",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-03",
    question: "Apa fungsi utama CSS Flexbox?",
    options: [
      "Membuat animasi transisi",
      "Mengatur layout satu dimensi (baris atau kolom)",
      "Membuat efek bayangan pada elemen",
      "Mengelola style sheet secara dinamis",
      "Membuat grid dua dimensi",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-04",
    question: "Manakah yang merupakan selector CSS untuk mengambil elemen dengan id 'header'?",
    options: [".header", "#header", "header", "*header", "@header"],
    correct: 1,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-05",
    question: "Apa perbedaan utama antara 'display: block' dan 'display: inline' di CSS?",
    options: [
      "Block memiliki warna latar belakang, inline tidak",
      "Block menempati lebar penuh, inline hanya selebar kontennya",
      "Block bisa dibuat transparan, inline tidak",
      "Block hanya bisa berisi teks, inline bisa berisi elemen lain",
      "Block di-render secara vertical, inline di-render secara horizontal",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-06",
    question: "Apa itu CSS specificity dan bagaimana urutan prioritasnya dari yang tertinggi?",
    options: [
      "Element > Class > ID > Inline",
      "Inline > ID > Class > Element",
      "ID > Inline > Class > Element",
      "Class > ID > Element > Inline",
      "Inline > Class > ID > Element",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-07",
    question: "Apa tujuan penggunaan CSS custom properties (CSS variables) dengan awalan '--'?",
    options: [
      "Untuk membuat animasi lebih cepat",
      "Menyimpan nilai yang dapat digunakan kembali di seluruh stylesheet",
      "Untuk mengompresi ukuran file CSS",
      "Untuk menambahkan komentar pada kode CSS",
      "Untuk mengenkripsi properti CSS",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-08",
    question: "Manakah properti CSS yang paling efisien untuk melakukan animasi transformasi tanpa memicu reflow?",
    options: [
      "width dan height",
      "top dan left",
      "transform dan opacity",
      "margin dan padding",
      "font-size dan line-height",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-09",
    question: "Apa fungsi CSS 'contain' property dalam konteks optimasi performa rendering?",
    options: [
      "Menggabungkan beberapa file CSS",
      "Membatasi area rendering untuk meminimalkan scope repaint dan reflow",
      "Mengenkripsi konten halaman",
      "Menyembunyikan elemen dari DOM tree",
      "Mengubah ukuran viewport browser",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "HTML/CSS",
  },
  {
    id: "rpl-10",
    question: "Teknik apa yang digunakan untuk mengurangi render-blocking CSS agar halaman dimuat lebih cepat?",
    options: [
      "Inline seluruh CSS ke dalam tag <script>",
      "Gunakan critical CSS secara inline dan load CSS non-kritis secara asinkron",
      "Gabungkan seluruh CSS ke dalam satu file tanpa kompresi",
      "Gunakan JavaScript untuk menghapus semua CSS saat loading",
      "Gunakan attribute 'defer' pada tag <link rel='stylesheet'>",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "HTML/CSS",
  },

  // ── JavaScript (rpl-11 ─ rpl-20) ────────────────────────────────────────
  {
    id: "rpl-11",
    question: "Apa perbedaan utama antara keyword 'let' dan 'var' di JavaScript?",
    options: [
      "let hanya bisa digunakan di dalam fungsi",
      "let memiliki block scope, var memiliki function scope",
      "let mendukung hoisting, var tidak",
      "var lebih cepat dari let saat eksekusi",
      "let hanya bisa menyimpan string, var bisa menyimpan tipe apapun",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "JavaScript",
  },
  {
    id: "rpl-12",
    question: "Bagaimana cara yang benar untuk mendeklarasikan sebuah array kosong di JavaScript?",
    options: [
      "array();",
      "var arr = [];",
      "var arr = {};",
      "var arr = null;",
      "var arr = new Object();",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "JavaScript",
  },
  {
    id: "rpl-13",
    question: "Apa perbedaan antara operator '==' dan '===' di JavaScript?",
    options: [
      "Tidak ada perbedaan, keduanya sama",
      "'==' melakukan perbandingan dengan type coercion, '===' melakukan strict comparison tanpa konversi tipe",
      "'==' lebih cepat dari '==='",
      "'===' hanya bisa membandingkan angka, '==' bisa membandingkan semua tipe",
      "'==' mengembalikan string, '===' mengembalikan boolean",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "JavaScript",
  },
  {
    id: "rpl-14",
    question: "Apa yang dikembalikan oleh metode Array.prototype.map() di JavaScript?",
    options: [
      "Array yang sama dengan dimodifikasi secara langsung",
      "Array baru dengan nilai hasil pemetaan dari setiap elemen",
      "Satu nilai (bukan array) dari operasi reduksi",
      "Boolean yang menandakan apakah semua elemen lolos filter",
      "Object dengan elemen array sebagai key",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "JavaScript",
  },
  {
    id: "rpl-15",
    question: "Bagaimana mekanisme event loop bekerja di JavaScript untuk menangani operasi asinkron?",
    options: [
      "JavaScript menjalankan semua kode secara paralel di thread terpisah",
      "Event loop memproses call stack terlebih dahulu, lalu mengambil callback dari task queue saat call stack kosong",
      "Semua operasi asinkron langsung dieksekusi tanpa menunggu call stack kosong",
      "Event loop hanya bekerja di browser, tidak di Node.js",
      "JavaScript menggunakan multiple thread untuk menangani semua operasi",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "JavaScript",
  },
  {
    id: "rpl-16",
    question: "Apa yang dimaksud dengan closure di JavaScript?",
    options: [
      "Fungsi yang tidak memiliki return value",
      "Fungsi yang mengakses variabel dari scope luar meskipun fungsi outer sudah selesai dieksekusi",
      "Fungsi yang dijalankan secara otomatis tanpa dipanggil",
      "Fungsi yang hanya bisa dijalankan satu kali",
      "Variabel yang dideklarasikan di dalam blok if-else",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "JavaScript",
  },
  {
    id: "rpl-17",
    question: "Apa tujuan penggunaan 'use strict' di awal file JavaScript atau fungsi?",
    options: [
      "Mengaktifkan fitur ES6 terbaru secara otomatis",
      "Mengaktifkan mode ketat yang mencegah penggunaan fitur yang tidak aman atau error umum",
      "Mengompresi kode agar lebih ringan",
      "Mengaktifkan kompilasi tipe statis pada JavaScript",
      "Mengubah semua variabel menjadi konstanta",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "JavaScript",
  },
  {
    id: "rpl-18",
    question: "Apa perbedaan antara method .call(), .apply(), dan .bind() pada fungsi di JavaScript?",
    options: [
      "Ketiganya memiliki fungsi yang sama persis",
      "call() dan apply() langsung menjalankan fungsi dengan this yang ditentukan, bind() mengembalikan fungsi baru dengan this yang sudah diikat",
      "apply() mengembalikan nilai, call() mengembalikan fungsi baru",
      "bind() langsung menjalankan fungsi, call() dan apply() tidak",
      "call() hanya bisa digunakan di browser, apply() hanya di Node.js",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "JavaScript",
  },
  {
    id: "rpl-19",
    question: "Bagaimana mekanisme garbage collection bekerja di JavaScript untuk mengelola memori?",
    options: [
      "JavaScript tidak memiliki garbage collection, memori dikelola secara manual oleh programmer",
      "Menggunakan mark-and-sweep algorithm yang menandai objek yang masih diakses dan menghapus yang tidak terpakai",
      "Seluruh memori dialokasikan ulang setiap kali fungsi baru dipanggil",
      "Garbage collection hanya bekerja saat browser ditutup",
      "Setiap variabel dihapus dari memori segera setelah fungsi selesai dieksekusi",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "JavaScript",
  },
  {
    id: "rpl-20",
    question: "Apa itu prototype pollution di JavaScript dan mengapa hal ini merupakan kerentanan keamanan?",
    options: [
      "Teknik menambahkan properti pada prototype Object.prototype yang bisa mempengaruhi semua objek dan digunakan untuk serangan",
      "Proses normal JavaScript dalam menambahkan method ke prototype",
      "Bug internal di JavaScript engine V8 yang sudah diperbaiki",
      "Teknik untuk mengoptimasi performa dengan menambahkan properti ke prototype",
      "Cara menghapus seluruh prototype dari sebuah objek",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "JavaScript",
  },

  // ── TypeScript (rpl-21 ─ rpl-30) ────────────────────────────────────────
  {
    id: "rpl-21",
    question: "Apa fungsi utama type annotation di TypeScript?",
    options: [
      "Mengkompresi ukuran file JavaScript",
      "Menentukan tipe data variabel, parameter, dan return value untuk deteksi error saat compile time",
      "Menambahkan komentar otomatis pada kode",
      "Mengubah semua variabel menjadi konstanta",
      "Mengaktifkan mode debug pada kode",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "TypeScript",
  },
  {
    id: "rpl-22",
    question: "Bagaimana cara mendeklarasikan sebuah interface di TypeScript?",
    options: [
      "type NamaInterface { properti: tipe }",
      "interface NamaInterface { properti: tipe }",
      "class NamaInterface { properti: tipe }",
      "struct NamaInterface { properti: tipe }",
      "enum NamaInterface { properti: tipe }",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "TypeScript",
  },
  {
    id: "rpl-23",
    question: "Apa perbedaan utama antara 'type' dan 'interface' di TypeScript?",
    options: [
      "Tidak ada perbedaan, keduanya bisa digunakan secara bergantian",
      "Interface tidak bisa di-extend, type bisa digunakan untuk union types dan lebih fleksibel",
      "Type tidak bisa digunakan untuk mendeklarasikan object, interface hanya untuk primitive",
      "Interface hanya bisa menyimpan satu properti, type bisa banyak",
      "Type hanya bisa digunakan di browser, interface hanya di Node.js",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "TypeScript",
  },
  {
    id: "rpl-24",
    question: "Apa fungsi generic types di TypeScript dan kapan menggunakannya?",
    options: [
      "Tipe yang hanya bisa menyimpan string dan angka",
      "Membuat fungsi, interface, atau class yang bekerja dengan berbagai tipe data secara fleksibel",
      "Tipe yang dibuat secara otomatis oleh TypeScript compiler",
      "Tipe yang hanya bisa digunakan di dalam fungsi async",
      "Tipe yang memaksa semua value menjadi tipe yang sama",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "TypeScript",
  },
  {
    id: "rpl-25",
    question: "Apa itu type assertion di TypeScript dan apa tujuannya?",
    options: [
      "Memaksa TypeScript untuk mengubah tipe data saat runtime",
      "Memberitahu TypeScript compiler tentang tipe data yang lebih spesifik dari apa yang bisa disimpulkan secara otomatis",
      "Membuat TypeScript mengabaikan semua error tipe",
      "Menambahkan tipe data baru yang tidak tersedia di TypeScript",
      "Menghapus semua tipe dari kode TypeScript",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "TypeScript",
  },
  {
    id: "rpl-26",
    question: "Apa itu mapped type di TypeScript dan bagaimana cara kerjanya?",
    options: [
      "Tipe yang hanya bisa digunakan untuk Map object",
      "Tipe yang dibuat dengan memodifikasi properti dari tipe yang sudah ada menggunakan loop key pada tipe tersebut",
      "Tipe yang menghubungkan dua file TypeScript",
      "Tipe yang hanya bisa menyimpan pasangan key-value",
      "Tipe yang otomatis mengubah semua properti menjadi optional",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "TypeScript",
  },
  {
    id: "rpl-27",
    question: "Apa itu conditional type di TypeScript dan bagaimana contoh penggunaannya?",
    options: [
      "Tipe yang hanya bisa digunakan di dalam blok if-else",
      "Tipe yang memilih tipe hasil berdasarkan kondisi type-level seperti T extends U ? X : Y",
      "Tipe yang hanya bisa menyimpan nilai boolean",
      "Tipe yang mengecek apakah variabel sudah dideklarasikan",
      "Tipe yang memaksa semua kondisi harus bernilai true",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "TypeScript",
  },
  {
    id: "rpl-28",
    question: "Apa perbedaan antara tipe 'unknown' dan 'any' di TypeScript, dan mengapa 'unknown' lebih disarankan?",
    options: [
      "Tidak ada perbedaan, keduanya bisa digunakan secara bergantian",
      "'unknown' lebih aman karena memaksa pengecekan tipe sebelum digunakan, 'any' mematikan semua pengecekan tipe",
      "'any' lebih aman karena memiliki lebih banyak validasi",
      "'unknown' hanya bisa digunakan di variabel global, 'any' di dalam fungsi",
      "'any' otomatis dikonversi ke tipe yang sesuai, 'unknown' tidak bisa dikonversi",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "TypeScript",
  },
  {
    id: "rpl-29",
    question: "Apa yang dimaksud dengan distributive conditional type di TypeScript?",
    options: [
      "Conditional type yang mendistribusikan properti ke semua objek di dalam array",
      "Conditional type yang diterapkan secara otomatis pada setiap anggota union type, menghasilkan union hasil",
      "Conditional type yang hanya bekerja pada type primitive",
      "Conditional type yang mendistribusikan nilai ke beberapa variabel sekaligus",
      "Conditional type yang menyebar (spread) ke seluruh properti object",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "TypeScript",
  },
  {
    id: "rpl-30",
    question: "Apa kegunaan template literal types di TypeScript dan bagaimana cara kerjanya?",
    options: [
      "Tipe yang hanya bisa menyimpan template string kosong",
      "Membuat tipe literal baru dengan mendeskripsikan pola string yang valid menggunakan sintaksis template literal",
      "Tipe yang hanya bisa digunakan untuk mendeklarasikan HTML templates",
      "Tipe yang otomatis mengisi variabel dengan string template",
      "Tipe yang hanya bisa digunakan di dalam tag template literals",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "TypeScript",
  },

  // ── React/Next.js (rpl-31 ─ rpl-40) ────────────────────────────────────
  {
    id: "rpl-31",
    question: "Apa fungsi utama hook useState di React?",
    options: [
      "Mengelola efek samping seperti fetching data",
      "Mengelola dan memperbarui state lokal di functional component",
      "Mengelola routing antar halaman",
      "Mengelola context global aplikasi",
      "Mengoptimasi performa rendering komponen",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "React/Next.js",
  },
  {
    id: "rpl-32",
    question: "Bagaimana cara mengimpor sebuah komponen React dari file lain dalam format ES Module?",
    options: [
      "require('./Komponen')",
      "import Komponen from './Komponen'",
      "load Komponen from './Komponen'",
      "include Komponen from './Komponen'",
      "fetch Komponen from './Komponen'",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "React/Next.js",
  },
  {
    id: "rpl-33",
    question: "Apa perbedaan utama antara state dan props di React?",
    options: [
      "State hanya bisa digunakan di class component, props di functional component",
      "State dimiliki dan dikelola oleh komponen itu sendiri dan bisa diubah, props dikirim dari parent dan bersifat read-only",
      "Props bisa diubah oleh komponen penerima, state tidak bisa diubah",
      "State hanya menyimpan data string, props bisa menyimpan semua tipe data",
      "Tidak ada perbedaan, keduanya berfungsi sama persis",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "React/Next.js",
  },
  {
    id: "rpl-34",
    question: "Kapan useEffect dijalankan di lifecycle React functional component?",
    options: [
      "Hanya saat komponen pertama kali dimount",
      "Setelah render, dan bisa dikonfigurasi dengan dependency array untuk menentukan kapan dijalankan ulang",
      "Sebelum komponen di-mount ke DOM",
      "Hanya saat komponen di-unmount",
      "Hanya saat state berubah tanpa melihat dependency array",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "React/Next.js",
  },
  {
    id: "rpl-35",
    question: "Bagaimana cara kerja Virtual DOM di React sehingga membuat UI lebih efisien?",
    options: [
      "React mengubah DOM secara langsung tanpa perantara",
      "React membandingkan Virtual DOM baru dengan yang sebelumnya menggunakan diffing algorithm, lalu hanya memperbarui bagian DOM yang benar-benar berubah",
      "React membuat salinan DOM di memori setiap kali ada perubahan data",
      "Virtual DOM membuat semua komponen di-render ulang secara penuh",
      "React mengabaikan perubahan kecil dan hanya memperbarui komponen utama",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "React/Next.js",
  },
  {
    id: "rpl-36",
    question: "Apa tujuan penggunaan React.memo() pada sebuah komponen?",
    options: [
      "Untuk menambahkan komentar pada kode React",
      "Untuk mencegah re-render yang tidak perlu dengan meng-cache hasil render berdasarkan props",
      "Untuk menghapus state dari komponen secara permanen",
      "Untuk mengoptimasi bundle size dengan menghapus kode yang tidak terpakai",
      "Untuk membuat komponen bisa diakses dari luar komponen",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "React/Next.js",
  },
  {
    id: "rpl-37",
    question: "Apa itu React Context dan kapan sebaiknya menggunakannya?",
    options: [
      "API yang hanya tersedia di React Native untuk mengakses hardware",
      "Cara membagikan data (state, tema, bahasa) ke komponen dalam tree tanpa harus meneruskan props secara manual di setiap level",
      "Fitur untuk menyimpan data di localStorage browser",
      "Cara untuk membuat komponen baru dari komponen yang sudah ada",
      "Sistem routing built-in React untuk navigasi halaman",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "React/Next.js",
  },
  {
    id: "rpl-38",
    question: "Apa perbedaan utama antara Server-Side Rendering (SSR) dan Client-Side Rendering (CSR) di Next.js?",
    options: [
      "SSR menggunakan JavaScript, CSR menggunakan HTML",
      "SSR merender halaman di server setiap request, CSR merender halaman di browser setelah JavaScript dimuat",
      "CSR hanya bisa digunakan di mobile, SSR untuk desktop",
      "SSR tidak mendukung dynamic data, CSR mendukung",
      "Tidak ada perbedaan dalam hal performa",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "React/Next.js",
  },
  {
    id: "rpl-39",
    question: "Apa itu React Server Components (RSC) di Next.js 13+ dan bagaimana cara kerjanya?",
    options: [
      "Komponen yang hanya bisa digunakan di server Express.js",
      "Komponen yang dijalankan dan dirender di server, mengurangi bundle JavaScript yang dikirim ke client",
      "Komponen yang menggunakan WebSocket untuk komunikasi real-time",
      "Komponen yang bisa mengakses file system di client",
      "Komponen yang dibuat khusus untuk virtualisasi list panjang",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "React/Next.js",
  },
  {
    id: "rpl-40",
    question: "Manakah strategi yang paling efektif untuk mengoptimasi performance aplikasi Next.js yang memiliki banyak halaman gambar?",
    options: [
      "Gunakan tag <img> HTML biasa untuk semua gambar",
      "Gunakan komponen Image dari Next.js yang mendukung lazy loading, responsive images, dan optimasi format otomatis",
      "Kompres semua gambar secara manual lalu upload langsung ke public folder",
      "Gunakan CSS background-image untuk menampilkan semua gambar",
      "Muat semua gambar sekaligus di awal menggunakan array iterasi",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "React/Next.js",
  },

  // ── Node.js (rpl-41 ─ rpl-50) ───────────────────────────────────────────
  {
    id: "rpl-41",
    question: "Apa fungsi module.exports di Node.js?",
    options: [
      "Menghapus modul dari cache",
      "Mengekspor fungsi, objek, atau variabel agar bisa digunakan di file lain dengan require atau import",
      "Mengimpor modul dari package eksternal",
      "Mengompresi modul agar lebih ringan",
      "Menjalankan modul secara otomatis saat server dimulai",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Node.js",
  },
  {
    id: "rpl-42",
    question: "Perintah apa yang digunakan untuk menginstall sebuah package dari npm ke dalam project Node.js?",
    options: [
      "node install nama-package",
      "npm install nama-package",
      "npm start nama-package",
      "node add nama-package",
      "npm get nama-package",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Node.js",
  },
  {
    id: "rpl-43",
    question: "Apa itu EventEmitter di Node.js dan bagaimana cara kerjanya?",
    options: [
      "Class untuk mengirim email dari server",
      "Class yang memungkinkan pembuatan dan penanganan custom events dengan metode .on() untuk listen dan .emit() untuk memicu event",
      "Modul untuk mengirim data ke database",
      "Fungsi untuk membuat HTTP request",
      "Modul untuk mengelola file di file system",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Node.js",
  },
  {
    id: "rpl-44",
    question: "Apa perbedaan antara process.nextTick() dan setImmediate() di Node.js?",
    options: [
      "Tidak ada perbedaan, keduanya menjalankan callback secara synchronous",
      "process.nextTick() menjalankan callback sebelum fase I/O, setImmediate() menjalankan setelah fase I/O dalam event loop",
      "setImmediate() hanya bisa digunakan di Windows, process.nextTick() di semua OS",
      "process.nextTick() menjalankan callback secara asynchronous, setImmediate() secara synchronous",
      "Keduanya hanya bisa digunakan di dalam modul http",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Node.js",
  },
  {
    id: "rpl-45",
    question: "Apa itu middleware di Express.js dan apa peran utamanya dalam request handling?",
    options: [
      "Fungsi yang hanya digunakan untuk logging request ke console",
      "Fungsi yang dijalankan sebelum request handler utama, bisa melakukan validasi, autentikasi, atau transformasi request",
      "Fungsi yang hanya bisa dijalankan setelah response dikirim ke client",
      "Komponen React yang digunakan di server",
      "Fungsi yang digunakan untuk membuat database connection",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Node.js",
  },
  {
    id: "rpl-46",
    question: "Apa fungsi cluster module di Node.js dan kapan sebaiknya menggunakannya?",
    options: [
      "Untuk mengelola database connection pooling",
      "Untuk membuat child process yang menjalankan instance aplikasi Node.js secara paralel di beberapa CPU core",
      "Untuk mengelola multiple npm package sekaligus",
      "Untuk membuat file backup dari project",
      "Untuk mengelola environment variables",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Node.js",
  },
  {
    id: "rpl-47",
    question: "Bagaimana event loop di Node.js menangani operasi I/O asinkron seperti pembacaan file?",
    options: [
      "Node.js menggunakan thread pool di belakang layar untuk menjalankan operasi I/O, lalu callback dikembalikan ke event loop saat selesai",
      "Semua operasi I/O dijalankan secara synchronous di Node.js",
      "Node.js menghentikan seluruh event loop saat operasi I/O berjalan",
      "Operasi I/O hanya ditangani oleh libuv di Linux",
      "Node.js membuat thread baru untuk setiap operasi I/O tanpa menggunakan event loop",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Node.js",
  },
  {
    id: "rpl-48",
    question: "Apa itu stream di Node.js dan mengapa stream penting untuk menangani data dalam jumlah besar?",
    options: [
      "Fitur untuk melakukan streaming video langsung di Node.js",
      "Mekanisme untuk membaca atau menulis data secara bertahap tanpa memuat seluruh data ke dalam memori sekaligus",
      "Fungsi untuk mengirim data ke client menggunakan WebSocket",
      "Modul untuk mengelola database stream",
      "Cara untuk menampilkan animasi di browser menggunakan Node.js",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Node.js",
  },
  {
    id: "rpl-49",
    question: "Apa itu Worker Threads di Node.js dan apa keunggulannya dibandingkan menggunakan child_process?",
    options: [
      "Worker Threads hanya bisa menjalankan kode Python",
      "Worker Threads bisa menjalankan JavaScript secara paralel dan berbagi memori dengan thread utama, sedangkan child_process membuat proses terpisah dengan overhead lebih besar",
      "Worker Threads hanya tersedia untuk file handling",
      "Worker Threads sama persis dengan child_process dalam hal performa",
      "Worker Threads digunakan untuk menggantikan event loop",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Node.js",
  },
  {
    id: "rpl-50",
    question: "Manakah strategi yang paling efektif untuk mengoptimasi performa aplikasi Node.js yang menerima banyak request bersamaan?",
    options: [
      "Gunakan callback sebanyak mungkin untuk setiap operasi",
      "Gunakan caching untuk data yang jarang berubah, connection pooling untuk database, dan non-blocking I/O untuk semua operasi",
      "Gunakan synchronous code agar tidak ada race condition",
      "Tambahkan lebih banyak variabel global agar data mudah diakses",
      "Hapus semua log untuk mengurangi overhead",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Node.js",
  },

  // ── Python (rpl-51 ─ rpl-60) ────────────────────────────────────────────
  {
    id: "rpl-51",
    question: "Apa keyword yang digunakan untuk mendeklarasikan sebuah fungsi di Python?",
    options: ["function", "def", "func", "fun", "define"],
    correct: 1,
    difficulty: "basic",
    skill: "Python",
  },
  {
    id: "rpl-52",
    question: "Bagaimana cara mendeklarasikan sebuah list kosong di Python?",
    options: ["list();", "[];", "var list = [];", "list = {};", "list = tuple()"],
    correct: 1,
    difficulty: "basic",
    skill: "Python",
  },
  {
    id: "rpl-53",
    question: "Apa perbedaan utama antara list dan tuple di Python?",
    options: [
      "List hanya bisa menyimpan angka, tuple bisa menyimpan semua tipe data",
      "List bersifat mutable (bisa diubah setelah dibuat), tuple bersifat immutable (tidak bisa diubah)",
      "Tuple lebih cepat dibuat dari list",
      "List menggunakan kurung siku [], tuple menggunakan kurung biasa ()",
      "Tidak ada perbedaan, keduanya bisa digunakan secara bergantian",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Python",
  },
  {
    id: "rpl-54",
    question: "Apa itu list comprehension di Python dan apa manfaat utamanya?",
    options: [
      "Fitur untuk mengompresi list agar lebih kecil ukurannya",
      "Cara pendek dan elegan untuk membuat list baru berdasarkan ekspresi dengan sintaks [ekspresi for item in iterable if kondisi]",
      "Fungsi untuk membuat list dari dictionary",
      "Modul untuk mengurutkan list secara otomatis",
      "Cara untuk menghapus elemen dari list",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Python",
  },
  {
    id: "rpl-55",
    question: "Apa itu virtual environment di Python dan mengapa penting untuk digunakan dalam project?",
    options: [
      "Fitur bawaan Python untuk mengenkripsi kode",
      "Isolated environment yang memisahkan dependency project dari system-wide packages, mencegah konflik versi antar project",
      "Tipe data baru yang hanya bisa menyimpan environment variables",
      "Cara untuk menjalankan Python di dalam Docker container",
      "Modul untuk mengelola file system di Python",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Python",
  },
  {
    id: "rpl-56",
    question: "Apa itu decorator di Python dan bagaimana cara kerjanya?",
    options: [
      "Fungsi yang digunakan untuk menambahkan dekorasi visual pada output",
      "Fungsi yang menerima fungsi lain sebagai argumen dan mengembalikan fungsi baru dengan perilaku yang dimodifikasi",
      "Fungsi yang hanya bisa digunakan pada class",
      "Modul untuk mengubah tampilan terminal",
      "Tipe data untuk menyimpan konfigurasi visual",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Python",
  },
  {
    id: "rpl-57",
    question: "Apa itu generator di Python dan bagaimana cara menggunakannya?",
    options: [
      "Fungsi yang membuat file baru secara otomatis",
      "Fungsi yang menggunakan yield untuk menghasilkan nilai secara bertahap tanpa memuat seluruh data ke dalam memori sekaligus",
      "Fungsi yang hanya bisa menghasilkan angka random",
      "Fungsi yang membuat objek baru dari class",
      "Fungsi yang hanya bisa digunakan dalam loop",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Python",
  },
  {
    id: "rpl-58",
    question: "Apa perbedaan antara *args dan **kwargs di Python?",
    options: [
      "Tidak ada perbedaan, keduanya berfungsi sama",
      "*args menerima parameter positional sebagai tuple, **kwargs menerima parameter keyword sebagai dictionary",
      "*args hanya bisa menyimpan string, **kwargs hanya menyimpan angka",
      "*args digunakan untuk class, **kwargs untuk fungsi",
      "*args otomatis mengkonversi tipe data, **kwargs tidak",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Python",
  },
  {
    id: "rpl-59",
    question: "Apa itu metaclass di Python dan apa peran utamanya?",
    options: [
      "Class yang hanya bisa digunakan untuk inheritance",
      "Class yang mendefinisikan bagaimana class lain dibuat, memungkinkan modifikasi perilaku class saat pembuatan",
      "Class yang digunakan untuk mengelola database connection",
      "Class yang hanya tersedia di Python 2",
      "Class yang berfungsi sebagai interface",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Python",
  },
  {
    id: "rpl-60",
    question: "Apa itu GIL (Global Interpreter Lock) di Python dan bagaimana dampaknya terhadap multithreading?",
    options: [
      "Fitur untuk mengunci seluruh interpreter agar tidak bisa dieksekusi",
      "Mekanisme yang membatasi hanya satu thread yang bisa menjalankan bytecode Python pada satu waktu, mengurangi efektivitas multithreading untuk CPU-bound tasks",
      "Alat debugging untuk menemukan error di kode Python",
      "Modul untuk mengelola lock di database",
      "Fitur untuk mengenkripsi semua thread yang berjalan",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Python",
  },

  // ── SQL/Database (rpl-61 ─ rpl-70) ─────────────────────────────────────
  {
    id: "rpl-61",
    question: "Apa fungsi utama perintah SELECT dalam SQL?",
    options: [
      "Membuat tabel baru di database",
      "Mengambil dan menampilkan data dari satu atau lebih tabel",
      "Menghapus data dari tabel",
      "Memodifikasi struktur tabel",
      "Membuat user baru di database",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "SQL/Database",
  },
  {
    id: "rpl-62",
    question: "Perintah SQL apa yang digunakan untuk membuat tabel baru di dalam database?",
    options: [
      "INSERT TABLE nama_tabel",
      "CREATE TABLE nama_tabel",
      "NEW TABLE nama_tabel",
      "MAKE TABLE nama_tabel",
      "BUILD TABLE nama_tabel",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "SQL/Database",
  },
  {
    id: "rpl-63",
    question: "Apa perbedaan antara klausa WHERE dan HAVING dalam SQL?",
    options: [
      "WHERE digunakan untuk mengurutkan data, HAVING untuk memfilter data",
      "WHERE memfilter baris sebelum aggregasi, HAVING memfilter hasil aggregasi (group)",
      "WHERE hanya bisa digunakan dengan SELECT, HAVING dengan UPDATE",
      "WHERE mendukung semua operator, HAVING hanya mendukung operator sama dengan",
      "Tidak ada perbedaan, keduanya bisa digunakan secara bergantian",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "SQL/Database",
  },
  {
    id: "rpl-64",
    question: "Apa fungsi utama perintah JOIN dalam SQL dan kapan menggunakannya?",
    options: [
      "Untuk menggabungkan kolom dari satu tabel saja",
      "Untuk menggabungkan baris dari dua atau lebih tabel berdasarkan kolom yang berelasi",
      "Untuk menghapus data dari beberapa tabel sekaligus",
      "Untuk membuat tabel baru dari hasil query",
      "Untuk mengurutkan data dari beberapa tabel",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "SQL/Database",
  },
  {
    id: "rpl-65",
    question: "Apa itu primary key dalam database relasional dan apa fungsinya?",
    options: [
      "Kolom yang bisa berisi nilai NULL untuk menandai data kosong",
      "Kolom atau kombinasi kolom yang memastikan setiap baris dalam tabel memiliki nilai unik dan tidak boleh NULL",
      "Kolom yang hanya bisa menyimpan tipe data string",
      "Kolom yang digunakan untuk menyimpan password user",
      "Kolom yang otomatis terisi angka acak",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "SQL/Database",
  },
  {
    id: "rpl-66",
    question: "Apa fungsi index di database dan bagaimana cara kerjanya dalam mempercepat query?",
    options: [
      "Index digunakan untuk mengenkripsi data di tabel",
      "Index membuat struktur data khusus (biasanya B-Tree) yang mempercepat pencarian data dengan mengurangi jumlah baris yang harus dibaca",
      "Index digunakan untuk menggabungkan beberapa tabel menjadi satu",
      "Index berfungsi sebagai backup otomatis dari data",
      "Index hanya bisa dibuat pada kolom primary key",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "SQL/Database",
  },
  {
    id: "rpl-67",
    question: "Apa perbedaan antara INNER JOIN, LEFT JOIN, dan RIGHT JOIN dalam SQL?",
    options: [
      "INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel, LEFT JOIN mengembalikan semua baris dari tabel kiri dan yang cocok dari tabel kanan, RIGHT JOIN kebalikannya",
      "INNER JOIN lebih cepat dari LEFT JOIN",
      "LEFT JOIN mengembalikan semua baris dari kedua tabel",
      "RIGHT JOIN hanya bisa digunakan dengan dua tabel",
      "Ketiga JOIN tersebut memiliki fungsi yang sama persis",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "SQL/Database",
  },
  {
    id: "rpl-68",
    question: "Apa itu database normalization dan apa tujuan utamanya dalam desain database?",
    options: [
      "Proses menghapus semua data duplikat dari database secara permanen",
      "Teknik memecah tabel besar menjadi tabel-tabel lebih kecil dan terhubung untuk mengurangi duplikasi data dan meningkatkan integritas data",
      "Proses menambahkan lebih banyak kolom ke tabel",
      "Cara untuk mengubah database dari SQL ke NoSQL",
      "Teknik untuk mengompresi ukuran database",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "SQL/Database",
  },
  {
    id: "rpl-69",
    question: "Apa itu transaction dalam database dan mengapa transaksi penting untuk menjaga integritas data?",
    options: [
      "Fitur untuk mengirim notifikasi ke user saat data berubah",
      "Kumpulan operasi database yang dijalankan sebagai satu unit atomik, dijamin semua berhasil atau semua gagal untuk menjaga konsistensi data",
      "Fungsi untuk membuat backup database secara otomatis",
      "Cara untuk mengurutkan data dalam tabel",
      "Modul untuk mengelola user permissions",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "SQL/Database",
  },
  {
    id: "rpl-70",
    question: "Apa yang dimaksud dengan prinsip ACID di database dan apa singkatan dari masing-masing komponennya?",
    options: [
      "Authentication, Connection, Identification, Database",
      "Atomicity (operasi tidak bisa dibagi), Consistency (data valid), Isolation (transaksi tidak mengganggu satu sama lain), Durability (data tersimpan permanen setelah commit)",
      "Access, Control, Index, Data",
      "Add, Check, Insert, Delete",
      "Asynchronous, Concurrent, Independent, Distributed",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "SQL/Database",
  },

  // ── Git (rpl-71 ─ rpl-80) ───────────────────────────────────────────────
  {
    id: "rpl-71",
    question: "Apa fungsi utama perintah 'git clone' di Git?",
    options: [
      "Membuat branch baru dari branch yang sedang aktif",
      "Membuat salinan lengkap dari repository remote ke komputer lokal",
      "Menggabungkan dua branch menjadi satu",
      "Menghapus repository dari remote",
      "Melihat perbedaan antara dua commit",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Git",
  },
  {
    id: "rpl-72",
    question: "Bagaimana cara melakukan commit perubahan di Git dengan pesan commit?",
    options: [
      "git save -m 'pesan'",
      "git commit -m 'pesan'",
      "git push -m 'pesan'",
      "git log -m 'pesan'",
      "git add -m 'pesan'",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Git",
  },
  {
    id: "rpl-73",
    question: "Apa perbedaan antara 'git pull' dan 'git fetch' di Git?",
    options: [
      "git pull hanya bisa digunakan di GitHub, git fetch di GitLab",
      "git fetch hanya mengambil perubahan dari remote tanpa menggabungkan, git pull mengambil dan langsung menggabungkan ke branch lokal",
      "git pull menghapus branch remote, git fetch membuat branch baru",
      "git fetch lebih cepat dari git pull",
      "Keduanya memiliki fungsi yang sama persis",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Git",
  },
  {
    id: "rpl-74",
    question: "Apa fungsi perintah 'git branch' di Git?",
    options: [
      "Menghapus branch yang sudah tidak digunakan",
      "Membuat branch baru, atau melihat daftar branch yang ada di repository lokal",
      "Menggabungkan dua branch menjadi satu",
      "Menampilkan history commit dari branch tertentu",
      "Mengatur remote repository",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Git",
  },
  {
    id: "rpl-75",
    question: "Bagaimana cara menggabungkan branch 'feature-login' ke branch 'main' di Git?",
    options: [
      "git rebase feature-login main",
      "git merge feature-login (saat branch 'main' sedang aktif)",
      "git push feature-login main",
      "git add feature-login main",
      "git checkout feature-login main",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Git",
  },
  {
    id: "rpl-76",
    question: "Apa yang dilakukan 'git rebase' dan apa perbedaannya dengan 'git merge'?",
    options: [
      "git rebase menggabungkan branch dengan membuat merge commit, sedangkan git merge mengubah history",
      "git rebase mengambil commit dari branch lain dan menempatkannya di atas branch saat ini tanpa membuat merge commit, sedangkan git merge membuat merge commit",
      "git rebase hanya bisa digunakan untuk repository kosong",
      "git merge menghapus history, git rebase mempertahankannya",
      "Keduanya memiliki hasil yang sama persis tanpa perbedaan",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Git",
  },
  {
    id: "rpl-77",
    question: "Apa itu 'git stash' dan kapan sebaiknya menggunakannya?",
    options: [
      "Fitur untuk menghapus semua perubahan secara permanen",
      "Menyimpan perubahan yang belum di-commit secara sementara agar bisa beralih branch tanpa kehilangan pekerjaan",
      "Cara untuk mengunci repository agar tidak bisa diubah",
      "Perintah untuk menghapus stash yang sudah tidak dibutuhkan",
      "Fitur untuk membuat backup branch",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Git",
  },
  {
    id: "rpl-78",
    question: "Apa fungsi 'git cherry-pick' dan bagaimana cara menggunakannya?",
    options: [
      "Untuk menghapus commit tertentu dari branch",
      "Untuk mengambil commit tertentu dari branch lain dan menerapkannya ke branch saat ini tanpa menggabungkan seluruh branch",
      "Untuk membuat salinan repository",
      "Untuk mengurutkan commit berdasarkan waktu",
      "Untuk menandai commit sebagai penting",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Git",
  },
  {
    id: "rpl-79",
    question: "Bagaimana cara yang benar untuk menyelesaikan merge conflict di Git?",
    options: [
      "Gunakan 'git reset --hard' untuk menghapus semua perubahan yang konflik",
      "Edit file yang mengalami konflik untuk menyelesaikan perbedaan, lalu stage file yang sudah diperbaiki dan buat commit",
      "Hapus branch yang menyebabkan konflik lalu buat branch baru",
      "Gunakan 'git push --force' untuk menimpa perubahan",
      "Tutup terminal dan buka repository baru",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Git",
  },
  {
    id: "rpl-80",
    question: "Apa fungsi 'git bisect' dan bagaimana cara kerjanya?",
    options: [
      "Untuk membandingkan ukuran file di antara commit",
      "Melakukan binary search secara otomatis di antara commit untuk menemukan commit yang memperkenalkan bug",
      "Untuk membagi repository menjadi beberapa bagian",
      "Untuk memotong branch menjadi beberapa commit kecil",
      "Untuk memeriksa integritas repository",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Git",
  },

  // ── Docker (rpl-81 ─ rpl-90) ────────────────────────────────────────────
  {
    id: "rpl-81",
    question: "Apa fungsi utama Dockerfile dalam ekosistem Docker?",
    options: [
      "Mengelola jaringan antar container",
      "Mendefinisikan instruksi dan konfigurasi untuk membangun sebuah Docker image secara otomatis",
      "Menjalankan container di production",
      "Mengelola volume data di container",
      "Mengatur akses user ke Docker Hub",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Docker",
  },
  {
    id: "rpl-82",
    question: "Perintah apa yang digunakan untuk membangun Docker image dari Dockerfile?",
    options: [
      "docker create -t nama-image .",
      "docker build -t nama-image .",
      "docker make -t nama-image .",
      "docker run -t nama-image .",
      "docker start -t nama-image .",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Docker",
  },
  {
    id: "rpl-83",
    question: "Apa fungsi Docker Compose dan kapan sebaiknya menggunakannya?",
    options: [
      "Untuk menginstall Docker di komputer lokal",
      "Untuk mendefinisi dan menjalankan aplikasi multi-container dengan satu perintah menggunakan file YAML konfigurasi",
      "Untuk mengompresi image Docker agar lebih kecil",
      "Untuk mengelola single container secara manual",
      "Untuk membuat Dockerfile secara otomatis",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Docker",
  },
  {
    id: "rpl-84",
    question: "Apa perbedaan antara Docker image dan Docker container?",
    options: [
      "Image dan container memiliki fungsi yang sama persis",
      "Image adalah template/read-only yang berisi instruksi untuk membuat container, container adalah instance yang sedang berjalan dari image",
      "Container bisa dijalankan tanpa image",
      "Image hanya bisa dibuat dari Docker Hub, container dari file lokal",
      "Container bersifat read-only, image bersifat mutable",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Docker",
  },
  {
    id: "rpl-85",
    question: "Bagaimana cara menjalankan Docker container dari image dan membuka port 3000 di container ke port 8080 di host?",
    options: [
      "docker run -p 8080:3000 nama-image",
      "docker start -p 3000:8080 nama-image",
      "docker run -p 3000:8080 nama-image",
      "docker run --port 8080:3000 nama-image",
      "docker create -p 8080:3000 nama-image",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Docker",
  },
  {
    id: "rpl-86",
    question: "Apa itu multi-stage build di Docker dan apa keuntungannya?",
    options: [
      "Cara untuk menjalankan container dalam beberapa tahap secara manual",
      "Teknik menggunakan beberapa FROM dalam satu Dockerfile untuk membangun dan mengompresi aplikasi, menghasilkan image production yang jauh lebih kecil",
      "Fitur untuk menjalankan beberapa container dalam satu image",
      "Cara untuk membuat backup image dalam beberapa tahap",
      "Teknik untuk menggabungkan beberapa Dockerfile menjadi satu",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Docker",
  },
  {
    id: "rpl-87",
    question: "Apa itu Docker volume dan mengapa digunakan daripada menyimpan data di dalam container?",
    options: [
      "Volume adalah fitur untuk mempercepat akses ke container",
      "Volume menyimpan data secara persisten di luar container, sehingga data tidak hilang saat container dihentikan atau dihapus",
      "Volume hanya bisa digunakan dengan Docker Compose",
      "Volume berfungsi untuk mengenkripsi data di container",
      "Volume mengurangi ukuran Docker image secara otomatis",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Docker",
  },
  {
    id: "rpl-88",
    question: "Apa fungsi Docker network dan bagaimana cara containers berkomunikasi satu sama lain?",
    options: [
      "Docker network hanya digunakan untuk menghubungkan container dengan internet",
      "Docker network memungkinkan containers berkomunikasi satu sama lain menggunakan nama service sebagai hostname dalam network yang sama",
      "Docker network berfungsi untuk mengenkripsi komunikasi antar container",
      "Docker network hanya tersedia di Docker Desktop",
      "Docker network otomatis membuat container bisa diakses dari luar jaringan",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Docker",
  },
  {
    id: "rpl-89",
    question: "Bagaimana cara mengoptimasi ukuran Docker image agar lebih kecil untuk production?",
    options: [
      "Gunakan base image yang besar agar lebih banyak fitur yang tersedia",
      "Gunakan base image minimal seperti alpine, manfaatkan multi-stage build, dan buat .dockerignore untuk mengecualikan file tidak perlu",
      "Kompres Dockerfile agar lebih ringan",
      "Gunakan semua perintah RUN dalam satu baris tanpa memperhatikan layer caching",
      "Hapus semua dependency agar image sekecil mungkin",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Docker",
  },
  {
    id: "rpl-90",
    question: "Apa itu Docker layer caching dan bagaimana cara kerjanya mempercepat proses build?",
    options: [
      "Fitur untuk menyimpan cache di browser saat mengakses aplikasi Docker",
      "Mekanisme yang menyimpan setiap layer (instruksi) Dockerfile secara terpisah, sehingga layer yang tidak berubah tidak perlu dibangun ulang saat rebuild image",
      "Cara untuk mengompresi semua layer menjadi satu layer",
      "Fitur untuk menyimpan log build di folder khusus",
      "Mekanisme untuk menyinkronkan layer antar komputer",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Docker",
  },

  // ── REST API (rpl-91 ─ rpl-100) ────────────────────────────────────────
  {
    id: "rpl-91",
    question: "Apa fungsi dari metode HTTP GET dalam sebuah REST API?",
    options: [
      "Membuat data baru di server",
      "Mengambil atau membaca data dari resource di server",
      "Memperbarui data yang sudah ada di server",
      "Menghapus data dari server",
      "Mengganti seluruh data di server",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "REST API",
  },
  {
    id: "rpl-92",
    question: "Apa yang dimaksud dengan REST API dalam konteks pengembangan web?",
    options: [
      "Database yang digunakan untuk menyimpan data secara terdistribusi",
      "Arsitektur interface untuk komunikasi antara client dan server menggunakan protokol HTTP dengan resource yang diakses melalui URL",
      "Bahasa pemrograman untuk membuat frontend",
      "Sistem operasi khusus untuk server",
      "Framework CSS untuk membuat tampilan API",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "REST API",
  },
  {
    id: "rpl-93",
    question: "Apa perbedaan antara metode HTTP PUT dan PATCH dalam REST API?",
    options: [
      "PUT mengganti seluruh resource dengan data baru, PATCH hanya memperbarui sebagian field dari resource yang sudah ada",
      "PUT hanya bisa digunakan untuk data string, PATCH untuk semua tipe data",
      "PUT menghapus resource, PATCH membuat resource baru",
      "PUT lebih cepat dari PATCH",
      "PATCH bisa mengubah URL resource, PUT tidak bisa",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "REST API",
  },
  {
    id: "rpl-94",
    question: "Apa arti HTTP status code 404 dalam response REST API?",
    options: [
      "Request berhasil dan data dikembalikan",
      "Terjadi error di server saat memproses request",
      "Resource yang diminta tidak ditemukan di server",
      "User tidak memiliki akses ke resource",
      "Request terlalu besar untuk diproses",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "REST API",
  },
  {
    id: "rpl-95",
    question: "Apa format data yang paling umum digunakan untuk pertukaran data dalam REST API?",
    options: [
      "XML",
      "JSON (JavaScript Object Notation)",
      "CSV",
      "YAML",
      "HTML",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "REST API",
  },
  {
    id: "rpl-96",
    question: "Apa itu authentication dalam REST API dan apa perbedaannya dengan authorization?",
    options: [
      "Authentication dan authorization memiliki fungsi yang sama",
      "Authentication memverifikasi identitas user (siapa Anda), authorization menentukan akses resource (apa yang boleh Anda lakukan)",
      "Authentication hanya digunakan untuk admin, authorization untuk semua user",
      "Authentication dilakukan di client, authorization di server",
      "Authentication hanya berlaku untuk GET request",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "REST API",
  },
  {
    id: "rpl-97",
    question: "Apa itu rate limiting dalam REST API dan mengapa penting untuk diterapkan?",
    options: [
      "Fitur untuk mempercepat response API",
      "Membatasi jumlah request yang bisa dikirim client dalam periode waktu tertentu untuk mencegah penyalahgunaan dan menjaga kestabilan server",
      "Cara untuk mengurangi ukuran response body",
      "Teknik untuk meng-cache response di browser",
      "Fitur untuk mengompresi request payload",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "REST API",
  },
  {
    id: "rpl-98",
    question: "Apa itu CORS (Cross-Origin Resource Sharing) di REST API dan mengapa diperlukan?",
    options: [
      "Teknik untuk mengenkripsi data antar server",
      "Mekanisme keamanan browser yang mengizinkan atau memblokir resource dari origin berbeda, diperlukan agar aplikasi di satu domain bisa mengakses API di domain lain",
      "Cara untuk mengompresi data agar lebih ringan",
      "Fitur untuk mengelola cache di browser",
      "Protokol untuk komunikasi WebSocket",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "REST API",
  },
  {
    id: "rpl-99",
    question: "Apa itu API versioning dan mengapa penting untuk diterapkan dalam REST API yang sudah digunakan di production?",
    options: [
      "Cara untuk mengubah URL API setiap kali ada perubahan kode",
      "Teknik untuk membuat beberapa versi API secara bersamaan agar perubahan tidak memecah client yang sudah ada, contohnya /api/v1/users dan /api/v2/users",
      "Fitur untuk menampilkan versi JavaScript yang digunakan",
      "Cara untuk menghapus versi lama dari server secara otomatis",
      "Teknik untuk mengganti format response dari JSON ke XML",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "REST API",
  },
  {
    id: "rpl-100",
    question: "Apa itu HATEOAS (Hypermedia as the Engine of Application State) dalam REST API dan apa manfaatnya?",
    options: [
      "Teknik kompresi data untuk mengurangi ukuran response",
      "Prinsip REST yang menambahkan link navigasi dalam response sehingga client bisa menjelajahi resource tanpa mengetahui URL secara hardcoded",
      "Protokol autentikasi baru untuk REST API",
      "Cara untuk membuat API documentation otomatis",
      "Teknik caching untuk mempercepat response",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "REST API",
  },
];

const dkvQuiz: QuizQuestion[] = [
  // ==========================================
  // 1. Figma (dkv-01 to dkv-10)
  // ==========================================
  {
    id: "dkv-01",
    question: "Apa yang dimaksud dengan 'Component' di Figma?",
    options: [
      "File yang belum disimpan",
      "Library berisi ikon-ikon bawaan Figma",
      "Elemen reusable yang dapat digunakan berulang kali dengan konsisten",
      "Efek visual pada layer tertentu",
      "Sistem pembagian proyek dengan tim",
    ],
    correct: 2,
    difficulty: "basic",
    skill: "Figma",
  },
  {
    id: "dkv-02",
    question: "Apa fungsi utama dari fitur 'Auto Layout' di Figma?",
    options: [
      "Membuat elemen otomatis mengatur posisi, ukuran, dan spacing di dalam frame",
      "Membuat animasi transisi antar frame",
      "Mengunci posisi elemen agar tidak bisa dipindahkan",
      "Mengubah warna elemen secara otomatis",
      "Membuat duplikat elemen secara otomatis",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "Figma",
  },
  {
    id: "dkv-03",
    question: "Fitur 'Variants' di Figma digunakan untuk?",
    options: [
      "Membuat backup file proyek",
      "Mengekspor file ke format PDF",
      "Menambahkan komentar pada desain",
      "Mengelola beberapa versi state dari sebuah komponen dalam satu bundle",
      "Mengatur permission akses tim",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "Figma",
  },
  {
    id: "dkv-04",
    question: "Apa kegunaan 'Constraints' dalam Figma?",
    options: [
      "Membatasi jumlah layer yang bisa dibuat",
      "Mengatur bagaimana elemen merespons perubahan ukuran parent frame",
      "Membatasi akses pengguna terhadap file tertentu",
      "Membatasi ukuran file proyek",
      "Membatasi resolusi gambar yang diimpor",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Figma",
  },
  {
    id: "dkv-05",
    question: "Perbedaan antara 'Instance' dan 'Master Component' di Figma adalah?",
    options: [
      "Instance adalah komponen utama, Master Component adalah salinannya",
      "Master Component hanya bisa dibuat di versi premium",
      "Instance adalah salinan dari Master Component yang tetap terhubung dengannya",
      "Tidak ada perbedaan, keduanya adalah hal yang sama",
      "Master Component tidak bisa dimodifikasi setelah dibuat",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Figma",
  },
  {
    id: "dkv-06",
    question: "Fungsi 'Dev Mode' di Figma dirancang untuk?",
    options: [
      "Mengedit kode sumber dari desain",
      "Memberikan spesifikasi desain seperti spacing, warna, dan kode untuk pengembang",
      "Membuat animasi CSS secara otomatis",
      "Mengompresi file desain agar lebih kecil",
      "Membuat repository Git dari desain",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Figma",
  },
  {
    id: "dkv-07",
    question: "Apa yang dimaksud dengan 'Branching' dalam Figma?",
    options: [
      "Fitur untuk membuat salinan kerja dari file utama agar bisa diedit secara paralel tanpa mengubah versi utama",
      "Membuat salinan file untuk diunduh",
      "Menggabungkan dua file menjadi satu",
      "Membuat versi cetak dari desain digital",
      "Membagi layar menjadi beberapa bagian",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Figma",
  },
  {
    id: "dkv-08",
    question: "Bagaimana cara membuat prototipe interaktif dengan 'Smart Animate' di Figma?",
    options: [
      "Menambahkan efek blur pada kedua frame",
      "Menggunakan plugin animasi pihak ketiga",
      "Mengubah format file menjadi GIF",
      "Membuat frame dengan nama yang sama pada layer yang berbeda lalu menghubungkannya dengan prototype connection",
      "Menambahkan keyframe pada timeline Figma",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Figma",
  },
  {
    id: "dkv-09",
    question: "Dalam Figma, 'Auto Layout' dengan properti 'Wrap' berfungsi untuk?",
    options: [
      "Membungkus teks agar tidak keluar dari frame",
      "Membungkus elemen ke baris baru jika tidak muat dalam satu baris",
      "Mengunci elemen agar tidak bisa di-wrap oleh designer lain",
      "Membuat efek bayangan melingkar",
      "Mengubah orientasi desain dari vertikal ke horizontal",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Figma",
  },
  {
    id: "dkv-10",
    question: "Bagaimana cara menghubungkan variabel desain (Design Tokens) dengan komponen di Figma menggunakan fitur 'Variables'?",
    options: [
      "Mengimpor file JSON ke dalam plugin Figma",
      "Membuat variabel warna, spacing, dan ukuran, lalu menghubungkannya ke properti komponen melalui mode collections",
      "Menggunakan panel CSS langsung di Figma",
      "Membuat style manual dengan menyalin kode warna",
      "Variabel hanya bisa digunakan untuk warna, bukan untuk spacing",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Figma",
  },

  // ==========================================
  // 2. Adobe Photoshop (dkv-11 to dkv-20)
  // ==========================================
  {
    id: "dkv-11",
    question: "Apa fungsi dari tool 'Magic Wand' di Adobe Photoshop?",
    options: [
      "Menggambar bentuk bebas dengan tangan",
      "Memilih area berdasarkan kesamaan warna",
      "Membuat teks pada gambar",
      "Menghapus background gambar",
      "Mengatur kecerahan gambar",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-12",
    question: "Format file apa yang mendukung transparansi dan biasa digunakan untuk logo di Photoshop?",
    options: [
      "JPEG (.jpg)",
      "BMP (.bmp)",
      "PNG (.png)",
      "TIFF (.tiff)",
      "GIF (.gif)",
    ],
    correct: 3,
    difficulty: "basic",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-13",
    question: "Apa perbedaan antara 'Layer Mask' dan 'Clipping Mask' di Photoshop?",
    options: [
      "Layer Mask menampilkan bagian layer tertentu menggunakan hitam-putih, Clipping Mask membuat satu layer mengikuti bentuk transparansi layer di bawahnya",
      "Keduanya memiliki fungsi yang sama persis",
      "Layer Mask hanya digunakan untuk teks, Clipping Mask untuk gambar",
      "Clipping Mask menghapus layer, Layer Mask menyimpannya",
      "Layer Mask berwarna putih, Clipping Mask berwarna hitam",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-14",
    question: "Fitur 'Smart Object' di Photoshop memungkinkan pengguna untuk?",
    options: [
      "Mengedit gambar secara langsung tanpa merusak kualitas asli",
      "Mengimpor video ke dalam proyek Photoshop",
      "Membuat animasi GIF dengan mudah",
      "Menghapus semua layer dalam satu klik",
      "Mengubah resolusi gambar menjadi lebih rendah",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-15",
    question: "Blend mode 'Multiply' di Photoshop berfungsi untuk?",
    options: [
      "Mencerahkan gambar dengan menggabungkan dua layer",
      "Menggelapkan gambar dengan mengalikan nilai warna kedua layer",
      "Membuat efek transparan pada gambar",
      "Menambahkan ketajaman pada gambar",
      "Membuat gambar menjadi monokrom",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-16",
    question: "Perbedaan antara 'Adjustment Layer' dan mengatur langsung melalui menu 'Image > Adjustments' adalah?",
    options: [
      "Adjustment Layer bersifat non-destruktif dan bisa dihapus kapan saja, sedangkan pengaturan langsung merusak pixel asli",
      "Tidak ada perbedaan, keduanya menghasilkan output yang sama persis",
      "Adjustment Layer hanya berfungsi di versi Photoshop tertentu",
      "Pengaturan langsung lebih cepat daripada Adjustment Layer",
      "Adjustment Layer hanya bisa digunakan untuk saturasi warna",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-17",
    question: "Dalam Photoshop, 'Channel Mixer' digunakan untuk?",
    options: [
      "Menggabungkan beberapa gambar menjadi satu",
      "Mengatur kontribusi masing-masing channel warna (RGB/CMYK) terhadap output gambar",
      "Mengubah format warna dari RGB ke grayscale",
      "Membuat efek blur pada gambar",
      "Mengatur opacity layer secara otomatis",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-18",
    question: "Apa fungsi dari 'Action' di Photoshop?",
    options: [
      "Membuat efek artistik pada gambar",
      "Merekam dan menjalankan serangkaian langkah editing secara otomatis untuk batch processing",
      "Mengedit metadata gambar",
      "Mengatur preferensi tampilan workspace",
      "Membuat watermark pada gambar",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-19",
    question: "Fitur 'Content-Aware Fill' di Photoshop bekerja dengan cara?",
    options: [
      "Menghapus seluruh gambar dan menggantinya dengan warna solid",
      "Menganalisis piksel di sekitar area seleksi dan mengisinya dengan konten yang sesuai secara cerdas",
      "Mengimpor gambar dari perpustakaan Adobe Stock",
      "Membuat seleksi berdasarkan bentuk geometris",
      "Mengubah ukuran gambar secara otomatis",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Adobe Photoshop",
  },
  {
    id: "dkv-20",
    question: "Dalam alur kerja Photoshop profesional, apa yang dimaksud dengan 'Non-Destructive Editing' dan bagaimana penerapannya?",
    options: [
      "Teknik editing yang menggunakan filter untuk mengubah gambar secara permanen",
      "Proses menyalin gambar ke clipboard sebelum diedit",
      "Pendekatan editing yang mempertahankan pixel asli menggunakan Smart Objects, Adjustment Layers, dan Layer Masks",
      "Menggunakan hanya layer background saat mengedit",
      "Teknik untuk menghapus semua history editing",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Adobe Photoshop",
  },

  // ==========================================
  // 3. Adobe Illustrator (dkv-21 to dkv-30)
  // ==========================================
  {
    id: "dkv-21",
    question: "Perbedaan utama antara gambar vektor dan raster di Illustrator adalah?",
    options: [
      "Gambar vektor menggunakan piksel, gambar raster menggunakan matematika",
      "Gambar vektor menggunakan persamaan matematika sehingga bisa di-skalakan tanpa kehilangan kualitas",
      "Gambar raster lebih cocok untuk cetak, gambar vektor untuk web",
      "Gambar vektor tidak bisa berwarna, gambar raster bisa berwarna",
      "Tidak ada perbedaan keduanya adalah format yang sama",
    ],
    correct: 3,
    difficulty: "basic",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-22",
    question: "Apa fungsi dari tool 'Pen Tool' di Adobe Illustrator?",
    options: [
      "Menggambar garis lurus saja",
      "Membuat path vektor dengan anchor point dan bezier curve secara presisi",
      "Mengisi warna pada bentuk yang sudah ada",
      "Menghapus objek yang dipilih",
      "Mengatur ukuran artboard",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-23",
    question: "Fitur 'Image Trace' di Illustrator berfungsi untuk?",
    options: [
      "Menambahkan watermark pada gambar raster",
      "Mengonversi gambar raster menjadi gambar vektor secara otomatis",
      "Mengubah ukuran gambar raster",
      "Menghapus background dari gambar raster",
      "Menggabungkan dua gambar raster",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-24",
    question: "Apa yang dimaksud dengan 'Compound Path' di Illustrator?",
    options: [
      "Dua atau lebih path yang digabungkan sehingga area tumpang tindih menjadi transparan (lubang)",
      "Garis yang menghubungkan dua objek",
      "Path yang sudah di-kunci dan tidak bisa diedit",
      "Semua objek dalam satu layer",
      "Path yang dibuat menggunakan mouse",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-25",
    question: "Apa fungsi dari panel 'Appearance' di Adobe Illustrator?",
    options: [
      "Mengatur ukuran dan orientasi artboard",
      "Mengelola dan mengedit multiple fill, stroke, dan efek pada satu objek dalam satu panel",
      "Menampilkan preview cetak dari desain",
      "Mengatur pengaturan koneksi printer",
      "Mengelola bookmark dokumen",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-26",
    question: "Teknik 'Clipping Mask' di Illustrator digunakan untuk?",
    options: [
      "Membatasi tampilan objek di atas agar hanya menampilkan area yang tertutup oleh objek di bawahnya",
      "Membuat objek menjadi lebih gelap",
      "Menggabungkan dua objek menjadi satu",
      "Membuat efek bayangan pada objek",
      "Mengatur urutan layer",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-27",
    question: "Fitur 'Mesh Gradient' di Illustrator memungkinkan designer untuk?",
    options: [
      "Membuat gradient dengan dua warna saja",
      "Menggabungkan dua gradient menjadi satu",
      "Membuat gradient hanya pada tepi objek",
      "Membuat gradient multi-warna yang kompleks dengan kontrol titik-titik kontrol di dalam area objek",
      "Mengubah gradient menjadi pola",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-28",
    question: "Apa perbedaan antara 'Artboard' dan 'Canvas' dalam konteks Illustrator?",
    options: [
      "Artboard adalah area kerja yang bisa diekspor, Canvas adalah area di luar artboard untuk menempatkan elemen sementara",
      "Canvas adalah area kerja yang bisa diekspor, Artboard adalah area di luar canvas",
      "Keduanya adalah istilah yang sama untuk area kerja",
      "Canvas hanya ada di versi Illustrator tertentu",
      "Artboard tidak bisa diekspor, Canvas bisa diekspor",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-29",
    question: "Dalam alur kerja Illustrator profesional, 'Global Swatch' berfungsi untuk?",
    options: [
      "Membuat warna yang hanya bisa digunakan sekali",
      "Mengunci warna agar tidak bisa diubah",
      "Mengatur warna yang jika diubah akan otomatis memperbarui semua objek yang menggunakannya di seluruh dokumen",
      "Mengekspor palet warna ke format lain",
      "Menghapus semua warna dari dokumen",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Adobe Illustrator",
  },
  {
    id: "dkv-30",
    question: "Apa yang dimaksud dengan 'Artboards' multiple dalam satu dokumen Illustrator dan bagaimana strategi penggunaannya untuk proyek multi-halaman?",
    options: [
      "Artboards multiple hanya untuk versi cetak, tidak untuk digital",
      "Artboards multiple memungkinkan beberapa halaman/ukuran dalam satu file, memudahkan manajemen aset untuk brosur, poster, dan media sosial dalam satu proyek",
      "Artboards multiple hanya bisa berukuran sama",
      "Artboards multiple tidak bisa diekspor secara terpisah",
      "Artboards multiple hanya bisa berisi teks, bukan gambar",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Adobe Illustrator",
  },

  // ==========================================
  // 4. UI/UX Design (dkv-31 to dkv-40)
  // ==========================================
  {
    id: "dkv-31",
    question: "Apa perbedaan utama antara UI (User Interface) dan UX (User Experience)?",
    options: [
      "UI fokus pada tampilan dan interaksi visual, UX fokus pada keseluruhan pengalaman dan kepuasan pengguna",
      "UI adalah proses riset pengguna, UX adalah tampilan visual aplikasi",
      "UI dan UX adalah hal yang sama",
      "UI hanya untuk mobile, UX hanya untuk desktop",
      "UX adalah bagian dari UI, UI lebih luas dari UX",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-32",
    question: "Apa yang dimaksud dengan 'User Persona' dalam desain UX?",
    options: [
      "Profil palsu yang dibuat untuk mengisi formulir registrasi",
      "Representasi fiksi dari pengguna ideal yang dibuat berdasarkan riset untuk memahami kebutuhan dan perilaku target audiens",
      "Foto profil yang digunakan di media sosial",
      "Template desain yang bisa langsung digunakan",
      "Jenis font yang digunakan dalam desain UI",
    ],
    correct: 2,
    difficulty: "basic",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-33",
    question: "Apa itu 'User Journey Map'?",
    options: [
      "Peta lokasi pengguna di seluruh dunia",
      "Visualisasi langkah-langkah yang dilalui pengguna saat berinteraksi dengan produk dari awal hingga tujuan tercapai",
      "Diagram arsitektur informasi website",
      "Jadwal rilis produk",
      "Peta kompetitor dalam industri",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-34",
    question: "Prinsip 'Fitts's Law' dalam UX Design menyatakan bahwa?",
    options: [
      "Ukuran elemen tidak mempengaruhi waktu pengguna menekan tombol",
      "Waktu untuk menjangkau target tergantung pada ukuran dan jarak target dari posisi saat ini",
      "Pengguna selalu lebih suka tombol kecil",
      "Jarak antar elemen tidak penting dalam desain",
      "Semua elemen harus memiliki ukuran yang sama",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-35",
    question: "Dalam UX Design, 'Wireframe' berfungsi untuk?",
    options: [
      "Menampilkan versi akhir desain dengan warna dan detail visual",
      "Membuat cetak biru layout halaman yang menunjukkan struktur dan hierarki elemen tanpa detail visual",
      "Membuat animasi transisi antar halaman",
      "Mengkodekan halaman web",
      "Membuat presentasi klien",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-36",
    question: "Prinsip 'Hick's Law' dalam UX Design menjelaskan bahwa?",
    options: [
      "Semakin banyak pilihan yang tersedia, semakin lama waktu pengguna untuk mengambil keputusan",
      "Warna-warna cerah selalu lebih baik untuk pengguna",
      "Teks harus selalu berukuran besar",
      "Animasi harus selalu ditambahkan dalam desain",
      "Pengguna tidak menyukai perubahan",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-37",
    question: "Apa yang dimaksud dengan 'Usability Testing' dan bagaimana metode pelaksanaannya?",
    options: [
      "Menguji kecepatan server website",
      "Mengobservasi pengguna nyata saat menyelesaikan tugas-tugas tertentu pada produk untuk mengidentifikasi masalah kegunaan",
      "Menguji kompatibilitas browser",
      "Mengukur jumlah unduhan aplikasi",
      "Menguji kekuatan infrastruktur IT",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-38",
    question: "Apa perbedaan antara 'Responsive Design' dan 'Adaptive Design' dalam UI/UX?",
    options: [
      "Responsive menggunakan fluid grid yang berubah secara dinamis, Adaptive menggunakan beberapa layout khusus untuk ukuran layar tertentu",
      "Responsive menggunakan breakpoint tetap, Adaptive menggunakan fluid layout",
      "Responsive hanya untuk desktop, Adaptive hanya untuk mobile",
      "Tidak ada perbedaan, keduanya adalah istilah yang sama",
      "Adaptive selalu lebih baik daripada Responsive",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-39",
    question: "Bagaimana penerapan 'A/B Testing' dalam UX Research dan apa yang membedakannya dari usability testing tradisional?",
    options: [
      "A/B Testing hanya untuk menguji warna, usability testing untuk semua aspek",
      "A/B Testing membandingkan dua versi desain secara simultan pada pengguna nyata untuk mengukur metrik kinerja spesifik, sedangkan usability testing lebih kualitatif untuk mengidentifikasi masalah",
      "A/B Testing dilakukan tanpa pengguna, usability testing melibatkan pengguna",
      "A/B Testing hanya untuk website, usability testing untuk aplikasi mobile",
      "Keduanya selalu dilakukan secara bersamaan",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "UI/UX Design",
  },
  {
    id: "dkv-40",
    question: "Dalam konteks UI/UX profesional, apa yang dimaksud dengan 'Design System' dan komponen utamanya?",
    options: [
      "Sistem operasi yang digunakan untuk mengedit desain",
      "Kumpulan pedoman, komponen, dan pola desain yang bisa digunakan konsisten di seluruh produk, mencakup style guide, component library, dan dokumentasi",
      "Software untuk mengelola file desain",
      "Pola desain yang hanya berlaku untuk mobile",
      "Template email marketing",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "UI/UX Design",
  },

  // ==========================================
  // 5. Typography (dkv-41 to dkv-50)
  // ==========================================
  {
    id: "dkv-41",
    question: "Apa yang dimaksud dengan 'serif' pada sebuah font?",
    options: [
      "Tanda baca berupa garis kecil yang menghias ujung-ujung huruf",
      "Jenis font tanpa dekorasi di ujung huruf",
      "Ukuran font yang digunakan untuk judul",
      "Jarak antar huruf dalam sebuah kata",
      "Jenis dekorasi visual di akhir stroke huruf yang membedakannya dari sans-serif",
    ],
    correct: 4,
    difficulty: "basic",
    skill: "Typography",
  },
  {
    id: "dkv-42",
    question: "Apa itu 'kerning' dalam tipografi?",
    options: [
      "Jarak antara baris teks",
      "Jarak antara seluruh karakter dalam blok teks",
      "Pengaturan jarak antara dua karakter tertentu agar terlihat seimbang secara visual",
      "Ukuran font yang digunakan",
      "Tebal huruf pada sebuah teks",
    ],
    correct: 2,
    difficulty: "basic",
    skill: "Typography",
  },
  {
    id: "dkv-43",
    question: "Apa fungsi dari 'Typographic Hierarchy' dalam desain?",
    options: [
      "Membuat semua teks memiliki ukuran yang sama",
      "Mengatur ukuran, bobot, warna, dan gaya teks untuk menunjukkan urutan informasi dan membimbing pembaca melalui konten",
      "Membuat teks menjadi lebih rumit",
      "Mengatur jumlah paragraf dalam halaman",
      "Membuat font menjadi lebih dekoratif",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Typography",
  },
  {
    id: "dkv-44",
    question: "Perbedaan antara 'Leading' dan 'Tracking' dalam tipografi adalah?",
    options: [
      "Leading mengatur jarak antar huruf, Tracking mengatur jarak antar baris",
      "Leading adalah jarak antar baris teks, Tracking adalah jarak antar seluruh karakter dalam blok teks",
      "Leading adalah ukuran font, Tracking adalah tebal font",
      "Leading hanya digunakan untuk judul, Tracking untuk body text",
      "Tidak ada perbedaan, keduanya adalah hal yang sama",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "Typography",
  },
  {
    id: "dkv-45",
    question: "Apa yang dimaksud dengan 'Widow' dan 'Orphan' dalam tipografi?",
    options: [
      "Jenis font dekoratif yang digunakan untuk judul",
      "Widow adalah satu kata di akhir paragraf yang terisolasi di baris baru, Orphan adalah satu kata di awal baris yang terpisah dari paragraf asalnya",
      "Istilah untuk font yang sudah tidak dipakai",
      "Nama teknik cetak tradisional",
      "Ukuran margin halaman",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Typography",
  },
  {
    id: "dkv-46",
    question: "Apa itu 'Type Scale' dan bagaimana penggunaannya dalam desain web?",
    options: [
      "Timbangan fisik untuk mengukur ukuran huruf cetak",
      "Sistem proporsional berbasis rasio matematika untuk menentukan ukuran font yang harmonis di seluruh hierarki desain",
      "Daftar semua jenis font yang tersedia",
      "Jenis ukuran font yang hanya berlaku untuk mobile",
      "Rasio yang menentukan berapa banyak teks yang boleh ada di halaman",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "Typography",
  },
  {
    id: "dkv-47",
    question: "Dalam tipografi profesional, berapa rentang ukuran font yang direkomendasikan untuk body text di web agar tetap mudah dibaca?",
    options: [
      "8px - 10px untuk kenyamanan membaca maksimal",
      "16px - 18px adalah rentang standar yang nyaman untuk body text di web",
      "24px - 32px agar mudah dilihat dari jauh",
      "4px - 6px untuk menghemat ruang",
      "48px - 72px untuk keterbacaan optimal",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Typography",
  },
  {
    id: "dkv-48",
    question: "Perbedaan antara 'Font Family', 'Font Weight', dan 'Font Style' dalam CSS adalah?",
    options: [
      "Font Family menentukan ukuran, Font Weight menentukan warna, Font Style menentukan posisi",
      "Font Family menentukan jenis font, Font Weight menentukan ketebalan, Font Style menentukan gaya seperti italic atau normal",
      "Ketiganya adalah hal yang sama",
      "Font Family hanya ada di Photoshop, yang lain di CSS",
      "Font Weight hanya untuk font serif",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Typography",
  },
  {
    id: "dkv-49",
    question: "Apa yang dimaksud dengan 'Font Licensing' dan mengapa ini penting dalam proyek desain komersial?",
    options: [
      "Proses memilih font yang paling mahal untuk proyek",
      "Hak legal untuk menggunakan font tertentu, termasuk izin penggunaan komersial, modifikasi, dan distribusi yang berbeda di setiap lisensi",
      "Proses mencetak font di atas kertas",
      "Aturan tentang berapa banyak font yang boleh digunakan dalam satu desain",
      "Cara memasang font di komputer",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "Typography",
  },
  {
    id: "dkv-50",
    question: "Bagaimana memilih kombinasi font yang tepat untuk proyek desain profesional dan apa prinsip-prinsip yang harus diperhatikan?",
    options: [
      "Menggunakan satu font saja untuk semua kebutuhan",
      "Menggunakan minimal 5 font berbeda agar desain lebih menarik",
      "Menggunakan font yang paling populer tanpa memperhatikan konteks",
      "Menggunakan font dekoratif untuk semua jenis konten",
      "Mengombinasikan font dengan kontras yang jelas namun harmonis, memperhatikan keseimbangan, personality brand, dan keterbacaan di berbagai ukuran",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Typography",
  },

  // ==========================================
  // 6. Color Theory (dkv-51 to dkv-60)
  // ==========================================
  {
    id: "dkv-51",
    question: "Tiga warna primer dalam model warna RYB (Red Yellow Blue) adalah?",
    options: [
      "Merah, Hijau, Biru",
      "Cyan, Magenta, Kuning",
      "Merah, Kuning, Biru",
      "Hitam, Putih, Abu-abu",
      "Oranye, Ungu, Hijau",
    ],
    correct: 3,
    difficulty: "basic",
    skill: "Color Theory",
  },
  {
    id: "dkv-52",
    question: "Apa yang dimaksud dengan 'Color Wheel' dalam teori warna?",
    options: [
      "Alat visual lingkaran yang menunjukkan hubungan antara warna-warna berdasarkan campuran cahaya atau pigmen",
      "Roda gila yang digunakan untuk mengukur kecepatan",
      "Program komputer untuk mengedit warna",
      "Jenis filter pada kamera",
      "Format file untuk menyimpan warna",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "Color Theory",
  },
  {
    id: "dkv-53",
    question: "Skema warna 'Analogous' dalam desain menggunakan?",
    options: [
      "Dua warna yang berhadapan di color wheel",
      "Tiga atau lebih warna yang bersebelahan di color wheel, menciptakan kombinasi yang harmonis dan nyaman dilihat",
      "Warna-warna yang sangat kontras",
      "Hanya satu warna dengan variasi tint dan shade",
      "Semua warna pelangi secara bersamaan",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Color Theory",
  },
  {
    id: "dkv-54",
    question: "Apa yang dimaksud dengan 'Complementary Colors' (warna komplementer)?",
    options: [
      "Warna-warna yang berada di sebelah satu sama lain di color wheel",
      "Dua warna yang saling melengkapi dan berada berhadapan langsung di color wheel, menciptakan kontras tinggi saat dipadukan",
      "Warna-warna yang memiliki saturation sama",
      "Semua warna primer",
      "Warna-warna yang sama persis",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Color Theory",
  },
  {
    id: "dkv-55",
    question: "Apa perbedaan antara 'Hue', 'Saturation', dan 'Value' dalam model warna HSV?",
    options: [
      "Hue adalah kecerahan, Saturation adalah warna, Value adalah kedalaman",
      "Hue adalah nama/jenis warna, Saturation adalah intensitas/kejenuhan warna, Value adalah tingkat kecerahan atau kegelapan warna",
      "Hue adalah ukuran font, Saturation adalah teks, Value adalah angka",
      "Hue hanya untuk warna merah, Saturation untuk warna biru",
      "HSV adalah format file gambar",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Color Theory",
  },
  {
    id: "dkv-56",
    question: "Apa itu 'Color Psychology' dan bagaimana penerapannya dalam branding?",
    options: [
      "Ilmu memprediksi cuaca berdasarkan warna langit",
      "Studi tentang bagaimana warna mempengaruhi emosi, perilaku, dan persepsi manusia yang digunakan untuk membangun identitas visual brand yang tepat",
      "Teknik mencampur warna dengan proporsi yang tepat",
      "Cara mengatur kecerahan layar komputer",
      "Jenis software untuk mengedit warna",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Color Theory",
  },
  {
    id: "dkv-57",
    question: "Dalam desain digital, apa perbedaan antara model warna RGB dan CMYK?",
    options: [
      "RGB untuk cetak, CMYK untuk layar",
      "RGB adalah model warna additive untuk layar digital, CMYK adalah model warna subtractive untuk pencetakan",
      "RGB hanya untuk warna hitam-putih",
      "CMYK hanya untuk fotografi",
      "Keduanya adalah model warna yang sama",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Color Theory",
  },
  {
    id: "dkv-58",
    question: "Masalah 'Contrast Ratio' yang rendah antara teks dan latar belakang berdampak pada?",
    options: [
      "Mempercepat loading website",
      "Menurunkan aksesibilitas dan keterbacaan, terutama bagi pengguna dengan gangguan penglihatan",
      "Meningkatkan estetika desain",
      "Mengurangi ukuran file gambar",
      "Meningkatkan jumlah pengunjung website",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Color Theory",
  },
  {
    id: "dkv-59",
    question: "Dalam alur kerja desain profesional, bagaimana memastikan konsistensi warna dari layar ke cetak menggunakan profil warna ICC?",
    options: [
      "Menggunakan profil ICC tidak diperlukan, warna akan selalu sama",
      "ICC Profile mengkalibrasi warna antara perangkat, memastikan bahwa warna yang terlihat di monitor mendekati hasil cetak dengan menggunakan color management system yang tepat",
      "ICC Profile hanya untuk monitor CRT",
      "ICC Profile otomatis mengatur semua warna tanpa intervensi",
      "ICC Profile hanya digunakan di Photoshop",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Color Theory",
  },
  {
    id: "dkv-60",
    question: "Apa itu 'Color Gamut' dan mengapa penting untuk dipertimbangkan saat bekerja dengan desain untuk berbagai media?",
    options: [
      "Jenis permainan teka-teki warna",
      "Rentang warna yang dapat direproduksi oleh perangkat atau media tertentu, penting untuk memastikan konsistensi warna antara layar dan cetak",
      "Jumlah warna yang tersedia di komputer",
      "Format file gambar",
      "Jenis printer yang digunakan",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Color Theory",
  },

  // ==========================================
  // 7. Brand Identity (dkv-61 to dkv-70)
  // ==========================================
  {
    id: "dkv-61",
    question: "Perbedaan antara 'Logo' dan 'Brand' adalah?",
    options: [
      "Logo dan Brand adalah hal yang sama persis",
      "Logo adalah simbol visual, Brand adalah keseluruhan persepsi dan pengalaman yang dirasakan konsumen terhadap sebuah perusahaan",
      "Logo adalah simbol visual yang mewakili brand, sementara brand mencakup seluruh persepsi, emosi, dan pengalaman konsumen terhadap perusahaan",
      "Brand hanya untuk perusahaan besar",
      "Logo berubah-ubah, Brand tetap selamanya",
    ],
    correct: 2,
    difficulty: "basic",
    skill: "Brand Identity",
  },
  {
    id: "dkv-62",
    question: "Apa yang termasuk dalam elemen 'Brand Identity'?",
    options: [
      "Hanya logo saja",
      "Library berisi aset visual yang dijual",
      "Logo, warna, tipografi, gaya visual, tone of voice, dan elemen desain lain yang membentuk citra brand",
      "Hanya nama brand dan slogan",
      "Hanya nama domain website",
    ],
    correct: 4,
    difficulty: "basic",
    skill: "Brand Identity",
  },
  {
    id: "dkv-63",
    question: "Apa itu 'Visual Identity' dalam konteks branding?",
    options: [
      "Hanya foto profil di media sosial",
      "Kumpulan elemen visual yang digunakan untuk mewakili brand, termasuk logo, warna, tipografi, ikon, dan pola grafis",
      "Panduan SEO untuk website",
      "Strategi pemasaran digital",
      "Rencana bisnis perusahaan",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Brand Identity",
  },
  {
    id: "dkv-64",
    question: "Apa yang dimaksud dengan 'Brand Guideline' atau 'Brand Book'?",
    options: [
      "Dokumen yang berisi aturan penggunaan elemen-elemen brand seperti logo, warna, font, dan tone of voice agar konsisten di semua media",
      "Buku panduan untuk karyawan baru tentang tata tertib kantor",
      "Daftar kompetitor dalam industri",
      "Laporan keuangan tahunan perusahaan",
      "Buku petunjuk penggunaan software desain",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Brand Identity",
  },
  {
    id: "dkv-65",
    question: "Mengapa 'Consistency' (konsistensi) penting dalam implementasi Brand Identity?",
    options: [
      "Agar desain terlihat membosankan",
      "Konsistensi membantu membangun pengenalan dan kepercayaan konsumen dengan menciptakan identitas yang mudah dikenali di semua touchpoint",
      "Agar tidak perlu membuat desain baru",
      "Konsistensi hanya diperlukan untuk media cetak",
      "Konsistensi mengurangi biaya produksi",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "Brand Identity",
  },
  {
    id: "dkv-66",
    question: "Dalam merancang Logo, apa yang dimaksud dengan 'Logo Mark' dan 'Logo Type'?",
    options: [
      "Logo Mark adalah watermark, Logo Type adalah judul",
      "Logo Mark adalah simbol/grafis, Logo Type adalah representasi teks dari nama brand",
      "Logo Mark hanya untuk digital, Logo Type hanya untuk cetak",
      "Logo Mark berwarna, Logo Type hitam-putih",
      "Keduanya adalah ukuran logo yang berbeda",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Brand Identity",
  },
  {
    id: "dkv-67",
    question: "Apa pertimbangan utama saat merancang Logo untuk berbagai ukuran dan media (responsiveness)?",
    options: [
      "Logo harus selalu menggunakan detail sebanyak mungkin",
      "Logo harus tetap dikenali dan dapat dibaca dari ukuran yang sangat kecil hingga sangat besar, dengan variasi yang disesuaikan untuk berbagai konteks",
      "Logo tidak perlu diuji untuk ukuran yang berbeda",
      "Logo harus selalu berupa gambar, tidak boleh teks",
      "Logo hanya perlu terlihat bagus di layar komputer",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "Brand Identity",
  },
  {
    id: "dkv-68",
    question: "Apa yang dimaksud dengan 'Brand Positioning' dan bagaimana pengaruhnya terhadap desain identitas visual?",
    options: [
      "Posisi logo di halaman website",
      "Menentukan posisi unik brand di benak konsumen dibandingkan kompetitor, yang menjadi dasar pengambilan keputusan desain visual",
      "Lokasi kantor perusahaan",
      "Jumlah produk yang dijual",
      "Harga jual produk",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Brand Identity",
  },
  {
    id: "dkv-69",
    question: "Bagaimana proses mendesain lengkap Brand Identity System untuk startup dari nol?",
    options: [
      "Langsung membuat logo tanpa riset",
      "Melakukan riset brand, menentukan positioning, membuat moodboard, merancang elemen visual, membuat brand guideline, dan mengimplementasikan di semua touchpoint secara konsisten",
      "Menyalin identitas visual dari kompetitor",
      "Membuat logo di Microsoft Word",
      "Menggunakan template gratis tanpa penyesuaian",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Brand Identity",
  },
  {
    id: "dkv-70",
    question: "Dalam konteks branding digital modern, bagaimana memastikan Brand Identity tetap relevan dan adaptif terhadap tren desain yang terus berubah?",
    options: [
      "Mengikuti semua tren tanpa mempertahankan konsistensi",
      "Tidak perlu berubah karena brand sudah mapan",
      "Membuat logo baru setiap bulan agar tetap trendy",
      "Menerapkan prinsip desain timeless dengan fleksibilitas sistem yang memungkinkan evolusi bertahap tanpa mengorbankan recognition",
      "Mengabaikan tren dan menggunakan desain yang sudah usang",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "Brand Identity",
  },

  // ==========================================
  // 8. Motion Graphics (dkv-71 to dkv-80)
  // ==========================================
  {
    id: "dkv-71",
    question: "Apa yang dimaksud dengan 'Keyframe' dalam animasi motion graphics?",
    options: [
      "Frame pertama dari sebuah animasi",
      "Titik waktu tertentu di mana properti objek seperti posisi, rotasi, atau skala ditentukan nilainya",
      "Jenis frame yang hanya ada di video editing",
      "Jumlah total frame dalam animasi",
      "Frame yang dihapus dari animasi",
    ],
    correct: 1,
    difficulty: "basic",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-72",
    question: "Apa fungsi dari panel 'Timeline' dalam software motion graphics seperti After Effects?",
    options: [
      "Untuk mengedit teks",
      "Untuk mengatur urutan, durasi, dan timing elemen animasi dari waktu ke waktu",
      "Untuk memilih warna",
      "Untuk mengimpor gambar",
      "Untuk membuat effek suara",
    ],
    correct: 3,
    difficulty: "basic",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-73",
    question: "Perbedaan antara 'Frame Rate' 24fps, 30fps, dan 60fps dalam motion graphics adalah?",
    options: [
      "24fps standar sinema, 30fps standar video, 60fps untuk animasi yang sangat halus dan game interaktif",
      "Semua frame rate menghasilkan animasi yang sama",
      "24fps adalah yang paling halus",
      "60fps hanya untuk video hitam-putih",
      "Frame rate tidak mempengaruhi kualitas animasi",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-74",
    question: "Apa itu 'Motion Path' dalam After Effects?",
    options: [
      "Jenis efek suara pada animasi",
      "Garis panduan visual yang menunjukkan jalur pergerakan objek dari satu titik ke titik lain dalam ruang dua dimensi",
      "Format file animasi",
      "Jenis mask yang digunakan untuk rotoscoping",
      "Alat untuk membuat teks bergerak",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-75",
    question: "Apa yang dimaksud dengan 'Easing' atau 'Ease In/Out' dalam motion graphics?",
    options: [
      "Membuat animasi bergerak dengan kecepatan konstan dari awal hingga akhir",
      "Teknik yang membuat animasi dimulai atau berakhir dengan kecepatan yang melambat atau mempercepat untuk terlihat lebih natural",
      "Efek blur pada animasi",
      "Menghapus keyframe dari timeline",
      "Membuat animasi bergerak lebih cepat",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-76",
    question: "Perbedaan antara 'Linear Keyframes' dan 'Bezier Keyframes' dalam motion graphics adalah?",
    options: [
      "Linear Keyframes hanya untuk posisi, Bezier untuk warna",
      "Linear menghasilkan gerakan konstan, Bezier memungkinkan kontrol kurva kecepatan dengan handle untuk gerakan yang lebih organik",
      "Linear lebih cepat dari Bezier",
      "Bezier hanya untuk rotasi, Linear untuk skala",
      "Tidak ada perbedaan",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-77",
    question: "Apa yang dimaksud dengan 'Rotoscoping' dalam motion graphics dan VFX?",
    options: [
      "Teknik membuat animasi 3D dari model",
      "Teknik membuat mask frame-by-frame untuk memisahkan objek dari backgroundnya, memungkinkan manipulasi elemen secara terpisah",
      "Mengedit audio dari video",
      "Membuat subtitle otomatis",
      "Teknik mengompresi video",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-78",
    question: "Apa fungsi dari 'Pre-composition' dalam After Effects?",
    options: [
      "Menggabungkan beberapa layer menjadi satu composition baru yang bisa dianimasikan sebagai satu unit, memudahkan pengelolaan proyek kompleks",
      "Menghapus semua layer dalam composition",
      "Membuat rendering lebih cepat",
      "Mengimpor file video",
      "Menambahkan efek suara",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-79",
    question: "Apa yang dimaksud dengan 'Motion Design Principles' dan bagaimana penerapannya untuk menciptakan animasi yang efektif dan engaging?",
    options: [
      "Prinsip yang hanya berlaku untuk animasi kartun",
      "Prinsip-prinsip seperti timing, anticipation, follow-through, squash and stretch yang diterapkan untuk menciptakan komunikasi visual yang jelas dan emosional melalui gerakan",
      "Aturan tentang berapa lama animasi harus berlangsung",
      "Panduan untuk memilih software animasi",
      "Cara menghitung biaya produksi animasi",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Motion Graphics",
  },
  {
    id: "dkv-80",
    question: "Dalam produksi motion graphics profesional, bagaimana mengoptimalkan workflow untuk proyek dengan banyak elemen animasi kompleks?",
    options: [
      "Membuat semua animasi dalam satu layer",
      "Menggunakan pre-composition, expression untuk animasi otomatis, file proxy untuk performa, dan organisasi layer yang sistematis",
      "Menggunakan komputer yang lebih mahal",
      "Mengurangi jumlah keyframe seminimal mungkin",
      "Tidak menggunakan efek apapun",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Motion Graphics",
  },

  // ==========================================
  // 9. HTML/CSS (dkv-81 to dkv-90)
  // ==========================================
  {
    id: "dkv-81",
    question: "Apa fungsi dari tag HTML div?",
    options: [
      "Sebagai container atau pembungkus elemen untuk pengelompokan dan styling konten",
      "Membuat teks tebal",
      "Membuat tabel data",
      "Mengimpor gambar",
      "Membuat link ke halaman lain",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-82",
    question: "Apa perbedaan antara class dan id sebagai selector CSS?",
    options: [
      "Tidak ada perbedaan",
      "Class bisa digunakan untuk banyak elemen, ID hanya boleh digunakan untuk satu elemen dalam halaman",
      "ID hanya untuk JavaScript, Class untuk CSS",
      "Class berfungsi untuk JavaScript, ID untuk CSS",
      "ID bisa digunakan untuk banyak elemen, Class hanya untuk satu",
    ],
    correct: 4,
    difficulty: "basic",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-83",
    question: "Apa kegunaan dari CSS Flexbox dalam layout web?",
    options: [
      "Membuat animasi transisi",
      "Sistem layout satu dimensi untuk mengatur distribusi dan perataan elemen dalam satu sumbu (horizontal atau vertical)",
      "Membuat efek hover",
      "Mengatur font style",
      "Membuat border style",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-84",
    question: "Perbedaan antara Flexbox dan CSS Grid dalam layout web adalah?",
    options: [
      "Flexbox dan Grid adalah hal yang sama",
      "Flexbox adalah layout satu dimensi, Grid adalah layout dua dimensi yang bisa mengontrol baris dan kolom secara simultan",
      "Grid hanya untuk mobile, Flexbox untuk desktop",
      "Flexbox lebih tua dari Grid sehingga tidak direkomendasikan",
      "Grid tidak mendukung responsive design",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-85",
    question: "Apa yang dimaksud dengan CSS Box Model?",
    options: [
      "Model 3D untuk membuat efek bayangan",
      "Konsep CSS yang terdiri dari content, padding, border, dan margin sebagai komponen pembentuk elemen",
      "Format file CSS khusus",
      "Framework CSS populer",
      "Teknik untuk membuat grid layout",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-86",
    question: "Apa kegunaan dari CSS position sticky dan bagaimana cara kerjanya?",
    options: [
      "Elemen berperilaku relatif hingga mencapai batas scroll tertentu, lalu berubah menjadi fixed di posisi yang ditentukan",
      "Membuat elemen menghilang dari halaman",
      "Membuat elemen bergerak secara otomatis",
      "Mengunci posisi elemen di semua perangkat",
      "Membuat elemen transparan",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-87",
    question: "Apa yang dimaksud dengan CSS Media Queries?",
    options: [
      "Query database yang menggunakan CSS",
      "Fitur CSS yang memungkinkan penerapan gaya berbeda berdasarkan kondisi perangkat seperti ukuran layar, resolusi, atau orientasi",
      "Alat untuk mengukur kecepatan internet",
      "Jenis query SQL untuk desain web",
      "Teknik untuk mengoptimalkan gambar",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-88",
    question: "Apa itu CSS Specificity dan bagaimana urutan prioritasnya?",
    options: [
      "Tingkat kejelasan font yang ditampilkan",
      "Aturan yang menentukan style mana yang diterapkan jika ada konflik, dengan prioritas: inline style, ID, class, element, inheritance",
      "Urutan file CSS yang diimpor",
      "Jumlah selector yang digunakan dalam satu file",
      "Tingkat kompresi file CSS",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-89",
    question: "Bagaimana menerapkan CSS Custom Properties (CSS Variables) secara efektif dalam proyek desain sistem (design system)?",
    options: [
      "CSS Variables hanya bisa digunakan untuk warna",
      "Mendefinisikan variabel untuk token desain seperti warna, spacing, ukuran font di root, lalu menggunakannya untuk memastikan konsistensi dan kemudahan maintenance di seluruh komponen design system",
      "CSS Variables tidak mendukung komponen reusable",
      "CSS Variables hanya berfungsi di browser Chrome",
      "CSS Variables membuat kode CSS lebih rumit",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "HTML/CSS",
  },
  {
    id: "dkv-90",
    question: "Dalam konteks aksesibilitas web (web accessibility), mengapa penggunaan tag HTML semantik seperti header, nav, main, dan article sangat penting?",
    options: [
      "Hanya untuk SEO, tidak ada manfaat lain",
      "Memberikan makna struktural bagi screen reader dan teknologi assistive, meningkatkan SEO, dan membuat kode lebih mudah dipahami oleh developer lain",
      "Tag semantik hanya berfungsi di browser tertentu",
      "Tag semantik membuat website lebih cepat",
      "Tag semantik tidak bisa di-style dengan CSS",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "HTML/CSS",
  },

  // ==========================================
  // 10. Video Editing (dkv-91 to dkv-100)
  // ==========================================
  {
    id: "dkv-91",
    question: "Istilah Cut, Fade, dan Transition dalam video editing merujuk pada?",
    options: [
      "Jenis file video",
      "Teknik pengeditan dasar: Cut adalah perubahan langsung antar shot, Fade adalah perubahan bertahap ke atau dari warna tertentu, Transition adalah efek visual perpindahan antar shot",
      "Format rendering video",
      "Teknik perekaman video",
      "Jenis kamera yang digunakan",
    ],
    correct: 2,
    difficulty: "basic",
    skill: "Video Editing",
  },
  {
    id: "dkv-92",
    question: "Apa perbedaan antara format video lossy dan lossless?",
    options: [
      "Lossy adalah format yang sudah tidak digunakan",
      "Lossy mengompresi data dengan menghapus sebagian informasi, lossless mempertahankan semua data asli meskipun ukuran file tetap besar",
      "Lossless hanya untuk audio",
      "Lossy lebih unggul dari lossless dalam semua aspek",
      "Tidak ada perbedaan antara keduanya",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "Video Editing",
  },
  {
    id: "dkv-93",
    question: "Apa yang dimaksud dengan Timeline dalam software video editing?",
    options: [
      "Daftar riwayat edit yang sudah dilakukan",
      "Panel kerja horizontal yang menampilkan urutan klip video, audio, dan efek dari waktu ke waktu untuk mengatur editing",
      "Format file video output",
      "Jenis transisi yang digunakan",
      "Alat untuk mengukur durasi video",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "Video Editing",
  },
  {
    id: "dkv-94",
    question: "Apa fungsi dari Color Grading dalam video editing?",
    options: [
      "Menghapus suara dari video",
      "Mengatur dan menyesuaikan warna video untuk menciptakan mood, nuansa, dan konsistensi visual yang sesuai dengan cerita",
      "Menambahkan efek suara",
      "Membuat subtitle",
      "Mengatur kecepatan video",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Video Editing",
  },
  {
    id: "dkv-95",
    question: "Perbedaan antara J-Cut dan L-Cut dalam video editing adalah?",
    options: [
      "J-Cut untuk audio, L-Cut untuk video",
      "J-Cut: audio klip berikutnya muncul sebelum video berubah; L-Cut: audio klip sebelumnya masih terdengar setelah video berpindah ke shot berikutnya",
      "J-Cut untuk film horor, L-Cut untuk film komedi",
      "J-Cut lebih cepat dari L-Cut",
      "Keduanya adalah jenis transisi yang sama",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Video Editing",
  },
  {
    id: "dkv-96",
    question: "Perbedaan antara Rendering, Exporting, dan Encoding dalam konteks video editing adalah?",
    options: [
      "Semua istilah tersebut memiliki arti yang sama",
      "Rendering memproses efek menjadi video, Encoding mengubah format, Exporting menghasilkan file akhir, ketiganya berbeda dalam konteks dan tujuannya",
      "Encoding hanya untuk audio",
      "Exporting adalah istilah lama untuk Rendering",
      "Rendering hanya dilakukan secara otomatis",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Video Editing",
  },
  {
    id: "dkv-97",
    question: "Apa itu Non-Linear Editing (NLE) dan bagaimana cara kerjanya dibandingkan dengan editing linear tradisional?",
    options: [
      "NLE hanya untuk editing audio",
      "NLE memungkinkan editing tanpa urutan kronologis, memungkinkan akses ke bagian manapun dari footage secara acak, berbeda dengan linear yang harus dilakukan secara berurutan dari awal",
      "NLE selalu lebih lambat dari editing linear",
      "NLE tidak mendukung multi-track editing",
      "Linear editing adalah metode modern yang lebih baik",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Video Editing",
  },
  {
    id: "dkv-98",
    question: "Apa yang dimaksud dengan B-Roll dalam produksi video?",
    options: [
      "Video yang gagal saat perekaman",
      "Rekaman pendukung yang dipotong ke shot utama (A-Roll) untuk memberikan konteks visual, transisi yang lebih halus, dan kedalaman cerita",
      "Jenis kamera kedua yang digunakan",
      "Footage yang dihapus dari video akhir",
      "Efek visual yang ditambahkan pasca-produksi",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Video Editing",
  },
  {
    id: "dkv-99",
    question: "Dalam video editing profesional, apa itu Proxy Editing dan kapan strategi ini sebaiknya digunakan?",
    options: [
      "Mengedit video di komputer orang lain",
      "Mengedit menggunakan salinan resolusi rendah dari footage asli untuk performa yang lebih baik, lalu melakukan final render menggunakan file resolusi penuh",
      "Mengedit video tanpa audio",
      "Mengedit hanya bagian tertentu dari video",
      "Mengedit video di komputer dengan RAM rendah",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Video Editing",
  },
  {
    id: "dkv-100",
    question: "Bagaimana alur kerja (workflow) lengkap produksi video profesional dari pra-produksi hingga distribusi digital?",
    options: [
      "Langsung rekam dan upload ke YouTube",
      "Perencanaan (script, storyboard, shot list), Pra-produksi (casting, lokasi, jadwal), Produksi (perekaman), Pasca-produksi (editing, color grading, audio mixing, rendering), Distribusi (platform, encoding, metadata)",
      "Rekam video lalu langsung edit",
      "Hanya melakukan editing tanpa perencanaan",
      "Upload video mentah ke media sosial",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Video Editing",
  },
];

const tkjQuiz: QuizQuestion[] = [
  // ============================================================
  // 1. WINDOWS SERVER (tkj-01 — tkj-10)
  // ============================================================
  {
    id: "tkj-01",
    question: "Sistem operasi Windows Server merupakan server yang dikembangkan oleh perusahaan?",
    options: ["IBM", "Oracle", "Microsoft", "Google", "Red Hat"],
    correct: 0,
    difficulty: "basic",
    skill: "Windows Server",
  },
  {
    id: "tkj-02",
    question: "Servis utama yang digunakan untuk membagikan file dan printer pada jaringan di Windows Server disebut?",
    options: ["DNS", "File and Printer Sharing", "DHCP", "IIS", "WSUS"],
    correct: 1,
    difficulty: "basic",
    skill: "Windows Server",
  },
  {
    id: "tkj-03",
    question: "Fitur pada Windows Server yang dapat mengatur alokasi IP address otomatis kepada client disebut?",
    options: ["DNS Server", "Active Directory", "DHCP Server", "NAT", "Proxy Server"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Windows Server",
  },
  {
    id: "tkj-04",
    question: "Untuk mengonfigurasi IP address pada Windows Server melalui command line, perintah yang digunakan adalah?",
    options: ["ipconfig /set", "ipaddr configure", "set-ip -static", "netsh interface ip set", "network-config set"],
    correct: 3,
    difficulty: "intermediate",
    skill: "Windows Server",
  },
  {
    id: "tkj-05",
    question: "Role Server yang berfungsi menerjemahkan nama domain menjadi IP address pada Windows Server adalah?",
    options: ["FTP Server", "DHCP Server", "WINS Server", "DNS Server", "RADIUS Server"],
    correct: 4,
    difficulty: "intermediate",
    skill: "Windows Server",
  },
  {
    id: "tkj-06",
    question: "Pada Windows Server, teknologi yang memungkinkan beberapa server bekerja sama untuk meningkatkan ketersediaan layanan disebut?",
    options: ["Failover Clustering", "Load Balancing", "Hyper-V Replica", "Storage Spaces", "BranchCache"],
    correct: 0,
    difficulty: "advanced",
    skill: "Windows Server",
  },
  {
    id: "tkj-07",
    question: "Group Policy Object (GPO) pada Windows Server digunakan untuk?",
    options: [
      "Membuat backup data server",
      "Mengatur jaringan wireless",
      "Mengatur keamanan dan konfigurasi komputer secara terpusat",
      "Menginstal aplikasi pada client",
      "Memantau lalu lintas jaringan",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Windows Server",
  },
  {
    id: "tkj-08",
    question: "Fitur Windows Server yang memungkinkan administrator melakukan remote desktop management dari jarak jauh disebut?",
    options: ["Remote Assistance", "Remote Desktop Services", "Windows Admin Center", "Server Manager Remote", "PowerShell Remoting"],
    correct: 3,
    difficulty: "advanced",
    skill: "Windows Server",
  },
  {
    id: "tkj-09",
    question: "Pada Windows Server 2022, fitur keamanan baru yang menyediakan isolasi mesin virtual (VM) disebut?",
    options: ["Secure Boot", "Credential Guard", "Shielded VM", "Host Guardian Service", "Virtual TPM"],
    correct: 1,
    difficulty: "expert",
    skill: "Windows Server",
  },
  {
    id: "tkj-10",
    question: "Arsitektur Windows Server yang menggunakan komponen modular untuk menginstal hanya fitur yang dibutuhkan disebut?",
    options: ["Nano Server", "Server Core", "Windows Server on ARM", "Minimal Server Interface", "Server with Desktop Experience"],
    correct: 4,
    difficulty: "expert",
    skill: "Windows Server",
  },

  // ============================================================
  // 2. LINUX ADMINISTRATION (tkj-11 — tkj-20)
  // ============================================================
  {
    id: "tkj-11",
    question: "Distribusi Linux yang sering digunakan sebagai server di dunia perbankan adalah?",
    options: ["Ubuntu Desktop", "Linux Mint", "Red Hat Enterprise Linux (RHEL)", " elementary OS", "Zorin OS"],
    correct: 1,
    difficulty: "basic",
    skill: "Linux Administration",
  },
  {
    id: "tkj-12",
    question: "Perintah dalam Linux untuk menampilkan isi direktori adalah?",
    options: ["cd", "pwd", "mkdir", "ls", "rm"],
    correct: 2,
    difficulty: "basic",
    skill: "Linux Administration",
  },
  {
    id: "tkj-13",
    question: "File konfigurasi utama untuk manajemen paket pada distribusi Debian/Ubuntu adalah?",
    options: ["/etc/yum.conf", "/etc/apt/sources.list", "/etc/pacman.conf", "/etc/dnf.conf", "/etc/zypp/repos.d/"],
    correct: 3,
    difficulty: "intermediate",
    skill: "Linux Administration",
  },
  {
    id: "tkj-14",
    question: "Perintah untuk melihat dan mengedit crontab user saat ini di Linux adalah?",
    options: ["crontab -view", "crontab --edit", "cronedit", "nano /etc/crontab", "crontab -e"],
    correct: 4,
    difficulty: "intermediate",
    skill: "Linux Administration",
  },
  {
    id: "tkj-15",
    question: "Service yang berfungsi sebagai web server pada Linux dan merupakan web server paling populer di dunia adalah?",
    options: ["Nginx", "Lighttpd", "Apache HTTP Server (httpd)", "Caddy", "Cherokee"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Linux Administration",
  },
  {
    id: "tkj-16",
    question: "Perintah Linux untuk mengubah izin akses file menjadi 'read, write, execute' untuk owner dan 'read, execute' untuk group dan other adalah?",
    options: ["chmod 644", "chmod 755", "chmod 777", "chmod 600", "chmod 744"],
    correct: 1,
    difficulty: "advanced",
    skill: "Linux Administration",
  },
  {
    id: "tkj-17",
    question: "Pada Linux, logical volume management (LVM) memungkinkan administrator untuk?",
    options: [
      "Membuat RAID array secara otomatis",
      "Mempercepat akses disk hardware",
      "Mengubah ukuran partisi tanpa kehilangan data",
      "Mengenkripsi seluruh filesystem",
      "Membuat partisi boot UEFI",
    ],
    correct: 2,
    difficulty: "advanced",
    skill: "Linux Administration",
  },
  {
    id: "tkj-18",
    question: "Untuk mengonfigurasi firewall pada Linux modern menggunakan framework netfilter, perintah yang digunakan adalah?",
    options: ["iptables", "ufw enable", "nftables", "firewalld-cmd", "netfilter-config"],
    correct: 3,
    difficulty: "advanced",
    skill: "Linux Administration",
  },
  {
    id: "tkj-19",
    question: "Daemon systemd pada Linux yang bertanggung jawab mengelola login pengguna dan sesi disebut?",
    options: ["systemd-logind", "systemd-session", "login.service", "pam_systemd", "session-manager"],
    correct: 0,
    difficulty: "expert",
    skill: "Linux Administration",
  },
  {
    id: "tkj-20",
    question: "Teknik hardening Linux server yang menerapkan prinsip 'least privilege' pada layanan sistem dilakukan dengan cara?",
    options: [
      "Menginstal antivirus berbayar pada server",
      "Mengaktifkan remote desktop untuk semua user",
      "Menggunakan password yang sama untuk semua akun",
      "Menghapus firewall untuk mempercepat akses",
      "Menonaktifkan semua service yang tidak diperlukan dan menjalankan service dengan user non-root",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Linux Administration",
  },

  // ============================================================
  // 3. ACTIVE DIRECTORY (tkj-21 — tkj-30)
  // ============================================================
  {
    id: "tkj-21",
    question: "Active Directory merupakan layanan direktori yang dikembangkan oleh?",
    options: ["Google", "Novell", "Microsoft", "Oracle", "Cisco"],
    correct: 2,
    difficulty: "basic",
    skill: "Active Directory",
  },
  {
    id: "tkj-22",
    question: "Unit Organisasi (OU) dalam Active Directory digunakan untuk?",
    options: [
      "Membuat koneksi internet",
      "Menginstal sistem operasi",
      "Mengatur kecepatan jaringan",
      "Mengelola dan mengelompokkan objek seperti user, komputer, dan printer",
      "Membuat laporan keuangan",
    ],
    correct: 3,
    difficulty: "basic",
    skill: "Active Directory",
  },
  {
    id: "tkj-23",
    question: "Protokol yang digunakan oleh Active Directory untuk melakukan autentikasi pengguna Windows adalah?",
    options: ["LDAP", "Kerberos", "RADIUS", "TACACS+", "SAML"],
    correct: 4,
    difficulty: "intermediate",
    skill: "Active Directory",
  },
  {
    id: "tkj-24",
    question: "Domain Controller (DC) dalam Active Directory berfungsi sebagai?",
    options: [
      "Server yang menyimpan database direktori dan memproses autentikasi",
      "Router utama jaringan",
      "Server backup data",
      "Firewall jaringan",
      "Proxy server internet",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Active Directory",
  },
  {
    id: "tkj-25",
    question: "Group Policy adalah fitur Active Directory yang digunakan untuk?",
    options: [
      "Membuat account email baru",
      "Mengatur alokasi IP address",
      "Menerapkan kebijakan keamanan dan konfigurasi secara terpusat ke komputer dalam domain",
      "Memantau penggunaan bandwidth",
      "Membuat website perusahaan",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Active Directory",
  },
  {
    id: "tkj-26",
    question: "Fungsi FSMO (Flexible Single Master Operation) role 'Schema Master' dalam Active Directory adalah?",
    options: [
      "Mengelola dan memodifikasi skema direktori di seluruh forest",
      "Mengelola waktu sinting jaringan",
      "Menetapkan RID pool untuk semua domain",
      "Menjadi penanggung jawab PDC Emulator",
      "Mengelola DNS zone utama",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Active Directory",
  },
  {
    id: "tkj-27",
    question: "Trust relationship dalam Active Directory memungkinkan?",
    options: [
      "User di satu domain mengakses resource di domain lain dengan satu akun",
      "Server mengakses internet tanpa proxy",
      "Komputer client booting secara PXE",
      "Membuat VLAN baru pada switch",
      "Menginstal aplikasi secara remote",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Active Directory",
  },
  {
    id: "tkj-28",
    question: "Replikasi Active Directory antar Domain Controller menggunakan protokol berbasis RPC yang disebut?",
    options: ["DRSR (Directory Replication Service RPC)", "SMB", "WinRM", "WMI", "SNMP"],
    correct: 0,
    difficulty: "advanced",
    skill: "Active Directory",
  },
  {
    id: "tkj-29",
    question: "Fitur Active Directory Recycle Bin memungkinkan administrator untuk?",
    options: [
      "Memulihkan objek (user, grup, OU) yang telah terhapus tanpa memulihkan data",
      "Menghapus virus dari direktori",
      "Meng-cache halaman website",
      "Mempercepat proses login",
      "Membuat backup otomatis ke cloud",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Active Directory",
  },
  {
    id: "tkj-30",
    question: "Ketika melakukan migrasi Active Directory dari Windows Server 2016 ke 2022, langkah kritis pertama yang harus dilakukan adalah?",
    options: [
      "Menjalankan adprep /forestprep dan adprep /domainprep untuk memperbarui skema",
      "Memformat ulang semua hard disk server",
      "Menghapus seluruh user account yang ada",
      "Mematikan firewall pada semua komputer client",
      "Menginstal ulang semua komputer client",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Active Directory",
  },

  // ============================================================
  // 4. NETWORKING (tkj-31 — tkj-40)
  // ============================================================
  {
    id: "tkj-31",
    question: "Perangkat jaringan yang berfungsi untuk menghubungkan beberapa jaringan komputer dan meneruskan paket data berdasarkan alamat IP disebut?",
    options: ["Switch", "Hub", "Router", "Access Point", "Repeater"],
    correct: 0,
    difficulty: "basic",
    skill: "Networking",
  },
  {
    id: "tkj-32",
    question: "Pengalam IP yang termasuk dalam kelas C ditandai dengan oktet pertama bernilai?",
    options: ["1–126", "128–191", "224–239", "240–255", "192–223"],
    correct: 4,
    difficulty: "basic",
    skill: "Networking",
  },
  {
    id: "tkj-33",
    question: "Subnet mask default untuk jaringan kelas B adalah?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.128", "255.255.255.192"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Networking",
  },
  {
    id: "tkj-34",
    question: "Teknologi VLAN (Virtual LAN) pada switch berfungsi untuk?",
    options: [
      "Mengelompokkan perangkat secara logis terlepas dari lokasi fisik untuk meningkatkan keamanan dan manajemen",
      "Membuat jaringan wireless baru",
      "Mempercepat koneksi internet",
      "Menggantikan firewall",
      "Membuat IP address baru secara otomatis",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Networking",
  },
  {
    id: "tkj-35",
    question: "Protokol yang digunakan untuk menerjemahkan nama domain menjadi alamat IP adalah?",
    options: ["DHCP", "DNS", "ARP", "NAT", "SNMP"],
    correct: 3,
    difficulty: "intermediate",
    skill: "Networking",
  },
  {
    id: "tkj-36",
    question: "Pada jaringan dengan topologi star, jika satu kabel putus, maka yang terjadi adalah?",
    options: [
      "Hanya satu perangkat yang terputus dari jaringan",
      "Seluruh jaringan akan lumpuh",
      "Semua perangkat akan otomatis pindah ke jaringan lain",
      "Switch akan mati total",
      "Tidak ada pengaruh sama sekali",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Networking",
  },
  {
    id: "tkj-37",
    question: "Konfigurasi spanning tree protocol (STP) pada switch mencegah terjadinya?",
    options: [
      "Broadcast storm akibat loop pada jaringan switched",
      "Serangan DDoS dari luar jaringan",
      "Kehilangan data pada transmisi wireless",
      "Penurunan kecepatan CPU server",
      "Konflik IP address antar client",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Networking",
  },
  {
    id: "tkj-38",
    question: "Port default yang digunakan oleh protokol HTTPS untuk komunikasi terenkripsi adalah?",
    options: ["21", "23", "80", "443", "8080"],
    correct: 2,
    difficulty: "advanced",
    skill: "Networking",
  },
  {
    id: "tkj-39",
    question: "Teknik NAT overload (PAT) pada router memungkinkan banyak host private untuk berkomunikasi dengan internet menggunakan?",
    options: [
      "Satu alamat IP publik yang dibedakan berdasarkan nomor port",
      "Setiap host harus memiliki IP publik masing-masing",
      "Satu MAC address untuk semua host",
      "Satu VLAN untuk semua komunikasi",
      "Protokol ICMP untuk setiap paket",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Networking",
  },
  {
    id: "tkj-40",
    question: "Dalam konfigurasi OSPF pada router, area 0 (area zero) berfungsi sebagai?",
    options: [
      "Backbone area yang menjadi pusat interkoneksi antar area OSPF",
      "Area khusus untuk manajemen wireless",
      "Area untuk subnet private saja",
      "Area cadangan jika backbone gagal",
      "Area yang hanya digunakan untuk DNS",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Networking",
  },

  // ============================================================
  // 5. CYBERSECURITY BASICS (tkj-41 — tkj-50)
  // ============================================================
  {
    id: "tkj-41",
    question: "Jenis serangan yang bertujuan membuat layanan tidak tersedia dengan mengirim lalu lintas data dalam jumlah besar disebut?",
    options: ["Phishing", "Brute Force", "DDoS (Distributed Denial of Service)", "SQL Injection", "Keylogger"],
    correct: 3,
    difficulty: "basic",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-42",
    question: "Teknik enkripsi yang menggunakan satu kunci baik untuk enkripsi maupun dekripsi disebut?",
    options: ["Asymmetric Encryption", "Symmetric Encryption", "Hashing", "Digital Signature", "Steganography"],
    correct: 4,
    difficulty: "basic",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-43",
    question: "Firewall berfungsi untuk?",
    options: [
      "Memfilter lalu lintas jaringan masuk dan keluar berdasarkan aturan keamanan",
      "Mempercepat koneksi internet",
      "Membuat backup data otomatis",
      "Mengelola user account",
      "Menginstal antivirus",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-44",
    question: "Serangan social engineering yang menggunakan email palsu untuk mencuri data sensitif disebut?",
    options: ["Spoofing", "Phishing", "Sniffing", "Spamming", "Defacing"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-45",
    question: "Port scanning adalah teknik yang digunakan untuk?",
    options: [
      "Mencari port terbuka pada target untuk menemukan celah keamanan",
      "Memindai barcode pada paket",
      "Memeriksa kesehatan hard disk",
      "Menghapus virus dari komputer",
      "Membuat laporan jaringan",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-46",
    question: "Vulnerability assessment bertujuan untuk?",
    options: [
      "Mengidentifikasi dan mengklasifikasikan kerentanan keamanan pada sistem",
      "Mempercepat performa server",
      "Membuat desain jaringan baru",
      "Menginstal patch otomatis",
      "Mengelola hak akses user",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-47",
    question: "Man-in-the-middle attack (MITM) dilakukan dengan cara?",
    options: [
      "Penyerang menyusup di antara dua pihak yang berkomunikasi untuk memotong atau memodifikasi data",
      "Penyerang mengirim email berisi virus ke banyak korban",
      "Penyerang menebak password dengan cara brute force",
      "Penyerang mengambil alih DNS server",
      "Penyerang membobol firewall dengan exploit",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-48",
    question: "IDS (Intrusion Detection System) berbeda dengan IPS (Intrusion Prevention System) karena?",
    options: [
      "IDS hanya mendeteksi dan memberi peringatan, sedangkan IPS dapat mendeteksi sekaligus memblokir serangan",
      "IDS bekerja lebih cepat dari IPS",
      "IPS tidak memerlukan konfigurasi firewall",
      "IDS hanya bekerja pada jaringan wireless",
      "IPS tidak memerlukan update signature",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-49",
    question: "Dalam kerangka kerja keamanan NIST Cybersecurity Framework, fungsi 'Identify' mencakup?",
    options: [
      "Memulihkan sistem setelah terjadi serangan",
      "Mendeteksi malware secara real-time",
      "Mengidentifikasi aset, risiko, dan kerentanan untuk memahami konteks keamanan organisasi",
      "Membuat aturan password baru",
      "Menginstal software keamanan pada semua komputer",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Cybersecurity Basics",
  },
  {
    id: "tkj-50",
    question: "Teknik lateral movement dalam serangan siber merujuk pada?",
    options: [
      "Serangan dari luar jaringan langsung ke server utama",
      "Penggunaan wireless untuk menembus firewall",
      "Pencurian data melalui email phishing",
      "Serangan brute force pada password admin",
      "Tindakan penyerang bergerak dari satu sistem yang telah dibobol ke sistem lain dalam jaringan yang sama",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Cybersecurity Basics",
  },

  // ============================================================
  // 6. VIRTUALIZATION (tkj-51 — tkj-60)
  // ============================================================
  {
    id: "tkj-51",
    question: "Perangkat lunak virtualisasi yang dikembangkan oleh VMware untuk lingkungan desktop disebut?",
    options: ["VirtualBox", "VMware Workstation", "QEMU", "Xen", "Proxmox"],
    correct: 0,
    difficulty: "basic",
    skill: "Virtualization",
  },
  {
    id: "tkj-52",
    question: "Virtualisasi memungkinkan sebuah komputer fisik menjalankan beberapa sistem operasi secara bersamaan dengan bantuan?",
    options: ["BIOS", "Bootloader", "Firmware", "Hypervisor", "Driver"],
    correct: 3,
    difficulty: "basic",
    skill: "Virtualization",
  },
  {
    id: "tkj-53",
    question: "Hypervisor Type 1 (bare-metal) berjalan langsung di atas hardware, contohnya adalah?",
    options: ["VMware ESXi", "VMware Workstation", "VirtualBox", "Parallels", "QEMU"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Virtualization",
  },
  {
    id: "tkj-54",
    question: "Snapshot pada mesin virtual berfungsi untuk?",
    options: [
      "Menyimpan kondisi mesin virtual pada waktu tertentu agar dapat dikembalikan",
      "Membuat copy fisik dari hard disk",
      "Meningkatkan performa CPU virtual",
      "Menghapus semua data virtual machine",
      "Membuat jaringan virtual baru",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Virtualization",
  },
  {
    id: "tkj-55",
    question: "Fitur VMware vMotion memungkinkan?",
    options: [
      "Memindahkan mesin virtual yang sedang berjalan antar host tanpa downtime",
      "Menghapus mesin virtual secara permanen",
      "Membuat template baru untuk instalasi",
      "Mengatur firewall virtual",
      "Mengakses BIOS dari dalam VM",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Virtualization",
  },
  {
    id: "tkj-56",
    question: "Jenis virtualisasi yang mensimulasikan perangkat keras komputer lengkap untuk menjalankan OS tamu disebut?",
    options: ["Para-virtualization", "Full Virtualization", "OS-level Virtualization", "Application Virtualization", "Desktop Virtualization"],
    correct: 2,
    difficulty: "advanced",
    skill: "Virtualization",
  },
  {
    id: "tkj-57",
    question: "Containerisasi berbeda dari virtualisasi tradisional karena?",
    options: [
      "Container berbagi kernel host OS dan hanya mengisolasi aplikasi, tidak menjalankan OS penuh",
      "Container memiliki hypervisor sendiri",
      "Container tidak memerlukan sistem operasi sama sekali",
      "Container berjalan lebih lambat dari VM",
      "Container tidak bisa dijalankan di Linux",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Virtualization",
  },
  {
    id: "tkj-58",
    question: "Pada konfigurasi virtual network, mode bridged memungkinkan VM untuk?",
    options: [
      "Mendapatkan IP address dari DHCP server yang sama dengan host fisik",
      "Hanya berkomunikasi dengan VM lain di host yang sama",
      "Berjalan tanpa koneksi jaringan",
      "Menggunakan IP statis tanpa konfigurasi",
      "Mengakses internet tanpa NAT",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Virtualization",
  },
  {
    id: "tkj-59",
    question: "Fitur High Availability (HA) pada VMware vSphere Cluster berfungsi untuk?",
    options: [
      "Secara otomatis memulihkan mesin virtual ke host lain jika terjadi kegagalan host",
      "Membuat clone dari mesin virtual",
      "Meningkatkan jumlah CPU virtual",
      "Menghapus mesin virtual yang tidak aktif",
      "Membuat backup ke cloud",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Virtualization",
  },
  {
    id: "tkj-60",
    question: "Resource pool pada cluster virtualisasi memungkinkan administrator untuk?",
    options: [
      "Mengalokasikan dan membatasi CPU, memory, dan storage untuk sekelompok VM secara hierarkis",
      "Membuat laporan penggunaan resource",
      "Menghapus VM yang sudah tidak digunakan",
      "Mengatur jaringan antar cluster",
      "Membuat user account baru",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Virtualization",
  },

  // ============================================================
  // 7. SHELL SCRIPTING (tkj-61 — tkj-70)
  // ============================================================
  {
    id: "tkj-61",
    question: "Shell scripting pada Linux menggunakan bahasa skrip yang paling umum adalah?",
    options: ["Bash", "VBScript", "C#", "Java", "PowerShell"],
    correct: 1,
    difficulty: "basic",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-62",
    question: "Untuk menjalankan file skrip Bash di Linux, perintah yang digunakan adalah?",
    options: ["run script.sh", "bash script.sh", "exec script.sh", "start script.sh", "cmd script.sh"],
    correct: 2,
    difficulty: "basic",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-63",
    question: "Variabel dalam Bash dideklarasikan tanpa spasi di sekitar tanda sama dengan, contoh yang benar adalah?",
    options: ["$name = Linux", "name = Linux", "name=Linux", "$name:=Linux", "set name=Linux"],
    correct: 3,
    difficulty: "intermediate",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-64",
    question: "Perintah conditional if-elif-else dalam Bash ditulis dengan sintaks?",
    options: [
      "if [ kondisi ]; then ... elif [ kondisi ]; then ... else ... fi",
      "if (kondisi) { ... } elseif (kondisi) { ... } else { ... }",
      "if kondisi then ... elif kondisi then ... else ... endif",
      "when kondisi do ... elseif kondisi do ... else ... done",
      "case kondisi if ... elif ... else ... esac",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-65",
    question: "Looping dalam Bash yang mengulangi perintah untuk setiap item dalam sebuah list menggunakan?",
    options: ["for x in list; do ... done", "foreach x list { ... }", "loop list as x { ... }", "repeat x in list { ... }", "do while list x { ... }"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-66",
    question: "Operator `$?` dalam Bash digunakan untuk mengecek?",
    options: ["Nilai variabel", "Exit status dari perintah terakhir yang dieksekusi", "Jumlah argumen", "Nama user saat ini", "Lokasi direktori kerja"],
    correct: 3,
    difficulty: "advanced",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-67",
    question: "Cron job pada Linux digunakan untuk menjalankan skrip secara otomatis sesuai jadwal yang ditentukan. File crontab diakses dengan perintah?",
    options: ["cron -list", "crontab -e", "cronedit", "nano /etc/crontab -u", "scheduler -view"],
    correct: 0,
    difficulty: "advanced",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-68",
    question: "Perintah `grep -r 'pattern' /etc/` dalam Bash berfungsi untuk?",
    options: [
      "Mencari string 'pattern' secara rekursif di dalam semua file di direktori /etc/",
      "Menghapus semua file di /etc/",
      "Mengganti semua teks 'pattern' dengan teks baru",
      "Membuat backup direktori /etc/",
      "Mengompresi semua file di /etc/",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-69",
    question: "Konsep pipes (`|`) dalam Bash memungkinkan?",
    options: [
      "Menjalankan dua perintah secara paralel",
      "Menghubungkan output satu perintah sebagai input perintah berikutnya secara berurutan",
      "Menyimpan output ke dalam variabel",
      "Membuat direktori baru",
      "Mengeksekusi perintah secara terbalik",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Shell Scripting",
  },
  {
    id: "tkj-70",
    question: "Untuk menangkap input dari pengguna dalam Bash script dan menyimpannya ke variabel, digunakan perintah?",
    options: ["read -p 'Masukkan input: ' variabel", "input 'Masukkan input: ' variabel", "get 'Masukkan input: ' variabel", "scan 'Masukkan input: ' variabel", "ask 'Masukkan input: ' variabel"],
    correct: 4,
    difficulty: "expert",
    skill: "Shell Scripting",
  },

  // ============================================================
  // 8. HARDWARE TROUBLESHOOTING (tkj-71 — tkj-80)
  // ============================================================
  {
    id: "tkj-71",
    question: "Komponen komputer yang berfungsi sebagai 'otak' dan menjalankan instruksi program disebut?",
    options: ["RAM", "Hard Disk", "CPU (Central Processing Unit)", "GPU", "Power Supply"],
    correct: 2,
    difficulty: "basic",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-72",
    question: "Perangkat yang berfungsi mengubah arus AC dari listrik menjadi arus DC yang dibutuhkan komponen komputer adalah?",
    options: ["Motherboard", "CPU", "RAM", "Power Supply Unit (PSU)", "Hard Disk"],
    correct: 3,
    difficulty: "basic",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-73",
    question: "Jika komputer tidak menyala sama sekali setelah tombol power ditekan, komponen yang paling mungkin mengalami kerusakan adalah?",
    options: ["Monitor", "Keyboard", "Power Supply Unit (PSU)", "Mouse", "Speaker"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-74",
    question: "Beep code pada POST (Power-On Self-Test) yang berbunyi satu panjang dan tiga pendek menandakan?",
    options: [
      "Kerusakan pada memori (RAM) atau masalah video adapter",
      "Hard disk tidak terdeteksi",
      "Prosesor tidak berfungsi",
      "Kipas CPU tidak berputar",
      "CD-ROM tidak terbaca",
    ],
    correct: 4,
    difficulty: "intermediate",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-75",
    question: "Jenis kerusakan hard disk yang menyebabkan bad sector disebabkan oleh?",
    options: [
      "Terlalu banyak file yang disimpan",
      "Penggunaan yang terus-menerus, panas berlebih, atau benturan fisik",
      "RAM yang tidak cukup",
      "Suhu ruangan yang terlalu dingin",
      "Koneksi internet yang lambat",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-76",
    question: "Komponen GPU (Graphics Processing Unit) yang mengalami artifacting akan menampilkan gejala berupa?",
    options: [
      "Garis-garis aneh, piksel rusak, atau distorsi warna pada tampilan layar",
      "Komputer mati total",
      "Suara bising dari dalam casing",
      "Hard disk tidak terdeteksi",
      "Keyboard tidak berfungsi",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-77",
    question: "Untuk menguji kesehatan hard disk secara profesional, tool diagnostik yang banyak digunakan adalah?",
    options: ["MemTest86", "CrystalDiskInfo / CrystalDiskMark", "CPU-Z", "FurMark", "HWMonitor"],
    correct: 4,
    difficulty: "advanced",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-78",
    question: "RAM yang mengalami error pada modul tertentu dapat dideteksi dengan menggunakan tool diagnostik?",
    options: ["FurMark", "CrystalDiskInfo", "MemTest86+", "3DMark", "GPU-Z"],
    correct: 2,
    difficulty: "advanced",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-79",
    question: "Thermal throttling pada CPU terjadi ketika?",
    options: [
      "Suhu CPU mencapai batas tertentu sehingga clock speed diturunkan untuk mencegah kerusakan",
      "RAM terlalu penuh dengan data",
      "Hard disk mengalami fragmentasi",
      "Power supply tidak stabil",
      "Koneksi jaringan terputus",
    ],
    correct: 0,
    difficulty: "expert",
    skill: "Hardware Troubleshooting",
  },
  {
    id: "tkj-80",
    question: "Teknik reballing pada GPU laptop dilakukan untuk mengatasi masalah?",
    options: [
      "Koneksi solder BGA (Ball Grid Array) pada GPU yang longgar akibat panas berlebih",
      "Hard disk yang mengalami bad sector",
      "RAM yang tidak kompatibel",
      "Keyboard yang tidak berfungsi",
      "Layar yang berkedip",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "Hardware Troubleshooting",
  },

  // ============================================================
  // 9. DATABASE MANAGEMENT (tkj-81 — tkj-90)
  // ============================================================
  {
    id: "tkj-81",
    question: "Sistem Manajemen Basis Data (DBMS) yang merupakan produk open-source dan banyak digunakan pada web server Linux adalah?",
    options: ["Oracle Database", "Microsoft SQL Server", "MySQL/MariaDB", "DB2", "Access"],
    correct: 0,
    difficulty: "basic",
    skill: "Database Management",
  },
  {
    id: "tkj-82",
    question: "Perintah SQL untuk mengambil data dari tabel disebut?",
    options: ["INSERT", "SELECT", "UPDATE", "DELETE", "CREATE"],
    correct: 1,
    difficulty: "basic",
    skill: "Database Management",
  },
  {
    id: "tkj-83",
    question: "Perintah SQL untuk memperbarui data yang sudah ada dalam tabel adalah?",
    options: ["SELECT", "INSERT", "ALTER", "UPDATE", "DROP"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Database Management",
  },
  {
    id: "tkj-84",
    question: "Normalisasi dalam database bertujuan untuk?",
    options: [
      "Mengurangi data duplikat dan meningkatkan integritas data dengan memecah tabel menjadi tabel-tabel yang saling terkait",
      "Membuat query lebih lambat",
      "Menambah jumlah kolom pada tabel",
      "Menghapus semua index dari database",
      "Membuat tabel menjadi lebih kompleks",
    ],
    correct: 3,
    difficulty: "intermediate",
    skill: "Database Management",
  },
  {
    id: "tkj-85",
    question: "Perintah SQL untuk menggabungkan data dari dua tabel berdasarkan kolom yang berhubungan disebut?",
    options: ["GROUP BY", "ORDER BY", "JOIN", "UNION", "HAVING"],
    correct: 4,
    difficulty: "intermediate",
    skill: "Database Management",
  },
  {
    id: "tkj-86",
    question: "Primary Key pada database berfungsi untuk?",
    options: [
      "Menjadi pengenal unik untuk setiap record/baris dalam tabel",
      "Mengurutkan data berdasarkan abjad",
      "Menyimpan data dalam format terenkripsi",
      "Membuat backup otomatis",
      "Menghapus data duplikat",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Database Management",
  },
  {
    id: "tkj-87",
    question: "Index pada database digunakan untuk?",
    options: [
      "Mempercepat proses pencarian dan query data",
      "Mengurangi ukuran database",
      "Membuat tabel baru secara otomatis",
      "Mengenkripsi data",
      "Membuat relasi antar tabel",
    ],
    correct: 1,
    difficulty: "advanced",
    skill: "Database Management",
  },
  {
    id: "tkj-88",
    question: "Perintah SQL berikut yang digunakan untuk membuat tabel baru dengan struktur tertentu adalah?",
    options: ["CREATE TABLE", "INSERT INTO", "ALTER TABLE", "DROP TABLE", "SELECT INTO"],
    correct: 2,
    difficulty: "advanced",
    skill: "Database Management",
  },
  {
    id: "tkj-89",
    question: "ACID dalam database merujuk pada empat sifat transaksi, yaitu?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Integrity, Data",
      "Automated, Configured, Installed, Deployed",
      "Authentication, Connection, Identification, Division",
      "Aggregate, Computed, Indexed, Dynamic",
    ],
    correct: 3,
    difficulty: "expert",
    skill: "Database Management",
  },
  {
    id: "tkj-90",
    question: "Replication pada MySQL memungkinkan?",
    options: [
      "Menyalin data dari server database utama ke server lain secara otomatis untuk ketersediaan dan redundansi",
      "Menghapus semua data dari database",
      "Membuat user account baru",
      "Mengubah struktur tabel",
      "Menginstal MySQL pada komputer baru",
    ],
    correct: 4,
    difficulty: "expert",
    skill: "Database Management",
  },

  // ============================================================
  // 10. CLOUD BASICS — AWS/AZURE (tkj-91 — tkj-100)
  // ============================================================
  {
    id: "tkj-91",
    question: "Amazon Web Services (AWS) adalah layanan cloud computing yang dikembangkan oleh?",
    options: ["Microsoft", "Google", "Amazon", "IBM", "Oracle"],
    correct: 3,
    difficulty: "basic",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-92",
    question: "Layanan IaaS (Infrastructure as a Service) pada cloud computing menyediakan?",
    options: [
      "Virtualisasi server, penyimpanan, dan jaringan yang dapat dikonfigurasi sesuai kebutuhan",
      "Hanya software aplikasi siap pakai",
      "Hanya penyimpanan data saja",
      "Hanya layanan email",
      "Hanya layanan streaming video",
    ],
    correct: 0,
    difficulty: "basic",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-93",
    question: "Layanan AWS EC2 (Elastic Compute Cloud) digunakan untuk?",
    options: [
      "Menyewa dan menjalankan virtual server (instance) di cloud AWS",
      "Menyimpan file di cloud",
      "Mengirim email",
      "Membuat website statis",
      "Menganalisis data big data",
    ],
    correct: 1,
    difficulty: "intermediate",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-94",
    question: "Microsoft Azure adalah platform cloud computing yang menyediakan layanan computing, storage, dan networking melalui?",
    options: [
      "Data center global Microsoft yang terhubung melalui internet",
      "Server fisik yang disewakan langsung ke pengguna",
      "Jaringan peer-to-peer terdesentralisasi",
      "Satu data center yang berada di satu lokasi saja",
      "Koneksi radio frekuensi tinggi",
    ],
    correct: 2,
    difficulty: "intermediate",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-95",
    question: "AWS S3 (Simple Storage Service) merupakan layanan penyimpanan objek yang cocok untuk?",
    options: [
      "Menyimpan backup, log aplikasi, static website, dan file multimedia",
      "Menjalankan database relasional",
      "Menjalankan aplikasi desktop",
      "Mengelola DNS domain",
      "Membuat VPN tunnel",
    ],
    correct: 0,
    difficulty: "intermediate",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-96",
    question: "Pada AWS, Virtual Private Cloud (VPC) memungkinkan pengguna untuk?",
    options: [
      "Membuat jaringan virtual yang terisolasi dan terkontrol di dalam cloud AWS",
      "Menyewa server fisik di data center AWS",
      "Menginstal Windows langsung pada hardware AWS",
      "Membuat user account email",
      "Membeli domain name langsung dari AWS",
    ],
    correct: 3,
    difficulty: "advanced",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-97",
    question: "Azure Active Directory (Azure AD) berbeda dari Active Directory lokal karena?",
    options: [
      "Azure AD berbasis cloud dan mendukung autentikasi untuk aplikasi SaaS modern seperti Microsoft 365",
      "Azure AD hanya bisa digunakan untuk komputer lokal",
      "Azure AD tidak mendukung multi-factor authentication",
      "Azure AD tidak memiliki fitur manajemen user",
      "Azure AD hanya tersedia untuk komputer Mac",
    ],
    correct: 4,
    difficulty: "advanced",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-98",
    question: "Lambda Function pada AWS merupakan contoh layanan?",
    options: [
      "Serverless Computing yang menjalankan kode tanpa mengelola server",
      "Penyimpanan database relasional",
      "Layanan CDN global",
      "Mesin virtual khusus gaming",
      "Layanan email enterprise",
    ],
    correct: 0,
    difficulty: "advanced",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-99",
    question: "Auto Scaling Group pada AWS memungkinkan infrastruktur cloud untuk?",
    options: [
      "Secara otomatis menambah atau mengurangi jumlah instance berdasarkan beban kerja",
      "Menghapus semua instance secara permanen",
      "Membuat instance baru secara manual",
      "Mengunci konfigurasi jaringan",
      "Menghapus semua data penyimpanan",
    ],
    correct: 2,
    difficulty: "expert",
    skill: "Cloud Basics (AWS/Azure)",
  },
  {
    id: "tkj-100",
    question: "Multi-region deployment pada cloud computing bertujuan untuk?",
    options: [
      "Meningkatkan ketersediaan aplikasi dan performa dengan mendekatkan layanan ke pengguna di berbagai wilayah geografis",
      "Mengurangi biaya infrastruktur",
      "Membuat backup hanya di satu lokasi",
      "Membatasi akses hanya untuk satu negara",
      "Membuat aplikasi berjalan lebih lambat",
    ],
    correct: 1,
    difficulty: "expert",
    skill: "Cloud Basics (AWS/Azure)",
  },
];

const transmisiQuiz: QuizQuestion[] = [
  // ==================== 1. NETWORKING BASICS (tt-01 to tt-10) ====================
  {
    id: "tt-01",
    question: "Apa kepanjangan dari LAN?",
    options: ["Local Area Network", "Long Area Network", "Large Access Network", "Layered Area Network", "Local Access Node"],
    correct: 0,
    difficulty: "basic",
    skill: "Networking Basics"
  },
  {
    id: "tt-02",
    question: "Perangkat jaringan yang berfungsi menghubungkan beberapa jaringan dan mengirim paket data berdasarkan alamat IP disebut?",
    options: ["Hub", "Switch", "Router", "Repeater", "Bridge"],
    correct: 2,
    difficulty: "basic",
    skill: "Networking Basics"
  },
  {
    id: "tt-03",
    question: "Topologi jaringan yang memiliki satu titik pusat tempat semua perangkat terhubung secara langsung disebut topologi?",
    options: ["Mesh", "Ring", "Bus", "Star", "Tree"],
    correct: 3,
    difficulty: "intermediate",
    skill: "Networking Basics"
  },
  {
    id: "tt-04",
    question: "Dalam model OSI, layer yang bertanggung jawab untuk enkripsi dan dekripsi data disebut?",
    options: ["Session Layer", "Transport Layer", "Presentation Layer", "Application Layer", "Data Link Layer"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Networking Basics"
  },
  {
    id: "tt-05",
    question: "Fungsi utama dari protokol ARP dalam jaringan adalah?",
    options: ["Menerjemahkan nama domain ke alamat IP", "Menerjemahkan alamat IP ke alamat MAC", "Mengatur koneksi TCP", "Mengenkripsi data yang dikirim", "Mengatur routing paket data"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Networking Basics"
  },
  {
    id: "tt-06",
    question: "Manakah yang merupakan private IP address yang valid berdasarkan RFC 1918?",
    options: ["172.32.1.1", "192.168.256.1", "172.16.0.1", "10.0.0.256", "192.169.1.1"],
    correct: 2,
    difficulty: "advanced",
    skill: "Networking Basics"
  },
  {
    id: "tt-07",
    question: "Dalam subnetting, jika suatu jaringan menggunakan subnet mask /26, berapa jumlah host yang tersedia di setiap subnet?",
    options: ["128", "64", "32", "62", "30"],
    correct: 3,
    difficulty: "advanced",
    skill: "Networking Basics"
  },
  {
    id: "tt-08",
    question: "Teknik yang digunakan untuk menggabungkan beberapa link fisik menjadi satu link logis yang memiliki throughput lebih tinggi disebut?",
    options: ["Port Forwarding", "Link Aggregation", "Network Address Translation", "Virtual Private Network", "Dynamic Host Configuration"],
    correct: 1,
    difficulty: "advanced",
    skill: "Networking Basics"
  },
  {
    id: "tt-09",
    question: "Konsep SDN (Software Defined Networking) memisahkan kontrol plane dari data plane. Komponen yang bertanggung jawab mengelola keputusan routing secara terpusat disebut?",
    options: ["Switch", "Router", "SDN Controller", "Firewall", "Gateway"],
    correct: 2,
    difficulty: "expert",
    skill: "Networking Basics"
  },
  {
    id: "tt-10",
    question: "Dalam arsitektur jaringan MPLS, label yang digunakan untuk mengidentifikasi Forwarding Equivalence Class (FEC) memiliki ukuran bit adalah?",
    options: ["8 bit", "16 bit", "20 bit", "32 bit", "64 bit"],
    correct: 2,
    difficulty: "expert",
    skill: "Networking Basics"
  },

  // ==================== 2. CISCO IOS (tt-11 to tt-20) ====================
  {
    id: "tt-11",
    question: "Mode operasi default saat pertama kali mengakses console Cisco router disebut?",
    options: ["Privileged EXEC Mode", "Global Configuration Mode", "User EXEC Mode", "Interface Configuration Mode", "ROM Monitor Mode"],
    correct: 2,
    difficulty: "basic",
    skill: "Cisco IOS"
  },
  {
    id: "tt-12",
    question: "Perintah Cisco IOS untuk menampilkan seluruh konfigurasi yang sedang berjalan di RAM adalah?",
    options: ["show startup-config", "show running-config", "show version", "show interfaces", "show ip route"],
    correct: 1,
    difficulty: "basic",
    skill: "Cisco IOS"
  },
  {
    id: "tt-13",
    question: "Untuk mengonfigurasi alamat IP pada interface FastEthernet0/0, perintah yang tepat adalah?",
    options: ["interface f0/0; ip address 192.168.1.1 255.255.255.0; shutdown", "interface f0/0; ip address 192.168.1.1 255.255.255.0; no shutdown", "ip interface f0/0 192.168.1.1 255.255.255.0", "set ip f0/0 192.168.1.1 255.255.255.0", "configure ip f0/0 192.168.1.1/24"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Cisco IOS"
  },
  {
    id: "tt-14",
    question: "Perintah Cisco IOS untuk mengatur banner login yang akan ditampilkan saat pengguna mengakses perangkat adalah?",
    options: ["banner message 'Selamat Datang'", "banner login #Selamat Datang#", "set banner selamat datang", "login banner welcome", "message-of-the-day selamat datang"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Cisco IOS"
  },
  {
    id: "tt-15",
    question: "Konfigurasi DHCP pool pada Cisco router menggunakan perintah-mode sebagai berikut?",
    options: ["ip dhcp pool NAME; network NETWORK SUBNET; default-router GATEWAY", "dhcp pool create NAME; set network; set gateway", "service dhcp; pool NAME; ip network", "dhcp server NAME; add network; add gateway", "ip dhcp server NAME network SUBNET"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Cisco IOS"
  },
  {
    id: "tt-16",
    question: "Untuk mengamankan akses privileged EXEC mode dengan kata sandi enkripsi, perintah yang digunakan adalah?",
    options: ["enable password mypassword", "enable secret mypassword", "privileged password mypassword", "secret enable mypassword", "security password mypassword"],
    correct: 1,
    difficulty: "advanced",
    skill: "Cisco IOS"
  },
  {
    id: "tt-17",
    question: "Konfigurasi Static NAT pada Cisco router ditulis dengan syntax sebagai berikut?",
    options: ["ip nat inside source static LOCAL_IP PUBLIC_IP", "nat static add LOCAL_IP PUBLIC_IP", "ip nat static map LOCAL_IP to PUBLIC_IP", "static nat translate LOCAL_IP PUBLIC_IP", "ip nat inside static LOCAL_IP PUBLIC_IP"],
    correct: 0,
    difficulty: "advanced",
    skill: "Cisco IOS"
  },
  {
    id: "tt-18",
    question: "Perintah Cisco IOS untuk melakukan backup konfigurasi ke TFTP server adalah?",
    options: ["copy running-config tftp:", "backup config tftp", "save config to tftp", "write tftp", "tftp copy running-config"],
    correct: 0,
    difficulty: "advanced",
    skill: "Cisco IOS"
  },
  {
    id: "tt-19",
    question: "Untuk melakukan password recovery pada Cisco router agar tidak loading startup-config saat boot, perintah yang digunakan di ROMMON adalah?",
    options: ["confreg 0x2142", "config-register 0x2100", "rommon> reset -noconfig", "boot skip-config", "register 0x2142"],
    correct: 0,
    difficulty: "expert",
    skill: "Cisco IOS"
  },
  {
    id: "tt-20",
    question: "Implementasi OSPF dengan multi-area pada Cisco router, perintah untuk mengaktifkan OSPF dan menetapkan area pada interface adalah?",
    options: ["router ospf 1; network IP_AREA AREA", "ip ospf process area AREA interface IF", "ospf enable area AREA on interface", "routing ospf 1; area AREA interface IF", "router ospf process-id; network address wildcard-mask area area-id"],
    correct: 4,
    difficulty: "expert",
    skill: "Cisco IOS"
  },

  // ==================== 3. FIBER OPTICS (tt-21 to tt-30) ====================
  {
    id: "tt-21",
    question: "Jenis serat optik yang memiliki satu mode propagasi cahaya disebut?",
    options: ["Multi-mode", "Single-mode", "Dual-mode", "Multi-path", "Core-mode"],
    correct: 1,
    difficulty: "basic",
    skill: "Fiber Optics"
  },
  {
    id: "tt-22",
    question: "Satuan yang digunakan untuk mengukur kekuatan sinyal cahaya pada serat optik disebut?",
    options: ["Watt", "Decibel-miliwatt (dBm)", "Hertz", "Volt", "Ohm"],
    correct: 1,
    difficulty: "basic",
    skill: "Fiber Optics"
  },
  {
    id: "tt-23",
    question: "Standar serat optik multi-mode yang paling banyak digunakan untuk jarak hingga 2 km dengan kecepatan tinggi adalah?",
    options: ["OM1", "OM2", "OM3", "OS1", "OS2"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Fiber Optics"
  },
  {
    id: "tt-24",
    question: "Pada splicing serat optik, kerugian loss yang dihasilkan oleh metode fusion splicing umumnya berkisar?",
    options: ["0.5 - 1.0 dB", "0.1 - 0.5 dB", "0.01 - 0.05 dB", "1.0 - 2.0 dB", "2.0 - 5.0 dB"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Fiber Optics"
  },
  {
    id: "tt-25",
    question: "Alat yang digunakan untuk mengukur panjang serat optik, titik putus, dan tingkat kerusakan pada serat disebut?",
    options: ["Optical Power Meter", "OTDR (Optical Time Domain Reflectometer)", "Fusion Splicer", "Light Source", "Visual Fault Locator"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Fiber Optics"
  },
  {
    id: "tt-26",
    question: "Pada kabel serat optik dark fiber, istilah 'attenuation' mengacu pada?",
    options: ["Peningkatan intensitas cahaya seiring jarak", "Penurunan kekuatan sinyal cahaya seiring jarak", "Pemantulan cahaya di dalam core", "Distorsi sinyal akibat chromatic dispersion", "Kehilangan sinyal akibat connectors yang longgar"],
    correct: 1,
    difficulty: "advanced",
    skill: "Fiber Optics"
  },
  {
    id: "tt-27",
    question: "Dalam Wavelength Division Multiplexing (WDM) pada serat optik, jumlah channel yang dapat ditransmisikan secara bersamaan pada CWDM umumnya adalah?",
    options: ["Hingga 4 channel", "Hingga 8 channel", "Hingga 18 channel", "Hingga 64 channel", "Hingga 160 channel"],
    correct: 2,
    difficulty: "advanced",
    skill: "Fiber Optics"
  },
  {
    id: "tt-28",
    question: "Pengujian_Insertion Loss pada kabel serat optik connector mengacu pada berapa banyak sinyal yang hilang saat cahaya melewati connector tersebut. Standar insertion loss yang baik untuk connector LC adalah?",
    options: ["Kurang dari 0.5 dB", "Kurang dari 0.3 dB", "Kurang dari 1.0 dB", "Kurang dari 0.1 dB", "Kurang dari 2.0 dB"],
    correct: 1,
    difficulty: "advanced",
    skill: "Fiber Optics"
  },
  {
    id: "tt-29",
    question: "Pada jaringan FTTH (Fiber To The Home), arsitektur jaringan yang menggunakan splitter pasif untuk membagi sinyal dari satu OLT ke banyak ONT disebut?",
    options: ["Active Ethernet", "Point-to-Point (P2P)", "Passive Optical Network (PON)", "Wavelength Division Multiplexing", "Cable Television (CATV) Network"],
    correct: 2,
    difficulty: "expert",
    skill: "Fiber Optics"
  },
  {
    id: "tt-30",
    question: "Standar ITU-T untuk GPON (Gigabit PON) yang mendefinisikan downstream 2.488 Gbps dan upstream 1.244 Gbps adalah?",
    options: ["ITU-T G.984", "ITU-T G.983", "ITU-T G.987", "ITU-T G.989", "ITU-T G.985"],
    correct: 0,
    difficulty: "expert",
    skill: "Fiber Optics"
  },

  // ==================== 4. MIKROTIK (tt-31 to tt-40) ====================
  {
    id: "tt-31",
    question: "Sistem operasi berbasis Linux yang digunakan pada perangkat jaringan MikroTik disebut?",
    options: ["RouterOS", "SwitchOS", "NetOS", "MikroTOS", "Linux Router"],
    correct: 0,
    difficulty: "basic",
    skill: "Mikrotik"
  },
  {
    id: "tt-32",
    question: "Aplikasi desktop yang digunakan untuk mengelola perangkat MikroTik dari jarak jauh melalui GUI disebut?",
    options: ["MikroTik Manager", "WinBox", "MikroTik WebControl", "RouterConfig", "NetManager"],
    correct: 1,
    difficulty: "basic",
    skill: "Mikrotik"
  },
  {
    id: "tt-33",
    question: "Pada MikroTik RouterOS, perintah CLI untuk melihat semua interface yang aktif adalah?",
    options: ["/interface print", "/system print", "/ip print", "/interface monitor", "/show interfaces"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Mikrotik"
  },
  {
    id: "tt-34",
    question: "Fitur MikroTik yang berfungsi membatasi bandwidth pengguna berdasarkan profil yang telah ditetapkan disebut?",
    options: ["Queues", "Hotspot", "Firewall", "DHCP Server", "DNS Cache"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Mikrotik"
  },
  {
    id: "tt-35",
    question: "Untuk melakukan NAT (Network Address Translation) masuk di MikroTik agar komputer di dalam jaringan lokal dapat mengakses internet, tipe NAT yang digunakan adalah?",
    options: ["srcnat", "dstnat", "masquerade input", "forward nat", "redirect"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Mikrotik"
  },
  {
    id: "tt-36",
    question: "Fitur hotspot MikroTik yang mengharuskan pengguna login melalui halaman web sebelum mengakses internet disebut?",
    options: ["Captive Portal", "RADIUS Authentication", "PPPoE Server", "DHCP Relay", "Web Proxy"],
    correct: 0,
    difficulty: "advanced",
    skill: "Mikrotik"
  },
  {
    id: "tt-37",
    question: "Pada konfigurasi bandwidth management MikroTik menggunakan Queue Tree, parent queue yang digunakan untuk membatasi total bandwidth upstream interface adalah?",
    options: ["global-in", "global-out", "global-total", "interface-queue", "upload-queue"],
    correct: 1,
    difficulty: "advanced",
    skill: "Mikrotik"
  },
  {
    id: "tt-38",
    question: "Protokol routing yang dapat dikonfigurasi pada MikroTik untuk membangun VPN tunnel antara dua site dengan enkripsi IPsec disebut?",
    options: ["L2TP with IPsec", "GRE with IPsec", "SSTP", "PPTP", "IPIP Tunnel"],
    correct: 1,
    difficulty: "advanced",
    skill: "Mikrotik"
  },
  {
    id: "tt-39",
    question: "Fitur RouterOS v7 yang memungkinkan pembuatan firewall rules dengan menggunakan parser rules stateful yang lebih efisien disebut?",
    options: ["FastTrack", "Connection Tracking v2", "Firewall Optimizer", "Flow Control", "Packet Accelerator"],
    correct: 0,
    difficulty: "expert",
    skill: "Mikrotik"
  },
  {
    id: "tt-40",
    question: "Pada RouterOS, fitur yang memungkinkan load balancing secara automatic dengan menggunakan ECMP (Equal Cost Multi-Path) memerlukan konfigurasi pada menu?",
    options: ["/ip route dengan multiple gateways", "/interface bonding", "/routing bgp", "/ip dhcp-client", "/ip firewall nat"],
    correct: 0,
    difficulty: "expert",
    skill: "Mikrotik"
  },

  // ==================== 5. WIRELESS TECHNOLOGY (tt-41 to tt-50) ====================
  {
    id: "tt-41",
    question: "Standar IEEE 802.11 yang beroperasi pada frekuensi 5 GHz dan mendukung kecepatan hingga 54 Mbps disebut?",
    options: ["802.11b", "802.11g", "802.11a", "802.11n", "802.11ac"],
    correct: 2,
    difficulty: "basic",
    skill: "Wireless Technology"
  },
  {
    id: "tt-42",
    question: "Istilah yang digunakan untuk menggambarkan area cakupan sinyal wireless dari access point disebut?",
    options: ["Frequency range", "Signal strength", "Coverage area", "Channel width", "Transmission power"],
    correct: 2,
    difficulty: "basic",
    skill: "Wireless Technology"
  },
  {
    id: "tt-43",
    question: "Pada wireless networking, teknik yang digunakan untuk menggabungkan beberapa channel menjadi satu channel yang lebih lebar untuk meningkatkan throughput disebut?",
    options: ["Channel bonding", "Frequency hopping", "Spread spectrum", "Preamble detection", "Beacon management"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Wireless Technology"
  },
  {
    id: "tt-44",
    question: "Pada standar 802.11n, teknologi yang menggunakan beberapa antena untuk transmit dan receive secara bersamaan disebut?",
    options: ["DSSS", "OFDM", "MIMO", "FHSS", "CDMA"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Wireless Technology"
  },
  {
    id: "tt-45",
    question: "Metode akses wireless yang digunakan untuk mengurangi collision pada jaringan wireless disebut?",
    options: ["CSMA/CD", "CSMA/CA", "TDMA", "Token Passing", "Polling"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Wireless Technology"
  },
  {
    id: "tt-46",
    question: "Access point wireless yang dikonfigurasi untuk meneruskan data dari satu client ke access point lain disebut sebagai?",
    options: ["Repeater", "Bridge", "Client Mode", "WDS Bridge", "Access Point Mode"],
    correct: 0,
    difficulty: "advanced",
    skill: "Wireless Technology"
  },
  {
    id: "tt-47",
    question: "Pada wireless MikroTik, fitur yang memungkinkan pembagian bandwidth per-user secara otomatis pada wireless interface disebut?",
    options: ["Nstreme", "NV2", "Bandwidth Test", "Queue Simple", "Wireless QoS"],
    correct: 1,
    difficulty: "advanced",
    skill: "Wireless Technology"
  },
  {
    id: "tt-48",
    question: "Teknologi 802.11ax (Wi-Fi 6) menggunakan teknik yang memungkinkan access point berkomunikasi dengan banyak client secara bersamaan pada waktu yang sama disebut?",
    options: ["OFDM", "MU-MIMO", "OFDMA", "Beamforming", "QAM"],
    correct: 2,
    difficulty: "advanced",
    skill: "Wireless Technology"
  },
  {
    id: "tt-49",
    question: "Pada wireless point-to-point (PtP) jarak jauh, faktor utama yang menentukan keberhasilan transmisi selain kekuatan sinyal adalah?",
    options: ["Ukuran antena dan line of sight (LoS)", "Jumlah client yang terkoneksi", "Kecepatan clock processor AP", "Tipe kabel yang digunakan", "Jumlah SSID yang dikonfigurasi"],
    correct: 0,
    difficulty: "expert",
    skill: "Wireless Technology"
  },
  {
    id: "tt-50",
    question: "Channel utilization pada wireless dapat ditingkatkan dengan mengurangi idle time pada setiap frame. Teknik yang memungkinkan hal ini disebut?",
    options: ["TXOP (Transmission Opportunity)", "AIFS (Arbitration Inter-Frame Spacing)", "RTS/CTS", "Fragmentation", "Aggregation (A-MSDU/A-MPDU)"],
    correct: 3,
    difficulty: "expert",
    skill: "Wireless Technology"
  },

  // ==================== 6. TCP/IP (tt-51 to tt-60) ====================
  {
    id: "tt-51",
    question: "Apa kepanjangan dari TCP?",
    options: ["Transmission Control Protocol", "Transfer Connection Protocol", "Telecom Communication Protocol", "Transmission Central Protocol", "Transport Control Protocol"],
    correct: 0,
    difficulty: "basic",
    skill: "TCP/IP"
  },
  {
    id: "tt-52",
    question: "Port number yang digunakan oleh protokol HTTP secara default adalah?",
    options: ["21", "25", "80", "443", "8080"],
    correct: 2,
    difficulty: "basic",
    skill: "TCP/IP"
  },
  {
    id: "tt-53",
    question: "Pada model TCP/IP, layer yang bertanggung jawab mengirim paket dari host sumber ke host tujuan disebut?",
    options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Interface Layer", "Session Layer"],
    correct: 2,
    difficulty: "intermediate",
    skill: "TCP/IP"
  },
  {
    id: "tt-54",
    question: "Proses yang dilakukan oleh TCP saat memulai koneksi antara dua host disebut?",
    options: ["Four-way Handshake", "Three-way Handshake", "Two-way Handshake", "One-way Handshake", "Connectionless Handshake"],
    correct: 1,
    difficulty: "intermediate",
    skill: "TCP/IP"
  },
  {
    id: "tt-55",
    question: "Layanan DNS berfungsi untuk?",
    options: ["Menerjemahkan alamat IP ke alamat MAC", "Menerjemahkan nama domain ke alamat IP", "Mengenkripsi data jaringan", "Mengatur routing paket", "Mengatur IP address otomatis"],
    correct: 1,
    difficulty: "intermediate",
    skill: "TCP/IP"
  },
  {
    id: "tt-56",
    question: "Jenis record DNS yang digunakan untuk mengonfigurasi mail server pada suatu domain disebut?",
    options: ["A Record", "CNAME Record", "MX Record", "TXT Record", "PTR Record"],
    correct: 2,
    difficulty: "advanced",
    skill: "TCP/IP"
  },
  {
    id: "tt-57",
    question: "Pada TCP, mekanisme flow control yang digunakan untuk mengatur laju data yang dikirim agar tidak melebihi kemampuan penerima disebut?",
    options: ["Sliding Window", "Stop and Wait", "Polling", "Token Passing", "Round Robin"],
    correct: 0,
    difficulty: "advanced",
    skill: "TCP/IP"
  },
  {
    id: "tt-58",
    question: "Jenis serangan yang memanfaatkan kelemahan three-way handshake TCP dengan mengirimkan SYN packet dalam jumlah besar disebut?",
    options: ["Ping Flood", "SYN Flood", "UDP Flood", "ICMP Redirect", "ARP Poisoning"],
    correct: 1,
    difficulty: "advanced",
    skill: "TCP/IP"
  },
  {
    id: "tt-59",
    question: "Pada protokol UDP, field yang berfungsi sebagai checksum untuk memverifikasi integritas data header dan payload disebut?",
    options: ["Sequence Number", "Acknowledgment Number", "Checksum Field", "Window Size", "Urgent Pointer"],
    correct: 2,
    difficulty: "expert",
    skill: "TCP/IP"
  },
  {
    id: "tt-60",
    question: "Nilai Default TTL (Time To Live) pada sistem operasi Windows saat mengirim paket IP adalah?",
    options: ["32", "64", "128", "255", "16"],
    correct: 2,
    difficulty: "expert",
    skill: "TCP/IP"
  },

  // ==================== 7. NETWORK SECURITY (tt-61 to tt-70) ====================
  {
    id: "tt-61",
    question: "Perangkat jaringan yang memfilter lalu lintas data berdasarkan aturan keamanan yang telah ditetapkan disebut?",
    options: ["Router", "Switch", "Firewall", "Hub", "Bridge"],
    correct: 2,
    difficulty: "basic",
    skill: "Network Security"
  },
  {
    id: "tt-62",
    question: "Jenis serangan di mana penyerang mencoba mengambil alih session pengguna dengan cara menangkap dan memanfaatkan cookie atau token disebut?",
    options: ["Phishing", "Session Hijacking", "Brute Force", "SQL Injection", "Cross-Site Scripting"],
    correct: 1,
    difficulty: "basic",
    skill: "Network Security"
  },
  {
    id: "tt-63",
    question: "Protokol yang digunakan untuk mengamankan koneksi web dengan mengenkripsi data antara browser dan server disebut?",
    options: ["FTP", "SSH", "SSL/TLS", "Telnet", "SNMP"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Network Security"
  },
  {
    id: "tt-64",
    question: "Serangan yang dilakukan dengan cara membombardir target dengan ICMP Echo Request dalam jumlah besar disebut?",
    options: ["SYN Flood", "UDP Flood", "Ping Flood", "Smurf Attack", "Teardrop"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Network Security"
  },
  {
    id: "tt-65",
    question: "Teknik keamanan yang membagi jaringan menjadi beberapa segmen terpisah untuk membatasi penyebaran serangan disebut?",
    options: ["Network Address Translation", "Virtual Private Network", "Network Segmentation", "Port Forwarding", "Load Balancing"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Network Security"
  },
  {
    id: "tt-66",
    question: "Serangan ARP Poisoning bertujuan untuk?",
    options: ["Memutuskan koneksi internet korban", "Memetakan ulang alamat MAC ke alamat IP pada ARP cache korban", "Mengenkripsi lalu lintas jaringan korban", "Memperlambat kecepatan transfer data korban", "Menghapus tabel routing pada router korban"],
    correct: 1,
    difficulty: "advanced",
    skill: "Network Security"
  },
  {
    id: "tt-67",
    question: "Sistem yang memantau lalu lintas jaringan secara real-time dan memberikan peringatan saat mendeteksi aktivitas mencurigakan disebut?",
    options: ["NAT System", "DHCP Server", "IDS (Intrusion Detection System)", "Proxy Server", "VPN Gateway"],
    correct: 2,
    difficulty: "advanced",
    skill: "Network Security"
  },
  {
    id: "tt-68",
    question: "Firewall yang beroperasi dengan memeriksa konten data pada layer application dari paket disebut?",
    options: ["Packet Filtering Firewall", "Circuit-Level Gateway Firewall", "Application-Level Gateway Firewall", "Stateless Firewall", "Network Address Translation Firewall"],
    correct: 2,
    difficulty: "advanced",
    skill: "Network Security"
  },
  {
    id: "tt-69",
    question: "Teknik keamanan yang memungkinkan pengguna mengakses sistem hanya setelah melewati beberapa tahap verifikasi disebut?",
    options: ["Single Sign-On", "Multi-Factor Authentication (MFA)", "Role-Based Access Control", "Password Policy", "Token Authentication"],
    correct: 1,
    difficulty: "expert",
    skill: "Network Security"
  },
  {
    id: "tt-70",
    question: "Dalam implementasi VPN IPsec, mode yang mengenkripsi seluruh paket IP termasuk header asli disebut?",
    options: ["Transport Mode", "Tunnel Mode", "Split Mode", "Encapsulation Mode", "Proxy Mode"],
    correct: 1,
    difficulty: "expert",
    skill: "Network Security"
  },

  // ==================== 8. LINUX (tt-71 to tt-80) ====================
  {
    id: "tt-71",
    question: "Perintah Linux yang digunakan untuk menampilkan isi direktori saat ini adalah?",
    options: ["cd", "ls", "pwd", "dir", "path"],
    correct: 1,
    difficulty: "basic",
    skill: "Linux"
  },
  {
    id: "tt-72",
    question: "Shell default yang digunakan oleh kebanyakan distribusi Linux modern adalah?",
    options: ["csh", "ksh", "bash", "zsh", "fish"],
    correct: 2,
    difficulty: "basic",
    skill: "Linux"
  },
  {
    id: "tt-73",
    question: "Perintah Linux untuk mengatur hak akses file agar dapat dieksekusi oleh owner adalah?",
    options: ["chmod 744 file.txt", "chmod 644 file.txt", "chmod 555 file.txt", "chmod 755 file.txt", "chmod 444 file.txt"],
    correct: 0,
    difficulty: "intermediate",
    skill: "Linux"
  },
  {
    id: "tt-74",
    question: "File konfigurasi di Linux yang berfungsi sebagai daemon untuk mengelola layanan DNS server BIND disebut?",
    options: ["/etc/resolv.conf", "/etc/dns.conf", "/etc/named.conf", "/etc/bind.conf", "/etc/hosts"],
    correct: 2,
    difficulty: "intermediate",
    skill: "Linux"
  },
  {
    id: "tt-75",
    question: "Perintah Linux untuk menampilkan isi dari sebuah file teks secara berurutan dari awal hingga akhir adalah?",
    options: ["more", "cat", "less", "head", "tail"],
    correct: 1,
    difficulty: "intermediate",
    skill: "Linux"
  },
  {
    id: "tt-76",
    question: "Di Linux, direktori yang menyimpan log sistem (system logs) secara default adalah?",
    options: ["/etc/logs", "/var/log", "/opt/logs", "/tmp/log", "/usr/log"],
    correct: 1,
    difficulty: "advanced",
    skill: "Linux"
  },
  {
    id: "tt-77",
    question: "Perintah Linux untuk memantau lalu lintas jaringan secara real-time secara continu adalah?",
    options: ["ping", "iftop", "nslookup", "dig", "host"],
    correct: 1,
    difficulty: "advanced",
    skill: "Linux"
  },
  {
    id: "tt-78",
    question: "Mekanisme di Linux yang memungkinkan proses menjalankan program dengan hak akses yang lebih tinggi dari yang dimilikinya disebut?",
    options: ["iptables", "sudo", "su", "chown", "setuid"],
    correct: 4,
    difficulty: "advanced",
    skill: "Linux"
  },
  {
    id: "tt-79",
    question: "Perintah iptables pada Linux untuk membuat aturan NAT yang mengubah sumber alamat IP paket keluar dari interface eth0 disebut?",
    options: ["iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE", "iptables -t filter -A INPUT -o eth0 -j ACCEPT", "iptables -t mangle -A FORWARD -i eth0 -j DROP", "iptables -t raw -A PREROUTING -i eth0 -j REDIRECT", "iptables -t security -A OUTPUT -o eth0 -j LOG"],
    correct: 0,
    difficulty: "expert",
    skill: "Linux"
  },
  {
    id: "tt-80",
    question: "Mekanisme systemd di Linux yang menggantikan init system digunakan untuk?",
    options: ["Mengelola file system dan mount point", "Mengelola layanan dan unit sistem secara paralel", "Mengelola jaringan dan firewall", "Mengelola user authentication", "Mengelola file permission"],
    correct: 1,
    difficulty: "expert",
    skill: "Linux"
  },

  // ==================== 9. VoIP (tt-81 to tt-90) ====================
  {
    id: "tt-81",
    question: "Kepanjangan dari VoIP adalah?",
    options: ["Voice over Internet Protocol", "Video over Internet Protocol", "Voice on IP", "Virtual over Internet Protocol", "Voice over IP Phone"],
    correct: 0,
    difficulty: "basic",
    skill: "VoIP"
  },
  {
    id: "tt-82",
    question: "Protokol yang paling umum digunakan untuk mengontrol sesi panggilan VoIP disebut?",
    options: ["RTP", "SIP", "HTTP", "FTP", "SMTP"],
    correct: 1,
    difficulty: "basic",
    skill: "VoIP"
  },
  {
    id: "tt-83",
    question: "Codec yang digunakan untuk kompresi suara pada VoIP dengan kualitas tinggi dan bitrate rendah adalah?",
    options: ["G.711", "G.729", "G.726", "G.722", "G.718"],
    correct: 1,
    difficulty: "intermediate",
    skill: "VoIP"
  },
  {
    id: "tt-84",
    question: "Pada protokol SIP, method yang digunakan untuk memulai panggilan baru disebut?",
    options: ["REGISTER", "INVITE", "BYE", "ACK", "CANCEL"],
    correct: 1,
    difficulty: "intermediate",
    skill: "VoIP"
  },
  {
    id: "tt-85",
    question: "Fungsi utama dari PBX (Private Branch Exchange) dalam sistem VoIP adalah?",
    options: ["Mengatur routing panggilan antar ekstensi", "Menyimpan recording panggilan", "Mengirim email notifikasi", "Mengatur firewall jaringan", "Mengelola database pengguna"],
    correct: 0,
    difficulty: "intermediate",
    skill: "VoIP"
  },
  {
    id: "tt-86",
    question: "Protokol yang digunakan untuk mentransfer media audio secara real-time setelah sesi panggilan SIP established disebut?",
    options: ["RTCP", "RTP", "SDP", "SIP", "TFTP"],
    correct: 1,
    difficulty: "advanced",
    skill: "VoIP"
  },
  {
    id: "tt-87",
    question: "Codec G.711 pada VoIP menghasilkan bitrate sebesar dan menggunakan teknik kompresi?",
    options: ["64 Kbps dengan kompresi ADPCM", "64 Kbps tanpa kompresi (PCM)", "32 Kbps dengan kompresi ADPCM", "8 Kbps dengan kompresi CS-ACELP", "16 Kbps dengan kompresi LD-CELP"],
    correct: 1,
    difficulty: "advanced",
    skill: "VoIP"
  },
  {
    id: "tt-88",
    question: "Perangkat yang mengubah sinyal analog dari telepon tradisional menjadi sinyal digital untuk jaringan VoIP IP disebut?",
    options: ["FXS Gateway", "FXO Gateway", "ATA (Analog Terminal Adapter)", "IP Phone", "Softphone"],
    correct: 2,
    difficulty: "advanced",
    skill: "VoIP"
  },
  {
    id: "tt-89",
    question: "Quality of Service (QoS) pada VoIP sangat penting karena paket audio harus tiba dalam batas waktu yang ketat. Jika paket terlambat lebih dari 150ms, dampak yang terjadi adalah?",
    options: ["Koneksi terputus", "Munculnya delay yang terdengar dan jitter", "Kualitas video menurun", "Server menjadi lambat", "Bandwidth internet berkurang"],
    correct: 1,
    difficulty: "expert",
    skill: "VoIP"
  },
  {
    id: "tt-90",
    question: "Pada VoIP, konsep SIP Trunk digunakan untuk menggantikan trunk tradisional (T1/E1) dengan cara?",
    options: ["Menghubungkan PBX ke PSTN melalui internet menggunakan protokol SIP", "Menghubungkan IP Phone langsung ke PSTN", "Membuat jalur dedicated melalui kabel fiber", "Menggunakan satellite link untuk panggilan internasional", "Menghubungkan dua PBX melalui jaringan telepon analog"],
    correct: 0,
    difficulty: "expert",
    skill: "VoIP"
  },

  // ==================== 10. CCTV & SURVEILLANCE (tt-91 to tt-100) ====================
  {
    id: "tt-91",
    question: "Jenis kamera CCTV yang paling umum digunakan untuk pemantauan indoor dengan gambar jernih dan harga terjangkau disebut?",
    options: ["PTZ Camera", "Box Camera", "Dome Camera", "Bullet Camera", "Thermal Camera"],
    correct: 2,
    difficulty: "basic",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-92",
    question: "Perangkat yang berfungsi merekam dan menyimpan video dari kamera CCTV secara terus-menerus disebut?",
    options: ["NVR (Network Video Recorder)", "DVR (Digital Video Recorder)", "Switch", "Router", "Modem"],
    correct: 1,
    difficulty: "basic",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-93",
    question: "Resolusi 1920x1080 pixel pada kamera CCTV disebut?",
    options: ["HD", "Full HD", "4K", "QHD", "VGA"],
    correct: 1,
    difficulty: "intermediate",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-94",
    question: "Pada sistem CCTV IP, bandwidth yang dibutuhkan oleh satu kamera 4MP dengan kompresi H.264 streaming berkelanjutan umumnya berkisar?",
    options: ["1-2 Mbps", "4-8 Mbps", "10-20 Mbps", "50-100 Mbps", "200-500 Mbps"],
    correct: 1,
    difficulty: "intermediate",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-95",
    question: "Kamera PTZ (Pan-Tilt-Zoom) berfungsi untuk?",
    options: ["Merekam audio di area surveilans", "Mengontrol gerakan kamera secara horizontal, vertikal, dan zoom", "Menyimpan video secara lokal", "Menghubungkan kamera ke internet", "Memberikan daya listrik ke kamera"],
    correct: 1,
    difficulty: "intermediate",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-96",
    question: "Pada CCTV IP, protokol yang digunakan untuk mengontrol dan mengoperasikan kamera PTZ dari jarak jauh disebut?",
    options: ["RTSP", "ONVIF", "CGI", "PACP", "IPFIX"],
    correct: 2,
    difficulty: "advanced",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-97",
    question: "Jenis kompresi video terbaru yang menghasilkan ukuran file lebih kecil dengan kualitas yang sama dibanding H.264 adalah?",
    options: ["MPEG-2", "MJPEG", "H.265/HEVC", "DivX", "WMV"],
    correct: 2,
    difficulty: "advanced",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-98",
    question: "Pada sistem surveilans modern, fitur yang memungkinkan kamera CCTV mendeteksi pergerakan objek manusia dan mengabaikan pergerakan lain seperti daun tertiup angin disebut?",
    options: ["Video Analytics - Motion Detection", "Video Analytics - Line Crossing Detection", "Video Analytics - Face Recognition", "Video Analytics - Object Classification", "Video Analytics - People Counting"],
    correct: 3,
    difficulty: "advanced",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-99",
    question: "Standar ONVIF pada sistem CCTV IP berfungsi untuk?",
    options: ["Mengatur keamanan wireless", "Memastikan kompatibilitas antara perangkat CCTV dari vendor berbeda", "Mengatur kualitas video", "Mengelola penyimpanan data", "Mengontrol akses fisik"],
    correct: 1,
    difficulty: "expert",
    skill: "CCTV & Surveillance"
  },
  {
    id: "tt-100",
    question: "Pada arsitektur Video Management System (VMS) berskala besar, konsep failover server berfungsi untuk?",
    options: ["Menyimpan backup video ke cloud", "Menggantikan server utama jika terjadi kegagalan untuk memastikan kontinuitas operasi", "Mengatur bandwidth jaringan", "Mengontrol akses pengguna", "Mengelola kamera secara terpusat"],
    correct: 1,
    difficulty: "expert",
    skill: "CCTV & Surveillance"
  }
];

export const majorQuizMap: Record<string, QuizQuestion[]> = {
  "Rekayasa Perangkat Lunak": rplQuiz,
  "Desain Komunikasi Visual": dkvQuiz,
  "Teknik Jaringan, Komputer, dan Telekomunikasi": [...tkjQuiz, ...transmisiQuiz],
};

const MAJOR_QUIZ_OVERRIDE_PREFIX = "quiz_overrides_";

function getMajorQuizStorageKey(major: string): string {
  return `${MAJOR_QUIZ_OVERRIDE_PREFIX}${major.toLowerCase().trim().replace(/\s+/g, "-")}`;
}

function readMajorQuizOverride(major: string): QuizQuestion[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(getMajorQuizStorageKey(major));
    if (!raw) return null;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as QuizQuestion[]) : null;
  } catch {
    return null;
  }
}

export function hasMajorQuizOverride(major: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getMajorQuizStorageKey(major)) !== null;
}

function invalidateAssessment() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("major_quiz_result");
  window.localStorage.removeItem("major_quiz_answers");
  const stale: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && (key.startsWith("career_matches_") || key.startsWith("major_quiz_result_") || key.startsWith("major_quiz_answers_"))) stale.push(key);
  }
  stale.forEach((key) => window.localStorage.removeItem(key));
}

export function saveMajorQuiz(major: string, questions: QuizQuestion[]): void {
  window.localStorage.setItem(getMajorQuizStorageKey(major), JSON.stringify(questions));
  invalidateAssessment();
}

export function resetMajorQuiz(major: string): void {
  window.localStorage.removeItem(getMajorQuizStorageKey(major));
  invalidateAssessment();
}

export function getMajorQuizForAdmin(major: string): QuizQuestion[] {
  const over = readMajorQuizOverride(major);
  if (over && over.length > 0) return over;
  const base = majorQuizMap[major] || rplQuiz;
  return base.map((q) => ({ ...q, options: [...q.options] }));
}

export function getQuizForMajor(major: string): QuizQuestion[] {
  const over = readMajorQuizOverride(major);
  if (over && over.length > 0) return over;
  const questions = majorQuizMap[major] || rplQuiz;
  return shuffleQuiz(questions);
}

function shuffleQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((q) => {
    const correctOption = q.options[q.correct];
    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const newCorrect = shuffled.indexOf(correctOption);
    return { ...q, options: shuffled, correct: newCorrect };
  });
}

export interface QuizResult {
  score: number;
  level: number;
  skillScores: Record<string, { correct: number; total: number }>;
}

export function gradeQuiz(answers: Record<string, number>, questions: QuizQuestion[]): QuizResult {
  let correct = 0;
  const skillScores: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    if (!skillScores[q.skill]) skillScores[q.skill] = { correct: 0, total: 0 };
    skillScores[q.skill].total++;
    if (answers[q.id] === q.correct) {
      correct++;
      skillScores[q.skill].correct++;
    }
  });

  const score = Math.round((correct / questions.length) * 100);
  let level = 1;
  if (score >= 90) level = 5;
  else if (score >= 75) level = 4;
  else if (score >= 60) level = 3;
  else if (score >= 40) level = 2;

  return { score, level, skillScores };
}

/* ------------------------------------------------------------------ */
/*  Backend-backed admin helpers for assessment questions               */
/* ------------------------------------------------------------------ */

type ApiAssessmentQuestion = {
  id: number;
  major_id?: string;
  question: string;
  options: string[] | string;
  correct: number;
  difficulty: string;
  skill: string;
};

export type AdminSkill = { skill: string; count: number };

export type AdminQuizMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  major: string;
  skills: AdminSkill[];
};

export type AdminQuizPage = {
  questions: QuizQuestion[];
  meta: AdminQuizMeta;
};

function mapAdminQuestion(q: ApiAssessmentQuestion): QuizQuestion {
  return {
    id: String(q.id),
    question: q.question,
    options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
    correct: q.correct,
    difficulty: (q.difficulty || "basic") as QuizQuestion["difficulty"],
    skill: q.skill || "",
  };
}

function toQuestionPayload(q: QuizQuestion) {
  return {
    question: q.question.trim(),
    options: q.options.map((o) => o.trim()),
    correct: q.correct,
    difficulty: q.difficulty,
    skill: q.skill.trim(),
  };
}

export async function fetchMajorQuizAdminPage(
  major: string | undefined,
  opts: { page?: number; perPage?: number; skill?: string } = {},
): Promise<AdminQuizPage> {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", String(opts.page));
  if (opts.perPage) params.set("per_page", String(opts.perPage));
  if (opts.skill) params.set("skill", opts.skill);

  const base = major
    ? BACKEND_ENDPOINTS.assessment.adminQuestions(major)
    : BACKEND_ENDPOINTS.assessment.adminQuestions();
  const qs = params.toString();

  const res = await api.get<{
    success: boolean;
    data: ApiAssessmentQuestion[];
    meta: AdminQuizMeta;
  }>(qs ? `${base}?${qs}` : base);

  return {
    questions: (res.data ?? []).map(mapAdminQuestion),
    meta:
      res.meta ??
      {
        total: 0,
        per_page: opts.perPage ?? 5,
        current_page: opts.page ?? 1,
        last_page: 1,
        major: major ?? "all",
        skills: [],
      },
  };
}

export async function createMajorQuestion(major: string, q: QuizQuestion): Promise<QuizQuestion> {
  const res = await api.post<{ success: boolean; data: ApiAssessmentQuestion }>(
    BACKEND_ENDPOINTS.assessment.storeQuestion,
    { major, ...toQuestionPayload(q) },
  );
  return mapAdminQuestion(res.data);
}

export async function updateMajorQuestion(
  id: string | number,
  q: QuizQuestion,
): Promise<QuizQuestion> {
  const res = await api.patch<{ success: boolean; data: ApiAssessmentQuestion }>(
    BACKEND_ENDPOINTS.assessment.question(id),
    toQuestionPayload(q),
  );
  return mapAdminQuestion(res.data);
}

export async function deleteMajorQuestion(id: string | number): Promise<void> {
  await api.delete(BACKEND_ENDPOINTS.assessment.question(id));
}

export async function resetMajorQuizAdmin(major: string): Promise<boolean> {
  await api.post(BACKEND_ENDPOINTS.assessment.reset(major), { major });
  return true;
}