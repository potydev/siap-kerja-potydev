import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Education } from '@/types/cv';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationStep = ({ data, onChange }: EducationStepProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institusi: '',
      jurusan: '',
      tahunMasuk: '',
      tahunLulus: '',
      nilai: '',
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Pendidikan</h2>
        <p className="text-muted-foreground text-sm">
          Tambahkan riwayat pendidikan Anda
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-xl">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Belum ada data pendidikan</p>
          <Button onClick={addEducation} variant="outline">
            <Plus className="w-4 h-4" />
            Tambah Pendidikan
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, index) => (
            <div key={edu.id} className="bg-card border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Pendidikan #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Nama Institusi</Label>
                  <Input
                    placeholder="Contoh: Universitas Indonesia"
                    value={edu.institusi}
                    onChange={(e) => updateEducation(edu.id, 'institusi', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Jurusan / Program Studi</Label>
                  <Input
                    placeholder="Contoh: S1 Teknik Informatika"
                    value={edu.jurusan}
                    onChange={(e) => updateEducation(edu.id, 'jurusan', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tahun Masuk</Label>
                  <Input
                    placeholder="2019"
                    value={edu.tahunMasuk}
                    onChange={(e) => updateEducation(edu.id, 'tahunMasuk', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tahun Lulus</Label>
                  <Input
                    placeholder="2023"
                    value={edu.tahunLulus}
                    onChange={(e) => updateEducation(edu.id, 'tahunLulus', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>IPK / Nilai (Opsional)</Label>
                  <Input
                    placeholder="3.85"
                    value={edu.nilai || ''}
                    onChange={(e) => updateEducation(edu.id, 'nilai', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="w-4 h-4" />
            Tambah Pendidikan Lain
          </Button>
        </div>
      )}
    </div>
  );
};
