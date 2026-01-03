import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/cv';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperienceStepProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceStep = ({ data, onChange }: ExperienceStepProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      perusahaan: '',
      posisi: '',
      tahunMulai: '',
      tahunSelesai: '',
      deskripsi: '',
      isCurrent: false,
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Pengalaman</h2>
        <p className="text-muted-foreground text-sm">
          Tambahkan pengalaman kerja, magang, atau PKL Anda
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-xl">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Belum ada pengalaman</p>
          <Button onClick={addExperience} variant="outline">
            <Plus className="w-4 h-4" />
            Tambah Pengalaman
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div key={exp.id} className="bg-card border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Pengalaman #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nama Perusahaan</Label>
                  <Input
                    placeholder="Contoh: PT Tokopedia"
                    value={exp.perusahaan}
                    onChange={(e) => updateExperience(exp.id, 'perusahaan', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Posisi / Jabatan</Label>
                  <Input
                    placeholder="Contoh: Frontend Developer Intern"
                    value={exp.posisi}
                    onChange={(e) => updateExperience(exp.id, 'posisi', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tahun Mulai</Label>
                  <Input
                    placeholder="Jan 2023"
                    value={exp.tahunMulai}
                    onChange={(e) => updateExperience(exp.id, 'tahunMulai', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tahun Selesai</Label>
                  <Input
                    placeholder="Jun 2023"
                    value={exp.tahunSelesai}
                    onChange={(e) => updateExperience(exp.id, 'tahunSelesai', e.target.value)}
                    disabled={exp.isCurrent}
                    className="mt-1.5"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.isCurrent}
                      onCheckedChange={(checked) => {
                        updateExperience(exp.id, 'isCurrent', checked as boolean);
                        if (checked) {
                          updateExperience(exp.id, 'tahunSelesai', 'Sekarang');
                        }
                      }}
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm text-muted-foreground">
                      Masih bekerja di sini
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label>Deskripsi Pekerjaan</Label>
                  <Textarea
                    placeholder="Jelaskan tanggung jawab dan pencapaian Anda..."
                    value={exp.deskripsi}
                    onChange={(e) => updateExperience(exp.id, 'deskripsi', e.target.value)}
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="w-4 h-4" />
            Tambah Pengalaman Lain
          </Button>
        </div>
      )}
    </div>
  );
};
