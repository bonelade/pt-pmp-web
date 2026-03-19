/* ========================================
   News / Articles - Supabase ONLY (JSONB)
   Table: news_data (id TEXT PK, data JSONB, updated_at)
   ======================================== */

const SEED_ARTICLES = [
  {
    id: 'seed-001',
    title_id: 'PT PMP Resmi Beroperasi, Diresmikan Presiden Prabowo Subianto',
    title_en: 'PT PMP Officially Operates, Inaugurated by President Prabowo Subianto',
    body_id: '<p>PT Pangan Merah Putih (PT PMP) resmi beroperasi setelah diresmikan langsung oleh Presiden Republik Indonesia, Prabowo Subianto, pada tanggal 5 Juni 2025 di Bengkayang, Kalimantan Barat.</p><p>Peresmian ini menandai tonggak penting dalam upaya pemerintah mewujudkan ketahanan pangan nasional, khususnya di sektor jagung. PT PMP hadir sebagai solusi nyata untuk menghubungkan petani jagung lokal dengan industri pakan nasional.</p><p>"Kami berkomitmen untuk menjadi mitra terpercaya bagi petani Kalimantan Barat sekaligus berkontribusi pada program ketahanan pangan nasional," ujar Direktur PT PMP, Doringo Dorado Tanod.</p><p>Fasilitas PT PMP di Bengkayang dilengkapi dengan vertical dryer berkapasitas 300 ton per hari dan gudang penyimpanan berkapasitas hingga 1.000 ton, menjadikannya salah satu fasilitas pengeringan jagung terbesar di Kalimantan Barat.</p>',
    body_en: '<p>PT Pangan Merah Putih (PT PMP) officially began operations after being inaugurated by Indonesian President Prabowo Subianto on June 5, 2025 in Bengkayang, West Kalimantan.</p><p>This inauguration marks an important milestone in the government\'s efforts to achieve national food security, particularly in the corn sector. PT PMP serves as a real solution to connect local corn farmers with the national feed industry.</p><p>"We are committed to being a trusted partner for West Kalimantan farmers while contributing to the national food security program," said PT PMP Director Doringo Dorado Tanod.</p><p>PT PMP\'s facilities in Bengkayang are equipped with a vertical dryer with a capacity of 300 tons per day and storage warehouses with a capacity of up to 1,000 tons, making it one of the largest corn drying facilities in West Kalimantan.</p>',
    date: '2025-06-05',
    category: 'company',
    thumbnail: ''
  },
  {
    id: 'seed-002',
    title_id: 'PT PMP Suplai Jagung untuk Cadangan Pangan Pemerintah melalui Bulog',
    title_en: 'PT PMP Supplies Corn for Government Food Reserves through Bulog',
    body_id: '<p>PT Pangan Merah Putih (PT PMP) telah berhasil menyelesaikan pengiriman perdana jagung kering berkualitas tinggi ke Bulog sebagai bagian dari program Cadangan Jagung Pemerintah.</p><p>Jagung yang disuplai memenuhi standar ketat Bulog: kadar air 14%, bersih, bebas jamur, dan kandungan aflatoksin di bawah 50 ppb. Pengiriman ini merupakan wujud nyata komitmen PT PMP dalam mendukung ketahanan pangan nasional.</p><p>Kepala Pabrik PT PMP, Muhamad Ryan Pratama, menyatakan bahwa kerjasama dengan Bulog adalah prioritas utama perusahaan. "Kami bangga dapat berkontribusi langsung pada cadangan pangan strategis pemerintah," ujarnya.</p><p>Ke depannya, PT PMP berencana meningkatkan volume pasokan ke Bulog seiring dengan peningkatan kapasitas operasional dan jaringan kemitraan dengan petani di Kalimantan Barat.</p>',
    body_en: '<p>PT Pangan Merah Putih (PT PMP) has successfully completed its first delivery of high-quality dried corn to Bulog as part of the Government Corn Reserves program.</p><p>The supplied corn meets Bulog\'s strict standards: 14% moisture content, clean, mold-free, and aflatoxin content below 50 ppb. This delivery is a concrete manifestation of PT PMP\'s commitment to supporting national food security.</p><p>PT PMP Factory Head Muhamad Ryan Pratama stated that cooperation with Bulog is the company\'s top priority. "We are proud to directly contribute to the government\'s strategic food reserves," he said.</p><p>Going forward, PT PMP plans to increase supply volumes to Bulog as operational capacity and farmer partnership networks in West Kalimantan grow.</p>',
    date: '2025-07-15',
    category: 'government',
    thumbnail: ''
  },
  {
    id: 'seed-004',
    title_id: 'Harga Jagung Kalimantan Barat Maret 2026: Update Terbaru dari PT PMP',
    title_en: 'West Kalimantan Corn Price March 2026: Latest Update from PT PMP',
    body_id: '<p>PT Pangan Merah Putih (PT PMP) merilis update harga pembelian jagung pipil kering untuk bulan Maret 2026. Harga jagung Grade A saat ini berada di level kompetitif mengikuti perkembangan pasar nasional dan harga referensi dari Badan Pangan Nasional.</p><p>Jagung Grade A dengan kadar air ≤14% dan aflatoksin ≤20 ppb mendapatkan harga tertinggi. Grade B (kadar air 14–17%) dan Grade C (kadar air >17%) masing-masing mendapatkan harga penyesuaian sesuai kondisi aktual.</p><p>PT PMP mengimbau petani jagung di Bengkayang, Landak, Sambas, Singkawang, dan seluruh Kalimantan Barat untuk memastikan jagung sudah dalam kondisi pipil dan memiliki kadar air serendah mungkin sebelum menjual, agar mendapatkan harga terbaik.</p><p>Untuk informasi harga terkini dan cara menjual jagung ke PT PMP, hubungi tim kami di 0821-2722-8722 atau kunjungi halaman harga di website kami.</p>',
    body_en: '<p>PT Pangan Merah Putih (PT PMP) releases the latest corn buying price update for March 2026. Grade A corn prices are currently at competitive levels following national market developments and reference prices from the National Food Agency.</p><p>Grade A corn with moisture content ≤14% and aflatoxin ≤20 ppb receives the highest price. Grade B (14–17% moisture) and Grade C (>17% moisture) each receive adjusted prices based on actual conditions.</p><p>PT PMP advises corn farmers in Bengkayang, Landak, Sambas, Singkawang, and all of West Kalimantan to ensure corn is shelled and has the lowest possible moisture content before selling to get the best price.</p>',
    date: '2026-03-01',
    category: 'market',
    thumbnail: ''
  },
  {
    id: 'seed-005',
    title_id: 'Cara Meningkatkan Kualitas Jagung Sebelum Dijual: Panduan untuk Petani Kalimantan Barat',
    title_en: 'How to Improve Corn Quality Before Selling: Guide for West Kalimantan Farmers',
    body_id: '<p>Kualitas jagung yang baik adalah kunci mendapatkan harga jual tertinggi. PT Pangan Merah Putih berbagi tips praktis bagi petani jagung di Kalimantan Barat untuk memaksimalkan nilai jual panen mereka.</p><h3>1. Panen di Waktu yang Tepat</h3><p>Panen jagung sebaiknya dilakukan saat kadar air biji berada di sekitar 25–30%. Panen terlalu awal menghasilkan biji yang belum penuh, sementara panen terlambat meningkatkan risiko serangan jamur di lapangan.</p><h3>2. Jemur Sebelum Pipil (Opsional)</h3><p>Jika memungkinkan, jemur tongkol jagung selama 2–3 hari di bawah sinar matahari sebelum dipipil untuk menurunkan kadar air awal.</p><h3>3. Pipil dengan Bersih</h3><p>Pastikan proses pemipilan menghasilkan biji yang bersih, minim kerusakan mekanis, dan bebas dari sisa tongkol atau daun yang dapat menjadi sumber kontaminasi.</p><h3>4. Simpan di Tempat Kering</h3><p>Jagung pipil harus disimpan di tempat yang kering, berventilasi baik, dan terhindar dari hujan untuk mencegah naiknya kadar air kembali.</p><p>PT PMP siap menerima jagung dengan berbagai kondisi kadar air. Hubungi kami di 0821-2722-8722 untuk informasi lebih lanjut.</p>',
    body_en: '<p>Good corn quality is the key to getting the highest selling price. PT Pangan Merah Putih shares practical tips for corn farmers in West Kalimantan to maximize the selling value of their harvest.</p><p>Key tips: harvest at the right time (25-30% moisture), optional pre-shelling sun drying, clean shelling process, and proper dry storage to prevent moisture re-absorption.</p><p>PT PMP is ready to accept corn in various moisture conditions. Contact us at 0821-2722-8722 for more information.</p>',
    date: '2026-02-15',
    category: 'market',
    thumbnail: ''
  },
  {
    id: 'seed-006',
    title_id: 'PT PMP Perkuat Kemitraan dengan Petani Jagung di Kabupaten Bengkayang',
    title_en: 'PT PMP Strengthens Partnership with Corn Farmers in Bengkayang Regency',
    body_id: '<p>PT Pangan Merah Putih terus memperkuat jaringan kemitraan dengan petani jagung di Kabupaten Bengkayang, Kalimantan Barat. Program kemitraan ini dirancang untuk memberikan kepastian pasar bagi petani sekaligus menjamin pasokan jagung berkualitas bagi PT PMP.</p><p>Melalui skema kemitraan, petani mendapatkan keuntungan berupa harga beli yang fair dan transparan, akses langsung ke fasilitas pengeringan PT PMP, serta kemudahan dalam proses jual beli jagung tanpa perantara yang merugikan.</p><p>"Kami ingin petani jagung di Bengkayang dan seluruh Kalimantan Barat mendapatkan nilai terbaik dari kerja keras mereka. Dengan fasilitas pengeringan kami, jagung dengan kadar air tinggi pun bisa diproses menjadi produk bernilai tinggi," kata perwakilan PT PMP.</p><p>Petani yang tertarik bergabung dalam program kemitraan PT PMP dapat menghubungi tim kami langsung di 0821-2722-8722 atau mengunjungi fasilitas kami di Jl. Bukit Tinggi, Sebalo, Bengkayang.</p>',
    body_en: '<p>PT Pangan Merah Putih continues to strengthen its partnership network with corn farmers in Bengkayang Regency, West Kalimantan. This partnership program is designed to provide market certainty for farmers while ensuring quality corn supply for PT PMP.</p><p>Through the partnership scheme, farmers benefit from fair and transparent buying prices, direct access to PT PMP drying facilities, and ease in the buying and selling process without disadvantageous intermediaries.</p>',
    date: '2026-02-01',
    category: 'company',
    thumbnail: ''
  },
  {
    id: 'seed-007',
    title_id: 'Potensi Ekspor Jagung Kalimantan Barat ke Malaysia: Peluang yang Belum Dimaksimalkan',
    title_en: 'West Kalimantan Corn Export Potential to Malaysia: Untapped Opportunity',
    body_id: '<p>Kalimantan Barat memiliki keunggulan geografis yang sangat strategis untuk ekspor jagung ke Malaysia, khususnya negara bagian Sarawak. Kabupaten Bengkayang, sebagai salah satu daerah perbatasan, memiliki akses darat langsung ke Malaysia melalui PPLB Aruk di Kabupaten Sambas.</p><p>Keunggulan ini memberikan biaya logistik yang jauh lebih rendah dibandingkan pengiriman dari pulau Jawa. Sementara Surabaya atau Makassar harus mengandalkan jalur laut yang memakan waktu berminggu-minggu, Bengkayang dapat mengirimkan jagung ke Sarawak dalam hitungan hari.</p><p>Malaysia sebagai negara dengan industri peternakan yang berkembang pesat membutuhkan pasokan jagung pakan ternak yang stabil. PT PMP dengan kapasitas pengeringan 300 ton per hari dan standar kualitas Grade A berpotensi menjadi pemasok utama jagung ekspor dari Kalimantan Barat.</p><p>Untuk informasi kerjasama ekspor, hubungi tim PT PMP di 0821-2722-8722.</p>',
    body_en: '<p>West Kalimantan has a very strategic geographical advantage for corn exports to Malaysia, particularly Sarawak state. Bengkayang Regency, as a border area, has direct land access to Malaysia through PPLB Aruk in Sambas Regency.</p><p>This advantage provides much lower logistics costs compared to shipments from Java. PT PMP with 300 tons/day drying capacity and Grade A quality standards has the potential to become a major corn export supplier from West Kalimantan.</p>',
    date: '2026-01-20',
    category: 'market',
    thumbnail: ''
  },
  {
    id: 'seed-008',
    title_id: 'Mengenal Aflatoksin: Ancaman Tersembunyi dalam Jagung dan Cara Mencegahnya',
    title_en: 'Understanding Aflatoxin: The Hidden Threat in Corn and How to Prevent It',
    body_id: '<p>Aflatoksin adalah salah satu ancaman terbesar dalam rantai pasok jagung yang sering tidak disadari oleh petani dan pedagang. Racun alami ini diproduksi oleh jamur Aspergillus flavus yang tumbuh pada jagung dengan kadar air tinggi.</p><h3>Apa Bahaya Aflatoksin?</h3><p>Aflatoksin bersifat karsinogenik dan dapat menyebabkan kerusakan hati pada ternak. Jagung yang mengandung aflatoksin di atas 20 ppb akan ditolak oleh feedmill dan tidak dapat digunakan sebagai pakan ternak.</p><h3>Bagaimana Aflatoksin Terbentuk?</h3><p>Jamur penghasil aflatoksin berkembang pesat pada jagung dengan kadar air di atas 14%, terutama saat disimpan dalam kondisi lembab. Proses ini bisa terjadi hanya dalam 48–72 jam pada kondisi kadar air yang tinggi.</p><h3>Cara Mencegah Kontaminasi Aflatoksin</h3><p>Kunci utama pencegahan adalah menurunkan kadar air jagung ke di bawah 14% sesegera mungkin setelah panen. Inilah mengapa fasilitas pengeringan seperti vertical dryer PT PMP sangat penting dalam rantai pasok jagung Kalimantan Barat.</p><p>PT PMP memastikan semua jagung yang diproses memiliki kadar aflatoksin di bawah ambang batas aman melalui teknologi pengeringan modern dan pengujian kualitas yang ketat.</p>',
    body_en: '<p>Aflatoxin is one of the biggest threats in the corn supply chain that is often unrecognized by farmers and traders. This natural toxin is produced by Aspergillus flavus fungi that grows on corn with high moisture content.</p><p>Aflatoxin is carcinogenic and can cause liver damage in livestock. Corn containing aflatoxin above 20 ppb will be rejected by feedmills. The key to prevention is lowering corn moisture to below 14% as soon as possible after harvest.</p>',
    date: '2026-01-10',
    category: 'sustainability',
    thumbnail: ''
  },
  {
    id: 'seed-009',
    title_id: 'Vertical Dryer vs Pengeringan Matahari: Mengapa Teknologi Modern Lebih Unggul',
    title_en: 'Vertical Dryer vs Sun Drying: Why Modern Technology is Superior',
    body_id: '<p>Pengeringan jagung secara tradisional menggunakan sinar matahari masih banyak dilakukan oleh petani di Kalimantan Barat. Namun, metode ini memiliki keterbatasan signifikan yang sering merugikan petani dari sisi kualitas dan nilai jual jagung.</p><h3>Keterbatasan Pengeringan Matahari</h3><p>Kapasitas pengeringan sangat terbatas (hanya 2–5 ton per hari), sangat bergantung pada cuaca, kadar air tidak merata, dan jagung rentan terkontaminasi debu dan hewan. Pada musim hujan, proses ini praktis tidak bisa dilakukan.</p><h3>Keunggulan Vertical Dryer PT PMP</h3><p>Teknologi vertical dryer yang digunakan PT PMP mampu mengeringkan 300 ton jagung per hari dengan hasil yang konsisten dan merata. Tidak tergantung cuaca, kontrol suhu yang presisi, risiko kontaminasi minimal, dan kadar air output terjamin di bawah 14%.</p><p>Bagi petani, menjual jagung dengan kadar air tinggi ke PT PMP untuk dikeringkan adalah solusi yang lebih efisien daripada mencoba mengeringkan sendiri dengan kapasitas dan teknologi yang terbatas.</p>',
    body_en: '<p>Traditional corn drying using sunlight is still widely practiced by farmers in West Kalimantan. However, this method has significant limitations that often harm farmers in terms of quality and selling value.</p><p>PT PMP\'s vertical dryer technology can dry 300 tons of corn per day with consistent and even results, regardless of weather, with guaranteed output moisture below 14%.</p>',
    date: '2025-12-15',
    category: 'sustainability',
    thumbnail: ''
  },
  {
    id: 'seed-010',
    title_id: 'PT PMP Dukung Program Ketahanan Pangan Nasional dari Kalimantan Barat',
    title_en: 'PT PMP Supports National Food Security Program from West Kalimantan',
    body_id: '<p>PT Pangan Merah Putih berkomitmen penuh dalam mendukung program ketahanan pangan nasional yang digagas oleh Presiden Prabowo Subianto. Sebagai perusahaan yang berbasis di Kalimantan Barat, PT PMP memposisikan diri sebagai tulang punggung rantai pasok jagung pakan ternak di wilayah Kalimantan.</p><p>Indonesia saat ini masih mengimpor sebagian kebutuhan jagung dari luar negeri. PT PMP hadir sebagai solusi untuk mengurangi ketergantungan impor dengan memaksimalkan potensi produksi jagung lokal di Kalimantan Barat yang terus berkembang.</p><p>Dengan kapasitas pengeringan 300 ton per hari dan jaringan petani mitra yang terus berkembang di seluruh Kalimantan Barat, PT PMP siap berkontribusi nyata pada swasembada jagung nasional.</p><p>"Kami percaya bahwa Kalimantan Barat punya potensi luar biasa sebagai lumbung jagung nasional. PT PMP hadir untuk mengubah potensi itu menjadi kenyataan," ujar manajemen PT PMP.</p>',
    body_en: '<p>PT Pangan Merah Putih is fully committed to supporting the national food security program initiated by President Prabowo Subianto. As a West Kalimantan-based company, PT PMP positions itself as the backbone of the feed corn supply chain in the Kalimantan region.</p><p>With 300 tons/day drying capacity and a growing network of partner farmers throughout West Kalimantan, PT PMP is ready to contribute meaningfully to national corn self-sufficiency.</p>',
    date: '2025-12-01',
    category: 'government',
    thumbnail: ''
  },
  {
    id: 'seed-011',
    title_id: 'Standar SNI Jagung Pipil: Panduan Lengkap untuk Petani dan Pembeli',
    title_en: 'SNI Corn Standards: Complete Guide for Farmers and Buyers',
    body_id: '<p>Standar Nasional Indonesia (SNI) untuk jagung pipil kering menjadi acuan utama dalam perdagangan jagung di Indonesia. Memahami standar ini penting bagi petani agar dapat menghasilkan jagung yang diterima oleh industri, dan bagi pembeli agar dapat menilai kualitas jagung yang dibeli.</p><h3>Parameter Utama SNI Jagung</h3><p>SNI 01-3920-1995 mengatur beberapa parameter kunci: kadar air maksimum 14%, kandungan aflatoksin maksimum 20 ppb untuk pakan ternak, broken corn maksimum 2%, dan benda asing maksimum 1%.</p><h3>Grading di PT PMP</h3><p>PT PMP menggunakan sistem grading tiga tingkat berdasarkan SNI: Grade A (memenuhi semua parameter SNI), Grade B (sedikit di atas batas SNI untuk beberapa parameter), dan Grade C (memerlukan proses lebih lanjut).</p><p>Sistem grading yang transparan ini memastikan petani mendapatkan harga yang adil sesuai kualitas aktual jagung mereka, tanpa penilaian subjektif.</p>',
    body_en: '<p>The Indonesian National Standard (SNI) for dried shelled corn is the main reference in corn trading in Indonesia. Key parameters include: maximum 14% moisture, maximum 20 ppb aflatoxin for animal feed, maximum 2% broken corn, and maximum 1% foreign matter.</p><p>PT PMP uses a three-tier grading system based on SNI, ensuring farmers receive fair prices based on actual corn quality.</p>',
    date: '2025-11-20',
    category: 'market',
    thumbnail: ''
  },
  {
    id: 'seed-012',
    title_id: 'Jagung Kalimantan Barat: Potensi, Tantangan, dan Solusi PT PMP',
    title_en: 'West Kalimantan Corn: Potential, Challenges, and PT PMP Solutions',
    body_id: '<p>Kalimantan Barat memiliki potensi produksi jagung yang besar dengan luas lahan pertanian jagung mencapai 12.000 hektar dan pertumbuhan produksi 5% per tahun. Namun, potensi ini belum sepenuhnya dimanfaatkan karena beberapa tantangan yang dihadapi petani lokal.</p><h3>Tantangan Utama Petani Jagung Kalbar</h3><p>Pertama, keterbatasan fasilitas pengeringan — sebagian besar petani masih bergantung pada pengeringan matahari yang tidak efisien. Kedua, akses pasar yang terbatas menyebabkan petani sering menjual ke tengkulak dengan harga di bawah pasar. Ketiga, kualitas jagung yang tidak konsisten menyulitkan pemasaran ke industri besar.</p><h3>Solusi PT PMP</h3><p>PT PMP hadir untuk mengatasi ketiga tantangan tersebut sekaligus: menyediakan fasilitas pengeringan modern berkapasitas 300 ton/hari, menjadi akses pasar langsung ke industri pakan dan Bulog, serta membantu petani meningkatkan kualitas jagung melalui sistem grading yang transparan.</p><p>Bergabunglah bersama jaringan mitra petani PT PMP. Hubungi kami di 0821-2722-8722.</p>',
    body_en: '<p>West Kalimantan has great corn production potential with 12,000 hectares of corn farmland and 5% annual production growth. PT PMP addresses the main challenges: limited drying facilities, restricted market access, and inconsistent corn quality — providing modern 300 ton/day drying capacity, direct market access, and transparent grading.</p>',
    date: '2025-11-05',
    category: 'company',
    thumbnail: ''
  },
  {
    id: 'seed-013',
    title_id: 'Musim Panen Jagung 2025 di Kalimantan Barat: Hasil dan Proyeksi',
    title_en: 'Corn Harvest Season 2025 in West Kalimantan: Results and Projections',
    body_id: '<p>Musim panen jagung 2025 di Kalimantan Barat mencatat hasil yang menggembirakan. Produksi jagung di wilayah Bengkayang dan sekitarnya menunjukkan peningkatan dibandingkan tahun sebelumnya, didorong oleh cuaca yang kondusif dan semakin luasnya lahan pertanian jagung.</p><p>PT PMP aktif terlibat dalam musim panen ini dengan menyerap jagung dari petani di berbagai kabupaten di Kalimantan Barat. Kapasitas pengeringan 300 ton per hari memungkinkan PT PMP untuk merespons lonjakan pasokan jagung pada puncak musim panen.</p><p>Untuk musim panen 2026, PT PMP memproyeksikan peningkatan volume pembelian seiring dengan bertambahnya jaringan mitra petani. Petani yang belum pernah bermitra dengan PT PMP diundang untuk menghubungi tim kami dan mendapatkan penawaran harga terbaik.</p><p>Informasi lebih lanjut: 0821-2722-8722 atau kunjungi fasilitas kami di Jl. Bukit Tinggi, Sebalo, Bengkayang.</p>',
    body_en: '<p>The 2025 corn harvest season in West Kalimantan recorded encouraging results. PT PMP was actively involved in absorbing corn from farmers across various regencies. For the 2026 harvest season, PT PMP projects increased purchase volumes with an expanding farmer partner network.</p>',
    date: '2025-10-20',
    category: 'market',
    thumbnail: ''
  },
  {
    id: 'seed-003',
    title_id: 'Kebutuhan Jagung Kalimantan Barat Terus Meningkat, PT PMP Siap Memenuhi',
    title_en: 'West Kalimantan Corn Demand Continues to Rise, PT PMP Ready to Meet It',
    body_id: '<p>Berdasarkan data terbaru, kebutuhan jagung di Kalimantan Barat terus mengalami peningkatan yang signifikan. Kota Singkawang saja membutuhkan lebih dari 10.000 ton jagung per bulan untuk memenuhi kebutuhan industri pakan lokal.</p><p>Angka ini belum termasuk kebutuhan untuk cadangan pangan pemerintah melalui Bulog dan potensi ekspor ke Malaysia yang terus berkembang. Pertumbuhan produksi jagung di Kalimantan Barat sendiri mencapai 5% per tahun dengan luas lahan mencapai 12.000 hektar.</p><p>PT PMP melihat peluang ini sebagai momentum untuk terus berkembang dan meningkatkan kapasitas operasionalnya. "Kami sedang mengkaji rencana ekspansi untuk merespons permintaan pasar yang terus meningkat," kata Direktur PT PMP.</p>',
    body_en: '<p>Based on the latest data, corn demand in West Kalimantan continues to experience significant increases. Singkawang City alone needs more than 10,000 tons of corn per month to meet local feed industry needs.</p><p>This figure does not include government food reserve needs through Bulog and the growing potential for export to Malaysia. Corn production growth in West Kalimantan itself reaches 5% per year with farmland covering 12,000 hectares.</p><p>PT PMP sees this opportunity as momentum to continue growing and increasing its operational capacity. "We are evaluating expansion plans to respond to continuously increasing market demand," said the PT PMP Director.</p>',
    date: '2025-08-20',
    category: 'market',
    thumbnail: ''
  }
];

