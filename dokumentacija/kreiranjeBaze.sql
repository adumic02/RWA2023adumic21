BEGIN;
CREATE TABLE "uloga"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(45) NOT NULL,
  "opis" TEXT,
  CONSTRAINT "naziv_UNIQUE"
    UNIQUE("naziv")
);
CREATE TABLE "glumci"(
  "id" INTEGER PRIMARY KEY NOT NULL,
  "ime_prezime" TEXT,
  "slika" TEXT,
  "biografija" TEXT,
  "alternativna_imena" TEXT,
  "vrsta" VARCHAR(45),
  "popularnost" FLOAT,
  "datum_rodenja" DATE,
  "mjesto_rodenja" VARCHAR(100),
  "datum_smrti" DATE,
  "vanjska_stranica" TEXT,
  "naslovi" TEXT
);
CREATE TABLE "korisnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(50),
  "prezime" VARCHAR(100),
  "korime" VARCHAR(50) NOT NULL,
  "lozinka" VARCHAR(128) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "totp" TEXT NOT NULL,
  "uloga_id" INTEGER NOT NULL,
  CONSTRAINT "korime_UNIQUE"
    UNIQUE("korime"),
  CONSTRAINT "email_UNIQUE"
    UNIQUE("email"),
  CONSTRAINT "fk_korisnik_uloga"
    FOREIGN KEY("uloga_id")
    REFERENCES "uloga"("id")
);
CREATE INDEX "korisnik.fk_korisnik_uloga_idx" ON "korisnik" ("uloga_id");
CREATE TABLE "zahtjevi"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "id_glumca" INTEGER NOT NULL CHECK("id_glumca">=0),
  "ime_prezime_glumca" TEXT NOT NULL,
  "statusni_kod" INTEGER NOT NULL DEFAULT 0,
  "korisnik_korime" VARCHAR(50) NOT NULL,
  "korisnik_id" INTEGER NOT NULL,
  CONSTRAINT "fk_zahtjevi_korisnik1"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id")
);
CREATE INDEX "zahtjevi.fk_zahtjevi_korisnik1_idx" ON "zahtjevi" ("korisnik_id");
COMMIT;

INSERT INTO uloga(naziv, opis) VALUES ("administrator", "Administrator sustava");
INSERT INTO uloga(naziv, opis) VALUES ("registrirani_korisnik", "Korisnik s postojećim računom u sustavu");