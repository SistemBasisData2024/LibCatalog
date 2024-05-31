CREATE TYPE genre_enum AS ENUM ('fiction', 'romance', 'novel', 'science', 'science fiction', 'motivation');

CREATE TABLE "buku" (
  "isbn" CHAR(13) PRIMARY KEY NOT NULL,
  "cover" VARCHAR,
  "judul" VARCHAR(255) NOT NULL,
  "deskripsi" VARCHAR(255) NOT NULL,
  "author" VARCHAR(255) NOT NULL,
  "genre" genre_enum NOT NULL,
  "penerbit" VARCHAR(255) NOT NULL,
  "jumlah" int NOT NULL
);

CREATE TABLE "user" (
  "id_user" SERIAL PRIMARY KEY NOT NULL,
  "nama" VARCHAR(50) NOT NULL,
  "username" VARCHAR(50) NOT NULL,
  "password" VARCHAR(50) NOT NULL
);

CREATE TABLE "admin" (
  "id_admin" SERIAL PRIMARY KEY NOT NULL,
  "nama" VARCHAR(50) NOT NULL,
  "username" VARCHAR(50) NOT NULL,
  "password" VARCHAR(50) NOT NULL
);

CREATE TYPE tipe_status AS ENUM ('sedang dipinjam', 'sudah dikembalikan'); 

CREATE TABLE "peminjaman" (
  "id_peminjaman" SERIAL PRIMARY KEY NOT NULL,
  "deadline" DATE NOT NULL,
  "status" tipe_status NOT NULL, 
  "id_user" INT NOT NULL,
  "isbn" VARCHAR(13) NOT NULL
);

CREATE TABLE "readLater" (
  "id_read_later" SERIAL PRIMARY KEY NOT NULL,
  "id_user" INT NOT NULL,
  "isbn" VARCHAR(13) NOT NULL
);

CREATE TABLE "review" (
  "id_user" INT NOT NULL,
  "isbn" VARCHAR(13) NOT NULL,
  "rating" INTEGER CHECK (rating IN (1, 2, 3, 4, 5)) NOT NULL,
  "ulasan" VARCHAR(255)
);

ALTER TABLE "peminjaman" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id_user");

ALTER TABLE "peminjaman" ADD FOREIGN KEY ("isbn") REFERENCES "buku" ("isbn");

ALTER TABLE "readLater" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id_user");

ALTER TABLE "readLater" ADD FOREIGN KEY ("isbn") REFERENCES "buku" ("isbn");

ALTER TABLE "review" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id_user");

ALTER TABLE "review" ADD FOREIGN KEY ("isbn") REFERENCES "buku" ("isbn");

CREATE OR REPLACE VIEW top_5_books_by_rating AS
SELECT 
    b.judul,
    b.author,
    b.deskripsi,
    b.cover,
    AVG(r.rating) AS average_rating
FROM 
    buku b
JOIN 
    review r ON b.isbn = r.isbn
GROUP BY 
    b.judul, b.author, b.deskripsi, b.cover
ORDER BY 
    average_rating DESC
LIMIT 5;