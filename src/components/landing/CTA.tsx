import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAProps {
  onStartBuilding: () => void;
}

export const CTA = ({ onStartBuilding }: CTAProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative rounded-3xl gradient-primary p-8 md:p-16 text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              Siap Membuat CV Profesional?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              CV Siap, Kerja Makin Dekat. Mulai buat CV profesional Anda sekarang juga!
            </p>
            <Button
              size="xl"
              variant="secondary"
              className="font-bold"
              onClick={onStartBuilding}
            >
              Mulai Buat CV Gratis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
