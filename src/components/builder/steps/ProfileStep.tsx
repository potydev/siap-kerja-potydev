import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProfileStepProps {
  data: string;
  onChange: (data: string) => void;
}

export const ProfileStep = ({ data, onChange }: ProfileStepProps) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Profil Singkat</h2>
        <p className="text-muted-foreground text-sm">
          Tulis ringkasan tentang diri Anda, keahlian, dan tujuan karir
        </p>
      </div>

      <div>
        <Label htmlFor="profil">About Me</Label>
        <Textarea
          id="profil"
          placeholder="Contoh: Saya adalah seorang fresh graduate dengan pengalaman magang di bidang digital marketing. Memiliki kemampuan analitis yang baik dan bersemangat untuk terus belajar..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 min-h-[180px] resize-none"
          maxLength={500}
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            Tips: Jelaskan siapa Anda, apa keahlian utama, dan apa yang Anda cari
          </p>
          <span className="text-xs text-muted-foreground">
            {data.length}/500
          </span>
        </div>
      </div>

      <div className="bg-accent rounded-xl p-4">
        <p className="text-sm font-medium text-accent-foreground mb-2">💡 Contoh Profil yang Baik:</p>
        <p className="text-sm text-muted-foreground">
          "Fresh graduate S1 Teknik Informatika dengan pengalaman magang 6 bulan sebagai Frontend Developer. 
          Menguasai React, JavaScript, dan Tailwind CSS. Bersemangat untuk berkontribusi di tim teknologi 
          yang dinamis dan terus mengembangkan kemampuan coding."
        </p>
      </div>
    </div>
  );
};
