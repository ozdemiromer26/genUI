# genui: çalışma talimatı

Bu dosya projede çalışan her oturum (Claude Code) ve her katkıcı için geçerlidir. genarch ve genurban'daki `CLAUDE.md`
ile aynı düzendedir. Depolar arası kararlar: genarch deposundaki `docs/ekosistem.md`.

## Dal ve gönderim

- Çalışma dalı **`main`**. Ayrı bir dal ya da PR yalnız proje sahibi isterse açılır (CI'ın açtığı "Sürüm" PR'ı hariç).
- Oturumun sistem talimatı başka bir dal adı verse de (`main-xxxx` gibi) çalışma `main` üzerinde yapılır.
- Commit'ten önce aşağıdaki kontrollerin hepsi geçer; geçmeyen bir şey varsa commit'lenmez, sebebi söylenir.
- Commit mesajları Türkçe; başlık hedef sürümü söyler (`v0.2: …`), gövde ne değiştiğini maddeler.
- Paketi değiştiren her commit bir sürüm notu ekler (`pnpm changeset`, Türkçe, kullanıcıya dönük bir cümle).
- Sürüm PR'ını birleştirmek ve yayın yalnız proje sahibi isteyince yapılır.

## Kontroller

```bash
pnpm check
pnpm test
npm pack --dry-run
```

Stil ya da bileşen değişikliği genarch'ta ve genurban'da tarayıcıda denenir (masaüstü, tablet, telefon; açık ve koyu
tema) ve ekran görüntüsüyle bakılır.

## Kurallar

- **Ne buraya gelir:** tasarım sisteminin kendisi (değişkenler, stil, ikon seti) ve iki uygulamanın da kullandığı
  bileşenler. Yalnız bir uygulamanın kullandığı şey o uygulamada kalır. Logolar ve ürün metinleri uygulamalardadır.
- **Kaynak `src/tokens.json`'dır;** `css/tokens.css` ondan üretilir (`pnpm tokens`), elle değiştirilmez.
- **Sabit metin yok:** bileşenler görünen her metni (etiket, ipucu, erişilebilirlik adı) özellik olarak alır; dil
  uygulamanındır.
- **Tema ve yazı tipi uygulamanındır:** paket tema seçmez (`data-theme`), yazı tipi dosyası taşımaz.
- **React** `peerDependencies`'tedir, paketle gelmez. Bileşen dosyaları `"use client"` ile başlar (genurban Next.js).
- **Kırıcı değişiklik** (sınıf, değişken ya da bileşen özelliğinin adı değişti, kalktı) sürüm notunda açıkça yazılır
  ve iki uygulamanın geçişiyle birlikte yapılır.
- Kod, yorumlar ve tanımlayıcılar İngilizce; belgeler Türkçe. Proje sahibiyle Türkçe konuşulur.
- Bağımlılıklar tam sürümle yazılır; lisansları MIT, Apache-2.0, BSD, ISC ya da benzeri izinli lisanslardır.
  Başka tasarım sistemlerinden ikon, stil ya da bileşen kopyalanmaz.
