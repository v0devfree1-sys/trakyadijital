import LegalPage from "@/components/legal/LegalPage";
import { usePageMeta } from "@/lib/usePageMeta";

const SECTIONS = [
  {
    heading: "1. Kapsam",
    paragraphs: [
      "Bu kullanım koşulları, dijitrak.net web sitesinin kullanımına ilişkindir. Siteye erişerek bu koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız siteyi kullanmamanız gerekir.",
    ],
  },
  {
    heading: "2. Hizmetler",
    paragraphs: [
      "DijiTrak; kurumsal web tasarımı, e-ticaret kurulumu, SEO ve yerel arama optimizasyonu, mobil uyumlama, bakım ve teknik destek hizmetleri sunar. Sitede yer alan hizmet açıklamaları ve paket içerikleri bilgilendirme amaçlıdır.",
    ],
  },
  {
    heading: "3. Fiyat ve Teklifler",
    paragraphs: [
      "Sitede veya AI asistan tarafından belirtilen fiyatlar ve paketler bilgilendirme amaçlıdır; bağlayıcı değildir. Bağlayıcı fiyat, yazılı teklif ve sözleşmeyle belirlenir. Fiyatlar önceden haber verilmeksizin güncellenebilir.",
    ],
  },
  {
    heading: "4. Fikri Mülkiyet",
    paragraphs: [
      "Sitedeki tüm metin, görsel, logo ve tasarım öğeleri DijiTrak'a aittir veya lisanslı olarak kullanılır. Yazılı izin olmaksızın kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.",
    ],
  },
  {
    heading: "5. Kullanıcı Yükümlülükleri",
    paragraphs: ["Site kullanıcıları aşağıdaki davranışlardan kaçınmalıdır:"],
    bullets: [
      "Siteyi ve formları otomatik araçlarla (bot, scraper) kullanmak veya aşırı istek göndermek.",
      "Yanlış veya yanıltıcı bilgi içeren talepler oluşturmak.",
      "Site güvenliğini ihlal etmeye yönelik girişimlerde bulunmak.",
    ],
  },
  {
    heading: "6. Sorumluluk Sınırlaması",
    paragraphs: [
      "DijiTrak, sitedeki bilgilerin güncelliği ve eksiksizliği konusunda makul özeni gösterir; ancak hatalar veya kesintiler için sorumluluk kabul etmez. Site, hizmet aracılığıyla elde edilen ticari sonuçlar hakkında garanti vermez.",
    ],
  },
  {
    heading: "7. Değişiklikler",
    paragraphs: [
      "DijiTrak, bu koşulları ve site içeriğini önceden bildirimde bulunmaksızın güncelleyebilir. Yürürlükte olan tek sürüm bu sayfada yayımlanan metindir.",
    ],
  },
  {
    heading: "8. Uygulanacak Hukuk",
    paragraphs: [
      "Bu koşullardan doğabilecek uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır. Gizlilik politikamızla birlikte okunmalıdır. Sorularınız için merhaba@dijitrak.net adresine yazabilirsiniz.",
    ],
  },
];

export default function KullanimKosullari() {
  usePageMeta({
    title: "Kullanım Koşulları | DijiTrak",
    description: "DijiTrak web sitesinin kullanım koşulları: hizmetler, fiyat ve teklifler, fikri mülkiyet, kullanıcı yükümlülükleri ve sorumluluk sınırlaması.",
  });

  return (
    <LegalPage
      title="Kullanım Koşulları"
      intro="DijiTrak web sitesini kullanırken geçerli olan kurallar, haklar ve sorumluluklar bu metinde belirtilmiştir."
      updated="17.09.2026"
      sections={SECTIONS}
    />
  );
}