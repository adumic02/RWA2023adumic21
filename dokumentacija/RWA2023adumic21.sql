-- Creator:       MySQL Workbench 8.0.34/ExportSQLite Plugin 0.1.0
-- Author:        anton
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-12-09 19:19
-- Created:       2023-11-29 17:17

BEGIN;
CREATE TABLE "uloga"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(45) NOT NULL,
  "opis" TEXT,
  CONSTRAINT "naziv_UNIQUE"
    UNIQUE("naziv")
);
CREATE TABLE "glumci"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(50) NOT NULL,
  "prezime" VARCHAR(100) NOT NULL,
  "biografija" TEXT NOT NULL,
  "spol" CHAR(1) NOT NULL,
  "datum_rodenja" DATE NOT NULL,
  "mjesto_rodenja" TEXT NOT NULL,
  "slika" TEXT NOT NULL
);
CREATE TABLE "korisnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(50),
  "prezime" VARCHAR(100),
  "korime" VARCHAR(50) NOT NULL,
  "lozinka" VARCHAR(128) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
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
  "statusni_kod" INTEGER NOT NULL DEFAULT 0,
  "korisnik_id" INTEGER NOT NULL,
  CONSTRAINT "fk_zahtjevi_korisnik1"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id")
);
CREATE INDEX "zahtjevi.fk_zahtjevi_korisnik1_idx" ON "zahtjevi" ("korisnik_id");
COMMIT;

INSERT INTO uloga(naziv,opis)  VALUES("administrator","Administrator sustava");
INSERT INTO uloga(naziv,opis)  VALUES("registrirani_korisnik","Registrirani korisnik u sustavu");

INSERT INTO korisnik(ime, prezime, korime, lozinka, email, uloga_id) VALUES ("admin","admin","admin","rwa","admin@rwa.hr", 1);
INSERT INTO korisnik(ime, prezime, korime, lozinka, email, uloga_id) VALUES ("obican","obican","obican","rwa","obican@rwa.hr", 2);