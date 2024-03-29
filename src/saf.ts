export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AvsenderMottaker = {
  __typename?: 'AvsenderMottaker';
  id: Scalars['String']['output'];
  type: AvsenderMottakerIdType;
};

export enum AvsenderMottakerIdType {
  Fnr = 'FNR',
  Hprnr = 'HPRNR',
  Null = 'NULL',
  Orgnr = 'ORGNR',
  Ukjent = 'UKJENT',
  UtlOrg = 'UTL_ORG'
}

export enum Datotype {
  DatoAvsRetur = 'DATO_AVS_RETUR',
  DatoDokument = 'DATO_DOKUMENT',
  DatoEkspedert = 'DATO_EKSPEDERT',
  DatoJournalfoert = 'DATO_JOURNALFOERT',
  DatoOpprettet = 'DATO_OPPRETTET',
  DatoRegistrert = 'DATO_REGISTRERT',
  DatoSendtPrint = 'DATO_SENDT_PRINT'
}

export type DokumentInfo = {
  __typename?: 'DokumentInfo';
  brevkode?: Maybe<Scalars['String']['output']>;
  dokumentInfoId: Scalars['String']['output'];
  dokumentvarianter: Array<Maybe<Dokumentvariant>>;
  tittel?: Maybe<Scalars['String']['output']>;
};

export type Dokumentoversikt = {
  __typename?: 'Dokumentoversikt';
  fagsak: Array<Fagsak>;
  journalposter: Array<Journalpost>;
  tema: Array<Sakstema>;
};

export type Dokumentvariant = {
  __typename?: 'Dokumentvariant';
  brukerHarTilgang: Scalars['Boolean']['output'];
  code: Array<Maybe<Scalars['String']['output']>>;
  filstorrelse: Scalars['Int']['output'];
  filtype: Scalars['String']['output'];
  filuuid: Scalars['String']['output'];
  variantformat: Variantformat;
};

export type Fagsak = {
  __typename?: 'Fagsak';
  fagsakId: Scalars['String']['output'];
  fagsaksystem: Scalars['String']['output'];
  journalposter: Array<Maybe<Journalpost>>;
  tema?: Maybe<Scalars['String']['output']>;
};

export type Journalpost = {
  __typename?: 'Journalpost';
  avsender?: Maybe<AvsenderMottaker>;
  dokumenter?: Maybe<Array<Maybe<DokumentInfo>>>;
  journalpostId: Scalars['String']['output'];
  journalposttype: Journalposttype;
  journalstatus?: Maybe<Journalstatus>;
  kanal?: Maybe<Kanal>;
  mottaker?: Maybe<AvsenderMottaker>;
  relevanteDatoer: Array<Maybe<RelevantDato>>;
  sak?: Maybe<Sak>;
  tema?: Maybe<Scalars['String']['output']>;
  tittel?: Maybe<Scalars['String']['output']>;
};

export enum Journalposttype {
  I = 'I',
  N = 'N',
  U = 'U'
}

export enum Journalstatus {
  Avbrutt = 'AVBRUTT',
  Ekspedert = 'EKSPEDERT',
  Feilregistrert = 'FEILREGISTRERT',
  Ferdigstilt = 'FERDIGSTILT',
  Journalfoert = 'JOURNALFOERT',
  Mottatt = 'MOTTATT',
  OpplastingDokument = 'OPPLASTING_DOKUMENT',
  Reservert = 'RESERVERT',
  Ukjent = 'UKJENT',
  UkjentBruker = 'UKJENT_BRUKER',
  UnderArbeid = 'UNDER_ARBEID',
  Utgaar = 'UTGAAR'
}

export enum Kanal {
  Altinn = 'ALTINN',
  Eessi = 'EESSI',
  Eia = 'EIA',
  EkstOpps = 'EKST_OPPS',
  Helsenettet = 'HELSENETTET',
  IngenDistribusjon = 'INGEN_DISTRIBUSJON',
  InnsendtNavAnsatt = 'INNSENDT_NAV_ANSATT',
  LokalUtskrift = 'LOKAL_UTSKRIFT',
  NavNo = 'NAV_NO',
  NavNoChat = 'NAV_NO_CHAT',
  NavNoUinnlogget = 'NAV_NO_UINNLOGGET',
  Sdp = 'SDP',
  SentralUtskrift = 'SENTRAL_UTSKRIFT',
  SkanIm = 'SKAN_IM',
  SkanNets = 'SKAN_NETS',
  SkanPen = 'SKAN_PEN',
  Trygderetten = 'TRYGDERETTEN',
  Ukjent = 'UKJENT'
}

export type Query = {
  __typename?: 'Query';
  dokumentoversiktSelvbetjening: Dokumentoversikt;
};


export type QueryDokumentoversiktSelvbetjeningArgs = {
  ident: Scalars['String']['input'];
  tema: Array<InputMaybe<Tema>>;
};

export type RelevantDato = {
  __typename?: 'RelevantDato';
  dato: Scalars['DateTime']['output'];
  datotype: Datotype;
};

export type Sak = {
  __typename?: 'Sak';
  fagsakId?: Maybe<Scalars['String']['output']>;
  fagsaksystem?: Maybe<Scalars['String']['output']>;
  sakstype: Sakstype;
};

export type Sakstema = {
  __typename?: 'Sakstema';
  journalposter: Array<Maybe<Journalpost>>;
  kode: Scalars['String']['output'];
  navn: Scalars['String']['output'];
};

export enum Sakstype {
  Fagsak = 'FAGSAK',
  GenerellSak = 'GENERELL_SAK'
}

export enum Tema {
  Aap = 'AAP',
  Aar = 'AAR',
  Agr = 'AGR',
  Bar = 'BAR',
  Bid = 'BID',
  Bil = 'BIL',
  Dag = 'DAG',
  Enf = 'ENF',
  Ers = 'ERS',
  Far = 'FAR',
  Fei = 'FEI',
  For = 'FOR',
  Fos = 'FOS',
  Fri = 'FRI',
  Ful = 'FUL',
  Gen = 'GEN',
  Gra = 'GRA',
  Gru = 'GRU',
  Hel = 'HEL',
  Hje = 'HJE',
  Iar = 'IAR',
  Ind = 'IND',
  Kon = 'KON',
  Med = 'MED',
  Mob = 'MOB',
  Oms = 'OMS',
  Opa = 'OPA',
  Opp = 'OPP',
  Pen = 'PEN',
  Per = 'PER',
  Reh = 'REH',
  Rek = 'REK',
  Rpo = 'RPO',
  Rve = 'RVE',
  Saa = 'SAA',
  Sak = 'SAK',
  Sap = 'SAP',
  Ser = 'SER',
  Sik = 'SIK',
  Sto = 'STO',
  Sup = 'SUP',
  Syk = 'SYK',
  Sym = 'SYM',
  Til = 'TIL',
  Trk = 'TRK',
  Try = 'TRY',
  Tso = 'TSO',
  Tsr = 'TSR',
  Ufm = 'UFM',
  Ufo = 'UFO',
  Ukj = 'UKJ',
  Ven = 'VEN',
  Yra = 'YRA',
  Yrk = 'YRK'
}

export enum Variantformat {
  Arkiv = 'ARKIV',
  Sladdet = 'SLADDET'
}
