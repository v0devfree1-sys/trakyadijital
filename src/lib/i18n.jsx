import { createContext, useContext, useEffect, useState } from "react";

// Çoklu dil sözlükleri: anahtar olarak Türkçe metin kullanılır; aktif dilde
// çevirisi olmayan metinler olduğu gibi Türkçe kalır.
const EN = {
  // Navbar
  "Ana Sayfa": "Home",
  "Sektörler": "Sectors",
  "İşletmeler": "Directory",
  "İz Bıraktıklarımız": "Our Work",
  "İletişim": "Contact",
  "AI Asistan": "AI Assistant",
  "AI Asistanla Konuş": "Talk to the AI Assistant",
  "Menü": "Menu",

  // Hero
  "DİJİTRAK AJANS — TEKİRDAĞ · EDİRNE · KIRKLARELİ": "DIJITRAK AGENCY — TEKIRDAĞ · EDIRNE · KIRKLARELI",
  "AI ASİSTAN AKTİF — 7/24": "AI ASSISTANT ONLINE — 24/7",
  "Trakya'nın Toprağını ": "We Turn Trakya's Soil ",
  "Dijitale": "Digital",
  " Dönüştürüyoruz": "",
  "Tarım, sanayi ve yerel ticaret işletmelerine Vercel standardında web tasarımı, e-ticaret ve SEO hizmetleri. AI destekli ekibimizle bölgenin dijital mimarıyız.":
    "Web design, e-commerce and SEO services built to the Vercel standard for agriculture, industry and local trade businesses. With our AI-powered team, we are the region's digital architect.",
  "Hizmetleri Keşfet": "Explore Services",
  "HASAT 2026 — TRAKYA OVASI": "HARVEST 2026 — THRACE PLAIN",
  "Trakya'da gün batımında hasat makinesi": "Combine harvester at sunset in Trakya",

  // ServicesGrid
  "HİZMETLER": "SERVICES",
  "Uçtan uca dijital altyapı": "End-to-end digital infrastructure",
  "Tasarımdan SEO'ya, e-ticaretten bakıma kadar işletmenizin ihtiyaç duyduğu her dijital hizmet tek çatı altında.":
    "From design to SEO, from e-commerce to maintenance — every digital service your business needs under one roof.",
  "Kurumsal Web Tasarımı": "Corporate Web Design",
  "Vercel standardında, yüksek hızlı ve animasyonlu kurumsal siteler.": "High-speed, animated corporate websites built to the Vercel standard.",
  "E-Ticaret Kurulumu": "E-Commerce Setup",
  "Ödeme, kargo ve pazaryeri entegrasyonları hazır satış mağazası.": "A ready-to-sell store with payment, shipping and marketplace integrations.",
  "SEO & Yerel Arama": "SEO & Local Search",
  "Trakya'da 'web tasarım' aramalarında ilk sayfa hedefli SEO çalışması.": "SEO work targeting the first page for 'web design' searches in Trakya.",
  "Google Haritalar Optimizasyonu": "Google Maps Optimization",
  "Haritalar kaydınız, yorumlarınız ve yerel görünürlüğünüz.": "Your Maps listing, reviews and local visibility.",
  "Mobil Uyumlama": "Mobile Adaptation",
  "Mevcut sitenizi mobil öncelikli, hızlı ve erişilebilir hale getirme.": "Making your existing site mobile-first, fast and accessible.",
  "Bakım & Türkçe Destek": "Maintenance & Turkish Support",
  "7/24 Türkçe teknik destek, yedekleme ve güvenlik güncellemeleri.": "24/7 Turkish technical support, backups and security updates.",

  // Stats
  "Tamamlanan Proje": "Completed Projects",
  "İlde Aktif Hizmet": "Provinces Served",
  "Müşteri Memnuniyeti": "Client Satisfaction",
  "AI Destek Hattı": "AI Support Line",

  // ChatPromo
  "Kafe için web sitesi ne kadara olur?": "How much would a website for a café cost?",
  "Kafe paketimiz QR dijital menü + rezervasyon formu içeriyor. Ayrıntı ve ödeme planını buradan paylaşabilirim…":
    "Our café package includes a QR digital menu + reservation form. I can share the details and payment plan here…",
  "Süremiz ne olur?": "How long would it take?",
  "Yayına alış ortalamamız 14 iş günü. Hemen keşif randevusu oluşturabilirim.":
    "Our average time to launch is 14 business days. I can set up a discovery call right away.",
  "AI ASİSTAN": "AI ASSISTANT",
  "Projenizi AI asistanla 5 dakikada netleştirin": "Clarify your project with the AI assistant in 5 minutes",
  "Fiyat, süreç ve sektör çözümleri — 7/24 Türkçe yanıt. Tek bir sohbetle ihtiyacınızı netleştirip teklifinizi ve randevunuzu anında oluşturuyor.":
    "Pricing, process and sector solutions — 24/7 answers. One chat clarifies your needs and instantly creates your quote and appointment.",
  "Sohbete Başla": "Start Chatting",
  "Formla Devam Et": "Continue with the Form",
  "Anında yanıt": "Instant answers",
  "7/24 aktif": "24/7 active",
  "teklif hazırlanıyor…": "preparing your quote…",

  // BudgetCalculator
  "BÜTÇE HESAPLAYICI": "BUDGET CALCULATOR",
  "Projenize 60 saniyede fiyat alın": "Get a price for your project in 60 seconds",
  "Sektörünüzü ve ihtiyaçlarınızı seçin, tahmini proje bütçeniz anında hesaplansın.":
    "Pick your sector and needs, and your estimated project budget is calculated instantly.",
  "01 — SEKTÖRÜNÜZ": "01 — YOUR SECTOR",
  "02 — İHTİYAÇLARINIZ": "02 — YOUR NEEDS",
  "03 — KAPSAM": "03 — SCOPE",
  "Diğer": "Other",
  "Kurumsal Web Sitesi": "Corporate Website",
  "Özel tasarım, mobil uyumlu": "Custom design, mobile-friendly",
  "E-Ticaret Altyapısı": "E-Commerce Infrastructure",
  "Ödeme, stok, kargo entegrasyonu": "Payment, stock and shipping integration",
  "SEO Optimizasyonu": "SEO Optimization",
  "Teknik SEO + anahtar kelime planı": "Technical SEO + keyword plan",
  "Yerel SEO & Haritalar": "Local SEO & Maps",
  "Google Business profil yönetimi": "Google Business profile management",
  "İçerik & Fotoğraf": "Content & Photography",
  "Profesyonel çekim + metinler": "Professional shoots + copywriting",
  "Yıllık Bakım & Destek": "Annual Maintenance & Support",
  "Güncelleme, güvenlik, raporlama": "Updates, security, reporting",
  "Hızlı Başlangıç": "Quick Start",
  "Profesyonel": "Professional",
  "Kurumsal": "Corporate",
  "Sayfa sayısı:": "Page count:",
  "(web sitesi seçiliyken aktif)": "(active when website is selected)",
  "TAHMİNİ PROJE BÜTÇESİ": "ESTIMATED PROJECT BUDGET",
  "aralığı": "range",
  "Ek sayfalar": "Extra pages",
  "Sektör & kapsam katsayısı": "Sector & scope multiplier",
  "Hesaplama için en az bir hizmet seçin.": "Select at least one service to calculate.",
  "Kesin teklifi AI asistanla al": "Get an exact quote via the AI assistant",
  "Fiyatlar bilgilendirme amaçlı tahminlerdir; kesin teklif keşif görüşmesi sonrası verilir.":
    "Prices are informational estimates; a final quote is provided after a discovery call.",

  // SectorHub / Sectors
  "SEKTÖREL ÇÖZÜMLER": "SECTOR SOLUTIONS",
  "Sektörünüzü biliyor muyuz? Evet.": "Do we know your sector? Yes.",
  "Tarımından sanayisine, Trakya'nın her sektörüne özel hazırlanmış dijital çözümler.":
    "Digital solutions tailored to every sector in Trakya, from agriculture to industry.",
  "Sektör çözümünü incele": "Explore the sector solution",
  "SEKTÖR": "SECTOR",
  "Sektörünüze özel dijital altyapı": "Digital infrastructure tailored to your sector",
  "Her sektörün kendi dili, kendi müşterisi ve kendi dijital ihtiyaçları var. Trakya'da yıllardır sahadayız; çözümlerimiz de buradan çıkıyor.":
    "Every sector has its own language, its own customers and its own digital needs. We've been in the field in Trakya for years; our solutions come from there.",
  "Bu sektör için fiyat alın": "Get a price for this sector",
  "İletişim formu": "Contact form",

  // Process
  "SÜREÇ": "PROCESS",
  "Keşiften büyümeye, 4 adım": "From discovery to growth, in 4 steps",
  "Keşif": "Discovery",
  "İşletmenizi, rakiplerinizi ve hedef kitlenizi analiz ediyoruz.": "We analyze your business, competitors and target audience.",
  "Tasarım": "Design",
  "Sektörünüze özel, Vercel standardında animasyonlu tasarımı onayınıza sunuyoruz.":
    "We present an animated, Vercel-standard design tailored to your sector for your approval.",
  "Geliştirme": "Development",
  "Hız, güvenlik ve SEO odaklı kodlamayla sitenizi hayata geçiriyoruz.": "We build your site with speed-, security- and SEO-focused coding.",
  "Büyüme": "Growth",
  "Aylık SEO çalışması, bakım ve AI destekli analizle büyümenizi sürdürüyoruz.":
    "We sustain your growth with monthly SEO work, maintenance and AI-powered analysis.",

  // Testimonials
  "MÜŞTERİ YORUMLARI": "CLIENT REVIEWS",
  "Trakya'da konuşan sonuçlar": "Results that speak in Trakya",
  "Vitrin sitemiz yayına girdikten iki hafta sonra tüm Türkiye'den sipariş almaya başladık. WhatsApp hattı kurulumu dahil her şeyi düşündüler.":
    "Two weeks after our showcase site went live, we started receiving orders from all over Türkiye. They thought of everything, including the WhatsApp line setup.",
  "Araç galerimizi üç haftada yayına aldılar; online galeri sayesinde satışlarımız neredeyse ikiye katlandı. Destek her zaman Türkçe ve hızlı.":
    "They launched our car gallery in three weeks; thanks to the online gallery our sales nearly doubled. Support is always in Turkish and fast.",
  "QR dijital menü ve rezervasyon sistemiyle hafta sonları masalarımız hiç boş kalmıyor. Google yorumları yönetmeleri tek başına parayı ödedi.":
    "With the QR digital menu and reservation system, our tables never sit empty on weekends. Managing our Google reviews alone paid for itself.",

  // Packages
  "PAKETLER": "PACKAGES",
  "Net fiyatlar, sürpriz yok": "Clear prices, no surprises",
  "EN POPÜLER": "MOST POPULAR",
  "Teklif İste": "Request a Quote",
  "Teklif Al": "Get a Quote",
  "tek seferlik": "one-time",
  "Başlangıç": "Starter",
  "Kurumsal tanıtım sitesi": "Corporate showcase website",
  "5 sayfaya kadar tasarım": "Up to 5 pages of design",
  "Mobil uyumlu ve hızlı": "Mobile-friendly and fast",
  "SSL + alan adı kurulumu": "SSL + domain setup",
  "İletişim formları": "Contact forms",
  "1 yıl hosting hediye": "1 year of hosting included",
  "SEO ve içerik altyapısıyla": "With SEO and content infrastructure",
  "Sınırsız sayfa + blog": "Unlimited pages + blog",
  "SEO altyapısı ve Google kaydı": "SEO infrastructure and Google registration",
  "Çoklu dil desteği": "Multilingual support",
  "AI asistan entegrasyonu": "AI assistant integration",
  "Öncelikli destek": "Priority support",
  "E-Ticaret": "E-Commerce",
  "Satışa hazır mağaza": "A store ready to sell",
  "Sanal POS + kargo entegrasyonu": "Virtual POS + shipping integration",
  "Pazaryeri bağlantıları": "Marketplace connections",
  "Stok yönetimi": "Stock management",
  "Ürün fotoğraf düzenleme": "Product photo editing",
  "Satış eğitim desteği": "Sales training support",

  // Sectors data
  "Tarım & Gıda": "Agriculture & Food",
  "Verimli topraklar, dijital hasat": "Fertile soils, digital harvest",
  "Trakya'nın ayçiçeği, buğday ve bağ-bahçe işletmeleri için ürün katalogları, B2B sipariş sistemleri ve hasat takibi entegrasyonları kuruyoruz.":
    "For Trakya's sunflower, wheat and orchard businesses, we build product catalogues, B2B ordering systems and harvest-tracking integrations.",
  "Ürün ve fiyat kataloğu": "Product and price catalogue",
  "B2B toptan sipariş portalı": "B2B wholesale ordering portal",
  "Hasat ve stok takip entegrasyonu": "Harvest and stock tracking integration",
  "Google Haritalar & yerel SEO": "Google Maps & local SEO",
  "Tarım işletmelerinin dijitalleşme oranı Trakya'da hızla artıyor. Sizin için ürünlerinizi sergileyen, toptan müşterilerinize özel fiyat listeleri sunan ve mobil cihazdan yönetilebiren bir katalog sitesi kuruyoruz. Ziraat faaliyetlerinizle entegre çalışır; hasat sezonunda güncel arz bilgisi otomatik yayımlanır.":
    "Agricultural businesses in Trakya are digitalizing fast. We build a catalogue site that showcases your products, offers custom price lists to your wholesale customers, and is manageable from your phone. It works in sync with your farming operations: current supply info is published automatically during harvest season.",
  "Sanayi & İmalat": "Industry & Manufacturing",
  "Ağır sanayi, hassas mühendislik": "Heavy industry, precision engineering",
  "Çorlu ve Lüleburgaz'daki tekstil, makine ve imalat firmaları için B2B katalog siteleri, RFQ formları ve CAD dosya paylaşım altyapıları.":
    "B2B catalogue sites, RFQ forms and CAD file-sharing infrastructure for textile, machinery and manufacturing firms in Çorlu and Lüleburgaz.",
  "B2B ürün katalogu": "B2B product catalogue",
  "Teklif (RFQ) formları": "RFQ (quote) forms",
  "CAD / teknik döküman paylaşımı": "CAD / technical document sharing",
  "Çoklu dil altyapısı": "Multilingual infrastructure",
  "İhracat yapan sanayi firmalarının en büyük eksiği görünürlüktür. Kurumsal kimliğinizi yansıtan, teknik dökümanlarınızı yönetebileceğiniz ve yurt dışı müşterinizin dilinde yayın yapan bir B2B platform kuruyoruz; RFQ formu gelen her talep panelinize düşer.":
    "The biggest gap for exporting manufacturers is visibility. We build a B2B platform that reflects your corporate identity, manages your technical documents and publishes in your overseas customer's language; every RFQ request lands in your dashboard.",
  "Satış, teslimat, büyüme": "Sales, delivery, growth",
  "Yerel üreticileri Türkiye geneline satışa taşıyan, ödeme ve kargo entegrasyonları hazır e-ticaret siteleri ve pazaryeri bağlantıları.":
    "E-commerce sites with ready payment and shipping integrations that take local producers to nationwide sales, plus marketplace connections.",
  "Sanal POS ve ödeme entegrasyonu": "Virtual POS and payment integration",
  "Kargo otomasyonu": "Shipping automation",
  "Pazaryeri (Trendyol, Hepsiburada) bağlantısı": "Marketplace (Trendyol, Hepsiburada) connections",
  "Stok ve sipariş yönetimi": "Stock and order management",
  "Trakya'da üretilen gıda, tekstil ve el işi ürünleri Türkiye'nin dört bir yanına ulaştırıyoruz. Sanal POS, kargo firmaları ve pazaryeri entegrasyonlarıyla satışa hazır bir mağaza kuruyor, ürünlerinizi fotoğrafçılıktan SEO'ya kadar uçtan uca hazırlıyoruz.":
    "We deliver food, textile and handmade products made in Trakya to every corner of Türkiye. We set up a ready-to-sell store with virtual POS, shipping companies and marketplace integrations, and prepare your products end-to-end, from photography to SEO.",
  "Yerel Ticaret & Hizmet": "Local Trade & Services",
  "Mahallenin en görünüz işletmesi": "The most visible business in your neighborhood",
  "Tekirdağ, Edirne ve Kırklareli'ndeki kafe, restoran, kuyumcu ve hizmet işletmeleri için Google Haritalar optimizasyonu ve mobil uyumlu siteler.":
    "Google Maps optimization and mobile-friendly sites for cafés, restaurants, jewelers and service businesses in Tekirdağ, Edirne and Kırklareli.",
  "Google Haritalar optimizasyonu": "Google Maps optimization",
  "Yerel SEO ve yorum yönetimi": "Local SEO and review management",
  "Rezervasyon ve iletişim formları": "Reservation and contact forms",
  "Mobil öncelikli tasarım": "Mobile-first design",
  "Müşteriniz sizi önce telefonundan arıyor. Google Haritalar kaydınızı optimize ediyor, mobil uyumlu hızlı sitenizle randevu ve rezervasyon alıyor, yorumlarınızı yöneterek bölgenizde ilk sayfada görünmenizi sağlıyoruz.":
    "Your customers look for you on their phone first. We optimize your Google Maps listing, take reservations and bookings through your fast mobile-friendly site, and manage your reviews to get you on the first page in your region.",
  "Esnaf & Dükkan": "Shops & Local Stores",
  "Çarşının dijital vitrini": "The bazaar's digital showcase",
  "Bakkal, market, kuyumcu, berber ve terzi gibi mahalle işletmeleri için Google Haritalar kaydı, WhatsApp sipariş hattı ve vitrin sitesi.":
    "Google Maps listings, WhatsApp order lines and showcase sites for neighborhood businesses like grocers, jewelers, barbers and tailors.",
  "Google Haritalar & Yerel SEO": "Google Maps & Local SEO",
  "WhatsApp Business sipariş hattı": "WhatsApp Business order line",
  "Vitrin ve duyuru sayfası": "Showcase and announcement page",
  "Haftalık kampanya alanı": "Weekly campaign space",
  "Trakya'nın çarşıları yüzyıllardır ticaretin kalbi; müşteriniz artık orada telefonla dolaşıyor. Google Haritalar kaydınızı optimize ediyor, WhatsApp üzerinden sipariş alabileceğiniz bir hattı kuruyor, kampanyalarınızı anında yayınladığınız hızlı bir vitrin sitesi veriyoruz. Mahallenizin en görünür esnafı olun.":
    "Trakya's bazaars have been the heart of commerce for centuries; your customer now walks them with a phone. We optimize your Google Maps listing, set up a line to take orders over WhatsApp, and give you a fast showcase site where you publish campaigns instantly. Become the most visible shop in your neighborhood.",
  "Kafe & Restoran": "Café & Restaurant",
  "Masadan ekrana büyüyen lezzet": "Flavors that grow from table to screen",
  "Kafe, restoran ve pastane işletmeleri için QR dijital menüler, rezervasyon formları ve Instagram entegrasyonlu şık siteler.":
    "QR digital menus, reservation forms and stylish Instagram-integrated sites for cafés, restaurants and patisseries.",
  "QR kod dijital menü": "QR code digital menu",
  "Online rezervasyon formu": "Online reservation form",
  "Instagram akış entegrasyonu": "Instagram feed integration",
  "Google yorum yönetimi": "Google review management",
  "Menünüz telefon ekranında iştah açıcı görünmeli. QR kodla okutulan dijital menünüz fotoğraflarıyla birlikte açılır; rezervasyon formu boş masalarınızı hafta sonları doldurur. Instagram gönderilerinizi sitenizde otomatik yayınlıyor, Google yorumlarınızı öne çıkararak yeni müşteri kazanmanızı sağlıyoruz.":
    "Your menu should look appetizing on a phone screen. Your QR digital menu opens with its photos; the reservation form fills your empty tables on weekends. We auto-publish your Instagram posts on your site and highlight your Google reviews to win you new customers.",
  "İnşaat & Emlak": "Construction & Real Estate",
  "Projeleriniz ekranda da sağlam": "Your projects stand solid on screen too",
  "İnşaat firmaları ve emlak ofisleri için proje vitrin siteleri, portföy yönetimi ve satış/talep formları.":
    "Project showcase sites, portfolio management and sales/inquiry forms for construction firms and real estate offices.",
  "Proje vitrin sitesi": "Project showcase site",
  "Portföy ve plan galerisi": "Portfolio and plan gallery",
  "Arza / satış talep formları": "Offer / sale inquiry forms",
  "Sanal tur ve görsel sunum": "Virtual tour and visual presentation",
  "Konut ve ticari projelerinizi alıcıya 7/24 sunan bir vitrin kuruyoruz; kat planları, görseller ve fiyat listeleri panelden güncellenir. Gelen her arza talebi panelinize düşer, emlak ofisleriniz için portföy araması ve filtreleme kolayca yönetilir.":
    "We build a showcase that presents your residential and commercial projects to buyers 24/7; floor plans, visuals and price lists update from the dashboard. Every offer inquiry lands in your dashboard, and real estate offices get easy portfolio search and filtering.",
  "Sağlık & Güzellik": "Health & Beauty",
  "Güven veren dijital kimlik": "A digital identity that builds trust",
  "Poliklinik, diş kliniği, güzellik merkezi ve spor salonları için KVKK uyumlu randevu sistemleri ve kurumsal siteler.":
    "KVKK-compliant appointment systems and corporate sites for clinics, dental practices, beauty centers and gyms.",
  "Online randevu sistemi": "Online appointment system",
  "Hizmet ve uzmanlık sayfaları": "Service and specialty pages",
  "KVKK uyumlu formlar": "KVKK-compliant forms",
  "Hasta / üye yorumları": "Patient / member reviews",
  "Sağlıkta güven her şeydir; siteniz de bunu yansıtmalı. Uzmanlık alanlarınızı ve hizmetlerinizi anlatan kurumsal sayfalar, KVKK uyumlu randevu formları ve yorumlarınızla bölgenizin ilk tercihi olmanızı sağlıyoruz.":
    "In healthcare, trust is everything — your site should reflect it. With corporate pages explaining your specialties and services, KVKK-compliant appointment forms and your reviews, we make you the region's first choice.",
  "Eğitim & Kurs": "Education & Courses",
  "Kayıt akışı kesintisiz": "A seamless registration flow",
  "Özel kurslar, akademiler ve eğitim kurumları için program tanıtımı, online kayıt ve veli duyuru sistemleri.":
    "Program introductions, online registration and parent announcement systems for private courses, academies and educational institutions.",
  "Online kurs kayıt formu": "Online course registration form",
  "Eğitim takvimi ve programlar": "Education calendar and programs",
  "Ödeme bilgisi ve POS entegrasyonu": "Payment info and POS integration",
  "Veli / öğrenci duyuru alanı": "Parent / student announcement area",
  "Kayıt döneminde veliler sizi telefonundan arıyor. Programlarınızı, eğitmenlerinizi ve ücretleri net gösteren bir site kuruyor, online kayıt formuyla kontenjanlarınızı hızla dolduruyoruz; duyurularınız tek tıkla tüm velilere ulaşır.":
    "During registration season, parents reach for their phones. We build a site that clearly shows your programs, instructors and fees, fill your quotas fast with an online registration form, and deliver your announcements to every parent in one click.",
  "Otomotiv & Servis": "Automotive & Service",
  "Galeriden servise tek adres": "One address from showroom to service",
  "Oto galeriler, yedek parça ve servis işletmeleri için araç galerileri, ekspertiz randevuları ve servis takibi.":
    "Vehicle galleries, inspection appointments and service tracking for car dealerships, spare parts and service businesses.",
  "İkinci el araç galerisi": "Second-hand vehicle gallery",
  "Ekspertiz & servis randevusu": "Inspection & service appointments",
  "Fiyat listesi yayını": "Price list publishing",
  "WhatsApp ile hızlı iletişim": "Fast contact via WhatsApp",
  "Araçlarınızı fotoğrafı ve detayıyla yayınlayan bir galeri kuruyor, potansiyel alıcıyı WhatsApp'ta size bağlıyoruz. Servis ve ekspertiz işletmeleri için randevu formu ile birlikte yoğunluğunuzu planlamanızı sağlayan takip sistemi sunuyoruz.":
    "We build a gallery that publishes your vehicles with photos and details, and connect potential buyers to you on WhatsApp. For service and inspection businesses, we provide an appointment form plus a tracking system that helps you plan your workload.",

  // Footer
  "İletişime geçin": "Get in touch",
  "Trakya'nın dijital mimarısıyla tanışın.": "Meet Trakya's digital architect.",
  "Sohbet başlat": "Start a chat",
  "Ücretsiz SEO denetimi alın": "Get a free SEO audit",
  "Sitenizi 24 saat içinde analiz edip raporlayalım.": "Let us analyze and report on your site within 24 hours.",
  "Denetim isteyin": "Request an audit",
  "DijiTrak ile ortak olun": "Partner with DijiTrak",
  "Gizlilik Politikası": "Privacy Policy",
  "Çerez Politikası": "Cookie Policy",
  "Kullanım Koşulları": "Terms of Use",
  "WhatsApp ile yazın": "Chat on WhatsApp",
  "WhatsApp'tan yazın": "Chat on WhatsApp",
  "Ya da doğrudan yazın:": "Or write to us directly:",
  "DOĞRUDAN İLETİŞİM": "DIRECT CONTACT",
  "Sohbet yazmak istemezseniz WhatsApp hattımızdan doğrudan ekibimize ulaşabilirsiniz — 7/24 yanıt veriyoruz.": "Prefer not to chat? Reach our team directly on WhatsApp — we reply 24/7.",
  "DİJİTRAK · YASAL METİN": "DIJITRAK · LEGAL NOTICE",
  "Son güncelleme": "Last updated",
  "Çok fazla mesaj gönderdiniz. Birkaç dakika sonra tekrar deneyin.": "You've sent too many messages. Please try again in a few minutes.",
  "Toprağınızı dijitalleştiren ekiple büyümeye başlayın.": "Start growing with the team that turns your soil digital.",
  "Projenizi anlatın": "Tell us about your project",
  "Form doldur": "Fill in the form",
  "KEŞFET": "EXPLORE",
  "Sektörel Çözümler": "Sector Solutions",
  "İşletme Rehberi": "Business Directory",
  "Blog & Rehberler": "Blog & Guides",
  "İLETİŞİM": "CONTACT",
  "Web Tasarımı": "Web Design",
  "Bakım & Destek": "Maintenance & Support",
  "Tekirdağ, Edirne ve Kırklareli işletmeleri için web tasarımı, e-ticaret ve SEO.":
    "Web design, e-commerce and SEO for businesses in Tekirdağ, Edirne and Kırklareli.",
  "© 2026 DijiTrak Ajans. Tüm hakları saklıdır.": "© 2026 DijiTrak Agency. All rights reserved.",

  // LeadForm
  "Ad Soyad *": "Full Name *",
  "E-posta *": "Email *",
  "Telefon": "Phone",
  "Firma Adı": "Company Name",
  "Sektörünüz": "Your Sector",
  "İlgilendiğiniz Hizmet": "Service You're Interested In",
  "Sektör seçin": "Select sector",
  "Hizmet seçin": "Select service",
  "Projenizden bahsedin *": "Tell us about your project *",
  "Hangi hizmete ihtiyacınız var? Hedefleriniz neler?": "Which service do you need? What are your goals?",
  "Ad, e-posta ve mesaj alanları zorunludur.": "Name, email and message are required.",
  "Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.":
    "Something went wrong while saving your request. Please try again.",
  "Talebiniz alındı!": "Your request has been received!",
  "Ekibimiz 1 iş günü içinde size dönüş yapacak. Acil durumlar için AI asistanımız 7/24 yanınızda.":
    "Our team will get back to you within 1 business day. For urgent matters, our AI assistant is with you 24/7.",
  "Gönderiliyor…": "Sending…",
  "Talebi Gönder": "Send Request",
  "Yerel Ticaret": "Local Trade",
  "İletişim Formu": "Contact Form",

  // Contact
  "Projenizi konuşalım": "Let's talk about your project",
  "Formu doldurun, 1 iş günü içinde size dönüş yapalım. Ya da AI asistanımızla hemen konuşun.":
    "Fill in the form and we'll get back to you within 1 business day. Or talk to our AI assistant right now.",
  "Teklif / bilgi talebi": "Quote / information request",
  "Ofis": "Office",
  "E-posta": "Email",
  "Çalışma saatleri": "Working hours",
  "Hafta içi 09:00 – 18:00": "Weekdays 09:00 – 18:00",
  "AI asistan": "AI assistant",
  "7/24 aktif — anında yanıt": "24/7 active — instant answers",

  // Isletmeler
  "İŞLETME REHBERİ": "BUSINESS DIRECTORY",
  "Trakya'nın işletme haritası": "Trakya's business map",
  "Şirketler, dükkanlar, atölyeler, kafeler… Bölgedeki dijitalleşen işletmeleri tek rehberde topluyoruz. Aradığınızı bulun, ilham alın.":
    "Companies, shops, workshops, cafés… We bring the region's digitalizing businesses together in one directory. Find what you're looking for, get inspired.",
  "İşletme, sektör veya ilçe ara…": "Search business, sector or district…",
  "Tüm İller": "All Provinces",
  "Tüm Sektörler": "All Sectors",
  "İl": "Province",
  "Sektör": "Sector",
  "YÜKLENİYOR…": "LOADING…",
  "İŞLETME": "BUSINESSES",
  "Sonuç bulunamadı": "No results found",
  "Aramanızla eşleşen işletme yok. Filtreleri değiştirmeyi deneyin.": "No businesses match your search. Try changing the filters.",
  "İşletmeniz bu listede yok mu?": "Is your business not on this list?",
  "Trakya'daki tüm şirketler, dükkanlar ve atölyeler için rehberimiz açık. İşletmenizi ekletmek ve dijital varlığınızı güçlendirmek için bize ulaşın.":
    "Our directory is open to all companies, shops and workshops in Trakya. Reach out to get your business listed and strengthen your digital presence.",
  "AI Asistanla Başvur": "Apply via the AI Assistant",

  // CasePreview / CaseStudies
  "BAŞARI ARŞİVİ": "SUCCESS STORIES",
  "Verilerle yazılmış hikâyeler": "Stories written with data",
  "Tüm izlerimiz": "All our work",
  "İz bıraktıklarımız yakında yayında.": "Our work is coming soon.",
  "TARIM": "AGRICULTURE",
  "SANAYİ": "INDUSTRY",
  "E-TİCARET": "E-COMMERCE",
  "YEREL TİCARET": "LOCAL TRADE",
  "İz Bıraktıklarımıza dön": "Back to our work",
  "Trakya'daki işletmelerin dijitalleşme yolculuğu, before/after metrikleriyle.":
    "The digitalization journey of Trakya businesses, with before/after metrics.",
  "İncele": "View details",
  "Kapat": "Close",
  "ZORLUK": "CHALLENGE",
  "ÇÖZÜM": "SOLUTION",

  // BlogPreview / Blog
  "Trakya işletmesi rehberleri": "Guides for Trakya businesses",
  "Tüm yazılar": "All posts",
  "Rehberler yakında yayında.": "Guides coming soon.",
  "dk": "min",
  "Dijitalleşme rehberi": "Guide to digitalization",
  "Web sitesi fiyatlarından SEO ipuçlarına, Trakya işletmeleri için hazırlanmış sektörel içerikler.":
    "Sector content prepared for Trakya businesses, from website pricing to SEO tips.",
  "Tümü": "All",
  "Bu kategoride henüz yazı yok.": "No posts in this category yet.",
  "dk okuma": "min read",

  // AI chat
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Hello! I'm DijiTrak's AI assistant. Ask me anything about pricing, process and sector solutions.",
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç, SEO, e-ticaret ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Hello! I'm DijiTrak's AI assistant. Ask me anything about pricing, process, SEO, e-commerce and sector solutions.",
  "Fiyat teklifi al": "Get a price quote",
  "Web sitesi için fiyat teklifi almak istiyorum.": "I'd like to get a price quote for a website.",
  "Ücretsiz SEO denetimi": "Free SEO audit",
  "Sitem için ücretsiz SEO denetimi istiyorum.": "I'd like a free SEO audit for my website.",
  "Randevu oluştur": "Book an appointment",
  "Ücretsiz keşif görüşmesi için randevu almak istiyorum.": "I'd like to book an appointment for a free discovery call.",
  "Tarım işletmesiyim": "I run a farming business",
  "Tarım işletmesiyim, bana özel çözümleriniz neler?": "I run a farming business. What solutions do you offer for me?",
  "Esnaf işletmesiyim": "I run a local shop",
  "Esnaf işletmesiyim, bana özel çözümleriniz neler?": "I run a local shop. What solutions do you offer for me?",
  "Web sitesi ne kadar sürede teslim edilir?": "How long does website delivery take?",
  "SEO çalışmaları neyi kapsıyor?": "What does SEO work cover?",
  "E-ticaret paketi neler içeriyor?": "What does the e-commerce package include?",
  "Bakım ve destek hizmeti nasıl işliyor?": "How does the maintenance and support service work?",
  "Google Haritalar optimizasyonu yapıyor musunuz?": "Do you do Google Maps optimization?",
  "Komut Merkezi": "Command Center",
  "ASİSTAN AKTİF — 7/24 Türkçe yanıt": "ASSISTANT ONLINE — 24/7",
  "Sohbeti Sıfırla": "Reset Chat",
  "Mesajınızı yazın…": "Type your message…",
  "Gönder": "Send",
  "Üzgünüm, şu an yanıt alamadım. Lütfen tekrar deneyin.": "Sorry, I couldn't get a response right now. Please try again.",
  "Bağlantıda bir sorun oluştu. Lütfen tekrar dener misiniz?": "There was a connection problem. Could you please try again?",
  "SIK SORULANLAR": "FREQUENTLY ASKED",
  "TEKLİF AL": "GET A QUOTE",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi.":
    "Your request is forwarded to our team — guaranteed reply within 1 business day.",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi. Dilerseniz ":
    "Your request is forwarded to our team — guaranteed reply within 1 business day. You can also use ",
  "iletişim sayfasını": "the contact page",
  " da kullanabilirsiniz.": " if you prefer.",
  "CANLI SOHBET": "LIVE CHAT",
  "AI ASİSTAN AKTİF · 7/24": "AI ASSISTANT ONLINE · 24/7",
  "SOHBET": "CHAT",
  "Canlı sohbet aç": "Open live chat",
};