var _newsCache = null;
var _newsReady = false;
var _newsCallbacks = [];

function _newsSupa() {
  return (typeof getSupabase === 'function') ? getSupabase() : null;
}

function loadNews(callback) {
  if (_newsReady) {
    if (callback) callback(_newsCache);
    return;
  }
  if (callback) _newsCallbacks.push(callback);
  if (_newsCallbacks.length > 1) return;

  var attempts = 0;
  var timer = setInterval(function () {
    attempts++;
    var sb = _newsSupa();
    if (sb || attempts >= 50) {
      clearInterval(timer);
      if (sb) {
        sb.from('news_data').select('*').eq('id', 'main').maybeSingle()
          .then(function (res) {
            if (res.data && res.data.data && Array.isArray(res.data.data)) {
              console.log('[NewsDB] Loaded from Supabase:', res.data.data.length, 'articles');
              _newsCache = res.data.data;
            } else {
              console.log('[NewsDB] No data, seeding defaults');
              _newsCache = SEED_ARTICLES;
              _syncToSupabase(_newsCache);
            }
            _newsReady = true;
            _fireNewsCallbacks();
          })
          .catch(function (err) {
            console.error('[NewsDB] Load failed:', err);
            _newsCache = SEED_ARTICLES;
            _newsReady = true;
            _fireNewsCallbacks();
          });
      } else {
        console.warn('[NewsDB] Supabase not available, using defaults');
        _newsCache = SEED_ARTICLES;
        _newsReady = true;
        _fireNewsCallbacks();
      }
    }
  }, 100);
}

