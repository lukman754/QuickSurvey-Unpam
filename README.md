

# Quicksurvey-Myunpam
Chrome extension untuk mempercepat pengisian kuisioner KHS di MyUnpam (Kartu Hasil Studi) secara otomatis.

![image](https://github.com/user-attachments/assets/61b82de1-09c0-45bc-8196-3813c6c939af)



## Fitur
- Memilih rating bintang 1-5
- Pilih Semua Setuju: Memilih opsi "Setuju" untuk semua pertanyaan
- Random (Tanpa STD): Memilih secara acak tanpa opsi "Sangat Tidak Setuju"

## Instalasi
### Windows :
1. Download dan extract file extension [Download](https://github.com/lukman754/Quicksurvey-Myunpam/archive/refs/heads/main.zip)
2. Buka Chrome, pergi ke **chrome://extensions/**
3. Aktifkan "**Developer mode**" di pojok kanan atas
4. Klik "**Load unpacked**" dan pilih folder extension
#### Penggunaan
1. Buka halaman kuisioner [KHS MyUnpam](https://my.unpam.ac.id/data-akademik/khs)
2. Klik icon extension di toolbar Chrome
3. Pilih mode pengisian yang diinginkan

### Android :
1. Download Kiwi Browser di [PlayStore](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser&hl=id&pli=1)
2. Buka Kiwi Browser, Klik menu titik 3 di kanan atas
3. Pilih Extensions
4. Aktifkan **Developer Mode** di kanan atas (jika belum)
5. Klik tombol **+ (from .zip/.crx/.user.js)**
6. Pilih file .Zip yang sudah didownload

#### Penggunaan
1. Buka halaman kuisioner [KHS MyUnpam](https://my.unpam.ac.id/data-akademik/khs), Klik **Isi Kuisioner**
2. Klik menu titik 3 di kanan atas
3. Geser menu ke bagian paling bawah
4. Pilih ekstensi **Auto Kuisioner KHS**
5. Pilih Opsi Pengisian yang diinginkan
6. Buka kembali tab kuisioner sebelumnya


## Struktur File
```
├── manifest.json
├── popup.html
├── popup.js
└── icon.png
```

## Menggunakan Kode via Console Browser
**Cara Penggunaan:**
1. Buka halaman kuisioner KHS
2. Tekan F12 atau klik kanan > Inspect
3. Buka tab Console
4. Copy-paste kode sesuai mode yang diinginkan
5. Tekan Enter

**Kode:**
Memilih "Setuju" Semua :
```
document.querySelectorAll('[role="radio"]').forEach((radio) => {
  if (radio.getAttribute('aria-label') === "Setuju") {
    radio.click();
  }
});
```

Memilih Random (Tanpa "Sangat Tidak Setuju"):
```
const groups = document.querySelectorAll('[role="radiogroup"]');
groups.forEach((group) => {
  const radios = Array.from(group.querySelectorAll('[role="radio"]'))
        .filter(radio => radio.getAttribute('aria-label') !== "Sangat Tidak Setuju");
  const adjustedRadios = radios.flatMap(radio => {
    const label = radio.getAttribute('aria-label');
    return label === "Tidak Setuju" ? [radio] : [radio, radio]; 
  });
  if (adjustedRadios.length > 0) {
    const randomIndex = Math.floor(Math.random() * adjustedRadios.length);
    adjustedRadios[randomIndex].click();
  }
});
```

Memilih Full Random (Tidak Direkomendasikan):
```
const groups = document.querySelectorAll('[role="radiogroup"]'); 
groups.forEach((group) => {
  const radios = Array.from(group.querySelectorAll('[role="radio"]')); 
  if (radios.length > 0) {
    const randomIndex = Math.floor(Math.random() * radios.length); 
    radios[randomIndex].click();
  }
});
```
