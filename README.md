# genui

genarch ve genurban'ın ortak arayüz kütüphanesi (`@genarch/genui`): tasarım değişkenleri, ortak stil, ikonlar ve iki
uygulamanın birlikte kullandığı bileşenler. Açık kaynak, MIT.

Depolar arası kararlar (depolar, ortak giriş, sürümleme ve yayın): genarch deposundaki
[`docs/ekosistem.md`](https://github.com/ozdemiromer26/genarch/blob/main/docs/ekosistem.md).

## İçerik (0.1.0)

| Dosya | Ne |
|---|---|
| `src/tokens.json` | Tasarım sisteminin kaynağı: renkler (dört tema: genarch ve genurban, açık ve koyu), yazı, boşluk, köşe, boyut, gölge |
| `css/tokens.css` | `tokens.json`'dan üretilir (`pnpm tokens`): ölçekler `:root`'ta, her tema `[data-theme="…"]` altında, yazı stilleri `.ty-*` |
| `css/bundle.css` | Bileşen sınıfları (`.gs-*`, telefon için `.m-*`); her değer `tokens.css`'ten gelir |
| `src/icons/` | İkon seti: `Icon` (iki tonlu, 127 ikon) ve `Glyph` (tek tonlu arayüz işaretleri, 39 glif); `dist/`'e derlenir |
| `src/components/` | Ortak bileşenler: `TypeCard` (Özellikler'in başındaki tip seçici), `ProfileMenu` (sağ üstteki hesap denetimi: "Giriş yap" ya da avatar ve menüsü) |

Sıradakiler: özellik satırları ve bölümler, menü, diyalog, bildirim, alt sayfa, panel rayı. Bir şey ancak iki uygulama da kullanıyorsa buraya gelir.

## Kullanım

```css
@import "@genarch/genui/css/tokens.css";
@import "@genarch/genui/css/bundle.css";
```

```tsx
import { Glyph, Icon } from "@genarch/genui";

<Icon name="wall" size={24} />          // boyutlar: 15, 16, 18, 24, 26, 32 (çizgi kalınlığı boyuta göre)
<Glyph name="chevronDown" size={14} />  // kendi çizgi kalınlığıyla; stroke={…} değiştirir
```

```html
<html data-theme="genarch-light">  <!-- ya da genarch-dark, genurban-light, genurban-dark -->
```

- Tema uygulamanın işidir: `tokens.css` kendiliğinden tema seçmez, `<html>`'e `data-theme` verilir.
- Yazı tipi uygulamanın bağımlılığıdır. Geist bir CSS değişkeniyle yüklenmişse (`next/font`: `--font-geist-sans`,
  `--font-geist-mono`) o kullanılır, yoksa `Geist` adı.

**Kurulum:** `pnpm add @genarch/genui --save-exact` ([npm](https://www.npmjs.com/package/@genarch/genui); sürüm tam
yazılır, `^` olmadan). Yayımlanmamış bir değişikliği denemek için bir commit'e de bağlanabilir:
`pnpm add github:ozdemiromer26/genui#<commit>`.

## Geliştirme

```bash
pnpm install
pnpm tokens   # tokens.json değiştiyse tokens.css'i yeniden üretir
pnpm build    # src/ → dist/ (dist depoda durur: uygulamalar npm yayınından önce bir commit'e bağlanabilsin)
pnpm dev      # aynısı, değişiklikte yeniden
pnpm check    # tokens.css ve dist/ güncel mi
pnpm test
```

**Uygulamada yerel kopyayla çalışmak** (değişiklik yayın beklemeden görünür; değişken yoksa kurulu paket kullanılır):

- genarch: `GENUI_DIR=../genui pnpm --dir web dev` (genarch kökünden). Vite stilleri ve bileşenlerin kaynağını
  (`src/`) doğrudan kullanır.
- genurban: burada `pnpm dev` (bileşenleri `dist/`'e sürekli derler), genurban'da
  `cd web && GENUI_DIR=../../genui npm run dev`. Stiller doğrudan `css/`'ten gelir.

**Bir commit'e bağlama** (`dist/` bu yüzden depoda): yayımlanmamış bir değişikliği CI'da denemek için genarch
`github:ozdemiromer26/genui#<commit>`, genurban `https://codeload.github.com/ozdemiromer26/genui/tar.gz/<commit>`
kullanabilir; yayından sonra sürüme dönülür.

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
