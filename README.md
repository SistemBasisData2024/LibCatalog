## LibCatalog

LibCatalog merupakan sebuah Webiste user friendly dengan implementasi sistem management Perpustakaan. Website ini dapat menampilkan daftar buku beserta cover buku dan detail dari bukunya. Website ini juga dapat melakukan peminjaman dan pengembalian buku, serta dapat memberikan rating buku yang telah dibaca. Jumlah buku yang dipinjam dan dikembalikan akan di-update secara berkala. Website dapat melakukan filterisasi buku berdasarkan parameter

## Anggota :
- Monica Vierin Pasman (2206029405)
- Christopher Sutandar (2206810414)
- Irfan Yusuf Khaerullah (2206813290)


## 🖥️ Tech Stack : 

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Session](https://img.shields.io/badge/Session-grey?style=for-the-badge&logo=Session)

## 📈 Diagram : 

### ERD 
![ERD](https://cdn.discordapp.com/attachments/676267084732170251/1249327579220148224/LibCatalog-ERD.png?ex=6666e67a&is=666594fa&hm=d028ab14aa27ce3adbb042ea716a606d2938f0f01915b475b948cb1482efc293&)

### UML

### FLowchart
![Flowchart](https://cdn.discordapp.com/attachments/676267084732170251/1249361036440633407/Diagram_Tanpa_Judul.drawio_31.png?ex=666705a3&is=6665b423&hm=b51485a43aa979298cbc5505e9f1a6e15655f7b6e4500ab95f4090ab646badca&)

## ⛩ Table : 

### 1. `buku`
```
isbn
cover
judul
deskripsi
author
genre
penerbit
jumlah
```

### 2. `user`
```
id_user
nama
username
password
```
### 3. `admin`
```
id_admin
nama
username
password
```
### 4. `peminjaman`
```
id_peminjaman
deadline
status
id_user
isbn
```
### 5. `readLater`
```
id_read_later
id_user
isbn
```

### 6. `review`
```
id_user
isbn
rating
ulasan
```




## 💻 Installation Guide : 
- Melakukan Clone Repository LibCatalog
```
git clone https://github.com/SistemBasisData2024/LibCatalog.git
```

### Backend
- Change directory 
```
cd LibCatalog-Backend
```
- Install Dependencies
```
npm install
```

- Run Frontend
```
npm run start

```


### Frontend
- Change directory 
```
cd LibCatalog-Frontend
```
- Install Dependencies
```
npm install
```

- Run Frontend
```
npm run dev

```

## 🗓️ Progress Meeting 
- Meet Pertama
![Foto1](https://cdn.discordapp.com/attachments/676267084732170251/1249360966039375892/image.png?ex=66670592&is=6665b412&hm=70c982700314a464fdad8c428efb43b061aed73aec0949a21780561a59a9790a&)

- Meet Kedua
![Foto2](https://cdn.discordapp.com/attachments/676267084732170251/1249362456502075454/image.png?ex=666706f5&is=6665b575&hm=a8de8e1dd5d86ac33270547f04347a9a560cdf855a56ee32fd501e51da4985f4&)

