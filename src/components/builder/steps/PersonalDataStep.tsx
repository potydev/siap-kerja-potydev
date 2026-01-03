import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalData } from '@/types/cv';
import { Camera } from 'lucide-react';

interface PersonalDataStepProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export const PersonalDataStep = ({ data, onChange }: PersonalDataStepProps) => {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('foto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Data Pribadi</h2>
        <p className="text-muted-foreground text-sm">
          Informasi dasar yang akan ditampilkan di CV Anda
        </p>
      </div>

      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
            {data.foto ? (
              <img src={data.foto} alt="Foto" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Foto Profil (Opsional)</p>
          <p className="text-xs text-muted-foreground">JPG, PNG max 2MB</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
          <Input
            id="namaLengkap"
            placeholder="Contoh: Ahmad Rizki"
            value={data.namaLengkap}
            onChange={(e) => handleChange('namaLengkap', e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="contoh@email.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="noHp">No. Handphone *</Label>
          <Input
            id="noHp"
            type="tel"
            placeholder="08123456789"
            value={data.noHp}
            onChange={(e) => handleChange('noHp', e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="alamat">Alamat</Label>
          <Input
            id="alamat"
            placeholder="Kota, Provinsi"
            value={data.alamat}
            onChange={(e) => handleChange('alamat', e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn (Opsional)</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/username"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="portfolio">Portfolio (Opsional)</Label>
          <Input
            id="portfolio"
            placeholder="portfolio.com"
            value={data.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};
