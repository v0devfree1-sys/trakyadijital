export const IMAGES = {
  hero: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/d43e71dc3_generated_image.png",
  tarim: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/74660c7b7_generated_image.png",
  sanayi: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/534722f83_generated_image.png",
  eticaret: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/d376d2c77_generated_image.png",
  esnaf: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/722fef4d9_generated_image.png",
  kafe: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/77da54e8c_generated_image.png",
  insaat: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/deca26a3f_generated_image.png",
  saglik: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/cbea7f55d_generated_image.png",
  egitim: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/11a012bb2_generated_image.png",
  otomotiv: "https://media.base44.com/images/public/6aabd3502a3dd7fcf495cd2b/b4a126b7a_generated_image.png",
  };

export const SECTORS = [
  {
    id: "tarim",
    name: "Tarım & Gıda",
    tagline: "Verimli topraklar, dijital hasat",
    description:
      "Trakya'nın ayçiçeği, buğday ve bağ-bahçe işletmeleri için ürün katalogları, B2B sipariş sistemleri ve hasat takibi entegrasyonları kuruyoruz.",
    image: IMAGES.tarim,
    highlights: ["Ürün ve fiyat kataloğu", "B2B toptan sipariş portalı", "Hasat ve stok takip entegrasyonu", "Google Haritalar & yerel SEO"],
    detail: "Tarım işletmelerinin dijitalleşme oranı Trakya'da hızla artıyor. Sizin için ürünlerinizi sergileyen, toptan müşterilerinize özel fiyat listeleri sunan ve mobil cihazdan yönetilebiren bir katalog sitesi kuruyoruz. Ziraat faaliyetlerinizle entegre çalışır; hasat sezonunda güncel arz bilgisi otomatik yayımlanır."
  },
  {
    id: "sanayi",
    name: "Sanayi & İmalat",
    tagline: "Ağır sanayi, hassas mühendislik",
    description:
      "Çorlu ve Lüleburgaz'daki tekstil, makine ve imalat firmaları için B2B katalog siteleri, RFQ formları ve CAD dosya paylaşım altyapıları.",
    image: IMAGES.sanayi,
    highlights: ["B2B ürün katalogu", "Teklif (RFQ) formları", "CAD / teknik döküman paylaşımı", "Çoklu dil altyapısı"],
    detail: "İhracat yapan sanayi firmalarının en büyük eksiği görünürlüktür. Kurumsal kimliğinizi yansıtan, teknik dökümanlarınızı yönetebileceğiniz ve yurt dışı müşterinizin dilinde yayın yapan bir B2B platform kuruyoruz; RFQ formu gelen her talep panelinize düşer."
  },
  {
    id: "eticaret",
    name: "E-Ticaret",
    tagline: "Satış, teslimat, büyüme",
    description:
      "Yerel üreticileri Türkiye geneline satışa taşıyan, ödeme ve kargo entegrasyonları hazır e-ticaret siteleri ve pazaryeri bağlantıları.",
    image: IMAGES.eticaret,
    highlights: ["Sanal POS ve ödeme entegrasyonu", "Kargo otomasyonu", "Pazaryeri (Trendyol, Hepsiburada) bağlantısı", "Stok ve sipariş yönetimi"],
    detail: "Trakya'da üretilen gıda, tekstil ve el işi ürünleri Türkiye'nin dört bir yanına ulaştırıyoruz. Sanal POS, kargo firmaları ve pazaryeri entegrasyonlarıyla satışa hazır bir mağaza kuruyor, ürünlerinizi fotoğrafçılıktan SEO'ya kadar uçtan uca hazırlıyoruz."
  },
  {
    id: "yerel-ticaret",
    name: "Yerel Ticaret & Hizmet",
    tagline: "Mahallenin en görünüz işletmesi",
    description:
      "Tekirdağ, Edirne ve Kırklareli'ndeki kafe, restoran, kuyumcu ve hizmet işletmeleri için Google Haritalar optimizasyonu ve mobil uyumlu siteler.",
    image: IMAGES.hero,
    highlights: ["Google Haritalar optimizasyonu", "Yerel SEO ve yorum yönetimi", "Rezervasyon ve iletişim formları", "Mobil öncelikli tasarım"],
    detail: "Müşteriniz sizi önce telefonundan arıyor. Google Haritalar kaydınızı optimize ediyor, mobil uyumlu hızlı sitenizle randevu ve rezervasyon alıyor, yorumlarınızı yöneterek bölgenizde ilk sayfada görünmenizi sağlıyoruz."
  },
  {
    id: "esnaf",
    name: "Esnaf & Dükkan",
    tagline: "Çarşının dijital vitrini",
    description:
      "Bakkal, market, kuyumcu, berber ve terzi gibi mahalle işletmeleri için Google Haritalar kaydı, WhatsApp sipariş hattı ve vitrin sitesi.",
    image: IMAGES.esnaf,
    highlights: ["Google Haritalar & Yerel SEO", "WhatsApp Business sipariş hattı", "Vitrin ve duyuru sayfası", "Haftalık kampanya alanı"],
    detail: "Trakya'nın çarşıları yüzyıllardır ticaretin kalbi; müşteriniz artık orada telefonla dolaşıyor. Google Haritalar kaydınızı optimize ediyor, WhatsApp üzerinden sipariş alabileceğiniz bir hattı kuruyor, kampanyalarınızı anında yayınladığınız hızlı bir vitrin sitesi veriyoruz. Mahallenizin en görünür esnafı olun."
  },
  {
    id: "kafe-restoran",
    name: "Kafe & Restoran",
    tagline: "Masadan ekrana büyüyen lezzet",
    description:
      "Kafe, restoran ve pastane işletmeleri için QR dijital menüler, rezervasyon formları ve Instagram entegrasyonlu şık siteler.",
    image: IMAGES.kafe,
    highlights: ["QR kod dijital menü", "Online rezervasyon formu", "Instagram akış entegrasyonu", "Google yorum yönetimi"],
    detail: "Menünüz telefon ekranında iştah açıcı görünmeli. QR kodla okutulan dijital menünüz fotoğraflarıyla birlikte açılır; rezervasyon formu boş masalarınızı hafta sonları doldurur. Instagram gönderilerinizi sitenizde otomatik yayınlıyor, Google yorumlarınızı öne çıkararak yeni müşteri kazanmanızı sağlıyoruz."
  },
  {
    id: "insaat-emlak",
    name: "İnşaat & Emlak",
    tagline: "Projeleriniz ekranda da sağlam",
    description:
      "İnşaat firmaları ve emlak ofisleri için proje vitrin siteleri, portföy yönetimi ve satış/talep formları.",
    image: IMAGES.insaat,
    highlights: ["Proje vitrin sitesi", "Portföy ve plan galerisi", "Arza / satış talep formları", "Sanal tur ve görsel sunum"],
    detail: "Konut ve ticari projelerinizi alıcıya 7/24 sunan bir vitrin kuruyoruz; kat planları, görseller ve fiyat listeleri panelden güncellenir. Gelen her arza talebi panelinize düşer, emlak ofisleriniz için portföy araması ve filtreleme kolayca yönetilir."
  },
  {
    id: "saglik-guzellik",
    name: "Sağlık & Güzellik",
    tagline: "Güven veren dijital kimlik",
    description:
      "Poliklinik, diş kliniği, güzellik merkezi ve spor salonları için KVKK uyumlu randevu sistemleri ve kurumsal siteler.",
    image: IMAGES.saglik,
    highlights: ["Online randevu sistemi", "Hizmet ve uzmanlık sayfaları", "KVKK uyumlu formlar", "Hasta / üye yorumları"],
    detail: "Sağlıkta güven her şeydir; siteniz de bunu yansıtmalı. Uzmanlık alanlarınızı ve hizmetlerinizi anlatan kurumsal sayfalar, KVKK uyumlu randevu formları ve yorumlarınızla bölgenizin ilk tercihi olmanızı sağlıyoruz."
  },
  {
    id: "egitim-kurs",
    name: "Eğitim & Kurs",
    tagline: "Kayıt akışı kesintisiz",
    description:
      "Özel kurslar, akademiler ve eğitim kurumları için program tanıtımı, online kayıt ve veli duyuru sistemleri.",
    image: IMAGES.egitim,
    highlights: ["Online kurs kayıt formu", "Eğitim takvimi ve programlar", "Ödeme bilgisi ve POS entegrasyonu", "Veli / öğrenci duyuru alanı"],
    detail: "Kayıt döneminde veliler sizi telefonundan arıyor. Programlarınızı, eğitmenlerinizi ve ücretleri net gösteren bir site kuruyor, online kayıt formuyla kontenjanlarınızı hızla dolduruyoruz; duyurularınız tek tıkla tüm velilere ulaşır."
  },
  {
    id: "otomotiv-servis",
    name: "Otomotiv & Servis",
    tagline: "Galeriden servise tek adres",
    description:
      "Oto galeriler, yedek parça ve servis işletmeleri için araç galerileri, ekspertiz randevuları ve servis takibi.",
    image: IMAGES.otomotiv,
    highlights: ["İkinci el araç galerisi", "Ekspertiz & servis randevusu", "Fiyat listesi yayını", "WhatsApp ile hızlı iletişim"],
    detail: "Araçlarınızı fotoğrafı ve detayıyla yayınlayan bir galeri kuruyor, potansiyel alıcıyı WhatsApp'ta size bağlıyoruz. Servis ve ekspertiz işletmeleri için randevu formu ile birlikte yoğunluğunuzu planlamanızı sağlayan takip sistemi sunuyoruz."
  },
];

