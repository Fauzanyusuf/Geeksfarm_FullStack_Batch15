# Perbedaan Penggunaan EJS Biasa dengan express-ejs-layout

## 1. EJS Biasa (Manual Layout dengan include)

Pada penggunaan **EJS biasa**, kita perlu melakukan include file layout secara manual di setiap view.  
Misalnya untuk `index.ejs`, kita melakukan include:

```ejs
<%- include('layout/header.ejs') %>
<%- include('layout/nav.ejs') %>
<main>
  <h1>This is Homepage</h1>
  <p>Wow</p>
  <p>Hello <%= nama %></p>
</main>
<%- include('layout/footer.ejs') %>
```

### Kelebihan:

- Lebih fleksibel karena kita bisa memilih file layout mana yang ingin dimasukkan.
- Cocok jika struktur layout berbeda-beda di setiap halaman.

### Kekurangan:

- Harus melakukan `include` berulang-ulang di setiap file view.
- Jika ada perubahan pada struktur utama (misalnya letak `<header>` atau `<footer>`), maka semua file view yang melakukan include perlu diperbarui.

---

## 2. Dengan express-ejs-layout

Dengan package **express-ejs-layout**, kita cukup menentukan satu file layout utama, lalu setiap view akan otomatis dimasukkan ke dalam layout tersebut.  
Contoh konfigurasi:

```js
app.set("layout", "./layout/layout");
app.use(expressLayouts);
```

Kemudian di `index.ejs` cukup ditulis kontennya:

```ejs
<%- contentFor('body') %>
<main>
  <h1>This is Homepage</h1>
  <p>Wow</p>
  <p>Hello <%= nama %></p>
</main>
```

Dan di `layout/layout.ejs` kita tentukan strukturnya:

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%= title %></title>
</head>
<body>
  <header> ... </header>
  <%- body %>
  <footer><%- defineContent('footer') %></footer>
</body>
</html>
```

### Kelebihan:

- Tidak perlu include header/footer secara manual di setiap file view.
- Lebih rapi dan konsisten karena semua halaman menggunakan layout utama.
- Memudahkan jika ingin mengubah struktur layout, cukup edit 1 file layout saja.

### Kekurangan:

- Sedikit kurang fleksibel jika ada halaman yang butuh struktur layout berbeda jauh dari layout utama.
- Perlu mempelajari sintaks tambahan seperti `contentFor`, `body`, dan `defineContent`.

---

## Kesimpulan

| Aspek            | EJS Biasa (include)         | express-ejs-layout              |
| ---------------- | --------------------------- | ------------------------------- |
| Cara penggunaan  | Include manual di tiap view | Satu layout utama otomatis      |
| Perubahan layout | Edit di banyak file         | Edit cukup 1 file               |
| Fleksibilitas    | Sangat fleksibel            | Lebih terbatas pada satu layout |
| Kerapihan kode   | Bisa berulang               | Lebih rapi & konsisten          |
