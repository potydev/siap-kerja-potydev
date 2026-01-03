import { ArrowRight, FileText, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartBuilding: () => void;
}

export const Hero = ({ onStartBuilding }: HeroProps) => {
  return (
    <section className="relative overflow-hidden gradient-hero pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>100% Gratis & ATS-Friendly</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Buat CV Profesional &{' '}
            <span className="text-primary">Siap Kerja</span>{' '}
            dalam 5 Menit
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Tidak perlu keahlian desain. Pilih template, isi data, dan download CV profesional siap pakai untuk melamar kerja.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" onClick={onStartBuilding}>
              Mulai Buat CV
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Lihat Template
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-muted-foreground animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">3 Template Profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">ATS-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Download PDF Gratis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
