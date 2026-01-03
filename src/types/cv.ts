export interface PersonalData {
  namaLengkap: string;
  email: string;
  noHp: string;
  alamat: string;
  foto?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  institusi: string;
  jurusan: string;
  tahunMasuk: string;
  tahunLulus: string;
  nilai?: string;
}

export interface Experience {
  id: string;
  perusahaan: string;
  posisi: string;
  tahunMulai: string;
  tahunSelesai: string;
  deskripsi: string;
  isCurrent?: boolean;
}

export interface Certificate {
  id: string;
  nama: string;
  penerbit: string;
  tahun: string;
}

export interface CVData {
  personalData: PersonalData;
  profilSingkat: string;
  pendidikan: Education[];
  pengalaman: Experience[];
  skills: string[];
  sertifikat: Certificate[];
  template: 'minimalist' | 'modern' | 'creative';
}

export const initialCVData: CVData = {
  personalData: {
    namaLengkap: '',
    email: '',
    noHp: '',
    alamat: '',
    foto: '',
    linkedin: '',
    portfolio: '',
  },
  profilSingkat: '',
  pendidikan: [],
  pengalaman: [],
  skills: [],
  sertifikat: [],
  template: 'minimalist',
};
