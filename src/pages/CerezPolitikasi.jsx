import LegalPage from "@/components/legal/LegalPage";
import { usePageMeta } from "@/lib/usePageMeta";

const SECTIONS = [
  {
    heading: "1. Çerez Nedir?",
    paragraphs: [
      "Çerezler, web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Oturum sürekliliği, tercih hatırlama ve site kullanımının ölçülmesi gibi amaçlarla kullanılır.",
    ],
  },
  {
    heading: "2. Kullandığımız Çerez ve Depolama Türleri",
    paragraphs: ["DijiTrak sitesi aşağıdaki türlerde çerez ve yerel depolama kullanır:"],
    bullets: [
      "Zorunlu çerezler: oturum yönetimi ve güvenlik (captcha, bot koruması) için gereklidir; devre dışı bırakılamaz.",
      "İşlevsel depolama: dil tercihiniz, AI asistan sohbet geçmişiniz yalnızca kendi tarayıcınızda (localStorage) saklanır; sunucularımıza gönderilmez.",
      "Analitik çerezler: site kullanımını toplu ve anonim olarak ölçmek için kullanılır.",
    ],
  },
  {
    heading: "3. Çerezleri Yönetme",
    paragraphs: [
      "Tarayıcınızın ayarlarından çerezleri silebilir, engelleyebilir veya belirli siteler için izin verebilirsiniz. Zorunlu çerezleri engellemeniz durumunda site işlevleri (oturum açma, formlar) düzgün çalışmayabilir.",
      "Tarayıcı üzerinden dil tercihinizi veya sohbet geçmişinizi temizlemek isterseniz, AI asistan panelindeki sohbet sıfırlama düğmesini kullanabilir veya tarayıcı verilerini temizleyebilirsiniz.",
    ],
  },
  {
    heading: "4. Üçüncü Taraf Çerezler",
    paragraphs: [
      "Sitede yer alan WhatsApp, LinkedIn ve Instagram bağlantıları tıklandığında, ilgili platformlar kendi çerez politikalarını uygulayabilir. Bu platformlardaki veri işlemlerinden DijiTrak sorumlu değildir.",
    ],
  },
  {
    heading: "5. Değişiklikler",
    paragraphs: [
      "Bu politika gerektiğinde güncellenir. Önemli değişiklikler site üzerinden duyurulur. Güncel metnin yürürlükte olan tek sürüm bu sayfada yayımlanır.",
    ],
  },
  {
    heading: "6. İletişim",
    paragraphs: ["Çerez politikamız hakkında sorularınız için merhaba@dijitrak.net adresine yazabilirsiniz."],
  },
];

export default function CerezPolitikasi() {
  usePageMeta({
    title: "Çerez Politikası | DijiTrak",
    description: "DijiTrak çerez politikası: sitemizde kullanılan zorunlu, işlevsel ve analitik çerezler ile çerezleri nasıl yönetebileceğiniz.",
  });

  return (
    <LegalPage
      title="Çerez Politikası"
      intro="Sitemizdeki deneyiminizi geliştirmek için çerezler ve tarayıcı içi depolama kullanıyoruz. Bu metin hangi türleri kullandığımızı açıklar."
      updated="17.09.2026"
      sections={SECTIONS}
    />
  );
}