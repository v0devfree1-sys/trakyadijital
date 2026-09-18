import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { generateText } from 'npm:ai@7.0.16';
import { createOpenAICompatible } from 'npm:@ai-sdk/openai-compatible@3.0.5';
import { secrets, waitUntil } from 'base44:runtime';
import { notifyLeadCreated, confirmLeadToCustomer } from '../../shared/leadNotifier.ts';

const SYSTEM_PROMPT = `Sen "DijiTrak" adlı Trakya bölgesi dijital ajansının yapay zeka asistanısın. Samimi ama profesyonel yanıt ver; müşteriye "siz" diye hitap et.

AJANS BİLGİLERİ:
- Hizmet bölgesi: Trakya — Tekirdağ (Çorlu, Süleymanpaşa, Malkara), Edirne (Keşan, İpsala, Meriç), Kırklareli (Lüleburgaz, Babaeski). Bu illerde yerinde keşif ücretsizdir; Türkiye'nin tamamına online hizmet verilir.
- Hizmetler: kurumsal web tasarımı, e-ticaret sitesi kurulumu, SEO & yerel arama optimizasyonu, Google Haritalar optimizasyonu, mevcut sitelerin mobil uyumlaması, yıllık bakım & 7/24 Türkçe teknik destek.

PAKETLER (tek seferlik):
- **Başlangıç — 4.900 TL**: kurumsal tanıtım sitesi; 5 sayfaya kadar tasarım, mobil uyum, SSL + alan adı, iletişim formları, 1 yıl hosting hediye.
- **Kurumsal — 9.900 TL** (en çok tercih edilen): sınırsız sayfa + blog, SEO altyapısı ve Google kaydı, çoklu dil desteği, AI asistan entegrasyonu, öncelikli destek.
- **E-Ticaret — 14.900 TL**: sanal POS + kargo entegrasyonu, pazaryeri bağlantıları, stok yönetimi, ürün fotoğraf düzenleme, satış eğitim desteği.
- **Yıllık bakım — 1.900 TL'den başlar**: yedekleme, güvenlik güncellemeleri, küçük değişiklikler, 7/24 destek.
- Taksit imkânı: Kurumsal ve E-Ticaret paketleri 3 eşit taksitle alınabilir.

SÜREÇ (4 adım): keşif (1-2 gün) → tasarım (5-7 gün) → geliştirme (5-7 gün) → büyüme (sürekli). Ortalama yayına alma süresi 14 iş günüdür.
ÜCRETSİZLER: SEO denetimi, keşif görüşmesi, fiyat teklifi.

SEKTÖREL UZMANLIK: tarım & gıda (ürün kataloğu, B2B sipariş, hasat takibi), sanayi & imalat (B2B katalog, RFQ formu, CAD dosya paylaşımı), e-ticaret (ödeme, kargo, pazaryeri entegrasyonları), yerel ticaret & esnaf (Google Haritalar optimizasyonu, yerel SEO, QR dijital menü/rezervasyon, WhatsApp sipariş hattı).

İLETİŞİM: WhatsApp +90 282 123 45 67 (7/24), e-posta merhaba@dijitrak.net, ofis Çorlu/Tekirdağ. Site TR/EN/BG/EL olmak üzere 4 dil destekler.

RANDEVU: Ücretsiz 30 dakikalık keşif görüşmesi sitedeki "Randevu Al" sayfasından (/randevu) alınır: 12 günlük takvimden gün ve saat seçilir (hafta içi 09:30-17:30 saatleri, Pazar kapalı). Trakya'da yerinde, Türkiye genelinde online yapılır; randevuyu ekibimiz 1 iş günü içinde onaylar. Randevu/keşif görüşmesi planlamak isteyen müşteriye bu sayfayı öner. Randevu oluşturma yetkin yok — randevu YALNIZCA müşteri /randevu sayfasından kendi oluşturur.

GENEL KURALLAR:
1. Yanıtlar kısa olsun: en fazla 4-5 cümle ya da kısa madde listesi. Fiyat ve rakamları **kalın** yaz.
2. Sohbet geçmişini kullan; müşterinin daha önce verdiği bilgileri (sektör, hizmet, şehir, firma, site adresi) tekrar sorma, yanıtına yansıt.
3. Fiyat/teklif soran müşteriye net paket bilgisini ver ve "Teklif Al" formunu öner (1 iş günü içinde dönüş garantisi). Bütçesi küçükse Başlangıç paketini, büyüme hedefi varsa Kurumsal paketi öner.
4. Konu ajansla tamamen ilgisizse kibarca hizmetlere yönlendir; siyaset, sağlık, hukuki/mali tavsiye gibi konularda yanıt verme.
5. Asla uydurma teknik bilgi, sahte referans veya garanti ("kesin ilk sayfa" gibi) verme; emin olmadığında ekibin doğrulayacağını söyle.
6. Yanıtı sade markdown ile biçimlendir: kısa madde listeleri ve **kalın** vurgular kullan, tablo kullanma.
7. Satış odaklı ama baskıcı olma: her yanıtta bir sonraki net adımı öner (teklif, randevu veya SEO denetimi).

VERİ KURALLARI — ÖNEMLİ:
1. İşletme, vaka analizi veya blog önerirken YALNIZCA bu yanıtta sana verilen "BİLGİ TABANI" bölümündeki gerçek kayıtları kullan. Listede olmayan işletme/müşteri/yazı adı ASLA uydurma; listede uygun olan yoksa "şu an rehberimizde bu konuda kayıt yok, ama sizin için benzer çalışmalarımız var" de ve hizmete yönlendir.
2. "SEO DENETİM BULGULARI" bölümü verilmişse, müşterinin sitesi hakkında YALNIZCA bu gerçek bulguları ve SEO puanını kullan; kendi puanını uydurma. Bulgu yoksa site hakkında yorum yapma. Bulguları en kritikten başlayarak anlat ve her bulgu için çözüm öner.
3. "RANDEVU DURUMU" bölümü verilmişse müsaitlik soran müşteriye YALNIZCA bu gerçek müsait saatleri söyle; bu listenin dışında gün/saat teklif etme, "randevunuzu oluşturdum" gibi bir şey söyleme.
4. Talep kaydı için "talebinizi kaydettim" GİBİ BİR ŞEY SÖYLEME — kaydı sistem otomatik yapar ve müşteriye ayrıca onay notu eklenir. Sen yalnızca müşterinin verdiği ad-soyad, e-posta, telefon, firma, sektör ve hizmet bilgisini JSON'daki "lead" alanına eksiksiz yaz (bilinmeyen alanları boş dize bırak, hiçbirini uydurma).
5. Müşteri teklif, fiyat, randevu veya geri dönüş istiyorsa "quote_intent" true yap ve "lead" alanını doldur; ad-soyad veya e-posta eksikse müşteriden bu iki bilgiyi kibarca iste (telefon da istenebilir ama zorunlu değildir).`;

