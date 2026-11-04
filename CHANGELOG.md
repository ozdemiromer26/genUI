# @genarch/ui

Sürüm notları Changesets ile yazılır (`.changeset/`); yeni sürümler bu başlığın altına eklenir.

## 0.1.0 (yayımlanmadı)

- Tasarım değişkenleri (`src/tokens.json` → `css/tokens.css`): dört tema (genarch ve genurban, açık ve koyu), ölçekler,
  yazı stilleri. genarch ve genurban'daki kopyalarla aynı değerler.
- Bileşen sınıfları (`css/bundle.css`): genurban'daki en güncel kopya (genarch'ınkinin üstüne tip seçici, çizim çubuğu
  ve salt okunur alan grubu).
- İkon seti: `Icon` (iki tonlu, 127 ikon) ve `Glyph` (tek tonlu, 39 glif); iki uygulamanın setlerinin birleşimi. Aynı
  adla farklı çizilen `extend` ikisine ayrıldı: `extend` (uzat, ok) ve `expand` (genişlet, çerçeve). Aynı çizimi
  taşıyan gliflerde genarch'ın adları kaldı (`chevronDown`, `chevronUp`, `chevronRight`, `more`, `hide`, `pin`);
  her glifin tasarım sistemindeki çizgi kalınlığı var, `stroke` ile değişir.
- Stil dosyaları `@genarch/ui/css/…` altında.