export const SERVICES = [
  { id: "web-tasarim", title: "Kurumsal Web Tasarımı", description: "Vercel standardında, yüksek hızlı ve animasyonlu kurumsal siteler.", icon: "Globe" },
  { id: "eticaret", title: "E-Ticaret Kurulumu", description: "Ödeme, kargo ve pazaryeri entegrasyonları hazır satış mağazası.", icon: "ShoppingBag" },
  { id: "seo", title: "SEO & Yerel Arama", description: "Trakya'da 'web tasarım' aramalarında ilk sayfa hedefli SEO çalışması.", icon: "Search" },
  { id: "google-haritalar", title: "Google Haritalar Optimizasyonu", description: "Haritalar kaydınız, yorumlarınız ve yerel görünürlüğünüz.", icon: "MapPin" },
  { id: "mobil", title: "Mobil Uyumlama", description: "Mevcut sitenizi mobil öncelikli, hızlı ve erişilebilir hale getirme.", icon: "Smartphone" },
  { id: "destek", title: "Bakım & Türkçe Destek", description: "7/24 Türkçe teknik destek, yedekleme ve güvenlik güncellemeleri.", icon: "Wrench" },
];

export const SERVICE_DETAILS = {
  "web-tasarim": {
    tagline: "Markanız ekranda keskin ve hızlı dursun",
    intro:
      "Kurumsal kimliğinizi yansıtan, animasyonlu ve yüksek performanslı tanıtım siteleri kuruyoruz. Şablon değil, size özel tasarım; onayınız olmadan geliştirmeye geçmiyoruz.",
    kapsam: [
      "Size özel tasarım — sınırsız revizyon",
      "Mobil ve tablet uyumlu responsive yapı",
      "İletişim ve talep formları + spam koruması",
      "SSL, alan adı ve kurumsal e-posta kurulumu",
      "Google kayıtları ve temel SEO altyapısı",
      "Yönetim paneliyle içerik düzenleme eğitimi",
    ],
    sure: "Ortalama 14 iş günü",
    fiyat: "4.900 TL'den başlayan paketlerle",
  },
  eticaret: {
    tagline: "Satışa hazır mağaza, ilk günden itibaren",
    intro:
      "Ürünlerinizi Türkiye'nin dört bir yanına satmanız için ödeme, kargo ve stok entegrasyonları hazır e-ticaret mağazası kuruyor, satışa başlarken ekibinizi de eğitiyoruz.",
    kapsam: [
      "Sanal POS (iyzico, PayTR, banka POS) kurulumu",
      "Kargo firması entegrasyonu ve takibi",
      "Trendyol / Hepsiburada pazaryeri bağlantısı",
      "Stok, sipariş ve iade yönetimi",
      "Ürün fotoğraf düzenleme desteği",
      "Satış ekibi için 1:1 eğitim",
    ],
    sure: "Ortalama 21 iş günü",
    fiyat: "14.900 TL E-Ticaret paketiyle",
  },
  seo: {
    tagline: "Trakya aramalarında ilk sayfa hedefi",
    intro:
      "Teknik altyapıdan içerik stratejisine kadar kapsamlı SEO çalışmasıyla hedef kelimelerde görünürlüğünüzü sürekli büyütüyoruz.",
    kapsam: [
      "Teknik denetim: hız, mobil uyum, yapısal veri",
      "Sayfa içi optimizasyon (başlık, meta, içerik)",
      "Google Search Console & Analytics kurulumu",
      "Yerel anahtar kelime stratejisi",
      "Rakip analizi ve konumlandırma",
      "Aylık performans raporu",
    ],
    sure: "İlk sonuçlar 8-12 hafta içinde",
    fiyat: "Keşif görüşmesinde size özel yazılı teklif",
  },
  "google-haritalar": {
    tagline: "Sizi telefonunda arayan müşteriye ilk adımda ulaşın",
    intro:
      "Google Haritalar kaydınızı optimize ediyor, yorumlarınızı yönetiyor, bölgenizde 'yakınımda' aramalarında öne çıkmanızı sağlıyoruz.",
    kapsam: [
      "Google Business Profile kurulumu ve optimizasyonu",
      "Kategori, hizmet ve açıklama düzeni",
      "Fotoğraf ve ürün/görsel yayını",
      "Yorum yönetimi ve yanıt şablonları",
      "Yerel arama (local pack) takibi",
      "Aylık görünürlük raporu",
    ],
    sure: "Kurulum 3-5 iş günü, etki 2-6 hafta",
    fiyat: "Keşif görüşmesinde size özel yazılı teklif",
  },
  mobil: {
    tagline: "Masaüstü değil, telefon için tasarlanmış site",
    intro:
      "Mevcut sitenizi mobil öncelikli, hızlı ve erişilebilir hale getiriyoruz. Trakya'daki müşterinizin çoğunluğu telefonundan geliyor — siteniz buna hazır olmalı.",
    kapsam: [
      "Mobil kullanılabilirlik denetimi",
      "Dokunmatik alan ve menü düzenlemesi",
      "Sayfa hızı optimizasyonu (Core Web Vitals)",
      "Görsel sıkıştırma ve modern formatlar",
      "Google Mobile-Friendly uyumu",
      "Yayınlamadan önce test raporu",
    ],
    sure: "Ortalama 7-10 iş günü",
    fiyat: "Keşif görüşmesinde size özel yazılı teklif",
  },
  destek: {
    tagline: "Yayın sonrası da yanınızdayız",
    intro:
      "Siteniz yayınlandıktan sonra her şey yolunda gitsin diye düzenli bakım, güvenlik ve Türkçe destek sağlıyoruz; siz işinize bakın.",
    kapsam: [
      "7/24 Türkçe destek hattı",
      "Düzenli otomatik yedekleme",
      "Güvenlik ve sürüm güncellemeleri",
      "Aylık küçük içerik değişiklikleri",
      "Kesinti ve performans izleme",
      "Öncelikli iş emri hakkı",
    ],
    sure: "12 aylık taahhüt",
    fiyat: "1.900 TL'den başlayan yıllık paketle",
  },
};

