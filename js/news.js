/* ========================================
   News / Articles - Supabase + localStorage fallback
   ======================================== */

const NEWS_KEY = 'pmp_news';

// Seed articles
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

  // Wait for Supabase
  var attempts = 0;
  var timer = setInterval(function () {
    attempts++;
    var sb = _newsSupa();
    if (sb || attempts >= 30) {
      clearInterval(timer);
      if (sb) {
        sb.from('articles').select('*').order('date', { ascending: false })
          .then(function (res) {
            if (res.data && res.data.length > 0) {
              _newsCache = res.data;
              _newsReady = true;
              _fireNewsCallbacks();
            } else if (res.error) {
              console.warn('Supabase articles error:', res.error.message);
              _loadNewsLocal();
            } else {
              // Empty — seed from defaults
              _newsCache = SEED_ARTICLES;
              _newsReady = true;
              _fireNewsCallbacks();
              // Seed to Supabase
              sb.from('articles').upsert(SEED_ARTICLES).then(function () {
                console.log('Articles seeded to Supabase');
              });
            }
          })
          .catch(function () { _loadNewsLocal(); });
      } else {
        _loadNewsLocal();
      }
    }
  }, 100);
}

function _loadNewsLocal() {
  try {
    var data = localStorage.getItem(NEWS_KEY);
    if (data) {
      _newsCache = JSON.parse(data);
    } else {
      _newsCache = SEED_ARTICLES;
      localStorage.setItem(NEWS_KEY, JSON.stringify(SEED_ARTICLES));
    }
  } catch (e) {
    _newsCache = SEED_ARTICLES;
  }
  _newsReady = true;
  _fireNewsCallbacks();
}

function _fireNewsCallbacks() {
  var cbs = _newsCallbacks.slice();
  _newsCallbacks = [];
  cbs.forEach(function (cb) { cb(_newsCache); });
}

function getArticles() {
  if (_newsCache) return _newsCache;
  // Sync fallback for code that calls getArticles() before loadNews completes
  try {
    var data = localStorage.getItem(NEWS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return SEED_ARTICLES;
}

function saveArticles(articles) {
  _newsCache = articles;
  localStorage.setItem(NEWS_KEY, JSON.stringify(articles));
  var sb = _newsSupa();
  if (sb) {
    // Sync to Supabase: delete all then upsert
    sb.from('articles').delete().neq('id', '').then(function () {
      sb.from('articles').upsert(articles);
    });
  }
}

function getArticleById(id) {
  return getArticles().find(a => a.id === id) || null;
}

function deleteArticle(id) {
  const articles = getArticles().filter(a => a.id !== id);
  _newsCache = articles;
  localStorage.setItem(NEWS_KEY, JSON.stringify(articles));
  var sb = _newsSupa();
  if (sb) {
    sb.from('articles').delete().eq('id', id);
  }
}

function upsertArticle(article) {
  const articles = getArticles();
  const idx = articles.findIndex(a => a.id === article.id);
  if (idx >= 0) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  _newsCache = articles;
  localStorage.setItem(NEWS_KEY, JSON.stringify(articles));
  var sb = _newsSupa();
  if (sb) {
    sb.from('articles').upsert(article);
  }
}

function generateId() {
  return 'art-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}

// Render helpers
function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  return d.toLocaleDateString(locale, opts);
}

function getCategoryLabel(cat, lang) {
  const labels = {
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

function getArticleExcerpt(article, lang, maxLen = 120) {
  const body = getArticleBody(article, lang);
  const text = body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

function renderNewsCards(container, articles, lang, readMoreText) {
  if (!container) return;
  if (!articles || articles.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = articles.map(article => `
    <div class="news-card animate-on-scroll">
      <div class="news-card-img">
        ${article.thumbnail
          ? `<img src="${article.thumbnail}" alt="${getArticleTitle(article, lang)}" loading="lazy">`
          : '<span>🌽</span>'}
      </div>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span class="badge badge-gold">${getCategoryLabel(article.category, lang)}</span>
          <span>📅 ${formatDate(article.date, lang)}</span>
        </div>
        <h3>${getArticleTitle(article, lang)}</h3>
        <p>${getArticleExcerpt(article, lang)}</p>
        <a href="news-detail.html?id=${article.id}" class="btn-link">${readMoreText || 'Read More →'}</a>
      </div>
    </div>
  `).join('');
}

// Auto-load
loadNews();

// Export
window.NewsDB = {
  loadNews,
  getArticles,
  saveArticles,
  getArticleById,
  deleteArticle,
  upsertArticle,
  generateId,
  formatDate,
  getCategoryLabel,
  getArticleTitle,
  getArticleBody,
  getArticleExcerpt,
  renderNewsCards
};