function _fireNewsCallbacks() {
  var cbs = _newsCallbacks.slice();
  _newsCallbacks = [];
  cbs.forEach(function (cb) { cb(_newsCache); });
}

function _syncToSupabase(articles) {
  var sb = _newsSupa();
  if (!sb) { console.error('[NewsDB] Cannot sync: Supabase not available'); return; }
  sb.from('news_data').upsert({
    id: 'main',
    data: articles,
    updated_at: new Date().toISOString()
  }).then(function (res) {
    if (res.error) {
      console.error('[NewsDB] Sync FAILED:', res.error.message);
    } else {
      console.log('[NewsDB] Synced OK,', articles.length, 'articles');
    }
  });
}

function getArticles() {
  return _newsCache || SEED_ARTICLES;
}

function saveArticles(articles) {
  _newsCache = articles;
  _syncToSupabase(articles);
}

function getArticleById(id) {
  return getArticles().find(function (a) { return a.id === id; }) || null;
}

function deleteArticle(id) {
  var articles = getArticles().filter(function (a) { return a.id !== id; });
  _newsCache = articles;
  _syncToSupabase(articles);
}

function upsertArticle(article) {
  var articles = getArticles().slice();
  var idx = -1;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].id === article.id) { idx = i; break; }
  }
  if (idx >= 0) { articles[idx] = article; } else { articles.unshift(article); }
  _newsCache = articles;
  console.log('[NewsDB] Saving article:', article.id, 'thumbnail:', (article.thumbnail || '').length > 0 ? 'YES (' + (article.thumbnail || '').length + ' chars)' : 'none');
  _syncToSupabase(articles);
}