export const PACKAGES = [
  {
    name: "Başlangıç",
    price: "₺4.900",
    period: "tek seferlik",
    description: "Kurumsal tanıtım sitesi",
    features: ["5 sayfaya kadar tasarım", "Mobil uyumlu ve hızlı", "SSL + alan adı kurulumu", "İletişim formları", "1 yıl hosting hediye"],
    popular: false,
  },
  {
    name: "Kurumsal",
    price: "₺9.900",
    period: "tek seferlik",
    description: "SEO ve içerik altyapısıyla",
    features: ["Sınırsız sayfa + blog", "SEO altyapısı ve Google kaydı", "Çoklu dil desteği", "AI asistan entegrasyonu", "Öncelikli destek"],
    popular: true,
  },
  {
    name: "E-Ticaret",
    price: "₺14.900",
    period: "tek seferlik",
    description: "Satışa hazır mağaza",
    features: ["Sanal POS + kargo entegrasyonu", "Pazaryeri bağlantıları", "Stok yönetimi", "Ürün fotoğraf düzenleme", "Satış eğitim desteği"],
    popular: false,
  },
];

export const STATS = [
  { value: "140+", label: "Tamamlanan Proje" },
  { value: "3", label: "İlde Aktif Hizmet" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "7/24", label: "AI Destek Hattı" },
];

