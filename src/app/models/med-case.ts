export interface StudyCase {
    
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    picture: string;

    smallCc: string;  
    bigCc: string;
    generalAppearance: string;  

    cardio: string,
    respiratory: string,
    cel: string,
    msk: string,
    neuro: string,

    CBC: string,
    CHEM7Electrolytes: string,
    CMP: string;
    LipidProfile: string;
    INR: string;
    ABG: string;
    Urinalysis: string;
    Markers: string;
    LPCSF: string;
    Endocrine: string;
    Cultures: string;
    ECG: string;
    PFTs: string;
    
    xrayPicture: string;
    POCUS: string;
    Fluoroscopy: string;
    mriPicture: string;

    texte: string;
  }
  
  export interface MedicalCases {
    etudesDeCas: StudyCase[];
  }