const BG = {
  // Navbar
  "Ana Sayfa": "Начало",
  "Sektörler": "Сектори",
  "İşletmeler": "Фирми",
  "İz Bıraktıklarımız": "Нашите проекти",
  "İletişim": "Контакт",
  "AI Asistan": "AI асистент",
  "AI Asistanla Konuş": "Говорете с AI асистента",
  "Menü": "Меню",

  // Hero
  "DİJİTRAK AJANS — TEKİRDAĞ · EDİRNE · KIRKLARELİ": "DIJITRAK АГЕНЦИЯ — ТЕКИРДАГ · ОДРИН · ЛОЗЕНГРАД",
  "AI ASİSTAN AKTİF — 7/24": "AI АСИСТЕНТ НА ЛИНИЯ — 24/7",
  "Trakya'nın Toprağını ": "Превръщаме тракийската земя ",
  "Dijitale": "в цифров формат",
  " Dönüştürüyoruz": "",
  "Tarım, sanayi ve yerel ticaret işletmelerine Vercel standardında web tasarımı, e-ticaret ve SEO hizmetleri. AI destekli ekibimizle bölgenin dijital mimarıyız.":
    "Уеб дизайн, е-търговия и SEO услуги по стандарта на Vercel за земеделски, индустриални и местни търговски предприятия. С нашия AI-базиран екип ние сме цифровият архитект на региона.",
  "Hizmetleri Keşfet": "Разгледайте услугите",
  "HASAT 2026 — TRAKYA OVASI": "ЖЕТВА 2026 — ТРАКИЙСКАТА РАВНИНА",
  "Trakya'da gün batımında hasat makinesi": "Комбайн по залез в Тракия",

  // ServicesGrid
  "HİZMETLER": "УСЛУГИ",
  "Uçtan uca dijital altyapı": "Цифрова инфраструктура от край до край",
  "Tasarımdan SEO'ya, e-ticaretten bakıma kadar işletmenizin ihtiyaç duyduğu her dijital hizmet tek çatı altında.":
    "От дизайна до SEO, от е-търговията до поддръжката — всяка цифрова услуга, която бизнесът ви нуждае, под един покрив.",
  "Kurumsal Web Tasarımı": "Корпоративен уеб дизайн",
  "Vercel standardında, yüksek hızlı ve animasyonlu kurumsal siteler.": "Бързи корпоративни сайтове с анимации по стандарта на Vercel.",
  "E-Ticaret Kurulumu": "Създаване на е-търговия",
  "Ödeme, kargo ve pazaryeri entegrasyonları hazır satış mağazası.": "Магазин, готов за продажби, с интеграции за плащания, доставки и пазарни платформи.",
  "SEO & Yerel Arama": "SEO и локално търсене",
  "Trakya'da 'web tasarım' aramalarında ilk sayfa hedefli SEO çalışması.": "SEO работа, целяща първа страница за търсения на „уеб дизайн“ в Тракия.",
  "Google Haritalar Optimizasyonu": "Оптимизация за Google Карти",
  "Haritalar kaydınız, yorumlarınız ve yerel görünürlüğünüz.": "Вашият профил в Карти, отзивите ви и локалната ви видимост.",
  "Mobil Uyumlama": "Мобилна адаптация",
  "Mevcut sitenizi mobil öncelikli, hızlı ve erişilebilir hale getirme.": "Правим настоящия ви сайт мобилно-ориентиран, бърз и достъпен.",
  "Bakım & Türkçe Destek": "Поддръжка и помощ на турски",
  "7/24 Türkçe teknik destek, yedekleme ve güvenlik güncellemeleri.": "24/7 техническа помощ, резервни копия и актуализации за сигурност.",

  // Stats
  "Tamamlanan Proje": "Завършени проекти",
  "İlde Aktif Hizmet": "Обслужени области",
  "Müşteri Memnuniyeti": "Доволство на клиентите",
  "AI Destek Hattı": "AI линия за поддръжка",

  // ChatPromo
  "Kafe için web sitesi ne kadara olur?": "Колко би струвал уебсайт за кафене?",
  "Kafe paketimiz QR dijital menü + rezervasyon formu içeriyor. Ayrıntı ve ödeme planını buradan paylaşabilirim…":
    "Пакетът ни за кафенета включва QR дигитално меню + форма за резервации. Мога да споделя детайлите и плана за плащане тук…",
  "Süremiz ne olur?": "Колко време ще отнеме?",
  "Yayına alış ortalamamız 14 iş günü. Hemen keşif randevusu oluşturabilirim.":
    "Средно ни отнема 14 работни дни до пускане. Мога да насроча среща за обсъждане веднага.",
  "AI ASİSTAN": "AI АСИСТЕНТ",
  "Projenizi AI asistanla 5 dakikada netleştirin": "Изяснете проекта си с AI асистента за 5 минути",
  "Fiyat, süreç ve sektör çözümleri — 7/24 Türkçe yanıt. Tek bir sohbetle ihtiyacınızı netleştirip teklifinizi ve randevunuzu anında oluşturuyor.":
    "Цени, процес и секторни решения — отговори 24/7. Един разговор изяснява нуждите ви и веднага създава вашата оферта и насрочване.",
  "Sohbete Başla": "Започнете разговор",
  "Formla Devam Et": "Продължете с формата",
  "Anında yanıt": "Незабавни отговори",
  "7/24 aktif": "активен 24/7",
  "teklif hazırlanıyor…": "подготвя се оферта…",

  // BudgetCalculator
  "BÜTÇE HESAPLAYICI": "КАЛКУЛАТОР ЗА БЮДЖЕТ",
  "Projenize 60 saniyede fiyat alın": "Получете цена за проекта си за 60 секунди",
  "Sektörünüzü ve ihtiyaçlarınızı seçin, tahmini proje bütçeniz anında hesaplansın.":
    "Изберете сектора и нуждите си и приблизителният бюджет на проекта се изчислява веднага.",
  "01 — SEKTÖRÜNÜZ": "01 — ВАШИЯТ СЕКТОР",
  "02 — İHTİYAÇLARINIZ": "02 — ВАШИТЕ НУЖДИ",
  "03 — KAPSAM": "03 — ОБХВАТ",
  "Diğer": "Друго",
  "Kurumsal Web Sitesi": "Корпоративен уебсайт",
  "Özel tasarım, mobil uyumlu": "Индивидуален дизайн, съвместим с мобилни",
  "E-Ticaret Altyapısı": "Е-търговска инфраструктура",
  "Ödeme, stok, kargo entegrasyonu": "Интеграция на плащания, стоки и доставки",
  "SEO Optimizasyonu": "SEO оптимизация",
  "Teknik SEO + anahtar kelime planı": "Техническо SEO + план за ключови думи",
  "Yerel SEO & Haritalar": "Локално SEO и Карти",
  "Google Business profil yönetimi": "Управление на Google Business профил",
  "İçerik & Fotoğraf": "Съдържание и фотография",
  "Profesyonel çekim + metinler": "Професионални снимки + текстове",
  "Yıllık Bakım & Destek": "Годишна поддръжка и помощ",
  "Güncelleme, güvenlik, raporlama": "Актуализации, сигурност, отчети",
  "Hızlı Başlangıç": "Бърз старт",
  "Profesyonel": "Професионален",
  "Kurumsal": "Корпоративен",
  "Sayfa sayısı:": "Брой страници:",
  "(web sitesi seçiliyken aktif)": "(активно, когато е избран уебсайт)",
  "TAHMİNİ PROJE BÜTÇESİ": "ПРИБЛИЗИТЕЛЕН БЮДЖЕТ НА ПРОЕКТА",
  "aralığı": "диапазон",
  "Ek sayfalar": "Допълнителни страници",
  "Sektör & kapsam katsayısı": "Коефициент за сектор и обхват",
  "Hesaplama için en az bir hizmet seçin.": "Изберете поне една услуга, за да се изчисли.",
  "Kesin teklifi AI asistanla al": "Получете точна оферта чрез AI асистента",
  "Fiyatlar bilgilendirme amaçlı tahminlerdir; kesin teklif keşif görüşmesi sonrası verilir.":
    "Цените са ориентировъчни; окончателната оферта се дава след среща за обсъждане.",

  // SectorHub / Sectors
  "SEKTÖREL ÇÖZÜMLER": "СЕКТОРНИ РЕШЕНИЯ",
  "Sektörünüzü biliyor muyuz? Evet.": "Знаем ли сектора ви? Да.",
  "Tarımından sanayisine, Trakya'nın her sektörüne özel hazırlanmış dijital çözümler.":
    "Цифрови решения, съобразени с всеки сектор в Тракия — от земеделието до индустрията.",
  "Sektör çözümünü incele": "Разгледайте секторното решение",
  "SEKTÖR": "СЕКТОР",
  "Sektörünüze özel dijital altyapı": "Цифрова инфраструктура, съобразена с вашия сектор",
  "Her sektörün kendi dili, kendi müşterisi ve kendi dijital ihtiyaçları var. Trakya'da yıllardır sahadayız; çözümlerimiz de buradan çıkıyor.":
    "Всеки сектор има своя език, свои клиенти и свои цифрови нужди. От години сме на терен в Тракия; оттам идват и решенията ни.",
  "Bu sektör için fiyat alın": "Получете цена за този сектор",
  "İletişim formu": "Форма за контакт",

  // Process
  "SÜREÇ": "ПРОЦЕС",
  "Keşiften büyümeye, 4 adım": "От анализа до растежа, в 4 стъпки",
  "Keşif": "Анализ",
  "İşletmenizi, rakiplerinizi ve hedef kitlenizi analiz ediyoruz.": "Анализираме вашия бизнес, конкурентите и целевата ви аудитория.",
  "Tasarım": "Дизайн",
  "Sektörünüze özel, Vercel standardında animasyonlu tasarımı onayınıza sunuyoruz.":
    "Представяме за одобрение анимиран дизайн по стандарта на Vercel, съобразен с вашия сектор.",
  "Geliştirme": "Разработка",
  "Hız, güvenlik ve SEO odaklı kodlamayla sitenizi hayata geçiriyoruz.": "Изграждаме сайта ви с код, фокусиран върху скорост, сигурност и SEO.",
  "Büyüme": "Растеж",
  "Aylık SEO çalışması, bakım ve AI destekli analizle büyümenizi sürdürüyoruz.":
    "Поддържаме растежа ви с месечна SEO работа, поддръжка и AI-базиран анализ.",

  // Testimonials
  "MÜŞTERİ YORUMLARI": "ОТЗИВИ ОТ КЛИЕНТИ",
  "Trakya'da konuşan sonuçlar": "Резултати, които говорят в Тракия",
  "Vitrin sitemiz yayına girdikten iki hafta sonra tüm Türkiye'den sipariş almaya başladık. WhatsApp hattı kurulumu dahil her şeyi düşündüler.":
    "Две седмици след пускането на сайта ни за представяне започнахме да получаваме поръчки от цяла Турция. Помислиха за всичко, включително за настройката на WhatsApp линията.",
  "Araç galerimizi üç haftada yayına aldılar; online galeri sayesinde satışlarımız neredeyse ikiye katlandı. Destek her zaman Türkçe ve hızlı.":
    "Пуснаха галерията ни с автомобили за три седмици; благодарение на онлайн галерията продажбите ни почти се удвоиха. Поддръжката винаги е на турски и бърза.",
  "QR dijital menü ve rezervasyon sistemiyle hafta sonları masalarımız hiç boş kalmıyor. Google yorumları yönetmeleri tek başına parayı ödedi.":
    "С QR дигиталното меню и системата за резервации масите ни не остават празни през уикендите. Само управлението на Google отзивите си струваше цената.",

  // Packages
  "PAKETLER": "ПАКЕТИ",
  "Net fiyatlar, sürpriz yok": "Ясни цени, без изненади",
  "EN POPÜLER": "НАЙ-ПОПУЛЯРЕН",
  "Teklif İste": "Заявете оферта",
  "Teklif Al": "Получете оферта",
  "tek seferlik": "еднократно",
  "Başlangıç": "Старт",
  "Kurumsal tanıtım sitesi": "Корпоративен презентационен сайт",
  "5 sayfaya kadar tasarım": "Дизайн до 5 страници",
  "Mobil uyumlu ve hızlı": "Съвместим с мобилни и бърз",
  "SSL + alan adı kurulumu": "SSL + настройка на домейн",
  "İletişim formları": "Форми за контакт",
  "1 yıl hosting hediye": "1 година хостинг в подарък",
  "SEO ve içerik altyapısıyla": "С SEO и съдържателна инфраструктура",
  "Sınırsız sayfa + blog": "Неограничени страници + блог",
  "SEO altyapısı ve Google kaydı": "SEO инфраструктура и регистрация в Google",
  "Çoklu dil desteği": "Многоезична поддръжка",
  "AI asistan entegrasyonu": "Интеграция на AI асистент",
  "Öncelikli destek": "Приоритетна поддръжка",
  "E-Ticaret": "Е-търговия",
  "Satışa hazır mağaza": "Магазин, готов за продажби",
  "Sanal POS + kargo entegrasyonu": "Виртуален POS + интеграция на доставки",
  "Pazaryeri bağlantıları": "Връзки с пазарни платформи",
  "Stok yönetimi": "Управление на стокове",
  "Ürün fotoğraf düzenleme": "Редактиране на продуктови снимки",
  "Satış eğitim desteği": "Обучение по продажби",

  // Sectors data
  "Tarım & Gıda": "Земеделие и храни",
  "Verimli topraklar, dijital hasat": "Плодородни почви, дигитална жетва",
  "Trakya'nın ayçiçeği, buğday ve bağ-bahçe işletmeleri için ürün katalogları, B2B sipariş sistemleri ve hasat takibi entegrasyonları kuruyoruz.":
    "За тракийските предприятия със слънчоглед, пшеница и овощни градини изграждаме продуктови каталози, B2B системи за поръчки и интеграции за проследяване на жетвата.",
  "Ürün ve fiyat kataloğu": "Каталог с продукти и цени",
  "B2B toptan sipariş portalı": "B2B портал за едро поръчки",
  "Hasat ve stok takip entegrasyonu": "Интеграция за проследяване на жетва и стокове",
  "Google Haritalar & yerel SEO": "Google Карти и локално SEO",
  "Tarım işletmelerinin dijitalleşme oranı Trakya'da hızla artıyor. Sizin için ürünlerinizi sergileyen, toptan müşterilerinize özel fiyat listeleri sunan ve mobil cihazdan yönetilebiren bir katalog sitesi kuruyoruz. Ziraat faaliyetlerinizle entegre çalışır; hasat sezonunda güncel arz bilgisi otomatik yayımlanır.":
    "Земеделските предприятия в Тракия се цифровизират бързо. Изграждаме каталог-сайт, който показва продуктите ви, предлага индивидуални ценови списъци на едро клиентите ви и се управлява от телефона. Работи в синхрон с земеделската ви дейност: актуалната информация за наличности се публикува автоматично по време на жетвата.",
  "Sanayi & İmalat": "Индустрия и производство",
  "Ağır sanayi, hassas mühendislik": "Тежка индустрия, прецизно инженерство",
  "Çorlu ve Lüleburgaz'daki tekstil, makine ve imalat firmaları için B2B katalog siteleri, RFQ formları ve CAD dosya paylaşım altyapıları.":
    "B2B каталожни сайтове, RFQ форми и инфраструктура за споделяне на CAD файлове за текстилни, машиностроителни и производствени фирми в Чорлу и Люлебургаз.",
  "B2B ürün katalogu": "B2B продуктов каталог",
  "Teklif (RFQ) formları": "Форми за оферти (RFQ)",
  "CAD / teknik döküman paylaşımı": "Споделяне на CAD / технически документи",
  "Çoklu dil altyapısı": "Многоезична инфраструктура",
  "İhracat yapan sanayi firmalarının en büyük eksiği görünürlüktür. Kurumsal kimliğinizi yansıtan, teknik dökümanlarınızı yönetebileceğiniz ve yurt dışı müşterinizin dilinde yayın yapan bir B2B platform kuruyoruz; RFQ formu gelen her talep panelinize düşer.":
    "Най-голямото пропускане на изнасящите производители е видимостта. Изграждаме B2B платформа, която отразява корпоративната ви идентичност, управлява техническите ви документи и публикува на езика на чуждестранните ви клиенти; всяка RFQ заявка попадa в таблото ви.",
  "Satış, teslimat, büyüme": "Продажби, доставки, растеж",
  "Yerel üreticileri Türkiye geneline satışa taşıyan, ödeme ve kargo entegrasyonları hazır e-ticaret siteleri ve pazaryeri bağlantıları.":
    "Е-търговски сайтове с готови интеграции за плащания и доставки, които извеждат местните производители до продажби в цяла Турция, плюс връзки с пазарни платформи.",
  "Sanal POS ve ödeme entegrasyonu": "Виртуален POS и интеграция на плащания",
  "Kargo otomasyonu": "Автоматизация на доставки",
  "Pazaryeri (Trendyol, Hepsiburada) bağlantısı": "Връзка с пазари (Trendyol, Hepsiburada)",
  "Stok ve sipariş yönetimi": "Управление на стоки и поръчки",
  "Trakya'da üretilen gıda, tekstil ve el işi ürünleri Türkiye'nin dört bir yanına ulaştırıyoruz. Sanal POS, kargo firmaları ve pazaryeri entegrasyonlarıyla satışa hazır bir mağaza kuruyor, ürünlerinizi fotoğrafçılıktan SEO'ya kadar uçtan uca hazırlıyoruz.":
    "Доставяме храни, текстил и ръчно изработени продукти от Тракия до всеки ъгъл на Турция. Създаваме магазин, готов за продажби с виртуален POS, куриерски фирми и пазарни интеграции, и подготвяме продуктите ви изцяло — от фотографията до SEO.",
  "Yerel Ticaret & Hizmet": "Местна търговия и услуги",
  "Mahallenin en görünüz işletmesi": "Най-видимото предприятие в квартала",
  "Tekirdağ, Edirne ve Kırklareli'ndeki kafe, restoran, kuyumcu ve hizmet işletmeleri için Google Haritalar optimizasyonu ve mobil uyumlu siteler.":
    "Оптимизация за Google Карти и сайтове, съвместими с мобилни устройства, за кафенета, ресторанти, бижутери и сервизни предприятия в Текирдаг, Одрин и Лозенград.",
  "Google Haritalar optimizasyonu": "Оптимизация за Google Карти",
  "Yerel SEO ve yorum yönetimi": "Локално SEO и управление на отзиви",
  "Rezervasyon ve iletişim formları": "Форми за резервации и контакт",
  "Mobil öncelikli tasarım": "Мобилно-ориентиран дизайн",
  "Müşteriniz sizi önce telefonundan arıyor. Google Haritalar kaydınızı optimize ediyor, mobil uyumlu hızlı sitenizle randevu ve rezervasyon alıyor, yorumlarınızı yöneterek bölgenizde ilk sayfada görünmenizi sağlıyoruz.":
    "Клиентите ви първо ви търсят от телефона. Оптимизираме профила ви в Google Карти, приемаме резервации през бързия ви мобилен сайт и управляваме отзивите ви, за да сте на първата страница в региона си.",
  "Esnaf & Dükkan": "Магазини и занаятчии",
  "Çarşının dijital vitrini": "Цифровата витрина на чаршията",
  "Bakkal, market, kuyumcu, berber ve terzi gibi mahalle işletmeleri için Google Haritalar kaydı, WhatsApp sipariş hattı ve vitrin sitesi.":
    "Регистрации в Google Карти, WhatsApp линии за поръчки и презентационни сайтове за квартални предприятия като бакалини, бижутери, фризьори и шивачи.",
  "Google Haritalar & Yerel SEO": "Google Карти и локално SEO",
  "WhatsApp Business sipariş hattı": "WhatsApp Business линия за поръчки",
  "Vitrin ve duyuru sayfası": "Витринна страница с обяви",
  "Haftalık kampanya alanı": "Седмично пространство за кампании",
  "Trakya'nın çarşıları yüzyıllardır ticaretin kalbi; müşteriniz artık orada telefonla dolaşıyor. Google Haritalar kaydınızı optimize ediyor, WhatsApp üzerinden sipariş alabileceğiniz bir hattı kuruyor, kampanyalarınızı anında yayınladığınız hızlı bir vitrin sitesi veriyoruz. Mahallenizin en görünür esnafı olun.":
    "Чаршиите на Тракия са сърцето на търговията от векове; клиентът ви днес ги обикаля с телефон. Оптимизираме профила ви в Google Карти, изграждаме линия за поръчки през WhatsApp и ви даваме бърз витринен сайт, където публикувате кампаниите си мигновено. Бъдете най-видимият търговец в квартала си.",
  "Kafe & Restoran": "Кафенета и ресторанти",
  "Masadan ekrana büyüyen lezzet": "Вкусове, растящи от масата до екрана",
  "Kafe, restoran ve pastane işletmeleri için QR dijital menüler, rezervasyon formları ve Instagram entegrasyonlu şık siteler.":
    "QR дигитални менюта, форми за резервации и елегантни сайтове с Instagram интеграция за кафенета, ресторанти и сладкарници.",
  "QR kod dijital menü": "QR дигитално меню",
  "Online rezervasyon formu": "Онлайн форма за резервации",
  "Instagram akış entegrasyonu": "Интеграция на Instagram емисия",
  "Google yorum yönetimi": "Управление на Google отзиви",
  "Menünüz telefon ekranında iştah açıcı görünmeli. QR kodla okutulan dijital menünüz fotoğraflarıyla birlikte açılır; rezervasyon formu boş masalarınızı hafta sonları doldurur. Instagram gönderilerinizi sitenizde otomatik yayınlıyor, Google yorumlarınızı öne çıkararak yeni müşteri kazanmanızı sağlıyoruz.":
    "Менюто ви трябва да изглежда апетитно на телефонния екран. QR дигиталното меню се отваря със снимките си; формата за резервации запълва празните маси през уикендите. Автоматично публикуваме Instagram постовете ви в сайта и открояваме Google отзивите ви, за да печелите нови клиенти.",
  "İnşaat & Emlak": "Строителство и имоти",
  "Projeleriniz ekranda da sağlam": "Проектите ви са солидни и на екрана",
  "İnşaat firmaları ve emlak ofisleri için proje vitrin siteleri, portföy yönetimi ve satış/talep formları.":
    "Презентационни сайтове за проекти, управление на портфолио и форми за продажби/запитвания за строителни фирми и имотни агенции.",
  "Proje vitrin sitesi": "Презентационен сайт за проекти",
  "Portföy ve plan galerisi": "Галерия с портфолио и планове",
  "Arza / satış talep formları": "Форми за оферти / продажби",
  "Sanal tur ve görsel sunum": "Виртуална разходка и визуална презентация",
  "Konut ve ticari projelerinizi alıcıya 7/24 sunan bir vitrin kuruyoruz; kat planları, görseller ve fiyat listeleri panelden güncellenir. Gelen her arza talebi panelinize düşer, emlak ofisleriniz için portföy araması ve filtreleme kolayca yönetilir.":
    "Изграждаме витрина, която представя жилищните и търговските ви проекти на купувачите 24/7; плановете, визуализациите и ценовите списъци се актуализират от таблото. Всяко запитване за оферта попада в таблото ви, а имотните агенции получават лесно търсене и филтриране на портфолиото.",
  "Sağlık & Güzellik": "Здраве и красота",
  "Güven veren dijital kimlik": "Цифрова идентичност, която вдъхва доверие",
  "Poliklinik, diş kliniği, güzellik merkezi ve spor salonları için KVKK uyumlu randevu sistemleri ve kurumsal siteler.":
    "Системи за резервации, съобразени с KVKK, и корпоративни сайтове за клиники, стоматологични практики, центрове за красота и фитнеси.",
  "Online randevu sistemi": "Онлайн система за резервации",
  "Hizmet ve uzmanlık sayfaları": "Страници за услуги и специализации",
  "KVKK uyumlu formlar": "Форми, съобразени с KVKK",
  "Hasta / üye yorumları": "Отзиви от пациенти / членове",
  "Sağlıkta güven her şeydir; siteniz de bunu yansıtmalı. Uzmanlık alanlarınızı ve hizmetlerinizi anlatan kurumsal sayfalar, KVKK uyumlu randevu formları ve yorumlarınızla bölgenizin ilk tercihi olmanızı sağlıyoruz.":
    "В здравеопазването доверието е всичко — сайтът ви трябва да го отразява. С корпоративни страници, описващи специализациите и услугите ви, форми за резервации по KVKK и вашите отзиви ви правим първия избор в региона.",
  "Eğitim & Kurs": "Образование и курсове",
  "Kayıt akışı kesintisiz": "Безпрепятствен процес на записване",
  "Özel kurslar, akademiler ve eğitim kurumları için program tanıtımı, online kayıt ve veli duyuru sistemleri.":
    "Представяне на програми, онлайн записване и системи за известия за частни курсове, академии и образователни институции.",
  "Online kurs kayıt formu": "Онлайн форма за записване на курс",
  "Eğitim takvimi ve programlar": "Образователен календар и програми",
  "Ödeme bilgisi ve POS entegrasyonu": "Информация за плащания и POS интеграция",
  "Veli / öğrenci duyuru alanı": "Раздел за известия към родители / ученици",
  "Kayıt döneminde veliler sizi telefonundan arıyor. Programlarınızı, eğitmenlerinizi ve ücretleri net gösteren bir site kuruyor, online kayıt formuyla kontenjanlarınızı hızla dolduruyoruz; duyurularınız tek tıkla tüm velilere ulaşır.":
    "През сезона на записвания родителите ви ви търсят от телефона. Изграждаме сайт, който ясно показва програмите, преподавателите и таксите, запълваме местата бързо с онлайн форма за записване и доставяме известията ви до всеки родител с едно кликване.",
  "Otomotiv & Servis": "Автомобили и сервиз",
  "Galeriden servise tek adres": "Един адрес от автосалона до сервиза",
  "Oto galeriler, yedek parça ve servis işletmeleri için araç galerileri, ekspertiz randevuları ve servis takibi.":
    "Галерии за автомобили, резервации за експертизи и проследяване на сервизи за автокъщи, магазини за авточасти и сервизни предприятия.",
  "İkinci el araç galerisi": "Галерия за автомобили втора ръка",
  "Ekspertiz & servis randevusu": "Резервации за експертиза и сервиз",
  "Fiyat listesi yayını": "Публикуване на ценови списъци",
  "WhatsApp ile hızlı iletişim": "Бърза връзка чрез WhatsApp",
  "Araçlarınızı fotoğrafı ve detayıyla yayınlayan bir galeri kuruyor, potansiyel alıcıyı WhatsApp'ta size bağlıyoruz. Servis ve ekspertiz işletmeleri için randevu formu ile birlikte yoğunluğunuzu planlamanızı sağlayan takip sistemi sunuyoruz.":
    "Изграждаме галерия, която публикува автомобилите ви със снимки и детайли, и свързваме потенциалните купувачи с вас чрез WhatsApp. За сервизните предприятия предлагаме форма за резервации и система за проследяване, която помага да планирате натоварването.",

  // Footer
  "İletişime geçin": "Свържете се с нас",
  "Trakya'nın dijital mimarısıyla tanışın.": "Запознайте се с цифровия архитект на Тракия.",
  "Sohbet başlat": "Започнете разговор",
  "Ücretsiz SEO denetimi alın": "Получете безплатен SEO одит",
  "Sitenizi 24 saat içinde analiz edip raporlayalım.": "Нека анализираме сайта ви и ви предоставим отчет в рамките на 24 часа.",
  "Denetim isteyin": "Заявете одит",
  "DijiTrak ile ortak olun": "Станете партньор на DijiTrak",
  "Toprağınızı dijitalleştiren ekiple büyümeye başlayın.": "Започнете да растете с екипа, който превръща земята ви в цифров формат.",
  "Projenizi anlatın": "Разкажете за проекта си",
  "Form doldur": "Попълнете формата",
  "KEŞFET": "РАЗГЛЕДАЙТЕ",
  "Sektörel Çözümler": "Секторни решения",
  "İşletme Rehberi": "Директория на фирмите",
  "Blog & Rehberler": "Блог и ръководства",
  "İLETİŞİM": "КОНТАКТ",
  "Web Tasarımı": "Уеб дизайн",
  "Bakım & Destek": "Поддръжка и помощ",
  "Tekirdağ, Edirne ve Kırklareli işletmeleri için web tasarımı, e-ticaret ve SEO.":
    "Уеб дизайн, е-търговия и SEO за предприятия в Текирдаг, Одрин и Лозенград.",
  "© 2026 DijiTrak Ajans. Tüm hakları saklıdır.": "© 2026 DijiTrak Ajans. Всички права запазени.",

  // LeadForm
  "Ad Soyad *": "Име и фамилия *",
  "E-posta *": "Имейл *",
  "Telefon": "Телефон",
  "Firma Adı": "Име на фирмата",
  "Sektörünüz": "Вашият сектор",
  "İlgilendiğiniz Hizmet": "Услуга, която ви интересува",
  "Sektör seçin": "Изберете сектор",
  "Hizmet seçin": "Изберете услуга",
  "Projenizden bahsedin *": "Разкажете за проекта си *",
  "Hangi hizmete ihtiyacınız var? Hedefleriniz neler?": "От коя услуга се нуждаете? Какви са целите ви?",
  "Ad, e-posta ve mesaj alanları zorunludur.": "Име, имейл и съобщение са задължителни.",
  "Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.": "Възникна проблем при записването на заявката. Моля, опитайте отново.",
  "Talebiniz alındı!": "Заявката ви е получена!",
  "Ekibimiz 1 iş günü içinde size dönüş yapacak. Acil durumlar için AI asistanımız 7/24 yanınızda.":
    "Екипът ни ще се свърже с вас в рамките на 1 работен ден. За спешни случаи AI асистентът ни е с вас 24/7.",
  "Gönderiliyor…": "Изпраща се…",
  "Talebi Gönder": "Изпратете заявката",
  "Yerel Ticaret": "Местна търговия",
  "İletişim Formu": "Форма за контакт",

  // Contact
  "Projenizi konuşalım": "Да поговорим за проекта ви",
  "Formu doldurun, 1 iş günü içinde size dönüş yapalım. Ya da AI asistanımızla hemen konuşun.":
    "Попълнете формата и ще се свържем с вас в рамките на 1 работен ден. Или говорете с нашия AI асистент веднага.",
  "Teklif / bilgi talebi": "Заявка за оферта / информация",
  "Ofis": "Офис",
  "E-posta": "Имейл",
  "Çalışma saatleri": "Работно време",
  "Hafta içi 09:00 – 18:00": "Делнично 09:00 – 18:00",
  "AI asistan": "AI асистент",
  "7/24 aktif — anında yanıt": "активен 24/7 — незабавни отговори",

  // Isletmeler
  "İŞLETME REHBERİ": "ДИРЕКТОРИЯ НА ФИРМИТЕ",
  "Trakya'nın işletme haritası": "Картата на тракийските предприятия",
  "Şirketler, dükkanlar, atölyeler, kafeler… Bölgedeki dijitalleşen işletmeleri tek rehberde topluyoruz. Aradığınızı bulun, ilham alın.":
    "Компании, магазини, ателиета, кафенета… Събираме цифровизиращите се предприятия от региона в една директория. Намерете това, което търсите, и се вдъхновете.",
  "İşletme, sektör veya ilçe ara…": "Търсете фирма, сектор или околия…",
  "Tüm İller": "Всички области",
  "Tüm Sektörler": "Всички сектори",
  "İl": "Област",
  "Sektör": "Сектор",
  "YÜKLENİYOR…": "ЗАРЕЖДА…",
  "İŞLETME": "ФИРМИ",
  "Sonuç bulunamadı": "Няма резултати",
  "Aramanızla eşleşen işletme yok. Filtreleri değiştirmeyi deneyin.": "Няма фирми, съответстващи на търсенето. Опитайте да смените филтрите.",
  "İşletmeniz bu listede yok mu?": "Вашата фирма липсва в списъка?",
  "Trakya'daki tüm şirketler, dükkanlar ve atölyeler için rehberimiz açık. İşletmenizi ekletmek ve dijital varlığınızı güçlendirmek için bize ulaşın.":
    "Директорията ни е отворена за всички компании, магазини и ателиета в Тракия. Свържете се с нас, за да добавим фирмата ви и да подсилим цифровото ви присъствие.",
  "AI Asistanla Başvur": "Кандидатствайте чрез AI асистента",

  // CasePreview / CaseStudies
  "BAŞARI ARŞİVİ": "АРХИВ С УСПЕХИ",
  "Verilerle yazılmış hikâyeler": "Истории, написани с данни",
  "Tüm izlerimiz": "Всички проекти",
  "İz bıraktıklarımız yakında yayında.": "Проектите ни скоро ще бъдат публикувани.",
  "TARIM": "ЗЕМЕДЕЛИЕ",
  "SANAYİ": "ИНДУСТРИЯ",
  "E-TİCARET": "Е-ТЪРГОВИЯ",
  "YEREL TİCARET": "МЕСТНА ТЪРГОВИЯ",
  "İz Bıraktıklarımıza dön": "Обратно към проектите",
  "Trakya'daki işletmelerin dijitalleşme yolculuğu, before/after metrikleriyle.":
    "Пътят на цифровизацията на тракийските предприятия, с метрики преди/след.",
  "İncele": "Вижте повече",
  "Kapat": "Затворете",
  "ZORLUK": "ПРЕДИЗВИКАТЕЛСТВО",
  "ÇÖZÜM": "РЕШЕНИЕ",

  // BlogPreview / Blog
  "Trakya işletmesi rehberleri": "Ръководства за тракийски предприятия",
  "Tüm yazılar": "Всички статии",
  "Rehberler yakında yayında.": "Ръководствата скоро ще бъдат публикувани.",
  "dk": "мин",
  "Dijitalleşme rehberi": "Ръководство за цифровизация",
  "Web sitesi fiyatlarından SEO ipuçlarına, Trakya işletmeleri için hazırlanmış sektörel içerikler.":
    "Секторно съдържание за тракийските предприятия — от цени на сайтове до SEO съвети.",
  "Tümü": "Всички",
  "Bu kategoride henüz yazı yok.": "Още няма статии в тази категория.",
  "dk okuma": "мин четене",

  // AI chat
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Здравейте! Аз съм AI асистентът на DijiTrak. Питайте ме всичко за цени, процес и секторни решения.",
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç, SEO, e-ticaret ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Здравейте! Аз съм AI асистентът на DijiTrak. Питайте ме всичко за цени, процес, SEO, е-търговия и секторни решения.",
  "Fiyat teklifi al": "Получете ценова оферта",
  "Web sitesi için fiyat teklifi almak istiyorum.": "Искам да получа ценова оферта за уебсайт.",
  "Ücretsiz SEO denetimi": "Безплатен SEO одит",
  "Sitem için ücretsiz SEO denetimi istiyorum.": "Искам безплатен SEO одит за сайта ми.",
  "Randevu oluştur": "Насрочване на среща",
  "Ücretsiz keşif görüşmesi için randevu almak istiyorum.": "Искам да насроча среща за безплатен първи разговор.",
  "Tarım işletmesiyim": "Имам земеделско предприятие",
  "Tarım işletmesiyim, bana özel çözümleriniz neler?": "Имам земеделско предприятие. Какви решения предлагате за мен?",
  "Esnaf işletmesiyim": "Имам местен магазин",
  "Esnaf işletmesiyim, bana özel çözümleriniz neler?": "Имам местен магазин. Какви решения предлагате за мен?",
  "Web sitesi ne kadar sürede teslim edilir?": "За колко време се доставя уебсайтът?",
  "SEO çalışmaları neyi kapsıyor?": "Какво включва SEO работата?",
  "E-ticaret paketi neler içeriyor?": "Какво включва пакетът за е-търговия?",
  "Bakım ve destek hizmeti nasıl işliyor?": "Как работи услугата за поддръжка?",
  "Google Haritalar optimizasyonu yapıyor musunuz?": "Правите ли оптимизация за Google Карти?",
  "Komut Merkezi": "Команден център",
  "ASİSTAN AKTİF — 7/24 Türkçe yanıt": "АСИСТЕНТ НА ЛИНИЯ — 24/7",
  "Sohbeti Sıfırla": "Изчистете разговора",
  "Mesajınızı yazın…": "Напишете съобщението си…",
  "Gönder": "Изпратете",
  "Üzgünüm, şu an yanıt alamadım. Lütfen tekrar deneyin.": "За съжаление не получих отговор в момента. Моля, опитайте отново.",
  "Bağlantıda bir sorun oluştu. Lütfen tekrar dener misiniz?": "Възникна проблем със свързването. Може ли да опитате отново?",
  "SIK SORULANLAR": "ЧЕСТО ЗАДАВАНИ ВЪПРОСИ",
  "TEKLİF AL": "ПОЛУЧЕТЕ ОФЕРТА",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi.":
    "Заявката се препраща към екипа ни — гарантиран отговор в рамките на 1 работен ден.",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi. Dilerseniz ":
    "Заявката се препраща към екипа ни — гарантиран отговор в рамките на 1 работен ден. Можете също да използвате ",
  "iletişim sayfasını": "страницата за контакт",
  " da kullanabilirsiniz.": ", ако предпочитате.",
  "CANLI SOHBET": "ЧАТ НА ЖИВО",
  "AI ASİSTAN AKTİF · 7/24": "AI АСИСТЕНТ НА ЛИНИЯ · 24/7",
  "SOHBET": "ЧАТ",
  "Canlı sohbet aç": "Отворете чата на живо",
};

