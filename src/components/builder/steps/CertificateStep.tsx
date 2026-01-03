import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Certificate } from '@/types/cv';
import { Plus, Trash2, Award } from 'lucide-react';

interface CertificateStepProps {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

export const CertificateStep = ({ data, onChange }: CertificateStepProps) => {
  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      nama: '',
      penerbit: '',
      tahun: '',
    };
    onChange([...data, newCert]);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertificate = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Sertifikat & Prestasi</h2>
        <p className="text-muted-foreground text-sm">
          Tambahkan sertifikat, pelatihan, atau prestasi Anda (opsional)
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-xl">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">Belum ada sertifikat</p>
          <Button onClick={addCertificate} variant="outline">
            <Plus className="w-4 h-4" />
            Tambah Sertifikat
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((cert, index) => (
            <div key={cert.id} className="bg-card border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Sertifikat #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertificate(cert.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Nama Sertifikat / Prestasi</Label>
                  <Input
                    placeholder="Contoh: Google Digital Marketing Certificate"
                    value={cert.nama}
                    onChange={(e) => updateCertificate(cert.id, 'nama', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Penerbit / Penyelenggara</Label>
                  <Input
                    placeholder="Contoh: Google"
                    value={cert.penerbit}
                    onChange={(e) => updateCertificate(cert.id, 'penerbit', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tahun</Label>
                  <Input
                    placeholder="2023"
                    value={cert.tahun}
                    onChange={(e) => updateCertificate(cert.id, 'tahun', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addCertificate} variant="outline" className="w-full">
            <Plus className="w-4 h-4" />
            Tambah Sertifikat Lain
          </Button>
        </div>
      )}

      <div className="bg-accent rounded-xl p-4">
        <p className="text-sm text-accent-foreground">
          💡 <strong>Tips:</strong> Sertifikat yang relevan dengan posisi yang dilamar dapat meningkatkan 
          peluang Anda. Jika belum punya, bagian ini bisa dikosongkan.
        </p>
      </div>
    </div>
  );
};
