# genui

genarch ve genurban'ın ortak arayüz kütüphanesi (`@genarch/ui`): tasarım değişkenleri, ortak stil, ikonlar ve iki
uygulamanın birlikte kullandığı bileşenler. Açık kaynak, MIT.

Depolar arası kararlar (depolar, ortak giriş, sürümleme ve yayın): genarch deposundaki
[`docs/ekosistem.md`](https://github.com/ozdemiromer26/genarch/blob/main/docs/ekosistem.md).

## İçerik (0.1.0)

| Dosya | Ne |
|---|---|
| `src/tokens.json` | Tasarım sisteminin kaynağı: renkler (dört tema: genarch ve genurban, açık ve koyu), yazı, boşluk, köşe, boyut, gölge |
| `css/tokens.css` | `tokens.json`'dan üretilir (`pnpm tokens`): ölçekler `:root`'ta, her tema `[data-theme="…"]` altında, yazı stilleri `.ty-*` |
| `css/bundle.css` | Bileşen sınıfları (`.gs-*`, telefon için `.m-*`); her değer `tokens.css`'ten gelir |

Sıradakiler: ikonlar (`Icon`, `Glyph`), ortak React bileşenleri (menü, özellik satırı, diyalog, bildirim, alt sayfa,
panel rayı, profil menüsü). Bir şey ancak iki uygulama da kullanıyorsa buraya gelir.

## Kullanım

```css
@import "@genarch/ui/tokens.css";
@import "@genarch/ui/bundle.css";
```

```html
<html data-theme="genarch-light">  <!-- ya da genarch-dark, genurban-light, genurban-dark -->
```

- Tema uygulamanın işidir: `tokens.css` kendiliğinden tema seçmez, `<html>`'e `data-theme` verilir.
- Yazı tipi uygulamanın bağımlılığıdır. Geist bir CSS değişkeniyle yüklenmişse (`next/font`: `--font-geist-sans`,
  `--font-geist-mono`) o kullanılır, yoksa `Geist` adı.

**Kurulum:** paket npm'de yayımlanınca `pnpm add @genarch/ui` (sürüm tam yazılır, `^` olmadan). O zamana kadar bir
commit'e bağlanabilir: `pnpm add github:ozdemiromer26/genui#<commit>`.

## Geliştirme

```bash
pnpm install
pnpm tokens   # tokens.json değiştiyse tokens.css'i yeniden üretir
pnpm check    # tokens.css güncel mi
pnpm test
```

**Uygulamada yerel kopyayla çalışmak:** genarch ya da genurban `GENUI_DIR=../genui` ile açılırsa `@genarch/ui`
içe aktarmaları bu klasöre yönlenir; değişiklik yayın beklemeden görünür. Değişken yoksa yayımlanmış paket kullanılır.

**Görsel denetim:** stil değişikliği iki uygulamada da (masaüstü, tablet, telefon; açık ve koyu) ekran görüntüsüyle
denenir.

## Sürümler ve yayın

- Sürümler SemVer. 1.0'a kadar kırıcı değişiklik (bir sınıfın ya da değişkenin adı değişti, kalktı) MINOR'ı artırır.
- Paketi değiştiren her commit `pnpm changeset` ile bir sürüm notu ekler (`.changeset/`).
- `main`'e gelen notları CI bir "Sürüm" PR'ında toplar (sürüm numarası ve `CHANGELOG.md`). PR birleşince paket npm'de
  provenance ile yayımlanır (`.github/workflows/release.yml`). Yayın için deponun Actions gizli anahtarlarında
  `NPM_TOKEN` olmalı; yoksa yalnız PR açılır. PR açılabilmesi için Settings › Actions › General'da "Allow GitHub Actions
  to create and approve pull requests" açık olmalı.

## Lisans

[MIT](LICENSE). "genarch" ve "genurban" adları ve logoları lisansa dahil değildir.
