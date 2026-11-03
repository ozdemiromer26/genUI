# Sürüm notları

Paketi değiştiren her commit buraya bir not ekler: `pnpm changeset`. Not, değişikliğin `patch` (düzeltme), `minor`
(yeni şey ya da 1.0'a kadar kırıcı değişiklik) ya da `major` (1.0'dan sonra kırıcı değişiklik) olduğunu ve
kullanıcıya dönük bir cümlelik açıklamasını (Türkçe) içerir. CI notları toplayıp bir "Sürüm" PR'ı açar; PR
birleşince paket npm'de yayımlanır.