// Basit hız sınırı: IP başına 10 dakikada en fazla RATE_LIMIT mesaj (bellek içi, en iyi çaba)
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateHits = new Map<string, number[]>();

const SAVE_CONFIRMATIONS: Record<string, string> = {
  tr: '\n\n✅ Talebiniz sisteme kaydedildi — ekibimiz **1 iş günü** içinde size dönecek.',
  en: '\n\n✅ Your request has been saved — our team will get back to you within **1 business day**.',
  bg: '\n\n✅ Вашата заявка е записана — екипът ни ще се свърже с вас в рамките на **1 работен ден**.',
  el: '\n\n✅ Το αίτημά σας καταχωρήθηκε — η ομάδα μας θα επικοινωνήσει μαζί σας εντός **1 εργάσιμης ημέρας**.',
};

// Randevu sayfasındaki saat aralıklarıyla birebir aynı
const TIME_SLOTS = ['09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30', '17:30'];

function extractJson(text: string): any {
  const raw = String(text || '').trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch {}
  }
  try {
    return JSON.parse(raw);
  } catch {}
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch {}
  }
  return null;
}

// Mesajdan web sitesi adresi çıkarır (varsa gerçek bir SEO denetimi çalıştırılır)
function extractUrl(message: string): string | null {
  const m = message.match(/(https?:\/\/[^\s,.;]+|(?:[a-z0-9-]+\.)+(?:com|net|org|com\.tr|tr|bg|gr|eu|shop|store)(?:\/[^\s,.;]*)?)/i);
  if (!m) return null;
  const raw = m[0].replace(/[).,;:]+$/, '');
  if (raw.length < 5) return null;
  return raw.startsWith('http') ? raw : `https://${raw}`;
}

