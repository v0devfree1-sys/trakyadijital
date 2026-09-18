import LegalPage from "@/components/legal/LegalPage";
import { usePageMeta } from "@/lib/usePageMeta";

const SECTIONS = [
  {
    heading: "1. Veri Sorumlusu",
    paragraphs: [
      "Bu gizlilik politikası, DijiTrak (“veri sorumlusu”) tarafından işletilen dijitrak.net web sitesi üzerinden toplanan kişisel verilerin nasıl işlendiğini açıklar.",
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, aşağıda açıklanan kapsamda kişisel verileriniz veri sorumlusu tarafından işlenmektedir.",
    ],
  },
  {
    heading: "2. Toplanan Kişisel Veriler",
    paragraphs: ["Site üzerinden aşağıdaki kişisel veriler toplanmaktadır:"],
    bullets: [
      "Teklif ve iletişim formları aracılığıyla: ad-soyad, e-posta adresi, telefon numarası, firma adı, sektör bilgisi ve proje mesajınız.",
      "AI asistan sohbeti aracılığıyla: sohbet mesajlarınız ve sohbette paylaştığınız bilgiler.",
      "Teknik veriler: IP adresi, tarayıcı bilgileri, ziyaret ettiğiniz sayfalar ve ziyaret zamanları.",
    ],
  },
  {
    heading: "3. İşleme Amaçları",
    paragraphs: ["Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:"],
    bullets: [
      "Talep ve teklif başvurularınızın yanıtlanması, size geri dönüş yapılması.",
      "Hizmet süreçlerinin yürütülmesi, sözleşme öncesi ve sonrası iletişim.",
      "Yasal yükümlülüklerin yerine getirilmesi.",
      "Site güvenliğinin sağlanması ve kötüye kullanımın (bot, spam) önlenmesi.",
    ],
  },
  {
    heading: "4. Hukuki Sebep",
    paragraphs: [
      "Verileriniz KVKK m.5/2 uyarınca; bir sözleşmenin kurulması veya ifasıyla ilgili olması, hukuki yükümlülüğümüzün bulunması ve meşru menfaatimiz (hizmet kalitesinin korunması, güvenlik) kapsamında işlenmektedir.",
    ],
  },
  {
    heading: "5. Aktarım",
    paragraphs: [
      "Kişisel verileriniz; barındırma (hosting) hizmeti sağlayıcısı, e-posta gönderim servisleri ve yapay zeka yanıt servisi gibi yalnızca operasyonun yürütülmesi için zorunlu tedarikçilerle, gizlilik çerçevesinde paylaşılabilir. Verileriniz hiçbir koşulda pazarlama amaçlı üçüncü taraflara satılmaz veya devredilmez.",
    ],
  },
  {
    heading: "6. Saklama Süresi",
    paragraphs: [
      "Teklif ve iletişim talepleriniz, ilgili talebin sonuçlanmasından itibaren en fazla 2 yıl boyunca saklanır; yasal saklama yükümlülüğü bulunan durumlar hariç, süre sonunda silinir veya anonim hale getirilir.",
    ],
  },
  {
    heading: "7. Haklarınız (KVKK m.11)",
    paragraphs: ["KVKK m.11 uyarınca veri sorumlusuna başvurarak:"],
    bullets: [
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
      "İşlenmişse buna ilişkin bilgi talep etme,",
      "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
      "Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme,",
      "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
      "Silinmesini veya yok edilmesini isteme ve düzeltme/silme işleminin üçüncü kişilere bildirilmesini talep etme,",
      "Otomatik sistemlerle analiz sonucu aleyhinize bir çıkarıma itiraz etme haklarına sahipsiniz.",
    ],
  },
  {
    heading: "8. İletişim",
    paragraphs: [
      "Başvuru ve sorularınız için merhaba@dijitrak.net adresine e-posta gönderebilir veya Çorlu / Tekirdağ adresimizden bize ulaşabilirsiniz.",
    ],
  },
];

export default function GizlilikPolitikasi() {
  usePageMeta({
    title: "Gizlilik Politikası & KVKK | DijiTrak",
    description: "DijiTrak gizlilik politikası: kişisel verilerinizin KVKK kapsamında toplanması, işlenmesi, saklanması ve haklarınız hakkında aydınlatma metni.",
  });

  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro="DijiTrak olarak kişisel verilerinizi KVKK (6698 sayılı Kanun) kapsamında özenle işliyoruz. Bu metin, verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar."
      updated="17.09.2026"
      sections={SECTIONS}
    />
  );
}