const EL = {
  // Navbar
  "Ana Sayfa": "Αρχική",
  "Sektörler": "Κλάδοι",
  "İşletmeler": "Επιχειρήσεις",
  "İz Bıraktıklarımız": "Το έργο μας",
  "İletişim": "Επικοινωνία",
  "AI Asistan": "AI Βοηθός",
  "AI Asistanla Konuş": "Μιλήστε με τον AI Βοηθό",
  "Menü": "Μενού",

  // Hero
  "DİJİTRAK AJANS — TEKİRDAĞ · EDİRNE · KIRKLARELİ": "DIJITRAK ΓΡΑΦΕΙΟ — ΤΕΚΙΡΝΤΑΓΚ · ΕΔΙΡΝΕ · ΚΙΡΚΛΑΡΕΛΙ",
  "AI ASİSTAN AKTİF — 7/24": "AI ΒΟΗΘΟΣ ONLINE — 24/7",
  "Trakya'nın Toprağını ": "Μετατρέπουμε το χώμα της Θράκης ",
  "Dijitale": "σε ψηφιακό",
  " Dönüştürüyoruz": "",
  "Tarım, sanayi ve yerel ticaret işletmelerine Vercel standardında web tasarımı, e-ticaret ve SEO hizmetleri. AI destekli ekibimizle bölgenin dijital mimarıyız.":
    "Υπηρεσίες σχεδιασμού ιστοσελίδων, e-commerce και SEO κατά το πρότυπο Vercel για αγροτικές, βιομηχανικές και τοπικές εμπορικές επιχειρήσεις. Με την ομάδα μας με AI, είμαστε ο ψηφιακός αρχιτέκτονας της περιοχής.",
  "Hizmetleri Keşfet": "Ανακαλύψτε τις Υπηρεσίες",
  "HASAT 2026 — TRAKYA OVASI": "ΣΥΓΚΟΜΙΔΗ 2026 — ΘΡΑΚΙΚΗ ΠΕΔΙΑΔΑ",
  "Trakya'da gün batımında hasat makinesi": "Θεριστική μηχανή στη δύση του ηλίου στη Θράκη",

  // ServicesGrid
  "HİZMETLER": "ΥΠΗΡΕΣΙΕΣ",
  "Uçtan uca dijital altyapı": "Ολοκληρωμένη ψηφιακή υποδομή",
  "Tasarımdan SEO'ya, e-ticaretten bakıma kadar işletmenizin ihtiyaç duyduğu her dijital hizmet tek çatı altında.":
    "Από τον σχεδιασμό έως το SEO, από το e-commerce έως τη συντήρηση — κάθε ψηφιακή υπηρεσία που χρειάζεται η επιχείρησή σας κάτω από μία στέγη.",
  "Kurumsal Web Tasarımı": "Εταιρικός Σχεδιασμός Ιστοσελίδων",
  "Vercel standardında, yüksek hızlı ve animasyonlu kurumsal siteler.": "Γρήγορες εταιρικές ιστοσελίδες με animation κατά το πρότυπο Vercel.",
  "E-Ticaret Kurulumu": "Δημιουργία E-Commerce",
  "Ödeme, kargo ve pazaryeri entegrasyonları hazır satış mağazası.": "Κατάστημα έτοιμο για πωλήσεις, με ενσωματώσεις πληρωμών, αποστολών και marketplaces.",
  "SEO & Yerel Arama": "SEO & Τοπική Αναζήτηση",
  "Trakya'da 'web tasarım' aramalarında ilk sayfa hedefli SEO çalışması.": "SEO εργασία με στόχο την πρώτη σελίδα για αναζητήσεις «σχεδιασμός ιστοσελίδων» στη Θράκη.",
  "Google Haritalar Optimizasyonu": "Βελτιστοποίηση Google Maps",
  "Haritalar kaydınız, yorumlarınız ve yerel görünürlüğünüz.": "Η καταχώρισή σας στους Χάρτες, οι κριτικές σας και η τοπική σας ορατότητα.",
  "Mobil Uyumlama": "Προσαρμογή για Κινητά",
  "Mevcut sitenizi mobil öncelikli, hızlı ve erişilebilir hale getirme.": "Κάνουμε την υπάρχουσα ιστοσελίδα σας γρήγορη, προσιτή και φιλική προς τα κινητά.",
  "Bakım & Türkçe Destek": "Συντήρηση & Υποστήριξη",
  "7/24 Türkçe teknik destek, yedekleme ve güvenlik güncellemeleri.": "24/7 τεχνική υποστήριξη, backups και ενημερώσεις ασφαλείας.",

  // Stats
  "Tamamlanan Proje": "Ολοκληρωμένα Έργα",
  "İlde Aktif Hizmet": "Επαρχίες που Εξυπηρετούμε",
  "Müşteri Memnuniyeti": "Ικανοποίηση Πελατών",
  "AI Destek Hattı": "Γραμμή Υποστήριξης AI",

  // ChatPromo
  "Kafe için web sitesi ne kadara olur?": "Πόσο θα κόστιζε μια ιστοσελίδα για καφέ;",
  "Kafe paketimiz QR dijital menü + rezervasyon formu içeriyor. Ayrıntı ve ödeme planını buradan paylaşabilirim…":
    "Το πακέτο μας για καφέ περιλαμβάνει ψηφιακό μενού QR + φόρμα κρατήσεων. Μπορώ να μοιραστώ τις λεπτομέρειες και το πλάνο πληρωμής εδώ…",
  "Süremiz ne olur?": "Πόσος χρόνος θα χρειαστεί;",
  "Yayına alış ortalamamız 14 iş günü. Hemen keşif randevusu oluşturabilirim.":
    "Ο μέσος χρόνος έναρξης είναι 14 εργάσιμες ημέρες. Μπορώ να κανονίσω αμέσως ένα ραντεβού γνωριμίας.",
  "AI ASİSTAN": "AI ΒΟΗΘΟΣ",
  "Projenizi AI asistanla 5 dakikada netleştirin": "Διευκρινίστε το έργο σας με τον AI βοηθό σε 5 λεπτά",
  "Fiyat, süreç ve sektör çözümleri — 7/24 Türkçe yanıt. Tek bir sohbetle ihtiyacınızı netleştirip teklifinizi ve randevunuzu anında oluşturuyor.":
    "Τιμές, διαδικασίες και κλαδικές λύσεις — απαντήσεις 24/7. Μία συνομιλία διευκρινίζει τις ανάγκες σας και δημιουργεί αμέσως την προσφορά και το ραντεβού σας.",
  "Sohbete Başla": "Ξεκινήστε Συνομιλία",
  "Formla Devam Et": "Συνεχίστε με τη Φόρμα",
  "Anında yanıt": "Άμεσες απαντήσεις",
  "7/24 aktif": "ενεργό 24/7",
  "teklif hazırlanıyor…": "ετοιμάζεται η προσφορά…",

  // BudgetCalculator
  "BÜTÇE HESAPLAYICI": "ΥΠΟΛΟΓΙΣΤΗΣ ΠΡΟΥΠΟΛΟΓΙΣΜΟΥ",
  "Projenize 60 saniyede fiyat alın": "Λάβετε τιμή για το έργο σας σε 60 δευτερόλεπτα",
  "Sektörünüzü ve ihtiyaçlarınızı seçin, tahmini proje bütçeniz anında hesaplansın.":
    "Επιλέξτε τον κλάδο και τις ανάγκες σας και ο εκτιμώμενος προϋπολογισμός υπολογίζεται αμέσως.",
  "01 — SEKTÖRÜNÜZ": "01 — Ο ΚΛΑΔΟΣ ΣΑΣ",
  "02 — İHTİYAÇLARINIZ": "02 — ΟΙ ΑΝΑΓΚΕΣ ΣΑΣ",
  "03 — KAPSAM": "03 — ΕΚΤΑΣΗ",
  "Diğer": "Άλλο",
  "Kurumsal Web Sitesi": "Εταιρική Ιστοσελίδα",
  "Özel tasarım, mobil uyumlu": "Προσαρμοσμένο σχέδιο, φιλικό σε κινητά",
  "E-Ticaret Altyapısı": "Υποδομή E-Commerce",
  "Ödeme, stok, kargo entegrasyonu": "Ενσωμάτωση πληρωμών, αποθέματος, αποστολών",
  "SEO Optimizasyonu": "Βελτιστοποίηση SEO",
  "Teknik SEO + anahtar kelime planı": "Τεχνικό SEO + πλάνο λέξεων-κλειδιών",
  "Yerel SEO & Haritalar": "Τοπικό SEO & Χάρτες",
  "Google Business profil yönetimi": "Διαχείριση προφίλ Google Business",
  "İçerik & Fotoğraf": "Περιεχόμενο & Φωτογραφία",
  "Profesyonel çekim + metinler": "Επαγγελματικά γυρίσματα + κείμενα",
  "Yıllık Bakım & Destek": "Ετήσια Συντήρηση & Υποστήριξη",
  "Güncelleme, güvenlik, raporlama": "Ενημερώσεις, ασφάλεια, αναφορές",
  "Hızlı Başlangıç": "Γρήγορη Εκκίνηση",
  "Profesyonel": "Επαγγελματικό",
  "Kurumsal": "Εταιρικό",
  "Sayfa sayısı:": "Αριθμός σελίδων:",
  "(web sitesi seçiliyken aktif)": "(ενεργό όταν επιλεγεί ιστοσελίδα)",
  "TAHMİNİ PROJE BÜTÇESİ": "ΕΚΤΙΜΩΜΕΝΟΣ ΠΡΟΥΠΟΛΟΓΙΣΜΟΣ ΕΡΓΟΥ",
  "aralığı": "εύρος",
  "Ek sayfalar": "Επιπλέον σελίδες",
  "Sektör & kapsam katsayısı": "Συντελεστής κλάδου & έκτασης",
  "Hesaplama için en az bir hizmet seçin.": "Επιλέξτε τουλάχιστον μία υπηρεσία για υπολογισμό.",
  "Kesin teklifi AI asistanla al": "Λάβετε ακριβή προσφορά μέσω του AI βοηθού",
  "Fiyatlar bilgilendirme amaçlı tahminlerdir; kesin teklif keşif görüşmesi sonrası verilir.":
    "Οι τιμές είναι ενημερωτικές εκτιμήσεις· η τελική προσφορά δίνεται μετά από ραντεβού γνωριμίας.",

  // SectorHub / Sectors
  "SEKTÖREL ÇÖZÜMLER": "ΚΛΑΔΙΚΕΣ ΛΥΣΕΙΣ",
  "Sektörünüzü biliyor muyuz? Evet.": "Γνωρίζουμε τον κλάδο σας; Ναι.",
  "Tarımından sanayisine, Trakya'nın her sektörüne özel hazırlanmış dijital çözümler.":
    "Ψηφιακά λύσεις προσαρμοσμένα σε κάθε κλάδο της Θράκης, από τη γεωργία έως τη βιομηχανία.",
  "Sektör çözümünü incele": "Δείτε τη λύση του κλάδου",
  "SEKTÖR": "ΚΛΑΔΟΣ",
  "Sektörünüze özel dijital altyapı": "Ψηφιακή υποδομή προσαρμοσμένη στον κλάδο σας",
  "Her sektörün kendi dili, kendi müşterisi ve kendi dijital ihtiyaçları var. Trakya'da yıllardır sahadayız; çözümlerimiz de buradan çıkıyor.":
    "Κάθε κλάδος έχει τη δική του γλώσσα, τους δικούς του πελάτες και τις δικές του ψηφιακές ανάγκες. Είμαστε στο πεδίο στη Θράκη εδώ και χρόνια· από εκεί ξεκινούν και οι λύσεις μας.",
  "Bu sektör için fiyat alın": "Λάβετε τιμή για αυτόν τον κλάδο",
  "İletişim formu": "Φόρμα επικοινωνίας",

  // Process
  "SÜREÇ": "ΔΙΑΔΙΚΑΣΙΑ",
  "Keşiften büyümeye, 4 adım": "Από τη γνωριμία στην ανάπτυξη, σε 4 βήματα",
  "Keşif": "Γνωριμία",
  "İşletmenizi, rakiplerinizi ve hedef kitlenizi analiz ediyoruz.": "Αναλύουμε την επιχείρησή σας, τους ανταγωνιστές και το κοινό-στόχο σας.",
  "Tasarım": "Σχέδιο",
  "Sektörünüze özel, Vercel standardında animasyonlu tasarımı onayınıza sunuyoruz.":
    "Σας παρουσιάζουμε για έγκριση ένα σχέδιο με animation κατά το πρότυπο Vercel, προσαρμοσμένο στον κλάδο σας.",
  "Geliştirme": "Υλοποίηση",
  "Hız, güvenlik ve SEO odaklı kodlamayla sitenizi hayata geçiriyoruz.": "Υλοποιούμε την ιστοσελίδα σας με κώδικα εστιασμένο σε ταχύτητα, ασφάλεια και SEO.",
  "Büyüme": "Ανάπτυξη",
  "Aylık SEO çalışması, bakım ve AI destekli analizle büyümenizi sürdürüyoruz.":
    "Συνεχίζουμε την ανάπτυξή σας με μηνιαία εργασία SEO, συντήρηση και ανάλυση με AI.",

  // Testimonials
  "MÜŞTERİ YORUMLARI": "ΚΡΙΣΕΙΣ ΠΕΛΑΤΩΝ",
  "Trakya'da konuşan sonuçlar": "Αποτελέσματα που μιλούν στη Θράκη",
  "Vitrin sitemiz yayına girdikten iki hafta sonra tüm Türkiye'den sipariş almaya başladık. WhatsApp hattı kurulumu dahil her şeyi düşündüler.":
    "Δύο εβδομάδες μετά την έναρξη της ιστοσελίδας προβολής μας, αρχίσαμε να λαμβάνουμε παραγγελίες από όλη την Τουρκία. Φρόντισαν για όλα, συμπεριλαμβανομένης της γραμμής WhatsApp.",
  "Araç galerimizi üç haftada yayına aldılar; online galeri sayesinde satışlarımız neredeyse ikiye katlandı. Destek her zaman Türkçe ve hızlı.":
    "Εκκίνησαν τη γκαλερί αυτοκινήτων μας σε τρεις εβδομάδες· χάρη στην online γκαλερί οι πωλήσεις μας σχεδόν διπλασιάστηκαν. Η υποστήριξη είναι πάντα γρήγορη.",
  "QR dijital menü ve rezervasyon sistemiyle hafta sonları masalarımız hiç boş kalmıyor. Google yorumları yönetmeleri tek başına parayı ödedi.":
    "Με το ψηφιακό μενού QR και το σύστημα κρατήσεων, τα τραπέζια μας δεν μένουν κενά τα σαββατοκύριακα. Μόνο η διαχείριση των κριτικών Google αξίζει το κόστος.",

  // Packages
  "PAKETLER": "ΠΑΚΕΤΑ",
  "Net fiyatlar, sürpriz yok": "Διαφανείς τιμές, χωρίς εκπλήξεις",
  "EN POPÜLER": "ΤΟ ΠΙΟ ΔΗΜΟΦΙΛΕΣ",
  "Teklif İste": "Ζητήστε Προσφορά",
  "Teklif Al": "Λάβετε προσφορά",
  "tek seferlik": "εφάπαξ",
  "Başlangıç": "Εκκίνηση",
  "Kurumsal tanıtım sitesi": "Εταιρική ιστοσελίδα προβολής",
  "5 sayfaya kadar tasarım": "Σχέδιο έως 5 σελίδων",
  "Mobil uyumlu ve hızlı": "Φιλικό σε κινητά και γρήγορο",
  "SSL + alan adı kurulumu": "SSL + εγκατάσταση domain",
  "İletişim formları": "Φόρμες επικοινωνίας",
  "1 yıl hosting hediye": "1 χρόνο hosting δώρο",
  "SEO ve içerik altyapısıyla": "Με υποδομή SEO και περιεχομένου",
  "Sınırsız sayfa + blog": "Απεριόριστες σελίδες + blog",
  "SEO altyapısı ve Google kaydı": "Υποδομή SEO και καταχώριση σε Google",
  "Çoklu dil desteği": "Υποστήριξη πολλαπλών γλωσσών",
  "AI asistan entegrasyonu": "Ενσωμάτωση AI βοηθού",
  "Öncelikli destek": "Υποστήριξη προτεραιότητας",
  "E-Ticaret": "E-Commerce",
  "Satışa hazır mağaza": "Κατάστημα έτοιμο για πωλήσεις",
  "Sanal POS + kargo entegrasyonu": "Εικονικό POS + ενσωμάτωση αποστολών",
  "Pazaryeri bağlantıları": "Συνδέσεις με marketplaces",
  "Stok yönetimi": "Διαχείριση αποθέματος",
  "Ürün fotoğraf düzenleme": "Επεξεργασία φωτογραφιών προϊόντων",
  "Satış eğitim desteği": "Υποστήριξη εκπαίδευσης πωλήσεων",

  // Sectors data
  "Tarım & Gıda": "Γεωργία & Τρόφιμα",
  "Verimli topraklar, dijital hasat": "Εύφορα εδάφη, ψηφιακή συγκομιδή",
  "Trakya'nın ayçiçeği, buğday ve bağ-bahçe işletmeleri için ürün katalogları, B2B sipariş sistemleri ve hasat takibi entegrasyonları kuruyoruz.":
    "Για τις ηλιοτροπικές, σιτηρών και δενδροκομικές επιχειρήσεις της Θράκης δημιουργούμε καταλόγους προϊόντων, συστήματα παραγγελιών B2B και ενσωματώσεις παρακολούθησης συγκομιδής.",
  "Ürün ve fiyat kataloğu": "Κατάλογος προϊόντων και τιμών",
  "B2B toptan sipariş portalı": "Πύλη χονδρικών παραγγελιών B2B",
  "Hasat ve stok takip entegrasyonu": "Ενσωμάτωση παρακολούθησης συγκομιδής και αποθέματος",
  "Google Haritalar & yerel SEO": "Google Maps & τοπικό SEO",
  "Tarım işletmelerinin dijitalleşme oranı Trakya'da hızla artıyor. Sizin için ürünlerinizi sergileyen, toptan müşterilerinize özel fiyat listeleri sunan ve mobil cihazdan yönetilebiren bir katalog sitesi kuruyoruz. Ziraat faaliyetlerinizle entegre çalışır; hasat sezonunda güncel arz bilgisi otomatik yayımlanır.":
    "Οι αγροτικές επιχειρήσεις στη Θράκη ψηφιοποιούνται γρήγορα. Δημιουργούμε ιστοσελίδα-κατάλογο που παρουσιάζει τα προϊόντα σας, προσφέρει εξατομικευμένους τιμοκαταλόγους στους χονδρεμπόρους σας και διαχειρίζεται από το κινητό. Λειτουργεί σε συγχρονισμό με την αγροτική σας δραστηριότητα: οι διαθέσιμες ποσότητες δημοσιεύονται αυτόματα την εποχή της συγκομιδής.",
  "Sanayi & İmalat": "Βιομηχανία & Παραγωγή",
  "Ağır sanayi, hassas mühendislik": "Βαριά βιομηχανία, ακριβής μηχανική",
  "Çorlu ve Lüleburgaz'daki tekstil, makine ve imalat firmaları için B2B katalog siteleri, RFQ formları ve CAD dosya paylaşım altyapıları.":
    "Ιστοσελίδες-κατάλογοι B2B, φόρμες RFQ και υποδομή διαμοιρασμού αρχείων CAD για κλωστοϋφαντουργικές, μηχανολογικές και μεταποιητικές εταιρείες στο Τσορλού και το Λουλεμπουργκάς.",
  "B2B ürün katalogu": "Κατάλογος προϊόντων B2B",
  "Teklif (RFQ) formları": "Φόρμες προσφορών (RFQ)",
  "CAD / teknik döküman paylaşımı": "Διαμοιρασμός CAD / τεχνικών εγγράφων",
  "Çoklu dil altyapısı": "Πολύγλωσση υποδομή",
  "İhracat yapan sanayi firmalarının en büyük eksiği görünürlüktür. Kurumsal kimliğinizi yansıtan, teknik dökümanlarınızı yönetebileceğiniz ve yurt dışı müşterinizin dilinde yayın yapan bir B2B platform kuruyoruz; RFQ formu gelen her talep panelinize düşer.":
    "Το μεγαλύτερο κενό των εξαγωγικών μεταποιητικών επιχειρήσεων είναι η ορατότητα. Δημιουργούμε B2B πλατφόρμα που αντικατοπτρίζει την εταιρική σας ταυτότητα, διαχειρίζεται τα τεχνικά σας έγγραφα και δημοσιεύει στη γλώσσα των πελατών σας του εξωτερικού· κάθε αίτημα RFQ καταλήγει στο πάνελ σας.",
  "Satış, teslimat, büyüme": "Πωλήσεις, παραδόσεις, ανάπτυξη",
  "Yerel üreticileri Türkiye geneline satışa taşıyan, ödeme ve kargo entegrasyonları hazır e-ticaret siteleri ve pazaryeri bağlantıları.":
    "Ιστοσελίδες e-commerce με έτοιμες ενσωματώσεις πληρωμών και αποστολών που οδηγούν τους τοπικούς παραγωγούς σε πωλήσεις σε όλη την Τουρκία, καθώς και συνδέσεις με marketplaces.",
  "Sanal POS ve ödeme entegrasyonu": "Εικονικό POS και ενσωμάτωση πληρωμών",
  "Kargo otomasyonu": "Αυτοματισμός αποστολών",
  "Pazaryeri (Trendyol, Hepsiburada) bağlantısı": "Σύνδεση με marketplaces (Trendyol, Hepsiburada)",
  "Stok ve sipariş yönetimi": "Διαχείριση αποθέματος και παραγγελιών",
  "Trakya'da üretilen gıda, tekstil ve el işi ürünleri Türkiye'nin dört bir yanına ulaştırıyoruz. Sanal POS, kargo firmaları ve pazaryeri entegrasyonlarıyla satışa hazır bir mağaza kuruyor, ürünlerinizi fotoğrafçılıktan SEO'ya kadar uçtan uca hazırlıyoruz.":
    "Παραδίδουμε τρόφιμα, κλωστοϋφαντουργικά και χειροποίητα προϊόντα της Θράκης σε κάθε γωνιά της Τουρκίας. Δημιουργούμε κατάστημα έτοιμο για πωλήσεις με εικονικό POS, εταιρείες αποστολών και ενσωματώσεις marketplaces, και προετοιμάζουμε τα προϊόντα σας ολοκληρωμένα — από τη φωτογράφιση έως το SEO.",
  "Yerel Ticaret & Hizmet": "Τοπικό Εμπόριο & Υπηρεσίες",
  "Mahallenin en görünüz işletmesi": "Η πιο ορατή επιχείρηση της γειτονιάς",
  "Tekirdağ, Edirne ve Kırklareli'ndeki kafe, restoran, kuyumcu ve hizmet işletmeleri için Google Haritalar optimizasyonu ve mobil uyumlu siteler.":
    "Βελτιστοποίηση Google Maps και φιλικές προς τα κινητά ιστοσελίδες για καφέ, εστιατόρια, κοσμηματοπωλεία και επιχειρήσεις υπηρεσιών στο Τεκιρντάγκ, την Αδριανούπολη και το Κιρκλάρελι.",
  "Google Haritalar optimizasyonu": "Βελτιστοποίηση Google Maps",
  "Yerel SEO ve yorum yönetimi": "Τοπικό SEO και διαχείριση κριτικών",
  "Rezervasyon ve iletişim formları": "Φόρμες κρατήσεων και επικοινωνίας",
  "Mobil öncelikli tasarım": "Σχέδιο με προτεραιότητα στα κινητά",
  "Müşteriniz sizi önce telefonundan arıyor. Google Haritalar kaydınızı optimize ediyor, mobil uyumlu hızlı sitenizle randevu ve rezervasyon alıyor, yorumlarınızı yöneterek bölgenizde ilk sayfada görünmenizi sağlıyoruz.":
    "Οι πελάτες σας σας αναζητούν πρώτα από το κινητό τους. Βελτιστοποιούμε την καταχώρισή σας στους Google Maps, δεχόμαστε κρατήσεις μέσω της γρήγορης ιστοσελίδας σας και διαχειριζόμαστε τις κριτικές σας για να βρεθείτε στην πρώτη σελίδα της περιοχής σας.",
  "Esnaf & Dükkan": "Καταστήματα & Τοπικά Μαγαζιά",
  "Çarşının dijital vitrini": "Η ψηφιακή βιτρίνα του παζαριού",
  "Bakkal, market, kuyumcu, berber ve terzi gibi mahalle işletmeleri için Google Haritalar kaydı, WhatsApp sipariş hattı ve vitrin sitesi.":
    "Καταχωρίσεις σε Google Maps, γραμμές παραγγελιών WhatsApp και ιστοσελίδες προβολής για επιχειρήσεις της γειτονιάς όπως μπακάλικα, κοσμηματοπωλεία, κουρεία και ράφτες.",
  "Google Haritalar & Yerel SEO": "Google Maps & Τοπικό SEO",
  "WhatsApp Business sipariş hattı": "Γραμμή παραγγελιών WhatsApp Business",
  "Vitrin ve duyuru sayfası": "Σελίδα βιτρίνας και ανακοινώσεων",
  "Haftalık kampanya alanı": "Εβδομαδιαίος χώρος προσφορών",
  "Trakya'nın çarşıları yüzyıllardır ticaretin kalbi; müşteriniz artık orada telefonla dolaşıyor. Google Haritalar kaydınızı optimize ediyor, WhatsApp üzerinden sipariş alabileceğiniz bir hattı kuruyor, kampanyalarınızı anında yayınladığınız hızlı bir vitrin sitesi veriyoruz. Mahallenizin en görünür esnafı olun.":
    "Τα παζάρια της Θράκης είναι αιώνες η καρδιά του εμπορίου· ο πελάτης σας σήμερα τα περιηγείται με κινητό. Βελτιστοποιούμε την καταχώρισή σας στους Google Maps, στήνουμε γραμμή παραγγελιών μέσω WhatsApp και σας δίνουμε μια γρήγορη ιστοσελίδα-βιτρίνα όπου δημοσιεύετε τις προσφορές σας άμεσα. Γίνετε το πιο ορατό μαγαζί της γειτονιάς σας.",
  "Kafe & Restoran": "Καφέ & Εστιατόρια",
  "Masadan ekrana büyüyen lezzet": "Γεύσεις που μεγαλώνουν από το τραπέζι στην οθόνη",
  "Kafe, restoran ve pastane işletmeleri için QR dijital menüler, rezervasyon formları ve Instagram entegrasyonlu şık siteler.":
    "Ψηφιακά μενού QR, φόρμες κρατήσεων και κομψές ιστοσελίδες με ενσωμάτωση Instagram για καφέ, εστιατόρια και ζαχαροπλαστεία.",
  "QR kod dijital menü": "Ψηφιακό μενού με QR κωδικό",
  "Online rezervasyon formu": "Φόρμα online κρατήσεων",
  "Instagram akış entegrasyonu": "Ενσωμάτωση ροής Instagram",
  "Google yorum yönetimi": "Διαχείριση κριτικών Google",
  "Menünüz telefon ekranında iştah açıcı görünmeli. QR kodla okutulan dijital menünüz fotoğraflarıyla birlikte açılır; rezervasyon formu boş masalarınızı hafta sonları doldurur. Instagram gönderilerinizi sitenizde otomatik yayınlıyor, Google yorumlarınızı öne çıkararak yeni müşteri kazanmanızı sağlıyoruz.":
    "Το μενού σας πρέπει να φαίνεται δελεαστικό στην οθόνη του κινητού. Το ψηφιακό μενού QR ανοίγει με τις φωτογραφίες του· η φόρμα κρατήσεων γεμίζει τα κενά τραπέζια τα σαββατοκύριακα. Δημοσιεύουμε αυτόματα τις αναρτήσεις σας στο Instagram στην ιστοσελίδα σας και αναδεικνύουμε τις κριτικές Google για να κερδίσετε νέους πελάτες.",
  "İnşaat & Emlak": "Κατασκευές & Ακίνητα",
  "Projeleriniz ekranda da sağlam": "Τα έργα σας στέκουν στέρεα και στην οθόνη",
  "İnşaat firmaları ve emlak ofisleri için proje vitrin siteleri, portföy yönetimi ve satış/talep formları.":
    "Ιστοσελίδες προβολής έργων, διαχείριση χαρτοφυλακίου και φόρμες πωλήσεων/αιτημάτων για κατασκευαστικές εταιρείες και γραφεία ακινήτων.",
  "Proje vitrin sitesi": "Ιστοσελίδα προβολής έργων",
  "Portföy ve plan galerisi": "Γκαλερί χαρτοφυλακίου και σχεδίων",
  "Arza / satış talep formları": "Φόρμες προσφορών / πωλήσεων",
  "Sanal tur ve görsel sunum": "Εικονική περιήγηση και οπτική παρουσίαση",
  "Konut ve ticari projelerinizi alıcıya 7/24 sunan bir vitrin kuruyoruz; kat planları, görseller ve fiyat listeleri panelden güncellenir. Gelen her arza talebi panelinize düşer, emlak ofisleriniz için portföy araması ve filtreleme kolayca yönetilir.":
    "Δημιουργούμε βιτρίνα που παρουσιάζει τα οικιστικά και εμπορικά σας έργα στους αγοραστές 24/7· τα σχέδια, τα οπτικά και οι τιμοκατάλογοι ενημερώνονται από το πάνελ. Κάθε αίτημα προσφοράς καταλήγει στο πάνελ σας, ενώ τα γραφεία ακινήτων αποκτούν εύκολη αναζήτηση και φιλτράρισμα χαρτοφυλακίου.",
  "Sağlık & Güzellik": "Υγεία & Ομορφιά",
  "Güven veren dijital kimlik": "Ψηφιακή ταυτότητα που εμπνέει εμπιστοσύνη",
  "Poliklinik, diş kliniği, güzellik merkezi ve spor salonları için KVKK uyumlu randevu sistemleri ve kurumsal siteler.":
    "Συστήματα ραντεβού συμβατά με KVKK και εταιρικές ιστοσελίδες για ιατρεία, οδοντιατρεία, κέντρα αισθητικής και γυμναστήρια.",
  "Online randevu sistemi": "Σύστημα online ραντεβού",
  "Hizmet ve uzmanlık sayfaları": "Σελίδες υπηρεσιών και ειδικοτήτων",
  "KVKK uyumlu formlar": "Φόρμες συμβατές με KVKK",
  "Hasta / üye yorumları": "Κριτικές ασθενών / μελών",
  "Sağlıkta güven her şeydir; siteniz de bunu yansıtmalı. Uzmanlık alanlarınızı ve hizmetlerinizi anlatan kurumsal sayfalar, KVKK uyumlu randevu formları ve yorumlarınızla bölgenizin ilk tercihi olmanızı sağlıyoruz.":
    "Στην υγεία η εμπιστοσύνη είναι τα πάντα — και η ιστοσελίδα σας πρέπει να το αντικατοπτρίζει. Με εταιρικές σελίδες που περιγράφουν τις ειδικότητες και τις υπηρεσίες σας, φόρμες ραντεβού συμβατές με KVKK και τις κριτικές σας, σας κάνουμε την πρώτη επιλογή της περιοχής.",
  "Eğitim & Kurs": "Εκπαίδευση & Μαθήματα",
  "Kayıt akışı kesintisiz": "Αδιάκοπη ροή εγγραφής",
  "Özel kurslar, akademiler ve eğitim kurumları için program tanıtımı, online kayıt ve veli duyuru sistemleri.":
    "Παρουσίαση προγραμμάτων, online εγγραφές και συστήματα ανακοινώσεων γονέων για ιδιωτικά φροντιστήρια, ακαδημίες και εκπαιδευτικά ιδρύματα.",
  "Online kurs kayıt formu": "Φόρμα online εγγραφής μαθημάτων",
  "Eğitim takvimi ve programlar": "Εκπαιδευτικό ημερολόγιο και προγράμματα",
  "Ödeme bilgisi ve POS entegrasyonu": "Πληροφορίες πληρωμών και ενσωμάτωση POS",
  "Veli / öğrenci duyuru alanı": "Χώρος ανακοινώσεων γονέων / μαθητών",
  "Kayıt döneminde veliler sizi telefonundan arıyor. Programlarınızı, eğitmenlerinizi ve ücretleri net gösteren bir site kuruyor, online kayıt formuyla kontenjanlarınızı hızla dolduruyoruz; duyurularınız tek tıkla tüm velilere ulaşır.":
    "Στην περίοδο των εγγραφών οι γονείς σας ψάχνουν από το κινητό τους. Δημιουργούμε ιστοσελίδα που δείχνει καθαρά τα προγράμματά σας, τους εκπαιδευτές και τις αμοιβές, γεμίζουμε γρήγορα τις θέσεις με online φόρμα εγγραφής και στέλνουμε τις ανακοινώσεις σας σε κάθε γονέα με ένα κλικ.",
  "Otomotiv & Servis": "Αυτοκίνητα & Service",
  "Galeriden servise tek adres": "Μία διεύθυνση από τη γκαλερί στο service",
  "Oto galeriler, yedek parça ve servis işletmeleri için araç galerileri, ekspertiz randevuları ve servis takibi.":
    "Γκαλερί οχημάτων, ραντεβού εμπειρογνωμοσύνης και παρακολούθηση service για αντιπροσωπείες, καταστήματα ανταλλακτικών και επιχειρήσεις service.",
  "İkinci el araç galerisi": "Γκαλερί μεταχειρισμένων οχημάτων",
  "Ekspertiz & servis randevusu": "Ραντεβού εμπειρογνωμοσύνης & service",
  "Fiyat listesi yayını": "Δημοσίευση τιμοκαταλόγου",
  "WhatsApp ile hızlı iletişim": "Γρήγορη επικοινωνία μέσω WhatsApp",
  "Araçlarınızı fotoğrafı ve detayıyla yayınlayan bir galeri kuruyor, potansiyel alıcıyı WhatsApp'ta size bağlıyoruz. Servis ve ekspertiz işletmeleri için randevu formu ile birlikte yoğunluğunuzu planlamanızı sağlayan takip sistemi sunuyoruz.":
    "Δημιουργούμε γκαλερί που δημοσιεύει τα οχήματά σας με φωτογραφίες και λεπτομέρειες και συνδέουμε τους υποψήφιους αγοραστές μαζί σας στο WhatsApp. Για τις επιχειρήσεις service παρέχουμε φόρμα ραντεβού και σύστημα παρακολούθησης που σας βοηθά να σχεδιάζετε το φόρτο εργασίας σας.",

  // Footer
  "İletişime geçin": "Ελάτε σε επαφή",
  "Trakya'nın dijital mimarısıyla tanışın.": "Γνωρίστε τον ψηφιακό αρχιτέκτονα της Θράκης.",
  "Sohbet başlat": "Ξεκινήστε συνομιλία",
  "Ücretsiz SEO denetimi alın": "Λάβετε δωρεάν SEO audit",
  "Sitenizi 24 saat içinde analiz edip raporlayalım.": "Ας αναλύσουμε την ιστοσελίδα σας και να σας παραδώσουμε αναφορά εντός 24 ωρών.",
  "Denetim isteyin": "Ζητήστε audit",
  "DijiTrak ile ortak olun": "Συνεργαστείτε με την DijiTrak",
  "Toprağınızı dijitalleştiren ekiple büyümeye başlayın.": "Ξεκινήστε να αναπτύσσεστε με την ομάδα που ψηφιοποιεί το χώμα σας.",
  "Projenizi anlatın": "Πείτε μας για το έργο σας",
  "Form doldur": "Συμπληρώστε τη φόρμα",
  "KEŞFET": "ΕΞΕΡΕΥΝΗΣΤΕ",
  "Sektörel Çözümler": "Κλαδικές Λύσεις",
  "İşletme Rehberi": "Κατάλογος Επιχειρήσεων",
  "Blog & Rehberler": "Blog & Οδηγοί",
  "İLETİŞİM": "ΕΠΙΚΟΙΝΩΝΙΑ",
  "Web Tasarımı": "Σχεδιασμός Ιστοσελίδων",
  "Bakım & Destek": "Συντήρηση & Υποστήριξη",
  "Tekirdağ, Edirne ve Kırklareli işletmeleri için web tasarımı, e-ticaret ve SEO.":
    "Σχεδιασμός ιστοσελίδων, e-commerce και SEO για επιχειρήσεις στο Τεκιρντάγκ, την Αδριανούπολη και το Κιρκλάρελι.",
  "© 2026 DijiTrak Ajans. Tüm hakları saklıdır.": "© 2026 DijiTrak Ajans. Με επιφύλαξη παντός δικαιώματος.",

  // LeadForm
  "Ad Soyad *": "Ονοματεπώνυμο *",
  "E-posta *": "Email *",
  "Telefon": "Τηλέφωνο",
  "Firma Adı": "Όνομα εταιρείας",
  "Sektörünüz": "Ο κλάδος σας",
  "İlgilendiğiniz Hizmet": "Υπηρεσία που σας ενδιαφέρει",
  "Sektör seçin": "Επιλέξτε κλάδο",
  "Hizmet seçin": "Επιλέξτε υπηρεσία",
  "Projenizden bahsedin *": "Πείτε μας για το έργο σας *",
  "Hangi hizmete ihtiyacınız var? Hedefleriniz neler?": "Ποια υπηρεσία χρειάζεστε; Ποιοι είναι οι στόχοι σας;",
  "Ad, e-posta ve mesaj alanları zorunludur.": "Όνομα, email και μήνυμα είναι υποχρεωτικά.",
  "Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.": "Παρουσιάστηκε πρόβλημα κατά την αποθήκευση του αιτήματός σας. Παρακαλούμε δοκιμάστε ξανά.",
  "Talebiniz alındı!": "Το αίτημά σας ελήφθη!",
  "Ekibimiz 1 iş günü içinde size dönüş yapacak. Acil durumlar için AI asistanımız 7/24 yanınızda.":
    "Η ομάδα μας θα επικοινωνήσει μαζί σας εντός 1 εργάσιμης ημέρας. Για επείγοντα, ο AI βοηθός μας είναι δίπλα σας 24/7.",
  "Gönderiliyor…": "Αποστολή…",
  "Talebi Gönder": "Αποστολή Αιτήματος",
  "Yerel Ticaret": "Τοπικό Εμπόριο",
  "İletişim Formu": "Φόρμα Επικοινωνίας",

  // Contact
  "Projenizi konuşalım": "Ας μιλήσουμε για το έργο σας",
  "Formu doldurun, 1 iş günü içinde size dönüş yapalım. Ya da AI asistanımızla hemen konuşun.":
    "Συμπληρώστε τη φόρμα και θα σας απαντήσουμε εντός 1 εργάσιμης ημέρας. Ή μιλήστε αμέσως με τον AI βοηθό μας.",
  "Teklif / bilgi talebi": "Αίτημα προσφοράς / πληροφοριών",
  "Ofis": "Γραφείο",
  "E-posta": "Email",
  "Çalışma saatleri": "Ώρες λειτουργίας",
  "Hafta içi 09:00 – 18:00": "Καθημερινά 09:00 – 18:00",
  "AI asistan": "AI βοηθός",
  "7/24 aktif — anında yanıt": "ενεργό 24/7 — άμεσες απαντήσεις",

  // Isletmeler
  "İŞLETME REHBERİ": "ΚΑΤΑΛΟΓΟΣ ΕΠΙΧΕΙΡΗΣΕΩΝ",
  "Trakya'nın işletme haritası": "Ο χάρτης επιχειρήσεων της Θράκης",
  "Şirketler, dükkanlar, atölyeler, kafeler… Bölgedeki dijitalleşen işletmeleri tek rehberde topluyoruz. Aradığınızı bulun, ilham alın.":
    "Εταιρείες, καταστήματα, εργαστήρια, καφέ… Μαζεύουμε τις ψηφιοποιούμενες επιχειρήσεις της περιοχής σε έναν κατάλογο. Βρείτε αυτό που ψάχνετε, πάρετε ιδέες.",
  "İşletme, sektör veya ilçe ara…": "Αναζήτηση επιχείρησης, κλάδου ή περιοχής…",
  "Tüm İller": "Όλες οι επαρχίες",
  "Tüm Sektörler": "Όλοι οι κλάδοι",
  "İl": "Επαρχία",
  "Sektör": "Κλάδος",
  "YÜKLENİYOR…": "ΦΟΡΤΩΝΕΙ…",
  "İŞLETME": "ΕΠΙΧΕΙΡΗΣΕΙΣ",
  "Sonuç bulunamadı": "Δεν βρέθηκαν αποτελέσματα",
  "Aramanızla eşleşen işletme yok. Filtreleri değiştirmeyi deneyin.": "Καμία επιχείρηση δεν ταιριάζει με την αναζήτησή σας. Δοκιμάστε να αλλάξετε τα φίλτρα.",
  "İşletmeniz bu listede yok mu?": "Δεν βρίσκεστε σε αυτή τη λίστα;",
  "Trakya'daki tüm şirketler, dükkanlar ve atölyeler için rehberimiz açık. İşletmenizi ekletmek ve dijital varlığınızı güçlendirmek için bize ulaşın.":
    "Ο κατάλογός μας είναι ανοιχτός για όλες τις εταιρείες, τα καταστήματα και τα εργαστήρια της Θράκης. Επικοινωνήστε μαζί μας για να προστεθείτε και να ενισχύσετε την ψηφιακή σας παρουσία.",
  "AI Asistanla Başvur": "Αίτημα μέσω AI βοηθού",

  // CasePreview / CaseStudies
  "BAŞARI ARŞİVİ": "ΑΡΧΕΙΟ ΕΠΙΤΥΧΙΩΝ",
  "Verilerle yazılmış hikâyeler": "Ιστορίες γραμμένες με δεδομένα",
  "Tüm izlerimiz": "Όλα τα έργα",
  "İz bıraktıklarımız yakında yayında.": "Το έργο μας έρχεται σύντομα.",
  "TARIM": "ΓΕΩΡΓΙΑ",
  "SANAYİ": "ΒΙΟΜΗΧΑΝΙΑ",
  "E-TİCARET": "E-COMMERCE",
  "YEREL TİCARET": "ΤΟΠΙΚΟ ΕΜΠΟΡΙΟ",
  "İz Bıraktıklarımıza dön": "Επιστροφή στα έργα",
  "Trakya'daki işletmelerin dijitalleşme yolculuğu, before/after metrikleriyle.":
    "Το ταξίδι ψηφιοποίησης των επιχειρήσεων της Θράκης, με μετρικές πριν/μετά.",
  "İncele": "Δείτε περισσότερα",
  "Kapat": "Κλείσιμο",
  "ZORLUK": "ΠΡΟΚΛΗΣΗ",
  "ÇÖZÜM": "ΛΥΣΗ",

  // BlogPreview / Blog
  "Trakya işletmesi rehberleri": "Οδηγοί για τις επιχειρήσεις της Θράκης",
  "Tüm yazılar": "Όλα τα άρθρα",
  "Rehberler yakında yayında.": "Οι οδηγοί έρχονται σύντομα.",
  "dk": "λεπ",
  "Dijitalleşme rehberi": "Οδηγός ψηφιοποίησης",
  "Web sitesi fiyatlarından SEO ipuçlarına, Trakya işletmeleri için hazırlanmış sektörel içerikler.":
    "Κλαδικό περιεχόμενο για τις επιχειρήσεις της Θράκης — από τις τιμές ιστοσελίδων έως τις συμβουλές SEO.",
  "Tümü": "Όλα",
  "Bu kategoride henüz yazı yok.": "Δεν υπάρχουν ακόμη άρθρα σε αυτή την κατηγορία.",
  "dk okuma": "λεπ ανάγνωση",

  // AI chat
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Γεια σας! Είμαι ο AI βοηθός της DijiTrak. Ρωτήστε με τα πάντα για τιμές, διαδικασίες και κλαδικές λύσεις.",
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç, SEO, e-ticaret ve sektör çözümleri hakkında her şeyi sorabilirsiniz.":
    "Γεια σας! Είμαι ο AI βοηθός της DijiTrak. Ρωτήστε με τα πάντα για τιμές, διαδικασία, SEO, e-commerce και κλαδικές λύσεις.",
  "Fiyat teklifi al": "Ζητήστε τιμή",
  "Web sitesi için fiyat teklifi almak istiyorum.": "Θα ήθελα να λάβω προσφορά τιμής για ιστοσελίδα.",
  "Ücretsiz SEO denetimi": "Δωρεάν SEO audit",
  "Sitem için ücretsiz SEO denetimi istiyorum.": "Θα ήθελα ένα δωρεάν SEO audit για την ιστοσελίδα μου.",
  "Randevu oluştur": "Κλείστε ραντεβού",
  "Ücretsiz keşif görüşmesi için randevu almak istiyorum.": "Θα ήθελα να κλείσω ραντεβού για μια δωρεάν κλήση γνωριμίας.",
  "Tarım işletmesiyim": "Έχω αγροτική επιχείρηση",
  "Tarım işletmesiyim, bana özel çözümleriniz neler?": "Έχω αγροτική επιχείρηση. Ποιες λύσεις προσφέρετε για μένα;",
  "Esnaf işletmesiyim": "Έχω τοπικό μαγαζί",
  "Esnaf işletmesiyim, bana özel çözümleriniz neler?": "Έχω τοπικό μαγαζί. Ποιες λύσεις προσφέρετε για μένα;",
  "Web sitesi ne kadar sürede teslim edilir?": "Σε πόσο χρόνο παραδίδεται μια ιστοσελίδα;",
  "SEO çalışmaları neyi kapsıyor?": "Τι καλύπτει η εργασία SEO;",
  "E-ticaret paketi neler içeriyor?": "Τι περιλαμβάνει το πακέτο e-commerce;",
  "Bakım ve destek hizmeti nasıl işliyor?": "Πώς λειτουργεί η υπηρεσία συντήρησης και υποστήριξης;",
  "Google Haritalar optimizasyonu yapıyor musunuz?": "Κάνετε βελτιστοποίηση Google Maps;",
  "Komut Merkezi": "Κέντρο Ελέγχου",
  "ASİSTAN AKTİF — 7/24 Türkçe yanıt": "ΒΟΗΘΟΣ ONLINE — 24/7",
  "Sohbeti Sıfırla": "Επαναφορά Συνομιλίας",
  "Mesajınızı yazın…": "Γράψτε το μήνυμά σας…",
  "Gönder": "Αποστολή",
  "Üzgünüm, şu an yanıt alamadım. Lütfen tekrar deneyin.": "Λυπάμαι, δεν ήταν δυνατή η λήψη απάντησης αυτή τη στιγμή. Παρακαλούμε δοκιμάστε ξανά.",
  "Bağlantıda bir sorun oluştu. Lütfen tekrar dener misiniz?": "Παρουσιάστηκε πρόβλημα σύνδεσης. Μπορείτε να δοκιμάσετε ξανά;",
  "SIK SORULANLAR": "ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ",
  "TEKLİF AL": "ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi.":
    "Το αίτημά σας διαβιβάζεται στην ομάδα μας — εγγυημένη απάντηση εντός 1 εργάσιμης ημέρας.",
  "Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi. Dilerseniz ":
    "Το αίτημά σας διαβιβάζεται στην ομάδα μας — εγγυημένη απάντηση εντός 1 εργάσιμης ημέρας. Μπορείτε επίσης να χρησιμοποιήσετε ",
  "iletişim sayfasını": "τη σελίδα επικοινωνίας",
  " da kullanabilirsiniz.": ", αν προτιμάτε.",
  "CANLI SOHBET": "ΖΩΝΤΑΝΗ ΣΥΝΟΜΙΛΙΑ",
  "AI ASİSTAN AKTİF · 7/24": "AI ΒΟΗΘΟΣ ONLINE · 24/7",
  "SOHBET": "ΣΥΝΟΜΙΛΙΑ",
  "Canlı sohbet aç": "Άνοιγμα ζωντανής συνομιλίας",
};

const DICT = { en: EN, bg: BG, el: EL };
export const LANGS = ["tr", "en", "bg", "el"];

const LanguageContext = createContext({ lang: "tr", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("trakya-lang");
      return LANGS.includes(saved) ? saved : "tr";
    } catch {
      return "tr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("trakya-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l) => setLangState(LANGS.includes(l) ? l : "tr");

  const t = (key) => {
    if (lang === "tr" || !DICT[lang]) return key;
    const dict = DICT[lang];
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}