export const TESTIMONIALS = [
  {
    quote: "Vitrin sitemiz yayına girdikten iki hafta sonra tüm Türkiye'den sipariş almaya başladık. WhatsApp hattı kurulumu dahil her şeyi düşündüler.",
    name: "Ayşe Demir",
    business: "Meriç Badem Ezmecisi",
    city: "Edirne / Meriç",
  },
  {
    quote: "Araç galerimizi üç haftada yayına aldılar; online galeri sayesinde satışlarımız neredeyse ikiye katlandı. Destek her zaman Türkçe ve hızlı.",
    name: "Mehmet Karaca",
    business: "Çorlu Oto Galeri Merkezi",
    city: "Tekirdağ / Çorlu",
  },
  {
    quote: "QR dijital menü ve rezervasyon sistemiyle hafta sonları masalarımız hiç boş kalmıyor. Google yorumları yönetmeleri tek başına parayı ödedi.",
    name: "Elif Yılmaz",
    business: "Rakoczi Kafe & Bistro",
    city: "Tekirdağ / Süleymanpaşa",
  },
];

export const PROCESS = [
  { step: "01", title: "Keşif", description: "İşletmenizi, rakiplerinizi ve hedef kitlenizi analiz ediyoruz." },
  { step: "02", title: "Tasarım", description: "Sektörünüze özel, Vercel standardında animasyonlu tasarımı onayınıza sunuyoruz." },
  { step: "03", title: "Geliştirme", description: "Hız, güvenlik ve SEO odaklı kodlamayla sitenizi hayata geçiriyoruz." },
  { step: "04", title: "Büyüme", description: "Aylık SEO çalışması, bakım ve AI destekli analizle büyümenizi sürdürüyoruz." },
];