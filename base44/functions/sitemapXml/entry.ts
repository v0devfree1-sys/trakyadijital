// Dinamik sitemap: statik sayfaları + yayındaki blog yazılarını XML olarak sunar.
// Bot erişimi için kimlik gerektirmez (herkese açık URL listesi döndürür) — bu
// yüzden veriler service role ile, yalnızca "published" blog yazıları okunur.
// Google'ın /sitemap.xml üzerinden erişebilmesi için Domains panelinden
// /sitemap.xml adresinin bu fonksiyona (/functions/sitemapXml) yönlendirilmesi gerekir.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const SITE_URL = 'https://dijitrak.net';

const STATIC_URLS = [
  ['/', 1.0, 'weekly'],
  ['/trakya-web-tasarim', 0.9, 'monthly'],
  ['/sektorler', 0.9, 'monthly'],
  ['/iz-biraktiklarimiz', 0.8, 'weekly'],
  ['/isletmeler', 0.8, 'weekly'],
  ['/hizmetler/web-tasarim', 0.8, 'monthly'],
  ['/hizmetler/eticaret', 0.8, 'monthly'],
  ['/hizmetler/seo', 0.8, 'monthly'],
  ['/hizmetler/google-haritalar', 0.7, 'monthly'],
  ['/hizmetler/mobil', 0.7, 'monthly'],
  ['/hizmetler/destek', 0.7, 'monthly'],
  ['/paketler', 0.9, 'monthly'],
  ['/blog', 0.7, 'weekly'],
  ['/iletisim', 0.7, 'monthly'],
  ['/randevu', 0.8, 'monthly'],
  ['/hakkimizda', 0.6, 'yearly'],
  ['/sss', 0.6, 'monthly'],
  ['/ai-asistan', 0.6, 'monthly'],
  ['/gizlilik-politikasi', 0.3, 'yearly'],
  ['/cerez-politikasi', 0.3, 'yearly'],
  ['/kullanim-kosullari', 0.3, 'yearly'],
];

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const posts = await base44.asServiceRole.entities.BlogPost.filter({ published: true }, '-created_date', 500);
    const cases = await base44.asServiceRole.entities.CaseStudy.filter({ published: true }, '-created_date', 200);

    const today = new Date().toISOString().slice(0, 10);
    const entries = STATIC_URLS.map(
      ([path, priority, freq]) =>
        `<url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
    );
    for (const p of posts) {
      const mod = String(p.updated_date || p.created_date || '').slice(0, 10) || today;
      const blogPath = p.slug ? `/blog/${p.slug}` : `/blog/${p.id}`;
      entries.push(
        `<url><loc>${SITE_URL}${blogPath}</loc><lastmod>${mod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
      );
    }

    for (const c of cases) {
      const mod = String(c.updated_date || c.created_date || '').slice(0, 10) || today;
      entries.push(
        `<url><loc>${SITE_URL}/iz-biraktiklarimiz/${c.id}</loc><lastmod>${mod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`;
    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}