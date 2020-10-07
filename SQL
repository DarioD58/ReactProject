--Entiteti

CREATE TABLE Korisnik
{
  --Staviti not null ako će se postupno registrirati?

  IDKorisnika INT NOT NULL,
  ImeK VARCHAR (50) NOT NULL,
  EMail VARCHAR (50) NOT NULL,
  BrTelefona INT NOT NULL,
  DodatniBrTelefona INT,
  DatumRodenjaK DATE NOT NULL,
  MotivacijskoPismo VARCHAR (3000) NOT NULL,

  PRIMARY KEY (IDKorisnika)
};

CREATE TABLE Aktivnost
{
  IDAktivnosti INT NOT NULL,
  Ime VARCHAR (50) NOT NULL,
  KratkiOpis VARCHAR (300) NOT NULL,
  Trajanje INT NOT NULL,
  BrojGrupa INT NOT NULL,

  PRIMARY KEY (IDAktivnosti)
};

CREATE TABLE Animator
{
  IDAnimatora INT NOT NULL,
  ImeA VARCHAR (50) NOT NULL,
  EMailA VARCHAR (50) NOT NULL,
  DatumRodenjaA DATE NOT NULL,
  BrTelefonaA INT NOT NULL,

  PRIMARY KEY (IDAnimatora)
};

CREATE TABLE Grupa
{
  IDGrupe INT NOT NULL,
  IDKorisnika INT NOT NULL,

  PRIMARY KEY (IDGrupe),
  FOREIGN KEY (IDKorisnika) REFERENCES Korisnik(IDKorisnika)
};

--Relacije

CREATE TABLE Ocjenjivanje
{
  IDKorisnika INT NOT NULL,
  IDAktivnosti INT NOT NULL,
  Ocjena INT NOT NULL,

  FOREIGN KEY (IDKorisnika) REFERENCES Korisnik(IDKorisnika),
  FOREIGN KEY (IDAktivnosti) REFERENCES Aktivnost(IDAktivnosti)
};