// İstanbul (TR) saat dilimine göre YYYY-MM-DD üretir
function istanbulDate(offsetDays = 0): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const d = new Date(Date.now() + offsetDays * 86400000);
  return fmt.format(d);
}

function istanbulWeekday(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

const DAY_NAMES_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

// Önümüzdeki N açık iş günü (Pazar hariç) için gerçek müsait saatleri hesaplar
async function buildAvailability(base44: any, dayCount = 5): Promise<string> {
  const dates: string[] = [];
  for (let i = 0; i < 14 && dates.length < dayCount; i++) {
    const d = istanbulDate(i);
    if (istanbulWeekday(d) !== 0) dates.push(d);
  }
  if (dates.length === 0) return '';
  const rows: any[][] = await Promise.all(
    dates.map((d) => base44.asServiceRole.entities.Appointment.filter({ date: d }))
  );
  const lines = dates.map((d, idx) => {
    const appts: any[] = Array.isArray(rows[idx]) ? rows[idx] : [];
    const taken = new Set(
      appts.filter((a) => a.status !== 'iptal' && a.time).map((a) => String(a.time))
    );
    const free = TIME_SLOTS.filter((s) => !taken.has(s));
    const weekday = istanbulWeekday(d);
    return `- ${d} (${DAY_NAMES_TR[weekday]}): ${
      free.length ? `müsait: ${free.join(', ')}` : 'bugü dolu — başka gün önerin'
    }${taken.size ? ` | dolu: ${[...taken].join(', ')}` : ''}`;
  });
  return `RANDEVU DURUMU (gerçek doluluk verisi — yalnızca bunları kullan, dışında gün/saat uydurma):\n${lines.join('\n')}`;
}

async function auditWebsite(url: string): Promise<any> {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    const t0 = Date.now();
    const res = await fetch(u.toString(), {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DijiTrakBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    const response_ms = Date.now() - t0;
    const html = (await res.text()).slice(0, 200000);
    const pick = (re: RegExp) => {
      const m = html.match(re);
      return m ? m[1].trim().slice(0, 160) : '';
    };
    const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDesc =
      pick(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
    const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
    const hasOgImage = /<meta[^>]+property=["']og:image["']/i.test(html);
    const htmlLang = pick(/<html[^>]+lang=["']([^"']+)["']/i);
    const hasFavicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(html);
    const imgCount = (html.match(/<img[\s>]/gi) || []).length;
    const imgsWithAlt = (html.match(/<img[^>]+alt=/gi) || []).length;
    const lazyImgs = (html.match(/loading=["']lazy["']/gi) || []).length;
    const textOnly = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const findings: string[] = [];
    if (!title) findings.push('Sayfa başlığı (title) eksik');
    else if (title.length < 30 || title.length > 60) findings.push(`Sayfa başlığı ideal uzunlukta değil (${title.length} karakter, 30-60 önerilir)`);
    if (!metaDesc) findings.push('Meta açıklama eksik');
    if (h1Count !== 1) findings.push(`H1 etiketi ${h1Count} adet (tam 1 olmalı)`);
    if (!hasViewport) findings.push('Mobil uyum için viewport etiketi eksik');
    if (imgCount > 0 && imgsWithAlt < imgCount) findings.push(`${imgCount - imgsWithAlt} görselde alt metni eksik`);
    if (imgCount > 3 && lazyImgs === 0) findings.push('Görsellerde lazy-loading yok (sayfa hızı yavaşlar)');
    if (wordCount < 150) findings.push('Sayfa içeriği çok kısa (SEO için en az 300 kelime önerilir)');
    if (u.protocol !== 'https:') findings.push('SSL sertifikası yok (https kullanılmıyor)');
    if (!hasCanonical) findings.push('Canonical etiketi eksik (tekrar içerik riski)');
    if (!hasOgTitle || !hasOgImage) findings.push('Sosyal paylaşım etiketleri (Open Graph) eksik');
    if (!htmlLang) findings.push('HTML dil özniteliği (lang) eksik');
    if (!hasFavicon) findings.push('Favicon tanımı yok');
    if (response_ms > 1500) findings.push(`Sunucu yanıtı yavaş (${(response_ms / 1000).toFixed(1)} sn)`);
    return {
      url: u.toString(),
      ssl: u.protocol === 'https:',
      status: res.status,
      response_ms,
      title,
      meta_description: metaDesc,
      h1_count: h1Count,
      h2_count: h2Count,
      mobile_friendly: hasViewport,
      word_count: wordCount,
      findings,
      seo_score: Math.max(0, 100 - findings.length * 10),
    };
  } catch {
    return null;
  }
}

export default async function(req: Request): Promise<Response> {
  try {
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'anon';
    const now = Date.now();
    const recent = (rateHits.get(ip) || []).filter((ts: number) => now - ts < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      return Response.json({ error: 'RATE_LIMITED' }, { status: 429 });
    }
    recent.push(now);
    rateHits.set(ip, recent);
    if (rateHits.size > 5000) {
      for (const [key, stamps] of rateHits) {
        if (stamps.every((ts: number) => now - ts >= RATE_WINDOW_MS)) rateHits.delete(key);
      }
    }

    const body = await req.json().catch(() => ({}));
    const message = typeof body.message === 'string' ? body.message.slice(0, 2000) : '';
    const ALLOWED = ['tr', 'en', 'bg', 'el'];
    const LANG_LABELS: Record<string, string> = {
      en: 'English',
      bg: 'Bulgarian (Български)',
      el: 'Greek (Ελληνικά)',
    };
    const lang = ALLOWED.includes(body.lang) ? body.lang : 'tr';
    if (!message.trim()) {
      return Response.json({ error: 'Mesaj gerekli' }, { status: 400 });
    }
    const history = Array.isArray(body.history)
      ? body.history.slice(-8).map((h) => ({
          role: h && h.role === 'user' ? 'Müşteri' : 'Asistan',
          content: String((h && h.text) || '').slice(0, 800)
        }))
      : [];

    const base44 = createClientFromRequest(req);

    // 1) GERÇEK VERİLERİ TOPLA — modelin uydurmaması için bilgi tabanı olarak verilir
    const [businesses, cases, posts, availability] = await Promise.all([
      base44.asServiceRole.entities.Business.filter({ published: true }, '-updated_date', 30),
      base44.asServiceRole.entities.CaseStudy.filter({ published: true }, '-updated_date', 8),
      base44.asServiceRole.entities.BlogPost.filter({ published: true }, '-updated_date', 8),
      buildAvailability(base44, 5).catch(() => ''),
    ]);
    const bizRows: any[] = Array.isArray(businesses) ? businesses : [];
    const caseRows: any[] = Array.isArray(cases) ? cases : [];
    const postRows: any[] = Array.isArray(posts) ? posts : [];

    const kbBusinesses = bizRows
      .map((b) => `- ${b.name} (${b.city}${b.district ? '/' + b.district : ''}, ${b.sector || 'sektör yok'}): ${String(b.description || '').slice(0, 90)}`)
      .join('\n');
    const kbCases = caseRows
      .map((c) => {
        const results = Array.isArray(c.results)
          ? c.results.slice(0, 2).map((r: any) => `${r.label}: ${r.value}`).join(', ')
          : '';
        return `- ${c.client_name} (${c.city || 'şehir yok'}, ${c.sector || 'sektör yok'}): ${String(c.summary || '').slice(0, 120)}${results ? ` | Sonuçlar: ${results}` : ''}`;
      })
      .join('\n');
    const kbPosts = postRows
      .map((p) => `- ${p.title} (${p.category || 'genel'}, ${p.read_minutes || 5} dk): ${String(p.excerpt || '').slice(0, 90)}`)
      .join('\n');

    // 2) SEO DENETİMİ — mesajda site adresi varsa gerçek analiz yapılır
    const url = extractUrl(message);
    const audit = url ? await auditWebsite(url) : null;
    const auditNote = audit
      ? `\nSEO DENETİM BULGULARI (${audit.url} — GERÇEK ANALİZ SONUÇLARI, yalnızca bunları kullan):
SSL: ${audit.ssl ? 'var' : 'yok'} | Mobil viewport: ${audit.mobile_friendly ? 'var' : 'eksik'} | H1: ${audit.h1_count} | H2: ${audit.h2_count} | Kelime sayısı: ${audit.word_count} | Yanıt süresi: ${(audit.response_ms / 1000).toFixed(1)} sn | SEO puanı: ${audit.seo_score}/100
Başlık: ${audit.title || '(eksik)'}
Meta açıklama: ${audit.meta_description || '(eksik)'}
Bulgular: ${audit.findings.length ? audit.findings.join('; ') : 'kayıt yok — site temel açıdan sağlıklı'}\n`
      : '';

    const transcript = history.map((h) => `${h.role}: ${h.content}`).join('\n');
    const langNote =
      lang !== 'tr'
        ? `\n\nThe customer selected ${LANG_LABELS[lang]}. IMPORTANT: Reply in ${LANG_LABELS[lang]}, and write the suggestions in the same language.`
        : '';
    const customerLabel = lang === 'tr' ? 'Müşteri' : 'Customer';

    // Kendi OpenAI anahtarı (Secrets panelinden) — varsa gpt-3.5-turbo kullanılır
    // ve platform kredisi tüketilmez; yoksa platform AI ağ geçidi devreye girer.
    const openAiKey = secrets.get('OPENAI_API_KEY');
    let chatModel: any;
    if (typeof openAiKey === 'string' && openAiKey.trim().length > 10) {
      chatModel = createOpenAICompatible({ name: 'openai', baseURL: 'https://api.openai.com/v1', apiKey: openAiKey.trim() })('gpt-4o-mini');
    } else {
      const { baseURL, token } = base44.asServiceRole.aiGateway.connection();
      chatModel = createOpenAICompatible({ name: 'base44', baseURL, apiKey: token })('gpt_5_mini');
    }

    const kbBlock = `BİLGİ TABANI (gerçek kayıtlar — yalnızca bunları kullan, uydurma):
İşletme rehberi:
${kbBusinesses || '(kayıt yok)'}
Vaka analizleri:
${kbCases || '(kayıt yok)'}
Blog yazıları:
${kbPosts || '(kayıt yok)'}
${availability ? `\n${availability}` : ''}`;

    const prompt = `${SYSTEM_PROMPT}${langNote}

${kbBlock}${auditNote}

${transcript ? `Sohbet geçmişi:
${transcript}

` : ''}${customerLabel}: ${message}

Görev: Yukarıdaki kurallara uyarak müşteriyi yanıtla. Son olarak YALNIZCA geçerli bir JSON nesnesi döndür, başka hiçbir metin yazma:
{
  "reply": "müşteriye gösterilecek yanıt (markdown, en fazla 4-5 cümle; fiyatlar **kalın**)",
  "suggestions": ["kısa takip sorusu 1", "kısa takip sorusu 2"],
  "quote_intent": true veya false,
  "booking_intent": true veya false,
  "lead": {
    "sector": "tarim|sanayi|eticaret|yerel-ticaret|diger",
    "service": "hizmet adı veya boş dize",
    "summary": "talebin 1-2 cümlelik özeti",
    "name": "biliniyorsa ad-soyad, yoksa boş dize",
    "email": "biliniyorsa e-posta, yoksa boş dize",
    "phone": "biliniyorsa telefon, yoksa boş dize",
    "company": "biliniyorsa firma, yoksa boş dize"
  }
}
- quote_intent: müşteri teklif, fiyat, randevu veya geri dönüş talep ediyorsa true.
- booking_intent: müşteri keşif/randevu görüşmesi planlamak istiyorsa true.
- lead: quote_intent true ise doldur; hiçbir alanı uydurma, "kaydettim" gibi bir ifade yazma.`;

    // 3) YANIT ÜRETİMİ — JSON bozuksa bir kez daha denenir (güvenilirlik)
    let { text } = await generateText({ model: chatModel, prompt });
    let parsed = extractJson(text);
    if (!parsed) {
      const retry = await generateText({
        model: chatModel,
        prompt: `${prompt}\n\nÖNEMLİ DÜZELTME: Önceki yanıtın geçerli JSON değildi. Bu kez YALNIZCA geçerli bir JSON nesnesi döndür — açıklama, yorum veya kod bloğu YOK, doğrudan {"reply": ...} ile başla.`,
      });
      text = retry.text;
      parsed = extractJson(text);
    }

    const reply = String(parsed?.reply || '').trim() || 'Şu an yanıt üretilemedi, lütfen tekrar deneyin.';
    const suggestions = Array.isArray(parsed?.suggestions)
      ? parsed.suggestions.filter((s: unknown) => typeof s === 'string' && s.trim()).slice(0, 3)
      : [];
    const quote_intent = parsed?.quote_intent === true;
    const booking_intent = parsed?.booking_intent === true;
    const lead = parsed?.lead && typeof parsed.lead === 'object' ? parsed.lead : null;

    // 4) TALEP KAYDI — sistem tarafından garanti edilir; modelin "kaydettim" iddiasına asla güvenilmez
    let finalReply = reply;
    let leadSaved = false;
    const name = String(lead?.name || '').trim();
    const email = String(lead?.email || '').trim();
    if (quote_intent && name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try {
        const existing = await base44.asServiceRole.entities.Lead.filter({ email }, '-created_date', 1);
        const existingRows: any[] = Array.isArray(existing) ? existing : [];
        if (existingRows.length === 0) {
          const createdLead = await base44.asServiceRole.entities.Lead.create({
            name,
            email,
            phone: String(lead?.phone || ''),
            company: String(lead?.company || ''),
            sector: String(lead?.sector || 'diger'),
            service: String(lead?.service || ''),
            message: String(lead?.summary || message).slice(0, 2000),
            source: 'ai_asistan',
          });
          waitUntil(
            Promise.all([
              Promise.resolve(notifyLeadCreated(base44, createdLead)),
              Promise.resolve(confirmLeadToCustomer(base44, createdLead)),
            ]).catch(() => {})
          );
        }
        leadSaved = true;
      } catch (e) {
        console.log('lead save error:', (e && (e as any).message) || String(e));
      }
    }
    if (leadSaved) {
      finalReply = `${reply}${SAVE_CONFIRMATIONS[lang] || SAVE_CONFIRMATIONS.tr}`;
    }

    return Response.json({
      reply: finalReply,
      suggestions,
      quote_intent,
      booking_intent,
      lead,
      lead_saved: leadSaved,
      seo: audit ? { url: audit.url, score: audit.seo_score, findings: audit.findings } : null,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}