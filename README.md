# SEON AKADEMIY — O'quv markazi boshqaruv tizimi

React + Vite asosidagi o'quv markazi boshqaruv paneli (talabalar, o'qituvchilar, kurslar, to'lovlar, davomat). Ma'lumotlar brauzerning `localStorage`ida saqlanadi — backend kerak emas.

## Talablar

- Node.js 18 yoki undan yuqori (tavsiya: 20+)
- npm

## O'rnatish va ishga tushirish

```bash
npm install      # paketlarni o'rnatish
npm run dev      # dev server: http://localhost:5173
```

## Boshqa buyruqlar

```bash
npm run build    # production build (dist/ papkaga)
npm run preview  # build natijasini ko'rish
npm run lint     # ESLint tekshiruvi
```

## Kirish ma'lumotlari

| Rol | Login | Parol |
|-----|-------|-------|
| Admin | `admin` | `SeonAkademiya2024!` |
| O'qituvchi | `boburjon_jumanazarov` | `2024abc` |
| O'qituvchi | `islomboy_karimov` | `2024xyz` |
| O'qituvchi | `mavluda_axmedova` | `2024def` |

O'qituvchi yoki admin yangi talaba qo'shganda, talaba uchun login (telefon raqamining oxirgi 9 ta raqami) va parol avtomatik yaratiladi.