function generateId() {
  return 'art-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  var opts = { year: 'numeric', month: 'long', day: 'numeric' };
  var locale = lang === 'en' ? 'en-US' : 'id-ID';
  return d.toLocaleDateString(locale, opts);
}

function getCategoryLabel(cat, lang) {
  var labels = {
    id: { company: 'Kabar Perusahaan', market: 'Pasar', sustainability: 'Keberlanjutan', government: 'Pemerintahan' },
    en: { company: 'Company News', market: 'Market', sustainability: 'Sustainability', government: 'Government' }
  };
  return (labels[lang] || labels['id'])[cat] || cat;
}

function getArticleTitle(article, lang) {
  return lang === 'en' ? (article.title_en || article.title_id) : (article.title_id || article.title_en);
}

function getArticleBody(article, lang) {
  return lang === 'en' ? (article.body_en || article.body_id) : (article.body_id || article.body_en);
}

function getArticleExcerpt(article, lang, maxLen) {
  maxLen = maxLen || 120;
  var body = getArticleBody(article, lang);
  var text = body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

function renderNewsCards(container, articles, lang, readMoreText) {
  if (!container) return;
  if (!articles || articles.length === 0) { container.innerHTML = ''; return; }
  container.innerHTML = articles.map(function (article) {
    return '<div class="news-card animate-on-scroll">' +
      '<div class="news-card-img">' +
        (article.thumbnail
          ? '<img src="' + article.thumbnail + '" alt="' + getArticleTitle(article, lang) + '" loading="lazy">'
          : '<span>\uD83C\uDF3D</span>') +
      '</div>' +
      '<div class="news-card-body">' +
        '<div class="news-card-meta">' +
          '<span class="badge badge-gold">' + getCategoryLabel(article.category, lang) + '</span>' +
          '<span>\uD83D\uDCC5 ' + formatDate(article.date, lang) + '</span>' +
        '</div>' +
        '<h3>' + getArticleTitle(article, lang) + '</h3>' +
        '<p>' + getArticleExcerpt(article, lang) + '</p>' +
        '<a href="news-detail.html?id=' + article.id + '" class="btn-link">' + (readMoreText || 'Read More \u2192') + '</a>' +
      '</div>' +
    '</div>';
  }).join('');
}

loadNews();

window.NewsDB = {
  loadNews: loadNews,
  getArticles: getArticles,
  saveArticles: saveArticles,
  getArticleById: getArticleById,
  deleteArticle: deleteArticle,
  upsertArticle: upsertArticle,
  generateId: generateId,
  formatDate: formatDate,
  getCategoryLabel: getCategoryLabel,
  getArticleTitle: getArticleTitle,
  getArticleBody: getArticleBody,
  getArticleExcerpt: getArticleExcerpt,
  renderNewsCards: renderNewsCards
};
