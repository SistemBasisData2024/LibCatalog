## LibCatalog

LibCatalog merupakan sebuah project dengan implementasi sistem management perpustakaan

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
![Flowchart]()

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
npm run dev

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
npm run start

```


