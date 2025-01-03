

# Quicksurvey-Myunpam
Chrome extension untuk mempercepat pengisian kuisioner KHS di MyUnpam (Kartu Hasil Studi) secara otomatis.
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

<img width="960" alt="{AF631E73-FAEC-4881-A257-5325F2DFE2CA}" src="https://github.com/user-attachments/assets/ff997a59-e48a-4ba9-b034-830dafe66a01" />


## Fitur
- Pilih Semua Setuju: Memilih opsi "Setuju" untuk semua pertanyaan
- Random (Tanpa STD): Memilih secara acak tanpa opsi "Sangat Tidak Setuju"

## Instalasi
1. Download dan extract file extension
2. Buka Chrome, pergi ke chrome://extensions/
3. Aktifkan "Developer mode" di pojok kanan atas
4. Klik "Load unpacked" dan pilih folder extension

## Penggunaan
1. Buka halaman kuisioner KHS MyUnpam (Akademik > KHS)
2. Klik icon extension di toolbar Chrome
3. Pilih mode pengisian yang diinginkan:
   - Setuju
   - Random (Tanpa STD)

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
