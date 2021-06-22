export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AvsenderMottaker = {
  __typename?: "AvsenderMottaker";
  id?: Maybe<Scalars["String"]>;
  type?: Maybe<AvsenderMottakerIdType>;
};

export enum AvsenderMottakerIdType {
  Fnr = "FNR",
  Orgnr = "ORGNR",
  Hprnr = "HPRNR",
  UtlOrg = "UTL_ORG",
  Null = "NULL",
  Ukjent = "UKJENT",
}

export enum Datotype {
  DatoOpprettet = "DATO_OPPRETTET",
  DatoSendtPrint = "DATO_SENDT_PRINT",
  DatoEkspedert = "DATO_EKSPEDERT",
  DatoJournalfoert = "DATO_JOURNALFOERT",
  DatoRegistrert = "DATO_REGISTRERT",
  DatoAvsRetur = "DATO_AVS_RETUR",
  DatoDokument = "DATO_DOKUMENT",
}

export type DokumentInfo = {
  __typename?: "DokumentInfo";
  dokumentInfoId: Scalars["String"];
  tittel?: Maybe<Scalars["String"]>;
  brevkode?: Maybe<Scalars["String"]>;
  dokumentvarianter: Array<Maybe<Dokumentvariant>>;
};

export type Dokumentoversikt = {
  __typename?: "Dokumentoversikt";
  tema: Array<Sakstema>;
};

export type Dokumentvariant = {
  __typename?: "Dokumentvariant";
  variantformat: Variantformat;
  filuuid?: Maybe<Scalars["String"]>;
  brukerHarTilgang?: Maybe<Scalars["Boolean"]>;
  code: Array<Maybe<Scalars["String"]>>;
};

export type Journalpost = {
  __typename?: "Journalpost";
  journalpostId: Scalars["String"];
  tittel?: Maybe<Scalars["String"]>;
  journalposttype?: Maybe<Journalposttype>;
  journalstatus?: Maybe<Journalstatus>;
  avsender?: Maybe<AvsenderMottaker>;
  mottaker?: Maybe<AvsenderMottaker>;
  kanal?: Maybe<Kanal>;
  relevanteDatoer: Array<Maybe<RelevantDato>>;
  dokumenter?: Maybe<Array<Maybe<DokumentInfo>>>;
};

export enum Journalposttype {
  I = "I",
  U = "U",
  N = "N",
}

export enum Journalstatus {
  Mottatt = "MOTTATT",
  Journalfoert = "JOURNALFOERT",
  Ferdigstilt = "FERDIGSTILT",
  Ekspedert = "EKSPEDERT",
  UnderArbeid = "UNDER_ARBEID",
  Feilregistrert = "FEILREGISTRERT",
  Utgaar = "UTGAAR",
  Avbrutt = "AVBRUTT",
  UkjentBruker = "UKJENT_BRUKER",
  Reservert = "RESERVERT",
  OpplastingDokument = "OPPLASTING_DOKUMENT",
  Ukjent = "UKJENT",
}

export enum Kanal {
  Altinn = "ALTINN",
  Eessi = "EESSI",
  Eia = "EIA",
  EkstOpps = "EKST_OPPS",
  LokalUtskrift = "LOKAL_UTSKRIFT",
  NavNo = "NAV_NO",
  SentralUtskrift = "SENTRAL_UTSKRIFT",
  Sdp = "SDP",
  SkanNets = "SKAN_NETS",
  SkanPen = "SKAN_PEN",
  SkanIm = "SKAN_IM",
  Trygderetten = "TRYGDERETTEN",
  Helsenettet = "HELSENETTET",
  IngenDistribusjon = "INGEN_DISTRIBUSJON",
  NavNoUinnlogget = "NAV_NO_UINNLOGGET",
  InnsendtNavAnsatt = "INNSENDT_NAV_ANSATT",
  NavNoChat = "NAV_NO_CHAT",
  Ukjent = "UKJENT",
}

export type Query = {
  __typename?: "Query";
  dokumentoversiktSelvbetjening: Dokumentoversikt;
};

export type QueryDokumentoversiktSelvbetjeningArgs = {
  ident: Scalars["String"];
  tema: Array<Maybe<Tema>>;
};

export type RelevantDato = {
  __typename?: "RelevantDato";
  dato: Scalars["DateTime"];
  datotype: Datotype;
};

export type Sakstema = {
  __typename?: "Sakstema";
  journalposter: Array<Maybe<Journalpost>>;
  kode?: Maybe<Scalars["String"]>;
  navn?: Maybe<Scalars["String"]>;
};

export enum Tema {
  Aap = "AAP",
  Aar = "AAR",
  Agr = "AGR",
  Bar = "BAR",
  Bid = "BID",
  Bil = "BIL",
  Dag = "DAG",
  Enf = "ENF",
  Ers = "ERS",
  Far = "FAR",
  Fei = "FEI",
  For = "FOR",
  Fos = "FOS",
  Fri = "FRI",
  Ful = "FUL",
  Gen = "GEN",
  Gra = "GRA",
  Gru = "GRU",
  Hel = "HEL",
  Hje = "HJE",
  Iar = "IAR",
  Ind = "IND",
  Kon = "KON",
  Med = "MED",
  Mob = "MOB",
  Oms = "OMS",
  Opa = "OPA",
  Opp = "OPP",
  Pen = "PEN",
  Per = "PER",
  Reh = "REH",
  Rek = "REK",
  Rpo = "RPO",
  Rve = "RVE",
  Saa = "SAA",
  Sak = "SAK",
  Sap = "SAP",
  Ser = "SER",
  Sik = "SIK",
  Sto = "STO",
  Sup = "SUP",
  Syk = "SYK",
  Sym = "SYM",
  Til = "TIL",
  Trk = "TRK",
  Try = "TRY",
  Tso = "TSO",
  Tsr = "TSR",
  Ufm = "UFM",
  Ufo = "UFO",
  Ukj = "UKJ",
  Ven = "VEN",
  Yra = "YRA",
  Yrk = "YRK",
}

export enum Variantformat {
  Arkiv = "ARKIV",
  Sladdet = "SLADDET",
  Produksjon = "PRODUKSJON",
  ProduksjonDlf = "PRODUKSJON_DLF",
  Fullversjon = "FULLVERSJON",
  Original = "ORIGINAL",
}
