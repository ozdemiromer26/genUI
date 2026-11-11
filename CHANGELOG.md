# @genarch/genui

## 0.2.0

### Minor Changes

- 8331682: `ProfileMenu`: iki uygulamanın sağ üstündeki hesap denetimi. Oturum yokken "Giriş yap" düğmesi; oturum varken avatar (resim ya da ad baş harfleri) ad, e-posta ve uygulamanın verdiği girdileri (hesap ayarları, öbür uygulama, çıkış) taşıyan bir menü açar. Ok tuşları, Home/End ve Escape çalışır; dışarı basınca kapanır. Metinler ve bağlantılar uygulamadan gelir. `initialsOf(ad, dil)` baş harfleri verir (Türkçede i → İ).

Sürüm notları Changesets ile yazılır (`.changeset/`); yeni sürümler bu başlığın altına eklenir.

## 0.1.0 (2026-11-11)

- Tasarım değişkenleri (`src/tokens.json` → `css/tokens.css`): dört tema (genarch ve genurban, açık ve koyu), ölçekler,
  yazı stilleri. genarch ve genurban'daki kopyalarla aynı değerler.
- Bileşen sınıfları (`css/bundle.css`): genurban'daki en güncel kopya (genarch'ınkinin üstüne tip seçici, çizim çubuğu
  ve salt okunur alan grubu).
- İkon seti: `Icon` (iki tonlu, 127 ikon) ve `Glyph` (tek tonlu, 39 glif); iki uygulamanın setlerinin birleşimi. Aynı
  adla farklı çizilen `extend` ikisine ayrıldı: `extend` (uzat, ok) ve `expand` (genişlet, çerçeve). Aynı çizimi
  taşıyan gliflerde genarch'ın adları kaldı (`chevronDown`, `chevronUp`, `chevronRight`, `more`, `hide`, `pin`);
  her glifin tasarım sistemindeki çizgi kalınlığı var, `stroke` ile değişir.
- Stil dosyaları `@genarch/genui/css/…` altında.
- `TypeCard`: Özellikler'in başındaki tip seçici (Revit gibi): aile, gruplu tip listesi, seçimin kategorisi ya da bir not,
  "Tip düzenle" düğmesi. Metinler uygulamadan gelir.
- Paket adı `@genarch/genui` (depo adıyla aynı).
