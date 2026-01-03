import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplatePreviewProps {
  onStartBuilding: () => void;
}

const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Bersih dan simpel. Cocok untuk semua industri.',
    color: 'bg-slate-100',
    accent: 'bg-slate-700',
    popular: false,
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Profesional dan modern. Favorit HR perusahaan.',
    color: 'bg-blue-50',
    accent: 'bg-primary',
    popular: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unik dan kreatif. Ideal untuk industri kreatif.',
    color: 'bg-violet-50',
    accent: 'bg-violet-600',
    popular: false,
  },
];

export const TemplatePreview = ({ onStartBuilding }: TemplatePreviewProps) => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Pilih Template CV Anda
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Semua template dirancang ATS-friendly dengan tipografi profesional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {template.popular && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-semibold">
                  Terpopuler
                </div>
              )}

              {/* Template Preview Mock */}
              <div className={`aspect-[3/4] ${template.color} p-4 relative overflow-hidden`}>
                <div className="bg-card rounded-lg shadow-sm p-4 h-full">
                  {/* Header section */}
                  <div className="flex gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full ${template.accent}`} />
                    <div className="flex-1 space-y-2">
                      <div className={`h-3 ${template.accent} rounded w-3/4`} />
                      <div className="h-2 bg-muted rounded w-1/2" />
                    </div>
                  </div>

                  {/* Content sections */}
                  <div className="space-y-3">
                    <div className={`h-2 ${template.accent} rounded w-1/4 opacity-70`} />
                    <div className="space-y-1">
                      <div className="h-2 bg-muted rounded w-full" />
                      <div className="h-2 bg-muted rounded w-5/6" />
                      <div className="h-2 bg-muted rounded w-4/6" />
                    </div>

                    <div className={`h-2 ${template.accent} rounded w-1/3 opacity-70 mt-4`} />
                    <div className="space-y-1">
                      <div className="h-2 bg-muted rounded w-full" />
                      <div className="h-2 bg-muted rounded w-3/4" />
                    </div>

                    <div className={`h-2 ${template.accent} rounded w-1/4 opacity-70 mt-4`} />
                    <div className="flex gap-2 flex-wrap">
                      <div className={`h-5 ${template.accent} rounded-full w-12 opacity-30`} />
                      <div className={`h-5 ${template.accent} rounded-full w-14 opacity-30`} />
                      <div className={`h-5 ${template.accent} rounded-full w-10 opacity-30`} />
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="hero" onClick={onStartBuilding}>
                    Gunakan Template
                  </Button>
                </div>
              </div>

              {/* Template info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-success">
                  <Check className="w-4 h-4" />
                  <span>ATS-Friendly</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
